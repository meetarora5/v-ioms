import ResponsiveAppBar from './components/ResponsiveAppBar'
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
        <Route path="/products" element={<Products />} />
        <Route path='/product/add' element={<AddProduct />} />
        <Route path='/product/edit/:id' element={<EditProduct />} />
        {/* Add other routes as needed */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customer/add" element={<AddCustomer />} />
        <Route path="/customer/edit/:id" element={<EditCustomer />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/add" element={<AddOrder />} />
        <Route path="/dash" element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
