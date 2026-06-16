"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef } from "react";

const REVIEWS = {
  1: [
    { author: "alex", rating: 5, text: "Bottled all the silence in my life. My family finally left me alone.", date: "2 days ago" },
    { author: "jordan", rating: 5, text: "Used this in a meeting. Everyone got very uncomfortable. 10/10", date: "1 week ago" },
  ],
  2: [
    { author: "casey", rating: 5, text: "Drank it before my presentation. I said everything I meant. Promoted.", date: "3 days ago" },
    { author: "morgan", rating: 4, text: "Works TOO well. Said things I can't take back. Still worth it.", date: "1 week ago" },
  ],
  3: [
    { author: "sam", rating: 5, text: "Honestly? Helped me process everything. Cried for 2 hours. Felt better after.", date: "4 days ago" },
    { author: "alex", rating: 5, text: "Opened it at 3am. Best worst decision ever.", date: "2 weeks ago" },
  ],
  4: [
    { author: "jordan", rating: 5, text: "It genuinely predates me. Hung it in my office. Everyone asks about it.", date: "5 days ago" },
    { author: "casey", rating: 4, text: "Arrived scratched but the shadow didn't seem to care.", date: "1 week ago" },
  ],
  5: [
    { author: "morgan", rating: 5, text: "Read it when I was ready. Changed my perspective entirely.", date: "3 days ago" },
    { author: "sam", rating: 5, text: "This letter knew me better than I know myself.", date: "10 days ago" },
  ],
  6: [
    { author: "alex", rating: 5, text: "Finally have proof. Nobody believes me but I KNOW.", date: "1 week ago" },
    { author: "jordan", rating: 5, text: "Framed this. It's my favorite possession now.", date: "2 weeks ago" },
  ],
  19: [
    { author: "casey", rating: 5, text: "Every photo of them: GONE. They have no idea.", date: "3 days ago" },
    { author: "morgan", rating: 5, text: "This works. I tested it. Their phone is now clean.", date: "1 week ago" },
  ],
  20: [
    { author: "sam", rating: 5, text: "Reading all 47 was painful. They really did care.", date: "2 days ago" },
    { author: "jordan", rating: 5, text: "The progression from hopeful to desperate broke me.", date: "5 days ago" },
  ],
  21: [
    { author: "alex", rating: 5, text: "Spent 24 hours as them. I finally understand why they left.", date: "1 week ago" },
    { author: "casey", rating: 5, text: "Emotional. Devastating. Recommended.", date: "2 weeks ago" },
  ],
  22: [
    { author: "morgan", rating: 5, text: "The subtext was BRUTAL. They're definitely mad.", date: "3 days ago" },
    { author: "sam", rating: 5, text: "Translation: 'I'm furious and you should know why.'", date: "1 week ago" },
  ],
  27: [
    { author: "jordan", rating: 5, text: "Opened it. Applied for the job. Got it.", date: "2 days ago" },
    { author: "casey", rating: 5, text: "This vial changed my life. No exaggeration.", date: "1 week ago" },
  ],
  30: [
    { author: "alex", rating: 5, text: "Permission to rest. Actually rested. Revolutionary.", date: "3 days ago" },
    { author: "morgan", rating: 5, text: "Read this when I was burnt out. Needed this so badly.", date: "1 week ago" },
  ],
};

