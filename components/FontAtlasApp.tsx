"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BookOpen,
  Check,
  ChevronRight,
  Code2,
  Copy,
  Download,
  Eye,
  FileText,
  Globe2,
  Heart,
  Home,
  Languages,
  LayoutGrid,
  Menu,
  Moon,
  Package,
  Palette,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Sun,
  Type,
  Upload,
  Variable,
  X,
  Zap,
} from "lucide-react";
import { Font, categories, fonts, googleCssUrl, scripts } from "../lib/fonts";
import opentype from "opentype.js";

type View = "home" | "fonts" | "languages" | "playground" | "tools" | "api";
type CodeTab = "CDN" | "CSS" | "HTML" | "Tailwind" | "Next.js" | "React";

const categoryIcons: Record<string, string> = {
  "Sans Serif": "Aa",
  Serif: "Tt",
  Monospace: "</>",
  Display: "Ab",
  Handwriting: "✍",
  Script: "Ss",
  Decorative: "★",
  Variable: "Vv",
  Symbol: "◆",
  Pixel: "▪",
  "Slab Serif": "Tt",
  Blackletter: "¶",
};

const navLinks: { label: string; view: View }[] = [
  { label: "Fonts", view: "fonts" },
  { label: "Categories", view: "fonts" },
  { label: "Languages", view: "languages" },
  { label: "Playground", view: "playground" },
  { label: "Tools", view: "tools" },
  { label: "Resources", view: "api" },
];

const sidebarItems: { icon: React.ReactNode; label: string; view: View }[] = [
  { icon: <Home size={16} />, label: "Home", view: "home" },
  { icon: <LayoutGrid size={16} />, label: "All Fonts", view: "fonts" },
  { icon: <Star size={16} />, label: "Popular", view: "fonts" },
  { icon: <Sparkles size={16} />, label: "New Releases", view: "fonts" },
  { icon: <Variable size={16} />, label: "Variable Fonts", view: "fonts" },
  { icon: <Palette size={16} />, label: "Font Pairings", view: "fonts" },
  { icon: <Package size={16} />, label: "Collections", view: "fonts" },
  { icon: <Globe2 size={16} />, label: "Language Support", view: "languages" },
  { icon: <Eye size={16} />, label: "Design Playground", view: "playground" },
  { icon: <Code2 size={16} />, label: "Font Tools", view: "tools" },
  { icon: <Activity size={16} />, label: "API & CDN", view: "api" },
];

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="tool-card">
      <div className="tool-card-icon">{icon}</div>
      <div className="tool-card-title">{title}</div>
      <div className="tool-card-desc">{desc}</div>
    </div>
  );
}

function ToolCard({
  icon,
  title,
  desc,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick?: () => void;
}) {
  return (
    <div className="tool-card" onClick={onClick}>
      <div className="tool-card-icon">{icon}</div>
      <div className="tool-card-title">{title}</div>
      <div className="tool-card-desc">{desc}</div>
    </div>
  );
}

