export interface JunglePhoto {
  id: number;
  title: string;
  caption: string;
  captionSub?: string;
  src?: string;
  placeholderGradient: string;
  position: {
    x: number; // percentage from left
    y: number; // percentage from top of section
  };
  symbol: string;
}

export const junglePhotos: JunglePhoto[] = [
  {
    id: 1,
    title: 'لحظة أولى من الإشراق',
    caption: 'كل ابتسامة لكِ هي ربيع يتفتح وسط الغابة المسحورة.',
    captionSub: '[مكان صورة ١ — اسحبي صورتكِ الحقيقية هنا]',
    placeholderGradient: 'from-emerald-800 via-teal-900 to-emerald-950',
    position: { x: 22, y: 28 },
    symbol: '🌸',
  },
  {
    id: 2,
    title: 'أوراق الشجر الخضراء',
    caption: 'حضوركِ يضفي دفئاً وسكينة كهدوء الطبيعة العذراء.',
    captionSub: '[مكان صورة ٢ — اسحبي صورتكِ الحقيقية هنا]',
    placeholderGradient: 'from-green-800 via-emerald-900 to-teal-950',
    position: { x: 74, y: 32 },
    symbol: '🍃',
  },
  {
    id: 3,
    title: 'ضياء الشلال المتلألئ',
    caption: 'كما يتدفق الماء الصافي، يتدفق لطفكِ ونقاؤكِ في قلوب من حولكِ.',
    captionSub: '[مكان صورة ٣ — اسحبي صورتكِ الحقيقية هنا]',
    placeholderGradient: 'from-teal-800 via-cyan-950 to-emerald-950',
    position: { x: 30, y: 64 },
    symbol: '✨',
  },
  {
    id: 4,
    title: 'أغصان الورد العطرة',
    caption: 'تزهو الأيام بضحكتكِ كما تزهر الوردة الجورية في أبهى حللها.',
    captionSub: '[مكان صورة ٤ — اسحبي صورتكِ الحقيقية هنا]',
    placeholderGradient: 'from-rose-900 via-emerald-950 to-stone-900',
    position: { x: 80, y: 70 },
    symbol: '🌹',
  },
];