const PRODUCTS = [
  { id: 1, name: "Bottled Silence", sku: "SILENCE-001", category: "Ethereal Goods", stock: 26, description: "Pure unfiltered silence harvested from the void. 400ml. Do not open during conversations.", specs: { "Volume": "400ml", "Origin": "Sector Ω-7", "Warning": "Creates social friction" }, icon: "geometric", color: "#4DFFC3" },
  { id: 2, name: "Liquified Confidence", sku: "CONF-002", category: "Ethereal Goods", stock: 56, description: "Pour into coffee. Lasts 4 hours. You'll say things you meant. Reorder rate: suspiciously high.", specs: { "Volume": "250ml", "Duration": "4 hours", "Side Effect": "You might do something wild" }, icon: "geometric", color: "#4DFFC3" },
  { id: 3, name: "Regret (Concentrated)", sku: "REGRET-003", category: "Ethereal Goods", stock: 10, description: "Experience every bad decision at once. Comes with a stress ball shaped like your choices. Recommended for 3am alone.", specs: { "Format": "Vial", "Duration": "2-3 hours", "Best Used": "Late night, ice cream nearby" }, icon: "geometric", color: "#4DFFC3" },
  { id: 4, name: "Your Shadow, Pressed & Framed", sku: "SHADOW-004", category: "Personal Effects", stock: 63, description: "Your shadow, professionally preserved. Predates you by 11 minutes. Frame certified by something wearing your handwriting.", specs: { "Dimensions": "16\" x 20\"", "Age": "Always ahead of you", "Authenticity": "Legally ambiguous" }, icon: "geometric", color: "#9B6EFF" },
  { id: 5, name: "The Apology You Owe Yourself", sku: "APOLOGY-005", category: "Personal Effects", stock: 92, description: "Handwritten by the universe. Sealed. Elegant. Forgiving. Read only when ready.", specs: { "Format": "Sealed letter", "Contents": "Real forgiveness", "Open When": "Ready" }, icon: "geometric", color: "#9B6EFF" },
  { id: 6, name: "Proof You Were Right", sku: "RIGHT-006", category: "Personal Effects", stock: 10, description: "Timestamped receipts notarized by entities outside this dimension. You were right all along.", specs: { "Format": "Official ledger", "Notary": "Interdimensional", "Useful": "Emotionally" }, icon: "geometric", color: "#9B6EFF" },
  { id: 7, name: "A Door That Wasn't There Yesterday", sku: "DOOR-007", category: "Architectural", stock: 9, description: "Standard door. Opens onto different hallways each time. Ships disassembled. Previous owners describe the smell as 'familiar but impossible to place.'", specs: { "Dimensions": "32\" x 80\"", "Destinations": "Unknown", "Material": "Resembles oak (probably)" }, icon: "geometric", color: "#FFD166" },
  { id: 8, name: "A Room You've Never Seen Before (But Remember)", sku: "ROOM-008", category: "Architectural", stock: 20, description: "Assembled from places you only dreamed about. Square footage impossible. Lighting always golden hour. Comes with eerie sense of home.", specs: { "Lighting": "Always golden hour", "Memory": "False but real", "Deja vu": "Extreme" }, icon: "geometric", color: "#FFD166" },
  { id: 9, name: "3:47 AM (Cursed Hour, 1987)", sku: "HOUR-009", category: "Temporal Objects", stock: 72, description: "A specific moment in time. Single owner. Never fully experienced. Comes in velvet case. Still ticking. Not responsible for what you remember.", specs: { "Time": "3:47 AM", "Year": "1987", "Condition": "Still ticking" }, icon: "geometric", color: "#FFD166" },
  { id: 10, name: "24 Hours of Being Right", sku: "RIGHT-TIME-010", category: "Temporal Objects", stock: 6, description: "One day where you're right about everything. Includes retroactive arguments from your entire life. Everyone will hate you. Time resets at midnight.", specs: { "Duration": "24 hours", "Scope": "All arguments ever", "Downside": "Social consequences" }, icon: "geometric", color: "#FFD166" },
  { id: 11, name: "Echo of a Conversation You Never Had", sku: "ECHO-011", category: "Audio", stock: 71, description: "Stored in amber. The words you needed to hear. Warm, urgent, exactly right. Source person unidentified.", specs: { "Medium": "Amber", "Duration": "3:47", "Clarity": "Perfect" }, icon: "geometric", color: "#4DFFC3" },
  { id: 12, name: "The Voicemail They Left at 4am (After Tequila)", sku: "VOICEMAIL-012", category: "Audio", stock: 57, description: "Drunk rambling. Says your name 6 times. Contradicts itself. Cuts off mid-word. You'll know exactly what they meant.", specs: { "Time": "4:17 AM", "Clarity": "Slurred", "Name Mentions": "6" }, icon: "geometric", color: "#4DFFC3" },
  { id: 13, name: "Their 'Getting Over You' Playlist", sku: "PLAYLIST-013", category: "Audio", stock: 25, description: "47 tracks. Some sad. Some about you. Some about someone else. Some suspicious. 3:12 hours of their attempt to move on.", specs: { "Songs": "47", "Duration": "3:12", "About You": "Unclear" }, icon: "geometric", color: "#4DFFC3" },
  { id: 14, name: "The Last 12 Minutes of a Dream", sku: "DREAM-014", category: "Audio", stock: 78, description: "Cassette tape. Side A: the dream. Someone was in it. The ending felt important. Side B is blank but warm.", specs: { "Format": "Cassette", "Duration": "12 minutes", "Side B": "Blank, warm" }, icon: "geometric", color: "#4DFFC3" },
  { id: 15, name: "Map to a Place That Only Exists When You're Asleep", sku: "MAP-015", category: "Navigation", stock: 57, description: "Hand-drawn on paper that wasn't made here. Landmarks: the tall building, the school that isn't yours, the ocean always too close.", specs: { "Scale": "Unreliable", "Landmarks": "3 (maybe 4)", "Accuracy": "Only when dreaming" }, icon: "geometric", color: "#4DFFC3" },
  { id: 16, name: "GPS to Your Best Decision", sku: "GPS-016", category: "Navigation", stock: 74, description: "Points toward the choice you should make. Battery life unpredictable. Accuracy approximately 45%. Warranty void if questioned.", specs: { "Accuracy": "45%", "Battery": "Sometimes", "Warranty": "Void" }, icon: "geometric", color: "#4DFFC3" },
  { id: 17, name: "Fossilized Premonition (Unverified)", sku: "PREM-017", category: "Future Artifacts", stock: 24, description: "Encased in obsidian. Radiometric dating places origin at 'soon.' Contents permanently sealed. Do not microwave.", specs: { "Casing": "Obsidian", "Dating": "Future (approximate)", "Warning": "Do not microwave" }, icon: "geometric", color: "#FFD166" },
  { id: 18, name: "The Version of You From 5 Years Ahead", sku: "FUTURE-YOU-018", category: "Future Artifacts", stock: 85, description: "Letter from future you. Contains advice weirdly specific to now. Handwriting almost yours but slightly evolved. Open when you need it most.", specs: { "Format": "Sealed letter", "Handwriting": "Familiar, evolved", "When": "You'll know" }, icon: "geometric", color: "#FFD166" },
  { id: 19, name: "Digital Vaporizer", sku: "VAPOR-019", category: "Biochemistry", stock: 50, description: "Vaporizes any image of you from their device permanently. No trace. They'll never know. Range: interdimensional.", specs: { "Range": "Everywhere", "Reversibility": "No", "Guilt": "Manageable" }, icon: "tarot", color: "#FF6B9D" },
  { id: 20, name: "The Drafts Folder of Texts They Almost Sent", sku: "DRAFTS-020", category: "Biochemistry", stock: 2, description: "47 unsent messages. Desperation increases with each draft. Last one cuts off mid-word. Read the progression.", specs: { "Messages": "47", "Progression": "Desperate", "Last One": "Incomplete" }, icon: "tarot", color: "#FF6B9D" },
  { id: 21, name: "Body Swap Ray", sku: "SWAP-021", category: "Biochemistry", stock: 26, description: "24 hours in their body. Experience exactly what they felt, saw, thought. Comes with overwhelming guilt and new understanding.", specs: { "Duration": "24 hours", "What You'll Know": "Everything", "Cost": "High" }, icon: "tarot", color: "#FF6B9D" },
  { id: 22, name: "The 'I'm Not Mad' Text (Decoded)", sku: "DECODED-022", category: "Biochemistry", stock: 36, description: "Their exact text with real-time translation. Spoiler: they're mad. Very mad. This will hurt.", specs: { "Translation": "Accurate", "Subtext": "They're angry", "Honesty": "Brutal" }, icon: "tarot", color: "#FF6B9D" },
  { id: 23, name: "Your Rank in Their Search History", sku: "RANK-023", category: "Biochemistry", stock: 59, description: "How often they searched you vs their ex vs random stuff. Last 24 months. Comparison unflinching. Results may hurt.", specs: { "Period": "24 months", "Comparison": "Brutal", "Recommendation": "Maybe don't look" }, icon: "tarot", color: "#FF6B9D" },
  { id: 24, name: "Their Honest Opinion (Sealed)", sku: "HONEST-024", category: "Biochemistry", stock: 6, description: "Bottled. Their actual unfiltered opinion about you. Sealed. Do not open unless certain you're ready. May cause breakage.", specs: { "Format": "Sealed bottle", "Contents": "Unfiltered truth", "Recommendation": "Don't open" }, icon: "tarot", color: "#FF6B9D" },
  { id: 25, name: "Selective Memory Wipe", sku: "WIPE-025", category: "Biochemistry", stock: 46, description: "Choose which memories to keep, which to delete. Warning: you can't choose which details disappear with them. Recovery disorienting.", specs: { "Control": "Theoretical", "Consequences": "Unpredictable", "You'll Miss": "Everything" }, icon: "tarot", color: "#FF6B9D" },
  { id: 26, name: "Closure (Bottled)", sku: "CLOSURE-026", category: "Biochemistry", stock: 7, description: "Pop the cork. Feel complete. Satisfaction not guaranteed. Most users report it tastes like expensive lies. Return rate surprisingly high.", specs: { "Format": "Sealed bottle", "Effect": "Temporary", "Taste": "Complicated" }, icon: "tarot", color: "#FF6B9D" },
  { id: 27, name: "Confidence You Didn't Know You Had", sku: "CONF-27", category: "Metamorphosis", stock: 39, description: "Buried deep. You earned it. Instructions on extraction included. Mild side effect: you'll stop apologizing for existing.", specs: { "Location": "Deep", "Effort": "High", "Worth It": "Absolutely" }, icon: "geometric", color: "#C8B8D4" },
  { id: 28, name: "Unspoken Boundaries", sku: "BOUND-28", category: "Metamorphosis", stock: 18, description: "What you meant but didn't say. Crystallized. Gives you script when you need it. Requires practice to deploy.", specs: { "Format": "Crystal", "Activation": "Requires courage", "Payoff": "Immediate" }, icon: "geometric", color: "#C8B8D4" },
  { id: 29, name: "Motivation (Not Forced)", sku: "MOT-29", category: "Metamorphosis", stock: 67, description: "Arrives when you actually want it. Doesn't feel like discipline. Suspiciously enjoyable. Users describe it as 'finally getting it.'", specs: { "Type": "Intrinsic", "Feeling": "Natural", "Sustainability": "Long-term" }, icon: "geometric", color: "#C8B8D4" },
  { id: 30, name: "Permission to Stop Trying", sku: "STOP-30", category: "Metamorphosis", stock: 9, description: "Official release. This thing? You can let it go. Notarized by someone who cares about you. Incredibly soothing.", specs: { "Format": "Official document", "Witness": "Someone who loves you", "Relief": "Instant" }, icon: "geometric", color: "#C8B8D4" },
  { id: 31, name: "The Apology You Owe Yourself II (Expanded Edition)", sku: "APOL2-31", category: "Metamorphosis", stock: 53, description: "Extended version. Addresses all of it. Includes forgiveness for the things you haven't told anyone. Read at your own pace.", specs: { "Length": "Comprehensive", "Coverage": "All of it", "Tone": "Gentle, firm" }, icon: "geometric", color: "#C8B8D4" },
  { id: 32, name: "What You'd Tell Your Younger Self", sku: "YOUNG-32", category: "Metamorphosis", stock: 81, description: "Letter from you now. Spoiler-free. Kind without being patronizing. Changes nothing and everything.", specs: { "Format": "Letter", "Tone": "Honest", "Impact": "Surprisingly deep" }, icon: "geometric", color: "#C8B8D4" },
];

