import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  // Dummy data for now replace with API call if needed
  useEffect(() => {
    setProducts([
      {
        id: 1,
        product_name: "Laptop",
        sku: "LAP123",
        price: 75000,
        quantity: 10,
        status: true
      },
      {
        id: 2,
        product_name: "Headphones",
        sku: "HEAD456",
        price: 3500,
        quantity: 25,
        status: true
      },
      {
        id: 3,
        product_name: "Monitor",
        sku: "MONI789",
        price: 11000,
        quantity: 15,
        status: false
      },
    ]);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>
      <button

        className="bg-blue-600 text-white px-4 py-2 rounded m-2.5 hover:bg-blue-400 hover:text-2xl transition-all duration-500 ease-in-out"

        onClick={() => navigate("/product/add")}

      >

        Add Product

      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold mb-2">{product.product_name}</h2>
            <p className="text-gray-600 mb-4">SKU: {product.sku}</p>
            <p className="text-lg font-medium text-blue-600">₹{product.price}</p>
            <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
            <p className={`text-sm ${product.status ? "text-green-600" : "text-red-600"}`}>
              {product.status ? "Available" : "Out of Stock"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;