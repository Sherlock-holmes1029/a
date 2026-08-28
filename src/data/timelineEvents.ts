export interface TimelineEvent {
  id: number;
  yearOrDate: string;
  title: string;
  description: string;
  tag: string;
  icon: string;
  photoPlaceholder: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    yearOrDate: 'البدايات الأولى',
    title: 'إشراقة اللحظة الأولى',
    description: 'خطوات بريئة ضحكت لها الأيام، وبداية قصة فتاة أشرقت كالنور في حياة كل من عرفها.',
    tag: 'بداية الرحلة',
    icon: '🌱',
    photoPlaceholder: '[صورة الذكرى الأولى — مكان مخصص لصورة الطفولة أو البداية]',
  },
  {
    id: 2,
    yearOrDate: 'سنوات البهجة',
    title: 'ضحكات لا تُنسى',
    description: 'محطات من الفرح والتفاصيل الصغيرة التي أصبحت مع الأيام أثمن الكنوز في صندوق الذكريات.',
    tag: 'أيام لا تغيب',
    icon: '✨',
    photoPlaceholder: '[صورة الذكرى الثانية — أضيفي لقطة عفوية هنا]',
  },
  {
    id: 3,
    yearOrDate: 'طريق المغامرة',
    title: 'رحلات واستكشاف',
    description: 'أوقات ملأتها العفوية والمحادثات الطويلة والضحك الذي لا ينتهي على دروب الحياة.',
    tag: 'مسارات الفرح',
    icon: '🚗',
    photoPlaceholder: '[صورة الذكرى الثالثة — صورة من مشوار أو رحلة مميزة]',
  },
  {
    id: 4,
    yearOrDate: 'محطة الإنجاز',
    title: 'فخر واعتزاز',
    description: 'كل خطوة نجاح، وكل تعب تحول إلى إنجاز وجمال يستحق أن نحتفل به دائماً وبكل حب.',
    tag: 'شعلة النجاح',
    icon: '⭐',
    photoPlaceholder: '[صورة الذكرى الرابعة — صورة التخرج أو لحظة فخر]',
  },
  {
    id: 5,
    yearOrDate: 'اليوم ودائماً',
    title: 'كل عام وأنتِ أماني الخير والجمال',
    description: 'سنة جديدة تبدأ محملة بكل الأماني الطيبة، والأيام المليئة بالسلام والمحبة والإشراق.',
    tag: 'عيد ميلاد سعيد',
    icon: '🎂',
    photoPlaceholder: '[صورة العيد — أضيفي صورتكِ الأجمل لهذا العام]',
  },
];
