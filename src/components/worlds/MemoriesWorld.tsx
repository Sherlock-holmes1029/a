import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { getPoemsByWorld } from '@/data/poems';
import { PoemCard } from '@/components/ui/PoemCard';
import { PolaroidPhoto, type MemoryPhotoItem } from '@/components/ui/PolaroidPhoto';
import { ArrowRight, Sparkles, Gamepad2, Palette, Heart, Image as ImageIcon } from 'lucide-react';

export const MemoriesWorld: React.FC = () => {
  const { returnToHub } = useApp();
  const poems = getPoemsByWorld('memories');
  const [activeTab, setActiveTab] = useState<'all' | 'pubg' | 'pixel-art'>('all');

  /*
   * 📸 PHOTO GALLERY DATA PLACEHOLDERS
   * To add your actual photos:
   * 1. Place your image files inside the `/public/photos/` directory (e.g., `pubg_win.png`)
   * 2. Add `src: '/photos/pubg_win.png'` to the objects below!
   */
  const memoryPhotos: MemoryPhotoItem[] = [
    {
      id: 'photo-pubg-1',
      title: 'عشاء الدجاج الأول 🏆',
      caption: 'حين فزنا معاً بعد جولة ملحمية مليئة بالضحك والمحاولات المجنونة.',
      category: 'pubg',
      symbol: '🍗',
      // src: '/photos/pubg_win_1.png', // <-- REPLACE HERE WITH YOUR IMAGE PATH
    },
    {
      id: 'photo-pixel-1',
      title: 'لوحة البكسل الأولى 🎨',
      caption: 'حين رسمنا الذكرى بكسلاً بكسل، بألوان دافئة تحكي حكايتنا.',
      category: 'pixel-art',
      symbol: '👾',
      // src: '/photos/pixel_art_1.png', // <-- REPLACE HERE WITH YOUR IMAGE PATH
    },
    {
      id: 'photo-pubg-2',
      title: 'إنقاذ تحت النار 🔫',
      caption: 'لأنكِ دائماً في ظهري، ولأننا فريق لا يُقهر مهما اشتدت المعركة.',
      category: 'pubg',
      symbol: '🛡️',
      // src: '/photos/pubg_revive.png', // <-- REPLACE HERE WITH YOUR IMAGE PATH
    },
    {
      id: 'photo-pixel-2',
      title: 'قلب البكسل الوردي 💖',
      caption: 'رمز صغير لكل لحظة شاركنا فيها التفاصيل الصغيرة الجميلة.',
      category: 'pixel-art',
      symbol: '🌸',
      // src: '/photos/pixel_heart.png', // <-- REPLACE HERE WITH YOUR IMAGE PATH
    },
    {
      id: 'photo-special-1',
      title: 'أحلى اللحظات المشتركة 🧸',
      caption: 'ذكريات لا تُمحى، محفورة في القلب قبل الشاشات.',
      category: 'special',
      symbol: '✨',
      // src: '/photos/special_moment.png', // <-- REPLACE HERE WITH YOUR IMAGE PATH
    },
  ];

  const filteredPhotos =
    activeTab === 'all'
      ? memoryPhotos
      : memoryPhotos.filter((p) => p.category === activeTab);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen w-full bg-gradient-to-b from-[#140f0c] via-[#1c1410] to-[#0c0907] text-stone-100 px-4 sm:px-8 py-8 flex flex-col"
    >
      {/* Ambient background glows */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-stone-500/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Top Navigation Bar */}
      <header className="relative z-20 w-full max-w-4xl mx-auto flex items-center justify-between pb-6 border-b border-stone-800">
        <button
          type="button"
          onClick={returnToHub}
          className="flex items-center gap-2 text-xs sm:text-sm font-cairo text-amber-300 hover:text-amber-100 px-4 py-2 rounded-full bg-stone-900/80 border border-stone-700/50 backdrop-blur-md transition-all shadow-md cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى بوابة العوالم</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs font-cairo text-amber-300/80">
          <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
          <span>عالم الذكريات</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-4xl mx-auto my-6 flex flex-col items-center">
        {/* World Header */}
        <div className="text-center my-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/40 text-amber-300 text-xs font-cairo mb-4 shadow-md backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>PUBG Mobile • Pixel Art • رسائل القلب</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-aref text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-stone-200 to-amber-300 mb-3">
            عالم الذكريات الخالدة 🎮
          </h1>

          <p className="text-sm sm:text-base font-amiri text-stone-300/90 max-w-lg mx-auto leading-relaxed">
            ألبوم صور بولارويد لانتصاراتنا في PUBG وإبداعات البكسل آرت، محاطة بأصدق قصائد الوفاء والعهد.
          </p>
        </div>

        {/* SECTION 1: PHOTO GALLERY */}
        <section className="w-full my-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-bold font-aref text-amber-100">
                ألبوم الصور واللقطات التذكارية
              </h2>
            </div>

            {/* Gallery Category Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-stone-900 border border-stone-800 text-xs font-cairo">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                الكل
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pubg')}
                className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all cursor-pointer ${
                  activeTab === 'pubg'
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Gamepad2 className="w-3 h-3" />
                <span>PUBG</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pixel-art')}
                className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all cursor-pointer ${
                  activeTab === 'pixel-art'
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Palette className="w-3 h-3" />
                <span>Pixel Art</span>
              </button>
            </div>
          </div>

          {/* Polaroid Masonry / Flex Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredPhotos.map((photo, index) => (
              <PolaroidPhoto
                key={photo.id}
                photo={photo}
                index={index}
              />
            ))}
          </div>

          <div className="mt-4 p-3 rounded-2xl bg-stone-900/60 border border-stone-800 text-center text-xs font-cairo text-stone-400">
            💡 يمكنكِ النقر على أي صورة لتكبيرها وقراءة تفاصيل الذكرى!
          </div>
        </section>

        {/* SECTION 2: MEMORY POEMS & PERSONAL MESSAGES */}
        <section className="w-full my-8">
          <div className="flex items-center gap-2 mb-6">
            <Heart className="w-5 h-5 text-rose-400 fill-current" />
            <h2 className="text-xl sm:text-2xl font-bold font-aref text-amber-100">
              قصائد الوفاء والرسائل الخاصة
            </h2>
          </div>

          <div className="w-full space-y-2">
            {poems.map((poem, index) => (
              <PoemCard
                key={poem.id}
                poem={poem}
                index={index}
                variant="retro"
              />
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Back Button */}
      <footer className="relative z-10 w-full max-w-4xl mx-auto pt-8 pb-4 text-center">
        <button
          type="button"
          onClick={returnToHub}
          className="inline-flex items-center gap-2 text-xs font-cairo text-amber-300/80 hover:text-amber-100 px-5 py-2.5 rounded-full bg-stone-900/80 border border-stone-700/50 transition-colors"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>استكشاف العوالم الأخرى</span>
        </button>
      </footer>
    </motion.div>
  );
};
