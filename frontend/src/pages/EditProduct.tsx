import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
import api from '../Api';
interface ProductForm {
  product_name: string;
  sku: string;
  price: number;
  quantity: number;
  status: boolean;
}
const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ProductForm>({
    product_name: "",
    sku: "",
    price: 0,
    quantity: 0,
    status: true,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  useEffect(() => {
    // Fetch product details by ID
    api
      .get<ProductForm>(`http://localhost:8000/api/products/${id}/`)
      .then((res) => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
        alert("Failed to load product.");
        navigate("/products");
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    api
      .put(`http://localhost:8000/api/products/${id}/`, formData)
      .then(() => {
        alert("Product updated successfully.");
        navigate("/products/");
      })
      .catch((err) => {
        console.error("Error updating product:", err);
        alert("Failed to update product.");
      })
      .finally(() => {
        setSaving(false);
      });
  };
  if (loading) return <div>Loading...</div>;
  return (
    <form
      className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="product_name"
        placeholder="Product Name"
        value={formData.product_name}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />
      <input
        type="text"
        name="sku"
        placeholder="SKU"
        value={formData.sku}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />
      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          name="status"
          checked={formData.status}
          onChange={(e) =>
            setFormData({ ...formData, status: e.target.checked })
          }
          className="mr-2"
        />
        Active
      </label>
      <div className="flex justify-between items-center">
        <button
          type="submit"
          disabled={saving}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
        >
          {saving ? "Saving..." : "Update Product"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/products")}
          className="text-gray-600 underline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProduct;
