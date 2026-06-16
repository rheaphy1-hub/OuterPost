"use client";

import { useState, useEffect, useRef } from "react";

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
  { id: 27, name: "Confidence You Didn't Know You Had", sku: "CONF-SEAL-027", category: "Metamorphosis", stock: 92, description: "Sealed vial. Open only when you need it. Contains pure confidence. May cause you to do something wild. You probably won't regret it.", specs: { "Format": "Sealed vial", "Side Effect": "You'll go for it", "Recovery": "Won't need it" }, icon: "geometric", color: "#C8B8D4" },
  { id: 28, name: "Your Unspoken Boundaries", sku: "BOUND-028", category: "Metamorphosis", stock: 54, description: "Written on parchment. All the times you weren't honest. All the things you should have said no to. Permission slip included.", specs: { "Format": "Parchment", "Contents": "Every boundary broken", "Enforceability": "Up to you" }, icon: "geometric", color: "#C8B8D4" },
  { id: 29, name: "Motivation That Doesn't Feel Forced", sku: "MOTIV-029", category: "Metamorphosis", stock: 72, description: "Organic motivation. Shows up at the right moments. Doesn't feel fake. Lasts indefinitely. Source unknown.", specs: { "Timing": "Perfect", "Sustainability": "Real", "Shelf Life": "Permanent" }, icon: "geometric", color: "#C8B8D4" },
  { id: 30, name: "Permission to Stop Trying So Hard", sku: "PERM-030", category: "Metamorphosis", stock: 80, description: "Official document signed by the universe. You can rest now. No asterisks. No conditions. This is real permission.", specs: { "Format": "Certificate", "Signed": "By everything", "Validity": "Eternal" }, icon: "geometric", color: "#C8B8D4" },
  { id: 31, name: "The Apology You Owe Yourself (II)", sku: "APOL-SELF-031", category: "Metamorphosis", stock: 13, description: "Handwritten apology from the universe. Dated. Sealed. Elegant. Forgiving. Contains actual forgiveness inside.", specs: { "Format": "Sealed letter", "Contents": "Real forgiveness", "Authenticity": "Real enough" }, icon: "geometric", color: "#C8B8D4" },
  { id: 32, name: "What You'd Tell Your Younger Self", sku: "YOUNG-032", category: "Metamorphosis", stock: 95, description: "Letter from where you are now to where you were. Everything you know. Warning: it might say 'do it exactly the same way.'", specs: { "Format": "Sealed letter", "Honesty": "Maximum", "Regret": "Minimal" }, icon: "geometric", color: "#C8B8D4" },
];

const stockState = {};
PRODUCTS.forEach(p => { stockState[p.id] = p.stock; });

