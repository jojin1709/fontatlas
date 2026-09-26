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
  getFontFallback,
  googleCssUrl,
  scripts,
} from "../lib/fonts";

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
  "noto-sans-devanagari": "Complete Devanagari Unicode.",
  "noto-sans-tamil": "Extensive Tamil script coverage.",
  "noto-sans-kannada": "Harmonious Kannada typeface.",
  "noto-sans-telugu": "Clear Telugu digital reading.",
  "ibm-plex-sans": "Engineered technical brand clarity.",
  "source-code-pro": "Open-source developer staple.",
  quicksand: "Light, friendly geometric rhythm.",
};

const scriptGlyphs: Record<string, string> = {
  Malayalam: "അ ആ ഇ ഈ ഉ ഊ ഋ എ ഏ ഐ ഒ ഓ ഔ ക ഖ ഗ ഘ ങ ച ഛ ജ ഝ ഞ ട ഠ ഡ ഢ ണ ത ഥ ദ ധ ന പ ഫ ബ ഭ മ യ ര ല വ ശ ഷ സ ഹ ള ഴ റ 0 1 2 3 4 5 6 7 8 9",
  Devanagari: "अ आ इ ई उ ऊ ऋ ए ऐ ओ औ क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह ० १ २ ३ ४ ५ ६ ७ ८ ९",
  Tamil: "அ ஆ இ ஈ உ ஊ எ ஏ ஐ ஒ ஓ ஔ க ங ச ஞ ட ண த ந ப ம ய ர ல வ ழ ள ற ன ௦ ௧ ௨ ௩ ௪ ௫ ௬ ௭ ௮ ௯",
  Kannada: "ಅ ಆ ಇ ಈ ಉ ಊ ಋ ಎ ಏ ಐ ಒ ಓ ಔ ಕ ಖ ಗ ಘ ಙ ಚ ಛ ಜ ಝ ಞ ಟ ಠ ಡ ಢ ಣ ತ ಥ ದ ಧ ನ ಪ ಫ ಬ ಭ ಮ ಯ ರ ಲ ವ ಶ ಷ ಸ ಹ ಳ ೦ ೧ ೨ ೩ ೪ ೫ ೬ ೭ ೮ ೯",
  Telugu: "అ ఆ ఇ ఈ ఉ ఊ ఋ ఎ ఏ ఐ ఒ ఓ ఔ క ఖ గ ఘ ఙ చ ఛ జ ఝ ఞ ట ఠ డ ఢ ణ త థ ద ధ న ప ఫ బ ഭ మ య ర ల వ శ ష స హ ళ ౦ ౧ ౨ ౩ ౪ ౫ ౬ ౭ ౮ ౯",
  Bengali: "অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ ক খ গ ঘ ঙ চ ছ জ ঝ ঞ ট ঠ ড ঢ ণ ত থ দ ধ ন প ফ ব ভ ম য র ল শ ষ স হ ০ ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯",
  Gujarati: "અ આ ઇ ઈ ઉ ઊ ઋ એ ઐ ઓ ઔ ક ખ ગ ઘ ઙ ચ છ જ ઝ ઞ ટ ઠ ડ ઢ ણ ત થ દ ધ ન પ ફ બ ભ મ ય ર લ વ શ ષ સ હ ૦ ૧ ૨ ૩ ૪ ૫ ૬ ૭ ૮ ૯",
  Gurmukhi: "ਅ ਆ ਇ ਈ ਉ ਊ ਏ ਐ ਓ ਔ ਕ ਖ ਗ ਘ ਙ ਚ ਛ ਜ ਝ ਞ ਟ ਠ ਡ ਢ ਣ ਤ ਥ ਦ ਧ ਨ ਪ ਫ ਬ ਭ ਮ ਯ ਰ ਲ ਵ ੜ ੦ ੧ ੨ ੩ ੪ ੫ ੬ ੭ ੮ ੯",
  Thai: "ก ข ฃ ค ฅ ฆ ง จ ฉ ช ซ ฌ ญ ฎ ฏ ฐ ฑ ฒ ณ ด ต ถ ท ธ น บ ป ผ ฝ พ ฟ ภ ม ย ร ล ว ศ ษ ส ห ฬ อ ฮ ๐ ๑ ๒ ๓ ๔ ๕ ๖ ๗ ๘ ๙",
  Georgian: "ა ბ გ დ ე ვ ზ თ ი კ ლ მ ნ ო პ ჟ რ ს ტ უ ფ ქ ღ ყ შ ჩ ც ძ წ ჭ ხ ჯ ჰ",
  Armenian: "Ա Բ Գ Դ Ե Զ Է Ը Թ Ժ Ի Լ Խ Ծ Կ Հ Ձ Ղ Ճ Մ Յ Ն Շ Ո Չ Պ Ջ Ռ Ս Վ Տ Ր Ց Ւ Փ Ք Օ Ֆ",
  Arabic: "أ ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن هـ و ي ٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩",
  Hebrew: "א ב ג ד ה ו ז ח ט י כ ל מ נ ס ע פ צ ק ר ש ת",
  Greek: "Α Β Γ Δ Ε Ζ Η Θ Ι Κ Λ Μ Ν Ξ Ο Π Ρ Σ Τ Υ Φ Χ Ψ Ω α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ σ τ υ φ χ ψ ω 0 1 2 3 4 5 6 7 8 9",
  Cyrillic: "А Б В Г Д Е Ж З И Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ъ Ы Ь Э Ю Я а б в г д е ж з и й к л м н о п р с т у ф х ц ч ш щ ъ ы ь э ю я 0 1 2 3 4 5 6 7 8 9",
  Vietnamese: "A Ă Â B C D Đ E Ê G H I K L M N O Ô Ơ P Q R S T U Ư V X Y a ă â b c d đ e ê g h i k l m n o ô ơ p q r s t u ư v x y",
  Latin: "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9 ! @ # $ % & * ? /",
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
    fonts.slice(0, 20).forEach((f) => ensureFontLoaded(f));
  }, [selectedFont]);

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
    filteredFonts.slice(0, 24).forEach((f) => ensureFontLoaded(f));
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
      setShowUpload(false);
      setView("fonts");
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const selectFont = (font: Font) => {
    ensureFontLoaded(font);
    setSelectedFont(font);
    setWeight(font.weights.includes(400) ? 400 : font.weights[0]);
    setText(sampleText);
    setSize(48);
    setSpacing(0);
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
    for (const sc of selectedFont.scripts) {
      if (scriptGlyphs[sc]) {
        return scriptGlyphs[sc].split(" ");
      }
    }
    return scriptGlyphs.Latin.split(" ");
  }, [selectedFont, uploadedData]);

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
              className={`side-item${view === "fonts" && fontTab === "All" ? " active" : ""}`}
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

                {/* Browse by Category (10-Column Box Showcase) */}
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
                            Aa
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
                      {category || script ? `Filtered Fonts` : `All Fonts`}
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
                        Script: {script} <X size={12} style={{ marginLeft: 4 }} />
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
                          Aa
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
                <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>
                  {favorites.length} saved font{favorites.length !== 1 ? "s" : ""} in your collection
                </p>
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
                          >
                            <Heart size={15} fill="#ef4444" stroke="#ef4444" />
                          </button>
                        </div>
                        <div className="font-card-designer">{font.designer}</div>
                        <div
                          className="font-card-center-aa"
                          style={{ fontFamily: `'${font.family}', ${getFontFallback(font.category)}` }}
                        >
                          Aa
                        </div>
                        <div className="font-card-tagline">{fontTaglines[font.slug] || font.description}</div>
                        <div className="font-card-footer-meta">
                          {font.weights.length} weights · {font.category}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {view === "pairings" && (
              <div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>Font Pairings Explorer</h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>
                  Harmonize heading and body fonts. Test readability, contrast, and visual rhythm.
                </p>
                {/* Interactive pairing builder */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                  <div className="control-group">
                    <label className="control-label">
                      <span>Heading Font</span>
                    </label>
                    <select
                      className="control-input"
                      value={selectedFont.slug}
                      onChange={(e) => {
                        const f = fonts.find((item) => item.slug === e.target.value);
                        if (f) selectFont(f);
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
                      defaultValue="lora"
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
                      fontFamily: `'${selectedFont.family}', ${selectedFallback}`,
                      fontSize: "48px",
                      fontWeight: 700,
                      marginBottom: 16,
                      lineHeight: 1.15,
                    }}
                  >
                    Build something remarkable.
                  </div>
                  <p
                    style={{
                      fontFamily: `'Lora', serif`,
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
                  <button className="btn btn-primary" onClick={handleCopyCode}>
                    Copy Pairing Styles
                  </button>
                </div>
              </div>
            )}

            {view === "languages" && (
              <div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>Language & Script Coverage</h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>
                  Browse fonts supporting global writing systems and Unicode scripts.
                </p>
                <div className="category-grid-10" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}>
                  {scripts.map((s) => {
                    const c = fonts.filter((f) => f.scripts.includes(s)).length;
                    return (
                      <div
                        key={s}
                        className="category-box"
                        style={{ padding: "24px 16px" }}
                        onClick={() => {
                          setScript(s);
                          setCategory("");
                          nav("fonts");
                        }}
                      >
                        <Globe2 size={24} color="var(--accent)" style={{ marginBottom: 10 }} />
                        <div style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: 4 }}>{s}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{c} fonts</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {view === "playground" && (
              <div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>Design Playground</h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>
                  Experiment with {selectedFont.family} across sizes, weights, and letter-spacings.
                </p>
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--surface-border)",
                    borderRadius: "var(--radius-lg)",
                    padding: 40,
                  }}
                >
                  <textarea
                    style={{
                      width: "100%",
                      fontFamily: `'${selectedFont.family}', ${selectedFallback}`,
                      fontSize: `${size}px`,
                      fontWeight: weight,
                      letterSpacing: `${spacing}px`,
                      color: "var(--text-primary)",
                      minHeight: 180,
                    }}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
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
                    <pre>{`GET /api/fonts          — Complete catalog metadata (58+ fonts)\nGET /api/fonts/:slug   — Single font details\nGET /api/css/:slug     — Production CSS @import endpoint\n\nExample:\ncurl https://fontatlas.vercel.app/api/fonts/inter\ncurl https://fontatlas.vercel.app/api/css/inter`}</pre>
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

          {/* ── Right Side Font Detail Panel matching design reference ─ */}
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

            {/* Dropdown + Custom text input bar */}
            <div className="specimen-text-bar">
              <select
                className="specimen-text-dropdown"
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "default") setText(sampleText);
                  else if (val === "alphabet") setText("ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz");
                  else if (val === "numerals") setText("0123456789 $ € £ ¥ % & @ # ! ?");
                  else if (val === "paragraph")
                    setText("Almost before we knew it, we had left the ground. Typography inspires better interfaces.");
                }}
              >
                <option value="default">Custom text ⌄</option>
                <option value="alphabet">Alphabet</option>
                <option value="numerals">Numerals & Punctuation</option>
                <option value="paragraph">Paragraph Specimen</option>
              </select>
              <input
                className="specimen-text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type custom text..."
              />
            </div>

            {/* Live Specimen Preview */}
            <div className="specimen-live-display">
              <div
                style={{
                  fontFamily: `'${selectedFont.family}', ${selectedFallback}`,
                  fontSize: `${size}px`,
                  fontWeight: weight,
                  letterSpacing: `${spacing}px`,
                  lineHeight: 1.15,
                  color: "var(--text-primary)",
                }}
              >
                {text || sampleText}
              </div>
            </div>

            {/* 3 Slider Columns matching design reference */}
            <div className="slider-three-col">
              <div>
                <div className="slider-col-header">
                  <span>Size</span>
                  <span className="slider-pill-val">{size}px ⌄</span>
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
                  <span className="slider-pill-val">{weight} ⌄</span>
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
                  <span>Letter spacing</span>
                  <span className="slider-pill-val">{spacing}px ⌄</span>
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
                        fontSize: "1rem",
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
                      {s}
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
        </div>
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
                It gives designers and developers instant access to over 58 curated typefaces with live specimens,
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