function GeometricIcon({ productId, color }) {
  const iconMap = {
    1: (c) => <svg viewBox="0 0 100 100"><path d="M 28 15 L 28 5 L 72 5 L 72 15 L 68 15 L 68 85 Q 68 95 50 95 Q 32 95 32 85 L 32 15 Z" stroke={c} strokeWidth="2.5" fill="none"/><circle cx="50" cy="50" r="16" fill="none" stroke={c} strokeWidth="2" opacity="0.7"/><circle cx="50" cy="50" r="10" fill="none" stroke={c} strokeWidth="1.5" opacity="0.4"/></svg>,
    2: (c) => <svg viewBox="0 0 100 100"><path d="M 50 25 L 75 55 L 62 55 L 62 80 L 38 80 L 38 55 L 25 55 Z" stroke={c} strokeWidth="2.5" fill="none"/><path d="M 32 68 Q 45 75 50 68 Q 55 75 68 68" stroke={c} strokeWidth="2" fill="none" opacity="0.7"/></svg>,
    3: (c) => <svg viewBox="0 0 100 100"><path d="M 38 15 L 62 15 L 70 88 Q 50 95 50 95 Q 30 88 30 88 Z" stroke={c} strokeWidth="2.5" fill="none"/><line x1="50" y1="25" x2="47" y2="75" stroke={c} strokeWidth="2" opacity="0.6"/><line x1="42" y1="30" x2="54" y2="70" stroke={c} strokeWidth="2" opacity="0.6"/><line x1="58" y1="35" x2="44" y2="80" stroke={c} strokeWidth="2" opacity="0.6"/></svg>,
    4: (c) => <svg viewBox="0 0 100 100"><path d="M 20 20 L 80 20 L 75 85 L 25 85 Z" stroke={c} strokeWidth="2.5" fill="none"/><circle cx="38" cy="50" r="4" fill={c} opacity="0.7"/><circle cx="62" cy="50" r="4" fill={c} opacity="0.7"/></svg>,
    5: (c) => <svg viewBox="0 0 100 100"><path d="M 30 25 L 70 25 L 70 80 Q 70 90 50 90 Q 30 90 30 80 Z" stroke={c} strokeWidth="2.5" fill="none"/><path d="M 50 35 L 50 75" stroke={c} strokeWidth="2" opacity="0.6"/><line x1="40" y1="50" x2="60" y2="50" stroke={c} strokeWidth="1.5" opacity="0.5"/></svg>,
    6: (c) => <svg viewBox="0 0 100 100"><rect x="20" y="20" width="60" height="60" stroke={c} strokeWidth="2.5" fill="none"/><path d="M 50 35 L 65 50 L 50 65 L 35 50 Z" stroke={c} strokeWidth="2" fill="none" opacity="0.7"/></svg>,
    7: (c) => <svg viewBox="0 0 100 100"><path d="M 28 15 L 28 85 L 72 85 L 72 15 Z" stroke={c} strokeWidth="2.5" fill="none"/><line x1="28" y1="15" x2="72" y2="15" stroke={c} strokeWidth="2"/><circle cx="68" cy="50" r="3" fill={c}/></svg>,
    8: (c) => <svg viewBox="0 0 100 100"><path d="M 20 25 L 80 25 L 80 80 Q 80 90 50 90 Q 20 90 20 80 Z" stroke={c} strokeWidth="2.5" fill="none"/><circle cx="38" cy="50" r="8" fill="none" stroke={c} strokeWidth="1.5" opacity="0.7"/><circle cx="62" cy="50" r="8" fill="none" stroke={c} strokeWidth="1.5" opacity="0.7"/></svg>,
  };
  return iconMap[productId]?.(color) || null;
}