// ICON COMPONENTS
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
    9: (c) => <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="18" stroke={c} strokeWidth="2.5" fill="none"/><line x1="50" y1="32" x2="50" y2="25" stroke={c} strokeWidth="2"/><path d="M 50 50 L 50 68" stroke={c} strokeWidth="2" opacity="0.6"/></svg>,
    10: (c) => <svg viewBox="0 0 100 100"><path d="M 50 25 L 75 55 L 62 55 L 62 80 L 38 80 L 38 55 L 25 55 Z" stroke={c} strokeWidth="2.5" fill="none"/><path d="M 50 20 L 50 15" stroke={c} strokeWidth="2.5"/><path d="M 48 50 L 52 50 L 50 60" stroke={c} strokeWidth="2" fill="none"/></svg>,
    11: (c) => <svg viewBox="0 0 100 100"><path d="M 20 40 L 50 65 L 80 40" stroke={c} strokeWidth="2.5" fill="none"/><circle cx="50" cy="52" r="10" fill="none" stroke={c} strokeWidth="2" opacity="0.7"/></svg>,
    12: (c) => <svg viewBox="0 0 100 100"><rect x="32" y="38" width="36" height="36" stroke={c} strokeWidth="2.5" fill="none" rx="3"/><circle cx="44" cy="28" r="3" fill={c}/><circle cx="56" cy="26" r="3" fill={c}/></svg>,
    13: (c) => <svg viewBox="0 0 100 100"><path d="M 28 50 Q 40 38 50 45 Q 60 38 72 50" stroke={c} strokeWidth="2.5" fill="none"/><path d="M 28 62 Q 40 50 50 57 Q 60 50 72 62" stroke={c} strokeWidth="2.5" fill="none" opacity="0.7"/><path d="M 28 74 Q 40 62 50 69 Q 60 62 72 74" stroke={c} strokeWidth="2.5" fill="none" opacity="0.4"/></svg>,
    14: (c) => <svg viewBox="0 0 100 100"><rect x="18" y="32" width="64" height="36" rx="4" stroke={c} strokeWidth="2.5" fill="none"/><circle cx="34" cy="50" r="6" stroke={c} strokeWidth="2" fill="none"/><circle cx="66" cy="50" r="6" stroke={c} strokeWidth="2" fill="none"/></svg>,
    15: (c) => <svg viewBox="0 0 100 100"><path d="M 20 20 L 80 20 L 80 80 L 20 80 Z" stroke={c} strokeWidth="2.5" fill="none"/><line x1="20" y1="50" x2="80" y2="50" stroke={c} strokeWidth="1" opacity="0.5"/><line x1="50" y1="20" x2="50" y2="80" stroke={c} strokeWidth="1" opacity="0.5"/><path d="M 50 28 L 53 45 L 70 47 L 55 52 L 57 70 L 50 58 L 43 70 L 45 52 L 30 47 L 47 45 Z" stroke={c} strokeWidth="1.5" fill="none"/></svg>,
    16: (c) => <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="18" fill="none" stroke={c} strokeWidth="2.5"/><path d="M 50 32 L 50 25" stroke={c} strokeWidth="2"/><path d="M 68 50 L 75 50" stroke={c} strokeWidth="2"/><path d="M 50 68 L 50 75" stroke={c} strokeWidth="2"/><path d="M 32 50 L 25 50" stroke={c} strokeWidth="2"/></svg>,
    17: (c) => <svg viewBox="0 0 100 100"><path d="M 38 15 L 62 15 L 72 88 Q 50 95 50 95 Q 28 88 28 88 Z" stroke={c} strokeWidth="2.5" fill="none"/><circle cx="50" cy="50" r="8" fill="none" stroke={c} strokeWidth="2" opacity="0.7"/></svg>,
    18: (c) => <svg viewBox="0 0 100 100"><path d="M 28 28 L 72 28 L 72 80 Q 72 90 50 90 Q 28 90 28 80 Z" stroke={c} strokeWidth="2.5" fill="none"/><line x1="50" y1="28" x2="50" y2="65" stroke={c} strokeWidth="2" opacity="0.6" strokeDasharray="3,3"/><circle cx="50" cy="55" r="3" fill={c} opacity="0.7"/></svg>,
    27: (c) => <svg viewBox="0 0 100 100"><path d="M 42 25 L 40 20 L 40 15 L 60 15 L 60 20 L 58 25 L 58 75 Q 58 85 50 85 Q 42 85 42 75 Z" stroke={c} strokeWidth="2.5" fill="none"/><circle cx="50" cy="50" r="3" fill={c} opacity="0.6"/><path d="M 50 40 L 50 25" stroke={c} strokeWidth="1.5" opacity="0.5" strokeDasharray="2,2"/></svg>,
    28: (c) => <svg viewBox="0 0 100 100"><rect x="25" y="20" width="50" height="60" stroke={c} strokeWidth="2.5" fill="none"/><path d="M 35 35 L 50 55 L 65 35" stroke={c} strokeWidth="2" fill="none" opacity="0.7"/></svg>,
    29: (c) => <svg viewBox="0 0 100 100"><path d="M 50 30 Q 45 40 50 50 Q 55 60 50 70" stroke={c} strokeWidth="2.5" fill="none"/><circle cx="50" cy="50" r="8" fill="none" stroke={c} strokeWidth="2" opacity="0.6"/></svg>,
    30: (c) => <svg viewBox="0 0 100 100"><path d="M 35 60 L 35 45 M 45 65 L 45 35 M 50 70 L 50 30 M 55 65 L 55 40 M 65 55 L 65 50" stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M 30 70 Q 50 80 70 70" stroke={c} strokeWidth="2" fill="none" opacity="0.7"/></svg>,
    31: (c) => <svg viewBox="0 0 100 100"><path d="M 30 25 L 70 25 L 70 80 Q 70 90 50 90 Q 30 90 30 80 Z" stroke={c} strokeWidth="2.5" fill="none"/><path d="M 50 35 L 50 75" stroke={c} strokeWidth="2" opacity="0.6"/><line x1="40" y1="50" x2="60" y2="50" stroke={c} strokeWidth="1.5" opacity="0.5"/></svg>,
    32: (c) => <svg viewBox="0 0 100 100"><path d="M 30 25 L 70 25 L 70 80 Q 70 90 50 90 Q 30 90 30 80 Z" stroke={c} strokeWidth="2.5" fill="none"/><path d="M 50 35 Q 45 50 50 65" stroke={c} strokeWidth="2" opacity="0.6"/><circle cx="50" cy="50" r="4" fill={c} opacity="0.5"/></svg>,
  };
  return iconMap[productId]?.(color) || null;
}

