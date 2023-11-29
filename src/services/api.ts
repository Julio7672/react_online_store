export async function getCategories() {
  try {
    const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export async function getProductsFromCategoryAndQuery(categoryId: string, query: string) {
  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
    const products = await response.json();
    return products.results || {};
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProductById(id:string) {
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const product = await response.json();
    return product;
  } catch (error) {
    console.log(error);
  }
}

export async function getCategoriesById(id:string) {
  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${id}`);
    const products = await response.json();
    return products.results;
  } catch (error) {
    console.error(error);
  }
}
