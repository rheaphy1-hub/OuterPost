"use client";

import { useState, useEffect, useRef } from "react";
import REVIEWS from './reviews.js';

const PRODUCTS = [
  // ETHEREAL GOODS
  { id: 1, name: "Bottled Silence", sku: "SILENCE-001", category: "Ethereal Goods", stock: 26, description: "Pure unfiltered silence harvested from the void. 400ml. Do not open during conversations.", specs: { "Volume": "400ml", "Origin": "Sector Ω-7", "Warning": "Creates social friction" }, icon: "geometric", color: "#4DFFC3" },
  { id: 2, name: "Liquified Confidence", sku: "CONF-002", category: "Ethereal Goods", stock: 56, description: "Pour into coffee. Lasts 4 hours. You'll say things you meant. Reorder rate: suspiciously high.", specs: { "Volume": "250ml", "Duration": "4 hours", "Side Effect": "You might do something wild" }, icon: "geometric", color: "#4DFFC3" },
  { id: 3, name: "Regret (Concentrated)", sku: "REGRET-003", category: "Ethereal Goods", stock: 10, description: "Experience every bad decision at once. Comes with a stress ball shaped like your choices. Recommended for 3am alone.", specs: { "Format": "Vial", "Duration": "2-3 hours", "Best Used": "Late night, ice cream nearby" }, icon: "geometric", color: "#4DFFC3" },

  // PERSONAL EFFECTS
  { id: 4, name: "Your Shadow, Pressed & Framed", sku: "SHADOW-004", category: "Personal Effects", stock: 63, description: "Your shadow, professionally preserved. Predates you by 11 minutes. Frame certified by something wearing your handwriting.", specs: { "Dimensions": "16\" x 20\"", "Age": "Always ahead of you", "Authenticity": "Legally ambiguous" }, icon: "geometric", color: "#9B6EFF" },
  { id: 5, name: "The Apology You Owe Yourself", sku: "APOLOGY-005", category: "Personal Effects", stock: 92, description: "Handwritten by the universe. Sealed. Elegant. Forgiving. Read only when ready.", specs: { "Format": "Sealed letter", "Contents": "Real forgiveness", "Open When": "Ready" }, icon: "geometric", color: "#9B6EFF" },
  { id: 6, name: "Proof You Were Right", sku: "RIGHT-006", category: "Personal Effects", stock: 10, description: "Timestamped receipts notarized by entities outside this dimension. You were right all along.", specs: { "Format": "Official ledger", "Notary": "Interdimensional", "Useful": "Emotionally" }, icon: "geometric", color: "#9B6EFF" },

  // ARCHITECTURAL
  { id: 7, name: "A Door That Wasn't There Yesterday", sku: "DOOR-007", category: "Architectural", stock: 9, description: "Standard door. Opens onto different hallways each time. Ships disassembled. Previous owners describe the smell as 'familiar but impossible to place.'", specs: { "Dimensions": "32\" x 80\"", "Destinations": "Unknown", "Material": "Resembles oak (probably)" }, icon: "geometric", color: "#FFD166" },
  { id: 8, name: "A Room You've Never Seen Before (But Remember)", sku: "ROOM-008", category: "Architectural", stock: 20, description: "Assembled from places you only dreamed about. Square footage impossible. Lighting always golden hour. Comes with eerie sense of home.", specs: { "Lighting": "Always golden hour", "Memory": "False but real", "Deja vu": "Extreme" }, icon: "geometric", color: "#FFD166" },

  // TEMPORAL OBJECTS
  { id: 9, name: "3:47 AM (Cursed Hour, 1987)", sku: "HOUR-009", category: "Temporal Objects", stock: 72, description: "A specific moment in time. Single owner. Never fully experienced. Comes in velvet case. Still ticking. Not responsible for what you remember.", specs: { "Time": "3:47 AM", "Year": "1987", "Condition": "Still ticking" }, icon: "geometric", color: "#FFD166" },
  { id: 10, name: "24 Hours of Being Right", sku: "RIGHT-TIME-010", category: "Temporal Objects", stock: 6, description: "One day where you're right about everything. Includes retroactive arguments from your entire life. Everyone will hate you. Time resets at midnight.", specs: { "Duration": "24 hours", "Scope": "All arguments ever", "Downside": "Social consequences" }, icon: "geometric", color: "#FFD166" },

  // AUDIO
  { id: 11, name: "Echo of a Conversation You Never Had", sku: "ECHO-011", category: "Audio", stock: 71, description: "Stored in amber. The words you needed to hear. Warm, urgent, exactly right. Source person unidentified.", specs: { "Medium": "Amber", "Duration": "3:47", "Clarity": "Perfect" }, icon: "geometric", color: "#4DFFC3" },
  { id: 12, name: "The Voicemail They Left at 4am (After Tequila)", sku: "VOICEMAIL-012", category: "Audio", stock: 57, description: "Drunk rambling. Says your name 6 times. Contradicts itself. Cuts off mid-word. You'll know exactly what they meant.", specs: { "Time": "4:17 AM", "Clarity": "Slurred", "Name Mentions": "6" }, icon: "geometric", color: "#4DFFC3" },
  { id: 13, name: "Their 'Getting Over You' Playlist", sku: "PLAYLIST-013", category: "Audio", stock: 25, description: "47 tracks. Some sad. Some about you. Some about someone else. Some suspicious. 3:12 hours of their attempt to move on.", specs: { "Songs": "47", "Duration": "3:12", "About You": "Unclear" }, icon: "geometric", color: "#4DFFC3" },
  { id: 14, name: "The Last 12 Minutes of a Dream", sku: "DREAM-014", category: "Audio", stock: 78, description: "Cassette tape. Side A: the dream. Someone was in it. The ending felt important. Side B is blank but warm.", specs: { "Format": "Cassette", "Duration": "12 minutes", "Side B": "Blank, warm" }, icon: "geometric", color: "#4DFFC3" },

  // NAVIGATION
  { id: 15, name: "Map to a Place That Only Exists When You're Asleep", sku: "MAP-015", category: "Navigation", stock: 57, description: "Hand-drawn on paper that wasn't made here. Landmarks: the tall building, the school that isn't yours, the ocean always too close.", specs: { "Scale": "Unreliable", "Landmarks": "3 (maybe 4)", "Accuracy": "Only when dreaming" }, icon: "geometric", color: "#4DFFC3" },
  { id: 16, name: "GPS to Your Best Decision", sku: "GPS-016", category: "Navigation", stock: 74, description: "Points toward the choice you should make. Battery life unpredictable. Accuracy approximately 45%. Warranty void if questioned.", specs: { "Accuracy": "45%", "Battery": "Sometimes", "Warranty": "Void" }, icon: "geometric", color: "#4DFFC3" },

  // FUTURE ARTIFACTS
  { id: 17, name: "Fossilized Premonition (Unverified)", sku: "PREM-017", category: "Future Artifacts", stock: 24, description: "Encased in obsidian. Radiometric dating places origin at 'soon.' Contents permanently sealed. Do not microwave.", specs: { "Casing": "Obsidian", "Dating": "Future (approximate)", "Warning": "Do not microwave" }, icon: "geometric", color: "#FFD166" },
  { id: 18, name: "The Version of You From 5 Years Ahead", sku: "FUTURE-YOU-018", category: "Future Artifacts", stock: 85, description: "Letter from future you. Contains advice weirdly specific to now. Handwriting almost yours but slightly evolved. Open when you need it most.", specs: { "Format": "Sealed letter", "Handwriting": "Familiar, evolved", "When": "You'll know" }, icon: "geometric", color: "#FFD166" },

  // BIOCHEMISTRY (Love/Relationships) - TAROT STYLE
  { id: 19, name: "Digital Vaporizer", sku: "VAPOR-019", category: "Biochemistry", stock: 50, description: "Vaporizes any image of you from their device permanently. No trace. They'll never know. Range: interdimensional.", specs: { "Range": "Everywhere", "Reversibility": "No", "Guilt": "Manageable" }, icon: "tarot", color: "#FF6B9D" },
  { id: 20, name: "The Drafts Folder of Texts They Almost Sent", sku: "DRAFTS-020", category: "Biochemistry", stock: 2, description: "47 unsent messages. Desperation increases with each draft. Last one cuts off mid-word. Read the progression.", specs: { "Messages": "47", "Progression": "Desperate", "Last One": "Incomplete" }, icon: "tarot", color: "#FF6B9D" },
  { id: 21, name: "Body Swap Ray", sku: "SWAP-021", category: "Biochemistry", stock: 26, description: "24 hours in their body. Experience exactly what they felt, saw, thought. Comes with overwhelming guilt and new understanding.", specs: { "Duration": "24 hours", "What You'll Know": "Everything", "Cost": "High" }, icon: "tarot", color: "#FF6B9D" },
  { id: 22, name: "The 'I'm Not Mad' Text (Decoded)", sku: "DECODED-022", category: "Biochemistry", stock: 36, description: "Their exact text with real-time translation. Spoiler: they're mad. Very mad. This will hurt.", specs: { "Translation": "Accurate", "Subtext": "They're angry", "Honesty": "Brutal" }, icon: "tarot", color: "#FF6B9D" },
  { id: 23, name: "Your Rank in Their Search History", sku: "RANK-023", category: "Biochemistry", stock: 59, description: "How often they searched you vs their ex vs random stuff. Last 24 months. Comparison unflinching. Results may hurt.", specs: { "Period": "24 months", "Comparison": "Brutal", "Recommendation": "Maybe don't look" }, icon: "tarot", color: "#FF6B9D" },
  { id: 24, name: "Their Honest Opinion (Sealed)", sku: "HONEST-024", category: "Biochemistry", stock: 6, description: "Bottled. Their actual unfiltered opinion about you. Sealed. Do not open unless certain you're ready. May cause breakage.", specs: { "Format": "Sealed bottle", "Contents": "Unfiltered truth", "Recommendation": "Don't open" }, icon: "tarot", color: "#FF6B9D" },
  { id: 25, name: "Selective Memory Wipe", sku: "WIPE-025", category: "Biochemistry", stock: 46, description: "Choose which memories to keep, which to delete. Warning: you can't choose which details disappear with them. Recovery disorienting.", specs: { "Control": "Theoretical", "Consequences": "Unpredictable", "You'll Miss": "Everything" }, icon: "tarot", color: "#FF6B9D" },
  { id: 26, name: "Closure (Bottled)", sku: "CLOSURE-026", category: "Biochemistry", stock: 7, description: "Pop the cork. Feel complete. Satisfaction not guaranteed. Most users report it tastes like expensive lies. Return rate surprisingly high.", specs: { "Format": "Sealed bottle", "Effect": "Temporary", "Taste": "Complicated" }, icon: "tarot", color: "#FF6B9D" },

  // METAMORPHOSIS (Self-Development)
  { id: 27, name: "Confidence You Didn't Know You Had", sku: "CONF-27", category: "Metamorphosis", stock: 39, description: "Buried deep. You earned it. Instructions on extraction included. Mild side effect: you'll stop apologizing for existing.", specs: { "Location": "Deep", "Effort": "High", "Worth It": "Absolutely" }, icon: "geometric", color: "#C8B8D4" },
  { id: 28, name: "Unspoken Boundaries", sku: "BOUND-28", category: "Metamorphosis", stock: 18, description: "What you meant but didn't say. Crystallized. Gives you script when you need it. Requires practice to deploy.", specs: { "Format": "Crystal", "Activation": "Requires courage", "Payoff": "Immediate" }, icon: "geometric", color: "#C8B8D4" },
  { id: 29, name: "Motivation (Not Forced)", sku: "MOT-29", category: "Metamorphosis", stock: 67, description: "Arrives when you actually want it. Doesn't feel like discipline. Suspiciously enjoyable. Users describe it as 'finally getting it.'", specs: { "Type": "Intrinsic", "Feeling": "Natural", "Sustainability": "Long-term" }, icon: "geometric", color: "#C8B8D4" },
  { id: 30, name: "Permission to Stop Trying", sku: "STOP-30", category: "Metamorphosis", stock: 9, description: "Official release. This thing? You can let it go. Notarized by someone who cares about you. Incredibly soothing.", specs: { "Format": "Official document", "Witness": "Someone who loves you", "Relief": "Instant" }, icon: "geometric", color: "#C8B8D4" },
  { id: 31, name: "The Apology You Owe Yourself II (Expanded Edition)", sku: "APOL2-31", category: "Metamorphosis", stock: 53, description: "Extended version. Addresses all of it. Includes forgiveness for the things you haven't told anyone. Read at your own pace.", specs: { "Length": "Comprehensive", "Coverage": "All of it", "Tone": "Gentle, firm" }, icon: "geometric", color: "#C8B8D4" },
  { id: 32, name: "What You'd Tell Your Younger Self", sku: "YOUNG-32", category: "Metamorphosis", stock: 81, description: "Letter from you now. Spoiler-free. Kind without being patronizing. Changes nothing and everything.", specs: { "Format": "Letter", "Tone": "Honest", "Impact": "Surprisingly deep" }, icon: "geometric", color: "#C8B8D4" },
];

