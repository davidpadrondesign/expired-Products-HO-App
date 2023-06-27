import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, updateSingleProduct } from '../redux/listProductsSlice';
import axios from 'axios';

//REGULAR EXPRESSION
const REGEX_PRODUCT_NAME = /^[a-zA-Z0-9\s]{1,60}$/; //allow -> letters, numbers, spaces.
const REGEX_PRODUCT_ULR = /^[a-zA-Z0-9.\-_:\/]{1,150}$/; //allow -> letters, numbers, `:` `/` `.` `-` `_` 
const REGEX_PRODUCT_NUMBERS = /^[0-9]+(\.[0-9]+)?$/; //allow -> whole and decimal numbers with one point after a number. Valid for both cases ex: 3 or 3.14

const AddProductForm = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginData = useSelector((state) => state.usersLogin.users);

    const [ products, setProducts ] = useState({ 
        productName: '',
        productImage: '',
        price: 0, 
        expire: { day: 0, month: 0, year: 0 },
    });

    //VALID
    const [validProductName, setValidProductName] = useState(false);
    const [validProductImage, setValidProductImage] = useState(false);
    const [validProductPrice, setValidProductPrice] = useState(false);
    const [validProductExpire, setValidProductExpire] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);

    useEffect(() => {
        const loadOneProduct = async () => {
            if(params.id) {
                const response = await axios.get(`http://localhost:4000/api/listProducts/oneProduct/${params.id}`);

                setProducts({ ...products,
                productName: response.data.productName,
                productImage: response.data.productImage,
                price: response.data.price,
                expire: { ...products.expire,
                    day: response.data.expireProductDate.expireProductDay,
                    month: response.data.expireProductDate.expireProductMonth,
                    year: response.data.expireProductDate.expireProductYear,
                }
                });
            }
        }
        loadOneProduct();
    }, []);

    useEffect(() => {
        //PRODUCT NAME
        const resultName = REGEX_PRODUCT_NAME.test(products.productName);
        setValidProductName(resultName);

        //PRODUCT URL
        const resultUrl = REGEX_PRODUCT_ULR.test(products.productImage);
        setValidProductImage(resultUrl);

        //PRODUCT PRICE
        const resultPrice = REGEX_PRODUCT_NUMBERS.test(products.price);
        setValidProductPrice(resultPrice);

        //PRODUCT EXPIRE
        const resultExpireDay = REGEX_PRODUCT_NUMBERS.test(products.expire.day);
        const resultExpireMonth = REGEX_PRODUCT_NUMBERS.test(products.expire.month);
        const resultExpireYear = REGEX_PRODUCT_NUMBERS.test(products.expire.year);

        if(!resultExpireDay || !resultExpireMonth || !resultExpireYear) { 
            setValidProductExpire(false); 
        } else {
            setValidProductExpire(true); 
        }

        if(resultName || resultUrl || resultPrice || resultExpireDay || resultExpireMonth || resultExpireYear) setErrorMsg(false);

    }, [products.productName, products.productImage, products.price,
        products.expire.day, products.expire.month, products.expire.year]);

    const handleForm = (e) => {
        e.preventDefault();

        //VALIDATION BLACK-FIELDS
        if(!products.productName || !products.productImage || products.price === 0 || products.expire.day <= 0 || products.expire.month <= 0 || products.expire.year <= 0) {
            alert('some empty field :(');
            return 
        }

        //VALIDATION HACK JS
        const v1 = REGEX_PRODUCT_NAME.test(products.productName);
        const v2 = REGEX_PRODUCT_ULR.test(products.productImage);
        const v3 = REGEX_PRODUCT_NUMBERS.test(products.price);
        const v4 = REGEX_PRODUCT_NUMBERS.test(products.expire.day);
        const v5 = REGEX_PRODUCT_NUMBERS.test(products.expire.month);
        const v6 = REGEX_PRODUCT_NUMBERS.test(products.expire.year);

        //if 'user' or 'pwd' are incorrect send error-message and DON´T SEND THE FORM!
        if(!v1 || !v2 || !v3 || !v4 || !v5 || !v6 ) {
            setErrorMsg(true);
            return;
        }

        //VALIDATION
        if(params.id) {
            const expireProductUpdate = new Date;

            expireProductUpdate.setDate(products.expire.day);
            expireProductUpdate.setMonth(products.expire.month - 1); //mines 1 for fix the time, month goes from 0 - 11
            expireProductUpdate.setFullYear(products.expire.year);

            const newExpireProductUpdate = expireProductUpdate.toDateString(); //transform to this format string 'Sun Oct 15 2023'

            products.expireTimeUpdate = newExpireProductUpdate; 

            dispatch(updateSingleProduct({ products, _id: params.id, loginToken: loginData.token }));
        } else {
            const expireProduct = new Date;

            expireProduct.setDate(products.expire.day);
            expireProduct.setMonth(products.expire.month - 1); //mines 1 for fix the time, month goes from 0 - 11
            expireProduct.setFullYear(products.expire.year);

            const newExpireProduct = expireProduct.toDateString(); //transform to this format string 'Sun Oct 15 2023'

            products.expireTime = newExpireProduct; 

            dispatch(addProducts({ products, loginToken: loginData.token }));

            //CLEAN FORM
            setProducts({ ...products, productName: '', productImage: '', price: 0, expire: {...products.expire, day: 0, month: 0, year: 0} });
        }
    }
    
    return (
        <div className="center-container-flex-colum">
            <div className='bgd-form'>
                <div className='bg-title'>
                    <h1 className='title'>{params.id ? 'Edit Product' : 'Create Product' }</h1>
                </div>
                <form onSubmit={handleForm} className="center-container-flex-colum">
                    <div className='elements-container'>
                        <label className='labelTitle' htmlFor="ProductName">Name:</label>
                        <input onChange={(e) => setProducts({ ...products, productName: e.target.value })} value={products.productName} className="inputTitle" name="ProductName" type="text" placeholder="Your Product Name..."/> 
                        
                    </div>
                    <p className={validProductName || !products.productName ? 'display-Off' : 'display-On warning-info' }>
                        1 to 60 characters.<br />
                        Characters allowed: "aA-zZ", "0-9", " "
                    </p>

                    <div className='elements-container'>
                        <label className='labelTitle' htmlFor="ProductImage">Image:</label>
                        <input onChange={(e) => setProducts({ ...products, productImage: e.target.value })} value={products.productImage} className="inputTitle" name="ProductImage" type="text" placeholder="Your Image ULR..."/>
                    </div>
                    <p className={validProductImage || !products.productImage ? 'display-Off' : 'display-On warning-info' }>
                        1 to 150 characters.<br />
                        Characters allowed: "aA-zZ", "0-9", ":" "/" "." "-" "_"
                    </p>

                    <div className='elements-container'>
                        <label className='labelTitle' htmlFor="ProductPrice">Price:</label>
                        <input onChange={(e) => setProducts({ ...products, price: Number(e.target.value) })} value={products.price} className="inputTitle" name="ProductPrice" type="text" placeholder="Your Product price $..."/>
                    </div>
                    <p className={validProductPrice ? 'display-Off' : 'display-On warning-info' }>
                        Allowed whole and decimal numbers
                    </p>
                    
                    <div className='center-container-flex-colum'>
                        <div className='elements-container'>
                            <label className='labelTitle' htmlFor="ProductExpireDay">Day:</label>
                            <input onChange={(e) => setProducts({ ...products, expire: {...products.expire, day: Number(e.target.value)} })} value={products.expire.day} className="inputTitle" name="ProductExpireDay" type="number"/>
                        </div>
                        <div className='elements-container'>
                            <label className='labelTitle' htmlFor="ProductExpireMonth">Month:</label>
                            <input onChange={(e) => setProducts({ ...products, expire: {...products.expire, month: Number(e.target.value)} })} value={products.expire.month} className="inputTitle" name="ProductExpireMonth" type="number"/>
                        </div>
                        <div className='elements-container'>
                            <label className='labelTitle' htmlFor="ProductExpireYear">Year:</label>
                            <input onChange={(e) => setProducts({ ...products, expire: {...products.expire, year: Number(e.target.value)} })} value={products.expire.year} className="inputTitle" name="ProductExpireYear" type="number"/>
                        </div>
                        <p className={validProductExpire ? 'display-Off' : 'display-On warning-info' }>
                            Allowed whole numbers
                        </p>
                        <p className={errorMsg ? 'display-On warning-info' : 'display-Off' }>
                            ERROR: INVALID ENTRY
                        </p>

                        <div className='container-button-save'>
                            <button type="submit" disable={!validProductName || !validProductImage || !validProductPrice || !validProductExpire ? "true" : "false" } className="general-btn save-btn">Save</button>
                            <button type="button" onClick={() => navigate('/productsList')} className="general-btn cancel-btn">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='container-button'>
                <button type="button" onClick={() => navigate('/productsList')} className='general-btn productList-btn'>Product List</button>
            </div>
        </div>
    );
}

export default AddProductForm;