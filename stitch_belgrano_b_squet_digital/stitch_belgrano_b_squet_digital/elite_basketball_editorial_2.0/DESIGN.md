---
name: Elite Basketball Editorial 2.0
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c3c5d8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8d90a2'
  outline-variant: '#434656'
  surface-tint: '#b7c4ff'
  primary: '#b7c4ff'
  on-primary: '#002682'
  primary-container: '#2e62ff'
  on-primary-container: '#f7f6ff'
  inverse-primary: '#024cec'
  secondary: '#a6e6ff'
  on-secondary: '#003543'
  secondary-container: '#14d1ff'
  on-secondary-container: '#00566b'
  tertiary: '#ffb4aa'
  on-tertiary: '#690003'
  tertiary-container: '#dd201c'
  on-tertiary-container: '#fff4f3'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001552'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#b7eaff'
  secondary-fixed-dim: '#4cd6ff'
  on-secondary-fixed: '#001f28'
  on-secondary-fixed-variant: '#004e60'
  tertiary-fixed: '#ffdad5'
  tertiary-fixed-dim: '#ffb4aa'
  on-tertiary-fixed: '#410001'
  on-tertiary-fixed-variant: '#930005'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-hero:
    fontFamily: Epilogue
    fontSize: 120px
    fontWeight: '900'
    lineHeight: 100%
    letterSpacing: -0.05em
  headline-xl:
    fontFamily: Epilogue
    fontSize: 72px
    fontWeight: '900'
    lineHeight: 110%
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 120%
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Lexend
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 160%
  body-md:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 150%
  label-caps:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 100%
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin: 40px
  asymmetric-offset: 64px
---

## Brand & Style

This design system is engineered to evoke the high-stakes, high-energy atmosphere of elite professional basketball. It targets a sophisticated audience that demands both statistical depth and aesthetic intensity. The brand personality is aggressive, prestigious, and forward-thinking.

The visual style is a fusion of **Glassmorphism** and **High-Contrast Bold**. It leverages the depth of translucent layers to manage complex editorial data while utilizing massive, distorted typography to create a sense of motion and impact. The aesthetic prioritizes a "digital courtside" experience—premium, immersive, and unapologetically bold.

## Colors

The palette is anchored in a high-contrast dark mode. The foundation is a "Pitch Black" neutral that ensures the vibrant accents and glass effects achieve maximum luminosity. 

- **Primary (Vibrant Blue):** Used for critical calls to action, active states, and brand highlights. It represents the "electric" energy of the game.
- **Secondary (Cyan/Ice):** Used for data visualization and secondary accents to provide a sense of technical precision.
- **Surface Palette:** Layers are built using semi-transparent variations of the neutral palette, mixed with the primary blue to create "tinted glass" effects. 
- **Accent (Alert Red):** Reserved for live indicators and high-intensity stats.

## Typography

Typography in this design system is a structural element. **Epilogue** in its Black Italic weight is the primary voice, used at massive scales to anchor the layout and create an editorial "magazine" feel. 

**Lexend** is utilized for body copy and data labels. Its athletic, wide proportions complement the aggressive nature of the headlines while maintaining exceptional readability for long-form editorial content and complex statistics. For the most impactful sections, headlines should break the grid and overlap images or glass containers to enhance the sense of depth.

## Layout & Spacing

The layout philosophy follows an **asymmetric editorial grid**. Instead of a standard uniform grid, this design system utilizes a 12-column structure with alternating offsets. 

Elements are intentionally "misaligned" to create a rhythmic, dynamic flow. Spacing is generous to allow the background blurs to breathe, but tight within component groups to maintain tension. Cards and content blocks should alternate between full-width, 7-column, and 5-column widths to prevent a predictable vertical rhythm.

## Elevation & Depth

Depth is conveyed through **Glassmorphism** and backdrop blurs rather than traditional shadows. 

1.  **Background Layer:** Deep black with subtle, organic gradients of vibrant blue and dark violet that shift slowly.
2.  **Mid Layer (Content Containers):** Semi-transparent surfaces (10-15% opacity) with a `backdrop-filter: blur(24px)`. These surfaces feature a 1px inner border (stroke) at 20% white to define the edges.
3.  **Top Layer (Interactions):** Pure high-contrast elements (solid vibrant blue or solid white) that sit "above" the glass, utilizing high-glow shadows (spread 20px, low opacity) to indicate activity.

## Shapes

The shape language balances modern sleekness with aggressive editorial cuts. All glass containers use a **rounded-lg (16px)** corner radius to soften the high-contrast visuals. 

However, buttons and specific "action" cards should utilize a "clipped" aesthetic—where one or two corners remain sharp (0px) while others are rounded—to reinforce the asymmetric theme of the design system. Stroke weights are kept ultra-thin (1px) to maintain a premium, technical feel.

## Components

- **Asymmetric Cards:** These are the centerpiece. They should feature varying heights and widths. Content within (text vs. image) should swap sides in an alternating "zigzag" pattern as the user scrolls.
- **Vibrant Buttons:** High-contrast solid blue fills with white Epilogue Black Italic text. They should have a "glow" hover state that increases the background blur intensity of the layers beneath them.
- **Glass Chips:** Small, pill-shaped indicators with a heavy backdrop blur and high-contrast text. Used for categories like "LIVE," "PLAYER STATS," or "TRADE RUMORS."
- **Editorial Inputs:** Underlined fields rather than boxes, with floating labels in Lexend Bold. The underline should glow vibrant blue when the field is focused.
- **Data Overlays:** Statistics should be presented in massive, semi-transparent Epilogue numbers that sit behind the primary glass container, creating a "ghosted" data effect.
- **Progressive Blur Scrollers:** Horizontal lists where the items at the edges fade into a heavy blur rather than a standard transparency gradient.