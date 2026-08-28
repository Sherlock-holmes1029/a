export interface Mystery {
  id: string;
  section: 'jungle' | 'desert' | 'beach' | 'mountain' | 'timeline';
  sectionNameAr: string;
  name: string;
  nameAr: string;
  hint: string;
  position: {
    x: number; // percentage 0-100
    y: number; // percentage 0-100
  };
  icon: string;
  foundMessage: string;
}

export const mysteries: Mystery[] = [
  {
    id: 'jungle-golden-firefly',
    section: 'jungle',
    sectionNameAr: 'الغابة المسحورة',
    name: 'Golden Firefly',
    nameAr: 'اليرقة الذهبية',
    hint: 'وميض ساطع مختلف يختبئ بين أوراق الشجر الرطبة...',
    position: { x: 78, y: 35 },
    icon: '✨',
    foundMessage: 'اكتشفتِ اليرقة الذهبية المتوهجة! 🌿✨',
  },
  {
    id: 'jungle-paw-print',
    section: 'jungle',
    sectionNameAr: 'الغابة المسحورة',
    name: 'Deer Paw Print',
    nameAr: 'أثر الغزال',
    hint: 'خطوات لطيفة تركت بصمتها قرب مسار الشلال...',
    position: { x: 18, y: 72 },
    icon: '🐾',
    foundMessage: 'وجدتِ أثر الغزال الصغير الهادئ! 🦌',
  },
  {
    id: 'desert-scarab',
    section: 'desert',
    sectionNameAr: 'واحة الكثبان والقصائد',
    name: 'Golden Scarab',
    nameAr: 'الجعران الأثري',
    hint: 'سر قديم يلمع بهدوء تحت رمال البتراء الذهبية...',
    position: { x: 82, y: 62 },
    icon: '🪲',
    foundMessage: 'كشفتِ تميمة الجعران الفريدة بين الصخور! 🏛️',
  },
  {
    id: 'beach-shell',
    section: 'beach',
    sectionNameAr: 'شاطئ الأمواج الهادئة',
    name: 'Iridescent Pearl Shell',
    nameAr: 'صدفة اللؤلؤ المضيئة',
    hint: 'هدية حملتها مياه البحر الدافئة نحو رمال الشاطئ...',
    position: { x: 32, y: 78 },
    icon: '🐚',
    foundMessage: 'التقطتِ صدفة البحر البراقة! 🌊🐚',
  },
  {
    id: 'mountain-star',
    section: 'mountain',
    sectionNameAr: 'طريق الجبال والذكريات',
    name: 'Falling Wish Star',
    nameAr: 'النجمة الساطعة',
    hint: 'انظري لأعلى السماء الصافية فوق قمم الجبال العالية...',
    position: { x: 68, y: 15 },
    icon: '⭐',
    foundMessage: 'نجمة أمنيات لامعة في سماء الرحلة! 🌠🚗',
  },
  {
    id: 'timeline-heart-leaf',
    section: 'timeline',
    sectionNameAr: 'شجرة الذكريات والمسار',
    name: 'Heart Leaf',
    nameAr: 'الورقة القلبية',
    hint: 'غصن من الذكريات تشكّل برفق على هيئة قلب نابض...',
    position: { x: 48, y: 50 },
    icon: '💚',
    foundMessage: 'ورقة نضرة تشهد على كل اللحظات الجميلة! 🍃',
  },
];
