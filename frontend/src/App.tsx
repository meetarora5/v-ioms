import ResponsiveAppBar from './components/ResponsiveAppBar'
import Register from './pages/Register'
import Login from './pages/Login'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Customers from './pages/Customers'
import AddCustomer from './pages/AddCustomer'
import EditCustomer from './pages/EditCustomer'
import Footer from './components/Footer'
import {Routes,Route} from 'react-router-dom'
function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        {/* Add other routes as needed */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customer/add" element={<AddCustomer />} />
        <Route path="/customer/edit/:id" element={<EditCustomer />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