function FontCard({
  font,
  selected,
  onSelect,
  isFavorite,
  onToggleFavorite,
}: {
  font: Font;
  selected: boolean;
  onSelect: (f: Font) => void;
  isFavorite: boolean;
  onToggleFavorite: (slug: string) => void;
}) {
  return (
    <div
      className={`font-card${selected ? " active" : ""}`}
      onClick={() => onSelect(font)}
      style={selected ? { borderColor: "var(--accent)" } : undefined}
    >
      <div className="font-card-header">
        <div>
          <div className="font-card-name">{font.family}</div>
          <div className="font-card-designer">{font.designer}</div>
        </div>
        <button
          className={`font-card-fav${isFavorite ? " active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(font.slug);
          }}
        >
          <Heart size={14} fill={isFavorite ? "#ef4444" : "none"} />
        </button>
      </div>
      <div
        className="font-card-specimen"
        style={{ fontFamily: `'${font.family}', sans-serif` }}
      >
        Aa
      </div>
      <div className="font-card-meta">
        <span className="font-card-badge">{font.weights.length} weights</span>
        <span className="font-card-badge category">{font.category}</span>
        {font.variable && (
          <span className="font-card-badge" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
            Variable
          </span>
        )}
      </div>
    </div>
  );
}

function FontDetail({
  font,
  text,
  onTextChange,
  weight,
  onWeightChange,
  size,
  onSizeChange,
  spacing,
  onSpacingChange,
  codeTab,
  onCodeTabChange,
  onClose,
}: {
  font: Font;
  text: string;
  onTextChange: (t: string) => void;
  weight: number;
  onWeightChange: (w: number) => void;
  size: number;
  onSizeChange: (s: number) => void;
  spacing: number;
  onSpacingChange: (s: number) => void;
  codeTab: CodeTab;
  onCodeTabChange: (t: CodeTab) => void;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [detailTab, setDetailTab] = useState<string>("Preview");

  const detailTabs = ["Preview", "Glyphs", "Languages", "Weights", "Metadata", "License"];

  const cssUrl = useMemo(() => googleCssUrl(font, [weight]), [font, weight]);

  const codeSnippets: Record<CodeTab, string> = {
    CDN: `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${cssUrl}" rel="stylesheet">`,
    CSS: `@import url('${cssUrl}');

body {
  font-family: '${font.family}', ${font.category === "Monospace" ? "monospace" : "sans-serif"};
  font-weight: ${weight};
}`,
    HTML: `<link href="${cssUrl}" rel="stylesheet">

<h1 style="font-family: '${font.family}'">${font.family}</h1>
<p style="font-family: '${font.family}'; font-weight: ${weight}">
  The quick brown fox jumps over the lazy dog.
</p>`,
    Tailwind: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        '${font.family.toLowerCase().replace(/\s+/g, "-")}': ['${font.family}', '${font.category === "Monospace" ? "monospace" : "sans-serif"}'],
      },
    },
  },
}`,
    "Next.js": `// app/layout.tsx
import { ${font.family.replace(/\s+/g, "")} } from 'next/font/google'