function TarotCard({ productId, color }) {
  const tarotMap = {
    19: (c) => <svg viewBox="0 0 100 140"><rect x="5" y="5" width="90" height="130" stroke={c} strokeWidth="1.5" fill="none" rx="3"/><path d="M 50 20 L 48 38 L 32 36 L 48 48 L 45 66 L 50 54 L 55 66 L 52 48 L 68 36 L 52 38 Z" stroke={c} strokeWidth="2" fill="none"/><circle cx="50" cy="85" r="10" fill="none" stroke={c} strokeWidth="2" opacity="0.7"/></svg>,
    20: (c) => <svg viewBox="0 0 100 140"><rect x="5" y="5" width="90" height="130" stroke={c} strokeWidth="1.5" fill="none" rx="3"/><path d="M 38 22 L 62 22 L 68 50 L 62 38 L 50 44 L 38 38 L 48 50 Z" stroke={c} strokeWidth="2" fill="none"/><line x1="38" y1="62" x2="62" y2="62" stroke={c} strokeWidth="2" opacity="0.7"/><line x1="35" y1="80" x2="65" y2="80" stroke={c} strokeWidth="1.5" opacity="0.5"/></svg>,
    21: (c) => <svg viewBox="0 0 100 140"><rect x="5" y="5" width="90" height="130" stroke={c} strokeWidth="1.5" fill="none" rx="3"/><path d="M 28 38 Q 28 32 33 32 L 40 32 L 40 72 Q 40 78 33 78 L 28 78 Q 22 78 22 72 L 22 38 Z" fill={c} opacity="0.35"/><path d="M 72 38 Q 72 32 67 32 L 60 32 L 60 72 Q 60 78 67 78 L 72 78 Q 78 78 78 72 L 78 38 Z" fill={c} opacity="0.35"/><path d="M 40 56 L 60 56" stroke={c} strokeWidth="2.5" opacity="0.7"/></svg>,
    22: (c) => <svg viewBox="0 0 100 140"><rect x="5" y="5" width="90" height="130" stroke={c} strokeWidth="1.5" fill="none" rx="3"/><path d="M 50 22 L 32 34 L 50 46 L 68 34 Z" stroke={c} strokeWidth="2" fill="none"/><path d="M 50 48 L 32 60 L 50 72 L 68 60 Z" stroke={c} strokeWidth="2" fill="none" opacity="0.8"/><path d="M 50 74 L 32 86 L 50 98 L 68 86 Z" stroke={c} strokeWidth="2" fill="none" opacity="0.5"/></svg>,
    23: (c) => <svg viewBox="0 0 100 140"><rect x="5" y="5" width="90" height="130" stroke={c} strokeWidth="1.5" fill="none" rx="3"/><circle cx="50" cy="55" r="12" fill="none" stroke={c} strokeWidth="2"/><text x="32" y="62" fontSize="16" fontWeight="bold" fill={c} fontFamily="'Cinzel', serif" opacity="0.7">U</text><text x="58" y="62" fontSize="16" fontWeight="bold" fill={c} fontFamily="'Cinzel', serif" opacity="0.3">EX</text></svg>,
    24: (c) => <svg viewBox="0 0 100 140"><rect x="5" y="5" width="90" height="130" stroke={c} strokeWidth="1.5" fill="none" rx="3"/><path d="M 50 22 L 50 80" stroke={c} strokeWidth="2.5"/><path d="M 40 32 L 60 32" stroke={c} strokeWidth="2"/><path d="M 45 88 L 55 88" stroke={c} strokeWidth="1.5"/><path d="M 48 88 L 50 104 L 52 88" stroke={c} strokeWidth="1.5" fill="none"/></svg>,
    25: (c) => <svg viewBox="0 0 100 140"><rect x="5" y="5" width="90" height="130" stroke={c} strokeWidth="1.5" fill="none" rx="3"/><circle cx="38" cy="58" r="10" fill="none" stroke={c} strokeWidth="2"/><circle cx="62" cy="58" r="10" fill="none" stroke={c} strokeWidth="2" opacity="0.35"/><line x1="38" y1="45" x2="38" y2="22" stroke={c} strokeWidth="1.5" opacity="0.6"/></svg>,
    26: (c) => <svg viewBox="0 0 100 140"><rect x="5" y="5" width="90" height="130" stroke={c} strokeWidth="1.5" fill="none" rx="3"/><path d="M 32 32 L 68 32 Q 75 32 75 40 L 75 82 Q 75 88 68 88 L 32 88 Q 25 88 25 82 L 25 40 Q 25 32 32 32 Z" fill="none" stroke={c} strokeWidth="2"/><circle cx="50" cy="60" r="5" fill="none" stroke={c} strokeWidth="1.5" opacity="0.7"/></svg>,
  };
  return tarotMap[productId]?.(color) || null;
}

