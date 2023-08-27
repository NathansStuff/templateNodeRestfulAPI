import express from 'express';

import { TryCatchMiddleware } from '@/middleware/TryCatchMiddleware';

import {
    createProductHandler,
    deleteProductHandler,
    getAllProductsHandler,
    getProductByIdHandler,
    getProductsByIdHandler,
    updateProductHandler,
} from './productController';

const ProductRouter = express.Router();

// Define API routes here
ProductRouter.get('/', TryCatchMiddleware(getAllProductsHandler));
ProductRouter.get('/:id', TryCatchMiddleware(getProductByIdHandler));
ProductRouter.post('/', TryCatchMiddleware(createProductHandler));
ProductRouter.put('/:id', TryCatchMiddleware(updateProductHandler));
ProductRouter.delete('/:id', TryCatchMiddleware(deleteProductHandler));
ProductRouter.post('/ids', TryCatchMiddleware(getProductsByIdHandler));

export { ProductRouter };

