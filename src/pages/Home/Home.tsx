import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import Category from '../../Components/category/category';
import { getCategoriesById, getProductsFromCategoryAndQuery } from '../../services/api';
import { ResultsType } from '../../types';
import handleCartClick from '../../services/cart';
import './Home.css';

function Home() {
  const [products, setProducts] = useState<ResultsType[]>([]);
  const [term, setTerm] = useState('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setTerm(value);
  }

  async function handleSubmit(event:
  React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLInputElement>
  | React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const productsData = await getProductsFromCategoryAndQuery('categoryId', term);
    setProducts(productsData);
  }

  const handleCategoriesClick = async (categorie: {
    name: string,
    id: string,
  }) => {
    const getProducts = await getCategoriesById(categorie.id);
    setProducts(getProducts);
    setTerm(categorie.name);
  };

  return (
    <div>
      <form className="search-container" onSubmit={ (event) => handleSubmit(event) }>
        <input
          data-testid="query-input"
          value={ term }
          onChange={ (event) => handleChange(event) }
          className="search-input"
          placeholder="Busque produtos, acessórios e muito mais"
        />
        <button
          data-testid="query-button"
          onClick={ (event) => handleSubmit(event) }
          type="submit"
          className="search-icon"
        >
          <BsSearch />
        </button>
      </form>
      {!products.length && (
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
      ) }
      <ul className="products-container">
        {products.length > 0 && (
          <h2 className="input-h2">{`Aqui estão os resultados de ${term}:`}</h2>
        )}
        {products.length > 0 && products.map((product) => (
          <li
            data-testid="product"
            key={ product.id }
            className="product-container"
          >
            <Link
              data-testid="product-detail-link"
              to={ `/produtos/${product.id}` }
              className="product"
            >
              <img
                className="product-img"
                src={ product.thumbnail }
                alt={ product.title }
              />
              <span className="product-title">{product.title}</span>
              <span className="product-price">{`R$ ${product.price}`}</span>
            </Link>
            <button
              onClick={ () => handleCartClick(product) }
              className="cart-btn"
              data-testid="product-add-to-cart"
            >
              Adicionar ao Carrinho
            </button>
          </li>
        ))}
      </ul>
      <Category onClick={ (categorie) => handleCategoriesClick(categorie) } />
    </div>
  );
}
export default Home;
