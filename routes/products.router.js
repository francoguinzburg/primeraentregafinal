import { Router, response } from "express";
import { productManager } from "../index.js";

const productsRouter = Router();

productsRouter.get('/', async(req,res) => {
    try {
        const { limit } = req.query;
        const products = productManager.getProducts();

        if(limit){
            const limitedProducts = products.slice(0, limit)
            return res.json(limitedProducts)
        } else {
            return res.json(products);
        }
    } catch (error) {
        console.log(error)
        res.send('ERROR AL INTENTAR RECIBIR LOS PRODUCTOS');
    }
})

productsRouter.get('/:pid', async (req,res) => {
    try {
        const {pid} = req.params;
        const products = productManager.getProducts(pid);
        res.json(products)
    } catch (error) {
        console.log(error)
        res.send(`ERROR AL INTENTAR RECIBIR EL PRODUCTO ${pid}`);
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body;
        const response = await productManager.addProduct({ title, description, price, thumbnail, code, stock, status, category });
        res.json(response);
    } catch (error) {
        console.log(error)
        res.send(`ERROR AL INTENTAR AGREGAR PRODUCTO`);
    }
})

productsRouter.put('/:pid', async (req, res) => {
    const {pid} = req.params;
    try {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body;
        const response = await productManager.updateProduct(id, { title, description, price, thumbnail, code, stock, status, category });
        res.json(response);
    } catch (error) {
        console.log(error)
        res.send(`ERROR AL INTENTAR EDITAR PRODUCTO CON ID ${pid}`);
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    const {pid} = req.params;
    try {
        await productManager.deleteProduct(id);
        res.send('Producto eliminado correctamente');
    } catch (error) {
        console.log(error)
        res.send(`ERROR AL INTENTAR BORRAR PRODUCTO CON ID ${pid}`);
    }
})

export {productsRouter}