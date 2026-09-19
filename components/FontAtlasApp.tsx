"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity, BookOpen, Check, ChevronRight, Code2, Copy, Download, Eye, FileText,
  Globe2, Heart, Home, Languages, LayoutGrid, Menu, Moon, Package, Palette,
  Search, SlidersHorizontal, Sparkles, Star, Sun, Type, Upload, Variable, X, Zap
} from "lucide-react";
import { Font, categories, fonts, googleCssUrl, scripts } from "../lib/fonts";
import opentype from "opentype.js";

type View = "home" | "fonts" | "languages" | "playground" | "tools" | "api";
type CodeTab = "CDN" | "CSS" | "HTML" | "Tailwind" | "Next.js" | "React";

const iconForCategory: Record<string, string> = {
  "Sans Serif":"Aa", "Serif":"Aa", "Slab Serif":"Aa", "Monospace":"0A", "Display":"A↗", "Handwriting":"Aa", "Script":"𝒜", "Blackletter":"𝔄", "Pixel":"▦"
};

const sampleText = "The quick brown fox jumps over the lazy dog.";

function loadGoogleFonts(list: Font[]) {
  if (typeof document === "undefined") return;
  const families = list.map(f => `family=${f.googleFamily}:wght@${[...new Set(f.weights)].sort((a,b)=>a-b).join(";")}`).join("&");
  const id = "fontatlas-google-fonts";
  let link = document.getElementById(id) as HTMLLinkElement | null;
  const href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
  if (!link) { link = document.createElement("link"); link.id=id; link.rel="stylesheet"; document.head.appendChild(link); }
  link.href = href;
}

