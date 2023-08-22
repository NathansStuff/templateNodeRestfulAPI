import { Request, Response } from 'express';

import { createNewProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from './productService';

// Get all Products
export async function getAllProductsHandler(req: Request, res: Response): Promise<void> {
    const Products = await getAllProducts();
    res.status(200).json(Products);
}

// Get Product by id
export async function getProductByIdHandler(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const Product = await getProductById(id);
    if (Product) {
        res.status(200).json(Product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
}

// Create Product
export async function createProductHandler(req: Request, res: Response): Promise<void> {
    const ProductData = req.body;
    const newProduct = await createNewProduct(ProductData);
    res.status(201).json(newProduct);
}

// Update Product
export async function updateProductHandler(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updatedData = req.body;
    const Product = await updateProduct(id, updatedData);
    if (Product) {
        res.status(200).json(Product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
}

// Delete Product
export async function deleteProductHandler(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await deleteProduct(id);
    res.status(204).send();
}
