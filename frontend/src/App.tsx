import ResponsiveAppBar from './components/ResponsiveAppBar'
import PrivateRoute from './components/PrivateRoute'
import Register from './pages/Register'
import Login from './pages/Login'
import Products from './pages/Products'
import Customers from './pages/Customers'
import AddCustomer from './pages/AddCustomer'
import EditCustomer from './pages/EditCustomer'
import EditProduct from './pages/EditProduct'
import Footer from './components/Footer'
import AddProduct from './pages/AddProduct'
import Orders from './pages/Orders'
import AddOrder from './pages/AddOrder'
import Dashboard from './pages/Dashboard'
import { Routes,Route } from 'react-router-dom'
function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
        <Route path='/product/add' element={<PrivateRoute><AddProduct /></PrivateRoute>} />
        <Route path='/product/edit/:id' element={<PrivateRoute><EditProduct /></PrivateRoute>} />
        {/* Add other routes as needed */}
        <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
        <Route path="/customers" element={<PrivateRoute><Customers /></PrivateRoute>} />
        <Route path="/customer/add" element={<PrivateRoute><AddCustomer /></PrivateRoute>} />
        <Route path="/customer/edit/:id" element={<PrivateRoute><EditCustomer /></PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
        <Route path="/order/add" element={<PrivateRoute><AddOrder /></PrivateRoute>} />
        <Route path="/dash" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