const DAILY_LIMIT = 3;

const ProductCard = ({ product, onAddToCart, inCart, stock, purchaseCount, dailyLimit }) => {
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const canBuy = purchaseCount < dailyLimit && stock > 0 && !inCart;
  const isTarot = product.icon === "tarot";

  return (
    <div style={{ background: "#0d0618", border: "1px solid #1a0a2e", borderRadius: 4, padding: 16, display: "flex", flexDirection: "column", gap: 12, position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: "'Inter', sans-serif", color: "#D4C5E8", letterSpacing: "2px", fontWeight: 600 }}>{product.category.toUpperCase()}</div>
          <div style={{ fontSize: 11, fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: "1px", color: product.color, marginTop: 2 }}>{product.sku}</div>
        </div>
      </div>

      <div style={{ width: "100%", height: 120, background: "#1a0a2e", border: `1px solid ${product.color}33`, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {isTarot ? (
          <div style={{ width: 50, height: 60 }}>
            <TarotCard productId={product.id} color={product.color} />
          </div>
        ) : (
          <div style={{ width: 60, height: 60 }}>
            <GeometricIcon productId={product.id} color={product.color} />
          </div>
        )}
      </div>

      <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 600, color: "#E8DFF0", margin: 0 }}>{product.name}</h3>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "#E8DFF0", margin: 0, lineHeight: 1.5, fontWeight: 500 }}>{product.description}</p>

      <div style={{ background: "#06040A", borderRadius: 2, padding: 11, border: "1px solid #1a0a2e" }}>
        {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
          <div key={key} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5, color: "#E8DFF0" }}>
            <span style={{ color: "#D4C5E8", fontWeight: 500 }}>{key}</span>
            <span style={{ color: "#E8DFF0" }}>{val}</span>
          </div>
        ))}
      </div>

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

