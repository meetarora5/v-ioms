import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../Api';
const API_BASE = "http://localhost:8000/api";
interface Product {
  id: number;
  product_name: string;
  price: string; // received as string from backend
}
 
interface OrderItem {
  product: Product;
  quantity: number;
}
 
interface Order {
  id: string;
  status: string; // e.g., "completed", "pending"
  customer_id: number;
  created_at: string;
  items: OrderItem[];
}
 
const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = () => {
      api.get(`${API_BASE}/orders/`)
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          console.error("Error fetching orders:", err);
        });
    };
 
    fetchOrders();
  }, []);
 
  const calculateTotal = (items: OrderItem[]) => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.product.price);
      return total + price * item.quantity;
    }, 0);
  };
 
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>
            <button

        className="bg-blue-600 text-white px-4 py-2 rounded m-2.5 hover:bg-blue-400 hover:text-2xl transition-all duration-500 ease-in-out"

        onClick={() => navigate("/order/add")}

      >

        Add Order

      </button>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border rounded p-4 mb-4 shadow-md bg-white"
          >
            <div className="mb-2">
              <strong>Order ID:</strong> {order.id}
            </div>
            <div className="mb-2">
              <strong>Customer ID:</strong> {order.customer_id}
            </div>
            <div className="mb-2">
              <strong>Order Date:</strong>{" "}
              {new Date(order.created_at).toLocaleString()}
            </div>
 
            <table className="w-full text-left mt-2 border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 py-1 border">Product</th>
                  <th className="px-2 py-1 border">Price</th>
                  <th className="px-2 py-1 border">Quantity</th>
                  <th className="px-2 py-1 border">Subtotal</th>
                  <th className="px-2 py-1 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-2 py-1 border">{item.product.product_name}</td>
                    <td className="px-2 py-1 border">₹{item.product.price}</td>
                    <td className="px-2 py-1 border">{item.quantity}</td>
                    <td className="px-2 py-1 border">
                      ₹{(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                    </td>
                    {/* <td>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${item.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {item.status}
                      </span>
                    </td> */}
                    <td className="px-2 py-1 border">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
 
            <div className="text-right font-semibold mt-2">
              Total: ₹{calculateTotal(order.items).toFixed(2)}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
 
export default Orders;