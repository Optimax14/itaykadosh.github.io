import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface MediaItem {
  type: "image" | "video" | "gif";
  src: string;
  alt: string;
}

interface Update {
  date: string;
  title: string;
  description: string;
  link: {
    text: string;
    href: string;
  };
  media: MediaItem[];
}

function MediaCarousel({ media }: { media: MediaItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const videoRefs = React.useRef<{ [key: number]: HTMLVideoElement | null }>({});

  useEffect(() => {
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });

    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      const playPromise = currentVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [currentIndex]);

  const goToPreviousSlide = () => {
    if (isSliding) return;
    setIsSliding(true);
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    setTimeout(() => setIsSliding(false), 800);
  };

  const goToNextSlide = () => {
    if (isSliding) return;
    setIsSliding(true);
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % media.length);
    setTimeout(() => setIsSliding(false), 800);
  };

  if (!media || media.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="relative w-full bg-muted rounded-lg overflow-hidden border border-border shadow-sm aspect-video group">
        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between p-4 z-10">
          <button
            onClick={goToPreviousSlide}
            className="transform translate-x-[-100%] group-hover:translate-x-0 opacity-0 group-hover:opacity-100 focus:opacity-100 bg-background/80 hover:bg-background text-foreground rounded-full p-3 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <button
            onClick={goToNextSlide}
            className="transform translate-x-[100%] group-hover:translate-x-0 opacity-0 group-hover:opacity-100 focus:opacity-100 bg-background/80 hover:bg-background text-foreground rounded-full p-3 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>
        
        {/* Media Content */}
        <div className="relative w-full h-full overflow-hidden">
          {media.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out transform
                ${index === currentIndex ? 'translate-x-0' : 
                  direction === 'right' ? 
                    (index === (currentIndex + 1) % media.length ? 'translate-x-full' : 'translate-x-[-100%]') :
                    (index === (currentIndex - 1 + media.length) % media.length ? 'translate-x-[-100%]' : 'translate-x-full')
                }
              `}
              style={{
                zIndex: index === currentIndex ? 1 : 0,
                opacity: index === currentIndex ? 1 : 0,
                transition: 'all 500ms ease-in-out'
              }}
            >
              {item.type === "image" && (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
              )}
              {item.type === "gif" && (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
              )}
              {item.type === "video" && (
                <video
                  ref={(el: HTMLVideoElement | null) => {
                    if (el) videoRefs.current[index] = el;
                  }}
                  src={item.src}
                  className="w-full h-full object-cover"
                  playsInline
                  muted
                  loop
                  preload="auto"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Media Indicators/Pointers */}
      {media.length > 1 && (
        <div className="flex gap-2 justify-center">
          {media.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? "bg-foreground w-8"
                  : "bg-border w-2 hover:bg-muted-foreground"
              }`}
              aria-label={`Go to media ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function RoboticsIdle() {
  return (
    <motion.svg
      width="140"
      height="140"
      viewBox="0 0 140 140"
      className="absolute -top-6 -left-6 opacity-40 text-foreground/40 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <defs>
        <linearGradient id="scan" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <g transform="translate(70,70)">
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        >
          <path d="M0 -58 A58 58 0 0 1 50 -29" stroke="url(#scan)" strokeWidth="2" fill="none" />
          <path d="M0 -42 A42 42 0 0 1 36 -21" stroke="url(#scan)" strokeWidth="2" fill="none" />
          <path d="M0 -26 A26 26 0 0 1 22 -12" stroke="url(#scan)" strokeWidth="2" fill="none" />
          <motion.circle
            r="3"
            cx="50"
            cy="-29"
            fill="currentColor"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          />
        </motion.g>
      </g>
    </motion.svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Photo */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Left: Photo */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="w-full max-w-md aspect-square bg-muted rounded-lg overflow-hidden border border-border shadow-sm hover:scale-[1.02] transition-transform duration-300">
                <img
                  src={import.meta.env.BASE_URL + "about-photo-1.jpg"}
                  alt="Itay Kadosh"
                  className="w-full h-full object-cover"
                />
              </div>
              <RoboticsIdle />
            </div>

            {/* Right: Text Content */}
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.45 }}>
                <h1 className="text-5xl sm:text-6xl font-bold mb-4">Itay Kadosh</h1>
                <p className="text-2xl text-muted-foreground font-light">Robotics Researcher & Graduate School Applicant</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.45 }}>
                <p className="text-lg text-foreground leading-relaxed">
                  Passionate about advancing robotics through research and innovation. Exploring autonomous systems, manipulation, and human-robot interaction.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.45 }}>
                <p className="text-lg text-foreground leading-relaxed">
                  Welcome to my portfolio. Here you'll find my research, publications, experience, and academic background. I'm seeking opportunities to pursue graduate studies in robotics and contribute to cutting-edge work.
                </p>
              </motion.div>

              <motion.div className="flex flex-wrap gap-4 pt-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.45 }}>
                <Link href="/about">
                  <Button variant="default" className="bg-foreground text-background hover:bg-muted-foreground transform hover:scale-105 transition-all duration-300">
                    Learn More About Me
                  </Button>
                </Link>
                <Link href="/publications">
                  <Button variant="outline" className="border-foreground text-foreground hover:bg-card transform hover:scale-105 transition-all duration-300">
                    View My Work
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recent Updates Section */}
      <section className="section-padding bg-card">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-bold mb-8 animate-fadeInUp" style={{ animationDelay: '1000ms' }}>
            Recent Updates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeInUp" style={{ animationDelay: '1200ms' }}>
            {/* Latest Publication */}
            <div className="border border-border rounded-lg bg-background/50 hover:bg-background transition-all duration-300 transform hover:scale-[1.02] overflow-hidden flex flex-col">
              <div className="aspect-[4/3] w-full">
                <MediaCarousel 
                  media={[
                    {
                      type: "image",
                      src: "/about-photo-1.jpg",
                      alt: "Path planning visualization",
                    },
                    {
                      type: "gif",
                      src: "/Wow.gif",
                      alt: "Robot navigation animation",
                    },
                  ]} 
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-sm font-medium text-muted-foreground">October 2025</span>
                <h3 className="text-lg font-semibold mt-1 mb-2">New Publication at ICRA</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  Our paper on efficient path planning for mobile robots has been accepted at ICRA 2026.
                </p>
                <Link href="/publications" className="self-start">
                  <Button variant="outline" size="sm">Read More</Button>
                </Link>
              </div>
            </div>

            {/* Research Progress */}
            <div className="border border-border rounded-lg bg-background/50 hover:bg-background transition-all duration-300 transform hover:scale-[1.02] overflow-hidden flex flex-col">
              <div className="aspect-[4/3] w-full">
                <MediaCarousel 
                  media={[
                    {
                      type: "image",
                      src: "/about-photo-1.jpg",
                      alt: "Research progress",
                    },
                    {
                      type: "gif",
                      src: "/Wow.gif",
                      alt: "Robot demonstration",
                    },
                  ]} 
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-sm font-medium text-muted-foreground">September 2025</span>
                <h3 className="text-lg font-semibold mt-1 mb-2">Human-Robot Collaboration</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  Achieved significant milestones in adaptive control strategies for robot-human interaction.
                </p>
                <Link href="/experience" className="self-start">
                  <Button variant="outline" size="sm">Learn More</Button>
                </Link>
              </div>
            </div>

            {/* Professional Update */}
            <div className="border border-border rounded-lg bg-background/50 hover:bg-background transition-all duration-300 transform hover:scale-[1.02] overflow-hidden flex flex-col">
              <div className="aspect-[4/3] w-full">
                <MediaCarousel 
                  media={[
                    {
                      type: "image",
                      src: "/about-photo-1.jpg",
                      alt: "Graduate research",
                    },
                    {
                      type: "gif",
                      src: "/Wow.gif",
                      alt: "Research presentation",
                    },
                  ]} 
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-sm font-medium text-muted-foreground">August 2025</span>
                <h3 className="text-lg font-semibold mt-1 mb-2">Graduate Applications</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  Preparing applications for top robotics programs, focusing on autonomous systems research.
                </p>
                <Link href="/about" className="self-start">
                  <Button variant="outline" size="sm">View Details</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