function TarotCard({ productId, color }) {
  const tarotMap = {
    19: (c) => <svg viewBox="0 0 100 140"><rect x="5" y="5" width="90" height="130" stroke={c} strokeWidth="1.5" fill="none" rx="3"/><path d="M 50 20 L 48 38 L 32 36 L 48 48 L 45 66 L 50 54 L 55 66 L 52 48 L 68 36 L 52 38 Z" stroke={c} strokeWidth="2" fill="none"/><circle cx="50" cy="85" r="10" fill="none" stroke={c} strokeWidth="2" opacity="0.7"/><text x="50" y="130" textAnchor="middle" fontSize="10" fontWeight="bold" fill={c} fontFamily="'Cinzel', serif" letterSpacing="1.5">VOID</text></svg>,
    20: (c) => <svg viewBox="0 0 100 140"><rect x="5" y="5" width="90" height="130" stroke={c} strokeWidth="1.5" fill="none" rx="3"/><path d="M 38 22 L 62 22 L 68 50 L 62 38 L 50 44 L 38 38 L 48 50 Z" stroke={c} strokeWidth="2" fill="none"/><line x1="38" y1="62" x2="62" y2="62" stroke={c} strokeWidth="2" opacity="0.7"/><line x1="35" y1="80" x2="65" y2="80" stroke={c} strokeWidth="1.5" opacity="0.5"/><text x="50" y="130" textAnchor="middle" fontSize="10" fontWeight="bold" fill={c} fontFamily="'Cinzel', serif" letterSpacing="1.5">WORDS</text></svg>,
    21: (c) => <svg viewBox="0 0 100 140"><rect x="5" y="5" width="90" height="130" stroke={c} strokeWidth="1.5" fill="none" rx="3"/><path d="M 28 38 Q 28 32 33 32 L 40 32 L 40 72 Q 40 78 33 78 L 28 78 Q 22 78 22 72 L 22 38 Z" fill={c} opacity="0.35"/><path d="M 72 38 Q 72 32 67 32 L 60 32 L 60 72 Q 60 78 67 78 L 72 78 Q 78 78 78 72 L 78 38 Z" fill={c} opacity="0.35"/><path d="M 40 56 L 60 56" stroke={c} strokeWidth="2.5" opacity="0.7"/><text x="50" y="130" textAnchor="middle" fontSize="10" fontWeight="bold" fill={c} fontFamily="'Cinzel', serif" letterSpacing="1.5">EXCHANGE</text></svg>,
    22: (c) => <svg viewBox="0 0 100 140"><rect x="5" y="5" width="90" height="130" stroke={c} strokeWidth="1.5" fill="none" rx="3"/><path d="M 50 22 L 32 34 L 50 46 L 68 34 Z" stroke={c} strokeWidth="2" fill="none"/><path d="M 50 48 L 32 60 L 50 72 L 68 60 Z" stroke={c} strokeWidth="2" fill="none" opacity="0.8"/><path d="M 50 74 L 32 86 L 50 98 L 68 86 Z" stroke={c} strokeWidth="2" fill="none" opacity="0.5"/><text x="50" y="130" textAnchor="middle" fontSize="10" fontWeight="bold" fill={c} fontFamily="'Cinzel', serif" letterSpacing="1.5">TRUTH</text></svg>,
    23: (c) => <svg viewBox="0 0 100 140"><rect x="5" y="5" width="90" height="130" stroke={c} strokeWidth="1.5" fill="none" rx="3"/><circle cx="50" cy="55" r="12" fill="none" stroke={c} strokeWidth="2"/><text x="32" y="62" fontSize="16" fontWeight="bold" fill={c} fontFamily="'Cinzel', serif" opacity="0.7">U</text><text x="58" y="62" fontSize="16" fontWeight="bold" fill={c} fontFamily="'Cinzel', serif" opacity="0.3">EX</text><text x="50" y="130" textAnchor="middle" fontSize="10" fontWeight="bold" fill={c} fontFamily="'Cinzel', serif" letterSpacing="1.5">RANK</text></svg>,
    24: (c) => <svg viewBox="0 0 100 140"><rect x="5" y="5" width="90" height="130" stroke={c} strokeWidth="1.5" fill="none" rx="3"/><path d="M 50 22 L 50 80" stroke={c} strokeWidth="2.5"/><path d="M 40 32 L 60 32" stroke={c} strokeWidth="2"/><path d="M 45 88 L 55 88" stroke={c} strokeWidth="1.5"/><path d="M 48 88 L 50 104 L 52 88" stroke={c} strokeWidth="1.5" fill="none"/><text x="50" y="130" textAnchor="middle" fontSize="10" fontWeight="bold" fill={c} fontFamily="'Cinzel', serif" letterSpacing="1.5">SWORD</text></svg>,
    25: (c) => <svg viewBox="0 0 100 140"><rect x="5" y="5" width="90" height="130" stroke={c} strokeWidth="1.5" fill="none" rx="3"/><circle cx="38" cy="58" r="10" fill="none" stroke={c} strokeWidth="2"/><circle cx="62" cy="58" r="10" fill="none" stroke={c} strokeWidth="2" opacity="0.35"/><line x1="38" y1="45" x2="38" y2="22" stroke={c} strokeWidth="1.5" opacity="0.6"/><text x="50" y="130" textAnchor="middle" fontSize="10" fontWeight="bold" fill={c} fontFamily="'Cinzel', serif" letterSpacing="1.5">VOID</text></svg>,
    26: (c) => <svg viewBox="0 0 100 140"><rect x="5" y="5" width="90" height="130" stroke={c} strokeWidth="1.5" fill="none" rx="3"/><path d="M 32 32 L 68 32 Q 75 32 75 40 L 75 82 Q 75 88 68 88 L 32 88 Q 25 88 25 82 L 25 40 Q 25 32 32 32 Z" fill="none" stroke={c} strokeWidth="2"/><circle cx="50" cy="60" r="5" fill="none" stroke={c} strokeWidth="1.5" opacity="0.7"/><text x="50" y="130" textAnchor="middle" fontSize="10" fontWeight="bold" fill={c} fontFamily="'Cinzel', serif" letterSpacing="1.5">SEALED</text></svg>,
  };
  return tarotMap[productId]?.(color) || null;
}

