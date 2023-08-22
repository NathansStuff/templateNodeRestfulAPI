import { IProductModel } from './IProduct';
import { createProduct, deleteProductById, findAllProducts, findProductById, updateProductById } from './productDal';

// Get all Products
export async function getAllProducts(): Promise<IProductModel[]> {
    const Products = await findAllProducts();
    return Products;
}

// Get Product by id
export async function getProductById(id: string): Promise<IProductModel | null> {
    const Product = await findProductById(id);
    return Product;
}

// Create Product
export async function createNewProduct(Product: IProductModel): Promise<IProductModel> {
    const newProduct = await createProduct(Product);
    return newProduct;
}

// Update Product
export async function updateProduct(id: string, updatedData: Partial<IProductModel>): Promise<IProductModel | null> {
    const Product = await updateProductById(id, updatedData);
    return Product;
}

// Delete Product
export async function deleteProduct(id: string): Promise<void> {
    await deleteProductById(id);
}