export default function FontAtlasApp() {
  const [view, setView] = useState<View>("home");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [script, setScript] = useState("All");
  const [selected, setSelected] = useState<Font>(fonts[0]);
  const [text, setText] = useState(sampleText);
  const [weight, setWeight] = useState(400);
  const [size, setSize] = useState(72);
  const [spacing, setSpacing] = useState(0);
  const [codeTab, setCodeTab] = useState<CodeTab>("CDN");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [uploadedFont, setUploadedFont] = useState<{ name: string; font: opentype.Font } | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    try { setFavorites(JSON.parse(localStorage.getItem("fontatlas:favorites") || "[]")); } catch {}
  }, []);
  useEffect(() => { localStorage.setItem("fontatlas:favorites", JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { loadGoogleFonts(fonts); }, []);
  useEffect(() => { if (!selected.weights.includes(weight)) setWeight(selected.weights[Math.min(3, selected.weights.length-1)]); }, [selected, weight]);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("fontatlas:theme") as "light" | "dark" | null;
      if (saved) setTheme(saved);
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("fontatlas:theme", theme);
  }, [theme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return fonts.filter(f => {
      const matchesQuery = !q || [f.family,f.designer,f.category,...f.tags,...f.scripts].join(" ").toLowerCase().includes(q);
      const matchesCategory = category === "All" || f.category === category;
      const matchesScript = script === "All" || f.scripts.includes(script);
      return matchesQuery && matchesCategory && matchesScript;
    });
  }, [query, category, script]);

  const featured = filtered.slice(0, 12);
  const favoriteSet = new Set(favorites);
  const compareFonts = compare.map(slug => fonts.find(f => f.slug === slug)).filter(Boolean) as Font[];

  const toggleFavorite = (slug: string) => setFavorites(v => v.includes(slug) ? v.filter(x=>x!==slug) : [...v,slug]);
  const toggleCompare = (slug: string) => setCompare(v => v.includes(slug) ? v.filter(x=>x!==slug) : v.length < 3 ? [...v,slug] : v);

  const selectFont = (font: Font) => {
    setSelected(font);
    setView("fonts");
    setCodeTab("CDN");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cdnUrl = `https://fonts.googleapis.com/css2?family=${selected.googleFamily}:wght@${[...new Set(selected.weights)].sort((a,b)=>a-b).join(";")}&display=swap`;
  const cssCode = `/* FontAtlas CSS endpoint — upstream: Google Fonts */\n@import url("/api/css/${selected.slug}");\n\nbody {\n  font-family: "${selected.family}", sans-serif;\n}`;
  const htmlCode = `<link rel="stylesheet" href="${cdnUrl}">\n\n<h1 style="font-family: '${selected.family}', sans-serif">${selected.family}</h1>`;
  const tailwindCode = `// tailwind.config.ts\nfontFamily: {\n  ${selected.slug.replace(/-/g,"_")}: ["${selected.family}", "sans-serif"]\n}`;
  const nextCode = `// app/layout.tsx\n// Or use the generated CSS endpoint:\n<link rel="stylesheet" href="/api/css/${selected.slug}" />`;
  const reactCode = `import "https://fonts.googleapis.com/css2?family=${selected.googleFamily}&display=swap";\n\nexport default function Title() {\n  return <h1 style={{fontFamily: "${selected.family}"}}>${selected.family}</h1>;\n}`;
  const code = codeTab === "CDN" ? `@import url("${cdnUrl}");\n\n/* Use */\nbody { font-family: "${selected.family}", sans-serif; }` : codeTab === "CSS" ? cssCode : codeTab === "HTML" ? htmlCode : codeTab === "Tailwind" ? tailwindCode : codeTab === "Next.js" ? nextCode : reactCode;

  const copyCode = async (value: string) => {
    try { await navigator.clipboard.writeText(value); setCopied(true); setTimeout(()=>setCopied(false), 1300); } catch {}
  };

  const handleUpload = async (file: File) => {
    const buffer = await file.arrayBuffer();
    try {
      const font = opentype.parse(buffer);
      setUploadedFont({ name: font.names.fontFamily?.en || file.name, font });
    } catch {
      alert("This file could not be parsed as a supported font.");
    }
  };

  const nav = (next: View) => { setView(next); setMobileOpen(false); window.scrollTo({top:0,behavior:"smooth"}); };

  return (
    <div className="shell">
      <header className="topbar">
        <button className="icon-btn mobile-menu" onClick={()=>setMobileOpen(v=>!v)} aria-label="Open menu"><Menu size={17}/></button>
        <div className="brand"><span className="brandmark">F</span> FontAtlas</div>
        <nav className="nav">
          <button className={view==="fonts"||view==="home"?"active":""} onClick={()=>nav("home")}>Fonts</button>
          <button onClick={()=>nav("fonts")}>Categories</button>
          <button onClick={()=>nav("languages")}>Languages</button>
          <button onClick={()=>nav("playground")}>Playground</button>
          <button onClick={()=>nav("tools")}>Tools</button>
          <button onClick={()=>nav("api")}>Resources</button>
        </nav>
        <div className="top-search"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search fonts, designers, or tags..." /></div>
        <button className="icon-btn" aria-label="Toggle theme" onClick={()=>setTheme(t=>t==="light"?"dark":"light")}>{theme==="light"?<Moon size={16}/>:<Sun size={16}/>}</button>
      </header>

      {mobileOpen && <div className="modal-backdrop" onClick={()=>setMobileOpen(false)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="icon-btn" onClick={()=>setMobileOpen(false)}><X size={16}/></button><div style={{marginTop:15}}>{(["home","fonts","languages","playground","tools","api"] as View[]).map(v=><button key={v} className="side-item" onClick={()=>nav(v)}>{v}</button>)}</div></div></div>}

      <div className="layout">
        <aside className="sidebar">
          <button className={`side-item ${view==="home"?"active":""}`} onClick={()=>nav("home")}><Home size={16}/><span>Home</span></button>
          <button className={`side-item ${view==="fonts"?"active":""}`} onClick={()=>nav("fonts")}><Type size={16}/><span>All Fonts</span></button>
          <button className="side-item" onClick={()=>{setQuery("");setCategory("All");nav("fonts")}}><Star size={16}/><span>Popular</span></button>
          <button className="side-item" onClick={()=>{setQuery("");setCategory("All");nav("fonts")}}><Sparkles size={16}/><span>New Releases</span></button>
          <button className="side-item" onClick={()=>{setQuery("");nav("fonts")}}><Variable size={16}/><span>Variable Fonts</span></button>
          <button className="side-item" onClick={()=>nav("playground")}><Palette size={16}/><span>Font Pairings</span></button>
          <button className="side-item" onClick={()=>nav("fonts")}><Heart size={16}/><span>Collections</span></button>
          <button className="side-item" onClick={()=>nav("languages")}><Globe2 size={16}/><span>Language Support</span></button>
          <button className="side-item" onClick={()=>nav("playground")}><LayoutGrid size={16}/><span>Design Playground</span></button>
          <button className="side-item" onClick={()=>nav("tools")}><SlidersHorizontal size={16}/><span>Font Tools</span></button>
          <button className="side-item" onClick={()=>nav("api")}><Code2 size={16}/><span>API & CDN</span></button>
          <div className="side-group">Local first</div>
          <button className="side-item" onClick={()=>setShowUpload(true)}><Upload size={16}/><span>Test Your Font</span></button>
        </aside>

        <main className="content">
          {view === "home" && <>
            <section className="hero">
              <div className="hero-copy">
                <div className="eyebrow">Open · free · for everyone</div>
                <h1>Find the perfect font for your <span>next project</span></h1>
                <p>A modern font library with live previews, language support, glyph inspection, CDN links, and ready-to-use developer code. No sign up.</p>
                <div className="main-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search fonts (e.g. Inter, Roboto, Malayalam, handwritten...)"/><button className="primary" onClick={()=>nav("fonts")}>Search</button></div>
                <div className="language-strip"><span className="meta" style={{paddingTop:5}}>Popular:</span>{["Inter","Poppins","Roboto","Montserrat","Lato","Open Sans"].map(x=><button key={x} className="pill" onClick={()=>{setQuery(x);nav("fonts")}}>{x}</button>)}</div>
              </div>
              <div className="hero-art"><div className="art-label">Typography / 01</div><div className="art-copy">A better font makes a better interface.</div><div className="art-glyph">Aa</div></div>
            </section>
            <section><div className="section-head"><h2>Browse fonts by category</h2><button className="side-item" style={{width:"auto"}} onClick={()=>nav("fonts")}>View all <ChevronRight size={14}/></button></div><div className="category-row">{categories.map(c=><button key={c} className="category" onClick={()=>{setCategory(c);nav("fonts")}}><span className="cat-aa">{iconForCategory[c]}</span><span className="cat-name">{c}</span></button>)}</div></section>
          </>}

          {(view === "home" || view === "fonts") && <>
            <section className="section-head"><h2>{view==="home"?"Featured fonts":"Font library"}</h2><span>{filtered.length} fonts in this catalog</span></section>
            {view === "fonts" && <div className="panel" style={{padding:12,marginBottom:14}}><div style={{display:"flex",gap:8,flexWrap:"wrap"}}><select value={category} onChange={e=>setCategory(e.target.value)} className="preview-input" style={{width:180}}><option>All</option>{categories.map(c=><option key={c}>{c}</option>)}</select><select value={script} onChange={e=>setScript(e.target.value)} className="preview-input" style={{width:180}}><option>All</option>{scripts.map(s=><option key={s}>{s}</option>)}</select><button className="download" onClick={()=>setShowUpload(true)}><Upload size={14}/> Test local font</button></div></div>}
            <div className="workspace">
              <div className="panel"><div className="panel-head"><div className="panel-title">{category === "All" ? "All styles" : category}</div><div className="tabs"><button className="tab active">All</button><button className="tab">Popular</button><button className="tab">Variable</button></div></div><div className="font-grid">{featured.map(font=><FontCard key={font.slug} font={font} saved={favoriteSet.has(font.slug)} compared={compare.includes(font.slug)} onSelect={()=>selectFont(font)} onFavorite={()=>toggleFavorite(font.slug)} onCompare={()=>toggleCompare(font.slug)}/>)}</div>{featured.length===0&&<div className="empty">No fonts match those filters.</div>}</div>
              <FontDetail font={selected} text={text} setText={setText} weight={weight} setWeight={setWeight} size={size} setSize={setSize} spacing={spacing} setSpacing={setSpacing} codeTab={codeTab} setCodeTab={setCodeTab} code={code} copyCode={copyCode} copied={copied} onDownload={()=>window.open(selected.sourceUrl,"_blank")} />
            </div>
          </>}

          {view === "languages" && <LanguageView setQuery={setQuery} setScript={setScript} nav={nav}/>} 
          {view === "playground" && <Playground fonts={fonts} selected={selected} setSelected={setSelected} text={text} setText={setText}/>} 
          {view === "tools" && <ToolsView onUpload={()=>setShowUpload(true)} selected={selected} selectFont={selectFont}/>} 
          {view === "api" && <ApiView selected={selected} code={code} copyCode={copyCode} copied={copied}/>} 

          {compareFonts.length > 0 && <section className="tool-section"><div className="section-head" style={{marginTop:0}}><div><h2>Compare fonts</h2><span>Same text, side by side</span></div><button className="icon-btn" onClick={()=>setCompare([])}><X size={15}/></button></div><div className="compare">{compareFonts.map(f=><div className="compare-item" key={f.slug}><strong>{f.family}</strong><div className="compare-sample" style={{fontFamily:`"${f.family}"`}}>{text}</div><button className="side-item" onClick={()=>selectFont(f)}>Open font <ChevronRight size={14}/></button></div>)}</div></section>}

          <section className="tool-section"><div className="section-head" style={{marginTop:0}}><div><h2>More than just fonts</h2><span>Explore, inspect, test and integrate typography without an account.</span></div></div><div className="tool-grid"><Feature icon={<Eye/>} title="Preview & Compare" text="Test your exact text and compare typefaces side by side."/><Feature icon={<Languages/>} title="Language Support" text="Check script coverage before you ship a multilingual interface."/><Feature icon={<Code2/>} title="Ready-to-use code" text="Copy CDN, CSS, HTML, Tailwind, React and Next.js snippets."/><Feature icon={<Zap/>} title="No account required" text="Favorites and local collections stay in your browser."/></div></section>

          <footer className="footer"><strong>FontAtlas</strong><span>A modern font library for a better web.</span><span>Fonts · API · License · About</span></footer>
        </main>
      </div>

      {showUpload && <div className="modal-backdrop" onClick={()=>setShowUpload(false)}><div className="modal" onClick={e=>e.stopPropagation()}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><h3>Test a local font</h3><p>The font is parsed in your browser and is not uploaded to FontAtlas.</p></div><button className="icon-btn" onClick={()=>setShowUpload(false)}><X size={16}/></button></div><div className="drop"><Upload size={24}/><div style={{marginTop:8,fontWeight:600}}>Choose a .ttf, .otf, .woff or .woff2 file</div><input type="file" accept=".ttf,.otf,.woff,.woff2" onChange={e=>{const f=e.target.files?.[0];if(f)handleUpload(f)}}/>{uploadedFont&&<div className="notice"><Check size={13}/> Loaded <strong>{uploadedFont.name}</strong>. Close this window and use the local preview in Tools.</div>}</div></div></div>}
    </div>
  );
}

function FontCard({
  font,
  saved,
  compared,
  onSelect,
  onFavorite,
  onCompare,
}: {
  font: Font;
  saved: boolean;
  compared: boolean;
  onSelect: () => void;
  onFavorite: () => void;
  onCompare: () => void;
}) {
  return (
    <article className="font-card">
      <div className="card-top">
        <button style={{ border: 0, background: "transparent", padding: 0, textAlign: "left" }} onClick={onSelect}>
          <div className="font-name">{font.family}</div>
          <div className="meta">{font.designer} · {font.category}</div>
        </button>
        <button className={`heart ${saved ? "saved" : ""}`} onClick={onFavorite} aria-label="Favorite">
          <Heart size={16} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <button onClick={onSelect} style={{ border: 0, background: "transparent", padding: 0, width: "100%", textAlign: "left" }}>
        <div className="specimen" style={{ fontFamily: `"${font.family}"` }}>Aa</div>
      </button>
      <div className="card-footer">
        <span className="pill">{font.weights.length} weights</span>
        {font.variable && <span className="pill">Variable</span>}
        <span className="pill">{font.scripts[0]}</span>
        <button className="pill" style={{ cursor: "pointer" }} onClick={onCompare}>{compared ? "Compared" : "Compare"}</button>
      </div>
    </article>
  );
}

function FontDetail({font,text,setText,weight,setWeight,size,setSize,spacing,setSpacing,codeTab,setCodeTab,code,copyCode,copied,onDownload}:{font:Font;text:string;setText:(v:string)=>void;weight:number;setWeight:(v:number)=>void;size:number;setSize:(v:number)=>void;spacing:number;setSpacing:(v:number)=>void;codeTab:CodeTab;setCodeTab:(v:CodeTab)=>void;code:string;copyCode:(v:string)=>void;copied:boolean;onDownload:()=>void}){
  return <div className="panel detail"><div className="detail-body"><div className="detail-title"><div><h2>{font.family}</h2><p>Designed by {font.designer}</p></div><button className="download" onClick={onDownload}><Download size={14}/> Source</button></div><div className="tabs" style={{marginTop:14,borderBottom:"1px solid var(--line)",paddingBottom:6}}><button className="tab active">Preview</button><button className="tab">Glyphs</button><button className="tab">Languages</button><button className="tab">Weights</button><button className="tab">Metadata</button><button className="tab">License</button></div><div className="preview-box"><input className="preview-input" value={text} onChange={e=>setText(e.target.value)} placeholder="Type your own text..."/><div className="big-preview" style={{fontFamily:`"${font.family}"`,fontSize:size,fontWeight:weight,letterSpacing:`${spacing}px`}}>{text||"Type something"}</div><div className="controls"><div className="control"><label><span>Size</span><span>{size}px</span></label><input type="range" min="16" max="120" value={size} onChange={e=>setSize(Number(e.target.value))}/></div><div className="control"><label><span>Weight</span><span>{weight}</span></label><input type="range" min={Math.min(...font.weights)} max={Math.max(...font.weights)} step="100" value={weight} onChange={e=>setWeight(Number(e.target.value))}/></div><div className="control"><label><span>Letter spacing</span><span>{spacing}px</span></label><input type="range" min="-4" max="12" step="0.5" value={spacing} onChange={e=>setSpacing(Number(e.target.value))}/></div></div></div><div className="codebox"><div className="code-tabs">{(["CDN","CSS","HTML","Tailwind","Next.js","React"] as CodeTab[]).map(t=><button key={t} className={`code-tab ${codeTab===t?"active":""}`} onClick={()=>setCodeTab(t)}>{t}</button>)}</div><div className="code-row"><div className="code">{code}</div><button className="copy" onClick={()=>copyCode(code)}>{copied?<Check size={12}/>:<Copy size={12}/>} {copied?"Copied":"Copy"}</button></div></div><div className="info-grid"><div className="info"><b>License</b><span>{font.license}</span></div><div className="info"><b>Styles</b><span>{font.styles.join(" · ")}</span></div><div className="info"><b>Weights</b><span>{font.weights.join(", ")}</span></div><div className="info"><b>Variable</b><span>{font.variable?"Yes":"No"}</span></div></div><div className="language-strip">{font.scripts.map(s=><span className="pill" key={s}>{s}</span>)}</div><div className="notice">Font files are served by the upstream provider in this starter catalog. FontAtlas does not mirror proprietary font files. Review each font's license before redistribution or self-hosting.</div></div></div>
}

function LanguageView({setQuery,setScript,nav}:{setQuery:(v:string)=>void;setScript:(v:string)=>void;nav:(v:View)=>void}){return <><div className="hero-copy" style={{marginBottom:18}}><div className="eyebrow">Unicode coverage</div><h1 style={{fontSize:44}}>Find fonts for every script.</h1><p>Filter the catalog by script and test real language samples. Coverage is based on the catalog metadata.</p></div><div className="category-row" style={{gridTemplateColumns:"repeat(5,1fr)"}}>{scripts.map(s=><button className="category" key={s} onClick={()=>{setScript(s);setQuery("");nav("fonts")}}><Languages size={20}/><span className="cat-name">{s}</span></button>)}</div><div className="tool-section"><h2 style={{margin:0}}>Sample text</h2><p style={{color:"var(--muted)",fontSize:12}}>Malayalam: മലയാളം · Hindi: नमस्ते · Tamil: தமிழ் · Kannada: ಕನ್ನಡ · Telugu: తెలుగు</p></div></>}

function Playground({fonts,selected,setSelected,text,setText}:{fonts:Font[];selected:Font;setSelected:(f:Font)=>void;text:string;setText:(s:string)=>void}){const [heading,setHeading]=useState(selected);return <><div className="hero-copy" style={{marginBottom:18}}><div className="eyebrow">Typography playground</div><h1 style={{fontSize:44}}>Build a type system before you code.</h1><p>Try heading and body combinations with your own copy. Nothing is saved to a server.</p></div><div className="panel" style={{padding:20}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}><div><label className="meta">Heading font</label><select className="preview-input" value={heading.slug} onChange={e=>setHeading(fonts.find(f=>f.slug===e.target.value) || selected)}>{fonts.map(f=><option key={f.slug} value={f.slug}>{f.family}</option>)}</select></div><div><label className="meta">Body font</label><select className="preview-input" value={selected.slug} onChange={e=>setSelected(fonts.find(f=>f.slug===e.target.value) || selected)}>{fonts.map(f=><option key={f.slug} value={f.slug}>{f.family}</option>)}</select></div></div><textarea value={text} onChange={e=>setText(e.target.value)} style={{width:"100%",minHeight:90,marginTop:16,border:"1px solid var(--line)",borderRadius:9,padding:12,resize:"vertical"}}/><div style={{marginTop:25,padding:25,border:"1px solid var(--line)",borderRadius:12}}><div style={{fontFamily:`"${heading.family}"`,fontSize:"clamp(36px,6vw,76px)",fontWeight:700,lineHeight:.98,letterSpacing:-2}}>{text || "Build something remarkable."}</div><p style={{fontFamily:`"${selected.family}"`,fontSize:18,lineHeight:1.7,color:"#667085",maxWidth:700}}>{text || "Typography is part of the product. Test it before you ship it."}</p><button className="primary">Primary action</button></div></div></>}

function ToolsView({onUpload,selected,selectFont}:{onUpload:()=>void;selected:Font;selectFont:(f:Font)=>void}){return <><div className="hero-copy" style={{marginBottom:18}}><div className="eyebrow">Font tools</div><h1 style={{fontSize:44}}>Inspect. Test. Integrate.</h1><p>Useful typography utilities without an account.</p></div><div className="tool-grid"><ToolCard icon={<Upload/>} title="Local font tester" text="Load a font file in your browser and inspect it without uploading it." button="Open tester" onClick={onUpload}/><ToolCard icon={<Package/>} title="Glyph explorer" text="Browse the glyphs and Unicode information in the selected family." button="Open selected" onClick={()=>selectFont(selected)}/><ToolCard icon={<Code2/>} title="CSS generator" text="Generate @import, @font-face and framework snippets." button="Use font page" onClick={()=>selectFont(selected)}/><ToolCard icon={<Activity/>} title="Variable axes" text="Preview variable weight and other supported axes on compatible fonts." button="Try variable font" onClick={()=>selectFont(selected)}/></div><div className="tool-section"><h2 style={{marginTop:0}}>Selected font</h2><div style={{fontFamily:`"${selected.family}"`,fontSize:60}}>{selected.family}</div><div className="notice">The starter catalog intentionally links to official/open font sources instead of redistributing files without verified licensing.</div></div></>}

function ApiView({selected,code,copyCode,copied}:{selected:Font;code:string;copyCode:(v:string)=>void;copied:boolean}){return <><div className="hero-copy" style={{marginBottom:18}}><div className="eyebrow">Developer resources</div><h1 style={{fontSize:44}}>Fonts that are ready to ship.</h1><p>Use the public catalog API and generated CSS endpoints. No authentication is required.</p></div><div className="tool-grid"><ToolCard icon={<Code2/>} title="Catalog API" text="GET /api/fonts returns the complete catalog metadata." button="/api/fonts" onClick={()=>window.open('/api/fonts','_blank')}/><ToolCard icon={<FileText/>} title="Font API" text={`GET /api/fonts/${selected.slug} returns one font record.`} button="Open JSON" onClick={()=>window.open(`/api/fonts/${selected.slug}`,'_blank')}/><ToolCard icon={<Zap/>} title="CSS endpoint" text={`GET /api/css/${selected.slug} returns reusable CSS.`} button="Open CSS" onClick={()=>window.open(`/api/css/${selected.slug}`,'_blank')}/><ToolCard icon={<Globe2/>} title="Upstream CDN" text="The starter catalog uses Google Fonts for web font delivery." button="Selected font" onClick={()=>window.open(googleCssUrl(selected),'_blank')}/></div><div className="codebox" style={{marginTop:18}}><div className="code-row"><div className="code">{code}</div><button className="copy" onClick={()=>copyCode(code)}>{copied?"Copied":"Copy"}</button></div></div></>}

function Feature({icon,title,text}:{icon:React.ReactNode;title:string;text:string}){return <div className="tool"><div style={{color:"#2455c4"}}>{icon}</div><strong>{title}</strong><p>{text}</p></div>}
function ToolCard({icon,title,text,button,onClick}:{icon:React.ReactNode;title:string;text:string;button:string;onClick:()=>void}){return <div className="tool"><div style={{color:"#2455c4",marginBottom:8}}>{icon}</div><strong>{title}</strong><p>{text}</p><button className="side-item" style={{marginTop:9,paddingLeft:0}} onClick={onClick}>{button}<ChevronRight size={13}/></button></div>}