function ReviewsModal({ product, onClose }) {
  const reviewsMap = {
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

  const productReviews = reviewsMap[product.id] || [
    { author: "user", rating: 5, text: "Exactly what I needed.", date: "Recently" },
    { author: "visitor", rating: 5, text: "Incredible quality.", date: "Recently" },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, background: "#06040Add", backdropFilter: "blur(8px)", zIndex: 2500, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "linear-gradient(145deg, #06040A, #0d0618)", border: "1px solid #2a1540", borderRadius: 8, width: "100%", maxWidth: 480, maxHeight: "80vh", overflowY: "auto", padding: 28, position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", color: "#3a2a4a", fontSize: 18, cursor: "pointer" }}>✕</button>
        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 16, color: "#E8DFF0", margin: "0 0 8px", letterSpacing: "2px" }}>{product.name}</h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#5a3a6a", margin: "0 0 20px" }}>{productReviews.length} reviews</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {productReviews.map((review, idx) => (
            <div key={idx} style={{ background: "#0d0618", border: "1px solid #1a0a2e", borderRadius: 2, padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#C8B8D4", margin: 0, fontWeight: 600 }}>{review.author}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: "#5a3a6a", margin: 0 }}>{review.date}</p>
              </div>
              <div style={{ marginBottom: 8 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: i < review.rating ? "#4DFFC3" : "#2a1a3a", marginRight: 4 }}>★</span>
                ))}
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#7a5a8a", margin: 0, lineHeight: 1.5 }}>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onAddToCart, inCart, stock, purchaseCount, dailyLimit }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const isOutOfStock = stock === 0;
  const limitReached = purchaseCount >= dailyLimit;
  const isTarot = product.icon === "tarot";

  const handleAdd = () => {
    if (isOutOfStock || inCart || limitReached) return;
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ background: hovered && !isOutOfStock && !limitReached ? `linear-gradient(145deg, #130826, #1e0d35)` : `linear-gradient(145deg, #0d0618, #160828)`, border: hovered && !isOutOfStock && !limitReached ? `1px solid ${product.color}66` : `1px solid #2a1540`, borderRadius: 2, padding: "18px", opacity: isOutOfStock || limitReached ? 0.45 : 1, display: "flex", flexDirection: "column", gap: 11 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 8, fontFamily: "'Inter', sans-serif", color: "#3a2a4a", letterSpacing: "2px" }}>{product.category.toUpperCase()}</div>
          <div style={{ fontSize: 8, fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: "1px", color: product.color }}>{product.sku}</div>
        </div>
      </div>

      <div style={{ width: "100%", height: 100, background: "#1a0a2e", border: `1px solid ${product.color}33`, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {isTarot ? (
          <div style={{ width: 50, height: 60 }}>
            <TarotCard productId={product.id} color={product.color} />
          </div>
        ) : (
          <div style={{ width: 50, height: 50 }}>
            <GeometricIcon productId={product.id} color={product.color} />
          </div>
        )}
      </div>

      <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 600, color: "#E8DFF0", margin: 0, lineHeight: 1.35 }}>{product.name}</h3>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#7a5a8a", lineHeight: 1.65, margin: 0, flexGrow: 1 }}>{product.description}</p>

      <div style={{ background: "#0d0618", borderRadius: 1, padding: 11, border: "1px solid #1a0a2e" }}>
        {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
          <div key={key} style={{ display: "flex", justifyContent: "space-between", fontSize: 9, marginBottom: 5 }}>
            <span style={{ color: "#3a2a4a" }}>{key}</span>
            <span style={{ color: "#5a4a6a" }}>{val}</span>
          </div>
        ))}
      </div>

      <div>
        {isOutOfStock ? <div style={{ color: "#FF6B4A", fontSize: 10, letterSpacing: "1px", fontWeight: 600, marginBottom: 10 }}>OUT OF STOCK</div> : stock < 5 ? <div style={{ color: "#FFD166", fontSize: 10, letterSpacing: "1px", fontWeight: 600, marginBottom: 10 }}>ONLY {stock} LEFT</div> : <div style={{ fontSize: 9, color: "#3a2a4a", letterSpacing: "1px", marginBottom: 10 }}>{stock} in stock</div>}
        <div style={{ height: 2, background: "#1a0a2e", borderRadius: 1, overflow: "hidden", marginBottom: 10 }}>
          <div style={{ height: "100%", width: `${Math.max(5, (stock / PRODUCTS.find(p => p.id === product.id).stock) * 100)}%`, background: stock < 5 && stock > 0 ? "#FFD166" : isOutOfStock ? "#3a2a4a" : product.color }} />
        </div>
        <button 
          onClick={() => setReviewsOpen(true)}
          style={{ width: "100%", background: "transparent", border: "1px solid #2a1540", color: "#5a3a6a", fontFamily: "'Inter', sans-serif", fontSize: 9, padding: "8px", cursor: "pointer", borderRadius: 1, marginBottom: 10 }}>
          REVIEWS
        </button>
      </div>

      {limitReached && <div style={{ color: "#FF6B4A", fontSize: 9, letterSpacing: "1px", fontWeight: 600, textAlign: "center", padding: "8px 0" }}>DAILY LIMIT REACHED</div>}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 11, borderTop: "1px solid #1a0a2e", gap: 10 }}>
        <span style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: "#4DFFC3", letterSpacing: "2px" }}>FREE</span>
        <button onClick={handleAdd} disabled={inCart || limitReached || isOutOfStock} style={{ background: "transparent", border: `1px solid ${added ? product.color : inCart ? "#2a1540" : limitReached ? "#FF6B4A" : product.color}`, color: added ? product.color : inCart ? "#3a2a4a" : limitReached ? "#FF6B4A" : product.color, fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "1.5px", padding: "12px 16px", cursor: inCart || limitReached || isOutOfStock ? "default" : "pointer", borderRadius: 1, flex: 1, minHeight: "44px" }}>
          {added ? "✓ ADDED" : inCart ? "IN CART" : limitReached ? "LIMIT" : isOutOfStock ? "OUT" : "ACQUIRE"}
        </button>
      </div>
      {reviewsOpen && <ReviewsModal product={product} onClose={() => setReviewsOpen(false)} />}
    </div>
  );
}

