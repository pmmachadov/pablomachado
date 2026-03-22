# 🤖 IA Chat - Página Protegida

> **⚠️ IMPORTANTE PARA AGENTES:** No hagas `git push` a menos que el usuario lo solicite explícitamente. El usuario prefiere manejar los commits y pushes manualmente.

Esta es una página privada accesible solo con contraseña en `pablomachado.dev/ia`

## Características

- 🔒 **Protección por contraseña**: Solo accesible con la contraseña maestra
- 🤖 **Integración con Kimi 2.5**: Usa la API de Moonshot AI
- 💾 **Persistencia local**: Los mensajes se guardan en localStorage
- 📥 **Exportación a Markdown**: Descarga tu conversación como archivo .md
- ⚙️ **Prompt de sistema configurable**: Personaliza el comportamiento de la IA
- 🎨 **Diseño oscuro**: Interfaz minimalista con fondo negro
- 🤫 **Sin enlaces públicos**: No hay acceso desde la página principal

## Configuración

### Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
KIMI_API_KEY=tu_api_key_de_moonshot
```

Obtén tu API key en: https://platform.moonshot.cn/

### Contraseña

La contraseña está hardcodeada en el archivo `pages/ia.tsx` (línea 19). Es la contraseña larga que proporcionaste.

## Despliegue

Esta página requiere un servidor Node.js porque usa API routes de Next.js. No funciona con exportación estática.

### Opciones de hosting recomendadas:

1. **Vercel** (recomendado): `vercel --prod`
2. **Railway**: Conecta tu repo y despliega
3. **Render**: Servicio web con Node.js
4. **Servidor propio**: `npm run build && npm start`

### Construcción local:

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

## Uso

1. Ve a `pablomachado.dev/ia`
2. Ingresa la contraseña
3. ¡Comienza a chatear con Kimi!

### Funcionalidades:

- **Enter**: Enviar mensaje
- **Shift + Enter**: Nueva línea
- **⚙️ Configuración**: Define el prompt del sistema
- **💾 Exportar**: Descarga la conversación como .md
- **🗑️ Borrar**: Limpia todo el historial

## Seguridad

- ✅ La API key nunca se expone al cliente
- ✅ La contraseña se verifica solo en el cliente (para esta implementación simple)
- ✅ La página tiene `noindex, nofollow` para evitar indexación
- ✅ Sin enlaces desde la página principal

## Notas

- Los datos se guardan en el navegador (localStorage)
- Si cambias de navegador o dispositivo, perderás el historial
- Usa la función de exportar para hacer backup de conversaciones importantes

---

# AGENTS.md - AI Coding Agent Guide

> This file contains essential information for AI coding agents working on this project. Last updated: 2026-03-22

## Project Overview

This is a **personal portfolio website** for Pablo Machado, a Full Stack Web Developer based in Barcelona. The site showcases professional experience, technical skills, and project portfolio.

**Key Features:**
- Single-page application (SPA) with smooth scroll navigation
- Dark/Light theme toggle with persistent user preference
- Responsive design optimized for all devices
- AI Chat page (`/ia`) - password-protected interface for interacting with Kimi AI API
- SEO-optimized for recruiters and search engines

**Live Site:** https://pablomachado.dev

---

## Technology Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14.2.3 (Pages Router) |
| Language | TypeScript 5.4.5 |
| React | 18.2.0 |
| Styling | Sass (SCSS) + CSS Modules |
| Animation | Framer Motion |
| Icons | Font Awesome (React) |
| Fonts | Archivo Black, Ubuntu (via @fontsource) |
| Testing | Cypress (E2E) |
| Deployment | Netlify (with Next.js plugin) |
| AI API | Moonshot AI (Kimi API) |

---

## Project Structure

```
.
├── pages/                      # Next.js pages (file-system routing)
│   ├── _app.tsx               # App wrapper (theme, fonts)
│   ├── _document.tsx          # Custom document
│   ├── index.tsx              # Homepage (portfolio)
│   ├── ia.tsx                 # AI Chat page (protected)
│   └── api/
│       └── chat.ts            # API route for Kimi AI
│
├── components/                 # Reusable React components
│   ├── Navbar.tsx             # Navigation with theme toggle
│   ├── SectionCard.tsx        # Wrapper for page sections
│   ├── ProjectCard.tsx        # Project display card
│   ├── SkillCard.tsx          # Skill item display
│   ├── Footer.tsx             # Site footer
│   ├── SocialBar.tsx          # Social links sidebar
│   └── ... (see full list in directory)
│
├── sections/                   # Page section components
│   ├── Intro.tsx              # Hero/About section
│   ├── Skills.tsx             # Technical skills showcase
│   ├── Projects.tsx           # Project portfolio grid
│   ├── Contact.tsx            # Contact form section
│   └── Me.tsx                 # Data constants (links, skills, projects)
│
├── contexts/                   # React Context providers
│   ├── ThemeContext.ts        # Dark/Light theme state
│   └── NavLocationContext.ts  # Navigation tracking
│
├── hooks/                      # Custom React hooks
│   ├── useIntersectionObserver.ts  # Scroll visibility detection
│   └── useWindowSize.ts       # Window dimensions
│
├── styles/                     # Styling files
│   ├── globals.css            # Global styles, CSS variables
│   ├── _variables.sass        # Sass variables
│   ├── _utility.sass          # Utility classes
│   └── *.module.sass          # Component-scoped styles
│
├── types.ts                    # TypeScript type definitions
├── public/                     # Static assets
│   ├── assets/images/         # Project screenshots, photos
│   ├── icons/                 # Custom icons
│   ├── cv-pablo-machado.pdf   # Downloadable CV
│   └── ...
│
├── cypress/                    # E2E tests
│   ├── e2e/spec.cy.ts         # Main test suite
│   └── support/               # Custom commands
│
└── Configuration files
    ├── next.config.js         # Next.js config (static export)
    ├── tsconfig.json          # TypeScript config with path aliases
    ├── netlify.toml           # Netlify deployment config
    └── .eslintrc.json         # ESLint (Next.js defaults)
