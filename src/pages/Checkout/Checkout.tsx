import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductType } from '../Cart/Cart';

type Form = {
  name: string,
  email: string,
  cpf: string,
  celular: string,
  cep: string,
  address: string,
  paymentMethod: string,
};

function Checkout() {
  const [erro, setErro] = useState(false);
  const [formValue, setFormValue] = useState<Form>({
    name: '',
    email: '',
    cpf: '',
    celular: '',
    cep: '',
    address: '',
    paymentMethod: '',
  });
  const navigate = useNavigate();

  const produtos = Object.keys(localStorage);

  const handleSubmitButton = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !formValue.name
      || !formValue.email
      || !formValue.cpf
      || !formValue.celular
      || !formValue.cep
      || !formValue.address
      || !formValue.paymentMethod
    ) {
      setErro(true);
    } else {
      localStorage.clear();
      navigate('/');
    }
  };

  return (
    <>
      <h1>Resumo da compra</h1>
      <div>
        {produtos.map((produto) => {
          const productDataString = localStorage.getItem(produto);
          if (productDataString) {
            const productData = JSON.parse(productDataString) as ProductType;

            return (
              <div key={ produto }>
                <p>{productData.product}</p>
              </div>
            );
          }
          return null;
        })}
      </div>
      <form>
        <div>
          <h2>Informações para entrega:</h2>
          <label htmlFor="name">Nome Completo</label>
          <input
            data-testid="checkout-fullname"
            id="name"
            type="text"
            value={ formValue.name }
            onChange={ ({ target }) => setFormValue({ ...formValue,
              name: target.value }) }
            required
          />
          <label htmlFor="email">Email</label>
          <input
            data-testid="checkout-email"
            id="email"
            type="text"
            value={ formValue.email }
            onChange={ ({ target }) => setFormValue({ ...formValue,
              email: target.value }) }
            required
          />
          <label htmlFor="cpf">CPF</label>
          <input
            data-testid="checkout-cpf"
            id="cpf"
            required
            type="text"
            value={ formValue.cpf }
            onChange={ ({ target }) => setFormValue({ ...formValue,
              cpf: target.value }) }
          />
          <label htmlFor="celular">Celular</label>
          <input
            data-testid="checkout-phone"
            id="celular"
            type="text"
            value={ formValue.celular }
            onChange={ ({ target }) => setFormValue({ ...formValue,
              celular: target.value }) }
            required
          />
          <label htmlFor="cep">CEP</label>
          <input
            data-testid="checkout-cep"
            id="cep"
            type="text"
            value={ formValue.cep }
            onChange={ ({ target }) => setFormValue({ ...formValue,
              cep: target.value }) }
            required
          />
          <label htmlFor="address">Endereço</label>
          <input
            data-testid="checkout-address"
            name="address"
            type="text"
            value={ formValue.address }
            onChange={ ({ target }) => setFormValue({ ...formValue,
              address: target.value }) }
            required
          />
        </div>
        <div>
          <h2>Forma de pagamento:</h2>
          <label htmlFor="boleto">Boleto</label>
          <input
            id="boleto"
            type="radio"
            name="paymentMethod"
            data-testid="ticket-payment"
            value="boleto"
            onChange={ ({ target }) => setFormValue({ ...formValue,
              paymentMethod: target.value }) }
            required
          />
          <label htmlFor="visa">Visa</label>
          <input
            id="visa"
            type="radio"
            name="paymentMethod"
            data-testid="visa-payment"
            value="visa"
            onChange={ ({ target }) => setFormValue({ ...formValue,
              paymentMethod: target.value }) }
            required
          />
          <label htmlFor="mastercard">MasterCard</label>
          <input
            id="mastercard"
            type="radio"
            name="paymentMethod"
            data-testid="master-payment"
            value="mastercard"
            onChange={ ({ target }) => setFormValue({ ...formValue,
              paymentMethod: target.value }) }
            required
          />
          <label htmlFor="elo">Elo</label>
          <input
            id="elo"
            type="radio"
            name="paymentMethod"
            data-testid="elo-payment"
            value="elo"
            onChange={ ({ target }) => setFormValue({ ...formValue,
              paymentMethod: target.value }) }
            required
          />
        </div>
        <button
          type="submit"
          data-testid="checkout-btn"
          onClick={ (e) => handleSubmitButton(e) }
        >
          Enviar
        </button>
        {erro && (
          <h1 data-testid="error-msg">Campos inválidos</h1>
        )}
      </form>
    </>
  );
}

export default Checkout;
