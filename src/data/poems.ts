import userPoemsData from './codeMasterMessages.json';

export type WorldId = 'waterfall' | 'black-iris' | 'beach' | 'memories';

export interface Poem {
  id: string | number;
  worldId: WorldId;
  title: string;
  poet: string;
  poetAr: string;
  subtitle?: string;
  era?: 'classical' | 'modern' | 'personal';
  badge?: string;
  category?: string;
  accentColor?: string;
  verses: string[];
  rawText?: string;
  note?: string;
  type?: 'poetry' | 'prose';
}

// Curated classical and modern masterworks by Antarah ibn Shaddad & Tamim al-Barghouti
const curatedLiteraryPoems: Poem[] = [
  // --- Waterfall World (الشوق والدموع والوجد) ---
  {
    id: 'antarah-waterfall-1',
    worldId: 'waterfall',
    title: 'ولقد ذكرتكِ والرماحُ نواهلٌ',
    poet: 'Antarah ibn Shaddad',
    poetAr: 'عنترة بن شداد',
    subtitle: 'من معلقته الخالدة في ساحات الوغى',
    era: 'classical',
    badge: '⚔️ معلقة عنترة',
    category: 'غزل كلاسيكي',
    accentColor: '#0ea5e9',
    type: 'poetry',
    verses: [
      'وَلَقَدْ ذَكَرْتُكِ وَالرِّمَاحُ نَوَاهِلٌ ... مِنِّي وَبِيضُ الْهِنْدِ تَقْطُرُ مِنْ دَمِي',
      'فَوَدِدْتُ تَقْبِيلَ السُّيُوفِ لِأَنَّهَا ... لَمَعَتْ كَبَارِقِ ثَغْرِكِ الْمُتَبَسِّمِ',
      'يَا عَبْلَ لَوْ أَنَّ الْمَنِيَّةَ خُيِّرَتْ ... لَأَتَتْكِ طَائِعَةً بِغَيْرِ تَحَكُّمِ',
      'إِنِّي امْرُؤٌ مِنْ خَيْرِ عَبْسٍ مَنْصِباً ... شَطْرِي وَأَحْمِي سَائِرِي بِالْمُنْصُلِ'
    ],
    note: 'أشهر أبيات الغزل في تاريخ الشعر العربي — حين يمتزج الشوق بريق السيوف.'
  },
  {
    id: 'tamim-waterfall-1',
    worldId: 'waterfall',
    title: 'معينُ الدمعِ وعتبُ الغياب',
    poet: 'Tamim al-Barghouti',
    poetAr: 'تميم البرغوثي',
    subtitle: 'في رثاء البعد وتدفق الحنين',
    era: 'modern',
    badge: '🪶 تميم البرغوثي',
    category: 'شعر حديث',
    accentColor: '#38bdf8',
    type: 'poetry',
    verses: [
      'مُعِينُ الدَّمْعِ يُنْجِدُنِي وَيَجْرِي ... كَمَا يَجْرِي الْعَقِيقُ عَلَى النُّحُورِ',
      'وَلَوْ أَنِّي أُطِيعُ الْعَذْلَ فِيهَا ... لَكُنْتُ لِعَهْدِهَا خَيْرَ الْغَدُورِ',
      'وَلَكِنِّي إِذَا ذُكِرَتْ بِحَيٍّ ... تَرَنَّحَ خَاطِرِي بَيْنَ السُّطُورِ',
      'كَأَنَّ لَهَا بِكُلِّ مَكَانِ شَوْقٍ ... سَحَاباً مُمْطِراً بَيْنَ الصُّدُورِ'
    ],
    note: 'من روائع تميم في تصوير انهمار الدمع والشوق كالسحاب الماطر.'
  },
  {
    id: 'antarah-waterfall-2',
    worldId: 'waterfall',
    title: 'إذا الريحُ هبتْ من رُبا العلمِ السعدي',
    poet: 'Antarah ibn Shaddad',
    poetAr: 'عنترة بن شداد',
    subtitle: 'نسائم الشوق العابرة للجبال والوديان',
    era: 'classical',
    badge: '📜 ديوان عنترة',
    category: 'شوق وحنين',
    accentColor: '#0284c7',
    type: 'poetry',
    verses: [
      'إِذَا الرِّيحُ هَبَّتْ مِنْ رُبَا العَلَمِ السَّعْدِي ... طَفَا الشَّوْقُ فِي قَلْبِي وَفَاضَتْ مَدَامِعِي',
      'أَلا يَا غُرَابَ البَيْنِ هَلْ أَنْتَ مُخْبِرِي ... بِمَا فَعَلَتْ أُمُّ الهَوَى فِي المَرَابِعِ',
      'أَرَى النَّاسَ يَبْكُونَ الَّذِي قَدْ جَرَى لَهُمْ ... وَإِنِّي لَأَبْكِي مِنْ فُؤَادِي وَأَدْمُعِي'
    ],
    note: 'حين تنقل الرياح رائحة الحبيبة كشلال من الذكريات.'
  },

  // --- Black Iris World (السوسنة السوداء وزهور الأردن النادرة) ---
  {
    id: 'tamim-iris-1',
    worldId: 'black-iris',
    title: 'في القدسِ والأرضِ سوسنةٌ لا تشيخ',
    poet: 'Tamim al-Barghouti',
    poetAr: 'تميم البرغوثي',
    subtitle: 'من درة قصائده الخالدة "في القدس"',
    era: 'modern',
    badge: '👑 في القدس',
    category: 'شعر حديث',
    accentColor: '#a855f7',
    type: 'poetry',
    verses: [
      'مَرَرْنَا عَلَى دَارِ الحَبِيبِ فَرَدَّنَا ... عَنِ الدَّارِ قَانُونُ الأَعَادِي وَسُورُهَا',
      'فَقُلْتُ لِنَفْسِي رُبَّمَا هِيَ نِعْمَةٌ ... فَمَا كُلُّ مَظْلُومٍ يَنَالُ سُرُورَهَا',
      'فَفِي القُدْسِ مَنْ فِي الإِنْسِ يُعْجِبُهُ الغِنَا ... وَفِي القُدْسِ رَوْضَاتٌ يَفُوحُ عَبِيرُهَا',
      'تَطُوفُ بِهَا السَّوْسَنَاتُ كَأَنَّهَا ... عُيُونُ المَهَا رَفَّتْ وَغَابَ نَظِيرُهَا'
    ],
    note: 'ملحمة تميم البرغوثي الخالدة حيث يمتزج عبير الأرض بالحب العظيم.'
  },
  {
    id: 'antarah-iris-1',
    worldId: 'black-iris',
    title: 'رمتْ فؤادي مليحةٌ عذراءُ',
    poet: 'Antarah ibn Shaddad',
    poetAr: 'عنترة بن شداد',
    subtitle: 'في سحر العيون السوداء والجمال الأصيل',
    era: 'classical',
    badge: '🖤 سواد العين والورد',
    category: 'غزل بدوي',
    accentColor: '#7e22ce',
    type: 'poetry',
    verses: [
      'رَمَتِ الفُؤَادَ مَلِيحَةٌ عَذْرَاءُ ... بِسِهَامِ لَحْظٍ مَا لَهُنَّ دَوَاءُ',
      'مَرَّتْ يَكَادُ المِسْكُ يَقْطُرُ مِنْهَا ... وَيَفُوحُ فِي خَطَوَاتِهَا النَّدَّاءُ',
      'عَيْشِي بِهَا عَيْشُ المُلُوكِ غَبَاطَةً ... وَبِغَيْرِهَا كُلُّ الحَيَاةِ شَقَاءُ',
      'سَوْدَاءُ فِي لَوْنِ الشَّبَابِ كَأَنَّهَا ... لَيْلُ التَّمَامِ تُزَيِّنُهُ الأَضْوَاءُ'
    ],
    note: 'وصف عنترة للجمال العربي الآسر المتوج بلون السوسنة السوداء.'
  },
  {
    id: 'tamim-iris-2',
    worldId: 'black-iris',
    title: 'يا درةً حُفِظت بألفِ حجاب',
    poet: 'Tamim al-Barghouti',
    poetAr: 'تميم البرغوثي',
    subtitle: 'عن بهاء الوردة وحصانتها الأبدية',
    era: 'modern',
    badge: '🌹 ورد وسوسن',
    category: 'وجدان',
    accentColor: '#c084fc',
    type: 'poetry',
    verses: [
      'يَا دُرَّةً حُفِظَتْ بِأَلْفِ حِجَابِ ... مَا ضَرَّ شَوْكُ الوَرْدِ حُسْنَ جَنَابِ',
      'إِنِّي أَرَاكِ وَفِي عُيُونِكِ هَيْبَةٌ ... تَثْنِي خُطَى العُشَّاقِ دُونَ عِتَابِ',
      'فَلَأَنْتِ أَبْهَى مِنْ رِيَاضٍ كُلِّهَا ... وَأَعَزُّ مِنْ مَاءِ الحَيَاةِ العَذْبِ'
    ],
    note: 'قصيدة راقية في نقاء الحبيبة وعزتها كالسوسنة البرية.'
  },

  // --- Beach World (الشاطئ والأفق والملاذ الهادئ) ---
  {
    id: 'tamim-beach-1',
    worldId: 'beach',
    title: 'قفْ بالديارِ وسائلِ الأمواجا',
    poet: 'Tamim al-Barghouti',
    poetAr: 'تميم البرغوثي',
    subtitle: 'وقفة على ضفاف البحر وتأمل المدى',
    era: 'modern',
    badge: '🌊 موج الحنين',
    category: 'شعر حديث',
    accentColor: '#f59e0b',
    type: 'poetry',
    verses: [
      'قِفْ بِالدِّيَارِ وَسَائِلِ الأَمْوَاجَا ... هَلْ كَانَ لِلشَّوْقِ القَدِيمِ عِلاجَا؟',
      'بَحْرٌ يَمُدُّ مِنَ المَحَبَّةِ أُفْقَهُ ... كَالقَلْبِ حِينَ يَفِيضُ فِيهِ هُيَاجَا',
      'يَا نَسْمَةَ البَحْرِ الرَّقِيقِ تَحِيَّةً ... لِمَنِ اسْتَقَرَّتْ فِي الفُؤَادِ سِرَاجَا',
      'عَيْنَاكِ شَاطِئُ رِحْلَتِي وَمَلَاذُهَا ... لَمَّا زَمَانِي سَاقَنِي أَمْوَاجَا'
    ],
    note: 'حين يتحول البحر إلى مرآة للشوق والملاذ الدافئ.'
  },
  {
    id: 'antarah-beach-1',
    worldId: 'beach',
    title: 'يا دارَ عبلةَ بالجواءِ تكلّمي',
    poet: 'Antarah ibn Shaddad',
    poetAr: 'عنترة بن شداد',
    subtitle: 'استنطاق الأطلال والآفاق الممتدة',
    era: 'classical',
    badge: '⛵ مطلع المعلقة',
    category: 'كلاسيكي خالد',
    accentColor: '#fbbf24',
    type: 'poetry',
    verses: [
      'هَلْ غَادَرَ الشُّعَرَاءُ مِنْ مُتَرَدَّمِ ... أَمْ هَلْ عَرَفْتَ الدَّارَ بَعْدَ تَوَهُّمِ',
      'يَا دَارَ عَبْلَةَ بِالجِوَاءِ تَكَلَّمِي ... وَعِمِي صَبَاحاً دَارَ عَبْلَةَ وَاسْلَمِي',
      'فَوَقَفْتُ فِيهَا نَاقَتِي وَكَأَنَّهَا ... فَدَنٌ لِأَقْضِيَ حَاجَةَ المُتَلَوِّمِ',
      'وَتَحُلُّ عَبْلَةُ بِالجِوَاءِ وَأَهْلُنَا ... بِالحَزْنِ فَالصَّمَّانِ فَالمُتَثَلَّمِ'
    ],
    note: 'المطلع التاريخي الأكثر خلوداً في مناجاة المدى ودار المحبوبة.'
  },
  {
    id: 'antarah-beach-2',
    worldId: 'beach',
    title: 'صحا من بعدِ سكرتهِ فؤادي',
    poet: 'Antarah ibn Shaddad',
    poetAr: 'عنترة بن شداد',
    subtitle: 'في ثبات العهد وسكون الليل على الشطآن',
    era: 'classical',
    badge: '🌅 سكون الفؤاد',
    category: 'غزل صادق',
    accentColor: '#d97706',
    type: 'poetry',
    verses: [
      'صَحَا مِنْ بَعْدِ سَكْرَتِهِ فُؤَادِي ... وَعَاوَدَهُ التَّذَكُّرُ وَالوِدَادُ',
      'وَأَيْقَنَ أَنَّ فِي عَبْلَةَ شِفَاهُ ... إِذَا خَفِيَتْ عَلَى النَّاسِ الرَّشَادُ',
      'يَطِيبُ لِيَ المَقَامُ بِكُلِّ أَرْضٍ ... يَكُونُ بِهَا لِطَلْعَتِهَا اعْتِيَادُ'
    ],
    note: 'عن طمأنينة القلب بجوار من يحب كالمرسى الهادئ بعد طول إبحار.'
  },

  // --- Memories World (الذكريات والخلود والعهد الباقي) ---
  {
    id: 'tamim-memories-1',
    worldId: 'memories',
    title: 'أمرُّ على الجدارِ وأذكرُ العهدا',
    poet: 'Tamim al-Barghouti',
    poetAr: 'تميم البرغوثي',
    subtitle: 'في تخليد اللحظات وبقاء الود رغم الزمن',
    era: 'modern',
    badge: '📸 ألبوم الذكرى',
    category: 'نوستالجيا ووفاء',
    accentColor: '#eab308',
    type: 'poetry',
    verses: [
      'أَمُرُّ عَلَى الدِّيَارِ أَرَى صَدَاهَا ... كَأَنَّ الأَمْسَ يَرْجِعُ فِي خُطَاهَا',
      'فَفِي كُلِّ انْتِصَارٍ كَانَ صَوْتٌ ... يُعِيدُ إِلَى حَيَاتِي مُبْتَدَاهَا',
      'تَظَلُّ الذِّكْرَيَاتُ حُصُونَ عِزٍّ ... نَلُوذُ بِهَا إِذَا الدُّنْيَا تَبَاهَى',
      'لَكِ العَهْدُ الَّذِي مَا خَانَ يَوْماً ... وَعَيْنٌ لَا تَرَى فِي الكَوْنِ جَاهَا'
    ],
    note: 'عن خلود الذكريات المشتركة وملاذها الدافئ ضد تقلبات الأيام.'
  },
  {
    id: 'antarah-memories-1',
    worldId: 'memories',
    title: 'إذا كشفَ الزمانُ لكَ القناعا',
    poet: 'Antarah ibn Shaddad',
    poetAr: 'عنترة بن شداد',
    subtitle: 'في الوفاء الأبدي ورسوخ المودة',
    era: 'classical',
    badge: '🛡️ ثبات وعهد',
    category: 'حكمة ووفاء',
    accentColor: '#ca8a04',
    type: 'poetry',
    verses: [
      'إِذَا كَشَفَ الزَّمَانُ لَكَ القِنَاعَا ... وَمَدَّ إِلَيْكَ صَرْفُ الدَّهْرِ بَاعَا',
      'فَلَا تَخْشَى المَنِيَّةَ وَالْتَقِهَا ... وَدَافِعْ مَا اسْتَطَعْتَ لَهَا دِفَاعَا',
      'وَكُنْ رَجُلاً عَلَى الأَهْوَالِ جَلْداً ... وَشِيمَتُكَ السَّمَاحَةُ وَالوِدَاعَا',
      'حَفِظْتُ عُهُودَ مَنْ أَهْوَى بِصِدْقٍ ... وَلَمْ أَبْغِ لِعَهْدِهِمُ انْقِطَاعَا'
    ],
    note: 'عهد الفارس بالثبات والوفاء لمحبوبته مهما تقلبت صروف الدهر.'
  },
  {
    id: 'tamim-memories-2',
    worldId: 'memories',
    title: 'حديثُ النصرِ ولحظاتُ المساء',
    poet: 'Tamim al-Barghouti',
    poetAr: 'تميم البرغوثي',
    subtitle: 'في روعة الفوز المشترك والضحكات الباقية',
    era: 'modern',
    badge: '🎮 نصر وابتسامة',
    category: 'بهجة مشتركة',
    accentColor: '#f97316',
    type: 'poetry',
    verses: [
      'نَخُوضُ مَعَاً حُرُوبَ الوَقْتِ هَزْلاً ... وَنَظْفَرُ بِابْتِسَامَاتِ المَسَاءِ',
      'كَأَنَّ لَنَا مِنَ الأَلْعَابِ عَرْشاً ... نُشَيِّدُهُ بِحُبٍّ وَاصْطِفَاءِ',
      'فَلَا سَاحَاتُ قَتْلَى أَوْ جِرَاحٌ ... سِوَى ضَحِكٍ تَرَدَّدَ فِي الفَضَاءِ'
    ],
    note: 'مهداة لجولات اللعب والانتصارات المشتركة في PUBG ولحظات البكسل آرت اللطيفة.'
  }
];

