import  React,{ useState  } from "react";
// import axios from "axios";
import api from '../Api';
const API_BASE = "http://localhost:8000/api";

interface ProductForm {
  product_name: string;
  sku: string;
  price: number;
  quantity: number;
  status: boolean;
}
 
const AddProduct = () => {
  const [form, setForm] = useState<ProductForm>({
    product_name: "",
    sku: "",
    price: 0,
    quantity: 0,
    status: false
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const{name,value, type} = e.target;
      setForm({
    ...form,
    [name]:
      type === "number"
        ? parseFloat(value)
        : type === "checkbox"
        ? e.target.checked
        : value
    });
  };
 
  const handleSubmit = (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    api
      .post(`${API_BASE}/products/`, form)
      .then(() => {
        alert("Product added!");
        setForm({
          product_name: "",
          sku: "",
          price: 0,
          quantity: 0,
          status: false
        });
      })
      .catch((error) => {
        console.error("Error response:", error.response?.data);
          // if(error.response?.data?.sku){
          //   console.error("SKU errors:", error.response.data.sku);
          // }
        alert("Error adding product");
      })
      .finally(() => setSubmitting(false));
    // axios
    //   .post(`${API_BASE}/products/`, form)
    //   .then(() => {
    //     alert("Product added!");
    //     setForm({
    //       product_name: "",
    //       sku: "",
    //       price: 0,
    //       quantity: 0,
    //       status: false
    //     });
    //   })
    //   .catch(() => {
    //     alert("Error adding product");
    //   })
    //   .finally(() => setSubmitting(false));
  };
 
  return (
    <form className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow" onSubmit={handleSubmit}>
      <input
        type="text"
        name="product_name"
        placeholder="Product Name"
        value={form.product_name}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />
        <input
            type="text"
            name="sku"
            placeholder="SKU"
            value={form.sku}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-2"
            required
        />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
        />
        <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={form.quantity}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
        />
        <input type="checkbox" name="status" id="status" checked={form.status} onChange={handleChange} />
      <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-2 rounded w-full cursor-pointer"
        disabled={submitting}
      >
        {submitting ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default AddProduct;
