import { useEffect, useState } from "react";
// import axios from "axios";
import api from '../Api';
const API_BASE = "http://localhost:8000/api";

type Metrics = {
  totalOrders: number;
  revenue: number;
  topProducts: [string, number][];
  lowStock: any[];
};

const Dashboard = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    totalOrders: 0,
    revenue: 0,
    topProducts: [],
    lowStock: []
  });

  useEffect(() => {
    // Replace with real API calls
    Promise.all([
      api.get(`${API_BASE}/orders/`),
      api.get(`${API_BASE}/products/`)
    ]).then(([ordersRes, productsRes]) => {
      const orders = ordersRes.data;
      const products = productsRes.data;

      // Total orders this month
      const now = new Date();
      const monthOrders = orders.filter((order: any) => {
        const created = new Date(order.created_at);
        return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
      });

      // Revenue
      let revenue = 0;
      orders.forEach((order: any) => {
        if (order.items) {
          order.items.forEach((item: any) => {
            revenue += item.product.price * item.quantity;
          });
        }
      });

      // Top 5 selling products
      const productSales: Record<string, number> = {};
      orders.forEach((order: any) => {
        if (order.items) {
          order.items.forEach((item: any) => {
            productSales[item.product.product_name] = (productSales[item.product.product_name] || 0) + item.quantity;
          });
        }
      });
      const topProducts = Object.entries(productSales)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

      // Low stock warnings
      const lowStock = products.filter((p: any) => p.quantity < 5);

      setMetrics({
        totalOrders: monthOrders.length,
        revenue,
        topProducts,
        lowStock
      });
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Total Orders This Month</h2>
          <p className="text-2xl font-bold">{metrics.totalOrders}</p>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Revenue</h2>
          <p className="text-2xl font-bold">₹{metrics.revenue}</p>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Top 5 Selling Products</h2>
        <ul className="list-disc pl-6">
          {metrics.topProducts.length === 0 ? (
            <li>No sales data</li>
          ) : (
            metrics.topProducts.map(([name, qty]: any) => (
              <li key={name}>{name} - {qty} sold</li>
            ))
          )}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Low Stock Warnings</h2>
        <ul className="list-disc pl-6">
          {metrics.lowStock.length === 0 ? (
            <li>All products sufficiently stocked</li>
          ) : (
            metrics.lowStock.map((p: any) => (
              <li key={p.id}>{p.product_name} - Only {p.quantity} left</li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;