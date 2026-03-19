'use client';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience, { ExperienceTimeline } from '@/components/Experience';
import Projects from '@/components/Projects';
import Stack from '@/components/Stack';
import Contact from '@/components/Contact';
import FluidCursor from '@/components/FluidCursor';
import ParallaxScroller from '@/components/ParallaxScroller';

export default function Home() {
  return (
    <>
      <FluidCursor />
      <Nav />
      <ExperienceTimeline />
      <ParallaxScroller>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Stack />
        <Contact />
      </ParallaxScroller>
    </>
  );
}
