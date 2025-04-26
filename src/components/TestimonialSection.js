import React from "react";

const testimonials = [
  { name: "Alice", text: "Great service and fast delivery!" },
  { name: "Bob", text: "Wide range of products and good prices." },
  { name: "Carol", text: "Customer support was very helpful." },
];

const TestimonialSection = () => (
  <section
    className="testimonial-section"
    style={{ padding: "30px 0", background: "#33acff" }}
  >
    <h2 style={{ textAlign: "center" }}>What Our Customers Say</h2>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        marginTop: "20px",
      }}
    >
      {testimonials.map((t, idx) => (
        <div
          key={idx}
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            minWidth: "200px",
          }}
        >
          <p>"{t.text}"</p>
          <div style={{ fontWeight: "bold", marginTop: "10px" }}>
            - {t.name}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TestimonialSection;
