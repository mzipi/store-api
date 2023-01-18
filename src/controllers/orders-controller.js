import ProductsService from '../services/orders-service.js';

const products = new ProductsService();

export async function getProductsController(req, res) {
    const data = await products.getAllData();
    res.json(data);
}

export async function postProductController(req, res) {
    return await products.setData(req);
}