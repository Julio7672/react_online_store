import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/api';
import { ProductDetails } from '../../types';
import handleCartClick from '../../services/cart';
import './Produtos.css';

export default function Produtos() {
  const [details, setDetails] = useState<ProductDetails>({
    id: 'string',
    title: 'string',
    thumbnail: 'string',
    price: 5,
    available_quantity: 5,
  });
  const { id } = useParams();

  useEffect(() => {
    const detailsProduct = async () => {
      const response = await getProductById(id as string);
      console.log(response);
      setDetails(response);
    };
    detailsProduct();
  }, []);

  return (
    <section className="all-details">
      <img
        data-testid="product-detail-image"
        src={ details.thumbnail }
        alt={ details.title }
        className="details-img"
      />
      <div className="product-details">
        <div>
          <h3
            data-testid="product-detail-name"
          >
            {details.title}
          </h3>
          <h4
            className="product-detail-price"
            data-testid="product-detail-price"
          >
            {`R$ ${details.price}`}
          </h4>
        </div>
        <button
          onClick={ () => handleCartClick(details) }
          className="detailed-cart-btn"
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </section>
  );
}
