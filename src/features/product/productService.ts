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

// Get Products by ids
export async function getProductsByIds(ids: string[]): Promise<IProductModel[]> {
    const products = await Promise.all(ids.map((id) => getProductById(id)));
    return products.filter((product) => product !== null) as IProductModel[];
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
