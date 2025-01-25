'use client'

import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useOutsideClick } from "@/hooks/use-outside-click";

export default function Home() {
  const [expandedId, setExpandedId] = useState(null);
  const containerRef = useRef(null);

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

  useOutsideClick(containerRef, () => setExpandedId(null));

  const cards = [
    {
      id: 'cats',
      title: 'Cat Services',
      description: 'Professional cat sitting services including feeding, playtime, litter box maintenance, and medication administration if needed. Available for both short visits and extended stays.',
      details: [
        { label: 'Daily Visits', value: '$25/visit' },
        { label: 'Overnight', value: '$75/night' },
        { label: 'Extended Stay', value: 'Custom rates' },
        { label: 'Services Include', value: 'Feeding, Play, Care' }
      ]
    },
    {
      id: 'dogs',
      title: 'Dog Services',
      description: 'Comprehensive dog care including walks, feeding, playtime, and overnight stays. We ensure your furry friend gets plenty of exercise and attention.',
      details: [
        { label: 'Daily Walks', value: '$30/walk' },
        { label: 'Day Care', value: '$45/day' },
        { label: 'Overnight', value: '$85/night' },
        { label: 'Services Include', value: 'Walks, Play, Care' }
      ]
    },
    {
      id: 'contact',
      title: 'Contact Info',
      description: 'Get in touch to schedule a meet and greet or discuss your pet care needs.',
      details: [
        { label: 'Phone', value: '(555) 123-4567' },
        { label: 'Email', value: 'alix@example.com' },
        { label: 'Area', value: 'Anchorage, AK' },
        { label: 'Hours', value: '7am - 9pm Daily' }
      ]
    }
  ];

  return (

    <AuroraBackground>
      <div className="container">
        <div className="hero">
          <section>
            <h1>Alix Pond</h1>
            <h2>Pet Services</h2>
          </section>
          <section>
            <p>Bringing Texas warmth to Alaska's winters. Experienced pet sitter providing compassionate care for your animal companions.</p>
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
                  <Card className="overflow-hidden bg-white/90 backdrop-blur-sm h-24 flex items-center">
                    <motion.div className="p-4 text-center w-full">
                      <motion.h2 layoutId={`title-${card.id}`} className="text-xl font-bold">
                        {card.title}
                      </motion.h2>
                    </motion.div>
                  </Card>
                </motion.div>

                <AnimatePresence>
                  {expandedId === card.id && (
                    <motion.div
                      layoutId={`expanded-card-${card.id}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.2 }
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                        transition: { duration: 0.2 }
                      }}
                      className="fixed inset-0 md:absolute md:inset-auto md:top-0 md:left-0 w-full md:w-[300%] z-50 m-4 md:m-0"
                      style={{
                        left: card.id === 'contact' ? '-200%' :
                          card.id === 'dogs' ? '-100%' : '0'
                      }}
                    >
                      <Card className="overflow-hidden bg-white/95 backdrop-blur-sm shadow-xl">
                        <div className="p-6">
                          <motion.h2 layoutId={`title-${card.id}`} className="text-2xl font-bold mb-4">
                            {card.title}
                          </motion.h2>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <p className="text-gray-600 mb-6">{card.description}</p>
                            <div className="grid grid-cols-2 gap-4">
                              {card.details.map((detail, index) => (
                                <div key={index}>
                                  <span className="font-semibold">{detail.label}:</span>
                                  <span className="ml-2">{detail.value}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </AuroraBackground >

  );
}