const ${font.family.replace(/\s+/g, "")} = ${font.family.replace(/\s+/g, "")}({
  weight: ['${weight}'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={${font.family.replace(/\s+/g, "")}.className}>
        {children}
      </body>
    </html>
  )
}`,
    React: `import { ${font.family.replace(/\s+/g, "")} } from '@fontsource/${font.family.toLowerCase().replace(/\s+/g, "-")}'

// Then in your component:
// <div style={{ fontFamily: '${font.family}' }}>
//   Hello World
// </div>

// Or with CSS:
// import '@fontsource/${font.family.toLowerCase().replace(/\s+/g, "-")}/${weight === 400 ? "regular" : `${weight}`}.css'`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[codeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="font-detail open">
      <div className="font-detail-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div className="font-detail-name">{font.family}</div>
            <div className="font-detail-designer">by {font.designer}</div>
          </div>
          <button
            className="modal-close"
            onClick={onClose}
            style={{ flexShrink: 0 }}
          >
            <X size={16} />
          </button>
        </div>
        {font.variable && (
          <span
            className="font-card-badge"
            style={{ display: "inline-block", marginTop: 8, background: "var(--accent-light)", color: "var(--accent)" }}
          >
            Variable
          </span>
        )}
        <div className="font-detail-actions">
          <button className="btn btn-primary">
            <Download size={14} style={{ marginRight: 6 }} />
            Download
          </button>
          <button className="btn btn-outline">
            <Heart size={14} />
          </button>
        </div>
      </div>

      <div className="font-detail-preview">
        <div
          className="font-detail-preview-text"
          style={{
            fontFamily: `'${font.family}', sans-serif`,
            fontWeight: weight,
            fontSize: `${Math.min(size, 64)}px`,
            letterSpacing: `${spacing}px`,
          }}
        >
          {text || "The quick brown fox jumps over the lazy dog"}
        </div>
      </div>

      <div className="font-detail-controls">
        <div className="control-group">
          <input
            className="control-input"
            placeholder="Type custom text..."
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
          />
        </div>
        <div className="control-row">
          <div className="control-group">
            <div className="control-label">
              <span>Size</span>
              <span className="control-value">{size}px</span>
            </div>
            <input
              className="control-slider"
              type="range"
              min={12}
              max={120}
              value={size}
              onChange={(e) => onSizeChange(Number(e.target.value))}
            />
          </div>
          <div className="control-group">
            <div className="control-label">
              <span>Weight</span>
              <span className="control-value">{weight}</span>
            </div>
            <input
              className="control-slider"
              type="range"
              min={100}
              max={900}
              step={100}
              value={weight}
              onChange={(e) => onWeightChange(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="control-group">
          <div className="control-label">
            <span>Spacing</span>
            <span className="control-value">{spacing}px</span>
          </div>
          <input
            className="control-slider"
            type="range"
            min={-5}
            max={20}
            value={spacing}
            onChange={(e) => onSpacingChange(Number(e.target.value))}
          />
        </div>
      </div>

      <div style={{ padding: "24px", borderBottom: "1px solid var(--surface-border)" }}>
        <div style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: 12 }}>Quick Use</div>
        <div className="code-box">
          <div className="code-tabs">
            {(Object.keys(codeSnippets) as CodeTab[]).map((tab) => (
              <button
                key={tab}
                className={`code-tab${codeTab === tab ? " active" : ""}`}
                onClick={() => onCodeTabChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="code-content">
            <pre>{codeSnippets[codeTab]}</pre>
            <button className="code-copy" onClick={handleCopy}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding: "24px" }}>
        <div className="code-tabs" style={{ marginBottom: 16 }}>
          {detailTabs.map((tab) => (
            <button
              key={tab}
              className={`code-tab${detailTab === tab ? " active" : ""}`}
              onClick={() => setDetailTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {detailTab === "Preview" && (
          <div>
            <p
              style={{
                fontFamily: `'${font.family}', sans-serif`,
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: "var(--text-secondary)",
              }}
            >
              {font.description}
            </p>
            <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 6 }}>
              {font.tags.map((tag) => (
                <span key={tag} className="font-card-badge">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        {detailTab === "Glyphs" && (
          <div style={{ fontFamily: `'${font.family}', sans-serif`, fontSize: "1.5rem", lineHeight: 2, wordBreak: "break-all" }}>
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:'\",.<>?/".split("").map((ch, i) => (
              <span key={i} style={{ display: "inline-block", width: 36, height: 36, textAlign: "center", lineHeight: "36px", border: "1px solid var(--surface-border)", borderRadius: "var(--radius-sm)", margin: 2 }}>
                {ch}
              </span>
            ))}
          </div>
        )}
        {detailTab === "Languages" && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {font.scripts.map((s) => (
              <span key={s} className="font-card-badge category">
                {s}
              </span>
            ))}
          </div>
        )}
        {detailTab === "Weights" && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {font.weights.map((w) => (
              <span
                key={w}
                className="font-card-badge"
                style={{
                  cursor: "pointer",
                  background: w === weight ? "var(--accent)" : "var(--bg)",
                  color: w === weight ? "#fff" : "var(--text-secondary)",
                }}
                onClick={() => onWeightChange(w)}
              >
                {w}
              </span>
            ))}
          </div>
        )}
        {detailTab === "Metadata" && (
          <div style={{ fontSize: "0.85rem", lineHeight: 2, color: "var(--text-secondary)" }}>
            <div><strong>Family:</strong> {font.family}</div>
            <div><strong>Designer:</strong> {font.designer}</div>
            <div><strong>Category:</strong> {font.category}</div>
            <div><strong>Weights:</strong> {font.weights.join(", ")}</div>
            <div><strong>Variable:</strong> {font.variable ? "Yes" : "No"}</div>
            <div><strong>Scripts:</strong> {font.scripts.join(", ")}</div>
          </div>
        )}
        {detailTab === "License" && (
          <div style={{ fontSize: "0.85rem", lineHeight: 2, color: "var(--text-secondary)" }}>
            <div><strong>License:</strong> {font.license}</div>
            <a
              href={font.licenseUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent)", textDecoration: "underline" }}
            >
              View License
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function LanguageView({ query }: { query: string }) {
  const filtered = scripts.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  );
  const fontsByScript = (script: string) =>
    fonts.filter((f) => f.scripts.includes(script));

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>
        Language Support
      </h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: 32, maxWidth: 500 }}>
        Browse fonts organized by script and writing system. Find the perfect font for multilingual projects.
      </p>
      <div className="tools-grid">
        {filtered.map((script) => {
          const count = fontsByScript(script).length;
          return (
            <div key={script} className="tool-card">
              <div className="tool-card-icon">
                <Globe2 size={20} />
              </div>
              <div className="tool-card-title">{script}</div>
              <div className="tool-card-desc">{count} font{count !== 1 ? "s" : ""}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Playground({
  selectedFont,
  text,
  weight,
  size,
  spacing,
}: {
  selectedFont: Font | null;
  text: string;
  weight: number;
  size: number;
  spacing: number;
}) {
  const displayText = text || "The quick brown fox jumps over the lazy dog";
  const fontFamily = selectedFont ? `'${selectedFont.family}', sans-serif` : "'Inter', sans-serif";

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>
        Design Playground
      </h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: 32, maxWidth: 500 }}>
        Experiment with fonts in a live preview environment.
      </p>
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--surface-border)",
          borderRadius: "var(--radius-lg)",
          padding: 40,
          minHeight: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily,
            fontWeight: weight,
            fontSize: `${size}px`,
            letterSpacing: `${spacing}px`,
            lineHeight: 1.4,
            textAlign: "center",
            maxWidth: "100%",
            wordBreak: "break-word",
          }}
        >
          {displayText}
        </div>
      </div>
    </div>
  );
}

function ToolsView() {
  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>
        Font Tools
      </h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: 32, maxWidth: 500 }}>
        Utilities to help you work with fonts in your projects.
      </p>
      <div className="tools-grid">
        <ToolCard icon={<Eye size={20} />} title="Preview & Compare" desc="Preview fonts side by side" />
        <ToolCard icon={<Code2 size={20} />} title="CSS Generator" desc="Generate CSS import rules" />
        <ToolCard icon={<Download size={20} />} title="Batch Download" desc="Download multiple fonts at once" />
        <ToolCard icon={<Upload size={20} />} title="Font Inspector" desc="Inspect font file details" />
        <ToolCard icon={<Palette size={20} />} title="Color Tester" desc="Test fonts with custom colors" />
        <ToolCard icon={<Type size={20} />} title="Weight Explorer" desc="Explore all font weights" />
      </div>
    </div>
  );
}

