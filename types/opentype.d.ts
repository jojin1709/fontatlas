declare module "opentype.js" {
  interface Font {
    names: {
      fontFamily?: { en?: string };
      fontSubfamily?: { en?: string };
    };
    glyphs: any;
    tables: any;
    numGlyphs: number;
  }

  function parse(buffer: ArrayBuffer): Font;
}
