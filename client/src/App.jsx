import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Signup from './screens/Signup';
import Login from './screens/Login';
import MyOrder from './screens/MyOrder';
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { CartProvider } from './components/ContextReducer';

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
