import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Redux setup
import { Provider } from "react-redux";
import { store } from "./app/store";

// Cart Context
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <CartProvider>
        <App />
      </CartProvider>
    </Provider>
  </StrictMode>
);
