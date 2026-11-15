import type { ImageMetadata } from 'astro';
import kitchenA from '../assets/photos/kitchen-a.jpg';
import kitchenB from '../assets/photos/kitchen-b.jpg';
import kitchenC from '../assets/photos/kitchen-c.jpg';
import bathA from '../assets/photos/bath-a.jpg';
import bathB from '../assets/photos/bath-b.jpg';
import bathTall from '../assets/photos/bath-tall.jpg';
import showerTall from '../assets/photos/shower-tall.jpg';
import livingA from '../assets/photos/living-a.jpg';
import bedA from '../assets/photos/bed-a.jpg';
import deckA from '../assets/photos/deck-a.jpg';
import exteriorA from '../assets/photos/exterior-a.jpg';
import roofA from '../assets/photos/roof-a.jpg';

// Company project photography. Captions name the room only: project names and
// locations are not published until the owner confirms them.
export interface Photo { src: ImageMetadata; alt: string; room: string; tall?: boolean }

export const photos: Record<string, Photo> = {
  'kitchen-a': { src: kitchenA, alt: 'Kitchen with walnut base cabinets, a marble backsplash and a waterfall island with four stools', room: 'Kitchen' },
  'kitchen-b': { src: kitchenB, alt: 'Open kitchen with island seating, pendant lights and a stainless refrigerator', room: 'Kitchen' },
  'kitchen-c': { src: kitchenC, alt: 'Kitchen island with a wine fridge and range hood, open to the stair and living area', room: 'Kitchen' },
  'bath-a': { src: bathA, alt: 'Floating double vanity with round mirrors and dark marble walls beside a glass shower', room: 'Bathroom' },
  'bath-b': { src: bathB, alt: 'Marble bathroom with a double vanity, brass mirrors and a glass shower', room: 'Bathroom' },
  'bath-tall': { src: bathTall, alt: 'Bathroom with a tiled tub and shower, a mosaic-framed mirror and a wood vanity', room: 'Bathroom', tall: true },
  'shower-tall': { src: showerTall, alt: 'Walk-in shower with large-format tile, a niche and a glass panel', room: 'Shower', tall: true },
  'living-a': { src: livingA, alt: 'Bright room with sliding doors to a balcony and light oak floors', room: 'Living space' },
  'bed-a': { src: bedA, alt: 'Bedroom with black-framed balcony doors and walnut furniture', room: 'Bedroom' },
  'deck-a': { src: deckA, alt: 'Rear deck with outdoor seating and a spiral stair', room: 'Outdoor space' },
  'exterior-a': { src: exteriorA, alt: 'Covered rear deck with sliding glass doors and a spiral stair', room: 'Outdoor space' },
  'roof-a': { src: roofA, alt: 'Rooftop deck with sectional seating and views across the city', room: 'Rooftop' },
};

/** Photographs shown for each kind of project, in display order. */
export const galleries: Record<string, string[]> = {
  kitchen: ['kitchen-a', 'kitchen-c', 'kitchen-b'],
  bathroom: ['bath-a', 'bath-tall', 'bath-b', 'shower-tall'],
  'whole-home': ['living-a', 'kitchen-c', 'bed-a', 'bath-b', 'deck-a', 'roof-a'],
  // Read across three columns: tall photographs sit in the outer columns.
  all: ['kitchen-a', 'bath-a', 'living-a', 'shower-tall', 'kitchen-c', 'bath-tall', 'bed-a', 'kitchen-b', 'deck-a', 'roof-a', 'exterior-a', 'bath-b'],
};
