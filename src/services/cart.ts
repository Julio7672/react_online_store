import { ResultsType } from '../types';

const handleCartClick = (product: ResultsType) => {
  const existingProduct = localStorage.getItem(product.title);

  if (existingProduct) {
    const existingProductData = JSON.parse(existingProduct);
    const updatedProductData = {
      ...existingProductData,
      quantidade: existingProductData.quantidade + 1,
    };

    localStorage.setItem(product.title, JSON.stringify(updatedProductData));
  } else {
    const newProductData = {
      product: product.title,
      preço: product.price,
      imagem: product.thumbnail,
      quantidade: 1,
    };

    localStorage.setItem(product.title, JSON.stringify(newProductData));
  }
};

export default handleCartClick;
