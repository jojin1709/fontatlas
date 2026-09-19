"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Activity, BookOpen, Check, ChevronRight, Code2, Copy, Download, Eye, FileText, Globe2, Heart, Home, Languages, LayoutGrid, Menu, Moon, Package, Palette, Search, SlidersHorizontal, Sparkles, Star, Sun, Type, Upload, Variable, X, Zap } from "lucide-react";
import { Font, categories, fonts, googleCssUrl, scripts } from "../lib/fonts";

type View = "home" | "fonts" | "languages" | "playground" | "tools" | "api" | "pairings" | "favorites";
type CodeTab = "CDN" | "CSS" | "HTML" | "Tailwind" | "Next.js" | "React";

const categoryIcons: Record<string, string> = { "Sans Serif":"Aa", "Serif":"Tt", "Monospace":"</>", "Display":"Ab", "Handwriting":"✍", "Script":"Ss", "Slab Serif":"Tt", "Blackletter":"¶", "Pixel":"▪" };
const popularFonts = ["Inter", "Poppins", "Roboto", "Montserrat", "Lato", "Open Sans"];
const sampleText = "The quick brown fox jumps over the lazy dog.";

function FontCard({ font, selected, onSelect, isFavorite, onToggleFavorite, isCompared, onToggleCompare }: { font: Font; selected: boolean; onSelect: (f: Font) => void; isFavorite: boolean; onToggleFavorite: (s: string) => void; isCompared: boolean; onToggleCompare: (f: Font) => void }) {
  return (
    <div className={`font-card${selected ? " active" : ""}`} onClick={() => onSelect(font)}>
      <div className="font-card-header">
        <div><div className="font-card-name">{font.family}</div><div className="font-card-designer">{font.designer}</div></div>
        <button className={`font-card-fav${isFavorite ? " active" : ""}`} onClick={(e) => { e.stopPropagation(); onToggleFavorite(font.slug); }}><Heart size={14} fill={isFavorite ? "#ef4444" : "none"} /></button>
      </div>
      <div className="font-card-specimen" style={{ fontFamily: `'${font.family}', sans-serif` }}>Aa</div>
      <div className="font-card-meta">
        <span className="font-card-badge">{font.weights.length} weights</span>
        <span className="font-card-badge category">{font.category}</span>
        {font.variable && <span className="font-card-badge variable">Variable</span>}
      </div>
      <button className={`compare-btn${isCompared ? " active" : ""}`} onClick={(e) => { e.stopPropagation(); onToggleCompare(font); }}>{isCompared ? "Remove" : "Compare"}</button>
    </div>
  );
}
function FontDetail({ font, text, onTextChange, weight, onWeightChange, size, onSizeChange, spacing, onSpacingChange, codeTab, onCodeTabChange }: { font: Font; text: string; onTextChange: (t: string) => void; weight: number; onWeightChange: (w: number) => void; size: number; onSizeChange: (s: number) => void; spacing: number; onSpacingChange: (s: number) => void; codeTab: CodeTab; onCodeTabChange: (t: CodeTab) => void }) {
  const [copied, setCopied] = useState(false);
  const [detailTab, setDetailTab] = useState("Preview");
  const detailTabs = ["Preview", "Glyphs", "Languages", "Weights", "Metadata", "License"];
  const cssUrl = useMemo(() => googleCssUrl(font, [weight]), [font, weight]);
  const codeSnippets: Record<CodeTab, string> = {
    CDN: `<link href="${cssUrl}" rel="stylesheet">`,
    CSS: `@import url('${cssUrl}');\n\nbody {\n  font-family: '${font.family}', ${font.category === "Monospace" ? "monospace" : "sans-serif"};\n  font-weight: ${weight};\n}`,
    HTML: `<link href="${cssUrl}" rel="stylesheet">\n\n<h1 style="font-family: '${font.family}'">${font.family}</h1>`,
    Tailwind: `// tailwind.config.js\nfontFamily: {\n  '${font.family.toLowerCase().replace(/\s+/g, "-")}': ['${font.family}', 'sans-serif'],\n}`,
    "Next.js": `import { ${font.family.replace(/\s+/g, "")} } from 'next/font/google'\n\nconst font = ${font.family.replace(/\s+/g, "")}({ weight: ['${weight}'], subsets: ['latin'] })`,
    React: `import '@fontsource/${font.family.toLowerCase().replace(/\s+/g, "-")}'`,
  };
  const handleCopy = () => { navigator.clipboard.writeText(codeSnippets[codeTab]); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="font-detail open">
      <div className="font-detail-header">
        <div>
          <div className="font-detail-name">{font.family}</div>
          <div className="font-detail-designer">by {font.designer}</div>
          {font.variable && <span className="font-card-badge variable" style={{ marginTop: 6, display: "inline-block" }}>Variable</span>}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-primary"><Download size={14} /> Source</button>
          <button className="btn btn-outline"><Heart size={14} /></button>
        </div>
      </div>
      <div className="font-detail-preview">
        <div className="font-detail-preview-text" style={{ fontFamily: `'${font.family}', sans-serif`, fontWeight: weight, fontSize: `${Math.min(size, 64)}px`, letterSpacing: `${spacing}px` }}>{text || sampleText}</div>
      </div>
      <div className="font-detail-controls">
        <div className="control-group"><input className="control-input" placeholder="Type custom text..." value={text} onChange={(e) => onTextChange(e.target.value)} /></div>
        <div className="control-row">
          <div className="control-group"><div className="control-label"><span>Size</span><span className="control-value">{size}px</span></div><input className="control-slider" type="range" min={12} max={120} value={size} onChange={(e) => onSizeChange(Number(e.target.value))} /></div>
          <div className="control-group"><div className="control-label"><span>Weight</span><span className="control-value">{weight}</span></div><input className="control-slider" type="range" min={100} max={900} step={100} value={weight} onChange={(e) => onWeightChange(Number(e.target.value))} /></div>
        </div>
        <div className="control-group"><div className="control-label"><span>Spacing</span><span className="control-value">{spacing}px</span></div><input className="control-slider" type="range" min={-5} max={20} value={spacing} onChange={(e) => onSpacingChange(Number(e.target.value))} /></div>
      </div>
      <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--surface-border)" }}>
        <div style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: 12 }}>Quick Use</div>
        <div className="code-box">
          <div className="code-tabs">{(Object.keys(codeSnippets) as CodeTab[]).map((t) => <button key={t} className={`code-tab${codeTab === t ? " active" : ""}`} onClick={() => onCodeTabChange(t)}>{t}</button>)}</div>
          <div className="code-content"><pre>{codeSnippets[codeTab]}</pre><button className="code-copy" onClick={handleCopy}>{copied ? <Check size={14} /> : <Copy size={14} />}</button></div>
        </div>
      </div>
      <div style={{ padding: "20px 24px" }}>
        <div className="code-tabs" style={{ marginBottom: 16 }}>{detailTabs.map((t) => <button key={t} className={`code-tab${detailTab === t ? " active" : ""}`} onClick={() => setDetailTab(t)}>{t}</button>)}</div>
        {detailTab === "Preview" && <div><p style={{ fontFamily: `'${font.family}'`, fontSize: "1.1rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>{font.description}</p><div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>{font.tags.map((tag) => <span key={tag} className="font-card-badge">{tag}</span>)}</div></div>}
        {detailTab === "Glyphs" && <div style={{ fontFamily: `'${font.family}'`, fontSize: "1.2rem", lineHeight: 2, wordBreak: "break-all" }}>{"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("").map((ch, i) => <span key={i} style={{ display: "inline-block", width: 34, height: 34, textAlign: "center", lineHeight: "34px", border: "1px solid var(--surface-border)", borderRadius: 6, margin: 2 }}>{ch}</span>)}</div>}
        {detailTab === "Languages" && <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{font.scripts.map((s) => <span key={s} className="font-card-badge category">{s}</span>)}</div>}
        {detailTab === "Weights" && <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{font.weights.map((w) => <span key={w} className="font-card-badge" style={{ cursor: "pointer", background: w === weight ? "var(--accent)" : "var(--bg)", color: w === weight ? "#fff" : "var(--text-secondary)" }} onClick={() => onWeightChange(w)}>{w}</span>)}</div>}
        {detailTab === "Metadata" && <div style={{ fontSize: "0.85rem", lineHeight: 2, color: "var(--text-secondary)" }}><div><strong>Family:</strong> {font.family}</div><div><strong>Designer:</strong> {font.designer}</div><div><strong>Category:</strong> {font.category}</div><div><strong>Weights:</strong> {font.weights.join(", ")}</div><div><strong>Variable:</strong> {font.variable ? "Yes" : "No"}</div><div><strong>Scripts:</strong> {font.scripts.join(", ")}</div></div>}
        {detailTab === "License" && <div style={{ fontSize: "0.85rem", lineHeight: 2, color: "var(--text-secondary)" }}><div><strong>License:</strong> {font.license}</div>{font.licenseUrl && <a href={font.licenseUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "underline" }}>View License</a>}</div>}
      </div>
    </div>
  );
}
function FontPairingsView({ fonts }: { fonts: Font[] }) {
  const [h, setH] = useState(fonts[0]);
  const [b, setB] = useState(fonts[1] || fonts[0]);
  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>Font Pairings</h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: 32, maxWidth: 500 }}>Find the perfect heading and body font combination.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
        <div className="control-group"><label className="control-label"><span>Heading font</span></label><select className="control-input" value={h.slug} onChange={(e) => setH(fonts.find(f => f.slug === e.target.value) || h)}>{fonts.map((f) => <option key={f.slug} value={f.slug}>{f.family}</option>)}</select></div>
        <div className="control-group"><label className="control-label"><span>Body font</span></label><select className="control-input" value={b.slug} onChange={(e) => setB(fonts.find(f => f.slug === e.target.value) || b)}>{fonts.map((f) => <option key={f.slug} value={f.slug}>{f.family}</option>)}</select></div>
      </div>
      <div style={{ background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "var(--radius-lg)", padding: 40 }}>
        <div style={{ fontFamily: `'${h.family}'`, fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 16 }}>Build something remarkable.</div>
        <p style={{ fontFamily: `'${b.family}'`, fontSize: 18, lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: 600, marginBottom: 20 }}>Typography is part of the product. Test it before you ship it.</p>
        <button className="btn btn-primary">Primary action</button>
      </div>
    </div>
  );
}

