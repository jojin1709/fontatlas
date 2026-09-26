/**
 * FontAtlas Phonetic Transliteration Engine
 * Converts QWERTY / English keystrokes into native Unicode scripts (Malayalam, Hindi, Tamil, etc.)
 */

export interface ScriptQuickWord {
  label: string;
  native: string;
}

export const scriptQuickWords: Record<string, ScriptQuickWord[]> = {
  Malayalam: [
    { label: "ambud", native: "അംബുദ്" },
    { label: "namaskaram", native: "നമസ്കാരം" },
    { label: "malayalam", native: "മലയാളം" },
    { label: "kerala", native: "കേരളം" },
    { label: "nandi", native: "നന്ദി" },
    { label: "sneham", native: "സ്നേഹം" },
  ],
  Devanagari: [
    { label: "namaste", native: "नमस्ते" },
    { label: "bharat", native: "भारत" },
    { label: "kitab", native: "किताब" },
    { label: "dhanyavad", native: "धन्यवाद" },
    { label: "shanti", native: "शान्ति" },
  ],
  Tamil: [
    { label: "vanakkam", native: "வணக்கம்" },
    { label: "tamil", native: "தமிழ்" },
    { label: "nandri", native: "நன்றி" },
    { label: "amma", native: "அம்மா" },
    { label: "anbu", native: "அன்பு" },
  ],
  Kannada: [
    { label: "namaskara", native: "ನಮಸ್ಕಾರ" },
    { label: "kannada", native: "ಕನ್ನಡ" },
    { label: "dhanyavada", native: "ಧನ್ಯವಾದ" },
    { label: "shanti", native: "ಶಾಂತಿ" },
  ],
  Telugu: [
    { label: "namaskaram", native: "నమస్కారం" },
    { label: "telugu", native: "తెలుగు" },
    { label: "dhanyavadalu", native: "ధన్యవాదాలు" },
    { label: "prema", native: "ప్రేమ" },
  ],
  Bengali: [
    { label: "namaskar", native: "নমস্কার" },
    { label: "bangla", native: "বাংলা" },
    { label: "dhonnobad", native: "ধন্যবাদ" },
    { label: "bhalobasha", native: "ভালোবাসা" },
  ],
  Gujarati: [
    { label: "namaste", native: "નમસ્તે" },
    { label: "gujarat", native: "ગુજરાત" },
    { label: "aabhar", native: "આભાર" },
  ],
  Gurmukhi: [
    { label: "sat sri akaal", native: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ" },
    { label: "punjab", native: "ਪੰਜਾਬ" },
    { label: "dhanvaad", native: "ਧੰਨਵਾਦ" },
  ],
  Greek: [
    { label: "kalimera", native: "καλημέρα" },
    { label: "efcharisto", native: "ευχαριστώ" },
    { label: "ellada", native: "Ελλάδα" },
  ],
  Cyrillic: [
    { label: "privet", native: "привет" },
    { label: "spasibo", native: "спасибо" },
    { label: "rossiya", native: "Россия" },
    { label: "mir", native: "мир" },
  ],
  Arabic: [
    { label: "salam", native: "سلام" },
    { label: "marhaban", native: "مرحبا" },
    { label: "shukran", native: "شكراً" },
  ],
  Hebrew: [
    { label: "shalom", native: "שלום" },
    { label: "toda", native: "תודה" },
    { label: "ahava", native: "אהבה" },
  ],
};

// ── Malayalam Phonetic Engine ─────────────────────────────────────
const mlVowels: Record<string, string> = {
  aa: "ആ", A: "ആ",
  ai: "ഐ",
  au: "ഔ", ou: "ഔ",
  a: "അ",
  ee: "ഈ", ii: "ഈ", I: "ഈ",
  i: "ഇ",
  oo: "ഊ", uu: "ഊ", U: "ഊ",
  u: "ഉ",
  ea: "ഏ", E: "ഏ",
  e: "എ",
  oa: "ഓ", O: "ഓ",
  o: "ഒ",
};

const mlMatras: Record<string, string> = {
  aa: "ാ", A: "ാ",
  ai: "ൈ",
  au: "ൗ", ou: "ൗ",
  a: "", // inherent vowel
  ee: "ീ", ii: "ീ", I: "ീ",
  i: "ി",
  oo: "ൂ", uu: "ൂ", U: "ൂ",
  u: "ു",
  ea: "േ", E: "േ",
  e: "െ",
  oa: "ോ", O: "ോ",
  o: "ൊ",
};

const mlConsonants: Record<string, string> = {
  nj: "ഞ്",
  ng: "ങ്",
  ch: "ച്",
  chh: "ഛ്",
  jh: "ഝ്",
  kh: "ഖ്",
  gh: "ഘ്",
  thh: "ഥ്",
  th: "ത്",
  dhh: "ധ്",
  dh: "ദ്",
  zh: "ഴ്",
  shh: "ഷ്",
  sh: "ശ്",
  ph: "ഫ്",
  bh: "ഭ്",
  k: "ക്",
  g: "ഗ്",
  j: "ജ്",
  t: "ത്",
  T: "ട്",
  d: "ദ്",
  D: "ഡ്",
  n: "ന്",
  N: "ണ്",
  p: "പ്",
  f: "ഫ്",
  b: "ബ്",
  m: "മ്",
  y: "യ്",
  r: "ര്",
  l: "ല്",
  v: "വ്",
  w: "വ്",
  s: "സ്",
  S: "ഷ്",
  h: "ഹ്",
  L: "ള്",
  R: "റ്",
};

const mlSpecials: Record<string, string> = {
  mb: "മ്പ",
  nd: "ണ്ട",
  nth: "ന്ത",
  nk: "ങ്ക",
  ng: "ങ്ങ",
  mm: "മ്മ",
  pp: "പ്പ",
  tt: "ത്ത",
  kk: "ക്ക",
  ll: "ല്ല",
};

export function transliterateMalayalam(input: string): string {
  let res = "";
  let i = 0;
  const n = input.length;

  while (i < n) {
    const ch = input[i];

    // Preserve whitespace & punctuation
    if (!/[a-zA-Z]/.test(ch)) {
      res += ch;
      i++;
      continue;
    }

    // Check special consonant clusters first (e.g. "mb", "nd", "nth")
    let matchedCluster = "";
    for (const cl of ["nth", "mb", "nd", "nk", "ng", "mm", "pp", "tt", "kk", "ll"]) {
      if (input.slice(i, i + cl.length).toLowerCase() === cl) {
        matchedCluster = cl;
        break;
      }
    }

    if (matchedCluster) {
      const base = mlSpecials[matchedCluster];
      i += matchedCluster.length;
      // Check for attached vowel
      let matchedVowel = "";
      for (const v of ["aa", "ai", "au", "ou", "ee", "ii", "oo", "uu", "ea", "oa", "a", "i", "u", "e", "o", "A", "I", "U", "E", "O"]) {
        if (input.slice(i, i + v.length) === v) {
          matchedVowel = v;
          break;
        }
      }
      if (matchedVowel) {
        res += base + mlMatras[matchedVowel];
        i += matchedVowel.length;
      } else {
        // Without vowel, add virama
        res += base + "്";
      }
      continue;
    }

    // Check consonant
    let matchedC = "";
    for (const c of ["ch", "chh", "jh", "kh", "gh", "thh", "th", "dhh", "dh", "zh", "shh", "sh", "ph", "bh", "nj", "ng", "k", "g", "j", "t", "T", "d", "D", "n", "N", "p", "f", "b", "m", "y", "r", "l", "v", "w", "s", "S", "h", "L", "R"]) {
      if (input.slice(i, i + c.length) === c) {
        matchedC = c;
        break;
      }
    }

    if (matchedC) {
      const baseWithVirama = mlConsonants[matchedC];
      const baseLetter = baseWithVirama.slice(0, 1);
      i += matchedC.length;

      // Check attached vowel
      let matchedV = "";
      for (const v of ["aa", "ai", "au", "ou", "ee", "ii", "oo", "uu", "ea", "oa", "a", "i", "u", "e", "o", "A", "I", "U", "E", "O"]) {
        if (input.slice(i, i + v.length) === v) {
          matchedV = v;
          break;
        }
      }

      if (matchedV) {
        // Has vowel
        res += baseLetter + mlMatras[matchedV];
        i += matchedV.length;
      } else {
        // No vowel follows -> Anusvara for 'm' at word boundary or before another consonant
        if (matchedC === "m") {
          res += "ം";
        } else {
          res += baseWithVirama;
        }
      }
      continue;
    }

    // Check independent vowel
    let matchedIndV = "";
    for (const v of ["aa", "ai", "au", "ou", "ee", "ii", "oo", "uu", "ea", "oa", "a", "i", "u", "e", "o", "A", "I", "U", "E", "O"]) {
      if (input.slice(i, i + v.length) === v) {
        matchedIndV = v;
        break;
      }
    }

    if (matchedIndV) {
      res += mlVowels[matchedIndV] || matchedIndV;
      i += matchedIndV.length;
      continue;
    }

    // Fallback
    res += ch;
    i++;
  }

  return res;
}

// ── Devanagari (Hindi / Marathi) Phonetic Engine ───────────────────
const devVowels: Record<string, string> = {
  aa: "आ", A: "आ", ai: "ऐ", au: "औ", a: "अ",
  ee: "ई", ii: "ई", I: "ई", i: "इ",
  oo: "ऊ", uu: "ऊ", U: "ऊ", u: "उ",
  e: "ए", E: "ए", o: "ओ", O: "ओ",
};
const devMatras: Record<string, string> = {
  aa: "ा", A: "ा", ai: "ै", au: "ौ", a: "",
  ee: "ी", ii: "ी", I: "ी", i: "ि",
  oo: "ू", uu: "ू", U: "ू", u: "ु",
  e: "े", E: "े", o: "ो", O: "ो",
};
const devConsonants: Record<string, string> = {
  kh: "ख्", gh: "घ्", ch: "च्", chh: "छ्", jh: "झ्",
  th: "थ्", dh: "ध्", ph: "फ्", bh: "भ्", sh: "श्",
  k: "क्", g: "ग्", j: "ज्", t: "त्", d: "द्",
  T: "ट्", D: "ड्", n: "न्", N: "ण्", p: "प्",
  f: "फ्", b: "ब्", m: "म्", y: "य्", r: "र्",
  l: "ल्", v: "व्", w: "व्", s: "स्", h: "ह्",
};

export function transliterateDevanagari(input: string): string {
  let res = "";
  let i = 0;
  const n = input.length;

  while (i < n) {
    const ch = input[i];
    if (!/[a-zA-Z]/.test(ch)) {
      res += ch;
      i++;
      continue;
    }

    let matchedC = "";
    for (const c of ["chh", "kh", "gh", "ch", "jh", "th", "dh", "ph", "bh", "sh", "k", "g", "j", "t", "d", "T", "D", "n", "N", "p", "f", "b", "m", "y", "r", "l", "v", "w", "s", "h"]) {
      if (input.slice(i, i + c.length) === c) {
        matchedC = c;
        break;
      }
    }

    if (matchedC) {
      const baseWithVirama = devConsonants[matchedC];
      const baseLetter = baseWithVirama.slice(0, 1);
      i += matchedC.length;

      let matchedV = "";
      for (const v of ["aa", "ai", "au", "ee", "ii", "oo", "uu", "a", "i", "u", "e", "o", "A", "I", "U", "E", "O"]) {
        if (input.slice(i, i + v.length) === v) {
          matchedV = v;
          break;
        }
      }

      if (matchedV) {
        res += baseLetter + devMatras[matchedV];
        i += matchedV.length;
      } else {
        res += baseWithVirama;
      }
      continue;
    }

    let matchedV = "";
    for (const v of ["aa", "ai", "au", "ee", "ii", "oo", "uu", "a", "i", "u", "e", "o", "A", "I", "U", "E", "O"]) {
      if (input.slice(i, i + v.length) === v) {
        matchedV = v;
        break;
      }
    }

    if (matchedV) {
      res += devVowels[matchedV] || matchedV;
      i += matchedV.length;
      continue;
    }

    res += ch;
    i++;
  }

  return res;
}

// ── Tamil Phonetic Engine ──────────────────────────────────────────
const taVowels: Record<string, string> = {
  aa: "ஆ", A: "ஆ", ai: "ஐ", au: "ஔ", a: "அ",
  ee: "ஈ", ii: "ஈ", I: "ஈ", i: "இ",
  oo: "ஊ", uu: "ஊ", U: "ஊ", u: "உ",
  e: "எ", E: "ஏ", o: "ஒ", O: "ஓ",
};
const taMatras: Record<string, string> = {
  aa: "ா", A: "ா", ai: "ை", au: "ௌ", a: "",
  ee: "ீ", ii: "ீ", I: "ீ", i: "ி",
  oo: "ூ", uu: "ூ", U: "ூ", u: "ு",
  e: "ெ", E: "ே", o: "ொ", O: "ோ",
};
const taConsonants: Record<string, string> = {
  th: "த்", dh: "த்", sh: "ஷ்", zh: "ழ்", ng: "ங்", nj: "ஞ்",
  k: "க்", g: "க்", c: "ச்", j: "ஜ்", s: "ஸ்",
  t: "ட்", d: "ட்", n: "ந்", N: "ண்", p: "ப்",
  b: "ப்", m: "ம்", y: "ய்", r: "ர்", l: "ல்",
  v: "வ்", w: "வ்", L: "ள்", R: "ற்", h: "ஹ்",
};

export function transliterateTamil(input: string): string {
  let res = "";
  let i = 0;
  const n = input.length;

  while (i < n) {
    const ch = input[i];
    if (!/[a-zA-Z]/.test(ch)) {
      res += ch;
      i++;
      continue;
    }

    let matchedC = "";
    for (const c of ["th", "dh", "sh", "zh", "ng", "nj", "k", "g", "c", "j", "s", "t", "d", "n", "N", "p", "b", "m", "y", "r", "l", "v", "w", "L", "R", "h"]) {
      if (input.slice(i, i + c.length) === c) {
        matchedC = c;
        break;
      }
    }

    if (matchedC) {
      const baseWithVirama = taConsonants[matchedC];
      const baseLetter = baseWithVirama.slice(0, 1);
      i += matchedC.length;

      let matchedV = "";
      for (const v of ["aa", "ai", "au", "ee", "ii", "oo", "uu", "a", "i", "u", "e", "o", "A", "I", "U", "E", "O"]) {
        if (input.slice(i, i + v.length) === v) {
          matchedV = v;
          break;
        }
      }

      if (matchedV) {
        res += baseLetter + taMatras[matchedV];
        i += matchedV.length;
      } else {
        res += baseWithVirama;
      }
      continue;
    }

    let matchedV = "";
    for (const v of ["aa", "ai", "au", "ee", "ii", "oo", "uu", "a", "i", "u", "e", "o", "A", "I", "U", "E", "O"]) {
      if (input.slice(i, i + v.length) === v) {
        matchedV = v;
        break;
      }
    }

    if (matchedV) {
      res += taVowels[matchedV] || matchedV;
      i += matchedV.length;
      continue;
    }

    res += ch;
    i++;
  }

  return res;
}

// ── Greek Phonetic Map ────────────────────────────────────────────
const greekMap: Record<string, string> = {
  th: "θ", ch: "χ", ps: "ψ",
  a: "α", b: "β", g: "γ", d: "δ", e: "ε", z: "ζ",
  i: "ι", k: "κ", l: "λ", m: "μ", n: "ν", x: "ξ",
  o: "ο", p: "π", r: "ρ", s: "σ", t: "τ", u: "υ",
  f: "φ", w: "ω", y: "υ",
};

export function transliterateGreek(input: string): string {
  let res = "";
  let i = 0;
  while (i < input.length) {
    if (input.slice(i, i + 2).toLowerCase() in greekMap) {
      res += greekMap[input.slice(i, i + 2).toLowerCase()];
      i += 2;
    } else {
      const lower = input[i].toLowerCase();
      res += greekMap[lower] || input[i];
      i++;
    }
  }
  return res;
}

// ── Cyrillic / Russian Phonetic Map ───────────────────────────────
const cyrillicMap: Record<string, string> = {
  shch: "щ", ch: "ч", sh: "ш", zh: "ж", yu: "ю", ya: "я", yo: "ё", ts: "ц",
  a: "а", b: "б", v: "в", g: "г", d: "д", e: "е", z: "з", i: "и",
  j: "й", k: "к", l: "л", m: "м", n: "н", o: "о", p: "п", r: "р",
  s: "с", t: "т", u: "у", f: "ф", h: "х", y: "ы",
};

export function transliterateCyrillic(input: string): string {
  let res = "";
  let i = 0;
  while (i < input.length) {
    for (const key of ["shch", "ch", "sh", "zh", "yu", "ya", "yo", "ts"]) {
      if (input.slice(i, i + key.length).toLowerCase() === key) {
        res += cyrillicMap[key];
        i += key.length;
        continue;
      }
    }
    const lower = input[i].toLowerCase();
    res += cyrillicMap[lower] || input[i];
    i++;
  }
  return res;
}

// ── Arabic Phonetic Map ───────────────────────────────────────────
const arabicMap: Record<string, string> = {
  sh: "ش", th: "ث", kh: "خ", dh: "ذ", gh: "غ",
  a: "ا", b: "ب", t: "ت", j: "ج", h: "ه", d: "د", r: "ر",
  z: "ز", s: "س", f: "ف", q: "ق", k: "ك", l: "ل", m: "م",
  n: "ن", w: "و", y: "ي", u: "و", i: "ي", o: "و",
};

export function transliterateArabic(input: string): string {
  let res = "";
  let i = 0;
  while (i < input.length) {
    if (input.slice(i, i + 2).toLowerCase() in arabicMap) {
      res += arabicMap[input.slice(i, i + 2).toLowerCase()];
      i += 2;
    } else {
      const lower = input[i].toLowerCase();
      res += arabicMap[lower] || input[i];
      i++;
    }
  }
  return res;
}

// ── Hebrew Phonetic Map ───────────────────────────────────────────
const hebrewMap: Record<string, string> = {
  sh: "ש", ch: "ח", tz: "צ",
  a: "א", b: "ב", v: "ו", g: "ג", d: "ד", h: "ה", z: "ז",
  t: "ת", y: "י", k: "כ", l: "ל", m: "מ", n: "נ", s: "ס",
  p: "פ", f: "פ", r: "ר",
};

export function transliterateHebrew(input: string): string {
  let res = "";
  let i = 0;
  while (i < input.length) {
    if (input.slice(i, i + 2).toLowerCase() in hebrewMap) {
      res += hebrewMap[input.slice(i, i + 2).toLowerCase()];
      i += 2;
    } else {
      const lower = input[i].toLowerCase();
      res += hebrewMap[lower] || input[i];
      i++;
    }
  }
  return res;
}

/**
 * Universal Phonetic Transliteration Router
 */
export function transliterateToScript(text: string, script: string): string {
  if (!text || script === "Latin") return text;

  switch (script) {
    case "Malayalam":
      return transliterateMalayalam(text);
    case "Devanagari":
      return transliterateDevanagari(text);
    case "Tamil":
      return transliterateTamil(text);
    case "Greek":
      return transliterateGreek(text);
    case "Cyrillic":
      return transliterateCyrillic(text);
    case "Arabic":
      return transliterateArabic(text);
    case "Hebrew":
      return transliterateHebrew(text);
    default:
      // For scripts with Indic structure, fallback to Devanagari or leave intact
      return text;
  }
}
