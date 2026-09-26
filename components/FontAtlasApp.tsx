"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  AlignLeft,
  AlignCenter,
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

const categoryIcons: Record<string, string> = {
  "Sans Serif": "Aa",
  Serif: "Tt",
  Monospace: "</>",
  Display: "Ab",
  Handwriting: "✍",
  Script: "Ss",
  "Slab Serif": "Tt",
  Blackletter: "¶",
  Pixel: "▪",
};

const popularFonts = ["Inter", "Poppins", "Roboto", "Montserrat", "Lato", "Open Sans"];
const sampleText = "The quick brown fox jumps over the lazy dog.";

// Script-specific sample glyph sets for rich inspection
const scriptGlyphs: Record<string, string> = {
  Malayalam: "അ ആ ഇ ഈ ഉ ഊ ഋ എ ഏ ഐ ഒ ഓ ഔ ക ഖ ഗ ഘ ങ ച ഛ ജ ഝ ഞ ട ഠ ഡ ഢ ണ ത ഥ ദ ധ ന പ ഫ ബ ഭ മ യ ര ല വ ശ ഷ സ ഹ ള ഴ റ 0 1 2 3 4 5 6 7 8 9",
  Devanagari: "अ आ इ ई उ ऊ ऋ ए ऐ ओ औ क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह ० १ २ ३ ४ ५ ६ ७ ८ ९",
  Tamil: "அ ஆ இ ஈ உ ஊ எ ஏ ஐ ஒ ஓ ஔ க ங ச ஞ ட ண த ந ப ம ய ர ல வ ழ ள ற ன ௦ ௧ ௨ ௩ ௪ ௫ ௬ ௭ ௮ ௯",
  Kannada: "ಅ ಆ ಇ ಈ ಉ ಊ ಋ ಎ ಏ ಐ ಒ ಓ ಔ ಕ ಖ ಗ ಘ ಙ ಚ ಛ ಜ ಝ ಞ ಟ ಠ ಡ ಢ ಣ ತ ಥ ದ ಧ ನ ಪ ಫ ಬ ಭ ಮ ಯ ರ ಲ ವ ಶ ಷ ಸ ಹ ಳ ೦ ೧ ೨ ೩ ೪ ೫ ೬ ೭ ೮ ೯",
  Telugu: "అ ఆ ఇ ఈ ఉ ఊ ఋ ఎ ఏ ఐ ఒ ఓ ఔ క ఖ గ ఘ ఙ చ ఛ జ ఝ ఞ ట ఠ డ ఢ ణ త థ ద ధ న ప ఫ బ భ మ య ర ల వ శ ష స హ ళ ౦ ౧ ౨ ౩ ౪ ౫ ౬ ౭ ౮ ౯",
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

// Font loader tracking
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

interface UploadedFontData {
  fontObj: Font;
  opentypeFont?: opentype.Font;
  numGlyphs?: number;
  unitsPerEm?: number;
  ascender?: number;
  descender?: number;
  extractedGlyphs?: string[];
}

function FontCard({
  font,
  selected,
  onSelect,
  isFavorite,
  onToggleFavorite,
  isCompared,
  onToggleCompare,
}: {
  font: Font;
  selected: boolean;
  onSelect: (f: Font) => void;
  isFavorite: boolean;
  onToggleFavorite: (s: string) => void;
  isCompared: boolean;
  onToggleCompare: (f: Font) => void;
}) {
  const fallback = getFontFallback(font.category);

  return (
    <div className={`font-card${selected ? " active" : ""}`} onClick={() => onSelect(font)}>
      <div className="font-card-header">
        <div>
          <div className="font-card-name">{font.family}</div>
          <div className="font-card-designer">{font.designer}</div>
        </div>
        <button
          className={`font-card-fav${isFavorite ? " active" : ""}`}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(font.slug);
          }}
        >
          <Heart size={14} fill={isFavorite ? "#ef4444" : "none"} stroke={isFavorite ? "#ef4444" : "currentColor"} />
        </button>
      </div>
      <div
        className="font-card-specimen"
        style={{ fontFamily: `'${font.family}', ${fallback}` }}
      >
        Aa
      </div>
      <div className="font-card-meta">
        <span className="font-card-badge">{font.weights.length} weights</span>
        <span className="font-card-badge category">{font.category}</span>
        {font.variable && <span className="font-card-badge variable">Variable</span>}
      </div>
      <button
        className={`compare-btn${isCompared ? " active" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleCompare(font);
        }}
      >
        {isCompared ? "Remove from Compare" : "Compare"}
      </button>
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
  isFavorite,
  onToggleFavorite,
  uploadedData,
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
  isFavorite: boolean;
  onToggleFavorite: (s: string) => void;
  uploadedData?: UploadedFontData | null;
}) {
  const [copied, setCopied] = useState(false);
  const [copiedGlyph, setCopiedGlyph] = useState<string | null>(null);
  const [detailTab, setDetailTab] = useState("Preview");
  const detailTabs = ["Preview", "Glyphs", "Languages", "Weights", "Metadata", "License"];

  const fallback = getFontFallback(font.category);
  const cssUrl = useMemo(() => googleCssUrl(font, [weight]), [font, weight]);

  const codeSnippets: Record<CodeTab, string> = {
    CDN: font.googleFamily ? `<link href="${cssUrl}" rel="stylesheet">` : `/* Local font: ${font.family} */`,
    CSS: font.googleFamily
      ? `@import url('${cssUrl}');\n\nbody {\n  font-family: '${font.family}', ${fallback};\n  font-weight: ${weight};\n}`
      : `body {\n  font-family: '${font.family}', ${fallback};\n  font-weight: ${weight};\n}`,
    HTML: font.googleFamily
      ? `<link href="${cssUrl}" rel="stylesheet">\n\n<h1 style="font-family: '${font.family}', ${fallback}">${font.family}</h1>`
      : `<h1 style="font-family: '${font.family}', ${fallback}">${font.family}</h1>`,
    Tailwind: `// tailwind.config.js\nfontFamily: {\n  '${font.family.toLowerCase().replace(/\s+/g, "-")}': ['"${font.family}"', '${fallback}'],\n}`,
    "Next.js": font.googleFamily
      ? `import { ${font.family.replace(/[\s-]+/g, "")} } from 'next/font/google'\n\nconst font = ${font.family.replace(/[\s-]+/g, "")}({ weight: ['${weight}'], subsets: ['latin'] })`
      : `// Use localFont from 'next/font/local'`,
    React: `import '@fontsource/${font.family.toLowerCase().replace(/\s+/g, "-")}'`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[codeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGlyphClick = (ch: string) => {
    navigator.clipboard.writeText(ch);
    setCopiedGlyph(ch);
    setTimeout(() => setCopiedGlyph(null), 1500);
  };

  // Determine glyph list
  const glyphsList = useMemo(() => {
    if (uploadedData?.extractedGlyphs && uploadedData.extractedGlyphs.length > 0) {
      return uploadedData.extractedGlyphs;
    }
    for (const sc of font.scripts) {
      if (scriptGlyphs[sc]) {
        return scriptGlyphs[sc].split(" ");
      }
    }
    return scriptGlyphs.Latin.split(" ");
  }, [font, uploadedData]);

  return (
    <div className="font-detail open">
      <div className="font-detail-header">
        <div>
          <div className="font-detail-name">{font.family}</div>
          <div className="font-detail-designer">by {font.designer}</div>
          <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
            {font.variable && <span className="font-card-badge variable">Variable</span>}
            <span className="font-card-badge category">{font.category}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {font.sourceUrl ? (
            <button
              className="btn btn-primary"
              title="Open upstream source repository / specimen"
              onClick={() => window.open(font.sourceUrl, "_blank", "noopener,noreferrer")}
            >
              <Download size={14} /> Source
            </button>
          ) : null}
          <button
            className={`btn btn-outline${isFavorite ? " active" : ""}`}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            onClick={() => onToggleFavorite(font.slug)}
            style={{ color: isFavorite ? "#ef4444" : undefined }}
          >
            <Heart size={14} fill={isFavorite ? "#ef4444" : "none"} stroke={isFavorite ? "#ef4444" : "currentColor"} />
          </button>
        </div>
      </div>

      <div className="font-detail-preview">
        <div
          className="font-detail-preview-text"
          style={{
            fontFamily: `'${font.family}', ${fallback}`,
            fontWeight: weight,
            fontSize: `${Math.min(size, 64)}px`,
            letterSpacing: `${spacing}px`,
          }}
        >
          {text || sampleText}
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

      <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--surface-border)" }}>
        <div style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: 12 }}>Quick Integration Code</div>
        <div className="code-box">
          <div className="code-tabs">
            {(Object.keys(codeSnippets) as CodeTab[]).map((t) => (
              <button
                key={t}
                className={`code-tab${codeTab === t ? " active" : ""}`}
                onClick={() => onCodeTabChange(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="code-content">
            <pre>{codeSnippets[codeTab]}</pre>
            <button className="code-copy" onClick={handleCopy} title="Copy snippet">
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 24px" }}>
        <div className="code-tabs" style={{ marginBottom: 16 }}>
          {detailTabs.map((t) => (
            <button
              key={t}
              className={`code-tab${detailTab === t ? " active" : ""}`}
              onClick={() => setDetailTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {detailTab === "Preview" && (
          <div>
            <p
              style={{
                fontFamily: `'${font.family}', ${fallback}`,
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
          <div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 12 }}>
              {copiedGlyph ? (
                <span style={{ color: "#10b981", fontWeight: 600 }}>Copied "{copiedGlyph}" to clipboard!</span>
              ) : (
                <span>Click any character to copy to clipboard:</span>
              )}
            </div>
            <div
              style={{
                fontFamily: `'${font.family}', ${fallback}`,
                fontSize: "1.2rem",
                lineHeight: 2,
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                maxHeight: 220,
                overflowY: "auto",
                padding: "8px 0",
              }}
            >
              {glyphsList.map((ch, i) => (
                <button
                  key={`${ch}-${i}`}
                  onClick={() => handleGlyphClick(ch)}
                  style={{
                    display: "inline-block",
                    width: 38,
                    height: 38,
                    textAlign: "center",
                    lineHeight: "36px",
                    border: "1px solid var(--surface-border)",
                    borderRadius: 6,
                    background: copiedGlyph === ch ? "var(--accent-light)" : "var(--surface)",
                    color: copiedGlyph === ch ? "var(--accent)" : "var(--text-primary)",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                  title={`Unicode U+${ch.charCodeAt(0).toString(16).toUpperCase()}`}
                >
                  {ch}
                </button>
              ))}
            </div>
            {uploadedData?.numGlyphs && (
              <div style={{ marginTop: 12, fontSize: "0.8rem", color: "var(--text-muted)" }}>
                OpenType Parsed: {uploadedData.numGlyphs} total glyphs | Units per EM: {uploadedData.unitsPerEm}
              </div>
            )}
          </div>
        )}

        {detailTab === "Languages" && (
          <div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: 12 }}>
              Supported writing systems and Unicode scripts:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {font.scripts.map((s) => (
                <span key={s} className="font-card-badge category">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {detailTab === "Weights" && (
          <div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: 12 }}>
              Click any weight to switch live preview:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {font.weights.map((w) => (
                <span
                  key={w}
                  className="font-card-badge"
                  style={{
                    cursor: "pointer",
                    background: w === weight ? "var(--accent)" : "var(--bg)",
                    color: w === weight ? "#fff" : "var(--text-secondary)",
                    borderColor: w === weight ? "var(--accent)" : undefined,
                  }}
                  onClick={() => onWeightChange(w)}
                >
                  {w} {w === 400 ? "· Regular" : w === 700 ? "· Bold" : ""}
                </span>
              ))}
            </div>
          </div>
        )}

        {detailTab === "Metadata" && (
          <div style={{ fontSize: "0.85rem", lineHeight: 2, color: "var(--text-secondary)" }}>
            <div>
              <strong>Family:</strong> {font.family}
            </div>
            <div>
              <strong>Designer:</strong> {font.designer}
            </div>
            <div>
              <strong>Category:</strong> {font.category}
            </div>
            <div>
              <strong>Weights:</strong> {font.weights.join(", ")}
            </div>
            <div>
              <strong>Variable:</strong> {font.variable ? "Yes (Google Fonts wght axis)" : "No (Static Weights)"}
            </div>
            <div>
              <strong>Scripts:</strong> {font.scripts.join(", ")}
            </div>
            {uploadedData && (
              <>
                <div>
                  <strong>Units Per EM:</strong> {uploadedData.unitsPerEm ?? "N/A"}
                </div>
                <div>
                  <strong>Ascender / Descender:</strong> {uploadedData.ascender} / {uploadedData.descender}
                </div>
              </>
            )}
          </div>
        )}

        {detailTab === "License" && (
          <div style={{ fontSize: "0.85rem", lineHeight: 2, color: "var(--text-secondary)" }}>
            <div>
              <strong>License:</strong> {font.license}
            </div>
            <p style={{ marginTop: 6, fontSize: "0.8rem", color: "var(--text-muted)" }}>
              FontAtlas provides upstream delivery from official CDN endpoints. Font files remain under their respective
              author licenses.
            </p>
            {font.licenseUrl && (
              <a
                href={font.licenseUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)", textDecoration: "underline", display: "inline-block", marginTop: 8 }}
              >
                Read Official License Document →
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function FontPairingsView({
  fonts,
  onSelectHeading,
  onSelectBody,
}: {
  fonts: Font[];
  onSelectHeading?: (f: Font) => void;
  onSelectBody?: (f: Font) => void;
}) {
  const [hSlug, setHSlug] = useState(fonts[0]?.slug || "inter");
  const [bSlug, setBSlug] = useState(fonts[1]?.slug || "lora");
  const [headingText, setHeadingText] = useState("Build something remarkable.");
  const [bodyText, setBodyText] = useState(
    "Typography is the foundation of user interface design. Test your combinations before shipping to production."
  );
  const [headingSize, setHeadingSize] = useState(48);
  const [copied, setCopied] = useState(false);

  const h = fonts.find((f) => f.slug === hSlug) || fonts[0];
  const b = fonts.find((f) => f.slug === bSlug) || fonts[1] || fonts[0];

  useEffect(() => {
    ensureFontLoaded(h);
    ensureFontLoaded(b);
  }, [h, b]);

  const swapFonts = () => {
    const temp = hSlug;
    setHSlug(bSlug);
    setBSlug(temp);
  };

  const copyPairingCss = () => {
    const css = `/* FontAtlas Pairing: ${h.family} & ${b.family} */\nh1, h2, h3, h4 {\n  font-family: '${h.family}', ${getFontFallback(h.category)};\n}\n\nbody, p, span {\n  font-family: '${b.family}', ${getFontFallback(b.category)};\n}`;
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>Font Pairings</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: 24, maxWidth: 540 }}>
            Find the perfect harmonious headline and body font combination for your product.
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-outline" onClick={swapFonts} title="Swap Heading and Body font">
            <RefreshCw size={14} /> Swap Fonts
          </button>
          <button className="btn btn-primary" onClick={copyPairingCss} title="Copy CSS for this pair">
            {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied CSS!" : "Copy Pairing CSS"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div className="control-group">
          <label className="control-label">
            <span>Heading Font ({h.category})</span>
          </label>
          <select
            className="control-input"
            value={h.slug}
            onChange={(e) => setHSlug(e.target.value)}
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
            <span>Body Font ({b.category})</span>
          </label>
          <select
            className="control-input"
            value={b.slug}
            onChange={(e) => setBSlug(e.target.value)}
          >
            {fonts.map((f) => (
              <option key={f.slug} value={f.slug}>
                {f.family} ({f.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div className="control-group">
          <label className="control-label">
            <span>Heading Text</span>
          </label>
          <input
            className="control-input"
            value={headingText}
            onChange={(e) => setHeadingText(e.target.value)}
            placeholder="Headline copy..."
          />
        </div>
        <div className="control-group">
          <label className="control-label">
            <span>Heading Size ({headingSize}px)</span>
          </label>
          <input
            className="control-slider"
            type="range"
            min={24}
            max={72}
            value={headingSize}
            onChange={(e) => setHeadingSize(Number(e.target.value))}
          />
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
            fontFamily: `'${h.family}', ${getFontFallback(h.category)}`,
            fontSize: `${headingSize}px`,
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: 20,
          }}
        >
          {headingText}
        </div>
        <p
          style={{
            fontFamily: `'${b.family}', ${getFontFallback(b.category)}`,
            fontSize: 18,
            lineHeight: 1.7,
            color: "var(--text-secondary)",
            maxWidth: 640,
            marginBottom: 28,
          }}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => setBodyText(e.currentTarget.textContent || "")}
        >
          {bodyText}
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-primary" onClick={copyPairingCss}>
            {copied ? "Copied!" : "Use This Pairing"}
          </button>
        </div>
      </div>
    </div>
  );
}

function FavoritesView({
  favorites,
  fonts,
  onSelect,
  onToggleFavorite,
}: {
  favorites: string[];
  fonts: Font[];
  onSelect: (f: Font) => void;
  onToggleFavorite: (s: string) => void;
}) {
  const favFonts = fonts.filter((f) => favorites.includes(f.slug));

  if (favFonts.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 80, color: "var(--text-muted)" }}>
        <Heart size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
        <h3 style={{ marginBottom: 8 }}>No favorites saved yet</h3>
        <p>Click the heart icon on any font to collect your top choices here.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>Favorites Collection</h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>
        {favFonts.length} saved font{favFonts.length !== 1 ? "s" : ""}
      </p>
      <div className="font-grid">
        {favFonts.map((font) => (
          <div key={font.slug} className="font-card" onClick={() => onSelect(font)}>
            <div className="font-card-header">
              <div>
                <div className="font-card-name">{font.family}</div>
                <div className="font-card-designer">{font.designer}</div>
              </div>
              <button
                className="font-card-fav active"
                title="Remove from favorites"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(font.slug);
                }}
              >
                <Heart size={14} fill="#ef4444" stroke="#ef4444" />
              </button>
            </div>
            <div
              className="font-card-specimen"
              style={{ fontFamily: `'${font.family}', ${getFontFallback(font.category)}` }}
            >
              Aa
            </div>
            <div className="font-card-meta">
              <span className="font-card-badge">{font.weights.length} weights</span>
              <span className="font-card-badge category">{font.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LanguageView({ onSelectScript }: { onSelectScript: (s: string) => void }) {
  const count = (s: string) => fonts.filter((f) => f.scripts.includes(s)).length;

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>Language & Script Support</h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: 32, maxWidth: 540 }}>
        Browse fonts tailored for specific writing systems and Unicode scripts. Click any script to filter the catalog.
      </p>
      <div className="tools-grid">
        {scripts.map((s) => {
          const fontCount = count(s);
          return (
            <div
              key={s}
              className="tool-card"
              style={{ cursor: "pointer" }}
              onClick={() => onSelectScript(s)}
            >
              <div className="tool-card-icon">
                <Globe2 size={20} />
              </div>
              <div className="tool-card-title">{s}</div>
              <div className="tool-card-desc">
                {fontCount} font{fontCount !== 1 ? "s" : ""} available
              </div>
              <div style={{ marginTop: 8, fontSize: "0.8rem", color: "var(--accent)", fontWeight: 600 }}>
                Explore {s} Fonts →
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PlaygroundView({
  selectedFont,
  onSelectFont,
  fonts,
}: {
  selectedFont: Font;
  onSelectFont: (f: Font) => void;
  fonts: Font[];
}) {
  const [text, setText] = useState(
    "Typography is what language looks like. Good type elevates ideas and makes reading intuitive and effortless."
  );
  const [size, setSize] = useState(42);
  const [weight, setWeight] = useState(selectedFont.weights[0] || 400);
  const [lineHeight, setLineHeight] = useState(1.4);
  const [spacing, setSpacing] = useState(0);
  const [align, setAlign] = useState<"left" | "center" | "right">("left");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    ensureFontLoaded(selectedFont);
    if (!selectedFont.weights.includes(weight)) {
      setWeight(selectedFont.weights.includes(400) ? 400 : selectedFont.weights[0]);
    }
  }, [selectedFont]);

  const copyPlaygroundCss = () => {
    const fallback = getFontFallback(selectedFont.category);
    const css = `/* Playground CSS: ${selectedFont.family} */\nfont-family: '${selectedFont.family}', ${fallback};\nfont-size: ${size}px;\nfont-weight: ${weight};\nline-height: ${lineHeight};\nletter-spacing: ${spacing}px;\ntext-align: ${align};`;
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    { label: "Headline", text: "Design without compromise.", size: 54, weight: 700, lh: 1.1, sp: -1 },
    { label: "Editorial", text: "Typography is what language looks like. Good type elevates ideas and makes reading effortless.", size: 28, weight: 400, lh: 1.6, sp: 0 },
    { label: "Interface", text: "Quick actions · Search catalog · Settings and preferences", size: 16, weight: 500, lh: 1.4, sp: 0.5 },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>Interactive Design Playground</h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: 540 }}>
            Experiment with typography variables in a live canvas. Test custom copy, sizes, and layout rhythms.
          </p>
        </div>
        <button className="btn btn-primary" onClick={copyPlaygroundCss} title="Copy CSS styles">
          {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied CSS!" : "Copy CSS Rules"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
        <div className="control-group">
          <label className="control-label">
            <span>Font Family</span>
          </label>
          <select
            className="control-input"
            value={selectedFont.slug}
            onChange={(e) => {
              const f = fonts.find((item) => item.slug === e.target.value);
              if (f) onSelectFont(f);
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
          <div className="control-label">
            <span>Size</span>
            <span className="control-value">{size}px</span>
          </div>
          <input
            className="control-slider"
            type="range"
            min={14}
            max={96}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
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
            onChange={(e) => setWeight(Number(e.target.value))}
          />
        </div>

        <div className="control-group">
          <div className="control-label">
            <span>Line Height</span>
            <span className="control-value">{lineHeight}</span>
          </div>
          <input
            className="control-slider"
            type="range"
            min={1}
            max={2.5}
            step={0.1}
            value={lineHeight}
            onChange={(e) => setLineHeight(Number(e.target.value))}
          />
        </div>

        <div className="control-group">
          <div className="control-label">
            <span>Letter Spacing</span>
            <span className="control-value">{spacing}px</span>
          </div>
          <input
            className="control-slider"
            type="range"
            min={-3}
            max={15}
            value={spacing}
            onChange={(e) => setSpacing(Number(e.target.value))}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Presets:</span>
        {presets.map((p) => (
          <button
            key={p.label}
            className="category-chip"
            onClick={() => {
              setText(p.text);
              setSize(p.size);
              setWeight(p.weight);
              setLineHeight(p.lh);
              setSpacing(p.sp);
            }}
          >
            {p.label}
          </button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
          <button
            className={`code-tab${align === "left" ? " active" : ""}`}
            onClick={() => setAlign("left")}
            title="Align Left"
          >
            <AlignLeft size={14} />
          </button>
          <button
            className={`code-tab${align === "center" ? " active" : ""}`}
            onClick={() => setAlign("center")}
            title="Align Center"
          >
            <AlignCenter size={14} />
          </button>
          <button
            className={`code-tab${align === "right" ? " active" : ""}`}
            onClick={() => setAlign("right")}
            title="Align Right"
          >
            <AlignRight size={14} />
          </button>
        </div>
      </div>

      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--surface-border)",
          borderRadius: "var(--radius-lg)",
          padding: 40,
          minHeight: 280,
          display: "flex",
          alignItems: "center",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <textarea
          style={{
            width: "100%",
            fontFamily: `'${selectedFont.family}', ${getFontFallback(selectedFont.category)}`,
            fontSize: `${size}px`,
            fontWeight: weight,
            lineHeight: lineHeight,
            letterSpacing: `${spacing}px`,
            textAlign: align,
            border: "none",
            outline: "none",
            background: "transparent",
            color: "var(--text-primary)",
            resize: "vertical",
            minHeight: 200,
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
}

function ToolsView({
  onOpenUpload,
  onOpenWeightExplorer,
  onOpenCssGenerator,
  onNavigateCompare,
}: {
  onOpenUpload: () => void;
  onOpenWeightExplorer: () => void;
  onOpenCssGenerator: () => void;
  onNavigateCompare: () => void;
}) {
  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>Font Engineering Tools</h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: 32, maxWidth: 540 }}>
        Interactive developer utilities for typography testing, parsing, and snippet generation.
      </p>
      <div className="tools-grid">
        <div className="tool-card" style={{ cursor: "pointer" }} onClick={onNavigateCompare}>
          <div className="tool-card-icon">
            <Eye size={20} />
          </div>
          <div className="tool-card-title">Side-by-Side Comparison</div>
          <div className="tool-card-desc">Compare up to 3 fonts simultaneously with synchronized custom copy.</div>
          <div style={{ marginTop: 12, fontSize: "0.8rem", color: "var(--accent)", fontWeight: 600 }}>
            Launch Comparison →
          </div>
        </div>

        <div className="tool-card" style={{ cursor: "pointer" }} onClick={onOpenCssGenerator}>
          <div className="tool-card-icon">
            <Code2 size={20} />
          </div>
          <div className="tool-card-title">CSS & Embed Generator</div>
          <div className="tool-card-desc">Generate optimized @import, link tags, Tailwind configuration, or Next.js code.</div>
          <div style={{ marginTop: 12, fontSize: "0.8rem", color: "var(--accent)", fontWeight: 600 }}>
            Open Generator →
          </div>
        </div>

        <div className="tool-card" style={{ cursor: "pointer" }} onClick={onOpenUpload}>
          <div className="tool-card-icon">
            <Upload size={20} />
          </div>
          <div className="tool-card-title">Local Font Inspector (OpenType.js)</div>
          <div className="tool-card-desc">Upload .ttf, .otf, or .woff files to inspect tables, glyph vectors, and metrics.</div>
          <div style={{ marginTop: 12, fontSize: "0.8rem", color: "var(--accent)", fontWeight: 600 }}>
            Inspect Local Font →
          </div>
        </div>

        <div className="tool-card" style={{ cursor: "pointer" }} onClick={onOpenWeightExplorer}>
          <div className="tool-card-icon">
            <Type size={20} />
          </div>
          <div className="tool-card-title">Weight Spectrum Explorer</div>
          <div className="tool-card-desc">View all optical weights from 100 Thin to 900 Black rendered side-by-side.</div>
          <div style={{ marginTop: 12, fontSize: "0.8rem", color: "var(--accent)", fontWeight: 600 }}>
            Explore Weights →
          </div>
        </div>
      </div>
    </div>
  );
}

function ApiView() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const endpoints = [
    { method: "GET", path: "/api/fonts", desc: "Retrieve full catalog metadata for all 58+ fonts with tags, weights, and scripts." },
    { method: "GET", path: "/api/fonts/inter", desc: "Retrieve detailed JSON metadata for a specific font record by slug." },
    { method: "GET", path: "/api/css/inter", desc: "Production-ready CSS stylesheet endpoint with automated fallback and caching headers." },
  ];

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>Public Metadata API & CDN</h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: 32, maxWidth: 540 }}>
        Integrate FontAtlas programmatically into your builds and applications. Free, open, and no API keys required.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
        {endpoints.map((ep) => (
          <div
            key={ep.path}
            className="code-box"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px" }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span className="font-card-badge" style={{ background: "var(--accent)", color: "#fff", fontWeight: 700 }}>
                  {ep.method}
                </span>
                <code style={{ fontSize: "0.95rem", fontWeight: 600 }}>{ep.path}</code>
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{ep.desc}</div>
            </div>
            <button
              className="btn btn-outline"
              onClick={() => copyUrl(window.location.origin + ep.path)}
              title="Copy endpoint URL"
            >
              {copied === window.location.origin + ep.path ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              {copied === window.location.origin + ep.path ? "Copied" : "Copy"}
            </button>
          </div>
        ))}
      </div>

      <div className="tools-grid">
        <div className="tool-card">
          <div className="tool-card-icon">
            <Zap size={20} />
          </div>
          <div className="tool-card-title">Fast Edge CDN</div>
          <div className="tool-card-desc">Google Fonts upstream delivery with modern woff2 and caching headers.</div>
        </div>
        <div className="tool-card">
          <div className="tool-card-icon">
            <Code2 size={20} />
          </div>
          <div className="tool-card-title">Clean REST Format</div>
          <div className="tool-card-desc">JSON responses tailored for Next.js, Vite, and front-end build pipelines.</div>
        </div>
        <div className="tool-card">
          <div className="tool-card-icon">
            <FileText size={20} />
          </div>
          <div className="tool-card-title">Per-Font CSS Endpoint</div>
          <div className="tool-card-desc">Embed fonts using clean `/api/css/[slug]` URLs with correct family fallbacks.</div>
        </div>
        <div className="tool-card">
          <div className="tool-card-icon">
            <Activity size={20} />
          </div>
          <div className="tool-card-title">Zero Authentication</div>
          <div className="tool-card-desc">No sign-up tokens, cookies, or rate-limiting barriers for developers.</div>
        </div>
      </div>
    </div>
  );
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
  const [compareText, setCompareText] = useState(sampleText);
  const [showUpload, setShowUpload] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showLicense, setShowLicense] = useState(false);
  const [showWeightExplorer, setShowWeightExplorer] = useState(false);
  const [showCssGenerator, setShowCssGenerator] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [fontTab, setFontTab] = useState("All");

  // Local OpenType inspection data
  const [uploadedData, setUploadedData] = useState<UploadedFontData | null>(null);

  // Load favorites & theme from localStorage
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

  // Load the current selected font and initial batch of popular fonts
  useEffect(() => {
    ensureFontLoaded(selectedFont);
    fonts.slice(0, 16).forEach((f) => ensureFontLoaded(f));
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
    if (category) list = list.filter((f) => f.category === category);
    if (script) list = list.filter((f) => f.scripts.includes(script));
    if (fontTab === "Popular") list = list.filter((f) => f.weights.length >= 6);
    if (fontTab === "New") list = [...list].reverse().slice(0, 12);
    if (fontTab === "Variable") list = list.filter((f) => f.variable);
    return list;
  }, [query, category, script, fontTab]);

  // Ensure fonts displayed in the current view get dynamically loaded
  useEffect(() => {
    filteredFonts.slice(0, 24).forEach((f) => ensureFontLoaded(f));
  }, [filteredFonts]);

  // Robust OpenType.js file handler with Web Font API FontFace registration
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
        console.warn("OpenType.js parsing notice:", otErr);
      }

      // Register with the browser's native FontFace API
      try {
        const fontFace = new FontFace(detectedFamily, buffer);
        const loadedFace = await fontFace.load();
        document.fonts.add(loadedFace);
      } catch (ffErr) {
        console.warn("Browser FontFace registration notice:", ffErr);
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
        license: parsedFont?.names?.license?.en || "Local Font (Uploaded)",
        licenseUrl: parsedFont?.names?.licenseURL?.en || "",
        sourceUrl: "",
        googleFamily: "",
        description: `Local font uploaded from ${file.name}. Parsed with OpenType.js. Total glyphs: ${
          parsedFont?.numGlyphs || "N/A"
        }.`,
      };

      setUploadedData({
        fontObj: localFont,
        opentypeFont: parsedFont,
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
      console.error("Error processing font upload:", err);
    }
  };

  const selectFont = (font: Font) => {
    ensureFontLoaded(font);
    setSelectedFont(font);
    setWeight(font.weights.includes(400) ? 400 : font.weights[0]);
    setText("");
    setSize(48);
    setSpacing(0);
    setCodeTab("CDN");
    if (view === "home" || view === "favorites" || view === "pairings") {
      setView("fonts");
    }
  };

  const nav = (v: View) => {
    setView(v);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="topbar">
        <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)}>
          <Menu size={20} />
        </button>
        <div
          className="topbar-brand"
          style={{ cursor: "pointer" }}
          onClick={() => nav("home")}
        >
          <div className="topbar-brand-icon">F</div>FontAtlas
        </div>
        <div className="topbar-nav">
          {[
            ["Fonts", "fonts"],
            ["Languages", "languages"],
            ["Playground", "playground"],
            ["Pairings", "pairings"],
            ["Tools", "tools"],
            ["API & CDN", "api"],
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
        </div>
        <div className="topbar-search">
          <span className="topbar-search-icon">
            <Search size={14} />
          </span>
          <input
            placeholder="Search 58+ fonts, scripts, designers..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (view === "home") setView("fonts");
            }}
          />
        </div>
        <button className="topbar-btn" onClick={toggleTheme} title="Toggle theme">
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <div className="topbar-tagline">A better web starts with better type.</div>
      </div>

      <div className="layout">
        <div className="sidebar">
          <div className="side-group">
            <div className={`side-item${view === "home" ? " active" : ""}`} onClick={() => nav("home")}>
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
              Favorites ({favorites.length})
            </div>
            <div
              className={`side-item${view === "languages" ? " active" : ""}`}
              onClick={() => nav("languages")}
            >
              <span className="side-item-icon">
                <Globe2 size={16} />
              </span>
              Languages ({scripts.length})
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
            <div className={`side-item${view === "tools" ? " active" : ""}`} onClick={() => nav("tools")}>
              <span className="side-item-icon">
                <SlidersHorizontal size={16} />
              </span>
              Font Tools
            </div>
            <div className={`side-item${view === "api" ? " active" : ""}`} onClick={() => nav("api")}>
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
          </div>

          <div className="side-group">
            <div className="side-item" onClick={() => setShowAbout(true)}>
              <span className="side-item-icon">
                <BookOpen size={16} />
              </span>
              About FontAtlas
            </div>
          </div>

          <div className="sidebar-promo">
            <strong>Beautiful typography.</strong>
            Open source & no logins required.
          </div>
        </div>

        <div className="layout-content">
          <div className="layout-main">
            {view === "home" && (
              <>
                <div className="hero">
                  <div className="hero-left">
                    <div className="hero-eyebrow">OPEN · FREE · NO REGISTRATION</div>
                    <h1 className="hero-title">
                      Find the perfect font for your <span className="accent">next product</span>
                    </h1>
                    <p className="hero-subtitle">
                      Browse {fonts.length}+ curated typefaces. Variable, multilingual, and ready for instant developer
                      integration. Live testing, pairings, and clean code snippets.
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
                      <button className="btn btn-primary" onClick={() => setView("fonts")}>
                        Browse Fonts
                      </button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 6,
                        marginTop: 16,
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Popular:</span>
                      {popularFonts.map((name) => (
                        <span
                          key={name}
                          className="category-chip"
                          onClick={() => {
                            setQuery(name);
                            setView("fonts");
                          }}
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="hero-art">
                    <div className="hero-card">
                      <div className="hero-card-text">Typography inspires better products.</div>
                      <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: 8 }}>
                        Use the right font. Make a memorable impression.
                      </div>
                      <a
                        href="#"
                        style={{ fontSize: "0.85rem", color: "var(--accent)", fontWeight: 600 }}
                        onClick={(e) => {
                          e.preventDefault();
                          setView("fonts");
                        }}
                      >
                        Explore Catalog ({fonts.length}) →
                      </a>
                      <div className="hero-card-aa">Aa</div>
                    </div>
                  </div>
                </div>

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
                        <span className="category-chip-icon">{categoryIcons[cat] || "Aa"}</span>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 40 }}>
                  <div className="font-section-header">
                    <div className="font-section-title">Featured Fonts</div>
                    <span className="font-count">{filteredFonts.length} fonts</span>
                  </div>
                  <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                    {["All", "Popular", "New", "Variable"].map((t) => (
                      <button
                        key={t}
                        className={`code-tab${fontTab === t ? " active" : ""}`}
                        onClick={() => setFontTab(t)}
                      >
                        {t}
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
                            isCompared={compare.some((c) => c.slug === font.slug)}
                            onToggleCompare={toggleCompare}
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
                        isFavorite={favorites.includes(selectedFont.slug)}
                        onToggleFavorite={toggleFavorite}
                        uploadedData={uploadedData?.fontObj.slug === selectedFont.slug ? uploadedData : null}
                      />
                    )}
                  </div>
                </div>

                {compare.length > 0 && (
                  <div className="compare-section">
                    <div className="compare-header">
                      <div className="compare-title">Compare Fonts ({compare.length}/3)</div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button className="btn btn-outline" onClick={() => setCompare([])}>
                          Clear All
                        </button>
                      </div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <input
                        className="control-input"
                        placeholder="Type text to compare side-by-side..."
                        value={compareText}
                        onChange={(e) => setCompareText(e.target.value)}
                      />
                    </div>
                    <div className="compare-grid">
                      {compare.map((font) => (
                        <div key={font.slug} className="compare-card">
                          <div className="compare-card-header">
                            <div className="compare-card-name">{font.family}</div>
                            <button
                              className="compare-card-remove"
                              onClick={() => toggleCompare(font)}
                              title="Remove font"
                            >
                              <X size={14} />
                            </button>
                          </div>
                          <div
                            className="compare-card-body"
                            style={{
                              fontFamily: `'${font.family}', ${getFontFallback(font.category)}`,
                              fontSize: "1.2rem",
                              lineHeight: 1.5,
                            }}
                          >
                            {compareText || sampleText}
                          </div>
                          <div className="compare-card-footer">
                            <span className="font-card-badge">{font.category}</span>
                            <span className="font-card-badge">{font.weights.length} weights</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ marginBottom: 40 }}>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: 4 }}>
                    Complete Typography Toolkit
                  </h2>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: 20 }}>
                    Everything you need to discover, test, and ship type
                  </p>
                  <div className="tools-grid">
                    <div className="tool-card" style={{ cursor: "pointer" }} onClick={() => nav("pairings")}>
                      <div className="tool-card-icon">
                        <Palette size={20} />
                      </div>
                      <div className="tool-card-title">Font Pairings</div>
                      <div className="tool-card-desc">Find matching heading and body combinations.</div>
                    </div>
                    <div className="tool-card" style={{ cursor: "pointer" }} onClick={() => nav("languages")}>
                      <div className="tool-card-icon">
                        <Globe2 size={20} />
                      </div>
                      <div className="tool-card-title">Language Support</div>
                      <div className="tool-card-desc">17 scripts covered with 58+ fonts.</div>
                    </div>
                    <div className="tool-card" style={{ cursor: "pointer" }} onClick={() => nav("playground")}>
                      <div className="tool-card-icon">
                        <Sliders size={20} />
                      </div>
                      <div className="tool-card-title">Design Playground</div>
                      <div className="tool-card-desc">Fine-tune weights, sizes, and letter spacing live.</div>
                    </div>
                    <div className="tool-card" style={{ cursor: "pointer" }} onClick={() => setShowUpload(true)}>
                      <div className="tool-card-icon">
                        <Upload size={20} />
                      </div>
                      <div className="tool-card-title">OpenType Font Inspector</div>
                      <div className="tool-card-desc">Parse and test local .ttf, .otf, and .woff files.</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {view === "fonts" && (
              <div>
                <div className="font-section-header" style={{ marginTop: 8 }}>
                  <div className="font-section-title">
                    {category || script ? `Filtered Fonts (${filteredFonts.length})` : `All Fonts (${fonts.length})`}
                  </div>
                  <span className="font-count">{filteredFonts.length} fonts</span>
                </div>

                {(category || script) && (
                  <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
                    {category && (
                      <span className="category-chip active" onClick={() => setCategory("")}>
                        Category: {category} <X size={12} />
                      </span>
                    )}
                    {script && (
                      <span className="category-chip active" onClick={() => setScript("")}>
                        Script: {script} <X size={12} />
                      </span>
                    )}
                  </div>
                )}

                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                  {["All", "Popular", "New", "Variable"].map((t) => (
                    <button
                      key={t}
                      className={`code-tab${fontTab === t ? " active" : ""}`}
                      onClick={() => setFontTab(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>

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
                          isCompared={compare.some((c) => c.slug === font.slug)}
                          onToggleCompare={toggleCompare}
                        />
                      ))}
                    </div>
                    {filteredFonts.length === 0 && (
                      <div style={{ textAlign: "center", padding: 60, color: "var(--text-muted)" }}>
                        No fonts match your criteria. Try adjusting your search query or filters.
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
                      isFavorite={favorites.includes(selectedFont.slug)}
                      onToggleFavorite={toggleFavorite}
                      uploadedData={uploadedData?.fontObj.slug === selectedFont.slug ? uploadedData : null}
                    />
                  )}
                </div>
              </div>
            )}

            {view === "favorites" && (
              <FavoritesView
                favorites={favorites}
                fonts={fonts}
                onSelect={selectFont}
                onToggleFavorite={toggleFavorite}
              />
            )}

            {view === "pairings" && <FontPairingsView fonts={fonts} />}

            {view === "languages" && (
              <LanguageView
                onSelectScript={(s) => {
                  setScript(s);
                  setCategory("");
                  nav("fonts");
                }}
              />
            )}

            {view === "playground" && (
              <PlaygroundView
                selectedFont={selectedFont}
                onSelectFont={(f) => {
                  ensureFontLoaded(f);
                  setSelectedFont(f);
                }}
                fonts={fonts}
              />
            )}

            {view === "tools" && (
              <ToolsView
                onOpenUpload={() => setShowUpload(true)}
                onOpenWeightExplorer={() => setShowWeightExplorer(true)}
                onOpenCssGenerator={() => setShowCssGenerator(true)}
                onNavigateCompare={() => {
                  if (compare.length === 0 && fonts.length >= 2) {
                    setCompare([fonts[0], fonts[1]]);
                  }
                  nav("home");
                }}
              />
            )}

            {view === "api" && <ApiView />}

            <div className="footer">
              <div className="footer-inner">
                <div>
                  <div className="footer-brand">FontAtlas</div>
                  <div className="footer-desc">
                    A clean, no-login font discovery and developer integration platform for the modern web.
                  </div>
                  <div className="footer-social">
                    <a
                      href="https://github.com/jojin1709/fontatlas"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      <Code2 size={16} />
                    </a>
                    <a
                      href="https://twitter.com/jojin1709"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                    >
                      <Activity size={16} />
                    </a>
                  </div>
                </div>
                <div className="footer-col">
                  <div className="footer-col-title">Product</div>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      nav("fonts");
                    }}
                  >
                    Catalog
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      nav("pairings");
                    }}
                  >
                    Pairings
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      nav("api");
                    }}
                  >
                    API Endpoints
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowLicense(true);
                    }}
                  >
                    License
                  </a>
                </div>
                <div className="footer-col">
                  <div className="footer-col-title">Project</div>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowAbout(true);
                    }}
                  >
                    About FontAtlas
                  </a>
                  <a
                    href="https://github.com/jojin1709/fontatlas"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source Code
                  </a>
                  <a
                    href="https://github.com/jojin1709/fontatlas/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Report Issue
                  </a>
                </div>
                <div className="footer-col">
                  <div className="footer-col-title">Resources</div>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      nav("api");
                    }}
                  >
                    Documentation
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      nav("tools");
                    }}
                  >
                    Developer Tools
                  </a>
                </div>
              </div>
              <div className="footer-bottom">
                <span>© 2026 FontAtlas. Open source under the MIT License. Developed by JOJIN JOHN.</span>
                <span>Fonts delivered via upstream CDN (Google Fonts).</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile navigation modal */}
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
                ["Playground", "playground"],
                ["Font Pairings", "pairings"],
                ["Font Tools", "tools"],
                ["Favorites", "favorites"],
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
              <div style={{ marginTop: 12, borderTop: "1px solid var(--surface-border)", paddingTop: 12 }}>
                <div
                  className="side-item"
                  onClick={() => {
                    setShowUpload(true);
                    setMobileOpen(false);
                  }}
                >
                  Test Local Font
                </div>
                <div
                  className="side-item"
                  onClick={() => {
                    setShowAbout(true);
                    setMobileOpen(false);
                  }}
                >
                  About FontAtlas
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Local Font Upload & OpenType.js Inspector */}
      {showUpload && (
        <div className="modal-overlay open" onClick={() => setShowUpload(false)}>
          <div className="modal" style={{ maxWidth: 540 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">OpenType Local Font Inspector</div>
              <button className="modal-close" onClick={() => setShowUpload(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: 20 }}>
                Upload any <code>.ttf</code>, <code>.otf</code>, <code>.woff</code>, or <code>.woff2</code> font file.
                FontAtlas uses <strong>OpenType.js</strong> to parse glyph tables, metrics, and font names completely
                client-side without uploading to any remote server.
              </p>
              <label
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "36px 20px",
                  border: "2px dashed var(--accent)",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--accent-light)",
                  cursor: "pointer",
                  transition: "all var(--transition-fast)",
                }}
              >
                <Upload size={36} style={{ color: "var(--accent)", marginBottom: 12 }} />
                <div style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>
                  Click or drag font file to inspect
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  Supports TTF, OTF, WOFF, and WOFF2 formats
                </div>
                <input
                  type="file"
                  accept=".ttf,.otf,.woff2,.woff"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
              </label>

              {uploadedData && (
                <div style={{ marginTop: 24, padding: 16, background: "var(--bg)", borderRadius: "var(--radius-md)" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: 8 }}>
                    Currently Loaded Font: {uploadedData.fontObj.family}
                  </div>
                  <div style={{ fontSize: "0.8rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                    <div>
                      <strong>Designer:</strong> {uploadedData.fontObj.designer}
                    </div>
                    <div>
                      <strong>Total Glyphs:</strong> {uploadedData.numGlyphs ?? "N/A"}
                    </div>
                    <div>
                      <strong>Units Per EM:</strong> {uploadedData.unitsPerEm ?? "N/A"}
                    </div>
                    <div>
                      <strong>Ascender / Descender:</strong> {uploadedData.ascender} / {uploadedData.descender}
                    </div>
                  </div>
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

      {/* Weight Explorer Modal */}
      {showWeightExplorer && (
        <div className="modal-overlay open" onClick={() => setShowWeightExplorer(false)}>
          <div className="modal" style={{ maxWidth: 680, maxHeight: "85vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Weight Spectrum Explorer — {selectedFont.family}</div>
              <button className="modal-close" onClick={() => setShowWeightExplorer(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: 20 }}>
                <input
                  className="control-input"
                  placeholder="Type sample text to preview across weights..."
                  value={text || sampleText}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {selectedFont.weights.map((w) => (
                  <div
                    key={w}
                    style={{
                      padding: "16px 20px",
                      background: "var(--bg)",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--surface-border)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      <span>Weight {w}</span>
                      <span>font-weight: {w}</span>
                    </div>
                    <div
                      style={{
                        fontFamily: `'${selectedFont.family}', ${getFontFallback(selectedFont.category)}`,
                        fontWeight: w,
                        fontSize: "24px",
                        lineHeight: 1.3,
                        color: "var(--text-primary)",
                      }}
                    >
                      {text || sampleText}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setShowWeightExplorer(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive CSS Generator Modal */}
      {showCssGenerator && (
        <div className="modal-overlay open" onClick={() => setShowCssGenerator(false)}>
          <div className="modal" style={{ maxWidth: 600 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">CSS & Embed Code Generator</div>
              <button className="modal-close" onClick={() => setShowCssGenerator(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="control-group" style={{ marginBottom: 16 }}>
                <label className="control-label">
                  <span>Selected Typeface</span>
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

              <div className="code-box">
                <div className="code-tabs">
                  {(["CDN", "CSS", "HTML", "Tailwind", "Next.js", "React"] as CodeTab[]).map((tab) => (
                    <button
                      key={tab}
                      className={`code-tab${codeTab === tab ? " active" : ""}`}
                      onClick={() => setCodeTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="code-content" style={{ maxHeight: 200, overflowY: "auto" }}>
                  <pre>
                    {codeTab === "CDN" && `<link href="${googleCssUrl(selectedFont)}" rel="stylesheet">`}
                    {codeTab === "CSS" &&
                      `@import url('${googleCssUrl(selectedFont)}');\n\nbody {\n  font-family: '${selectedFont.family}', ${getFontFallback(
                        selectedFont.category
                      )};\n}`}
                    {codeTab === "HTML" &&
                      `<link href="${googleCssUrl(selectedFont)}" rel="stylesheet">\n\n<h1 style="font-family: '${selectedFont.family}', ${getFontFallback(
                        selectedFont.category
                      )}">${selectedFont.family}</h1>`}
                    {codeTab === "Tailwind" &&
                      `// tailwind.config.js\nfontFamily: {\n  '${selectedFont.family.toLowerCase().replace(/\s+/g, "-")}': ['"${selectedFont.family}"', '${getFontFallback(
                        selectedFont.category
                      )}'],\n}`}
                    {codeTab === "Next.js" &&
                      `import { ${selectedFont.family.replace(/[\s-]+/g, "")} } from 'next/font/google'\n\nconst font = ${selectedFont.family.replace(
                        /[\s-]+/g,
                        ""
                      )}({ subsets: ['latin'] })`}
                    {codeTab === "React" &&
                      `import '@fontsource/${selectedFont.family.toLowerCase().replace(/\s+/g, "-")}'`}
                  </pre>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={() => {
                  let snippet = "";
                  if (codeTab === "CDN") snippet = `<link href="${googleCssUrl(selectedFont)}" rel="stylesheet">`;
                  else if (codeTab === "CSS")
                    snippet = `@import url('${googleCssUrl(selectedFont)}');\n\nbody {\n  font-family: '${selectedFont.family}', ${getFontFallback(
                      selectedFont.category
                    )};\n}`;
                  else if (codeTab === "HTML")
                    snippet = `<link href="${googleCssUrl(selectedFont)}" rel="stylesheet">\n\n<h1 style="font-family: '${selectedFont.family}'">${selectedFont.family}</h1>`;
                  else if (codeTab === "Tailwind")
                    snippet = `'${selectedFont.family.toLowerCase().replace(/\s+/g, "-")}': ['"${selectedFont.family}"', '${getFontFallback(
                      selectedFont.category
                    )}'],`;
                  else if (codeTab === "Next.js")
                    snippet = `import { ${selectedFont.family.replace(/[\s-]+/g, "")} } from 'next/font/google'`;
                  else snippet = `import '@fontsource/${selectedFont.family.toLowerCase().replace(/\s+/g, "-")}'`;
                  navigator.clipboard.writeText(snippet);
                  setShowCssGenerator(false);
                }}
              >
                Copy & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About FontAtlas Modal */}
      {showAbout && (
        <div className="modal-overlay open" onClick={() => setShowAbout(false)}>
          <div className="modal" style={{ maxWidth: 560 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">About FontAtlas</div>
              <button className="modal-close" onClick={() => setShowAbout(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
              <p style={{ marginBottom: 12 }}>
                <strong>FontAtlas</strong> is an open-source, no-login font discovery and developer integration
                platform created by <strong>JOJIN JOHN</strong>.
              </p>
              <p style={{ marginBottom: 12 }}>
                Finding and previewing open web fonts shouldn't require creating an account, surrendering personal data,
                or wrestling with complex embed links. FontAtlas gives you instant live previews, custom text testing,
                multilingual script coverage, and code snippets for modern web frameworks.
              </p>
              <div style={{ padding: 16, background: "var(--bg)", borderRadius: "var(--radius-md)", marginBottom: 16 }}>
                <div><strong>Stack:</strong> Next.js 15, React 19, TypeScript, OpenType.js</div>
                <div><strong>Web Delivery:</strong> Google Fonts upstream CDN</div>
                <div><strong>License:</strong> MIT License (Codebase)</div>
                <div><strong>Author:</strong> JOJIN JOHN (<a href="https://github.com/jojin1709" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>@jojin1709</a>)</div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setShowAbout(false)}>
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* License Modal */}
      {showLicense && (
        <div className="modal-overlay open" onClick={() => setShowLicense(false)}>
          <div className="modal" style={{ maxWidth: 540 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Licensing & Terms</div>
              <button className="modal-close" onClick={() => setShowLicense(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ fontSize: "0.88rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
              <p style={{ marginBottom: 12 }}>
                The FontAtlas web application and integration API are released under the <strong>MIT License</strong>.
              </p>
              <p style={{ marginBottom: 12 }}>
                All typefaces featured in the FontAtlas catalog are open-source and licensed under author-defined upstream
                agreements—principally the <strong>SIL Open Font License 1.1</strong> or <strong>Apache License 2.0</strong>.
              </p>
              <p>
                FontAtlas does not claim ownership or mirror font files directly without permission; fonts are loaded directly
                from verified upstream CDNs (Google Fonts).
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setShowLicense(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