function ApiView() {
  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>
        API & CDN
      </h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: 32, maxWidth: 500 }}>
        Integrate FontAtlas into your applications using our API.
      </p>
      <div className="code-box" style={{ marginBottom: 24 }}>
        <div className="code-tabs">
          <button className="code-tab active">REST API</button>
          <button className="code-tab">GraphQL</button>
        </div>
        <div className="code-content">
          <pre>{`// GET /api/fonts
// Returns all fonts in the library

fetch('https://fontatlas.dev/api/fonts')
  .then(res => res.json())
  .then(fonts => console.log(fonts))

// GET /api/fonts?category=Sans Serif
// Filter by category

// GET /api/fonts?script=Latin
// Filter by script

// GET /api/fonts/:slug
// Get a single font by slug`}</pre>
        </div>
      </div>
      <div className="tools-grid">
        <Feature
          icon={<Zap size={20} />}
          title="Fast CDN"
          desc="Fonts served via global CDN"
        />
        <Feature
          icon={<Code2 size={20} />}
          title="RESTful API"
          desc="Simple, predictable endpoints"
        />
        <Feature
          icon={<FileText size={20} />}
          title="Documentation"
          desc="Comprehensive API docs"
        />
        <Feature
          icon={<Activity size={20} />}
          title="99.9% Uptime"
          desc="Reliable font delivery"
        />
      </div>
    </div>
  );
}

