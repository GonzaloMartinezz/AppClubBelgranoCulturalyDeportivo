# Guía de Estilos - AppClubBelgrano

## Paleta de Colores

### Brand (Primario)
- **Brand Base:** `#1A4FD4` (Azul principal)
- **Brand Light:** `#2E63E8` (Azul claro)
- **Brand Dark:** `#0F2F80` (Azul oscuro)

### Acentos
- **Accent 1:** `#F97316` (Naranja)
- **Accent 2:** `#00D4FF` (Cyan)

### Superficies (Dark Theme)
- **Dark:** `#0A0A0A` (Casi negro)
- **Dark 2:** `#111111`
- **Surface:** `#171717` (Base de cards)
- **Surface 2:** `#1F1F1F` (Hover subtle)
- **Surface 3:** `#262626` (Scrollbar, dividers)

### Grises (Neutral)
- **Muted:** `#A3A3A3` (Light gray - text secundario)
- **Muted 2:** `#737373` (Gray)
- **Muted 3:** `#404040` (Dark gray)

## Tipografía

### Fuentes
- **Sans (Cuerpo):** Inter, ui-sans-serif, system-ui
- **Display/Bold:** Oswald, sans-serif
- **Headlines:** Teko, sans-serif
- **Condensed:** Barlow Condensed, sans-serif

### Escalas
- Body: 16px (base)
- Títulos: Varía por sección, usar `font-teko` o `font-oswald`
- Pequeño: 14px

## Componentes

### Botones

**btn-brutal** (Primario)
- Fondo: Brand (#1A4FD4)
- Padding: 14px 32px
- Uppercase, font-teko
- Hover: Invierte color, desplaza -4px -4px con sombra

**btn-brutal-outline** (Secundario)
- Fondo: Transparent
- Border: rgba(255,255,255,0.2)
- Mismo hover que brutal

### Cards

**card-premium**
- Background: Surface (#171717)
- Border: 1px rgba(255,255,255,0.06)
- Radius: 2px (brutalist)
- Hover: Levanta (-8px), border brand-color, sombra 0 30px 60px -12px

### Inputs

**input-base**
- Background: rgba(255,255,255,0.04)
- Border: 1px rgba(255,255,255,0.08)
- Radius: 10px
- Focus: Brand border + slight highlight

### Glassmorphism

**glass**
- Background: rgba(23, 23, 23, 0.7)
- Backdrop filter: blur(12px)
- Border: 1px rgba(255,255,255,0.08)

**glass-light**
- Background: rgba(255,255,255,0.03)
- Backdrop filter: blur(8px)
- Border: 1px rgba(255,255,255,0.05)

## Animaciones

### Keyframes Disponibles
- **marquee:** Scroll infinito (30s)
- **fadeUp:** Fade in + slide up 30px (0.8s)
- **reveal:** Clip-path reveal (1.2s)
- **shimmer:** Efecto shimmer (2s)

### Timing
- Rápido: 0.2-0.3s (hover effects)
- Normal: 0.5-0.8s (transiciones)
- Lento: 1.2s+ (reveals)
- Easing: cubic-bezier(0.2, 0.8, 0.2, 1) por defecto

## Espaciado

### Contenedor Principal
- **app-container:** max-width 1200px, padding 0 24px, margin 0 auto

### Padding/Margin Estándar
- XS: 8px
- SM: 12-16px
- MD: 20-24px
- LG: 32px
- XL: 40-48px

## Utilidades Premium

- **text-gradient:** Gradient blanco con fallback
- **text-stroke:** Efecto stroke de texto
- **shimmer:** Fondo con animación shimmer
- **hover-underline:** Subrayado dinámico en hover
- **section-label:** Label pequeño uppercase con accent color
- **divider:** Línea gradient

## Dark Mode

El sitio es completamente dark mode. No hay light mode implementado.

## Responsive Design

Basado en Tailwind CSS breakpoints:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## Notas de Implementación

1. Usar clases de Tailwind primero
2. Para efectos complejos usar clases CSS personalizadas (`glass`, `card-premium`, etc.)
3. Mantener animations suaves pero rápidas
4. Brand color (#1A4FD4) como acento principal
5. Máximo contraste con fondo oscuro para legibilidad