const CartDrawer = ({ cart, onRemove, onCheckout, onClose, isMobile }) => {
  return (
    <div style={{ position: "fixed", right: 0, top: 0, height: "100vh", width: isMobile ? "100%" : 360, background: "#06040A", borderLeft: "1px solid #2a1540", zIndex: 1000, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: 16, borderBottom: "1px solid #1a0a2e", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 14, fontWeight: 600, color: "#E8DFF0", margin: 0, letterSpacing: "1px" }}>CART ({cart.length})</h2>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#D4C5E8", fontSize: 18, cursor: "pointer" }}>✕</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        {cart.length === 0 ? <div style={{ textAlign: "center", marginTop: 60 }}><div style={{ fontSize: 36, marginBottom: 12, opacity: 0.3 }}>⬡</div><p style={{ fontFamily: "'Cinzel', serif", fontSize: 12, color: "#3a2a4a", letterSpacing: "2px" }}>CART IS EMPTY</p></div> : cart.map(item => (
          <div key={item.id} style={{ background: "#0d0618", border: `1px solid ${item.color}22`, borderRadius: 2, padding: 12, display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
            <div style={{ width: 30, height: 30, background: "#1a0a2e", borderRadius: 1, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {item.icon === "tarot" ? <TarotCard productId={item.id} color={item.color} /> : <GeometricIcon productId={item.id} color={item.color} />}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: "#E8DFF0", margin: "0 0 2px" }}>{item.name}</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: item.color, margin: 0 }}>{item.sku}</p>
            </div>
            <button onClick={() => onRemove(item.id)} style={{ background: "none", border: "none", color: "#3a2a4a", cursor: "pointer", fontSize: 14 }}>✕</button>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div style={{ padding: 16, borderTop: "1px solid #1a0a2e" }}>
          <button onClick={onCheckout} style={{ width: "100%", background: "#4DFFC3", border: "none", color: "#06040A", fontFamily: "'Cinzel', serif", fontSize: 12, padding: "12px", cursor: "pointer", borderRadius: 2, fontWeight: 600, letterSpacing: "1px" }}>CHECKOUT</button>
        </div>
      )}
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
    <div style={{ position: "fixed", inset: 0, background: "#00000080", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000, padding: 16 }}>
      <div style={{ background: "#06040A", border: "1px solid #1a0a2e", borderRadius: 4, padding: 24, maxWidth: 480, width: "100%" }}>
        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 18, fontWeight: 600, color: "#E8DFF0", margin: "0 0 12px", letterSpacing: "1px" }}>HAUL TIME</h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#D4C5E8", marginBottom: 20, lineHeight: 1.5 }}>Confirm your haul, then screenshot & post to prove you got stuff that doesn't exist.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ background: "#0d0618", border: "1px solid #1a0a2e", borderRadius: 2, padding: 12, color: "#E8DFF0", fontFamily: "'Inter', sans-serif", fontSize: 14 }} />
          <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ background: "#0d0618", border: "1px solid #1a0a2e", borderRadius: 2, padding: 12, color: "#E8DFF0", fontFamily: "'Inter', sans-serif", fontSize: 14 }} />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setSelectedPlatform("instagram")} style={{ flex: 1, background: selectedPlatform === "instagram" ? "#4DFFC3" : "transparent", border: "1px solid " + (selectedPlatform === "instagram" ? "#4DFFC3" : "#1a0a2e"), borderRadius: 2, padding: 12, cursor: "pointer", color: selectedPlatform === "instagram" ? "#06040A" : "#D4C5E8", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600 }}>Instagram</button>
            <button onClick={() => setSelectedPlatform("tiktok")} style={{ flex: 1, background: selectedPlatform === "tiktok" ? "#4DFFC3" : "transparent", border: "1px solid " + (selectedPlatform === "tiktok" ? "#4DFFC3" : "#1a0a2e"), borderRadius: 2, padding: 12, cursor: "pointer", color: selectedPlatform === "tiktok" ? "#06040A" : "#D4C5E8", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600 }}>TikTok</button>
          </div>
        </div>
        <button onClick={handleCheckout} disabled={!formData.name || !formData.email || !selectedPlatform} style={{ width: "100%", background: formData.name && formData.email && selectedPlatform ? "#FF6B9D" : "#1a0a2e", color: formData.name && formData.email && selectedPlatform ? "#E8DFF0" : "#2a1a3a", border: "none", borderRadius: 2, padding: 14, cursor: formData.name && formData.email && selectedPlatform ? "pointer" : "not-allowed", fontFamily: "'Cinzel', serif", fontSize: 14, fontWeight: 600, letterSpacing: "1px" }}>COMPLETE & FOLLOW</button>
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
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}body{background:#06040A}::selection{background:#4DFFC322;color:#4DFFC3}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#06040A}::-webkit-scrollbar-thumb{background:#2a1540;border-radius:2px}input::placeholder{color:#7A6A8A}input:focus{border-color:#4DFFC3!important;outline:none}@keyframes twinkle{0%,100%{opacity:var(--op)}50%{opacity:calc(var(--op)*0.15)}}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}@media (max-width:768px){.grid{grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px}}@media (max-width:480px){.grid{grid-template-columns:1fr;gap:12px}}`}</style>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {Array.from({ length: 70 }).map((_, i) => (<div key={i} style={{ position: "absolute", left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: 2, height: 2, borderRadius: "50%", background: Math.random() > 0.85 ? "#4DFFC3" : "#C8B8D4", opacity: Math.random() * 0.4 + 0.1, animation: `twinkle ${Math.random() * 5 + 2}s ease-in-out ${Math.random() * 4}s infinite`, "--op": Math.random() * 0.4 + 0.1 }} />))}
      </div>
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "#06040Aee", backdropFilter: "blur(14px)", borderBottom: "1px solid #1a0a2e", padding: isMobile ? "12px 16px" : "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: isMobile ? 56 : 62 }}>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: isMobile ? 15 : 18, fontWeight: 700, letterSpacing: "2px", color: "#E8DFF0" }}>THE <span style={{ color: "#4DFFC3" }}>OUTER</span>POST</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {purchaseCount > 0 && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#4DFFC3", letterSpacing: "1px", fontWeight: 600 }}>{purchaseCount}/3 TODAY</div>}
          <button onClick={() => setCartOpen(true)} style={{ background: "transparent", border: "1px solid #2a1540", borderRadius: 1, padding: "8px 12px", cursor: "pointer", color: "#D4C5E8", fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: "1.5px", display: "flex", alignItems: "center", gap: 6, minHeight: "44px", fontWeight: 600 }}>
            ⬡ {cart.length > 0 && <span style={{ background: "#4DFFC3", color: "#06040A", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{cart.length}</span>}
          </button>
        </div>
      </header>
      <section style={{ position: "relative", zIndex: 1, textAlign: "center", padding: isMobile ? "48px 16px 36px" : "72px 32px 52px" }}>
        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: isMobile ? "clamp(24px, 6vw, 52px)" : "clamp(32px, 5.5vw, 68px)", fontWeight: 700, color: "#E8DFF0", lineHeight: 1.15, margin: "0 0 12px" }}>Objects From<br /><span style={{ color: "#9B6EFF" }}>Beyond the Known</span></h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#D4C5E8", margin: "0 0 24px", letterSpacing: "0.5px", fontWeight: 500 }}>Acquire what doesn't exist and share your haul</p>
        <div style={{ display: "flex", gap: 6, background: "#0d0618", border: "1px solid #1a0a2e", borderRadius: 2, padding: 6, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
          {categories.map(cat => (<button key={cat} onClick={() => setFilter(cat)} style={{ background: filter === cat ? "#1a0a2e" : "transparent", border: filter === cat ? "1px solid #4DFFC355" : "1px solid transparent", color: filter === cat ? "#4DFFC3" : "#D4C5E8", fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", padding: "10px 14px", cursor: "pointer", borderRadius: 1 }}>{cat}</button>))}
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
