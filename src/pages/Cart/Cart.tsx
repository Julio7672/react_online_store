import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

export type ProductType = {
  product: string,
  preço: number,
  quantidade: number,
  imagem: string,
};

export default function Carrinho() {
  const produtos = Object.keys(localStorage);
  const [carrinho, setCart] = useState<ProductType[] | string[]>([]);

  useEffect(() => {
    const productsData = produtos.map((produto) => {
      const productDataString = localStorage.getItem(produto);
      if (productDataString) {
        return JSON.parse(productDataString) as ProductType;
      }
      return null;
    });

    const filteredProducts = productsData.filter((productData) => productData !== null);
    setCart(filteredProducts as ProductType[]);
  }, []);

  function handleAddClick(product: string) {
    const addItems = produtos.filter((produto) => {
      const productDataString = localStorage.getItem(produto);
      if (productDataString) {
        const productData = JSON.parse(productDataString) as ProductType;
        if (productData.product === product) {
          productData.quantidade += 1;
          localStorage.setItem(productData.product, JSON.stringify(productData));
        }
      }
      return null;
    });
    setCart(addItems);
  }

  function handleDecrementClick(product: string) {
    const removeOneItem = produtos.filter((produto) => {
      const productDataString = localStorage.getItem(produto);
      if (productDataString) {
        const productData = JSON.parse(productDataString) as ProductType;
        if (productData.product === product && productData.quantidade > 1) {
          productData.quantidade -= 1;
          localStorage.setItem(productData.product, JSON.stringify(productData));
        }
      }
      return null;
    });
    setCart(removeOneItem);
  }

  function handleRemoveClick(product: string) {
    const productDataString = localStorage.getItem(product);
    if (productDataString) {
      const productData = JSON.parse(productDataString) as ProductType;
      if (productData.product === product) {
        localStorage.removeItem(product);
      }
    }
    const updatedCart = produtos.filter((produto) => produto !== product);
    setCart(updatedCart);
  }

  return (
    <div>
      {produtos.length === 0 ? (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      ) : (
        <>
          <div className="cart-products">
            {produtos.map((produto) => {
              const productDataString = localStorage.getItem(produto);
              if (productDataString) {
                const productData = JSON.parse(productDataString) as ProductType;

                return (
                  <div key={ produto } className="cart-product">
                    <p data-testid="shopping-cart-product-name">
                      { productData.product }
                    </p>
                    <p>
                      { `${productData.preço}` }
                    </p>
                    <p data-testid="shopping-cart-product-quantity">
                      { `Quantidade: ${productData.quantidade}`}
                    </p>
                    <img
                      src={ productData.imagem }
                      alt={ `Imagem do produto ${productData.product}` }
                    />
                    <button
                      onClick={ () => handleAddClick(productData.product) }
                      data-testid="product-increase-quantity"
                      className="add-btn"
                    >
                      +
                    </button>
                    <button
                      onClick={ () => handleDecrementClick(productData.product) }
                      data-testid="product-decrease-quantity"
                      className="sub-btn"
                    >
                      -
                    </button>
                    <button
                      onClick={ () => handleRemoveClick(productData.product) }
                      data-testid="remove-product"
                      className="rmv-btn"
                    >
                      Remover
                    </button>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <Link to="/checkout" data-testid="checkout-products">Finalizar compra</Link>
        </>
      )}
    </div>
  );
}