function FavoritesView({ favorites, fonts, onSelect }: { favorites: string[]; fonts: Font[]; onSelect: (f: Font) => void }) {
  const favFonts = fonts.filter((f) => favorites.includes(f.slug));
  if (favFonts.length === 0) return <div style={{ textAlign: "center", padding: 80, color: "var(--text-muted)" }}><Heart size={48} style={{ marginBottom: 16, opacity: 0.3 }} /><h3 style={{ marginBottom: 8 }}>No favorites yet</h3><p>Click the heart icon on any font to save it.</p></div>;
  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>Favorites</h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>{favFonts.length} saved font{favFonts.length !== 1 ? "s" : ""}</p>
      <div className="font-grid">{favFonts.map((font) => <div key={font.slug} className="font-card" onClick={() => onSelect(font)}><div className="font-card-header"><div><div className="font-card-name">{font.family}</div><div className="font-card-designer">{font.designer}</div></div></div><div className="font-card-specimen" style={{ fontFamily: `'${font.family}'` }}>Aa</div><div className="font-card-meta"><span className="font-card-badge">{font.weights.length} weights</span><span className="font-card-badge category">{font.category}</span></div></div>)}</div>
    </div>
  );
}

function LanguageView() {
  const count = (s: string) => fonts.filter((f) => f.scripts.includes(s)).length;
  return <div><h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>Language Support</h2><p style={{ color: "var(--text-secondary)", marginBottom: 32, maxWidth: 500 }}>Browse fonts by script and writing system.</p><div className="tools-grid">{scripts.map((s) => <div key={s} className="tool-card"><div className="tool-card-icon"><Globe2 size={20} /></div><div className="tool-card-title">{s}</div><div className="tool-card-desc">{count(s)} font{count(s) !== 1 ? "s" : ""}</div></div>)}</div></div>;
}

