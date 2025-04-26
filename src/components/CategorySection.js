import React from "react";

const categories = [
  { name: "Vitamins", icon: "💊" },
  { name: "Supplements", icon: "🧴" },
  { name: "Personal Care", icon: "🧼" },
  { name: "Medical Devices", icon: "🩺" },
];

const CategorySection = () => (
  <section
    className="category-section"
    style={{ padding: "30px 0", background: "#fff" }}
  >
    <h2 style={{ textAlign: "center" }}>Shop by Category</h2>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        marginTop: "20px",
      }}
    >
      {categories.map((cat) => (
        <div key={cat.name} style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem" }}>{cat.icon}</div>
          <div>{cat.name}</div>
        </div>
      ))}
    </div>
  </section>
);

export default CategorySection;
