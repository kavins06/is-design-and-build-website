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
import kitchenD from '../assets/photos/kitchen-d.jpg';
import kitchenE from '../assets/photos/kitchen-e.jpg';
import kitchenF from '../assets/photos/kitchen-f.jpg';
import bathC from '../assets/photos/bath-c.jpg';
import bathD from '../assets/photos/bath-d.jpg';
import bathE from '../assets/photos/bath-e.jpg';
import powderA from '../assets/photos/powder-a.jpg';
import powderB from '../assets/photos/powder-b.jpg';
import powderC from '../assets/photos/powder-c.jpg';
import closetA from '../assets/photos/closet-a.jpg';
import roofB from '../assets/photos/roof-b.jpg';
import roofC from '../assets/photos/roof-c.jpg';

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
  'living-a': { src: livingA, alt: 'Bright bedroom with sliding doors to a balcony and light oak floors', room: 'Bedroom' },
  'bed-a': { src: bedA, alt: 'Bedroom with black-framed balcony doors and walnut furniture', room: 'Bedroom' },
  'deck-a': { src: deckA, alt: 'Rear deck with outdoor seating and a spiral stair', room: 'Outdoor space' },
  'exterior-a': { src: exteriorA, alt: 'Covered rear deck with sliding glass doors and a spiral stair', room: 'Outdoor space' },
  'roof-a': { src: roofA, alt: 'Rooftop deck with sectional seating and views across the city', room: 'Rooftop' },
  'kitchen-d': { src: kitchenD, alt: 'White kitchen with a mosaic tile backsplash, open shelves and a waterfall island with stools', room: 'Kitchen' },
  'kitchen-e': { src: kitchenE, alt: 'Kitchen island with a gas cooktop under a stainless hood, in front of a mosaic backsplash', room: 'Kitchen' },
  'kitchen-f': { src: kitchenF, alt: 'Galley kitchen with gloss white upper cabinets, charcoal base cabinets and a marble-look backsplash, open to the dining area', room: 'Kitchen' },
  'bath-c': { src: bathC, alt: 'Walk-in glass shower with two rain heads and bronze fixtures beside open towel shelves', room: 'Bathroom' },
  'bath-d': { src: bathD, alt: 'Bathroom with a frameless glass shower and a long white double vanity under lit mirrors', room: 'Bathroom' },
  'bath-e': { src: bathE, alt: 'Bathroom under a sloped ceiling with a round black-framed mirror and a white vanity', room: 'Bathroom' },
  'powder-a': { src: powderA, alt: 'Powder room with a glass vessel sink on a light wood vanity', room: 'Powder room', tall: true },
  'powder-b': { src: powderB, alt: 'Powder room with a green glass vessel sink, a wall-mounted black faucet and a curved mirror', room: 'Powder room' },
  'powder-c': { src: powderC, alt: 'Powder room with a stone vessel sink, a brass wall faucet and black penny tile', room: 'Powder room' },
  'closet-a': { src: closetA, alt: 'Walk-in closet with built-in shelving and hanging rails under a window', room: 'Closet', tall: true },
  'roof-b': { src: roofB, alt: 'Rooftop terrace between a flat-roofed stair enclosure and a shingled gable', room: 'Rooftop' },
  'roof-c': { src: roofC, alt: 'Deck with outdoor seating overlooking a row of DC rowhouses', room: 'Deck' },
};

/** Photographs shown for each kind of project, in display order. */
export const galleries: Record<string, string[]> = {
  kitchen: ['kitchen-a', 'kitchen-e', 'kitchen-b', 'kitchen-c'],
  bathroom: ['bath-d', 'bath-c', 'shower-tall', 'bath-e', 'powder-b', 'powder-c', 'bath-tall'],
  'whole-home': ['kitchen-a', 'roof-c', 'bath-b', 'kitchen-f', 'closet-a', 'deck-a', 'roof-a'],
  // Read across three columns: tall photographs sit in the outer columns.
  all: [
    'kitchen-a', 'bath-a', 'shower-tall',
    'bath-tall', 'kitchen-d', 'roof-c',
    'living-a', 'powder-c', 'kitchen-f',
    'bath-d', 'kitchen-c', 'powder-a',
    'closet-a', 'roof-b', 'bath-b',
    'kitchen-b', 'bed-a', 'bath-c',
    'deck-a', 'kitchen-e', 'powder-b',
    'roof-a', 'bath-e', 'exterior-a',
  ],
};
