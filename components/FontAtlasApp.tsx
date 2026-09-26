"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlignCenter,
  AlignLeft,
  AlignRight,
  BookOpen,
  Check,
  ChevronRight,
  Code2,
  Copy,
  Download,
  Eye,
  FileCode,
  FileText,
  Globe2,
  Heart,
  Home,
  Info,
  Layers,
  LayoutGrid,
  Menu,
  Moon,
  Package,
  Palette,
  RefreshCw,
  Search,
  Sliders,
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
import * as opentype from "opentype.js";
import {
  Font,
  categories,
  fonts,
  getFontDefaultText,
  getFontFallback,
  getFontPrimaryScript,
  getFontSampleChar,
  googleCssUrl,
  scriptSpecimens,
  scripts,
} from "../lib/fonts";
import { scriptQuickWords, transliterateToScript } from "../lib/transliterate";

type View =
  | "home"
  | "fonts"
  | "languages"
  | "playground"
  | "tools"
  | "api"
  | "pairings"
  | "favorites";
type CodeTab = "CDN" | "CSS" | "HTML" | "Tailwind" | "Next.js" | "React";

const categoryShowcase = [
  { name: "Sans Serif", specimen: "Aa", fontFam: "'Inter', sans-serif" },
  { name: "Serif", specimen: "Aa", fontFam: "'Playfair Display', serif" },
  { name: "Monospace", specimen: "Aa", fontFam: "'JetBrains Mono', monospace" },
  { name: "Display", specimen: "AA", fontFam: "'Bebas Neue', cursive" },
  { name: "Handwriting", specimen: "Aa", fontFam: "'Caveat', cursive" },
  { name: "Script", specimen: "Aa", fontFam: "'Great Vibes', cursive" },
  { name: "Slab Serif", specimen: "Da", fontFam: "'Alfa Slab One', serif" },
  { name: "Variable", specimen: "Aa", fontFam: "'Plus Jakarta Sans', sans-serif" },
  { name: "Multilingual", specimen: "അA", fontFam: "'Noto Sans Malayalam', sans-serif" },
  { name: "Pixel", specimen: "▪▪", fontFam: "'Press Start 2P', monospace" },
];

const fontTaglines: Record<string, string> = {
  inter: "Clean. Modern. Versatile.",
  roboto: "Modern and neutral.",
  poppins: "Geometric and friendly.",
  montserrat: "Urban, architectural, bold.",
  manrope: "Soft contemporary grotesque.",
  "dm-sans": "Low-contrast, clear UI type.",
  outfit: "Expressive headlines & startup UI.",
  "plus-jakarta-sans": "Editorial warmth with digital clarity.",
  lato: "Humanist, warm, professional.",
  "nunito-sans": "Softly rounded, approachable feel.",
  "open-sans": "Optimized legibility everywhere.",
  "source-sans-3": "Workhorse text for dense interfaces.",
  geist: "Precision-tuned for developer tools.",
  archivo: "Strong utility-oriented grotesque.",
  rubik: "Friendly rounded corners.",
  "work-sans": "Balanced workhorse for web interfaces.",
  "roboto-slab": "Sturdy editorial presence.",
  "playfair-display": "Elegant and stylish.",
  merriweather: "Comfortable digital reading serif.",
  "libre-baskerville": "Classic book revival for screen.",
  lora: "Calligraphic editorial charm.",
  "cormorant-garamond": "High-contrast luxury fashion serif.",
  bitter: "Crisp slab serif for reading.",
  "dm-mono": "Monospace with character.",
  "jetbrains-mono": "Code-focused developer monospace.",
  "fira-code": "Programming ligatures and clarity.",
  "space-mono": "Technical editorial fixed-width.",
  orbitron: "Futuristic tech headlines.",
  "bebas-neue": "All-caps punchy poster condensed.",
  anton: "High-impact poster grotesque.",
  oswald: "Classic gothic reimagined.",
  "archivo-black": "Ultra-heavy headline display.",
  pacifico: "Warm relaxed brush lettering.",
  "great-vibes": "Beautiful handwriting.",
  caveat: "Casual personal notes.",
  "dancing-script": "Lively informal script.",
  "permanent-marker": "Bold casual street marker.",
  "press-start-2p": "Classic arcade bitmap nostalgia.",
  silkscreen: "Crisp UI pixel display.",
  unifrakturcook: "Traditional gothic blackletter.",
  comfortaa: "Gentle rounded modern geometry.",
  "alfa-slab-one": "Heavy retro advertising slab.",
  "archivo-narrow": "Space-saving compact headlines.",
  "noto-sans-malayalam": "Comprehensive Malayalam Unicode.",
  "noto-serif-malayalam": "Editorial Malayalam reading serif.",
  gayathri: "Traditional Kerala Malayalam serif.",
  manjari: "Modern rounded Malayalam interface type.",
  chilanka: "Organic handwritten Malayalam script.",
  "anek-malayalam": "Bold contemporary Malayalam variable font.",
  "noto-sans-tamil": "Extensive Tamil script coverage.",
  "anek-tamil": "Contemporary Tamil variable font.",
  "mukta-malar": "Readable humanist Tamil typeface.",
  "noto-sans-devanagari": "Complete Devanagari Unicode.",
  mukta: "Versatile Hindi & Devanagari text family.",
  "noto-sans-telugu": "Clear Telugu digital reading.",
  "anek-telugu": "Expressive Telugu variable display font.",
  "noto-sans-kannada": "Harmonious Kannada typeface.",
  "anek-kannada": "Contemporary Kannada variable typeface.",
  "noto-sans-bengali": "Crisp Bengali digital reading.",
  "anek-bangla": "Expressive Bengali variable typography.",
  "noto-sans-gujarati": "Classic Gujarati script clarity.",
  "anek-gujarati": "Engineered Gujarati variable family.",
  "noto-sans-gurmukhi": "Clean Punjabi & Gurmukhi letterforms.",
  "anek-gurmukhi": "Modern Gurmukhi variable type.",
  "noto-sans-thai": "Harmonious Thai interface typeface.",
  kanit: "Geometric Thai with warm curves.",
  cairo: "Contemporary Arabic typeface.",
  amiri: "Classical Arabic Naskh book font.",
  heebo: "Clean Hebrew digital reading font.",
  "ibm-plex-sans": "Engineered technical brand clarity.",
  "source-code-pro": "Open-source developer staple.",
  quicksand: "Light, friendly geometric rhythm.",
};

const popularFonts = ["Inter", "Poppins", "Roboto", "Montserrat", "Lato", "Open Sans"];
const sampleText = "The quick brown fox jumps over the lazy dog.";

const injectedFontLinks = new Set<string>();

