export type Font = {
  slug: string;
  family: string;
  designer: string;
  category: string;
  tags: string[];
  scripts: string[];
  weights: number[];
  variable: boolean;
  styles: string[];
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  googleFamily: string;
  description: string;
};

const g = (family: string) => encodeURIComponent(family).replace(/%20/g, "+");

export const fonts: Font[] = [
  { slug:"inter", family:"Inter", designer:"Rasmus Andersson", category:"Sans Serif", tags:["modern","clean","ui","professional"], scripts:["Latin","Greek","Cyrillic"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Inter", googleFamily:g("Inter"), description:"A clean, versatile typeface designed for screens and interfaces." },
  { slug:"roboto", family:"Roboto", designer:"Christian Robertson", category:"Sans Serif", tags:["neutral","ui","android","modern"], scripts:["Latin","Greek","Cyrillic"], weights:[100,300,400,500,700,900], variable:true, styles:["normal","italic"], license:"Apache License 2.0", licenseUrl:"https://www.apache.org/licenses/LICENSE-2.0", sourceUrl:"https://fonts.google.com/specimen/Roboto", googleFamily:g("Roboto"), description:"A highly readable neo-grotesque sans serif for interfaces and products." },
  { slug:"poppins", family:"Poppins", designer:"Indian Type Foundry", category:"Sans Serif", tags:["geometric","friendly","modern","rounded"], scripts:["Latin","Devanagari"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Poppins", googleFamily:g("Poppins"), description:"A geometric sans with a distinctive circular construction." },
  { slug:"montserrat", family:"Montserrat", designer:"Julieta Ulanovsky", category:"Sans Serif", tags:["geometric","bold","branding","display"], scripts:["Latin","Cyrillic","Vietnamese"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Montserrat", googleFamily:g("Montserrat"), description:"A contemporary geometric sans inspired by urban lettering." },
  { slug:"manrope", family:"Manrope", designer:"Michael Sharanda", category:"Sans Serif", tags:["minimal","modern","ui","soft"], scripts:["Latin","Cyrillic","Greek"], weights:[200,300,400,500,600,700,800], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Manrope", googleFamily:g("Manrope"), description:"A modern geometric grotesque with a soft, contemporary character." },
  { slug:"dm-sans", family:"DM Sans", designer:"Colophon Foundry", category:"Sans Serif", tags:["clean","ui","friendly","variable"], scripts:["Latin","Greek","Cyrillic"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/DM+Sans", googleFamily:g("DM Sans"), description:"A low-contrast geometric sans designed for interface text." },
  { slug:"outfit", family:"Outfit", designer:"Onlook", category:"Sans Serif", tags:["modern","geometric","display","startup"], scripts:["Latin","Vietnamese"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Outfit", googleFamily:g("Outfit"), description:"A geometric sans with expressive forms for interfaces and headlines." },
  { slug:"plus-jakarta-sans", family:"Plus Jakarta Sans", designer:"Tokotype", category:"Sans Serif", tags:["premium","ui","modern","editorial"], scripts:["Latin","Arabic","Vietnamese"], weights:[200,300,400,500,600,700,800], variable:true, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Plus+Jakarta+Sans", googleFamily:g("Plus Jakarta Sans"), description:"A contemporary sans family with broad language support." },
  { slug:"lato", family:"Lato", designer:"Łukasz Dziedzic", category:"Sans Serif", tags:["humanist","professional","readable"], scripts:["Latin","Greek","Cyrillic"], weights:[100,300,400,700,900], variable:false, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Lato", googleFamily:g("Lato"), description:"A humanist sans balancing warmth with a serious professional feel." },
  { slug:"nunito-sans", family:"Nunito Sans", designer:"Vernon Adams", category:"Sans Serif", tags:["rounded","friendly","ui","soft"], scripts:["Latin","Greek","Cyrillic"], weights:[200,300,400,500,600,700,800,900], variable:true, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Nunito+Sans", googleFamily:g("Nunito Sans"), description:"A rounded humanist sans suited to friendly interfaces." },
  { slug:"open-sans", family:"Open Sans", designer:"Steve Matteson", category:"Sans Serif", tags:["readable","ui","classic","neutral"], scripts:["Latin","Greek","Cyrillic"], weights:[300,400,500,600,700,800], variable:true, styles:["normal","italic"], license:"Apache License 2.0", licenseUrl:"https://www.apache.org/licenses/LICENSE-2.0", sourceUrl:"https://fonts.google.com/specimen/Open+Sans", googleFamily:g("Open Sans"), description:"A humanist sans optimized for legibility across interfaces and documents." },
  { slug:"source-sans-3", family:"Source Sans 3", designer:"Paul D. Hunt", category:"Sans Serif", tags:["editorial","ui","readable","open source"], scripts:["Latin","Greek","Cyrillic"], weights:[200,300,400,500,600,700,800,900], variable:true, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Source+Sans+3", googleFamily:g("Source Sans 3"), description:"Adobe's open-source sans family built for text-heavy interfaces." },
  { slug:"geist", family:"Geist", designer:"Vercel", category:"Sans Serif", tags:["minimal","ui","developer","modern"], scripts:["Latin","Greek","Cyrillic"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://vercel.com/font", googleFamily:g("Geist"), description:"A crisp sans designed for modern software interfaces." },
  { slug:"archivo", family:"Archivo", designer:"Omse", category:"Sans Serif", tags:["grotesk","business","ui","variable"], scripts:["Latin","Greek","Cyrillic"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Archivo", googleFamily:g("Archivo"), description:"A grotesque sans with a strong utility-oriented character." },
  { slug:"rubik", family:"Rubik", designer:"Philipp Hubert", category:"Sans Serif", tags:["rounded","friendly","modern","ui"], scripts:["Latin","Cyrillic","Hebrew"], weights:[300,400,500,600,700,800,900], variable:true, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Rubik", googleFamily:g("Rubik"), description:"A rounded sans with subtly rounded corners and approachable forms." },
  { slug:"work-sans", family:"Work Sans", designer:"Wei Huang", category:"Sans Serif", tags:["workhorse","ui","neutral","readable"], scripts:["Latin","Greek","Cyrillic"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Work+Sans", googleFamily:g("Work Sans"), description:"A versatile sans tuned for medium-sized text and UI work." },
  { slug:"roboto-slab", family:"Roboto Slab", designer:"Christian Robertson", category:"Slab Serif", tags:["slab","ui","editorial","robust"], scripts:["Latin","Greek","Cyrillic"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal"], license:"Apache License 2.0", licenseUrl:"https://www.apache.org/licenses/LICENSE-2.0", sourceUrl:"https://fonts.google.com/specimen/Roboto+Slab", googleFamily:g("Roboto Slab"), description:"A sturdy slab serif that works well for headings and interfaces." },
  { slug:"playfair-display", family:"Playfair Display", designer:"Claus Eggers Sørensen", category:"Serif", tags:["editorial","elegant","luxury","display"], scripts:["Latin","Cyrillic","Vietnamese"], weights:[400,500,600,700,800,900], variable:true, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Playfair+Display", googleFamily:g("Playfair Display"), description:"A high-contrast transitional serif designed for large display text." },
  { slug:"merriweather", family:"Merriweather", designer:"Eben Sorkin", category:"Serif", tags:["reading","editorial","classic","book"], scripts:["Latin","Cyrillic","Vietnamese"], weights:[300,400,700,900], variable:false, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Merriweather", googleFamily:g("Merriweather"), description:"A sturdy serif designed for comfortable reading on screens." },
  { slug:"libre-baskerville", family:"Libre Baskerville", designer:"Impallari Type", category:"Serif", tags:["book","classic","editorial","reading"], scripts:["Latin"], weights:[400,700], variable:false, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Libre+Baskerville", googleFamily:g("Libre Baskerville"), description:"A web-optimized revival of the classic Baskerville style." },
  { slug:"lora", family:"Lora", designer:"Cyreal", category:"Serif", tags:["editorial","calligraphic","reading"], scripts:["Latin","Cyrillic","Vietnamese"], weights:[400,500,600,700], variable:true, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Lora", googleFamily:g("Lora"), description:"A contemporary serif with calligraphic roots and strong reading texture." },
  { slug:"cormorant-garamond", family:"Cormorant Garamond", designer:"Christian Thalmann", category:"Serif", tags:["fashion","elegant","editorial","high contrast"], scripts:["Latin","Cyrillic","Vietnamese"], weights:[300,400,500,600,700], variable:true, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Cormorant+Garamond", googleFamily:g("Cormorant Garamond"), description:"An elegant display-oriented Garamond interpretation with expressive contrast." },
  { slug:"bitter", family:"Bitter", designer:"Sol Matas", category:"Slab Serif", tags:["slab","reading","friendly","editorial"], scripts:["Latin","Greek","Cyrillic"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Bitter", googleFamily:g("Bitter"), description:"A robust slab serif designed for digital reading." },
  { slug:"dm-mono", family:"DM Mono", designer:"Colophon Foundry", category:"Monospace", tags:["code","developer","terminal","technical"], scripts:["Latin","Greek","Cyrillic"], weights:[300,400,500], variable:false, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/DM+Mono", googleFamily:g("DM Mono"), description:"A compact monospaced family designed for code and technical UI." },
  { slug:"jetbrains-mono", family:"JetBrains Mono", designer:"Philipp Nurullin", category:"Monospace", tags:["code","developer","ligatures","terminal"], scripts:["Latin","Cyrillic","Greek","Hebrew"], weights:[100,200,300,400,500,600,700,800], variable:true, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/JetBrains+Mono", googleFamily:g("JetBrains Mono"), description:"A developer-focused monospace with increased character width for code readability." },
  { slug:"fira-code", family:"Fira Code", designer:"Nikita Prokopov", category:"Monospace", tags:["code","ligatures","developer","programming"], scripts:["Latin","Cyrillic","Greek"], weights:[300,400,500,600,700], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Fira+Code", googleFamily:g("Fira Code"), description:"A programming typeface with common multi-character programming ligatures." },
  { slug:"space-mono", family:"Space Mono", designer:"Colophon Foundry", category:"Monospace", tags:["technical","retro","code","display"], scripts:["Latin","Greek","Cyrillic"], weights:[400,700], variable:false, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Space+Mono", googleFamily:g("Space Mono"), description:"A distinctive fixed-width family with a technical editorial voice." },
  { slug:"orbitron", family:"Orbitron", designer:"Matt McInerney", category:"Display", tags:["futuristic","tech","geometric","display"], scripts:["Latin"], weights:[400,500,600,700,800,900], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Orbitron", googleFamily:g("Orbitron"), description:"A geometric display face inspired by technology and science fiction." },
  { slug:"bebas-neue", family:"Bebas Neue", designer:"Ryoichi Tsunekawa", category:"Display", tags:["condensed","poster","branding","bold"], scripts:["Latin"], weights:[400], variable:false, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Bebas+Neue", googleFamily:g("Bebas Neue"), description:"A condensed all-caps display face suited to posters and headlines." },
  { slug:"anton", family:"Anton", designer:"Vernon Adams", category:"Display", tags:["bold","condensed","headline","poster"], scripts:["Latin","Vietnamese"], weights:[400], variable:false, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Anton", googleFamily:g("Anton"), description:"A bold grotesque display face built for strong headlines." },
  { slug:"oswald", family:"Oswald", designer:"Vernon Adams", category:"Display", tags:["condensed","headline","editorial","bold"], scripts:["Latin","Cyrillic","Vietnamese"], weights:[200,300,400,500,600,700], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Oswald", googleFamily:g("Oswald"), description:"A reworking of classic gothic and grotesque typefaces for digital use." },
  { slug:"archivo-black", family:"Archivo Black", designer:"Omse", category:"Display", tags:["heavy","branding","poster","bold"], scripts:["Latin"], weights:[400], variable:false, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Archivo+Black", googleFamily:g("Archivo Black"), description:"An ultra-heavy grotesque for high-impact display typography." },
  { slug:"pacifico", family:"Pacifico", designer:"Vernon Adams", category:"Script", tags:["retro","handwritten","friendly","display"], scripts:["Latin","Cyrillic","Greek"], weights:[400], variable:false, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Pacifico", googleFamily:g("Pacifico"), description:"A playful brush script with a relaxed, hand-lettered character." },
  { slug:"great-vibes", family:"Great Vibes", designer:"Robert E. Leuschke", category:"Script", tags:["calligraphy","wedding","elegant","handwriting"], scripts:["Latin"], weights:[400], variable:false, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Great+Vibes", googleFamily:g("Great Vibes"), description:"A flowing formal script with connected calligraphic forms." },
  { slug:"caveat", family:"Caveat", designer:"Pablo Impallari", category:"Handwriting", tags:["handwritten","casual","notes","friendly"], scripts:["Latin","Cyrillic"], weights:[400,500,600,700], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Caveat", googleFamily:g("Caveat"), description:"A casual handwriting style suitable for annotations and personal notes." },
  { slug:"dancing-script", family:"Dancing Script", designer:"Impallari Type", category:"Handwriting", tags:["handwritten","casual","friendly","script"], scripts:["Latin","Vietnamese"], weights:[400,500,600,700], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Dancing+Script", googleFamily:g("Dancing Script"), description:"A lively handwritten script with an informal, personal rhythm." },
  { slug:"permanent-marker", family:"Permanent Marker", designer:"Font Diner", category:"Handwriting", tags:["marker","bold","poster","casual"], scripts:["Latin"], weights:[400], variable:false, styles:["normal"], license:"Apache License 2.0", licenseUrl:"https://www.apache.org/licenses/LICENSE-2.0", sourceUrl:"https://fonts.google.com/specimen/Permanent+Marker", googleFamily:g("Permanent Marker"), description:"A bold marker-style handwriting face with a casual poster feel." },
  { slug:"press-start-2p", family:"Press Start 2P", designer:"CodeMan38", category:"Pixel", tags:["pixel","retro","game","arcade"], scripts:["Latin","Cyrillic","Greek"], weights:[400], variable:false, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Press+Start+2P", googleFamily:g("Press Start 2P"), description:"A bitmap-inspired display face referencing classic arcade games." },
  { slug:"silkscreen", family:"Silkscreen", designer:"Jason Kottke", category:"Pixel", tags:["pixel","bitmap","retro","ui"], scripts:["Latin"], weights:[400,700], variable:false, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Silkscreen", googleFamily:g("Silkscreen"), description:"A compact pixel display face designed for digital interfaces." },
  { slug:"unifrakturcook", family:"UnifrakturCook", designer:"Jörg Petri", category:"Blackletter", tags:["blackletter","gothic","historical","display"], scripts:["Latin"], weights:[400,700], variable:false, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/UnifrakturCook", googleFamily:g("UnifrakturCook"), description:"A blackletter display face with traditional gothic forms." },
  { slug:"comfortaa", family:"Comfortaa", designer:"Johan Aakerlund", category:"Sans Serif", tags:["rounded","friendly","display","soft"], scripts:["Latin","Cyrillic","Greek","Vietnamese"], weights:[300,400,500,600,700], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Comfortaa", googleFamily:g("Comfortaa"), description:"A rounded geometric face with a soft, friendly personality." },
  { slug:"alfa-slab-one", family:"Alfa Slab One", designer:"JM Solé", category:"Slab Serif", tags:["slab","display","bold","retro"], scripts:["Latin","Vietnamese"], weights:[400], variable:false, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Alfa+Slab+One", googleFamily:g("Alfa Slab One"), description:"A heavy slab serif with a strong poster and advertising character." },
  { slug:"archivo-narrow", family:"Archivo Narrow", designer:"Omse", category:"Sans Serif", tags:["narrow","compact","ui","editorial"], scripts:["Latin","Greek","Cyrillic"], weights:[400,500,600,700], variable:true, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Archivo+Narrow", googleFamily:g("Archivo Narrow"), description:"A narrow grotesque optimized for compact layouts and headlines." },
  { slug:"noto-sans-malayalam", family:"Noto Sans Malayalam", designer:"Google", category:"Sans Serif", tags:["malayalam","multilingual","ui","unicode"], scripts:["Malayalam"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Noto+Sans+Malayalam", googleFamily:g("Noto Sans Malayalam"), description:"A Malayalam sans-serif family from the Noto collection." },
  { slug:"noto-serif-malayalam", family:"Noto Serif Malayalam", designer:"Google", category:"Serif", tags:["malayalam","multilingual","editorial","unicode"], scripts:["Malayalam"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Noto+Serif+Malayalam", googleFamily:g("Noto Serif Malayalam"), description:"A Malayalam serif family for reading and editorial layouts." },
  { slug:"noto-sans-devanagari", family:"Noto Sans Devanagari", designer:"Google", category:"Sans Serif", tags:["devanagari","multilingual","unicode","ui"], scripts:["Devanagari"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Noto+Sans+Devanagari", googleFamily:g("Noto Sans Devanagari"), description:"A Devanagari sans-serif family in the Noto collection." },
  { slug:"noto-sans-tamil", family:"Noto Sans Tamil", designer:"Google", category:"Sans Serif", tags:["tamil","multilingual","unicode","ui"], scripts:["Tamil"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Noto+Sans+Tamil", googleFamily:g("Noto Sans Tamil"), description:"A Tamil sans-serif family designed for broad Unicode coverage." },
  { slug:"noto-sans-kannada", family:"Noto Sans Kannada", designer:"Google", category:"Sans Serif", tags:["kannada","multilingual","unicode","ui"], scripts:["Kannada"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Noto+Sans+Kannada", googleFamily:g("Noto Sans Kannada"), description:"A Kannada sans-serif family from the Noto collection." },
  { slug:"noto-sans-telugu", family:"Noto Sans Telugu", designer:"Google", category:"Sans Serif", tags:["telugu","multilingual","unicode","ui"], scripts:["Telugu"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Noto+Sans+Telugu", googleFamily:g("Noto Sans Telugu"), description:"A Telugu sans-serif family from the Noto collection." },
  { slug:"ibm-plex-sans", family:"IBM Plex Sans", designer:"Mike Abbink", category:"Sans Serif", tags:["corporate","technical","ui","professional"], scripts:["Latin","Greek","Cyrillic","Arabic","Hebrew"], weights:[100,200,300,400,500,600,700], variable:false, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/IBM+Plex+Sans", googleFamily:g("IBM Plex Sans"), description:"A corporate type family designed for clarity across technical contexts." },
  { slug:"source-code-pro", family:"Source Code Pro", designer:"Paul D. Hunt", category:"Monospace", tags:["code","developer","terminal","adobe"], scripts:["Latin","Greek","Cyrillic"], weights:[200,300,400,500,600,700,800,900], variable:true, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Source+Code+Pro", googleFamily:g("Source Code Pro"), description:"Adobe's open-source monospaced typeface for coding environments." },
  { slug:"quicksand", family:"Quicksand", designer:"Andrew Paglinawan", category:"Sans Serif", tags:["rounded","friendly","geometric","display"], scripts:["Latin","Vietnamese"], weights:[300,400,500,600,700], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Quicksand", googleFamily:g("Quicksand"), description:"A rounded geometric sans with a light, approachable feel." },
  { slug:"noto-sans-bengali", family:"Noto Sans Bengali", designer:"Google", category:"Sans Serif", tags:["bengali","multilingual","unicode","ui"], scripts:["Bengali"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Noto+Sans+Bengali", googleFamily:g("Noto Sans Bengali"), description:"A Bengali sans-serif family designed for clear digital reading." },
  { slug:"noto-sans-gujarati", family:"Noto Sans Gujarati", designer:"Google", category:"Sans Serif", tags:["gujarati","multilingual","unicode","ui"], scripts:["Gujarati"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Noto+Sans+Gujarati", googleFamily:g("Noto Sans Gujarati"), description:"A Gujarati sans-serif family in the Noto collection." },
  { slug:"noto-sans-gurmukhi", family:"Noto Sans Gurmukhi", designer:"Google", category:"Sans Serif", tags:["gurmukhi","punjabi","multilingual","unicode"], scripts:["Gurmukhi"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Noto+Sans+Gurmukhi", googleFamily:g("Noto Sans Gurmukhi"), description:"A Gurmukhi sans-serif family designed for high legibility." },
  { slug:"noto-sans-thai", family:"Noto Sans Thai", designer:"Google", category:"Sans Serif", tags:["thai","multilingual","unicode","ui"], scripts:["Thai"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Noto+Sans+Thai", googleFamily:g("Noto Sans Thai"), description:"A Thai sans-serif family suitable for user interfaces." },
  { slug:"noto-sans-georgian", family:"Noto Sans Georgian", designer:"Google", category:"Sans Serif", tags:["georgian","multilingual","unicode","ui"], scripts:["Georgian"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Noto+Sans+Georgian", googleFamily:g("Noto Sans Georgian"), description:"A Georgian sans-serif family covering the complete Georgian script." },
  { slug:"noto-sans-armenian", family:"Noto Sans Armenian", designer:"Google", category:"Sans Serif", tags:["armenian","multilingual","unicode","ui"], scripts:["Armenian"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Noto+Sans+Armenian", googleFamily:g("Noto Sans Armenian"), description:"An Armenian sans-serif family designed for interface harmony." },
  { slug:"gayathri", family:"Gayathri", designer:"SMC", category:"Sans Serif", tags:["malayalam","kerala","unicode","reading"], scripts:["Malayalam"], weights:[100,400,700], variable:false, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Gayathri", googleFamily:g("Gayathri"), description:"A gentle and readable Malayalam typeface designed for long-form reading." },
  { slug:"manjari", family:"Manjari", designer:"Santhosh Thottingal", category:"Sans Serif", tags:["malayalam","rounded","modern","ui"], scripts:["Malayalam"], weights:[100,400,700], variable:false, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Manjari", googleFamily:g("Manjari"), description:"A modern rounded Malayalam sans-serif optimized for screens." },
  { slug:"chilanka", family:"Chilanka", designer:"Santhosh Thottingal", category:"Handwriting", tags:["malayalam","handwriting","casual","script"], scripts:["Malayalam"], weights:[400], variable:false, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Chilanka", googleFamily:g("Chilanka"), description:"A lively, organic handwritten Malayalam typeface." },
  { slug:"anek-malayalam", family:"Anek Malayalam", designer:"Ek Type", category:"Sans Serif", tags:["malayalam","variable","modern","branding"], scripts:["Malayalam"], weights:[100,200,300,400,500,600,700,800], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Anek+Malayalam", googleFamily:g("Anek Malayalam"), description:"A versatile, contemporary Malayalam type family with expressive weights." },
  { slug:"anek-tamil", family:"Anek Tamil", designer:"Ek Type", category:"Sans Serif", tags:["tamil","variable","modern","ui"], scripts:["Tamil"], weights:[100,200,300,400,500,600,700,800], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Anek+Tamil", googleFamily:g("Anek Tamil"), description:"A bold, adaptable Tamil variable typeface for headlines and branding." },
  { slug:"mukta-malar", family:"Mukta Malar", designer:"Ek Type", category:"Sans Serif", tags:["tamil","clean","readable","modern"], scripts:["Tamil"], weights:[200,300,400,500,600,700,800], variable:false, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Mukta+Malar", googleFamily:g("Mukta Malar"), description:"A contemporary Tamil humanist sans-serif with excellent legibility." },
  { slug:"anek-telugu", family:"Anek Telugu", designer:"Ek Type", category:"Sans Serif", tags:["telugu","variable","modern","display"], scripts:["Telugu"], weights:[100,200,300,400,500,600,700,800], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Anek+Telugu", googleFamily:g("Anek Telugu"), description:"An expressive Telugu variable font tuned for screen display." },
  { slug:"anek-kannada", family:"Anek Kannada", designer:"Ek Type", category:"Sans Serif", tags:["kannada","variable","modern","ui"], scripts:["Kannada"], weights:[100,200,300,400,500,600,700,800], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Anek+Kannada", googleFamily:g("Anek Kannada"), description:"A contemporary Kannada variable typeface family for web and print." },
  { slug:"anek-bangla", family:"Anek Bangla", designer:"Ek Type", category:"Sans Serif", tags:["bengali","variable","modern","branding"], scripts:["Bengali"], weights:[100,200,300,400,500,600,700,800], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Anek+Bangla", googleFamily:g("Anek Bangla"), description:"An expressive Bengali variable font with extensive typographic weight." },
  { slug:"anek-gujarati", family:"Anek Gujarati", designer:"Ek Type", category:"Sans Serif", tags:["gujarati","variable","modern","ui"], scripts:["Gujarati"], weights:[100,200,300,400,500,600,700,800], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Anek+Gujarati", googleFamily:g("Anek Gujarati"), description:"A versatile Gujarati variable typeface engineered for clarity." },
  { slug:"anek-gurmukhi", family:"Anek Gurmukhi", designer:"Ek Type", category:"Sans Serif", tags:["gurmukhi","punjabi","variable","modern"], scripts:["Gurmukhi"], weights:[100,200,300,400,500,600,700,800], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Anek+Gurmukhi", googleFamily:g("Anek Gurmukhi"), description:"A flexible Gurmukhi variable typeface for digital interfaces." },
  { slug:"mukta", family:"Mukta", designer:"Ek Type", category:"Sans Serif", tags:["devanagari","hindi","clean","modern"], scripts:["Devanagari"], weights:[200,300,400,500,600,700,800], variable:false, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Mukta", googleFamily:g("Mukta"), description:"A versatile Devanagari sans-serif family for digital typography." },
  { slug:"cairo", family:"Cairo", designer:"Mohamed Gaber", category:"Sans Serif", tags:["arabic","modern","branding","ui"], scripts:["Arabic"], weights:[200,300,400,500,600,700,800,900], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Cairo", googleFamily:g("Cairo"), description:"A contemporary Arabic typeface with wide geographic appeal." },
  { slug:"amiri", family:"Amiri", designer:"Khaled Hosny", category:"Serif", tags:["arabic","naskh","classic","editorial"], scripts:["Arabic"], weights:[400,700], variable:false, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Amiri", googleFamily:g("Amiri"), description:"A classical Arabic typeface in the Naskh style for fine book typography." },
  { slug:"heebo", family:"Heebo", designer:"Oded Ezer", category:"Sans Serif", tags:["hebrew","modern","clean","ui"], scripts:["Hebrew"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Heebo", googleFamily:g("Heebo"), description:"A clean Hebrew and Latin typeface designed for digital readability." },
  { slug:"kanit", family:"Kanit", designer:"Cadson Demak", category:"Sans Serif", tags:["thai","modern","geometric","ui"], scripts:["Thai"], weights:[100,200,300,400,500,600,700,800,900], variable:true, styles:["normal","italic"], license:"SIL Open Font License 1.1", licenseUrl:"https://scripts.sil.org/OFL", sourceUrl:"https://fonts.google.com/specimen/Kanit", googleFamily:g("Kanit"), description:"A modern geometric Thai typeface with warm personality." }
];

export const categories = ["Sans Serif","Serif","Slab Serif","Monospace","Display","Handwriting","Script","Blackletter","Pixel"];
export const scripts = ["Latin","Greek","Cyrillic","Arabic","Hebrew","Devanagari","Bengali","Gujarati","Gurmukhi","Kannada","Malayalam","Tamil","Telugu","Thai","Georgian","Armenian","Vietnamese"];

export function getFont(slug: string) { return fonts.find((f) => f.slug === slug); }

export function getFontFallback(category: string): string {
  switch (category) {
    case "Serif":
    case "Slab Serif":
      return "serif";
    case "Monospace":
      return "monospace";
    case "Handwriting":
    case "Script":
      return "cursive";
    default:
      return "sans-serif";
  }
}

export function googleCssUrl(font: Font, weights?: number[]) {
  if (!font.googleFamily) return "";
  const selected = weights?.length ? weights : font.weights;
  const unique = [...new Set(selected)].sort((a,b)=>a-b);
  const axis = unique.join(";");
  const family = font.googleFamily;
  return `https://fonts.googleapis.com/css2?family=${family}:wght@${axis}&display=swap`;
}

export const scriptSpecimens: Record<string, { nativeName: string; char: string; text: string; phrase: string; alphabet: string; numerals: string }> = {
  Malayalam: {
    nativeName: "മലയാളം",
    char: "അ",
    text: "മനോഹരമായ മലയാളം ലിപി രൂപകൽപ്പന.",
    phrase: "എല്ലാ മനുഷ്യരും തുല്യാവകാശങ്ങളോടെ സ്വതന്ത്രരായി ജനിക്കുന്നു.",
    alphabet: "അ ആ ഇ ഈ ഉ ഊ ഋ എ ഏ ഐ ഒ ഓ ഔ ക ഖ ഗ ഘ ങ ച ഛ ജ ഝ ഞ ട ഠ ഡ ഢ ണ ത ഥ ദ ധ ന പ ഫ ബ ഭ മ യ ര ല വ ശ ഷ സ ഹ ള ഴ റ",
    numerals: "൦ ൧ ൨ ൩ ൪ ൫ ൬ ൭ ൮ ൯"
  },
  Devanagari: {
    nativeName: "हिन्दी / देवनागरी",
    char: "अ",
    text: "सुंदर और सुस्पष्ट देवनागरी लिपि।",
    phrase: "सभी मनुष्य जन्म से स्वतंत्र और समान अधिकार वाले हैं।",
    alphabet: "अ आ इ ई उ ऊ ऋ ए ऐ ओ औ क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह",
    numerals: "० १ २ ३ ४ ५ ६ ७ ८ ९"
  },
  Tamil: {
    nativeName: "தமிழ்",
    char: "அ",
    text: "அழகான தமிழ் எழுத்து வடிவமைப்பு.",
    phrase: "மனிதர்கள் அனைவரும் சுதந்திரமாகவே பிறக்கின்றனர்.",
    alphabet: "அ ஆ இ ஈ உ ஊ எ ஏ ஐ ஒ ஓ ஔ க ங ச ஞ ட ண த ந ப ம ய ர ல வ ழ ள ற ன",
    numerals: "௦ ௧ ௨ ௩ ௪ ௫ ௬ ௭ ௮ ௯"
  },
  Kannada: {
    nativeName: "ಕನ್ನಡ",
    char: "ಅ",
    text: "ಸುಂದರವಾದ ಕನ್ನಡ ಲಿಪಿ ವಿನ್ಯಾಸ.",
    phrase: "ಎಲ್ಲಾ ಮಾನವರೂ ಸ್ವತಂತ್ರವಾಗಿ ಸಮಾನ ಗೌರವದಿಂದ ಜನಿಸಿದ್ದಾರೆ.",
    alphabet: "ಅ ಆ ಇ ಈ ಉ ಊ ಋ ಎ ಏ ಐ ಒ ಓ ಔ ಕ ಖ ಗ ಘ ಙ ಚ ಛ ಜ ಝ ಞ ಟ ಠ ಡ ಢ ಣ ತ ಥ ದ ಧ ನ ಪ ಫ ಬ ಭ ಮ ಯ ರ ಲ ವ ಶ ಷ ಸ ಹ ಳ",
    numerals: "೦ ೧ ೨ ೩ ೪ ೫ ೬ ೭ ೮ ೯"
  },
  Telugu: {
    nativeName: "తెలుగు",
    char: "అ",
    text: "అందమైన తెలుగు లిపి నమూనా.",
    phrase: "మానవులందరూ పుట్టుకతోనే స్వతంత్రులు మరియు సమానులు.",
    alphabet: "అ ఆ ఇ ఈ ఉ ఊ ఋ ఎ ఏ ఐ ఒ ఓ ఔ క ఖ గ ఘ ఙ చ ఛ జ ఝ ఞ ట ఠ డ ఢ ణ త థ ద ధ న ప ఫ బ భ మ య ర ల వ శ ష స హ ళ",
    numerals: "౦ ౧ ౨ ౩ ౪ ౫ ౬ ౭ ౮ ౯"
  },
  Bengali: {
    nativeName: "বাংলা",
    char: "অ",
    text: "সুন্দর ও স্পষ্ট বাংলা লিপি টাইপোগ্রাফি।",
    phrase: "সমস্ত মানুষ স্বাধীনভাবে সমান মর্যাদা নিয়ে জন্মগ্রহণ করে।",
    alphabet: "অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ ক খ গ ঘ ঙ চ ছ জ ঝ ঞ ট ঠ ড ঢ ণ ত থ দ ধ ন প ফ ব ভ ম য র ল শ ষ স হ",
    numerals: "০ ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯"
  },
  Gujarati: {
    nativeName: "ગુજરાતી",
    char: "અ",
    text: "સુંદર અને સ્પષ્ટ ગુજરાતી લિપિ ડિઝાઇન.",
    phrase: "બધા મનુષ્યો જન્મથી સ્વતંત્ર અને સમાન છે.",
    alphabet: "અ આ ઇ ઈ ઉ ઊ ઋ એ ઐ ઓ ઔ ક ખ ગ ઘ ઙ ચ છ જ ઝ ઞ ટ ઠ ડ ઢ ણ ત થ દ ધ ન પ ફ બ ભ મ ય ર લ વ શ ષ સ હ",
    numerals: "૦ ૧ ૨ ૩ ૪ ૫ ૬ ૭ ૮ ૯"
  },
  Gurmukhi: {
    nativeName: "ਪੰਜਾਬੀ / ਗੁਰਮੁਖੀ",
    char: "ਅ",
    text: "ਸੁੰਦਰ ਅਤੇ ਸਪੱਸ਼ਟ ਗੁਰਮੁਖੀ ਲਿਪੀ।",
    phrase: "ਸਾਰੇ ਮਨੁੱਖ ਆਜ਼ਾਦ ਅਤੇ ਬਰਾਬਰ ਸਨਮਾਨ ਨਾਲ ਪੈਦਾ ਹੋਏ ਹਨ।",
    alphabet: "ਅ ਆ ਇ ਈ ਉ ਊ ਏ ਐ ਓ ਔ ਕ ਖ ਗ ਘ ਙ ਚ ਛ ਜ ਝ ਞ ਟ ਠ ਡ ਢ ਣ ਤ ਥ ਦ ਧ ਨ ਪ ਫ ਬ ਭ ਮ ਯ ਰ ਲ ਵ ੜ",
    numerals: "੦ ੧ ੨ ੩ ੪ ੫ ੬ ੭ ੮ ੯"
  },
  Thai: {
    nativeName: "ไทย",
    char: "ก",
    text: "การออกแบบตัวอักษรไทยที่สวยงามและชัดเจน",
    phrase: "มนุษย์ทั้งปวงเกิดมามีอิสระและเสมอภาคกันในศักดิ์ศรี",
    alphabet: "ก ข ฃ ค ฅ ฆ ง จ ฉ ช ซ ฌ ญ ฎ ฏ ฐ ฑ ฒ ณ ด ต ถ ท ธ น บ ป ผ ฝ พ ฟ ภ ม ย ร ล ว ศ ษ ส ห ฬ อ ฮ",
    numerals: "๐ ๑ ๒ ๓ ๔ ๕ ๖ ๗ ฃ ๙"
  },
  Georgian: {
    nativeName: "ქართული",
    char: "ა",
    text: "დახვეწილი და მკაფიო ქართული დამწერლობა.",
    phrase: "ყველა ადამიანი იბადება თავისუფალი და თანასწორი.",
    alphabet: "ა ბ გ დ ე ვ ზ თ ი კ ლ მ ნ ო პ ჟ რ ს ტ უ ფ ქ ღ ყ შ ჩ ც ძ წ ჭ ხ ჯ ჰ",
    numerals: "1 2 3 4 5 6 7 8 9 0"
  },
  Armenian: {
    nativeName: "Հայերեն",
    char: "Ա",
    text: "Գեղեցիկ և հստակ հայերեն տառատեսակ։",
    phrase: "Բոլոր մարդիկ ծնվում են ազատ ու հավասար։",
    alphabet: "Ա Բ Գ Դ Ե Զ Է Ը Թ Ժ Ի Լ Խ Ծ Կ Հ Ձ Ղ Ճ Մ Յ Ն Շ Ո Չ Պ Ջ Ռ Ս Վ Տ Ր Ց Ւ Փ Ք Օ Ֆ",
    numerals: "1 2 3 4 5 6 7 8 9 0"
  },
  Arabic: {
    nativeName: "العربية",
    char: "ض",
    text: "تصميم خط عربي أنيق وواضح للقراءة الرقمية.",
    phrase: "يولد جميع الناس أحراراً ومتساوين في الكرامة والحقوق.",
    alphabet: "أ ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن هـ و ي",
    numerals: "٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩"
  },
  Hebrew: {
    nativeName: "עִברִית",
    char: "א",
    text: "עיצוב טיපוגרפי עברי מודרני וקריא.",
    phrase: "כל בני אדם נולדו בני חורין ושווים בערכם ובזכויותיהם.",
    alphabet: "א ב ג ד ה ו ז ח ט י כ ל מ נ ס ע פ צ ק ר ש ת",
    numerals: "1 2 3 4 5 6 7 8 9 0"
  },
  Greek: {
    nativeName: "Ελληνικά",
    char: "Ω",
    text: "Κομψή και ευανάγνωστη ελληνική τυπογραφία.",
    phrase: "Όλοι οι άνθρωποι γεννιούνται ελεύθεροι και ίσοι στην αξιοπρέπεια.",
    alphabet: "Α Β Γ Δ Ε Ζ Η Θ Ι Κ Λ Μ Ν Ξ Ο Π Ρ Σ Τ Υ Φ Χ Ψ Ω α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ σ τ υ φ χ ψ ω",
    numerals: "1 2 3 4 5 6 7 8 9 0"
  },
  Cyrillic: {
    nativeName: "Кириллица",
    char: "Ж",
    text: "Выразительная и чистая кириллическая типографика.",
    phrase: "Все люди рождаются свободными и равными в своем достоинстве.",
    alphabet: "А Б В Г Д Е Ж З И Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ъ Ы Ь Э Ю Я а б в г д е ж з и й к л м н о п р с т у ф х ц ч ш щ ъ ы ь э ю я",
    numerals: "1 2 3 4 5 6 7 8 9 0"
  },
  Vietnamese: {
    nativeName: "Tiếng Việt",
    char: "Ơ",
    text: "Kiểu chữ tiếng Việt hiện đại và trang nhã.",
    phrase: "Tất cả mọi người sinh ra đều được tự do và bình đẳng.",
    alphabet: "A Ă Â B C D Đ E Ê G H I K L M N O Ô Ơ P Q R S T U Ư V X Y a ă â b c d đ e ê g h i k l m n o ô ơ p q r s t u ư v x y",
    numerals: "0 1 2 3 4 5 6 7 8 9"
  },
  Latin: {
    nativeName: "Latin / English",
    char: "Aa",
    text: "The quick brown fox jumps over the lazy dog.",
    phrase: "Almost before we knew it, we had left the ground.",
    alphabet: "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z",
    numerals: "0 1 2 3 4 5 6 7 8 9 ! @ # $ % & *"
  }
};

export function getFontPrimaryScript(font: Font, activeFilterScript?: string): string {
  if (activeFilterScript && font.scripts.includes(activeFilterScript)) {
    return activeFilterScript;
  }
  const nonLatin = font.scripts.find((s) => s !== "Latin");
  if (nonLatin) return nonLatin;
  return font.scripts[0] || "Latin";
}

export function getFontSampleChar(font: Font, activeFilterScript?: string): string {
  if (font.slug === "press-start-2p") return "▪▪";
  const script = getFontPrimaryScript(font, activeFilterScript);
  return scriptSpecimens[script]?.char || "Aa";
}

export function getFontDefaultText(font: Font, activeFilterScript?: string): string {
  const script = getFontPrimaryScript(font, activeFilterScript);
  return scriptSpecimens[script]?.text || "The quick brown fox jumps over the lazy dog.";
}
