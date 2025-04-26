import React from "react";
const HeroSection = () => (
  <section
    className="hero-section"
    style={{
      position: "relative",
      minHeight: "500px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    }}
  >
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 0,
      }}
    >
      <source
        src="https://videos.pexels.com/video-files/8088983/8088983-sd_960_506_24fps.mp4"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
    <div
      style={{
        position: "relative",
        zIndex: 1,
        background: "rgba(255,255,255,0.85)",
        padding: "0px",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        textAlign: "center",
        maxWidth: "700px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "160px",
        boxSizing: "border-box",
        overflow: "auto",
        wordBreak: "break-word",
      }}
    >
      <h1
        style={{
          wordBreak: "break-word",
          width: "100%",
          overflowWrap: "break-word",
          whiteSpace: "normal",
        }}
      >
        Welcome to KN Store
      </h1>
      <p
        style={{
          wordBreak: "break-word",
          width: "100%",
          overflowWrap: "break-word",
          whiteSpace: "normal",
          marginTop: "0px",
        }}
      >
        Your trusted medical device supplier. Fast delivery, best prices!
      </p>
      <div
        style={{
          margin: "0px 0",
          width: "100%",
          display: "flex",
          flexDirection: "row", // changed from column to row
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <input
          type="text"
          placeholder="Search for products..."
          style={{
            padding: "8px",
            width: "100%",
            maxWidth: "250px",
            marginBottom: "0",
            marginRight: "8px", // add margin to the right
            boxSizing: "border-box",
            overflow: "hidden",
            whiteSpace: "normal",
          }}
        />
        <button
          style={{
            padding: "8px 10px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            width: "auto",
            maxWidth: "100px",
            boxSizing: "border-box",
            overflow: "hidden",
            whiteSpace: "normal",
          }}
        >
          Search
        </button>
      </div>
    </div>
  </section>
);

export default HeroSection;