export default function FontAtlasApp() {
  const [view, setView] = useState<View>("home");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [script, setScript] = useState("");
  const [selectedFont, setSelectedFont] = useState<Font | null>(null);
  const [text, setText] = useState("");
  const [weight, setWeight] = useState(400);
  const [size, setSize] = useState(48);
  const [spacing, setSpacing] = useState(0);
  const [codeTab, setCodeTab] = useState<CodeTab>("CDN");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compare, setCompare] = useState<Font[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [uploadedFont, setUploadedFont] = useState<string | null>(null);
  const [theme, setTheme] = useState<string>("light");
  const [fontTab, setFontTab] = useState<string>("All");

  useEffect(() => {
    const savedTheme = localStorage.getItem("fa-theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  useEffect(() => {
    const savedFavs = localStorage.getItem("fa-favorites");
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
  }, []);

  useEffect(() => {
    localStorage.setItem("fa-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    fonts.forEach((font) => {
      if (font.variable) {
        const link = document.createElement("link");
        link.href = googleCssUrl(font);
        link.rel = "stylesheet";
        document.head.appendChild(link);
      }
    });
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("fa-theme", next);
  };

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const toggleCompare = (font: Font) => {
    setCompare((prev) => {
      const exists = prev.find((f) => f.slug === font.slug);
      if (exists) return prev.filter((f) => f.slug !== font.slug);
      if (prev.length >= 3) return prev;
      return [...prev, font];
    });
  };

  const filteredFonts = useMemo(() => {
    let list = fonts;
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (f) =>
          f.family.toLowerCase().includes(q) ||
          f.designer.toLowerCase().includes(q) ||
          f.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (category) list = list.filter((f) => f.category === category);
    if (script) list = list.filter((f) => f.scripts.includes(script));
    if (fontTab === "Popular") list = list.filter((f) => f.weights.length >= 6);
    if (fontTab === "New") list = [...list].reverse().slice(0, 12);
    if (fontTab === "Variable") list = list.filter((f) => f.variable);
    return list;
  }, [query, category, script, fontTab]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedFont(url);
    const name = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
    const newFont: Font = {
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      family: name,
      designer: "Uploaded",
      category: "Sans Serif",
      tags: ["uploaded"],
      scripts: ["Latin"],
      weights: [400],
      variable: false,
      styles: ["normal"],
      license: "Unknown",
      licenseUrl: "",
      sourceUrl: "",
      googleFamily: "",
      description: "User-uploaded font.",
    };
    setSelectedFont(newFont);
    setShowUpload(false);
  };

  const selectFont = (font: Font) => {
    setSelectedFont(font);
    setWeight(font.weights.includes(400) ? 400 : font.weights[0]);
    setText("");
    setSize(48);
    setSpacing(0);
    setCodeTab("CDN");
    if (view === "home") setView("fonts");
  };

  const handleNavClick = (v: View) => {
    setView(v);
    setMobileOpen(false);
  };

  const popularFonts = fonts.filter((f) => f.weights.length >= 7).slice(0, 6);
  const popularTags = ["modern", "clean", "ui", "editorial", "code", "handwritten"];

  return (
    <>
      {/* ── Topbar ── */}
      <div className="topbar">
        <button
          className="topbar-btn"
          style={{ display: "none" }}
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={20} />
        </button>
        <div className="topbar-brand">
          <div className="topbar-brand-icon">F</div>
          FontAtlas
        </div>
        <div className="topbar-nav" style={{ display: "flex" }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href="#"
              className={view === link.view && view !== "home" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.view);
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="topbar-search">
          <span className="topbar-search-icon">
            <Search size={14} />
          </span>
          <input
            placeholder="Search fonts..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (view === "home") setView("fonts");
            }}
          />
        </div>
        <div className="topbar-actions">
          <button className="topbar-btn" onClick={toggleTheme}>
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
        <div
          style={{
            fontSize: "0.78rem",
            color: "var(--text-muted)",
            whiteSpace: "nowrap",
            display: "flex",
          }}
        >
          A better web starts with better type.
        </div>
      </div>

      <div className="layout">
        {/* ── Sidebar ── */}
        <div className="sidebar">
          <div className="side-group">
            {sidebarItems.slice(0, 8).map((item) => (
              <div
                key={item.label}
                className={`side-item${view === item.view && ((item.label === "Home" && view === "home") || (item.label !== "Home" && view === item.view)) ? " active" : ""}`}
                onClick={() => handleNavClick(item.view)}
              >
                <span className="side-item-icon">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
          <div className="side-group">
            <div className="side-group-title">LOCAL FIRST</div>
            <div className="side-item" onClick={() => setShowUpload(true)}>
              <span className="side-item-icon">
                <Upload size={16} />
              </span>
              Test Your Font
            </div>
          </div>
          <div className="side-group" style={{ marginTop: "auto" }}>
            {sidebarItems.slice(8).map((item) => (
              <div
                key={item.label}
                className={`side-item${view === item.view ? " active" : ""}`}
                onClick={() => handleNavClick(item.view)}
              >
                <span className="side-item-icon">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
          <div className="sidebar-promo">
            <strong>Beautiful fonts for a better web.</strong>
            Free to use.
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="layout-content">
          <div className="layout-main">
            {view === "home" && (
              <>
                {/* ── Hero ── */}
                <div className="hero">
                  <div className="hero-left">
                    <div
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: 1.5,
                        color: "var(--accent)",
                        marginBottom: 12,
                      }}
                    >
                      OPEN · FREE · FOR EVERYONE
                    </div>
                    <h1 className="hero-title">
                      Find the perfect font for your{" "}
                      <span className="accent">next project</span>
                    </h1>
                    <p className="hero-subtitle">
                      Browse {fonts.length}+ open-source fonts. Variable, multilingual, ready to use.
                      Preview, compare, and get code snippets instantly.
                    </p>
                    <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
                      <div className="topbar-search" style={{ maxWidth: 320 }}>
                        <span className="topbar-search-icon">
                          <Search size={14} />
                        </span>
                        <input
                          placeholder="Search fonts..."
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          onFocus={() => setView("fonts")}
                        />
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={() => setView("fonts")}
                      >
                        Browse Fonts
                      </button>
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 16, flexWrap: "wrap" }}>
                      {popularTags.map((tag) => (
                        <span
                          key={tag}
                          className="category-chip"
                          onClick={() => {
                            setQuery(tag);
                            setView("fonts");
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="hero-art">
                    <div className="hero-card">
                      <div className="hero-card-text">
                        Typography inspires better products.
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "0.85rem",
                            color: "var(--text-secondary)",
                            marginBottom: 8,
                          }}
                        >
                          Use the right font. Make a stronger impression.
                        </div>
                        <a
                          href="#"
                          style={{
                            fontSize: "0.85rem",
                            color: "var(--accent)",
                            fontWeight: 600,
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            setView("fonts");
                          }}
                        >
                          Explore Fonts →
                        </a>
                      </div>
                      <div className="hero-card-aa">Aa</div>
                    </div>
                  </div>
                </div>

                {/* ── Categories ── */}
                <div className="categories">
                  <div className="categories-title">Browse by Category</div>
                  <div className="categories-scroll">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        className={`category-chip${category === cat ? " active" : ""}`}
                        onClick={() => {
                          setCategory(category === cat ? "" : cat);
                          setView("fonts");
                        }}
                      >
                        <span className="category-chip-icon">
                          {categoryIcons[cat] || "Aa"}
                        </span>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Featured Fonts ── */}
                <div style={{ marginBottom: 40 }}>
                  <div className="font-section-header">
                    <div className="font-section-title">Featured Fonts</div>
                    <span className="font-count">{filteredFonts.length} fonts</span>
                  </div>
                  <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                    {["All", "Popular", "New", "Variable"].map((tab) => (
                      <button
                        key={tab}
                        className={`code-tab${fontTab === tab ? " active" : ""}`}
                        onClick={() => setFontTab(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 24 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="font-grid">
                        {filteredFonts.slice(0, 12).map((font) => (
                          <FontCard
                            key={font.slug}
                            font={font}
                            selected={selectedFont?.slug === font.slug}
                            onSelect={selectFont}
                            isFavorite={favorites.includes(font.slug)}
                            onToggleFavorite={toggleFavorite}
                          />
                        ))}
                      </div>
                    </div>
                    {selectedFont && (
                      <FontDetail
                        font={selectedFont}
                        text={text}
                        onTextChange={setText}
                        weight={weight}
                        onWeightChange={setWeight}
                        size={size}
                        onSizeChange={setSize}
                        spacing={spacing}
                        onSpacingChange={setSpacing}
                        codeTab={codeTab}
                        onCodeTabChange={setCodeTab}
                        onClose={() => setSelectedFont(null)}
                      />
                    )}
                  </div>
                </div>

                {/* ── Compare Section ── */}
                {compare.length > 0 && (
                  <div className="compare-section">
                    <div className="compare-header">
                      <div className="compare-title">
                        Compare Fonts ({compare.length}/3)
                      </div>
                      <button
                        className="btn btn-outline"
                        onClick={() => setCompare([])}
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="compare-grid">
                      {compare.map((font) => (
                        <div key={font.slug} className="compare-card">
                          <div className="compare-card-header">
                            <div className="compare-card-name">{font.family}</div>
                            <button
                              className="compare-card-remove"
                              onClick={() => toggleCompare(font)}
                            >
                              <X size={14} />
                            </button>
                          </div>
                          <div
                            className="compare-card-body"
                            style={{ fontFamily: `'${font.family}', sans-serif` }}
                          >
                            The quick brown fox jumps over the lazy dog
                          </div>
                          <div className="compare-card-footer">
                            <span className="font-card-badge">{font.category}</span>
                            <span className="font-card-badge">{font.weights.length} weights</span>
                            {font.variable && (
                              <span className="font-card-badge" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
                                Variable
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── More Than Just Fonts ── */}
                <div style={{ marginBottom: 40 }}>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: 4 }}>
                    More than Just Fonts
                  </h2>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: 20 }}>
                    Everything you need to work with type
                  </p>
                  <div className="tools-grid">
                    <Feature
                      icon={<Eye size={20} />}
                      title="Preview & Compare"
                      desc="See fonts in action side by side"
                    />
                    <Feature
                      icon={<Globe2 size={20} />}
                      title="Language Support"
                      desc="16+ scripts and writing systems"
                    />
                    <Feature
                      icon={<Code2 size={20} />}
                      title="Ready-to-Use Code"
                      desc="CDN, CSS, React, Next.js snippets"
                    />
                    <Feature
                      icon={<Zap size={20} />}
                      title="No Account Required"
                      desc="Free and open for everyone"
                    />
                  </div>
                </div>
              </>
            )}

            {view === "fonts" && (
              <div>
                <div className="font-section-header" style={{ marginTop: 8 }}>
                  <div className="font-section-title">
                    {category || script ? `Filtered Fonts` : "All Fonts"}
                  </div>
                  <span className="font-count">{filteredFonts.length} fonts</span>
                </div>
                {(category || script) && (
                  <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
                    {category && (
                      <span className="category-chip active" onClick={() => setCategory("")}>
                        {category} <X size={12} style={{ marginLeft: 4 }} />
                      </span>
                    )}
                    {script && (
                      <span className="category-chip active" onClick={() => setScript("")}>
                        {script} <X size={12} style={{ marginLeft: 4 }} />
                      </span>
                    )}
                  </div>
                )}
                <div style={{ display: "flex", gap: 24 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="font-grid">
                      {filteredFonts.map((font) => (
                        <FontCard
                          key={font.slug}
                          font={font}
                          selected={selectedFont?.slug === font.slug}
                          onSelect={selectFont}
                          isFavorite={favorites.includes(font.slug)}
                          onToggleFavorite={toggleFavorite}
                        />
                      ))}
                    </div>
                    {filteredFonts.length === 0 && (
                      <div style={{ textAlign: "center", padding: 60, color: "var(--text-muted)" }}>
                        No fonts match your search.
                      </div>
                    )}
                  </div>
                  {selectedFont && (
                    <FontDetail
                      font={selectedFont}
                      text={text}
                      onTextChange={setText}
                      weight={weight}
                      onWeightChange={setWeight}
                      size={size}
                      onSizeChange={setSize}
                      spacing={spacing}
                      onSpacingChange={setSpacing}
                      codeTab={codeTab}
                      onCodeTabChange={setCodeTab}
                      onClose={() => setSelectedFont(null)}
                    />
                  )}
                </div>
              </div>
            )}

            {view === "languages" && <LanguageView query={query} />}
            {view === "playground" && (
              <Playground
                selectedFont={selectedFont}
                text={text}
                weight={weight}
                size={size}
                spacing={spacing}
              />
            )}
            {view === "tools" && <ToolsView />}
            {view === "api" && <ApiView />}

            {/* ── Footer ── */}
            <div className="footer">
              <div className="footer-inner">
                <div>
                  <div className="footer-brand">FontAtlas</div>
                  <div className="footer-desc">
                    A free font library for a more beautiful web.
                  </div>
                  <div className="footer-social">
                    <a href="#" aria-label="GitHub">
                      <Code2 size={16} />
                    </a>
                    <a href="#" aria-label="Twitter">
                      <Activity size={16} />
                    </a>
                    <a href="#" aria-label="Discord">
                      <Heart size={16} />
                    </a>
                  </div>
                </div>
                <div className="footer-col">
                  <div className="footer-col-title">Product</div>
                  <a href="#">Fonts</a>
                  <a href="#">API</a>
                  <a href="#">License</a>
                </div>
                <div className="footer-col">
                  <div className="footer-col-title">Company</div>
                  <a href="#">About</a>
                  <a href="#">Contact</a>
                </div>
                <div className="footer-col">
                  <div className="footer-col-title">Resources</div>
                  <a href="#">Documentation</a>
                  <a href="#">Changelog</a>
                </div>
              </div>
              <div className="footer-bottom">
                <span>© 2026 FontAtlas. All fonts are open-source.</span>
                <span>Made with care for the web.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div
          className="modal-overlay open"
          onClick={() => setMobileOpen(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Menu</div>
              <button className="modal-close" onClick={() => setMobileOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              {sidebarItems.map((item) => (
                <div
                  key={item.label}
                  className={`side-item${view === item.view ? " active" : ""}`}
                  onClick={() => handleNavClick(item.view)}
                >
                  <span className="side-item-icon">{item.icon}</span>
                  {item.label}
                </div>
              ))}
              <div style={{ marginTop: 12, borderTop: "1px solid var(--surface-border)", paddingTop: 12 }}>
                <div className="side-item" onClick={() => { setShowUpload(true); setMobileOpen(false); }}>
                  <span className="side-item-icon">
                    <Upload size={16} />
                  </span>
                  Test Your Font
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Upload Modal ── */}
      {showUpload && (
        <div
          className="modal-overlay open"
          onClick={() => setShowUpload(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Test Your Font</div>
              <button className="modal-close" onClick={() => setShowUpload(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                  marginBottom: 20,
                }}
              >
                Upload a .ttf, .otf, or .woff2 file to preview it locally.
              </p>
              <label
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "40px 20px",
                  border: "2px dashed var(--surface-border)",
                  borderRadius: "var(--radius-lg)",
                  cursor: "pointer",
                  transition: "border-color var(--transition-fast)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "var(--surface-border)")
                }
              >
                <Upload
                  size={32}
                  style={{ color: "var(--text-muted)", marginBottom: 12 }}
                />
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  Click to upload
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  .ttf, .otf, or .woff2
                </div>
                <input
                  type="file"
                  accept=".ttf,.otf,.woff2,.woff"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
