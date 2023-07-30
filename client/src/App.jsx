import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Signup, Login, MyOrder } from './screens'
import { CartProvider } from './components';
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/my-orders' element={<MyOrder />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
