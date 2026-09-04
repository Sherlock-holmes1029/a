/** Central app configuration */

/** Target birthday date — October 2nd, 2026, midnight Amman time (UTC+3) */
export const TARGET_DATE =
  import.meta.env.VITE_TARGET_DATE || '2026-10-02T00:00:00+03:00';

/**
 * Login password — the exact Arabic phrase (with emojis) she calls you on Instagram.
 * Configured via VITE_PASSWORD in .env
 */
export const PASSWORD =
  import.meta.env.VITE_PASSWORD || 'YOUR_PASSWORD_HERE';

/**
 * 🛠️ Developer Configuration:
 * - DEV_BYPASS_COUNTDOWN: If true, reveals the bypass button on the countdown screen during development.
 * - DEV_AUTO_UNLOCK: If true, skips countdown & login completely to directly open the World Hub.
 */
export const DEV_BYPASS_COUNTDOWN =
  import.meta.env.VITE_DEV_BYPASS_COUNTDOWN === 'true' ||
  import.meta.env.VITE_DEV_BYPASS_COUNTDOWN === true;

export const DEV_AUTO_UNLOCK =
  import.meta.env.VITE_DEV_AUTO_UNLOCK === 'true' ||
  import.meta.env.VITE_DEV_AUTO_UNLOCK === true;

export type WorldId = 'waterfall' | 'black-iris' | 'beach' | 'memories' | 'atelier';

export interface WorldDef {
  id: WorldId;
  nameAr: string;
  nameEn: string;
  icon: string;
  gradient: string;
  description: string;
  coverImage?: string;
}

export const WORLDS: WorldDef[] = [
  {
    id: 'atelier',
    nameAr: 'أتيليه الذكريات والمرسم',
    nameEn: 'Atelier & Art Sanctuary',
    icon: '🎨',
    gradient: 'from-amber-950 via-stone-900 to-amber-900',
    description: 'لوحات الغد، أعمالها الفنية، ومعارك البكسل في مرسم ثلاثي الأبعاد',
    coverImage: '/assets/A project/a/draw 1.png',
  },
  {
    id: 'waterfall',
    nameAr: 'عالم الشلالات',
    nameEn: 'Waterfall World',
    icon: '💧',
    gradient: 'from-cyan-950 via-sky-900 to-teal-950',
    description: 'قصائد الشوق والدموع المتدفقة',
    coverImage: '/images/worlds/waterfall.jpg',
  },
  {
    id: 'black-iris',
    nameAr: 'عالم السوسنة السوداء',
    nameEn: 'Black Iris & Roses',
    icon: '🖤',
    gradient: 'from-purple-950 via-indigo-950 to-slate-950',
    description: 'قصائد الجمال النادر والوطن',
    coverImage: '/images/worlds/black-iris.jpg',
  },
  {
    id: 'beach',
    nameAr: 'عالم الشاطئ',
    nameEn: 'Beautiful Beach',
    icon: '🌊',
    gradient: 'from-amber-900 via-orange-950 to-sky-950',
    description: 'قصائد الأفق واللقاء',
    coverImage: '/images/worlds/beach.jpg',
  },
  {
    id: 'memories',
    nameAr: 'عالم الذكريات',
    nameEn: 'Our Memories',
    icon: '🎮',
    gradient: 'from-stone-950 via-amber-950 to-stone-900',
    description: 'ذكرياتنا في PUBG والبكسل آرت',
    coverImage: '/images/worlds/memories.jpg',
  },
];