// Map user's personal messages from codeMasterMessages into their respective worlds:
const mappedUserPoems: Poem[] = (userPoemsData as Array<{
  id: number;
  sender?: string;
  title: string;
  type?: 'poetry' | 'prose';
  category?: string;
  badge?: string;
  theme?: string;
  themeNameAr?: string;
  subtitle?: string;
  accentColor?: string;
  rawText?: string;
  verses: string[];
  note?: string;
}>).map((p) => {
  // Map themes to worlds:
  let worldId: WorldId = 'waterfall';
  if (p.theme === 'black-iris') {
    worldId = 'black-iris';
  } else if (p.theme === 'wadi-rum') {
    worldId = 'beach';
  } else if (p.id >= 6) {
    worldId = 'memories';
  } else {
    worldId = 'waterfall';
  }

  // Refine distribution so each world receives custom personal messages:
  if (p.id === 1 || p.id === 2) worldId = 'beach';
  if (p.id === 3 || p.id === 4) worldId = 'waterfall';
  if (p.id === 5 || p.id === 8) worldId = 'black-iris';
  if (p.id === 6 || p.id === 7 || p.id === 9 || p.id === 10) worldId = 'memories';

  return {
    id: `user-poem-${p.id}`,
    worldId,
    title: p.title,
    poet: p.sender || 'Soulmate🧸🤍.',
    poetAr: p.sender || 'Soulmate🧸🤍.',
    subtitle: p.subtitle,
    era: 'personal',
    badge: p.badge || `💌 رسالة خاصة ${p.id}`,
    category: p.category || 'رسالة حب خاصة',
    accentColor: p.accentColor || '#10b981',
    verses: p.verses,
    rawText: p.rawText,
    note: p.note || 'رسالة خاصة لـ Soulmate🧸🤍.',
    type: p.type || 'poetry',
  };
});

// All 22 combined poems
export const allPoems: Poem[] = [...mappedUserPoems, ...curatedLiteraryPoems];

/** Get poems filtered by world */
export function getPoemsByWorld(worldId: WorldId): Poem[] {
  return allPoems.filter((p) => p.worldId === worldId);
}
