"use client";

import React, { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundVideo() {
  const [isMuted, setIsMuted] = useState(true);
  const [loadVideo, setLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Mount the sources after hydration so the poster registers as LCP first
    setLoadVideo(true);
  }, []);

  useEffect(() => {
    if (loadVideo && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay blocked or failed:", err);
      });
    }
  }, [loadVideo]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover scale-[1.03]"
        style={{ WebkitMaskImage: 'linear-gradient(to top, transparent 0, black 128px)', maskImage: 'linear-gradient(to top, transparent 0, black 128px)' }}
        autoPlay
        muted
        loop
        playsInline
        poster="/marketing_poster.webp"
        preload="metadata"
      >
        {loadVideo && (
          <>
            {/* Desktop Viewport Sources */}
            <source src="/marketing_720p.webm" type="video/webm" media="(min-width: 769px)" />
            <source src="/marketing_720p.mp4" type="video/mp4" media="(min-width: 769px)" />
            
            {/* Mobile Viewport Sources (360p optimized size with sound) */}
            <source src="/marketing_360p.webm" type="video/webm" media="(max-width: 768px)" />
            <source src="/marketing_360p.mp4" type="video/mp4" media="(max-width: 768px)" />
          </>
        )}
      </video>
      
      {/* Premium Unmute Toggle Button (Icon Only) */}
      <button
        onClick={toggleMute}
        className="absolute bottom-10 right-10 z-50 p-3.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </button>
    </>
  );
}
