import { useState } from "react";
import PaymentDropdown from "../components/PaymentDropdown";

export default function Checkout() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    payment: "COD",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed successfully!\n\nThank you ${form.name}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-2"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-2"
        />

        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full border rounded-lg p-2"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />
          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            value={form.zip}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />
        </div>

    <PaymentDropdown value={form.payment} onChange={handleChange} />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
