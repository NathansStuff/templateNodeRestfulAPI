import { mongoDBConnect } from '@/middleware/mongoDbConnect';

import { IProductModel } from './IProduct';
import { ProductModel } from './productModel';

// Get all Products
export async function findAllProducts(): Promise<IProductModel[]> {
    await mongoDBConnect();
    return await ProductModel.find();
}

// Get Product by ID
export async function findProductById(id: string): Promise<IProductModel | null> {
    await mongoDBConnect();
    return await ProductModel.findById(id);
}

// Create a new Product
export async function createProduct(ProductData: IProductModel): Promise<IProductModel> {
    await mongoDBConnect();
    return await ProductModel.create(ProductData);
}

// Update Product by ID
export async function updateProductById(
    id: string,
    updatedData: Partial<IProductModel>
): Promise<IProductModel | null> {
    await mongoDBConnect();
    return await ProductModel.findByIdAndUpdate(id, updatedData, { new: true });
}

// Delete Product by ID
export async function deleteProductById(id: string): Promise<void> {
    await mongoDBConnect();
    await ProductModel.findByIdAndDelete(id);
}

export default ProductModel;
