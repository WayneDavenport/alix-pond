'use client'

import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Meteors } from "@/components/ui/meteors";

export default function Home() {
  const [expandedId, setExpandedId] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(null);
  const containerRef = useRef(null);

  const backgroundImages = [
    '/images/hero/alix(1).jpg',
    '/images/hero/alix(2).jpg',
    '/images/hero/alix(3).jpg',
    '/images/hero/alix(4).jpg',
    '/images/hero/alix(5).jpg',
    '/images/hero/alix(6).jpg',
    '/images/hero/alix(7).jpg',
    '/images/hero/alix(8).jpg',
    '/images/hero/alix(9).jpg'
  ];

  const backgroundColors = [
    "rgb(147, 51, 234)",  // Purple
    "rgb(59, 130, 246)",  // Blue
    "rgb(16, 185, 129)",  // Green
    "rgb(239, 68, 68)",   // Red
  ];

  // Preload and verify images
  useEffect(() => {
    const preloadImage = (src) => {
      console.log('Attempting to load image:', src); // Debug log
      return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.src = src;
        img.onload = () => {
          console.log('Successfully loaded image:', src); // Debug log
          setImageLoaded(true);
          resolve(src);
        };
        img.onerror = () => {
          console.error(`Failed to load image: ${src}`);
          setImageLoaded(false);
          reject();
        };
      });
    };

    const loadCurrentImage = async () => {
      try {
        await preloadImage(backgroundImages[backgroundIndex]);
        console.log('Setting current image to:', backgroundImages[backgroundIndex]); // Debug log
        setCurrentImage(backgroundImages[backgroundIndex]);
      } catch (error) {
        console.error('Error in loadCurrentImage:', error); // Debug log
        setCurrentImage(null);
      }
    };

    loadCurrentImage();
  }, [backgroundIndex]);

  // Add a debug log for render
  console.log('Current render state:', {
    currentImage,
    imageLoaded,
    backgroundIndex,
    backgroundColor: backgroundColors[backgroundIndex % backgroundColors.length]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (expandedId) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [expandedId]);

  useOutsideClick(containerRef, () => {
    if (expandedId) {
      setExpandedId(null);
    }
  });

  const cards = [
    {
      id: 'cats',
      title: 'Cat Services',
      description: 'Professional cat sitting services including feeding, playtime, litter box maintenance, and medication administration if needed. Available for both short visits and extended stays.',
      details: [
        { label: 'Daily Visits', value: '$20/30min visit' },
        { label: 'Overnight', value: '$40/night' },
        { label: 'Outside Fairbanks', value: '+$15' },
        { label: 'Services Include', value: 'Feeding, Play, Care' }
      ]
    },
    {
      id: 'dogs',
      title: 'Dog Services',
      description: 'Comprehensive dog care including walks, feeding, playtime, and overnight stays. We ensure your furry friend gets plenty of exercise and attention.',
      details: [
        { label: 'Daily Walks', value: '$20/30min walk' },
        { label: 'Overnight', value: '$50/night' },
        { label: 'Outside Fairbanks', value: '+$15' },
        { label: 'Services Include', value: 'Walks, Play, Care' }
      ]
    },
    {
      id: 'contact',
      title: 'Contact Info',
      description: 'Get in touch to schedule a meet and greet or discuss your pet care needs. Phone calls preferred.',
      details: [
        { label: 'Phone', value: '(361) 683-8462' },
        { label: 'Email', value: 'alixkerr@gmail.com' },
        { label: 'Area', value: 'Fairbanks, AK' },
        { label: 'Hours', value: '7am - 9pm Daily' }
      ]
    }
  ];

  return (
    <main /* className="min-h-[120vh] bg-gradient-to-b from-black via-purple-900 to-black" */>
      <AuroraBackground>
        <div className="container">
          <div className="hero">
            <motion.section
              className="hero-title-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="hero-title-container">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={backgroundIndex}
                    className="hero-image-wrapper"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    <Image
                      src={backgroundImages[backgroundIndex]}
                      alt="Hero background"
                      fill
                      style={{ objectFit: 'cover' }}
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="hero-title">
                  <div className="hero-title-content">
                    <h1 className="font-bold mb-2">Alix Pond</h1>
                    <h2 className="text-2xl mb-4">Pet Services</h2>
                  </div>
                </div>
              </div>
            </motion.section>
            <section className="hero-text">
              <p className="text-lg mb-8">Fairbanks resident, offering experienced pet sitting services. I understand the unique needs of animals in our Alaskan climate and provide reliable, compassionate care.</p>
            </section>
          </div>

          <div className="relative mt-16" ref={containerRef}>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {cards.map((card) => (
                <div key={card.id} className="relative">
                  <motion.div
                    layoutId={`card-${card.id}`}
                    onClick={() => setExpandedId(expandedId === card.id ? null : card.id)}
                    className="cursor-pointer"
                  >
                    <Card className="overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300 h-24 flex items-center">
                      <motion.div className="p-4 text-center w-full">
                        <motion.h2 layoutId={`title-${card.id}`} className="text-xl font-bold text-white">
                          {card.title}
                        </motion.h2>
                      </motion.div>
                    </Card>
                  </motion.div>

                  <AnimatePresence>
                    {expandedId === card.id && (
                      <div className="fixed inset-0 grid place-items-center z-[100]">
                        <motion.div
                          ref={containerRef}
                          layoutId={`card-${card.id}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{
                            opacity: 0,
                            transition: { duration: 0.15 }
                          }}
                          className="w-[90vw] max-w-[800px] max-h-[85vh] overflow-auto relative"
                        >
                          <Card className="relative overflow-hidden bg-black/60 backdrop-blur-xl border border-white/20 shadow-xl">
                            <button
                              onClick={() => setExpandedId(null)}
                              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                            <div className="p-6 relative z-20">
                              <motion.h2 layoutId={`title-${card.id}`} className="text-2xl font-bold mb-4 text-white">
                                {card.title}
                              </motion.h2>
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <p className="text-white/90 mb-6">{card.description}</p>
                                <div className="grid grid-cols-2 gap-4">
                                  {card.details.map((detail, index) => (
                                    <div key={index} className="text-white/90">
                                      <span className="font-semibold">{detail.label}:</span>
                                      <span className="ml-2">{detail.value}</span>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            </div>
                            <Meteors number={20} />
                          </Card>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </AuroraBackground>
    </main>
  );
}
