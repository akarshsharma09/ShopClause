import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";


export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  // Cart ka total calculate
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white shadow rounded-lg p-4"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(item)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Cart Total */}
          <div className="text-right font-bold text-lg">
            Total: ₹{total}
          </div>

          {/* Checkout Button */}
          <div className="text-right">
            <Link to="/checkout">
              <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
