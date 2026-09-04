export type GalleryCategory = 'future' | 'her-art' | 'pixel-pubg';

export type PaletteMoodColor = 
  | 'all'
  | 'burnt-sienna' 
  | 'ochre-gold' 
  | 'lapis' 
  | 'emerald' 
  | 'umber';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  imageSrc: string; // Pre-wired to /assets/A project/...
  medium: string;
  description: string;
  date?: string;
  paletteColor?: PaletteMoodColor;
  stats?: { label: string; value: string }[];
  quote?: string;
}

export interface PaletteMoodDef {
  id: PaletteMoodColor;
  nameAr: string;
  nameEn: string;
  hex: string;
  secondaryHex: string;
  glowColor: string;
  categoryMatch?: GalleryCategory;
}
