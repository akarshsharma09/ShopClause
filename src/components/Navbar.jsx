import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useSelector } from "react-redux"; // 🟢 Redux hook

export default function Navbar({ onLoginClick, currentUser, onLogout }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef();

  // 🟢 Redux se cart count (better: totalQuantity use karo)
  const cartCount = useSelector((state) => state.cart.totalQuantity);

  const displayName =
    currentUser?.displayName || currentUser?.email?.split("@")[0] || "User";

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full shadow-md border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Left - Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
          aria-label="Go to Home"
        >
          <img
            src="https://cdn.shopclues.com/images/ui/shopclues_logo@2x.png"
            alt="ShopClues"
            className="h-6 sm:h-8"
          />
        </div>

        {/* Center - Search */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-6">
          <input
            type="text"
            placeholder="What is on your mind today?"
            className="flex-1 border rounded-l-md px-3 py-2 text-sm focus:outline-none"
          />
          <button className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 rounded-r-md hover:opacity-90 transition">
            Search
          </button>
        </div>

        {/* Right - Icons & Auth */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          {/* Share + Location */}
          <div className="flex flex-col items-center cursor-pointer hover:text-black">
            <span className="text-xs">Share</span>
            <span className="text-[11px] text-blue-500">Location</span>
          </div>

          {/* Notification */}
          <button className="hover:text-black" aria-label="Notifications">
            <Bell size={20} />
          </button>

          {/* Wishlist */}
          <button className="hover:text-black" aria-label="Wishlist">
            <Heart size={20} />
          </button>

          {/* Cart with Count */}
          <div
            className="relative cursor-pointer hover:text-black"
            onClick={() => navigate("/cart")}
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {/* Auth Buttons / Profile Dropdown */}
          {currentUser ? (
            <div className="relative" ref={profileRef}>
              <button
                className="flex items-center gap-1 text-gray-700 hover:text-black focus:outline-none"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                aria-haspopup="true"
                aria-expanded={profileDropdownOpen}
              >
                <User size={20} />
                <span className="hidden sm:inline-block">{displayName}</span>
                <ChevronDown size={16} />
              </button>

              {/* Dropdown menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      navigate("/profile");
                      setProfileDropdownOpen(false);
                    }}
                  >
                    Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      navigate("/orders");
                      setProfileDropdownOpen(false);
                    }}
                  >
                    Orders
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      navigate("/settings");
                      setProfileDropdownOpen(false);
                    }}
                  >
                    Settings
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    onClick={() => {
                      onLogout();
                      setProfileDropdownOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="hover:text-black flex items-center gap-1"
              onClick={onLoginClick}
              aria-label="Sign In"
            >
              <User size={20} /> Sign In
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4 bg-white border-t shadow-md">
          {/* Search Bar */}
          <div className="flex">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 border rounded-l-md px-3 py-2 text-sm focus:outline-none"
            />
            <button className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 rounded-r-md hover:opacity-90 transition">
              Search
            </button>
          </div>

          {/* Icons */}
          <div className="flex flex-col gap-4 text-gray-700">
            <button
              className="flex items-center gap-2"
              onClick={() => {
                navigate("/cart");
                setMenuOpen(false);
              }}
            >
              <ShoppingCart size={20} /> Cart
              {cartCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="flex items-center gap-2"
              onClick={() => {
                navigate("/wishlist");
                setMenuOpen(false);
              }}
            >
              <Heart size={20} /> Wishlist
            </button>

            <button
              className="flex items-center gap-2"
              onClick={() => {
                navigate("/notifications");
                setMenuOpen(false);
              }}
            >
              <Bell size={20} /> Notifications
            </button>

            {/* Auth Buttons for Mobile */}
            {currentUser ? (
              <div className="mb-2 border-t pt-2">
                <p className="text-gray-700 font-semibold px-2">
                  Hello, {displayName}
                </p>
                <button
                  className="block w-full text-left px-2 py-2 hover:bg-gray-100"
                  onClick={() => {
                    navigate("/profile");
                    setMenuOpen(false);
                  }}
                >
                  Profile
                </button>
                <button
                  className="block w-full text-left px-2 py-2 hover:bg-gray-100"
                  onClick={() => {
                    navigate("/orders");
                    setMenuOpen(false);
                  }}
                >
                  Orders
                </button>
                <button
                  className="block w-full text-left px-2 py-2 hover:bg-gray-100"
                  onClick={() => {
                    navigate("/settings");
                    setMenuOpen(false);
                  }}
                >
                  Settings
                </button>
                <button
                  className="block w-full text-left px-2 py-2 hover:bg-gray-100 text-red-600"
                  onClick={() => {
                    onLogout();
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="flex items-center gap-2"
                onClick={() => {
                  onLoginClick();
                  setMenuOpen(false);
                }}
              >
                <User size={20} /> Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