const DAILY_LIMIT = 3;

const ProductCard = ({ product, onAddToCart, inCart, stock, purchaseCount, dailyLimit }) => {
  const [expanded, setExpanded] = useState(false);
  const canBuy = purchaseCount < dailyLimit && stock > 0 && !inCart;

  return (
    <div style={{ background: "#0d0618", border: "1px solid #1a0a2e", borderRadius: 4, padding: 16, display: "flex", flexDirection: "column", gap: 12, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: product.color, opacity: 0.8 }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 600, color: "#E8DFF0", margin: "0 0 4px" }}>{product.name}</h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#9B7CB8", margin: 0, letterSpacing: "0.5px" }}>{product.category}</p>
        </div>
        <span style={{ background: product.color, color: "#06040A", padding: "4px 8px", borderRadius: 2, fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700 }}>●</span>
      </div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#D0BFE0", margin: 0, lineHeight: 1.4 }}>{product.description}</p>
      {expanded && (
        <div style={{ background: "#06040A", padding: 12, borderRadius: 2, borderLeft: `3px solid ${product.color}` }}>
          {Object.entries(product.specs).map(([key, value]) => (
            <div key={key} style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#B8A8D0", margin: "6px 0" }}>
              <strong style={{ color: product.color }}>{key}:</strong> {value}
            </div>
          ))}
        </div>
      )}
      {REVIEWS[product.id] && (
        <div style={{ background: "#06040A", padding: 12, borderRadius: 2, borderLeft: `3px solid ${product.color}` }}>
          {REVIEWS[product.id].map((review, idx) => (
            <div key={idx} style={{ marginBottom: idx < REVIEWS[product.id].length - 1 ? 10 : 0, paddingBottom: idx < REVIEWS[product.id].length - 1 ? 10 : 0, borderBottom: idx < REVIEWS[product.id].length - 1 ? `1px solid #1a0a2e` : "none" }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#9B7CB8", marginBottom: 4, letterSpacing: "0.5px" }}>★ {review.rating}/5</div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#D0BFE0", margin: 0, fontStyle: "italic" }}>"{review.text}"</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#7A6A8A", margin: "4px 0 0", letterSpacing: "0.5px" }}>— {review.author}</p>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
        <button onClick={() => setExpanded(!expanded)} style={{ flex: 1, background: "transparent", border: "1px solid #2a1540", borderRadius: 2, padding: "10px 12px", cursor: "pointer", color: "#B8A8D0", fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.5px" }}>
          {expanded ? "CLOSE" : "SPECS"}
        </button>
        <button onClick={() => onAddToCart(product)} disabled={!canBuy} style={{ flex: 1, background: canBuy ? product.color : "#1a0a2e", color: canBuy ? "#06040A" : "#2a1a3a", border: "1px solid " + (canBuy ? product.color : "#1a0a2e"), borderRadius: 2, padding: "10px 12px", cursor: canBuy ? "pointer" : "not-allowed", fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.5px" }}>
          {inCart ? "IN CART" : stock > 0 ? "ADD" : "SOLD"}
        </button>
      </div>
    </div>
  );
};

const CartDrawer = ({ cart, onRemove, onCheckout, onClose, isMobile }) => {
  const total = cart.length;

  return (
    <div style={{ position: "fixed", right: 0, top: 0, height: "100vh", width: isMobile ? "100%" : 360, background: "#06040A", borderLeft: "1px solid #1a0a2e", zIndex: 1000, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: 16, borderBottom: "1px solid #1a0a2e", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 14, fontWeight: 600, color: "#E8DFF0", margin: 0, letterSpacing: "1px" }}>CART ({total})</h2>
        <button onClick={onClose} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#C8B8D4", fontSize: 18 }}>✕</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {cart.map(item => (
          <div key={item.id} style={{ padding: 12, borderBottom: "1px solid #0d0618", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#E8DFF0", margin: "0 0 4px", fontWeight: 500 }}>{item.name}</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#8A7A9A", margin: 0 }}>{item.category}</p>
            </div>
            <button onClick={() => onRemove(item.id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#FF6B9D", fontSize: 14, padding: 4 }}>✕</button>
          </div>
        ))}
      </div>
      <div style={{ padding: 16, borderTop: "1px solid #1a0a2e", gap: 8, display: "flex", flexDirection: "column" }}>
        <button onClick={onCheckout} disabled={total === 0} style={{ background: total > 0 ? "#4DFFC3" : "#1a0a2e", color: total > 0 ? "#06040A" : "#2a1a3a", border: "none", borderRadius: 2, padding: "12px 16px", cursor: total > 0 ? "pointer" : "not-allowed", fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 600, letterSpacing: "1px" }}>
          CHECKOUT ({total})
        </button>
      </div>
    </div>
  );
};

const CheckoutModal = ({ cart, onClose, onComplete, isMobile }) => {
  const [formData, setFormData] = useState({ name: "", email: "", platform: "" });
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const handleCheckout = () => {
    if (formData.name && formData.email && selectedPlatform) {
      if (selectedPlatform === "instagram") {
        window.open("https://instagram.com/the.outer.post", "_blank");
      } else if (selectedPlatform === "tiktok") {
        window.open("https://www.tiktok.com/@theouterpost", "_blank");
      }
      onComplete();
      onClose();
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "#00000080", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000, padding: isMobile ? 16 : 0 }}>
      <div style={{ background: "#06040A", border: "1px solid #1a0a2e", borderRadius: 4, padding: 24, maxWidth: 480, width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 18, fontWeight: 600, color: "#E8DFF0", margin: 0, letterSpacing: "1px" }}>HAUL TIME</h2>
          <button onClick={onClose} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#C8B8D4", fontSize: 20 }}>✕</button>
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#B8A8D0", marginBottom: 20 }}>Confirm your haul, then screenshot & post to prove you got stuff that doesn't exist.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
          <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ background: "#0d0618", border: "1px solid #1a0a2e", borderRadius: 2, padding: 12, color: "#E8DFF0", fontFamily: "'Inter', sans-serif", fontSize: 13 }} />
          <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ background: "#0d0618", border: "1px solid #1a0a2e", borderRadius: 2, padding: 12, color: "#E8DFF0", fontFamily: "'Inter', sans-serif", fontSize: 13 }} />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setSelectedPlatform("instagram")} style={{ flex: 1, background: selectedPlatform === "instagram" ? "#4DFFC3" : "transparent", border: "1px solid " + (selectedPlatform === "instagram" ? "#4DFFC3" : "#1a0a2e"), borderRadius: 2, padding: 12, cursor: "pointer", color: selectedPlatform === "instagram" ? "#06040A" : "#B8A8D0", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600 }}>
              Instagram
            </button>
            <button onClick={() => setSelectedPlatform("tiktok")} style={{ flex: 1, background: selectedPlatform === "tiktok" ? "#4DFFC3" : "transparent", border: "1px solid " + (selectedPlatform === "tiktok" ? "#4DFFC3" : "#1a0a2e"), borderRadius: 2, padding: 12, cursor: "pointer", color: selectedPlatform === "tiktok" ? "#06040A" : "#B8A8D0", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600 }}>
              TikTok
            </button>
          </div>
        </div>
        <button onClick={handleCheckout} disabled={!formData.name || !formData.email || !selectedPlatform} style={{ width: "100%", background: formData.name && formData.email && selectedPlatform ? "#FF6B9D" : "#1a0a2e", color: formData.name && formData.email && selectedPlatform ? "#E8DFF0" : "#2a1a3a", border: "none", borderRadius: 2, padding: 14, cursor: formData.name && formData.email && selectedPlatform ? "pointer" : "not-allowed", fontFamily: "'Cinzel', serif", fontSize: 14, fontWeight: 600, letterSpacing: "1px" }}>
          COMPLETE & FOLLOW
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [filter, setFilter] = useState("ALL");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [purchaseCount, setPurchaseCount] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const saved = localStorage.getItem("riftmarket_daily_purchases");
    return saved ? parseInt(saved) : 0;
  });

  const stocks = PRODUCTS.reduce((acc, p) => { acc[p.id] = p.stock; return acc; }, {});

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem("riftmarket_daily_purchases", purchaseCount.toString());
  }, [purchaseCount]);

  const addToCart = (p) => setCart(prev => (prev.find(i => i.id === p.id) ? prev : [...prev, p]));
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const handleCheckoutComplete = () => { setPurchaseCount(purchaseCount + cart.length); setCart([]); };
  const categories = ["ALL", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  const filtered = PRODUCTS.filter(p => filter === "ALL" || p.category === filter);

  return (
    <div style={{ minHeight: "100vh", background: "#06040A", color: "#E8DFF0", overflowX: "hidden" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}body{background:#06040A}::selection{background:#4DFFC322;color:#4DFFC3}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#06040A}::-webkit-scrollbar-thumb{background:#2a1540;border-radius:2px}input::placeholder{color:#6a5a7a}input:focus{border-color:#4DFFC3!important;outline:none}@keyframes twinkle{0%,100%{opacity:var(--op)}50%{opacity:calc(var(--op)*0.15)}}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}@media (max-width:768px){.grid{grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px}}@media (max-width:480px){.grid{grid-template-columns:1fr;gap:12px}}`}</style>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {Array.from({ length: 70 }).map((_, i) => (<div key={i} style={{ position: "absolute", left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: 2, height: 2, borderRadius: "50%", background: Math.random() > 0.85 ? "#4DFFC3" : "#C8B8D4", opacity: Math.random() * 0.4 + 0.1, animation: `twinkle ${Math.random() * 5 + 2}s ease-in-out ${Math.random() * 4}s infinite`, "--op": Math.random() * 0.4 + 0.1 }} />))}
      </div>
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "#06040Aee", backdropFilter: "blur(14px)", borderBottom: "1px solid #1a0a2e", padding: isMobile ? "12px 16px" : "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: isMobile ? 56 : 62 }}>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: isMobile ? 15 : 18, fontWeight: 700, letterSpacing: "2px", color: "#E8DFF0" }}>THE <span style={{ color: "#4DFFC3" }}>OUTER</span>POST</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {purchaseCount > 0 && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#4DFFC3", letterSpacing: "1px", fontWeight: 600 }}>{purchaseCount}/3 TODAY</div>}
          <button onClick={() => setCartOpen(true)} style={{ background: "transparent", border: "1px solid #2a1540", borderRadius: 1, padding: "8px 12px", cursor: "pointer", color: "#C8B8D4", fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: "1.5px", display: "flex", alignItems: "center", gap: 6, minHeight: "44px", fontWeight: 600 }}>
            ⬡ {cart.length > 0 && <span style={{ background: "#4DFFC3", color: "#06040A", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{cart.length}</span>}
          </button>
        </div>
      </header>
      <section style={{ position: "relative", zIndex: 1, textAlign: "center", padding: isMobile ? "48px 16px 36px" : "72px 32px 52px" }}>
        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: isMobile ? "clamp(24px, 6vw, 52px)" : "clamp(32px, 5.5vw, 68px)", fontWeight: 700, color: "#E8DFF0", lineHeight: 1.15, margin: "0 0 12px" }}>Objects From<br /><span style={{ color: "#9B6EFF" }}>Beyond the Known</span></h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#B8A8D0", margin: "0 0 24px", letterSpacing: "0.5px", fontWeight: 500 }}>Acquire what doesn't exist and share your haul</p>
        <div style={{ display: "flex", gap: 6, background: "#0d0618", border: "1px solid #1a0a2e", borderRadius: 2, padding: 6, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
          {categories.map(cat => (<button key={cat} onClick={() => setFilter(cat)} style={{ background: filter === cat ? "#1a0a2e" : "transparent", border: filter === cat ? "1px solid #4DFFC355" : "1px solid transparent", color: filter === cat ? "#4DFFC3" : "#8A7A9A", fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", padding: "10px 14px", cursor: "pointer", borderRadius: 1 }}>{cat}</button>))}
        </div>
      </section>
      <main style={{ position: "relative", zIndex: 1, maxWidth: 1180, margin: "0 auto", padding: isMobile ? "0 12px 60px" : "0 32px 80px" }}>
        <div className="grid">
          {filtered.map(product => (<ProductCard key={product.id} product={product} onAddToCart={addToCart} inCart={cart.some(i => i.id === product.id)} stock={stocks[product.id]} purchaseCount={purchaseCount} dailyLimit={DAILY_LIMIT} />))}
        </div>
      </main>
      {cartOpen && <div onClick={() => setCartOpen(false)} style={{ position: "fixed", inset: 0, background: "#00000055", zIndex: 999 }} />}
      {cartOpen && <CartDrawer cart={cart} onRemove={removeFromCart} onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }} onClose={() => setCartOpen(false)} isMobile={isMobile} />}
      {checkoutOpen && <CheckoutModal cart={cart} onClose={() => setCheckoutOpen(false)} onComplete={handleCheckoutComplete} isMobile={isMobile} />}
    </div>
  );
}
