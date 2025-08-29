import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Sample Products (category ke saath)
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1499,
    category: "Electronics",
    image: "/images/product/headphone.webp",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2999,
    category: "Electronics",
    image: "/images/product/watch1.webp",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: 899,
    category: "Electronics",
    image: "/images/product/mouse.webp",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 1799,
    category: "Electronics",
    image: "/images/product/speaker1.webp",
  },
  {
    id: 5,
    name: "iPhone 15",
    price: 79999,
    category: "Mobiles & Tablets",
    image: "/images/product/15pro.webp",
  },
  {
    id: 6,
    name: "Samsung Galaxy S23",
    price: 69999,
    category: "Mobiles & Tablets",
    image: "/images/product/s23.webp",
  },
  {
    id: 7,
    name: "LED TV",
    price: 69999,
    category: "Electronics",
    image: "/images/product/led.webp",
  },
];

function Products() {
  const { addToCart } = useCart();
  const { id } = useParams(); // yeh category id lega

  // agar category selected hai to filter karo, nahi to sab dikhao
  const filteredProducts = id
    ? products.filter((p) => p.category === id)
    : products;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
        {id ? `${id.toUpperCase()} Products` : "All Products"}
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-blue-600 font-bold mt-2">₹{product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products available
          </p>
        )}
      </div>
    </div>
  );
}

export default Products;