function ensureFontLoaded(font: Font) {
  if (!font.googleFamily) return;
  const linkId = `fa-link-${font.slug}`;
  if (injectedFontLinks.has(font.slug) || (typeof document !== "undefined" && document.getElementById(linkId))) {
    return;
  }
  injectedFontLinks.add(font.slug);
  const href = googleCssUrl(font);
  if (!href) return;
  const link = document.createElement("link");
  link.id = linkId;
  link.href = href;
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

export default function FontAtlasApp() {
  const [view, setView] = useState<View>("home");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [script, setScript] = useState("");
  const [selectedFont, setSelectedFont] = useState<Font>(fonts[0]);
  const [text, setText] = useState(sampleText);
  const [weight, setWeight] = useState(400);
  const [size, setSize] = useState(48);
  const [spacing, setSpacing] = useState(0);
  const [codeTab, setCodeTab] = useState<CodeTab>("CDN");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compare, setCompare] = useState<Font[]>([]);
  const [compareText, setCompareText] = useState(sampleText);
  const [showUpload, setShowUpload] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showLicense, setShowLicense] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [fontTab, setFontTab] = useState("All");

  const [detailTab, setDetailTab] = useState("Preview");
  const [detailCopied, setDetailCopied] = useState(false);
  const [copiedGlyph, setCopiedGlyph] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(true);
  const [phoneticMode, setPhoneticMode] = useState(true);
  const [pairingHeadingFont, setPairingHeadingFont] = useState<Font>(fonts[0]);
  const [pairingBodyFont, setPairingBodyFont] = useState<Font>(() => fonts.find((f) => f.slug === "lora") || fonts[1]);
  const [playgroundAlign, setPlaygroundAlign] = useState<"left" | "center" | "right">("left");

  // Local OpenType inspection data
  const [uploadedData, setUploadedData] = useState<{
    fontObj: Font;
    numGlyphs?: number;
    unitsPerEm?: number;
    ascender?: number;
    descender?: number;
    extractedGlyphs?: string[];
  } | null>(null);

  useEffect(() => {
    try {
      setTheme(localStorage.getItem("fa-theme") || "light");
    } catch {}
    try {
      setFavorites(JSON.parse(localStorage.getItem("fa-favorites") || "[]"));
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("fa-theme", theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem("fa-favorites", JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  useEffect(() => {
    ensureFontLoaded(selectedFont);
    ensureFontLoaded(pairingHeadingFont);
    ensureFontLoaded(pairingBodyFont);
    fonts.slice(0, 24).forEach((f) => ensureFontLoaded(f));
  }, [selectedFont, pairingHeadingFont, pairingBodyFont]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  const toggleFavorite = (slug: string) =>
    setFavorites((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug]));

  const toggleCompare = (font: Font) => {
    ensureFontLoaded(font);
    setCompare((p) => {
      const ex = p.find((f) => f.slug === font.slug);
      if (ex) return p.filter((f) => f.slug !== font.slug);
      if (p.length >= 3) return p;
      return [...p, font];
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
          f.category.toLowerCase().includes(q) ||
          f.tags.some((t) => t.toLowerCase().includes(q)) ||
          f.scripts.some((s) => s.toLowerCase().includes(q))
      );
    }
    if (category) {
      if (category === "Variable") {
        list = list.filter((f) => f.variable);
      } else if (category === "Multilingual") {
        list = list.filter((f) => f.scripts.some((s) => s !== "Latin"));
      } else {
        list = list.filter((f) => f.category === category);
      }
    }
    if (script) list = list.filter((f) => f.scripts.includes(script));
    if (fontTab === "Popular") list = list.filter((f) => f.weights.length >= 6);
    if (fontTab === "New") list = [...list].reverse().slice(0, 12);
    if (fontTab === "Variable") list = list.filter((f) => f.variable);
    return list;
  }, [query, category, script, fontTab]);

  useEffect(() => {
    filteredFonts.slice(0, 28).forEach((f) => ensureFontLoaded(f));
  }, [filteredFonts]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const buffer = await file.arrayBuffer();
      const rawName = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
      let detectedFamily = rawName;
      let detectedDesigner = "Uploaded Font";
      let parsedFont: opentype.Font | undefined = undefined;
      const glyphSamples: string[] = [];

      try {
        parsedFont = opentype.parse(buffer);
        if (parsedFont.names?.fontFamily) {
          const names = parsedFont.names.fontFamily;
          detectedFamily = names.en || Object.values(names)[0] || detectedFamily;
        }
        if (parsedFont.names?.designer) {
          const des = parsedFont.names.designer;
          detectedDesigner = des.en || Object.values(des)[0] || detectedDesigner;
        }
        if (parsedFont.glyphs && parsedFont.glyphs.glyphs) {
          const gMap = parsedFont.glyphs.glyphs;
          for (const key in gMap) {
            const g = gMap[key];
            if (g && g.unicode) {
              glyphSamples.push(String.fromCharCode(g.unicode));
              if (glyphSamples.length >= 64) break;
            }
          }
        }
      } catch (otErr) {
        console.warn("OpenType parsing error:", otErr);
      }

      try {
        const fontFace = new FontFace(detectedFamily, buffer);
        const loadedFace = await fontFace.load();
        document.fonts.add(loadedFace);
      } catch (ffErr) {
        console.warn("FontFace load error:", ffErr);
      }

      const localFont: Font = {
        slug: `local-${detectedFamily.toLowerCase().replace(/[\s-]+/g, "-")}`,
        family: detectedFamily,
        designer: detectedDesigner,
        category: "Sans Serif",
        tags: ["local", "uploaded", "custom"],
        scripts: ["Latin"],
        weights: [400],
        variable: false,
        styles: ["normal"],
        license: parsedFont?.names?.license?.en || "Custom Font (Local)",
        licenseUrl: parsedFont?.names?.licenseURL?.en || "",
        sourceUrl: "",
        googleFamily: "",
        description: `Local font uploaded from ${file.name}. Total glyphs: ${parsedFont?.numGlyphs || "N/A"}.`,
      };

      setUploadedData({
        fontObj: localFont,
        numGlyphs: parsedFont?.numGlyphs,
        unitsPerEm: parsedFont?.unitsPerEm,
        ascender: parsedFont?.ascender,
        descender: parsedFont?.descender,
        extractedGlyphs: glyphSamples.length > 0 ? glyphSamples : undefined,
      });

      setSelectedFont(localFont);
      setText(sampleText);
      setShowUpload(false);
      setView("fonts");
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const selectFont = (font: Font) => {
    ensureFontLoaded(font);
    setSelectedFont(font);
    setIsDetailOpen(true);
    setWeight(font.weights.includes(400) ? 400 : font.weights[0]);
    // Automatically load the font's native script text!
    setText(getFontDefaultText(font, script));
    setSize(48);
    setSpacing(0);
  };

  const applyScriptFilter = (s: string) => {
    setScript(s);
    setCategory("");
    const firstMatching = fonts.find((f) => f.scripts.includes(s));
    if (firstMatching) {
      ensureFontLoaded(firstMatching);
      setSelectedFont(firstMatching);
      setText(getFontDefaultText(firstMatching, s));
    }
    nav("fonts");
  };

  const nav = (v: View) => {
    setView(v);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectedFallback = getFontFallback(selectedFont.category);
  const selectedCssUrl = useMemo(() => googleCssUrl(selectedFont, [weight]), [selectedFont, weight]);

  const codeSnippets: Record<CodeTab, string> = {
    CDN: selectedFont.googleFamily ? `<link href="${selectedCssUrl}" rel="stylesheet">` : `/* Local font: ${selectedFont.family} */`,
    CSS: selectedFont.googleFamily
      ? `@import url('${selectedCssUrl}');\n\nbody {\n  font-family: '${selectedFont.family}', ${selectedFallback};\n  font-weight: ${weight};\n}`
      : `body {\n  font-family: '${selectedFont.family}', ${selectedFallback};\n  font-weight: ${weight};\n}`,
    HTML: selectedFont.googleFamily
      ? `<link href="${selectedCssUrl}" rel="stylesheet">\n\n<h1 style="font-family: '${selectedFont.family}', ${selectedFallback}">${selectedFont.family}</h1>`
      : `<h1 style="font-family: '${selectedFont.family}', ${selectedFallback}">${selectedFont.family}</h1>`,
    Tailwind: `// tailwind.config.js\nfontFamily: {\n  '${selectedFont.family.toLowerCase().replace(/\s+/g, "-")}': ['"${selectedFont.family}"', '${selectedFallback}'],\n}`,
    "Next.js": selectedFont.googleFamily
      ? `import { ${selectedFont.family.replace(/[\s-]+/g, "")} } from 'next/font/google'\n\nconst font = ${selectedFont.family.replace(/[\s-]+/g, "")}({ weight: ['${weight}'], subsets: ['latin'] })`
      : `// Use localFont from 'next/font/local'`,
    React: `import '@fontsource/${selectedFont.family.toLowerCase().replace(/\s+/g, "-")}'`,
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[codeTab]);
    setDetailCopied(true);
    setTimeout(() => setDetailCopied(false), 2000);
  };

  const activeGlyphsList = useMemo(() => {
    if (uploadedData?.extractedGlyphs && uploadedData.extractedGlyphs.length > 0) {
      return uploadedData.extractedGlyphs;
    }
    const prim = getFontPrimaryScript(selectedFont, script);
    if (scriptSpecimens[prim]?.alphabet) {
      return scriptSpecimens[prim].alphabet.split(" ");
    }
    return scriptSpecimens.Latin.alphabet.split(" ");
  }, [selectedFont, uploadedData, script]);

  return (
    <>
      {/* ── Top Bar ────────────────────────────────────────── */}
      <header className="topbar">
        <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)}>
          <Menu size={20} />
        </button>
        <div className="topbar-brand" style={{ cursor: "pointer" }} onClick={() => nav("home")}>
          <div className="topbar-brand-icon">F</div>
          <span>FontAtlas</span>
        </div>

        <nav className="topbar-nav">
          {[
            ["Fonts", "fonts"],
            ["Languages", "languages"],
            ["Playground", "playground"],
            ["Pairings", "pairings"],
            ["Tools", "tools"],
            ["Resources", "api"],
          ].map(([label, v]) => (
            <a
              key={label}
              href="#"
              className={view === v ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                nav(v as View);
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="topbar-search">
          <span className="topbar-search-icon">
            <Search size={15} />
          </span>
          <input
            placeholder="Search fonts, designers, or tags..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (view === "home") setView("fonts");
            }}
          />
        </div>

        <button className="topbar-btn" onClick={toggleTheme} title="Toggle theme">
          {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="topbar-tagline">A better web starts with better type.</div>
      </header>

      <div className="layout">
        {/* ── Left Sidebar ───────────────────────────────────── */}
        <aside className="sidebar">
          <div className="side-group">
            <div
              className={`side-item${view === "home" ? " active" : ""}`}
              onClick={() => nav("home")}
            >
              <span className="side-item-icon">
                <Home size={16} />
              </span>
              Home
            </div>
            <div
              className={`side-item${view === "fonts" && fontTab === "All" && !script ? " active" : ""}`}
              onClick={() => {
                setFontTab("All");
                setCategory("");
                setScript("");
                nav("fonts");
              }}
            >
              <span className="side-item-icon">
                <LayoutGrid size={16} />
              </span>
              All Fonts
            </div>
            <div
              className={`side-item${view === "fonts" && fontTab === "Popular" ? " active" : ""}`}
              onClick={() => {
                setFontTab("Popular");
                nav("fonts");
              }}
            >
              <span className="side-item-icon">
                <Star size={16} />
              </span>
              Popular
            </div>
            <div
              className={`side-item${view === "fonts" && fontTab === "New" ? " active" : ""}`}
              onClick={() => {
                setFontTab("New");
                nav("fonts");
              }}
            >
              <span className="side-item-icon">
                <Sparkles size={16} />
              </span>
              New Releases
            </div>
            <div
              className={`side-item${view === "fonts" && fontTab === "Variable" ? " active" : ""}`}
              onClick={() => {
                setFontTab("Variable");
                nav("fonts");
              }}
            >
              <span className="side-item-icon">
                <Variable size={16} />
              </span>
              Variable Fonts
            </div>
            <div
              className={`side-item${view === "pairings" ? " active" : ""}`}
              onClick={() => nav("pairings")}
            >
              <span className="side-item-icon">
                <Palette size={16} />
              </span>
              Font Pairings
            </div>
            <div
              className={`side-item${view === "favorites" ? " active" : ""}`}
              onClick={() => nav("favorites")}
            >
              <span className="side-item-icon">
                <Heart size={16} />
              </span>
              Collections ({favorites.length})
            </div>
            <div
              className={`side-item${view === "languages" ? " active" : ""}`}
              onClick={() => nav("languages")}
            >
              <span className="side-item-icon">
                <Globe2 size={16} />
              </span>
              Language Support
            </div>
            <div
              className={`side-item${view === "playground" ? " active" : ""}`}
              onClick={() => nav("playground")}
            >
              <span className="side-item-icon">
                <Eye size={16} />
              </span>
              Design Playground
            </div>
            <div
              className={`side-item${view === "tools" ? " active" : ""}`}
              onClick={() => nav("tools")}
            >
              <span className="side-item-icon">
                <SlidersHorizontal size={16} />
              </span>
              Font Tools
            </div>
            <div
              className={`side-item${view === "api" ? " active" : ""}`}
              onClick={() => nav("api")}
            >
              <span className="side-item-icon">
                <Code2 size={16} />
              </span>
              API & CDN
            </div>
          </div>

          <div className="side-group">
            <div className="side-group-title">LOCAL FIRST</div>
            <div className="side-item" onClick={() => setShowUpload(true)}>
              <span className="side-item-icon">
                <Upload size={16} />
              </span>
              Test Local Font
            </div>
            <div className="side-item" onClick={() => setShowAbout(true)}>
              <span className="side-item-icon">
                <Info size={16} />
              </span>
              About
            </div>
          </div>

          <div className="sidebar-promo">
            <strong>Beautiful fonts for a better web.</strong>
            Free to use.
          </div>
        </aside>

        {/* ── Main Content + Right Detail Panel ────────────────── */}
        <div className="layout-content">
          <main className="layout-main">
            {view === "home" && (
              <>
                {/* Hero Section matching design reference */}
                <section className="hero">
                  <div className="hero-left">
                    <div className="hero-eyebrow">OPEN · FREE · FOR EVERYONE</div>
                    <h1 className="hero-title">
                      Find the perfect font for your <span className="gradient-next">next</span>{" "}
                      <span className="gradient-project">project</span>
                    </h1>
                    <p className="hero-subtitle">
                      A modern font library with previews, language support, CDN links, and ready-to-use code. No sign
                      up. Just great typography.
                    </p>

                    <div className="hero-search-box">
                      <Search size={18} color="var(--text-muted)" style={{ marginRight: 10 }} />
                      <input
                        placeholder="Search fonts (e.g. Inter, Roboto, Malayalam, handwritten...)"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") nav("fonts");
                        }}
                      />
                      <button className="hero-search-btn" onClick={() => nav("fonts")}>
                        Search
                      </button>
                    </div>

                    <div className="hero-popular">
                      <span className="hero-popular-label">Popular:</span>
                      {popularFonts.map((name) => (
                        <button
                          key={name}
                          className="hero-popular-chip"
                          onClick={() => {
                            setQuery(name);
                            nav("fonts");
                          }}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="hero-card">
                    <div className="hero-card-content">
                      <div className="hero-card-title">Typography inspires better products.</div>
                      <div className="hero-card-sub">Use the right font. Make a stronger impression.</div>
                      <a
                        href="#"
                        className="hero-card-link"
                        onClick={(e) => {
                          e.preventDefault();
                          nav("fonts");
                        }}
                      >
                        Explore Fonts →
                      </a>
                    </div>
                    <div className="hero-card-art">
                      <div className="hero-card-aa-giant">Aa</div>
                      <div className="hero-card-badge-sketch">
                        Better
                        <br />
                        Type
                        <br />
                        Brighter
                        <br />
                        Ideas ↗
                      </div>
                    </div>
                  </div>
                </section>

                {/* Browse by Category (10-Box Showcase) */}
                <section className="category-section">
                  <div className="category-section-header">
                    <div className="category-section-title">Browse Fonts by Category</div>
                    <a
                      href="#"
                      className="category-view-all"
                      onClick={(e) => {
                        e.preventDefault();
                        setCategory("");
                        nav("fonts");
                      }}
                    >
                      View All →
                    </a>
                  </div>

                  <div className="category-grid-10">
                    {categoryShowcase.map((cat) => {
                      const isActive = category === cat.name;
                      return (
                        <div
                          key={cat.name}
                          className={`category-box${isActive ? " active" : ""}`}
                          onClick={() => {
                            setCategory(isActive ? "" : cat.name);
                            nav("fonts");
                          }}
                        >
                          <div className="category-box-specimen" style={{ fontFamily: cat.fontFam }}>
                            {cat.specimen}
                          </div>
                          <div className="category-box-name">{cat.name}</div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Featured Fonts Section */}
                <section style={{ marginBottom: 40 }}>
                  <div className="font-section-bar">
                    <div style={{ fontSize: "1.2rem", fontWeight: 800 }}>Featured Fonts</div>
                    <div className="pill-tabs">
                      {["All", "Popular", "New", "Variable"].map((t) => (
                        <button
                          key={t}
                          className={`pill-tab${fontTab === t ? " active" : ""}`}
                          onClick={() => setFontTab(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="font-grid">
                    {filteredFonts.slice(0, 9).map((font) => {
                      const isSelected = selectedFont.slug === font.slug;
                      const isFav = favorites.includes(font.slug);
                      const tagline =
                        fontTaglines[font.slug] || `${font.category} designed by ${font.designer}.`;
                      const fallback = getFontFallback(font.category);
                      const sampleChar = getFontSampleChar(font, script);

                      return (
                        <div
                          key={font.slug}
                          className={`font-card${isSelected ? " active" : ""}`}
                          onClick={() => selectFont(font)}
                        >
                          <div className="font-card-top">
                            <div className="font-card-title-group">
                              <span className="font-card-name">{font.family}</span>
                              {font.variable && <span className="badge-variable">Variable</span>}
                            </div>
                            <button
                              className={`font-card-fav-btn${isFav ? " active" : ""}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(font.slug);
                              }}
                              title={isFav ? "Remove favorite" : "Save font"}
                            >
                              <Heart
                                size={15}
                                fill={isFav ? "#ef4444" : "none"}
                                stroke={isFav ? "#ef4444" : "currentColor"}
                              />
                            </button>
                          </div>

                          <div className="font-card-designer">{font.designer}</div>

                          <div
                            className="font-card-center-aa"
                            style={{ fontFamily: `'${font.family}', ${fallback}` }}
                          >
                            {sampleChar}
                          </div>

                          <div className="font-card-tagline">{tagline}</div>

                          <div className="font-card-footer-meta">
                            {font.weights.length} weights · {font.category}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* More Than Just Fonts Feature Banner matching design reference */}
                <section className="features-banner-section">
                  <div className="features-banner-title">More Than Just Fonts</div>
                  <div className="features-banner-sub">
                    Everything you need to explore, use, and integrate fonts into modern applications.
                  </div>

                  <div className="features-banner-grid">
                    <div
                      className="feature-banner-card"
                      style={{ cursor: "pointer" }}
                      onClick={() => nav("playground")}
                    >
                      <div className="feature-banner-circle">
                        <Eye size={20} />
                      </div>
                      <div className="feature-banner-content">
                        <h4>Preview & Compare</h4>
                        <p>Test and compare fonts side by side with your own custom text.</p>
                      </div>
                    </div>

                    <div
                      className="feature-banner-card"
                      style={{ cursor: "pointer" }}
                      onClick={() => nav("languages")}
                    >
                      <div className="feature-banner-circle">
                        <Globe2 size={20} />
                      </div>
                      <div className="feature-banner-content">
                        <h4>Language Support</h4>
                        <p>See which fonts support your language across 17+ Unicode scripts.</p>
                      </div>
                    </div>

                    <div
                      className="feature-banner-card"
                      style={{ cursor: "pointer" }}
                      onClick={() => nav("api")}
                    >
                      <div className="feature-banner-circle">
                        <Code2 size={20} />
                      </div>
                      <div className="feature-banner-content">
                        <h4>Ready-to-Use Code</h4>
                        <p>Get CDN links, CSS, HTML, Tailwind, and Next.js snippets instantly.</p>
                      </div>
                    </div>

                    <div
                      className="feature-banner-card"
                      style={{ cursor: "pointer" }}
                      onClick={() => nav("fonts")}
                    >
                      <div className="feature-banner-circle">
                        <Zap size={20} />
                      </div>
                      <div className="feature-banner-content">
                        <h4>No Account Required</h4>
                        <p>Start using fonts immediately. Fast, completely free, and open.</p>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

            {view === "fonts" && (
              <div>
                <div className="font-section-bar">
                  <div>
                    <div style={{ fontSize: "1.3rem", fontWeight: 800 }}>
                      {script ? `${script} Fonts (${filteredFonts.length})` : category ? `${category} Fonts (${filteredFonts.length})` : `All Fonts (${fonts.length})`}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      Showing {filteredFonts.length} of {fonts.length} curated fonts
                    </div>
                  </div>

                  <div className="pill-tabs">
                    {["All", "Popular", "New", "Variable"].map((t) => (
                      <button
                        key={t}
                        className={`pill-tab${fontTab === t ? " active" : ""}`}
                        onClick={() => setFontTab(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {(category || script) && (
                  <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                    {category && (
                      <span className="hero-popular-chip" style={{ borderColor: "var(--accent)", color: "var(--accent)" }} onClick={() => setCategory("")}>
                        Category: {category} <X size={12} style={{ marginLeft: 4 }} />
                      </span>
                    )}
                    {script && (
                      <span className="hero-popular-chip" style={{ borderColor: "var(--accent)", color: "var(--accent)" }} onClick={() => setScript("")}>
                        Script: {script} ({scriptSpecimens[script]?.nativeName || script}) <X size={12} style={{ marginLeft: 4 }} />
                      </span>
                    )}
                  </div>
                )}

                <div className="font-grid">
                  {filteredFonts.map((font) => {
                    const isSelected = selectedFont.slug === font.slug;
                    const isFav = favorites.includes(font.slug);
                    const tagline = fontTaglines[font.slug] || `${font.category} designed by ${font.designer}.`;
                    const fallback = getFontFallback(font.category);
                    const sampleChar = getFontSampleChar(font, script);

                    return (
                      <div
                        key={font.slug}
                        className={`font-card${isSelected ? " active" : ""}`}
                        onClick={() => selectFont(font)}
                      >
                        <div className="font-card-top">
                          <div className="font-card-title-group">
                            <span className="font-card-name">{font.family}</span>
                            {font.variable && <span className="badge-variable">Variable</span>}
                          </div>
                          <button
                            className={`font-card-fav-btn${isFav ? " active" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(font.slug);
                            }}
                            title={isFav ? "Remove favorite" : "Save font"}
                          >
                            <Heart
                              size={15}
                              fill={isFav ? "#ef4444" : "none"}
                              stroke={isFav ? "#ef4444" : "currentColor"}
                            />
                          </button>
                        </div>

                        <div className="font-card-designer">{font.designer}</div>

                        <div
                          className="font-card-center-aa"
                          style={{ fontFamily: `'${font.family}', ${fallback}` }}
                        >
                          {sampleChar}
                        </div>

                        <div className="font-card-tagline">{tagline}</div>

                        <div className="font-card-footer-meta">
                          {font.weights.length} weights · {font.category}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredFonts.length === 0 && (
                  <div style={{ textAlign: "center", padding: 80, color: "var(--text-muted)" }}>
                    No fonts found matching your search. Try resetting filters.
                  </div>
                )}
              </div>
            )}

            {view === "favorites" && (
              <div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>Your Collections</h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>
                  {favorites.length} saved font{favorites.length !== 1 ? "s" : ""} in your collection
                </p>
                {favorites.length === 0 ? (
                  <div className="collection-empty-card">
                    <div className="collection-empty-icon">
                      <Heart size={30} fill="var(--accent)" stroke="var(--accent)" />
                    </div>
                    <h3 className="collection-empty-title">Your collection is empty</h3>
                    <p className="collection-empty-desc">
                      Save fonts by clicking the heart icon on any font card or in the font inspector. Keep your project favorites organized in one place.
                    </p>
                    <button
                      className="hero-search-btn"
                      onClick={() => nav("fonts")}
                      style={{ padding: "10px 24px", fontSize: "0.9rem" }}
                    >
                      Browse All Fonts →
                    </button>

                    <div className="collection-starter-wrap">
                      <div className="collection-starter-title">Popular fonts to get started:</div>
                      <div className="collection-starter-grid">
                        {fonts
                          .filter((f) => ["inter", "playfair-display", "noto-serif-malayalam", "jetbrains-mono"].includes(f.slug))
                          .map((f) => (
                            <div key={f.slug} className="collection-starter-card">
                              <div style={{ cursor: "pointer" }} onClick={() => selectFont(f)}>
                                <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--text-primary)" }}>{f.family}</div>
                                <div style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>{f.category}</div>
                              </div>
                              <button
                                className="collection-add-btn"
                                onClick={() => toggleFavorite(f.slug)}
                              >
                                + Add
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="font-grid">
                    {fonts
                      .filter((f) => favorites.includes(f.slug))
                      .map((font) => (
                        <div
                          key={font.slug}
                          className="font-card"
                          onClick={() => selectFont(font)}
                        >
                          <div className="font-card-top">
                            <span className="font-card-name">{font.family}</span>
                            <button
                              className="font-card-fav-btn active"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(font.slug);
                              }}
                              title="Remove from collection"
                            >
                              <Heart size={15} fill="#ef4444" stroke="#ef4444" />
                            </button>
                          </div>
                          <div className="font-card-designer">{font.designer}</div>
                          <div
                            className="font-card-center-aa"
                            style={{ fontFamily: `'${font.family}', ${getFontFallback(font.category)}` }}
                          >
                            {getFontSampleChar(font, script)}
                          </div>
                          <div className="font-card-tagline">{fontTaglines[font.slug] || font.description}</div>
                          <div className="font-card-footer-meta">
                            {font.weights.length} weights · {font.category}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {view === "pairings" && (
              <div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>Font Pairings Explorer</h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>
                  Harmonize heading and body fonts. Test readability, contrast, and visual rhythm.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                  <div className="control-group">
                    <label className="control-label">
                      <span>Heading Font</span>
                    </label>
                    <select
                      className="control-input"
                      value={pairingHeadingFont.slug}
                      onChange={(e) => {
                        const f = fonts.find((item) => item.slug === e.target.value);
                        if (f) {
                          setPairingHeadingFont(f);
                          ensureFontLoaded(f);
                        }
                      }}
                    >
                      {fonts.map((f) => (
                        <option key={f.slug} value={f.slug}>
                          {f.family} ({f.category})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="control-group">
                    <label className="control-label">
                      <span>Body Font</span>
                    </label>
                    <select
                      className="control-input"
                      value={pairingBodyFont.slug}
                      onChange={(e) => {
                        const f = fonts.find((item) => item.slug === e.target.value);
                        if (f) {
                          setPairingBodyFont(f);
                          ensureFontLoaded(f);
                        }
                      }}
                    >
                      {fonts.map((f) => (
                        <option key={f.slug} value={f.slug}>
                          {f.family} ({f.category})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--surface-border)",
                    borderRadius: "var(--radius-lg)",
                    padding: 40,
                  }}
                >
                  <div
                    style={{
                      fontFamily: `'${pairingHeadingFont.family}', ${getFontFallback(pairingHeadingFont.category)}`,
                      fontSize: "44px",
                      fontWeight: 700,
                      marginBottom: 16,
                      lineHeight: 1.18,
                    }}
                  >
                    Build something remarkable.
                  </div>
                  <p
                    style={{
                      fontFamily: `'${pairingBodyFont.family}', ${getFontFallback(pairingBodyFont.category)}`,
                      fontSize: "18px",
                      lineHeight: 1.7,
                      color: "var(--text-secondary)",
                      maxWidth: 640,
                      marginBottom: 24,
                    }}
                  >
                    Typography is part of the product. The harmony between your display headline and your long-form
                    body text sets the emotional tone of your entire application.
                  </p>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        const css = `/* Heading */\nh1, h2, h3 {\n  font-family: '${pairingHeadingFont.family}', ${getFontFallback(pairingHeadingFont.category)};\n}\n\n/* Body */\nbody, p {\n  font-family: '${pairingBodyFont.family}', ${getFontFallback(pairingBodyFont.category)};\n}`;
                        navigator.clipboard.writeText(css);
                        setDetailCopied(true);
                        setTimeout(() => setDetailCopied(false), 2000);
                      }}
                    >
                      {detailCopied ? "Copied CSS!" : "Copy Pairing CSS"}
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        const popularHeadings = fonts.filter((f) => ["playfair-display", "space-mono", "poppins", "montserrat", "bebas-neue", "cormorant-garamond"].includes(f.slug));
                        const popularBodies = fonts.filter((f) => ["inter", "lora", "source-sans-3", "roboto", "merriweather", "dm-sans"].includes(f.slug));
                        const randH = popularHeadings[Math.floor(Math.random() * popularHeadings.length)];
                        const randB = popularBodies[Math.floor(Math.random() * popularBodies.length)];
                        if (randH) { setPairingHeadingFont(randH); ensureFontLoaded(randH); }
                        if (randB) { setPairingBodyFont(randB); ensureFontLoaded(randB); }
                      }}
                    >
                      <RefreshCw size={14} style={{ marginRight: 6 }} /> Shuffle Pairing
                    </button>
                  </div>
                </div>
              </div>
            )}

            {view === "languages" && (
              <div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>Language & Script Coverage</h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>
                  Browse fonts supporting global writing systems and Unicode scripts with authentic native glyphs.
                </p>
                <div className="category-grid-10" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}>
                  {scripts.map((s) => {
                    const c = fonts.filter((f) => f.scripts.includes(s)).length;
                    const spec = scriptSpecimens[s];
                    return (
                      <div
                        key={s}
                        className="category-box"
                        style={{ padding: "20px 12px", cursor: "pointer" }}
                        onClick={() => applyScriptFilter(s)}
                      >
                        <div style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--accent)", marginBottom: 6, lineHeight: 1 }}>
                          {spec?.char || "Aa"}
                        </div>
                        <div style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: 2 }}>{s}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: 6 }}>
                          {spec?.nativeName || s}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{c} fonts</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {view === "playground" && (
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
                  <div>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 4 }}>Design Playground</h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                      Experiment with typography, font sizes, alignments, and custom text.
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <select
                      className="control-input"
                      value={selectedFont.slug}
                      onChange={(e) => {
                        const f = fonts.find((item) => item.slug === e.target.value);
                        if (f) selectFont(f);
                      }}
                      style={{ padding: "6px 12px", minWidth: 200 }}
                    >
                      {fonts.map((f) => (
                        <option key={f.slug} value={f.slug}>
                          {f.family} ({f.category})
                        </option>
                      ))}
                    </select>
                    <div style={{ display: "flex", border: "1px solid var(--surface-border)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                      <button
                        style={{ padding: "6px 10px", background: playgroundAlign === "left" ? "var(--accent)" : "var(--surface)", color: playgroundAlign === "left" ? "#fff" : "var(--text-secondary)", cursor: "pointer", border: "none" }}
                        onClick={() => setPlaygroundAlign("left")}
                        title="Align left"
                      >
                        <AlignLeft size={16} />
                      </button>
                      <button
                        style={{ padding: "6px 10px", background: playgroundAlign === "center" ? "var(--accent)" : "var(--surface)", color: playgroundAlign === "center" ? "#fff" : "var(--text-secondary)", cursor: "pointer", border: "none" }}
                        onClick={() => setPlaygroundAlign("center")}
                        title="Align center"
                      >
                        <AlignCenter size={16} />
                      </button>
                      <button
                        style={{ padding: "6px 10px", background: playgroundAlign === "right" ? "var(--accent)" : "var(--surface)", color: playgroundAlign === "right" ? "#fff" : "var(--text-secondary)", cursor: "pointer", border: "none" }}
                        onClick={() => setPlaygroundAlign("right")}
                        title="Align right"
                      >
                        <AlignRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--surface-border)",
                    borderRadius: "var(--radius-lg)",
                    padding: 32,
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <textarea
                    style={{
                      width: "100%",
                      fontFamily: `'${selectedFont.family}', ${selectedFallback}`,
                      fontSize: `${size}px`,
                      fontWeight: weight,
                      letterSpacing: `${spacing}px`,
                      textAlign: playgroundAlign,
                      color: "var(--text-primary)",
                      minHeight: 220,
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      resize: "vertical",
                      lineHeight: 1.3,
                    }}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type anything here..."
                  />
                </div>
              </div>
            )}

            {view === "tools" && (
              <div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>Developer Font Tools</h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>
                  Utilities for web developers, designers, and font engineers.
                </p>
                <div className="features-banner-grid">
                  <div className="feature-banner-card" style={{ cursor: "pointer" }} onClick={() => setShowUpload(true)}>
                    <div className="feature-banner-circle">
                      <Upload size={20} />
                    </div>
                    <div className="feature-banner-content">
                      <h4>OpenType Inspector</h4>
                      <p>Upload local .ttf or .otf files to inspect metrics and glyph tables.</p>
                    </div>
                  </div>
                  <div className="feature-banner-card" style={{ cursor: "pointer" }} onClick={() => nav("pairings")}>
                    <div className="feature-banner-circle">
                      <Palette size={20} />
                    </div>
                    <div className="feature-banner-content">
                      <h4>Pairings Studio</h4>
                      <p>Generate matching combinations for headings, buttons, and content.</p>
                    </div>
                  </div>
                  <div className="feature-banner-card" style={{ cursor: "pointer" }} onClick={() => nav("api")}>
                    <div className="feature-banner-circle">
                      <Code2 size={20} />
                    </div>
                    <div className="feature-banner-content">
                      <h4>CSS CDN Endpoint</h4>
                      <p>Production /api/css/[slug] endpoints ready for edge delivery.</p>
                    </div>
                  </div>
                  <div className="feature-banner-card" style={{ cursor: "pointer" }} onClick={() => nav("playground")}>
                    <div className="feature-banner-circle">
                      <Sliders size={20} />
                    </div>
                    <div className="feature-banner-content">
                      <h4>Variable Explorer</h4>
                      <p>Test optical weights and variable font axis interpolation.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {view === "api" && (
              <div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>Public API & Integration</h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>
                  Zero-configuration endpoints with CDN caching and automated fallback stylesheets.
                </p>
                <div className="dark-code-card" style={{ marginBottom: 24 }}>
                  <div className="dark-code-content">
                    <pre>{`GET /api/fonts          — Complete catalog metadata (70+ fonts)\nGET /api/fonts/:slug   — Single font details\nGET /api/css/:slug     — Production CSS @import endpoint\n\nExample:\ncurl https://fontatlas.vercel.app/api/fonts/noto-sans-malayalam\ncurl https://fontatlas.vercel.app/api/css/noto-sans-malayalam`}</pre>
                  </div>
                </div>
              </div>
            )}

            {/* Clean Footer matching design reference */}
            <footer className="footer-clean">
              <div className="footer-top-row">
                <div className="footer-left-info">
                  <span className="footer-logo">FontAtlas</span>
                  <span className="footer-tag">A free font library for a more beautiful web.</span>
                </div>
                <div className="footer-nav-links">
                  <a href="#" onClick={(e) => { e.preventDefault(); nav("fonts"); }}>Fonts</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); nav("api"); }}>API</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setShowLicense(true); }}>License</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setShowAbout(true); }}>About</a>
                  <a href="mailto:contact@fontatlas.dev">Contact</a>
                  <div className="footer-social-icons">
                    <a href="https://github.com/jojin1709/fontatlas" target="_blank" rel="noopener noreferrer" title="GitHub">
                      <Code2 size={16} />
                    </a>
                    <a href="https://twitter.com/jojin1709" target="_blank" rel="noopener noreferrer" title="Twitter">
                      <Activity size={16} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="footer-sub-row">
                <span>© 2026 FontAtlas. Open source MIT. Developed by JOJIN JOHN.</span>
                <span>Fonts delivered via upstream official CDN.</span>
              </div>
            </footer>
          </main>

          {/* ── Right Side Font Detail Panel ─────────────────── */}
          {isDetailOpen && (
            <aside className="font-detail-panel">
              <div className="font-detail-top">
                <div>
                  <div className="font-detail-family">
                    {selectedFont.family}
                    {selectedFont.variable && <span className="badge-variable">Variable</span>}
                  </div>
                  <div className="font-detail-author">Designed by {selectedFont.designer}</div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button
                    className={`font-card-fav-btn${favorites.includes(selectedFont.slug) ? " active" : ""}`}
                    style={{ width: 34, height: 34, border: "1px solid var(--surface-border)" }}
                    onClick={() => toggleFavorite(selectedFont.slug)}
                    title={favorites.includes(selectedFont.slug) ? "Remove favorite" : "Add to favorites"}
                  >
                    <Heart
                      size={16}
                      fill={favorites.includes(selectedFont.slug) ? "#ef4444" : "none"}
                      stroke={favorites.includes(selectedFont.slug) ? "#ef4444" : "currentColor"}
                    />
                  </button>

                  {selectedFont.sourceUrl ? (
                    <button
                      className="btn-download-dark"
                      onClick={() => window.open(selectedFont.sourceUrl, "_blank", "noopener,noreferrer")}
                    >
                      <Download size={15} /> Download
                    </button>
                  ) : null}

                  <button
                    className="font-detail-close-btn"
                    onClick={() => setIsDetailOpen(false)}
                    title="Close inspector"
                    aria-label="Close inspector"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Underline Tabs matching design reference */}
              <div className="detail-nav-tabs">
                {["Preview", "Glyphs", "Languages", "Weights", "Metadata", "License"].map((t) => (
                  <div
                    key={t}
                    className={`detail-nav-tab${detailTab === t ? " active" : ""}`}
                    onClick={() => setDetailTab(t)}
                  >
                    {t}
                  </div>
                ))}
              </div>

              {/* Structured Specimen Toolbar with Script Badge and Full-width Input */}
              <div className="specimen-toolbar-wrap">
                <div className="specimen-toolbar-header">
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <span className="specimen-badge">
                      {getFontPrimaryScript(selectedFont, script)} ({scriptSpecimens[getFontPrimaryScript(selectedFont, script)]?.nativeName || "Native"})
                    </span>
                    {getFontPrimaryScript(selectedFont, script) !== "Latin" && (
                      <button
                        className={`phonetic-toggle-btn${phoneticMode ? " active" : ""}`}
                        onClick={() => setPhoneticMode(!phoneticMode)}
                        title={phoneticMode ? "Phonetic input is ON: typing in English automatically converts to native script" : "Click to turn ON English-to-native phonetic typing"}
                      >
                        <Sparkles size={11} />
                        <span>Aa ➔ {scriptSpecimens[getFontPrimaryScript(selectedFont, script)]?.char || "അ"} Phonetic: {phoneticMode ? "ON" : "OFF"}</span>
                      </button>
                    )}
                  </div>
                  <select
                    className="specimen-preset-select"
                    onChange={(e) => {
                      const val = e.target.value;
                      const primScript = getFontPrimaryScript(selectedFont, script);
                      const spec = scriptSpecimens[primScript] || scriptSpecimens.Latin;
                      if (val === "default") setText(spec.text);
                      else if (val === "phrase") setText(spec.phrase);
                      else if (val === "alphabet") setText(spec.alphabet);
                      else if (val === "numerals") setText(spec.numerals);
                      else if (val === "english") setText("The quick brown fox jumps over the lazy dog.");
                    }}
                  >
                    <option value="default">Preset: Native Specimen</option>
                    <option value="phrase">Universal Declaration</option>
                    <option value="alphabet">Full Alphabet</option>
                    <option value="numerals">Numerals & Symbols</option>
                    <option value="english">English Pangram</option>
                  </select>
                </div>
                <div className="specimen-input-row">
                  <input
                    className="specimen-text-input-field"
                    value={text}
                    onChange={(e) => {
                      const val = e.target.value;
                      const primScript = getFontPrimaryScript(selectedFont, script);
                      if (phoneticMode && primScript !== "Latin") {
                        setText(transliterateToScript(val, primScript));
                      } else {
                        setText(val);
                      }
                    }}
                    placeholder={
                      getFontPrimaryScript(selectedFont, script) !== "Latin" && phoneticMode
                        ? `Type English (e.g. ambud, namaskaram) to auto-convert to ${getFontPrimaryScript(selectedFont, script)}...`
                        : "Type anything to preview..."
                    }
                  />
                  {text && (
                    <button
                      className="specimen-input-clear"
                      onClick={() => setText("")}
                      title="Clear text"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Quick Native Words Chips */}
                {scriptQuickWords[getFontPrimaryScript(selectedFont, script)] && (
                  <div className="quick-words-bar">
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>Quick words:</span>
                    {scriptQuickWords[getFontPrimaryScript(selectedFont, script)].map((qw) => (
                      <button
                        key={qw.label}
                        className="quick-word-chip"
                        onClick={() => setText(qw.native)}
                        title={`Click to preview "${qw.native}" (${qw.label})`}
                      >
                        {qw.native} <span style={{ opacity: 0.6, fontSize: "0.68rem" }}>({qw.label})</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Live Specimen Preview */}
              <div className="specimen-live-display">
                <div
                  style={{
                    fontFamily: `'${selectedFont.family}', ${selectedFallback}`,
                    fontSize: `${size}px`,
                    fontWeight: weight,
                    letterSpacing: `${spacing}px`,
                    lineHeight: 1.25,
                    color: "var(--text-primary)",
                  }}
                >
                  {text}
                </div>
              </div>

              {/* 3 Slider Columns */}
              <div className="slider-three-col">
                <div>
                  <div className="slider-col-header">
                    <span>Size</span>
                    <span className="slider-pill-val">{size}px</span>
                  </div>
                  <input
                    className="control-slider"
                    type="range"
                    min={16}
                    max={96}
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                  />
                </div>

                <div>
                  <div className="slider-col-header">
                    <span>Weight</span>
                    <span className="slider-pill-val">{weight}</span>
                  </div>
                  <input
                    className="control-slider"
                    type="range"
                    min={100}
                    max={900}
                    step={100}
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                  />
                </div>

                <div>
                  <div className="slider-col-header">
                    <span>Spacing</span>
                    <span className="slider-pill-val">{spacing}px</span>
                  </div>
                  <input
                    className="control-slider"
                    type="range"
                    min={-4}
                    max={16}
                    value={spacing}
                    onChange={(e) => setSpacing(Number(e.target.value))}
                  />
                </div>
              </div>

            {/* Quick Use Code Box matching design reference */}
            <div className="quick-use-section">
              <div className="quick-use-title">Quick Use</div>
              <div className="quick-use-sub">Use this CDN link to add {selectedFont.family} to your website.</div>

              <div className="dark-code-card">
                <div className="dark-code-tabs">
                  {(["CDN", "CSS", "HTML", "Tailwind", "Next.js", "React"] as CodeTab[]).map((tab) => (
                    <div
                      key={tab}
                      className={`dark-code-tab${codeTab === tab ? " active" : ""}`}
                      onClick={() => setCodeTab(tab)}
                    >
                      {tab}
                    </div>
                  ))}
                </div>
                <div className="dark-code-content">
                  <pre>{codeSnippets[codeTab]}</pre>
                  <button className="dark-copy-btn" onClick={handleCopyCode} title="Copy code">
                    {detailCopied ? <Check size={14} color="#38bdf8" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Detail Tabs Content: Glyphs, Languages, Weights, Metadata, License */}
            {detailTab === "Glyphs" && (
              <div style={{ padding: "0 28px 24px" }}>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 10 }}>
                  {copiedGlyph ? (
                    <span style={{ color: "var(--accent)", fontWeight: 700 }}>Copied "{copiedGlyph}"!</span>
                  ) : (
                    "Click character to copy:"
                  )}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, maxHeight: 180, overflowY: "auto" }}>
                  {activeGlyphsList.map((ch, i) => (
                    <button
                      key={`${ch}-${i}`}
                      onClick={() => {
                        navigator.clipboard.writeText(ch);
                        setCopiedGlyph(ch);
                        setTimeout(() => setCopiedGlyph(null), 1500);
                      }}
                      style={{
                        width: 36,
                        height: 36,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "var(--bg)",
                        border: "1px solid var(--surface-border)",
                        borderRadius: 6,
                        fontFamily: `'${selectedFont.family}', ${selectedFallback}`,
                        fontSize: "1.1rem",
                      }}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {detailTab === "Languages" && (
              <div style={{ padding: "0 28px 24px" }}>
                <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: 10 }}>
                  Supported Writing Systems:
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {selectedFont.scripts.map((s) => (
                    <span key={s} className="hero-popular-chip" style={{ cursor: "default" }}>
                      {s} ({scriptSpecimens[s]?.nativeName || s})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {detailTab === "Weights" && (
              <div style={{ padding: "0 28px 24px" }}>
                <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: 10 }}>
                  Available Optical Weights:
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {selectedFont.weights.map((w) => (
                    <span
                      key={w}
                      className="hero-popular-chip"
                      style={{
                        cursor: "pointer",
                        background: w === weight ? "var(--accent)" : undefined,
                        color: w === weight ? "#fff" : undefined,
                        borderColor: w === weight ? "var(--accent)" : undefined,
                      }}
                      onClick={() => setWeight(w)}
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {detailTab === "Metadata" && (
              <div style={{ padding: "0 28px 24px", fontSize: "0.82rem", lineHeight: 2, color: "var(--text-secondary)" }}>
                <div><strong>Designer:</strong> {selectedFont.designer}</div>
                <div><strong>Category:</strong> {selectedFont.category}</div>
                <div><strong>Primary Script:</strong> {getFontPrimaryScript(selectedFont, script)}</div>
                <div><strong>Weights:</strong> {selectedFont.weights.join(", ")}</div>
                <div><strong>Variable Font:</strong> {selectedFont.variable ? "Yes" : "No"}</div>
              </div>
            )}

            {detailTab === "License" && (
              <div style={{ padding: "0 28px 24px", fontSize: "0.82rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
                <div><strong>License:</strong> {selectedFont.license}</div>
                {selectedFont.licenseUrl && (
                  <a
                    href={selectedFont.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--accent)", textDecoration: "underline", display: "inline-block", marginTop: 6 }}
                  >
                    View License Terms →
                  </a>
                )}
              </div>
            )}
            </aside>
          )}
        </div>

        {/* Floating Re-Open Button when detail drawer is closed */}
        {!isDetailOpen && (
          <button
            className="floating-inspect-btn"
            onClick={() => setIsDetailOpen(true)}
            title={`Inspect ${selectedFont.family}`}
          >
            <SlidersHorizontal size={15} />
            <span>Inspect <strong>{selectedFont.family}</strong></span>
          </button>
        )}
      </div>

      {/* ── Modals ─────────────────────────────────────────── */}
      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="modal-overlay open" onClick={() => setMobileOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">FontAtlas Menu</div>
              <button className="modal-close" onClick={() => setMobileOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              {[
                ["Home", "home"],
                ["All Fonts", "fonts"],
                ["Languages", "languages"],
                ["Design Playground", "playground"],
                ["Font Pairings", "pairings"],
                ["Font Tools", "tools"],
                ["Collections", "favorites"],
                ["API & CDN", "api"],
              ].map(([label, v]) => (
                <div
                  key={label}
                  className={`side-item${view === v ? " active" : ""}`}
                  onClick={() => nav(v as View)}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Local Font Upload Modal */}
      {showUpload && (
        <div className="modal-overlay open" onClick={() => setShowUpload(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Inspect Local Font (OpenType.js)</div>
              <button className="modal-close" onClick={() => setShowUpload(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: 20 }}>
                Upload any <code>.ttf</code>, <code>.otf</code>, or <code>.woff</code> file. Fonts are parsed locally
                with OpenType.js and rendered directly in your browser.
              </p>
              <label
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "40px 20px",
                  border: "2px dashed var(--accent)",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--accent-light)",
                  cursor: "pointer",
                }}
              >
                <Upload size={36} color="var(--accent)" style={{ marginBottom: 12 }} />
                <div style={{ fontWeight: 700, marginBottom: 4 }}>Select font file to inspect</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>TTF, OTF, WOFF, WOFF2</div>
                <input
                  type="file"
                  accept=".ttf,.otf,.woff2,.woff"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
              </label>

              {uploadedData && (
                <div style={{ marginTop: 20, padding: 14, background: "var(--bg)", borderRadius: 8, fontSize: "0.82rem", lineHeight: 1.8 }}>
                  <div><strong>Font:</strong> {uploadedData.fontObj.family}</div>
                  <div><strong>Glyphs:</strong> {uploadedData.numGlyphs ?? "N/A"}</div>
                  <div><strong>Units Per EM:</strong> {uploadedData.unitsPerEm ?? "N/A"}</div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowUpload(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About Modal */}
      {showAbout && (
        <div className="modal-overlay open" onClick={() => setShowAbout(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">About FontAtlas</div>
              <button className="modal-close" onClick={() => setShowAbout(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
              <p style={{ marginBottom: 12 }}>
                <strong>FontAtlas</strong> is an open-source, no-login font discovery and developer integration
                platform designed and built by <strong>JOJIN JOHN</strong>.
              </p>
              <p style={{ marginBottom: 14 }}>
                It gives designers and developers instant access to over 70+ curated typefaces with live specimens,
                multilingual script support, pair testing, and copy-paste code snippets for React, Next.js, and Tailwind CSS.
              </p>
              <div style={{ padding: 14, background: "var(--bg)", borderRadius: 8, fontSize: "0.85rem" }}>
                <div><strong>Stack:</strong> Next.js 15, React 19, OpenType.js, TypeScript</div>
                <div><strong>Delivery:</strong> Official Google Fonts CDN</div>
                <div><strong>License:</strong> MIT License</div>
                <div><strong>Author:</strong> JOJIN JOHN (<a href="https://github.com/jojin1709" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>@jojin1709</a>)</div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setShowAbout(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* License Modal */}
      {showLicense && (
        <div className="modal-overlay open" onClick={() => setShowLicense(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">License & Attribution</div>
              <button className="modal-close" onClick={() => setShowLicense(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ fontSize: "0.88rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
              <p style={{ marginBottom: 12 }}>
                The FontAtlas web application and APIs are licensed under the <strong>MIT License</strong>.
              </p>
              <p>
                All fonts showcased are open-source and subject to their upstream author licenses (SIL Open Font
                License 1.1 or Apache License 2.0). Fonts are loaded directly from official CDNs.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setShowLicense(false)}>
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