function PlaygroundView({ selectedFont }: { selectedFont: Font }) {
  return <div><h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>Design Playground</h2><p style={{ color: "var(--text-secondary)", marginBottom: 32, maxWidth: 500 }}>Experiment with fonts in a live preview.</p><div style={{ background: "var(--surface)", border: "1px solid var(--surface-border)", borderRadius: "var(--radius-lg)", padding: 40, minHeight: 300, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ fontFamily: `'${selectedFont.family}'`, fontSize: "clamp(24px, 4vw, 48px)", fontWeight: 700, lineHeight: 1.3, textAlign: "center" }}>Build something remarkable.</div></div></div>;
}

function ToolsView() {
  return <div><h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>Font Tools</h2><p style={{ color: "var(--text-secondary)", marginBottom: 32, maxWidth: 500 }}>Utilities for working with fonts.</p><div className="tools-grid"><div className="tool-card"><div className="tool-card-icon"><Eye size={20} /></div><div className="tool-card-title">Preview & Compare</div><div className="tool-card-desc">Side by side preview</div></div><div className="tool-card"><div className="tool-card-icon"><Code2 size={20} /></div><div className="tool-card-title">CSS Generator</div><div className="tool-card-desc">Generate import rules</div></div><div className="tool-card"><div className="tool-card-icon"><Upload size={20} /></div><div className="tool-card-title">Font Inspector</div><div className="tool-card-desc">Inspect font files</div></div><div className="tool-card"><div className="tool-card-icon"><Type size={20} /></div><div className="tool-card-title">Weight Explorer</div><div className="tool-card-desc">Explore all weights</div></div></div></div>;
}