```

---

## Path Aliases (tsconfig.json)

Use these aliases for imports:

| Alias | Maps to |
|-------|---------|
| `@components/*` | `components/*` |
| `@sections/*` | `sections/*` |
| `@hooks/*` | `hooks/*` |
| `@contexts/*` | `contexts/*` |
| `@styles/*` | `styles/*` |
| `@public/*` | `public/*` |

**Example:**
```typescript
import Navbar from '@components/Navbar';
import styles from '@styles/Intro.module.sass';
```

---

## Build and Development Commands

```bash
# Install dependencies
npm install

# Development server (localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint

# Run Cypress E2E tests (requires dev server running)
npx cypress open
```

---

## Key Implementation Details

### Theme System
- Themes defined in `contexts/ThemeContext.ts` with `ThemeOptions` enum (`Dark` | `Light`)
- Theme preference persisted in `localStorage`
- Theme toggle component: `components/SwitchBtn.tsx`
- CSS transitions handled via `globals.css` and Sass variables (`$theme-transition: 750ms`)

### Navigation
- Smooth scroll to section via anchor links (`#intro`, `#skills`, `#projects`, `#contact`)
- Navigation items defined in `sections/Me.tsx` under `links` array
- Active section tracking via Intersection Observer (`hooks/useIntersectionObserver.ts`)

### Content Data
All portfolio content (projects, skills, social links) is stored in `sections/Me.tsx`:
- `projectData`: Array of project cards with images, descriptions, links
- `skillcard_Frontend`, `skillcard_Backend`, `skillcard_Tools`: Skill categories
- `socialLinks`: GitHub and LinkedIn links
- `links`: Navigation items with icons

### AI Chat Page (`/ia`)
- Password-protected (hardcoded password in `pages/ia.tsx`)
- Requires `KIMI_API_KEY` environment variable
- Encrypted localStorage persistence for chat history
- Features: model selection, system prompt configuration, markdown export, font size control

---

## Testing Strategy

**E2E Testing with Cypress:**
- Test file: `cypress/e2e/spec.cy.ts`
- Custom commands in `cypress/support/commands.ts`:
  - `cy.getByData(key, value)` - Select by data attribute
  - `cy.inViewport(element, inView)` - Check element visibility

**Test Coverage:**
- Navigation scroll behavior
- Section visibility in viewport

**To run tests:**
```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Open Cypress
npx cypress open
```

---

## Environment Variables

Create `.env.local` file (not committed to git):

```env
# Required for AI Chat functionality
KIMI_API_KEY=your_moonshot_api_key_here
```

Get API key at: https://platform.moonshot.cn/

---

## Deployment

**Primary Platform:** Netlify

Configuration in `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `.next`
- Uses `@netlify/plugin-nextjs` for Next.js support

**GitHub Pages (alternative):**
- Static export configured in `next.config.js`
- See `DEPLOYMENT.md` for details

---

## Code Style Guidelines

### TypeScript
- Strict mode enabled in `tsconfig.json`
- Prefer explicit types over `any`
- Use interfaces for component props (defined in file or `types.ts`)

### React Components
- Functional components with hooks
- Props interface named `Props` or `{ComponentName}Props`
- Export default at end of file

### Styling
- Component-scoped: `ComponentName.module.sass`
- Global styles: `globals.css` for resets, base styles, CSS variables
- Use `className={styles.className}` pattern

### File Naming
- Components: PascalCase (e.g., `Navbar.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useWindowSize.ts`)
- Styles: ComponentName.module.sass
- Pages: lowercase (Next.js convention)

---

## Security Considerations

1. **AI Chat Password:** Hardcoded in `pages/ia.tsx` (client-side only protection)
2. **API Keys:** Never expose in client-side code; use API routes (`pages/api/`)
3. **AI Chat Page:** Has `noindex, nofollow` meta tags to prevent search indexing
4. **No Backend Database:** All data is static or client-side persisted

---

## Common Tasks

### Adding a New Project
1. Add project image to `public/assets/images/`
2. Add project entry to `projectData` array in `sections/Me.tsx`
3. Include: title, image path, description, links array

### Adding a New Skill
1. Add skill to appropriate category array in `sections/Me.tsx`
2. Use Font Awesome icons or add custom icon to `public/icons/`
3. Use `CustomIcon` component for PNG icons

### Adding a New Section
1. Create component in `sections/` directory
2. Wrap with `SectionCard` component
3. Add to `pages/index.tsx` in the main content area
4. Add navigation link in `sections/Me.tsx` `links` array

### Modifying Theme Colors
- Light/Dark theme values in `sections/Me.tsx` (`lightTheme`, `darkTheme` objects)
- CSS transitions in `styles/_variables.sass`

---

## Dependencies Notes

**Key Runtime Dependencies:**
- `framer-motion`: Page animations and transitions
- `react-syntax-highlighter`: Code highlighting in AI chat
- `react-responsive`: Responsive breakpoints in JS
- `lodash.debounce`: Input debouncing

**Development Dependencies:**
- `cypress`: E2E testing
- `puppeteer`: Browser automation (for testing/screenshots)
- `sharp`: Image optimization
- `@netlify/plugin-nextjs`: Netlify deployment support

---

## Troubleshooting

**Build fails on Netlify:**
- Check `netlify.toml` configuration
- Ensure `@netlify/plugin-nextjs` is installed
- Verify Node.js version (see `.nvmrc`)

**Images not loading:**
- Static images must be in `public/` directory
- Reference with root-relative paths: `/assets/images/...`

**TypeScript path aliases not working:**
- Ensure imports use `@components/` syntax
- Check `tsconfig.json` paths configuration

**Cypress tests failing:**
- Verify dev server is running on localhost:3000
- Check for custom commands in `cypress/support/commands.ts`

---

# Deployment to pablomachado.dev

This portfolio is automatically deployed to GitHub Pages at [pablomachado.dev](https://pablomachado.dev).

## Setup Complete ✅

- ✅ Next.js configured for static export
- ✅ GitHub Actions workflow for automatic deployment
- ✅ Custom domain CNAME file configured

## How it works

Every push to the `main` branch triggers an automatic build and deployment via GitHub Actions.

## Local Development

```bash
npm install
npm run dev
```

## Build Static Site

```bash
npm run build
```

This creates an `out/` directory with the static site.
