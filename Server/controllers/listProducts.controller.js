import listProducts from "../models/listProducts.model.js";

//GET-ALL
export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await listProducts.find();

        res.json(allProducts);
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
};

//GET-ONE
export const getOneProduct = async (req, res) => {
    try {
        const { id } = req.params;//take id from url
        const product = await listProducts.findById(id);
        console.log(product);

        if(!product) {
            return res.status(404).json({message: `Cannot find this ${id}`});
        }

        res.json(product);
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
};

//CREATE
export const createProduct = async (req, res) => {
    try {
        const { dataNewProduct } = req.body;//take data from client
        
        console.log(dataNewProduct);
        
        const newProduct = new listProducts({ //and set data into the model-schema
            productName: dataNewProduct.productName, 
            productImage: dataNewProduct.productImage,
            price: dataNewProduct.price,
            expireTime: dataNewProduct.expireTime,
            expireProductDate: dataNewProduct.expireProductDate,
            statusNumber: dataNewProduct.statusNumber,
        });
        console.log(newProduct);
        
        await newProduct.save();//save into mongoDB
        res.json(newProduct);
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
};

//UPDATE
export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(req.body);

        const response = await listProducts.findByIdAndUpdate(id, req.body); //mongodb recibe solo la propiedad a cambiar, no acepta todo el objeto entero
        console.log(response);

        if(!response) {
            return res.status(404).json({message: `Cannot find this ${id}`});
        } 
        const responseUpdate = await listProducts.findById(id); //hacemos esto para evitar el delay de respuesta

        res.json({ status: "update task", productUpdate: responseUpdate });
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
};

//UPDATE SINGLE-PRODUCT
export const updateSingleProduct = async (req, res) => {
    try {

        //MARDAR POR EL DISPATCH() LAS PROPIEDADES PARTICULARES A CAMBIAR!!!
        
        const id = req.params.id;
        //console.log(req.body);
        const { updateDataSingleProduct } = req.body;
        console.log(updateDataSingleProduct);

        const response = await listProducts.findByIdAndUpdate(id, updateDataSingleProduct); //mongodb recibe solo la propiedad a cambiar, no acepta todo el objeto entero
        console.log(response);

        if(!response) {
            return res.status(404).json({message: `Cannot find this ${id}`});
        }
        const responseUpdate = await listProducts.findById(id); //hacemos esto para evitar el delay de respuesta

        res.json({ status: "update task", productUpdate: responseUpdate });
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
};

//DELETE
export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const response = await listProducts.findByIdAndRemove(id);

        if(!response) {
            return res.status(404).json({message: `Cannot find this ${id}`});
        }
        
        res.json({status: "delete task"});
    } catch(error) {
        return res.status(500).json({message: error.message});
    }
};