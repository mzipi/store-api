import crypto from 'crypto'
import { productDao } from '../dao/dao-factory.js';
import ProductsRepo from '../repositories/carts-repository.js';
import Product from '../dto/create-cart-dto.js';

function generarId() {
    const id = crypto.randomBytes(10).toString('hex')
    return id;
}

export default class ProductsService {
    constructor() {
        this.productsRepo = new ProductsRepo(productDao);
    }

    async setData({body}) {
        const product = new Product({
            id: generarId(),
            ...body
        });
        await this.productsRepo.setData(product);
        return product.asDto();
    }

    async getAllData() {
        const products = await this.productsRepo.getAllData();
        return products.map(usu => usu.asDto());
    }
    
    async delData({id}) {
        return await this.productsRepo.delData(id);
    }
}