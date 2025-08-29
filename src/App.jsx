import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { CartProvider } from "./context/CartContext"; 
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";

// PrivateRoute component to protect private pages
const PrivateRoute = ({ currentUser, children }) => {
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [logoutToast, setLogoutToast] = useState("");

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  // Open login modal
  const handleOpenLogin = () => {
    setShowLogin(true);
    setIsModalOpen(true);
  };

  // Logout function with toast
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLogoutToast("Logout Successful!");
      setTimeout(() => setLogoutToast(""), 3000);
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  return (
     <CartProvider>
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        {/* ✅ Logout Toast */}
        {logoutToast && (
          <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg z-[9999] flex items-center gap-3 animate-fade-in-out">
            <span className="font-medium">{logoutToast}</span>
            <button
              onClick={() => setLogoutToast("")}
              className="text-white text-lg font-bold leading-none hover:text-gray-200"
            >
              ×
            </button>
          </div>
        )}

        {/* Navbar */}
        <Navbar
          onLoginClick={handleOpenLogin}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        {/* Routes */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/checkout"
              element={
                <PrivateRoute currentUser={currentUser}>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute currentUser={currentUser}>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
          
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-orange-400 to-pink-500 text-white py-2 text-center p-4">
          <p>© {new Date().getFullYear()} ShopClues. All Rights Reserved.</p>
        </footer>

        {/* Login / Signup Modal */}
        {isModalOpen &&
          (showLogin ? (
            <Login
              onClose={() => setIsModalOpen(false)}
              switchToSignup={() => setShowLogin(false)}
            />
          ) : (
            <Signup
              onClose={() => setIsModalOpen(false)}
              switchToLogin={() => setShowLogin(true)}
            />
          ))}
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
