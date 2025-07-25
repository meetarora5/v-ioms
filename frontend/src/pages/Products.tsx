import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import api from '../Api'
const API_BASE = "http://localhost:8000/api";
type Product = {
  id: number;
  product_name: string;
  sku: string;
  price: number;
  quantity: number;
  status: boolean;
};
 
const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Dummy data for now replace with API call if needed
  useEffect(() => {

    fetchProducts();
    // setProducts([
    //   {
    //     id: 1,
    //     product_name: "Laptop",
    //     sku: "LAP123",
    //     price: 75000,
    //     quantity: 10,
    //     status: true
    //   },
    //   {
    //     id: 2,
    //     product_name: "Headphones",
    //     sku: "HEAD456",
    //     price: 3500,
    //     quantity: 25,
    //     status: true
    //   },
    //   {
    //     id: 3,
    //     product_name: "Monitor",
    //     sku: "MONI789",
    //     price: 11000,
    //     quantity: 15,
    //     status: false
    //   },
    // ]);
  }, []);
  const fetchProducts = () =>{
    api
      .get<Product[]>(`${API_BASE}/products/`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
        alert("Failed to load products.");
      });
  }
  const handleDelete = (id: number) => {

    if (!window.confirm("Are you sure you want to delete this product?")) return;

    api
      .delete(`${API_BASE}/products/${id}/`)

      .then(() => {

        setProducts(products.filter((p) => p.id !== id));

      })

      .catch((err) => {

        alert("Failed to delete product");

        console.error(err);

      });

  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>
      <button

        className="bg-blue-600 text-white px-4 py-2 rounded m-2.5 hover:bg-blue-400 hover:text-2xl transition-all duration-500 ease-in-out"

        onClick={() => navigate("/product/add")}

      >

        Add Product

      </button>
      <div className="bg-white p-4 rounded-md shadow-md">

        {loading ? (

          <div className="text-gray-400 text-center">Loading...</div>

        ) : products.length === 0 ? (

          <div className="text-gray-400 text-center">No products found.</div>

        ) : (

          <table className="w-full text-left">

            <thead>

              <tr>

                <th className="border-b pb-2">Product Name</th>

                <th className="border-b pb-2">SKU</th>

                <th className="border-b pb-2">Price</th>

                <th className="border-b pb-2">Quantity</th>

                <th className="border-b pb-2">Status</th>

                <th className="border-b pb-2">Actions</th>

              </tr>

            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="border-b pb-2">{product.product_name}</td>
                  <td className="border-b pb-2">{product.sku}</td>
                  <td className="border-b pb-2">₹{product.price}</td>
                  <td className="border-b pb-2">{product.quantity}</td>
                  <td className="border-b pb-2">
                    <span className={`inline-block px-2 py-1 rounded ${product.status ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                      {product.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="border-b pb-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => navigate(`/product/edit/${product.id}`)}
                    >
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline" onClick={() => handleDelete(product.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Products;