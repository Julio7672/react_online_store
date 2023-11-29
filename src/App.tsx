import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Produtos from './pages/Produtos/Produtos';
import NotFound from './pages/NotFound/NotFound';
import Layout from './Components/Layout/Layout';
import Checkout from './pages/Checkout/Checkout';

function App() {
  return (
    <Routes>
      <Route element={ <Layout /> }>
        <Route index element={ <Home /> } />
        <Route path="/carrinho" element={ <Cart /> } />
        <Route path="/produtos/:id" element={ <Produtos /> } />
        <Route path="/checkout" element={ <Checkout /> } />
      </Route>
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
