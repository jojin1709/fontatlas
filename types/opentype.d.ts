declare module "opentype.js" {
  export interface Font {
    names: {
      fontFamily?: { [lang: string]: string };
      fontSubfamily?: { [lang: string]: string };
      designer?: { [lang: string]: string };
      license?: { [lang: string]: string };
      licenseURL?: { [lang: string]: string };
      manufacturer?: { [lang: string]: string };
      version?: { [lang: string]: string };
    };
    glyphs: any;
    tables: any;
    numGlyphs: number;
    unitsPerEm: number;
    ascender: number;
    descender: number;
  }

  export function parse(buffer: ArrayBuffer): Font;
  const opentype: { parse: typeof parse };
  export default opentype;
}
