# 🎬 CineMatch — Movie Recommendation System

A frontend-only movie recommendation web app built as an **internship project** by **Nithin Kumar**.  
Browse a curated catalog of Telugu, Hindi, Tamil, Malayalam, English, and Korean movies with real posters, filters, search, and theme switching.

🔗 **Live Preview:** built with Lovable + TanStack Start

---

## ✨ Features

- 🎞️ **142+ Movies** across 6 languages and multiple categories (Classics, Love/College, Recent).
- 🖼️ **Real TMDB Posters** for every movie (with graceful fallback).
- 🔍 **Search** by title.
- 🎚️ **Dropdown Filters** — Language, Category, Sort (Default / Newest / Title).
- 🎨 **Themes** — Light, Dark, and Rose Lavender — with smooth 400ms transitions.
- 📱 **Responsive Grid** — 2 to 6 columns based on screen size.
- 💾 Theme preference persisted in `localStorage`.

---

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **TanStack Start** (file-based routing)
- **Vite 7** (build tool)
- **Tailwind CSS v4** (semantic design tokens)
- **TMDB** image CDN for posters

---

## 🚀 Getting Started

```bash
# Install dependencies
bun install

# Start the dev server
bun dev

# Build for production
bun run build
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 📂 Project Structure

```
src/
├── routes/
│   ├── __root.tsx      # Root layout
│   └── index.tsx       # Home page with movie grid + filters
├── components/ui/      # Shared UI components
├── styles.css          # Tailwind + theme tokens
└── router.tsx          # Router configuration
```

---

## 🎨 Themes

| Theme         | Vibe                                  |
| ------------- | ------------------------------------- |
| Light         | Clean, bright, default                |
| Dark          | Cinematic, low-light friendly         |
| Rose Lavender | Soft pink/purple aesthetic            |

Switch themes from the dropdown in the header — transitions animate smoothly.

---

## 📜 License

Released under the **MIT License**. See [LICENSE](./LICENSE) for details.

---

## 👨‍💻 Author

**Nithin Kumar** — Internship Project, 2026

© 2026 CineMatch by Nithin Kumar
