import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../features/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();

  // Redux se state lena
  const { cartItems, totalAmount, totalQuantity } = useSelector(
    (state) => state.cart
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        My Cart ({totalQuantity} items)
      </h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>
                  ₹{item.price} x {item.quantity}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* 🔹 Decrease quantity */}
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="px-2 bg-gray-200 rounded"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                {/* 🔹 Increase quantity */}
                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="px-2 bg-gray-200 rounded"
                >
                  +
                </button>

                {/* 🔹 Remove product */}
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* 🔹 Total Amount */}
          <div className="mt-4 font-bold">Total Amount: ₹{totalAmount}</div>

          {/* 🔹 Clear Cart */}
          <button
            onClick={() => dispatch(clearCart())}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
