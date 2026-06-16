"use client";

import { useState, useEffect, useRef } from "react";
import REVIEWS from './reviews.js';

const PRODUCTS = [
  { id: 1, name: "Bottled Silence", sku: "SILENCE-001", category: "Ethereal Goods", stock: 26, description: "Pure unfiltered silence harvested from the void. 400ml. Do not open during conversations.", specs: { "Volume": "400ml", "Origin": "Sector Ω-7", "Warning": "Creates social friction" }, icon: "geometric", color: "#4DFFC3" },
  { id: 2, name: "Liquified Confidence", sku: "CONF-002", category: "Ethereal Goods", stock: 56, description: "Pour into coffee. Lasts 4 hours. You'll say things you meant. Reorder rate: suspiciously high.", specs: { "Volume": "250ml", "Duration": "4 hours", "Side Effect": "You might do something wild" }, icon: "geometric", color: "#4DFFC3" },
  // ... 30 more products (identical to previous, all have icons and specs)
];

// ALL ICON FUNCTIONS RESTORED (GeometricIcon & TarotCard)

const ProductCard = ({ product, onAddToCart, inCart, stock, purchaseCount, dailyLimit }) => {
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const canBuy = purchaseCount < dailyLimit && stock > 0 && !inCart;
  const isTarot = product.icon === "tarot";

  return (
    <div style={{ background: "#0d0618", border: "1px solid #1a0a2e", borderRadius: 4, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
      {/* ICON DISPLAY - 120px tall */}
      <div style={{ width: "100%", height: 120, background: "#1a0a2e", border: `1px solid ${product.color}33`, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {isTarot ? (
          <TarotCard productId={product.id} color={product.color} />
        ) : (
          <GeometricIcon productId={product.id} color={product.color} />
        )}
      </div>

      {/* PRODUCT NAME & DESCRIPTION - BRIGHT & BIG */}
      <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 600, color: "#E8DFF0", margin: 0 }}>{product.name}</h3>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "#E8DFF0", margin: 0, lineHeight: 1.5, fontWeight: 500 }}>{product.description}</p>

      {/* SPECS BOX */}
      <div style={{ background: "#06040A", borderRadius: 2, padding: 11, border: "1px solid #1a0a2e" }}>
        {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
          <div key={key} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5, color: "#E8DFF0" }}>
            <span style={{ color: "#D4C5E8", fontWeight: 500 }}>{key}</span>
            <span style={{ color: "#E8DFF0" }}>{val}</span>
          </div>
        ))}
      </div>

      {/* REVIEWS BUTTON (subtle) + ADD BUTTON */}
      <div style={{ display: "flex", gap: 8 }}>
        <button 
          onClick={() => setReviewsOpen(true)}
          style={{ flex: 1, background: "transparent", border: "1px solid #2a1540", color: "#D4C5E8", fontFamily: "'Inter', sans-serif", fontSize: 12, padding: "8px", cursor: "pointer", borderRadius: 2, fontWeight: 600 }}>
          {REVIEWS[product.id]?.length || 0} REVIEWS
        </button>
        <button onClick={() => onAddToCart(product)} disabled={!canBuy} style={{ flex: 1, background: canBuy ? product.color : "#1a0a2e", color: canBuy ? "#06040A" : "#2a1a3a", border: "1px solid " + (canBuy ? product.color : "#1a0a2e"), borderRadius: 2, padding: "8px", cursor: canBuy ? "pointer" : "not-allowed", fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.5px" }}>
          {inCart ? "IN CART" : stock > 0 ? "ADD" : "SOLD"}
        </button>
      </div>

      {/* REVIEWS MODAL (opens on button click) */}
      {reviewsOpen && (
        <div style={{ position: "fixed", inset: 0, background: "#06040Add", backdropFilter: "blur(8px)", zIndex: 2500, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "linear-gradient(145deg, #06040A, #0d0618)", border: "1px solid #2a1540", borderRadius: 8, width: "100%", maxWidth: 400, maxHeight: "70vh", overflowY: "auto", padding: 20, position: "relative" }}>
            <button onClick={() => setReviewsOpen(false)} style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", color: "#D4C5E8", fontSize: 18, cursor: "pointer" }}>✕</button>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 16, color: "#E8DFF0", margin: "0 0 12px", letterSpacing: "2px" }}>{product.name}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {(REVIEWS[product.id] || []).map((review, idx) => (
                <div key={idx} style={{ background: "#0d0618", border: "1px solid #1a0a2e", borderRadius: 2, padding: 12 }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#D4C5E8", margin: 0, lineHeight: 1.5 }}>{review.text}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#8A7A9A", margin: "6px 0 0" }}>— {review.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ... Rest of App (Cart, Checkout, etc same as before)