function CartDrawer({ cart, onRemove, onCheckout, onClose, isMobile }) {
  return (
    <div style={{ position: "fixed", top: isMobile ? "auto" : 0, right: 0, bottom: isMobile ? 0 : "auto", left: isMobile ? 0 : "auto", width: isMobile ? "100%" : "min(400px, 100vw)", maxHeight: isMobile ? "85vh" : "100vh", background: "linear-gradient(180deg, #06040A, #0d0618)", borderLeft: isMobile ? "none" : "1px solid #2a1540", borderTop: isMobile ? "1px solid #2a1540" : "none", borderTopLeftRadius: isMobile ? 12 : 0, borderTopRightRadius: isMobile ? 12 : 0, zIndex: 1000, display: "flex", flexDirection: "column", overflowY: "auto" }}>
      <div style={{ padding: isMobile ? "16px 20px 14px" : "28px 24px 20px", borderBottom: "1px solid #1a0a2e", display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: isMobile ? 16 : 18, color: "#E8DFF0", margin: 0, letterSpacing: "2px" }}>CART</h2>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#5a3a6a", fontSize: 20, cursor: "pointer" }}>{isMobile ? "↓" : "✕"}</button>
      </div>
      <div style={{ flex: 1, padding: isMobile ? "16px" : "20px 24px", display: "flex", flexDirection: "column", gap: 11 }}>
        {cart.length === 0 ? <div style={{ textAlign: "center", marginTop: 60 }}><div style={{ fontSize: 36, marginBottom: 12, opacity: 0.3 }}>⬡</div><p style={{ fontFamily: "'Cinzel', serif", fontSize: 12, color: "#3a2a4a", letterSpacing: "2px" }}>CART IS EMPTY</p></div> : cart.map(item => (
          <div key={item.id} style={{ background: "#0d0618", border: `1px solid ${item.color}22`, borderRadius: 2, padding: 13, display: "flex", gap: 12, alignItems: "center", minHeight: "44px" }}>
            <div style={{ width: 30, height: 30, background: "#1a0a2e", borderRadius: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {item.icon === "tarot" ? <TarotCard productId={item.id} color={item.color} /> : <GeometricIcon productId={item.id} color={item.color} />}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: "#C8B8D4", margin: "0 0 2px" }}>{item.name}</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: item.color, margin: 0 }}>{item.sku}</p>
            </div>
            <button onClick={() => onRemove(item.id)} style={{ background: "none", border: "none", color: "#3a2a4a", cursor: "pointer", fontSize: 13, minHeight: "44px" }}>✕</button>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div style={{ padding: isMobile ? "16px" : "20px 24px", borderTop: "1px solid #1a0a2e" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#5a3a6a" }}>TOTAL</span>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 14, color: "#4DFFC3" }}>$0.00</span>
          </div>
          <button onClick={onCheckout} style={{ width: "100%", background: "linear-gradient(135deg, #1a0a2e, #2a0d40)", border: "1px solid #4DFFC3", color: "#4DFFC3", fontFamily: "'Cinzel', serif", fontSize: 12, padding: "16px", cursor: "pointer", borderRadius: 1, minHeight: "48px" }}>CHECKOUT</button>
        </div>
      )}
    </div>
  );
}

function CheckoutModal({ cart, onClose, onComplete, isMobile }) {
  const [step, setStep] = useState(1);
  const [platform, setPlatform] = useState(null); // Track which platform they followed on
  const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const haulRef = useRef(null);

  useEffect(() => {
    // Auto-open follow page on mount
    if (step === 1) {
      const timer = setTimeout(() => {
        // Ask which platform they want to follow on
        setStep(2);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleFollowPlatform = (selectedPlatform) => {
    setPlatform(selectedPlatform);
    
    if (selectedPlatform === "instagram") {
      window.open("https://instagram.com/riftmarket", "_blank");
    } else if (selectedPlatform === "tiktok") {
      window.open("https://www.tiktok.com/@theouterpost", "_blank");
    }
    
    // After they follow (and come back), show haul
    setTimeout(() => {
      setStep(3);
    }, 2000);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "#06040Add", backdropFilter: "blur(8px)", zIndex: 2000, display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "linear-gradient(145deg, #06040A, #0d0618)", border: "1px solid #2a1540", borderRadius: isMobile ? "16px 16px 0 0" : 2, width: "100%", maxWidth: isMobile ? "100%" : 520, maxHeight: "90vh", overflowY: "auto", padding: isMobile ? 22 : 40 }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", color: "#3a2a4a", fontSize: 18, cursor: "pointer" }}>✕</button>

        {/* Step 1: Order Confirmation (hidden, auto-transitions) */}
        {step === 1 && (
          <>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 20, color: "#E8DFF0", margin: "0 0 8px", letterSpacing: "2px" }}>ORDER CONFIRMED</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#5a3a6a", margin: "0 0 24px" }}>Your items have been acquired.</p>
            <div style={{ background: "#0d0618", border: "1px solid #2a1540", borderRadius: 2, padding: 18 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: "#3a2a4a", letterSpacing: "2px", margin: "0 0 12px" }}>ORDER NUMBER</p>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: 18, color: "#4DFFC3", margin: 0, letterSpacing: "2px" }}>{orderNumber}</p>
            </div>
          </>
        )}

        {/* Step 2: Choose Platform to Follow */}
        {step === 2 && (
          <>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 20, color: "#E8DFF0", margin: "0 0 8px", letterSpacing: "2px" }}>FOLLOW @THE OUTER POST</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#5a3a6a", margin: "0 0 24px" }}>Choose where you follow us to unlock your haul preview.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button 
                onClick={() => handleFollowPlatform("instagram")}
                style={{ width: "100%", background: "linear-gradient(135deg, #F09433 0%, #E6683C 25%, #DC2743 50%, #CC2366 75%, #BC1888 100%)", color: "white", fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: "1.5px", padding: "16px", cursor: "pointer", borderRadius: 2, border: "none", fontWeight: 600, minHeight: "48px" }}>
                FOLLOW ON INSTAGRAM
              </button>
              <button 
                onClick={() => handleFollowPlatform("tiktok")}
                style={{ width: "100%", background: "#000000", color: "#25F4EE", fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: "1.5px", padding: "16px", cursor: "pointer", borderRadius: 2, border: "1px solid #25F4EE", fontWeight: 600, minHeight: "48px" }}>
                FOLLOW ON TIKTOK
              </button>
              <button 
                onClick={() => setStep(3)}
                style={{ width: "100%", background: "transparent", border: "1px solid #2a1540", color: "#5a3a6a", fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "2px", padding: "14px", cursor: "pointer", borderRadius: 2, minHeight: "44px" }}>
                SKIP
              </button>
            </div>
          </>
        )}

        {/* Step 3: Show Haul to Screenshot */}
        {step === 3 && (
          <>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 20, color: "#E8DFF0", margin: "0 0 8px", letterSpacing: "2px" }}>YOUR HAUL</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#5a3a6a", margin: "0 0 24px" }}>Screenshot and share to your story.</p>

            {/* Haul Preview */}
            <div ref={haulRef} style={{ background: "linear-gradient(145deg, #0d0618, #160828)", border: "1px solid #4DFFC322", borderRadius: 2, padding: 16, marginBottom: 24, display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ textAlign: "center", marginBottom: 8 }}>
                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 14, color: "#4DFFC3", margin: 0, letterSpacing: "1px" }}>MY THE OUTER POST HAUL</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: "#5a3a6a", margin: "6px 0 0" }}>{orderNumber}</p>
              </div>

              {cart.map(item => (
                <div key={item.id} style={{ background: "#06040A", border: `1px solid ${item.color}33`, borderRadius: 2, padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <div style={{ width: 32, height: 32, background: "#1a0a2e", borderRadius: 1, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {item.icon === "tarot" ? <TarotCard productId={item.id} color={item.color} /> : <GeometricIcon productId={item.id} color={item.color} />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, color: "#C8B8D4", margin: 0 }}>{item.name}</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, color: item.color, margin: "2px 0 0" }}>{item.sku}</p>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: "#7a5a8a", margin: 0, lineHeight: 1.5, paddingLeft: 40 }}>{item.description}</p>
                </div>
              ))}

              <div style={{ textAlign: "center", marginTop: 12, paddingTop: 12, borderTop: "1px solid #1a0a2e" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, color: "#3a2a4a", margin: 0 }}>@theouterpost 🌌</p>
              </div>
            </div>

            <button 
              onClick={() => { onComplete(); onClose(); }}
              style={{ width: "100%", background: "linear-gradient(135deg, #1a0a2e, #2a0d40)", border: "1px solid #4DFFC3", color: "#4DFFC3", fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: "2px", padding: "16px", cursor: "pointer", borderRadius: 2, minHeight: "48px" }}>
              DONE
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
const [isMobile, setIsMobile] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [stocks, setStocks] = useState({ ...stockState });
  const [filter, setFilter] = useState("ALL");
  const [purchaseCount, setPurchaseCount] = useState(() => {
    const saved = localStorage.getItem("riftmarket_daily_purchases");
    const lastReset = localStorage.getItem("riftmarket_last_reset");
    const today = new Date().toDateString();
    
    // Reset if it's a new day
    if (lastReset !== today) {
      localStorage.setItem("riftmarket_last_reset", today);
      localStorage.setItem("riftmarket_daily_purchases", "0");
      return 0;
    }
    
    return parseInt(saved || "0", 10);
  });
  const DAILY_LIMIT = 999; // Disabled for testing

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update localStorage whenever purchaseCount changes
  useEffect(() => {
    localStorage.setItem("riftmarket_daily_purchases", purchaseCount.toString());
  }, [purchaseCount]);

  const addToCart = (p) => setCart(prev => (prev.find(i => i.id === p.id) ? prev : [...prev, p]));
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const handleCheckoutComplete = () => { setPurchaseCount(purchaseCount + cart.length); setCart([]); };
  const categories = ["ALL", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  const filtered = PRODUCTS.filter(p => filter === "ALL" || p.category === filter);

  return (
    <div style={{ minHeight: "100vh", background: "#06040A", color: "#E8DFF0", overflowX: "hidden" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}body{background:#06040A}::selection{background:#4DFFC322;color:#4DFFC3}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#06040A}::-webkit-scrollbar-thumb{background:#2a1540;border-radius:2px}input::placeholder{color:#2a1a3a}input:focus{border-color:#4DFFC3!important;outline:none}@keyframes twinkle{0%,100%{opacity:var(--op)}50%{opacity:calc(var(--op)*0.15)}}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}@media (max-width:768px){.grid{grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px}}@media (max-width:480px){.grid{grid-template-columns:1fr;gap:12px}}`}</style>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {Array.from({ length: 70 }).map((_, i) => (<div key={i} style={{ position: "absolute", left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: 2, height: 2, borderRadius: "50%", background: Math.random() > 0.85 ? "#4DFFC3" : "#C8B8D4", opacity: Math.random() * 0.4 + 0.1, animation: `twinkle ${Math.random() * 5 + 2}s ease-in-out ${Math.random() * 4}s infinite`, "--op": Math.random() * 0.4 + 0.1 }} />))}
      </div>
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "#06040Aee", backdropFilter: "blur(14px)", borderBottom: "1px solid #1a0a2e", padding: isMobile ? "12px 16px" : "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: isMobile ? 56 : 62 }}>
        <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: isMobile ? 14 : 16, fontWeight: 700, letterSpacing: "2px", color: "#E8DFF0" }}>THE <span style={{ color: "#4DFFC3" }}>OUTER</span>POST</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {purchaseCount > 0 && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, color: "#4DFFC3", letterSpacing: "1px" }}>{purchaseCount}/3 TODAY</div>}
          <button onClick={() => setCartOpen(true)} style={{ background: "transparent", border: "1px solid #2a1540", borderRadius: 1, padding: "8px 12px", cursor: "pointer", color: "#C8B8D4", fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "1.5px", display: "flex", alignItems: "center", gap: 6, minHeight: "44px" }}>
            ⬡ {cart.length > 0 && <span style={{ background: "#4DFFC3", color: "#06040A", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700 }}>{cart.length}</span>}
          </button>
        </div>
      </header>
      <section style={{ position: "relative", zIndex: 1, textAlign: "center", padding: isMobile ? "48px 16px 36px" : "72px 32px 52px" }}>
        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: isMobile ? "clamp(20px, 6vw, 48px)" : "clamp(28px, 5.5vw, 62px)", fontWeight: 700, color: "#E8DFF0", lineHeight: 1.15, margin: "0 0 12px" }}>Objects From<br /><span style={{ color: "#9B6EFF" }}>Beyond the Known</span></h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: isMobile ? 11 : 13, color: "#5a3a6a", margin: "0 0 24px", letterSpacing: "0.5px" }}>Acquire what doesn't exist and share your haul</p>
        <div style={{ display: "flex", gap: 6, background: "#0d0618", border: "1px solid #1a0a2e", borderRadius: 2, padding: 5, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
          {categories.map(cat => (<button key={cat} onClick={() => setFilter(cat)} style={{ background: filter === cat ? "#1a0a2e" : "transparent", border: filter === cat ? "1px solid #4DFFC355" : "1px solid transparent", color: filter === cat ? "#4DFFC3" : "#3a2a4a", fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "1.5px", padding: "8px 12px", cursor: "pointer", borderRadius: 1 }}>{cat}</button>))}
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
