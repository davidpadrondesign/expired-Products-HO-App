import { useEffect, useState } from "react";
import Header from "../Components/Header";
import { useSelector, useDispatch } from "react-redux";
import ProductRow from "../Components/ProductRow";
import DeprecateProducts from "../Components/DeprecateProducts";
import { getAllListProducts } from "../redux/listProductsSlice";
import { removeAllState, removeAdvertise } from "../redux/listProductsSlice";
import { useNavigate } from "react-router-dom";
import { userLogOut } from "../redux/userLoginSlice";
import { cleanRegister } from "../redux/userRegisterSlice";

const ProductsList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [alert, setAlert] = useState(false);
    const loginData = useSelector((state) => state.usersLogin.users);
    const products = useSelector((state) => state.listproducts.productos); 
    const advertise = useSelector((state) => state.listproducts.advertise);

    useEffect(() => {
        dispatch(getAllListProducts(loginData.token)); //get list products
        
    }, [dispatch, loginData]);

    useEffect(() => {
        advertise.msg ? setAlert(true) : setAlert(false);
    }, [advertise])

    const bckpProducts = [...products]; 

    const orderedProducts = bckpProducts.sort((a, b) => a.statusNumber - b.statusNumber); //order by statusNumber

    const redirectLogin = () => {
        dispatch(removeAdvertise());
        dispatch(removeAllState()); //reset listproducts state
        dispatch(cleanRegister());
        dispatch(userLogOut()); //logout
        navigate('/');
    }

    //TABLE-DEPRECATE-CONTENT
    const renderDeprecateProducts = () => {
        if(orderedProducts.length === 0) {
            return <tr><td>No deprecate products yet</td></tr>
        } else {
            return orderedProducts.map((dpcteproduct, i) => ( 
                <DeprecateProducts key={i} dpcteproduct={{dpcteproduct: dpcteproduct, loginData: loginData.token}}/>
            ));
        }
    }

    //TABLE-CONTENT
    const renderProducts = () => {
        if(orderedProducts.length === 0) {
            return <tr><td>No products yet</td></tr>
        } else {
            return orderedProducts.map((product, i) => ( 
                <ProductRow key={i} product={{product: product, loginData: loginData.token}}/>
            ));
        }
    }

    return (
        <div className="container-main-area">
            {alert ? (
                <div className="container-redirect">
                <div className="popup-redirect">
                    <img src="data:image/png;base64,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"/>
                    <p>SESSION EXPIRED</p>
                    <br></br>
                    <button onClick={redirectLogin} className="general-btn redirect-btn">Login</button>
                </div>
            </div>

            ) : (
                null
            )}
            <Header/>
            <div className="center-container">
                <div className="container-title">
                    <h2 className="center-title">List Product Available</h2>
                </div>
                <table className="table-fill">
                    <thead>
                        <tr>
                            <th className="table-head">Product</th>
                            <th className="table-head">Name</th>
                            <th className="table-head">Price</th>
                            <th className="table-head">Expiration Date</th>
                            <th className="table-head">Action</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {renderProducts()}
                    </tbody>
                </table>
            </div>

            <div className="center-container">
                <div className="container-title">
                    <h2 className="center-title">Deprecate Products</h2>
                </div>
                <table className="table-fill">
                    <thead>
                        <tr>
                            <th className="table-head">Product</th>
                            <th className="table-head">Name</th>
                            <th className="table-head">Price</th>
                            <th className="table-head">Expiration Date</th>
                            <th className="table-head">Action</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {renderDeprecateProducts()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductsList;