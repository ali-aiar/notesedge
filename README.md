# NotesEdge

A dark, GitHub-inspired Hugo theme for technical writers and engineers. Built with a monospace-first design, multi-column layout, and client-side search — no build tools required.

![Hugo Version](https://img.shields.io/badge/Hugo-0.110.0+-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Preview

![Main screen](images/screenshot.png)

---

## Features

- **Dark theme** — GitHub-inspired palette with teal accents
- **3-column layout** — Left sidebar (categories, recent posts), center cards, right sidebar (tags, stack, search)
- **Client-side search** — Fuse.js fuzzy search with `Cmd/Ctrl + K` shortcut
- **Content filtering** — Filter posts by `content_types` taxonomy
- **Post carousel** — 4-post paginated view with previous/next navigation
- **Optional post series** — Add ordered multi-part series with dedicated previous/next-in-series navigation
- **Code highlighting** — Hugo's `github-dark` syntax theme with copy buttons
- **Multiple taxonomies** — `tags`, `categories`, `content_types`
- **Responsive** — Mobile-first, adapts at 900px and 600px breakpoints
- **No framework dependencies** — Vanilla CSS with custom properties, vanilla JS
- **Configurable hero** — Toggle and parameterize the hero section
- **Google Fonts toggle** — Disable web fonts for privacy or performance
- **i18n ready** — All UI strings translatable via `i18n/` files
- **SEO optimized** — Open Graph, Twitter Cards, canonical URLs
- **Extensibility hooks** — Override `head.html` and `comments.html` partials
- **Configurable category colors** — Map categories to custom colors via config

---

## Requirements

- Hugo `0.110.0` or later (extended version recommended)

---

## Quick start

```bash
hugo new site mysite
cd mysite
git init
git submodule add https://github.com/ali-aiar/notesedge themes/notesedge
cp -r themes/notesedge/exampleSite/. .
hugo server
```

---

## Installation

### As a Git submodule

```bash
git submodule add https://github.com/ali-aiar/notesedge themes/notesedge
```

### Manual

Download the theme and place it in your site's `themes/notesedge/` directory.

Then set the theme in your `config.toml`:

```toml
theme = "notesedge"
```

---

## Configuration

Full `config.toml` example:

```toml
baseURL = "https://yoursite.dev"
title   = "yoursite.dev"
languageCode = "en-us"
theme   = "notesedge"
paginate = 10

[taxonomies]
  tag          = "tags"
  category     = "categories"
  content_type = "content_types"

[params]
  show_hero     = true      # Toggle hero section on homepage (default: true)
  google_fonts  = true      # Load JetBrains Mono from Google Fonts (default: true)
  author        = "Your Name"
  tagline       = "I build things and write about <strong>how they work.</strong>"
  description   = "Short bio shown in the hero section."
  role          = "Your Role @ Company"
  location      = "City, Country"
  education     = "University, Degree"

  hero_status   = "Open to opportunities"

  favicon       = "/favicon.svg"
  logo          = "/logo-brand.png"

  github        = "https://github.com/yourusername"
  linkedin      = "https://linkedin.com/in/yourusername"
  email         = "you@example.com"
  theme_repo    = "https://github.com/ali-aiar/notesedge"
  show_theme_credit = true  # Show the theme credit link in the footer (default: true)

  stack = ["Go", "Python", "Docker", "PostgreSQL"]

  code_filename = "profile.go"
  code_name     = "Your Name"
  code_role     = "Your Role"
  code_focus    = ["Topic1", "Topic2", "Topic3"]
  code_writing  = true

  # Optional: Open Graph fallback image
  # og_image    = "/images/og-default.png"

  [params.category_colors]
    robotics     = "#2dd4bf"
    embedded     = "#f97316"
    "go/backend" = "#00ACD7"
    "ai/ml"      = "#7c3aed"
    "cloud/iot"  = "#FF9900"
    devops       = "#326CE5"

  [params.category_thumb_classes]
    robotics     = "thumb-ros"
    embedded     = "thumb-embed"
    "go/backend" = "thumb-go"
    "ai/ml"      = "thumb-ml"
    "cloud/iot"  = "thumb-iot"
    devops       = "thumb-devops"

[markup.highlight]
  style     = "github-dark"
  noClasses = true

[outputs]
  home = ["HTML", "RSS", "JSON"]

[menu]
  [[menu.main]]
    name = "Home"
    url  = "/"
    weight = 1
  [[menu.main]]
    name = "Notes"
    url  = "/notes/"
    weight = 2
  [[menu.main]]
    name = "About"
    url  = "/about/"
    weight = 3
```

### Post Front Matter

In addition to the standard fields, posts can optionally join an ordered series:

```toml
title = "Building a Go API — Part 1"
date = 2025-04-01
categories = ["Go/Backend"]
tags = ["Go", "API", "Series"]
content_types = ["Tutorial"]
authors = ["Your Name"]
series = "Building a Go API"
series_order = 1
summary = "Start a four-part API series with project layout and bootstrapping."
```

When `series` and `series_order` are present, the single-post page prefers navigation within that ordered series. Posts without these fields keep the default section-based previous/next behavior.

---

## Hero Section

The hero section on the homepage is highly customizable. Toggle it with `params.show_hero` (default: `true`).

### Hero Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `show_hero` | Show/hide the entire hero section | `true` |
| `author` | Display name in hero bio | — |
| `tagline` | HTML-enabled tagline below name | — |
| `description` | Short bio paragraph | — |
| `role` | Role shown in status badge | i18n `hero_role_default` |
| `location` | City/country in bio | — |
| `education` | University/degree in bio | — |
| `hero_status` | Status badge text | i18n `hero_status_default` |
| `code_filename` | Filename shown in code block | `"profile.go"` |
| `code_name` | Name field in code block | — |
| `code_role` | Role field in code block | — |
| `code_focus` | Array of focus areas in code block | `[]` |
| `code_writing` | Boolean shown in code block | — |
| `stack` | Array of technology names for pills | `[]` |
| `github` | GitHub profile URL | — |
| `linkedin` | LinkedIn profile URL | — |
| `email` | Contact email | — |
| `theme_repo` | Footer link target for the theme credit | Default NotesEdge repo |
| `show_theme_credit` | Show/hide the site-title-based footer credit link | `true` |

### Category Colors

Map each category to a custom accent color and optional thumbnail CSS class. Colors appear as left-border accents on post cards and category badges.

```toml
[params.category_colors]
  robotics     = "#2dd4bf"
  embedded     = "#f97316"
  "go/backend" = "#00ACD7"

[params.category_thumb_classes]
  robotics     = "thumb-ros"
  embedded     = "thumb-embed"
  "go/backend" = "thumb-go"
```

Keys must match your category names (lowercase). Categories without a mapping fall back to the default teal accent.

---

## Google Fonts

The theme uses **JetBrains Mono** for its monospace aesthetic. By default, it loads this from Google Fonts. If you prefer to use system fonts or host them yourself, set `params.google_fonts = false`.

---

## i18n / Translations

All UI strings are translatable. The theme ships with English defaults in `i18n/en.toml`.

| Key | Default | Used in |
|-----|---------|---------|
| `hero_status_default` | "Available" | Hero status badge |
| `hero_role_default` | "Software Engineer" | Hero status badge |
| `nav_search_placeholder` | "⌕ Search..." | Navigation bar |
| `search_placeholder` | "Search posts, tags, topics..." | Search overlay |
| `search_empty_state` | "Start typing to search..." | Search overlay |
| `search_loading` | "Loading index..." | Search overlay |
| `search_no_results_prefix` | "No results for" | Search overlay |
| `search_load_error` | "Could not load search index." | Search overlay |
| `search_results_summary` | "Showing %END% of %TOTAL% posts" | Search overlay |
| `back_to_posts` | "← back to posts" | Single post page |
| `min_read` | "min read" | Single post page |
| `previous_post` | "← previous" | Post navigation |
| `next_post` | "next →" | Post navigation |
| `previous_in_series` | "← previous in series" | Series post navigation |
| `next_in_series` | "next in series →" | Series post navigation |
| `browse_categories` | "Browse Categories" | Left sidebar |
| `recent_posts` | "Recent Posts" | Left sidebar |
| `filter_all` | "All" | Content type filter |
| `tags_title` | "Tags" | Right sidebar |
| `search_title` | "Search" | Right sidebar |
| `search_sidebar_placeholder` | "Search posts..." | Right sidebar |
| `current_stack` | "Current Stack" | Right sidebar |
| `post_count_suffix` | "posts" | List pages |
| `built_with` | "Built with" | Footer |
| `page_not_found` | "Page Not Found" | 404 page |
| `page_not_found_message` | "The page you're looking for doesn't exist or has been moved." | 404 page |
| `back_to_home` | "← Back to Home" | 404 page |
| `copy` | "copy" | Code block button |
| `copied` | "copied!" | Code block button |
| `carousel_prev` | "Previous" | Post carousel navigation |
| `carousel_next` | "Next" | Post carousel navigation |
| `hero_code_name` | "Name" | Hero section code block |
| `hero_code_role` | "Role" | Hero section code block |
| `hero_code_focus` | "Focus" | Hero section code block |
| `hero_code_writing` | "Writing" | Hero section code block |

### Adding a New Locale

1. Copy `i18n/en.toml` to `i18n/{lang}.toml` (e.g., `i18n/fr.toml`)
2. Translate each `other = "..."` value
3. Set `languageCode` in your site config to match (e.g., `languageCode = "fr"`)

Hugo automatically picks the correct file based on your site's language code.

---

## SEO Meta Tags

The theme automatically generates optimized meta tags for search engines and social sharing:
- Canonical URLs
- Open Graph tags (`og:title`, `og:description`, `og:image`, etc.)
- Article-specific tags for posts (published time, author, tags)
- Twitter Card support (`summary_large_image`)
- RSS autodiscovery

Front matter fields used for SEO:
- `summary` → Description
- `thumbnail` → Social sharing image
- `authors` → Article author
- `tags` → Article tags

Use `params.og_image` in your config as a site-wide fallback image.

---

## Extensibility Hooks

You can customize the theme without modifying its core files using these partial hooks:
1. `layouts/partials/head.html` — Injected into the `<head>` section. Use this for custom meta tags, analytics (e.g., Plausible, Umami), or additional CSS.
2. `layouts/partials/comments.html` — Injected after post content on single pages. Empty by default. Use this to integrate comment systems like Giscus or Disqus.

---

## Search

Search uses [Fuse.js](https://fusejs.io/) v7 loaded from CDN. The search index is generated from Hugo's JSON output at `/index.json`.

**Keyboard shortcut:** `Cmd+K` (macOS) / `Ctrl+K` (Windows/Linux)

Search weights:

| Field | Weight |
|---|---|
| Title | 0.5 |
| Tags | 0.3 |
| Summary | 0.15 |
| Categories | 0.05 |

---

## Layout Structure

```
archetypes/
└── default.md             # Post archetype
assets/
├── css/
│   └── main.css           # Theme stylesheet
└── js/
    ├── carousel.js        # Post carousel logic
    ├── code-block.js      # Code copy button
    └── search.js          # Fuse.js search overlay
i18n/
└── en.toml                # English UI strings
layouts/
├── 404.html
├── index.html             # Homepage with hero + post carousel
├── index.json             # Search index template
├── _default/
│   ├── baseof.html        # Base HTML wrapper
│   ├── single.html        # Individual post page + optional series navigation
│   └── list.html          # Category / tag list pages
├── page/
│   └── about.html         # About page
└── partials/
    ├── card.html
    ├── comments.html       # Comment system hook (empty by default)
    ├── footer.html
    ├── head.html           # SEO meta tags + extensibility hook
    ├── hero.html
    ├── nav.html
    └── search.html
```

---

## License

MIT — see [theme.toml](theme.toml) for details.

---

## Author

Built by [Ali Ilham](https://aliilham.dev)