function ApiView() {
  return <div><h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>API & CDN</h2><p style={{ color: "var(--text-secondary)", marginBottom: 32, maxWidth: 500 }}>Integrate FontAtlas into your apps.</p><div className="code-box" style={{ marginBottom: 24 }}><div className="code-content"><pre>{`GET /api/fonts          — Full catalog\nGET /api/fonts/:slug   — Single font\nGET /api/css/:slug     — CSS endpoint\n\nhttps://fontatlas.vercel.app/api/fonts\nhttps://fontatlas.vercel.app/api/fonts/inter\nhttps://fontatlas.vercel.app/api/css/inter`}</pre></div></div><div className="tools-grid"><div className="tool-card"><div className="tool-card-icon"><Zap size={20} /></div><div className="tool-card-title">Fast CDN</div><div className="tool-card-desc">Google Fonts delivery</div></div><div className="tool-card"><div className="tool-card-icon"><Code2 size={20} /></div><div className="tool-card-title">RESTful API</div><div className="tool-card-desc">Simple endpoints</div></div><div className="tool-card"><div className="tool-card-icon"><FileText size={20} /></div><div className="tool-card-title">CSS Endpoints</div><div className="tool-card-desc">Per-font CSS</div></div><div className="tool-card"><div className="tool-card-icon"><Activity size={20} /></div><div className="tool-card-title">No Auth</div><div className="tool-card-desc">Open and free</div></div></div></div>;
}
export default function FontAtlasApp() {
  const [view, setView] = useState<View>("home");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [script, setScript] = useState("");
  const [selectedFont, setSelectedFont] = useState<Font>(fonts[0]);
  const [text, setText] = useState("");
  const [weight, setWeight] = useState(400);
  const [size, setSize] = useState(48);
  const [spacing, setSpacing] = useState(0);
  const [codeTab, setCodeTab] = useState<CodeTab>("CDN");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compare, setCompare] = useState<Font[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [fontTab, setFontTab] = useState("All");

  useEffect(() => { try { setTheme(localStorage.getItem("fa-theme") || "light"); } catch {} try { setFavorites(JSON.parse(localStorage.getItem("fa-favorites") || "[]")); } catch {} }, []);
  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); localStorage.setItem("fa-theme", theme); }, [theme]);
  useEffect(() => { localStorage.setItem("fa-favorites", JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { fonts.forEach((f) => { if (f.variable) { const link = document.createElement("link"); link.href = googleCssUrl(f); link.rel = "stylesheet"; document.head.appendChild(link); } }); }, []);

  const toggleTheme = () => setTheme((t) => t === "light" ? "dark" : "light");
  const toggleFavorite = (slug: string) => setFavorites((p) => p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug]);
  const toggleCompare = (font: Font) => setCompare((p) => { const ex = p.find((f) => f.slug === font.slug); if (ex) return p.filter((f) => f.slug !== font.slug); if (p.length >= 3) return p; return [...p, font]; });

  const filteredFonts = useMemo(() => {
    let list = fonts;
    if (query) { const q = query.toLowerCase(); list = list.filter((f) => f.family.toLowerCase().includes(q) || f.designer.toLowerCase().includes(q) || f.category.toLowerCase().includes(q) || f.tags.some((t) => t.toLowerCase().includes(q)) || f.scripts.some((s) => s.toLowerCase().includes(q))); }
    if (category) list = list.filter((f) => f.category === category);
    if (script) list = list.filter((f) => f.scripts.includes(script));
    if (fontTab === "Popular") list = list.filter((f) => f.weights.length >= 6);
    if (fontTab === "New") list = [...list].reverse().slice(0, 12);
    if (fontTab === "Variable") list = list.filter((f) => f.variable);
    return list;
  }, [query, category, script, fontTab]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; const name = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "); setSelectedFont({ slug: name.toLowerCase().replace(/\s+/g, "-"), family: name, designer: "Uploaded", category: "Sans Serif", tags: ["uploaded"], scripts: ["Latin"], weights: [400], variable: false, styles: ["normal"], license: "Unknown", licenseUrl: "", sourceUrl: "", googleFamily: "", description: "User-uploaded font." }); setShowUpload(false); setView("fonts"); };
  const selectFont = (font: Font) => { setSelectedFont(font); setWeight(font.weights.includes(400) ? 400 : font.weights[0]); setText(""); setSize(48); setSpacing(0); setCodeTab("CDN"); if (view === "home" || view === "favorites" || view === "pairings") setView("fonts"); };
  const nav = (v: View) => { setView(v); setMobileOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <>
      <div className="topbar">
        <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)}><Menu size={20} /></button>
        <div className="topbar-brand"><div className="topbar-brand-icon">F</div>FontAtlas</div>
        <div className="topbar-nav">
          {[["Fonts","fonts"],["Categories","fonts"],["Languages","languages"],["Playground","playground"],["Tools","tools"],["Resources","api"]].map(([label, v]) => (
            <a key={label} href="#" className={view === v && (v !== "fonts" || view === "fonts") ? "active" : ""} onClick={(e) => { e.preventDefault(); nav(v as View); }}>{label}</a>
          ))}
        </div>
        <div className="topbar-search"><span className="topbar-search-icon"><Search size={14} /></span><input placeholder="Search fonts..." value={query} onChange={(e) => { setQuery(e.target.value); if (view === "home") setView("fonts"); }} /></div>
        <button className="topbar-btn" onClick={toggleTheme}>{theme === "light" ? <Moon size={18} /> : <Sun size={18} />}</button>
        <div className="topbar-tagline">A better web starts with better type.</div>
      </div>

      <div className="layout">
        <div className="sidebar">
          <div className="side-group">
            <div className={`side-item${view === "home" ? " active" : ""}`} onClick={() => nav("home")}><span className="side-item-icon"><Home size={16} /></span>Home</div>
            <div className={`side-item${view === "fonts" && fontTab === "All" ? " active" : ""}`} onClick={() => { setFontTab("All"); nav("fonts"); }}><span className="side-item-icon"><LayoutGrid size={16} /></span>All Fonts</div>
            <div className={`side-item${view === "fonts" && fontTab === "Popular" ? " active" : ""}`} onClick={() => { setFontTab("Popular"); nav("fonts"); }}><span className="side-item-icon"><Star size={16} /></span>Popular</div>
            <div className={`side-item${view === "fonts" && fontTab === "New" ? " active" : ""}`} onClick={() => { setFontTab("New"); nav("fonts"); }}><span className="side-item-icon"><Sparkles size={16} /></span>New Releases</div>
            <div className={`side-item${view === "fonts" && fontTab === "Variable" ? " active" : ""}`} onClick={() => { setFontTab("Variable"); nav("fonts"); }}><span className="side-item-icon"><Variable size={16} /></span>Variable Fonts</div>
            <div className={`side-item${view === "pairings" ? " active" : ""}`} onClick={() => nav("pairings")}><span className="side-item-icon"><Palette size={16} /></span>Font Pairings</div>
            <div className={`side-item${view === "favorites" ? " active" : ""}`} onClick={() => nav("favorites")}><span className="side-item-icon"><Heart size={16} /></span>Collections</div>
            <div className={`side-item${view === "languages" ? " active" : ""}`} onClick={() => nav("languages")}><span className="side-item-icon"><Globe2 size={16} /></span>Language Support</div>
            <div className={`side-item${view === "playground" ? " active" : ""}`} onClick={() => nav("playground")}><span className="side-item-icon"><Eye size={16} /></span>Design Playground</div>
            <div className={`side-item${view === "tools" ? " active" : ""}`} onClick={() => nav("tools")}><span className="side-item-icon"><SlidersHorizontal size={16} /></span>Font Tools</div>
            <div className={`side-item${view === "api" ? " active" : ""}`} onClick={() => nav("api")}><span className="side-item-icon"><Code2 size={16} /></span>API & CDN</div>
          </div>
          <div className="side-group">
            <div className="side-group-title">LOCAL FIRST</div>
            <div className="side-item" onClick={() => setShowUpload(true)}><span className="side-item-icon"><Upload size={16} /></span>Test Your Font</div>
          </div>
          <div className="side-group">
            <div className="side-item" onClick={() => nav("home")}><span className="side-item-icon"><BookOpen size={16} /></span>About</div>
          </div>
          <div className="sidebar-promo"><strong>Beautiful fonts for a better web.</strong>Free to use.</div>
        </div>
        <div className="layout-content">
          <div className="layout-main">
            {view === "home" && (<>
              <div className="hero">
                <div className="hero-left">
                  <div className="hero-eyebrow">OPEN · FREE · FOR EVERYONE</div>
                  <h1 className="hero-title">Find the perfect font for your <span className="accent">next project</span></h1>
                  <p className="hero-subtitle">Browse {fonts.length}+ open-source fonts. Variable, multilingual, ready to use. Preview, compare, and get code snippets instantly.</p>
                  <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
                    <div className="topbar-search" style={{ maxWidth: 320 }}><span className="topbar-search-icon"><Search size={14} /></span><input placeholder="Search fonts..." value={query} onChange={(e) => setQuery(e.target.value)} onFocus={() => setView("fonts")} /></div>
                    <button className="btn btn-primary" onClick={() => setView("fonts")}>Browse Fonts</button>
                  </div>
                  <div style={{ display: "flex", gap: 6, marginTop: 16, flexWrap: "wrap", alignItems: "center" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Popular:</span>
                    {popularFonts.map((name) => <span key={name} className="category-chip" onClick={() => { setQuery(name); setView("fonts"); }}>{name}</span>)}
                  </div>
                </div>
                <div className="hero-art"><div className="hero-card"><div className="hero-card-text">Typography inspires better products.</div><div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: 8 }}>Use the right font. Make a stronger impression.</div><a href="#" style={{ fontSize: "0.85rem", color: "var(--accent)", fontWeight: 600 }} onClick={(e) => { e.preventDefault(); setView("fonts"); }}>Explore Fonts →</a><div className="hero-card-aa">Aa</div></div></div>
              </div>
              <div className="categories"><div className="categories-title">Browse by Category</div><div className="categories-scroll">{categories.map((cat) => <button key={cat} className={`category-chip${category === cat ? " active" : ""}`} onClick={() => { setCategory(category === cat ? "" : cat); setView("fonts"); }}><span className="category-chip-icon">{categoryIcons[cat] || "Aa"}</span>{cat}</button>)}</div></div>
              <div style={{ marginBottom: 40 }}>
                <div className="font-section-header"><div className="font-section-title">Featured Fonts</div><span className="font-count">{filteredFonts.length} fonts</span></div>
                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>{["All", "Popular", "New", "Variable"].map((t) => <button key={t} className={`code-tab${fontTab === t ? " active" : ""}`} onClick={() => setFontTab(t)}>{t}</button>)}</div>
                <div style={{ display: "flex", gap: 24 }}>
                  <div style={{ flex: 1, minWidth: 0 }}><div className="font-grid">{filteredFonts.slice(0, 12).map((font) => <FontCard key={font.slug} font={font} selected={selectedFont?.slug === font.slug} onSelect={selectFont} isFavorite={favorites.includes(font.slug)} onToggleFavorite={toggleFavorite} isCompared={compare.some((c) => c.slug === font.slug)} onToggleCompare={toggleCompare} />)}</div></div>
                  {selectedFont && <FontDetail font={selectedFont} text={text} onTextChange={setText} weight={weight} onWeightChange={setWeight} size={size} onSizeChange={setSize} spacing={spacing} onSpacingChange={setSpacing} codeTab={codeTab} onCodeTabChange={setCodeTab} />}
                </div>
              </div>
              {compare.length > 0 && (<div className="compare-section"><div className="compare-header"><div className="compare-title">Compare Fonts ({compare.length}/3)</div><button className="btn btn-outline" onClick={() => setCompare([])}>Clear All</button></div><div className="compare-grid">{compare.map((font) => <div key={font.slug} className="compare-card"><div className="compare-card-header"><div className="compare-card-name">{font.family}</div><button className="compare-card-remove" onClick={() => toggleCompare(font)}><X size={14} /></button></div><div className="compare-card-body" style={{ fontFamily: `'${font.family}'` }}>The quick brown fox jumps over the lazy dog</div><div className="compare-card-footer"><span className="font-card-badge">{font.category}</span><span className="font-card-badge">{font.weights.length} weights</span></div></div>)}</div></div>)}
              <div style={{ marginBottom: 40 }}><h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: 4 }}>More than Just Fonts</h2><p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: 20 }}>Everything you need to work with type</p><div className="tools-grid"><div className="tool-card"><div className="tool-card-icon"><Eye size={20} /></div><div className="tool-card-title">Preview & Compare</div><div className="tool-card-desc">See fonts side by side</div></div><div className="tool-card"><div className="tool-card-icon"><Globe2 size={20} /></div><div className="tool-card-title">Language Support</div><div className="tool-card-desc">16+ scripts</div></div><div className="tool-card"><div className="tool-card-icon"><Code2 size={20} /></div><div className="tool-card-title">Ready-to-Use Code</div><div className="tool-card-desc">CDN, CSS, React, Next.js</div></div><div className="tool-card"><div className="tool-card-icon"><Zap size={20} /></div><div className="tool-card-title">No Account Required</div><div className="tool-card-desc">Free and open</div></div></div></div>
            </>)}
            {view === "fonts" && (<div>
              <div className="font-section-header" style={{ marginTop: 8 }}><div className="font-section-title">{category || script ? "Filtered Fonts" : "All Fonts"}</div><span className="font-count">{filteredFonts.length} fonts</span></div>
              {(category || script) && <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>{category && <span className="category-chip active" onClick={() => setCategory("")}>{category} <X size={12} /></span>}{script && <span className="category-chip active" onClick={() => setScript("")}>{script} <X size={12} /></span>}</div>}
              <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>{["All", "Popular", "New", "Variable"].map((t) => <button key={t} className={`code-tab${fontTab === t ? " active" : ""}`} onClick={() => setFontTab(t)}>{t}</button>)}</div>
              <div style={{ display: "flex", gap: 24 }}>
                <div style={{ flex: 1, minWidth: 0 }}><div className="font-grid">{filteredFonts.map((font) => <FontCard key={font.slug} font={font} selected={selectedFont?.slug === font.slug} onSelect={selectFont} isFavorite={favorites.includes(font.slug)} onToggleFavorite={toggleFavorite} isCompared={compare.some((c) => c.slug === font.slug)} onToggleCompare={toggleCompare} />)}</div>{filteredFonts.length === 0 && <div style={{ textAlign: "center", padding: 60, color: "var(--text-muted)" }}>No fonts match your search.</div>}</div>
                {selectedFont && <FontDetail font={selectedFont} text={text} onTextChange={setText} weight={weight} onWeightChange={setWeight} size={size} onSizeChange={setSize} spacing={spacing} onSpacingChange={setSpacing} codeTab={codeTab} onCodeTabChange={setCodeTab} />}
              </div>
            </div>)}
            {view === "favorites" && <FavoritesView favorites={favorites} fonts={fonts} onSelect={selectFont} />}
            {view === "pairings" && <FontPairingsView fonts={fonts} />}
            {view === "languages" && <LanguageView />}
            {view === "playground" && <PlaygroundView selectedFont={selectedFont} />}
            {view === "tools" && <ToolsView />}
            {view === "api" && <ApiView />}

            <div className="footer">
              <div className="footer-inner">
                <div><div className="footer-brand">FontAtlas</div><div className="footer-desc">A free font library for a more beautiful web.</div><div className="footer-social"><a href="https://github.com/jojin1709" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Code2 size={16} /></a><a href="https://twitter.com/jojin1709" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Activity size={16} /></a><a href="#" aria-label="Discord"><Heart size={16} /></a></div></div>
                <div className="footer-col"><div className="footer-col-title">Product</div><a href="#" onClick={(e) => { e.preventDefault(); nav("fonts"); }}>Fonts</a><a href="#" onClick={(e) => { e.preventDefault(); nav("api"); }}>API</a><a href="#">License</a></div>
                <div className="footer-col"><div className="footer-col-title">Company</div><a href="#">About</a><a href="#">Contact</a></div>
                <div className="footer-col"><div className="footer-col-title">Resources</div><a href="#">Documentation</a><a href="#">Changelog</a></div>
              </div>
              <div className="footer-bottom"><span>© 2026 FontAtlas. All fonts are open-source.</span><span>Made with care for the web.</span></div>
            </div>
          </div>
        </div>
      </div>

      {mobileOpen && <div className="modal-overlay open" onClick={() => setMobileOpen(false)}><div className="modal" onClick={(e) => e.stopPropagation()}><div className="modal-header"><div className="modal-title">Menu</div><button className="modal-close" onClick={() => setMobileOpen(false)}><X size={18} /></button></div><div className="modal-body">
        {[["Home","home"],["All Fonts","fonts"],["Languages","languages"],["Playground","playground"],["Tools","tools"],["Resources","api"],["Pairings","pairings"],["Favorites","favorites"]].map(([label, v]) => <div key={label} className={`side-item${view === v ? " active" : ""}`} onClick={() => nav(v as View)}>{label}</div>)}
        <div style={{ marginTop: 12, borderTop: "1px solid var(--surface-border)", paddingTop: 12 }}><div className="side-item" onClick={() => { setShowUpload(true); setMobileOpen(false); }}>Test Your Font</div></div>
      </div></div></div>}

      {showUpload && <div className="modal-overlay open" onClick={() => setShowUpload(false)}><div className="modal" onClick={(e) => e.stopPropagation()}><div className="modal-header"><div className="modal-title">Test Your Font</div><button className="modal-close" onClick={() => setShowUpload(false)}><X size={18} /></button></div><div className="modal-body">
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: 20 }}>Upload a .ttf, .otf, or .woff2 file to preview it locally.</p>
        <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", border: "2px dashed var(--surface-border)", borderRadius: "var(--radius-lg)", cursor: "pointer" }}>
          <Upload size={32} style={{ color: "var(--text-muted)", marginBottom: 12 }} />
          <div style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: 4 }}>Click to upload</div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>.ttf, .otf, or .woff2</div>
          <input type="file" accept=".ttf,.otf,.woff2,.woff" style={{ display: "none" }} onChange={handleFileUpload} />
        </label>
      </div></div></div>}
    </>
  );
}
