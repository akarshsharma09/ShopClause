// src/pages/Home.jsx
import { categories } from "../data/categories";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const heroImages = [
  "/images/hero/Hero1.webp",
  "/images/hero/hero2.webp",
  "/images/hero/hero3.webp",
  "/images/hero/hero4.webp",
];

const dealImages = [
  "/images/deals/buds.webp",
  "/images/deals/camera.webp",
  "/images/deals/watch.webp",
  "/images/deals/projector.webp",
  "/images/deals/desktop.webp",
];

const bestsellerImages = [
  "/images/bestseller/breakfast.webp",
  "/images/bestseller/coffee.webp",
  "/images/bestseller/cycle.webp",
  "/images/bestseller/dryfruits.webp",
  "/images/bestseller/education.webp",
  "/images/bestseller/food.webp",
  "/images/bestseller/honey.webp",
  "/images/bestseller/monitor.webp",
  "/images/bestseller/printer.webp",
  "/images/bestseller/speaker.webp",
  "/images/bestseller/tea.webp",
  "/images/bestseller/toy.webp",
];

// 🔹 Step 2: CategoryBar Component
const CategoryBar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-sm py-4 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-8 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/category/${cat.id}`)}
            className="flex flex-col items-center cursor-pointer hover:text-blue-600 transition"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-12 h-12 md:w-16 md:h-16 object-contain mb-2"
            />
            <span className="text-xs md:text-sm font-medium text-center">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔹 Auto-slide every 2 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50">
      {/* 🔹 Category Section */}
      <CategoryBar />

      {/* 🔹 Hero Banner / Carousel */}
      <div className="mt-4 px-2 md:px-10">
        <div className="relative w-full h-40 sm:h-60 md:h-80 rounded-xl overflow-hidden shadow-lg">
          <img
            src={heroImages[currentIndex]}
            alt="Hero Banner"
            className="w-full h-full object-cover transition-all duration-700"
          />

          {/* Dots Indicator */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === currentIndex ? "bg-white" : "bg-gray-400"
                }`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 Deals of the Day */}
      <div className="mt-6 px-2 md:px-10">
        <h2 className="text-lg md:text-xl font-semibold mb-4">
          Deals of the Day
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {dealImages.map((img, i) => (
            <div
              key={i}
              className="bg-white p-3 rounded-lg shadow hover:shadow-lg cursor-pointer transition"
            >
              <img
                src={img}
                alt={`Deal ${i + 1}`}
                className="w-full h-32 object-contain mb-2"
              />
              <h3 className="text-sm font-medium text-gray-700">
                Product {i + 1}
              </h3>
              <p className="text-blue-600 font-semibold">₹{(i + 1) * 999}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Product Grid */}
      <div className="mt-10 px-2 md:px-10 pb-10">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Best Sellers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {bestsellerImages.map((img, i) => (
            <div
              key={i}
              className="bg-white p-3 rounded-lg shadow hover:shadow-lg cursor-pointer transition"
            >
              <img
                src={img}
                alt={`Bestseller ${i + 1}`}
                className="w-full h-32 object-contain mb-2"
              />
              <h3 className="text-sm font-medium text-gray-700">
                Item {i + 1}
              </h3>
              <p className="text-blue-600 font-semibold">₹{(i + 1) * 499}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
