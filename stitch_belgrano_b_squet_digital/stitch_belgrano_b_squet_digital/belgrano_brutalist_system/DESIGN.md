---
name: Belgrano Brutalist System
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c3c5d8'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#8d90a2'
  outline-variant: '#434656'
  surface-tint: '#b7c4ff'
  primary: '#b7c4ff'
  on-primary: '#002682'
  primary-container: '#2e62ff'
  on-primary-container: '#f7f6ff'
  inverse-primary: '#024cec'
  secondary: '#ffb693'
  on-secondary: '#561f00'
  secondary-container: '#fe6b00'
  on-secondary-container: '#572000'
  tertiary: '#c9c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#727171'
  on-tertiary-container: '#faf6f6'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001552'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#ffdbcc'
  secondary-fixed-dim: '#ffb693'
  on-secondary-fixed: '#351000'
  on-secondary-fixed-variant: '#7a3000'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c9c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  headline-massive:
    fontFamily: Epilogue
    fontSize: 120px
    fontWeight: '900'
    lineHeight: 90%
    letterSpacing: -0.05em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 64px
    fontWeight: '900'
    lineHeight: 100%
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 110%
  body-lg:
    fontFamily: Epilogue
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 160%
  body-md:
    fontFamily: Epilogue
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 150%
  technical-data:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 120%
    letterSpacing: 0.05em
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 100%
spacing:
  unit: 4px
  gutter: 16px
  margin: 32px
  container-max: 1440px
  overlap-negative: -40px
---

## Brand & Style

The design system embodies the raw energy of Club Belgrano through a **Brutalist** lens, heavily influenced by the aggressive, high-contrast aesthetic of Baronissi Sports Club. It is designed for a target audience that values tradition mixed with modern, urban grit.

The visual language is characterized by "intentional friction": heavy borders, asymmetrical layouts, and massive typography that refuses to be contained by its parent containers. This is balanced with a sophisticated dark glassmorphism layer to add depth and a "tactical tech" feel. The emotional response is one of strength, intensity, and unwavering loyalty. Key features include dynamic scroll behaviors where elements change scale or rotate, creating a sense of physical momentum.

## Colors

This design system operates in a native **Dark Mode**. The palette is dominated by **Negro Profundo (#0A0A0A)** for surfaces, providing a void-like backdrop that makes chromatic elements vibrate. 

- **Azul Belgrano (#2E62FF)**: Used as the primary brand signal, applied to interactive states and primary structural accents.
- **Naranja Táctico (#FF6B00)**: A high-visibility accent reserved for critical call-to-actions, live indicators, and technical highlights.
- **Blanco Puro (#FFFFFF)**: Used exclusively for high-contrast typography and razor-sharp borders.

## Typography

Typography is a structural element, not just a content carrier. **Epilogue** in Black and Condensed weights is used for massive headlines that often bleed off the edge of the screen or overlap other containers. 

**Space Grotesk** serves the "tactical" side of the brand, used for technical data, stats, and metadata to provide a functional, engineered contrast to the expressive headlines. Hierarchy is achieved through extreme scale shifts rather than subtle weight changes. All massive headlines should use tight tracking and leading to create a "wall of text" effect.

## Layout & Spacing

The layout follows a **12-column fixed grid** but purposefully breaks it. While the grid provides the underlying structure, elements are encouraged to utilize negative margins and "asymmetrical offsets."

- **The Overflow Rule**: Large typographic elements or hero images should break the container alignment, often extending into the page margins.
- **Block Logic**: Content is grouped into heavy blocks defined by 2px borders.
- **Dynamic Scale**: On scroll, specific "power blocks" should scale from 0.95x to 1.05x to create a sense of depth and impact.

## Elevation & Depth

This system rejects traditional soft shadows. Depth is communicated through two primary methods:

1.  **Dark Glassmorphism**: Overlays use a semi-transparent #0A0A0A with a high backdrop-blur (20px to 40px) and a 1px solid white border at low opacity (10-15%). This creates a "floating glass" effect over the raw brutalist blocks.
2.  **Hard Layering**: Elements are stacked directly on top of each other using z-index management. A "top" element is distinguished by a thicker 3px Azul Belgrano border rather than a shadow.

## Shapes

The shape language is strictly **Sharp (0px)**. There are no rounded corners in this design system. Every container, button, input, and image mask must have perfectly 90-degree angles to maintain the aggressive, brutalist architectural feel. 

Asymmetrical clipping masks (e.g., a rectangle with one corner sliced at a 45-degree angle) can be used for tactical accents, but the base geometry remains rigid and rectangular.

## Components

### Buttons
Primary buttons are solid Azul Belgrano with sharp corners and black Epilogue Black text. Secondary buttons use a 2px white border with no fill. Both feature a "staggered" hover state where the button translates 4px up and 4px left, leaving a solid Naranja Táctico "ghost" block behind it.

### Cards
Cards are defined by a 2px solid white border. Backgrounds are either solid #0A0A0A or the dark glassmorphism treatment. Titles in cards should overflow the top-left corner using negative margins.

### Inputs
Text fields are simple bottom-border-only underlines (2px white). When focused, the border turns Azul Belgrano and a small "REC" style Naranja dot appears in the top right corner.

### Tactical Chips
Small rectangular tags using Space Grotesk. They use a Naranja Táctico background with black text for "Live" or "Active" states, and white outlines for static metadata.

### Dynamic Scrollers
Horizontal marquee components are used for news tickers or score updates, utilizing the Massive Headline typography style.