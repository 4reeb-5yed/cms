# Design System
## Portfolio Platform — "Fieldnote"

| | |
|---|---|
| **Document type** | Design System Specification |
| **Companion to** | Software Design Specification v1.0, UI/UX Design Document v1.0 |
| **Version** | 1.0 |

---

## 1. Premise

This system is named **Fieldnote** — the working notebook of someone who builds things, not the brochure they hand out afterward. The visual language should feel like the residue of real work: ink, paper, measured marks, the occasional correction left visible. Every token below exists to support that premise. If a future addition doesn't trace back to it, it doesn't belong in the system.

This is a deliberate departure from the two visual defaults this kind of brief most often collapses into — a warm-cream background with a high-contrast serif and a terracotta accent, or a stark near-black surface with one neon accent. Fieldnote is neither: it is closer to a linen ledger than to a landing-page template.

---

## 2. Color

### 2.1 Palette
| Token | Hex | Role |
|---|---|---|
| `ink` | `#211F1A` | Primary text, primary UI ink |
| `stone` | `#E8E3D6` | Primary background — a raw paper tone, cooler and greyer than a typical cream |
| `charcoal` | `#2C2A24` | Dark surfaces (footer, code blocks, admin chrome accents) |
| `ember` | `#B3502C` | Primary accent — calls to action, active states, links in prose |
| `moss` | `#556253` | Secondary accent — tags, secondary buttons, project categories |
| `brass` | `#A6813F` | Tertiary accent — metadata, dates, small emphasis, dividers |

### 2.2 Usage rules
- `ink` on `stone` is the default reading pair; it is never inverted for decorative reasons.
- `ember` is reserved for the single most important action on a screen (one primary CTA per view). If two elements compete for `ember`, one of them is wrong, not the color.
- `moss` and `brass` never appear as a page's dominant color — they exist to mark, not to fill.
- `charcoal` is used for surfaces that recede (footer, code, embed containers), never for primary content backgrounds.

### 2.3 Contrast compliance
| Pair | Ratio | Use |
|---|---|---|
| `ink` on `stone` | 12.1:1 | Body text |
| `stone` on `charcoal` | 11.4:1 | Footer text |
| `stone` on `ember` | 4.6:1 | Button labels (AA, large/bold text only — pair with 16px+ semibold minimum) |
| `ink` on `brass`-tinted backgrounds | Verify per instance | `brass` is a token for accents/dividers, not a text background |

Any new color combination introduced later must be checked against this table's method before use — the accent palette is intentionally narrow to keep this checkable by hand.

---

## 3. Typography

### 3.1 Type roles
| Role | Typeface | Used for |
|---|---|---|
| Display | **Instrument Serif** | Hero headlines, section titles, pull quotes — used sparingly, never for body copy |
| Body / UI | **General Sans** | Navigation, buttons, labels, form fields, and all long-form `RichTextBlock` content |
| Meta / Mono | **JetBrains Mono** | Dates, tags, tech-stack labels, code embeds, form field hints |

**Pairing rationale:** Instrument Serif carries the "handwritten notebook" personality at large sizes without becoming precious; General Sans stays out of the way at reading sizes so long project write-ups don't fight the display face; JetBrains Mono marks anything that is *data about the content* (a date, a tag, a stack name) so a reader can distinguish authored prose from system metadata at a glance.

### 3.2 Type scale
| Token | Size / Line-height | Weight | Role |
|---|---|---|---|
| `display-xl` | 64px / 1.05 | 400 | Home hero headline |
| `display-l` | 44px / 1.1 | 400 | Page/section titles |
| `display-m` | 28px / 1.2 | 500 | Project titles, card headings |
| `body-l` | 19px / 1.7 | 400 | `RichTextBlock` reading copy |
| `body-m` | 16px / 1.6 | 400 | Default UI text, form fields |
| `body-s` | 14px / 1.5 | 500 | Buttons, nav labels |
| `meta` | 12.5px / 1.4, tracked +0.04em | 500 | Dates, tags, captions (mono) |

### 3.3 Rules
- Display type is never justified, never used below 24px, and never set in a paragraph longer than one sentence.
- Line length for `body-l` is capped at 68 characters regardless of viewport width, to protect the reading experience singled out in SDS §7.2.
- Only one `display-xl` may exist per page.

---

## 4. Spacing and Grid

### 4.1 Base unit
`4px`. All spacing tokens are multiples of it, so nothing in the interface is spaced "by eye."

| Token | Value |
|---|---|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-12` | 48px |
| `space-16` | 64px |
| `space-24` | 96px |

### 4.2 Block rhythm
- Space between two blocks on a page: `space-24` (96px) at desktop, `space-12` (48px) at mobile — fixed, per UI/UX §5.2, never chosen per page.
- Internal block padding: `space-8` minimum on all sides at desktop, `space-4` at mobile.

### 4.3 Grid
- 12-column grid, `max-width: 1200px`, `space-6` gutters.
- Content-heavy blocks (`RichTextBlock`) constrain to an 8-column measure within that grid, even on wide screens — width is capped for reading, not for decoration.

---

## 5. Iconography and Imagery

- Icons: a single-weight line icon set (1.5px stroke), never mixed with filled icons in the same view. Icons illustrate, they do not decorate — no icon appears without a function (navigation, action, or status).
- Photography/imagery: natural light, minimal post-processing, real texture over polish — an image of work-in-progress is preferred over a staged "hero" shot where both are available. This is a direct expression of the Fieldnote premise: evidence over performance.
- Cover images (`Project.coverImage`) are cropped to a consistent 3:2 ratio across the grid so the `ProjectGridBlock` reads as a considered set, not a scramble of arbitrary aspect ratios.

---

## 6. Motion

### 6.1 Principle
One considered moment per view, not ambient motion throughout — directly inheriting SDS §7.5. Motion here marks arrival and transition, not decoration.

### 6.2 Tokens
| Token | Duration | Easing | Use |
|---|---|---|---|
| `motion-instant` | 100ms | linear | Hover state changes, focus rings |
| `motion-standard` | 240ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Block-to-block scroll reveals, modal/lightbox open |
| `motion-deliberate` | 480ms | `cubic-bezier(0.16, 1, 0.3, 1)` | The single hero entrance moment on Home |

### 6.3 Rules
- No more than one `motion-deliberate` animation exists on any single page.
- All motion respects `prefers-reduced-motion: reduce` by collapsing to the end state instantly — never omitted from testing per SDS §9.
- Hover states use `motion-instant` only; anything slower reads as sluggish on interactive elements.

---

## 7. Structural Devices

Numbered markers, eyebrows, and dividers are used only where they encode real information:
- **Numbered markers** appear only on the `TimelineBlock`, where order is genuine chronology — never as decorative "01 / 02 / 03" labels on non-sequential content like the project grid.
- **Eyebrows** (small mono labels above a heading) are used to name the *category* of what follows (e.g. "PROJECT" above a title), not as a rhythmic design habit repeated on every block regardless of need.
- **Dividers** (`brass`, 1px) separate blocks only when adjacent blocks would otherwise visually merge (e.g. two text-heavy blocks in a row) — not placed as a default habit between every block.

---

## 8. Component Specifications

### 8.1 Button
| Variant | Background | Text | Border |
|---|---|---|---|
| Primary | `ember` | `stone` | none |
| Secondary | transparent | `ink` | 1px `ink` |
| Tertiary (text link) | transparent | `ember` | underline on hover only |

- Radius: 2px — a drafted corner, not a soft rounded one; consistent with the notebook/ledger premise.
- Padding: `space-3` vertical, `space-6` horizontal.
- States: hover darkens `ember` by 8%; focus adds a 2px `ink` outline offset by 2px; disabled reduces opacity to 40% and removes hover/focus behavior entirely.

### 8.2 Tag / Chip (tech stack, categories)
- `moss` text on transparent background, 1px `moss` border, `meta` type, radius 2px, `space-1`/`space-3` padding.

### 8.3 Card (`ProjectGridBlock` item)
- Background `stone`, 1px `ink` border at 12% opacity, cover image at 3:2, `display-m` title, one line of `body-m` summary, tags row in `meta`.
- Hover: border opacity increases to 100%, no shadow — depth here is expressed through line weight, not elevation blur, to stay consistent with the flat, drafted visual language.

### 8.4 Form field
- Bottom-border-only input style (1px `ink`, 40% opacity at rest), no filled background — evokes a ruled notebook line rather than a boxed web form.
- On focus, border becomes `ember`, full opacity, 2px.
- Error state: border becomes a muted red-brown derived from `ember` at reduced saturation (`#8C4433`), with inline message in `body-s` beneath the field, never only a color change.

### 8.5 Navigation bar
- `stone` background, `ink` text, `body-s` weight, active item underlined in `ember` (2px, offset 4px) rather than filled or boxed — a mark, not a container.

### 8.6 Timeline item
- Left-aligned marker line in `brass`, node as a 8px diamond (not a circle — a small, deliberate geometric signature echoed nowhere else in the system, reserved for genuine sequence).

---

## 9. Dark Surfaces

`charcoal` (§2.1) governs the footer and any code/embed block. Within these surfaces:
- Text is `stone`, not pure white — preserving the paper-toned relationship rather than switching to a colder dark-mode palette.
- `ember` remains the only accent; `moss` and `brass` are used at reduced opacity (70%) to keep dark surfaces from becoming a second, competing brand.

---

## 10. Voice in Interface Copy

Governed jointly with UI/UX §8; restated here as design tokens for copy, not just guidance:
- Sentence case everywhere — no interface text is set in Title Case or ALL CAPS except `meta`-styled labels, where uppercase is a typographic signal of "this is metadata," not a stylistic default.
- Every action button uses a verb the visitor already used to think about the action ("Send," "View," "Download") — never system language ("Submit," "Execute," "Proceed").

---

## 11. Do / Don't Summary

| Do | Don't |
|---|---|
| Use `ember` for exactly one action per view | Spread the accent color across every button on a page |
| Let line weight express hierarchy and depth | Reach for drop shadows as a default depth cue |
| Reserve numbered markers for real sequence | Number things (features, cards) just for rhythm |
| Cap reading width at 68 characters | Let `RichTextBlock` stretch full-width on large screens |
| Use one `motion-deliberate` moment per page | Animate every element on scroll |
| Crop project covers to a consistent ratio | Let the grid show mismatched image shapes |

---

## 12. Token Reference (for implementation)

```css
:root {
  /* color */
  --ink: #211F1A;
  --stone: #E8E3D6;
  --charcoal: #2C2A24;
  --ember: #B3502C;
  --moss: #556253;
  --brass: #A6813F;

  /* type */
  --font-display: 'Instrument Serif', serif;
  --font-body: 'General Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* space */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px;
  --space-4: 16px; --space-6: 24px; --space-8: 32px;
  --space-12: 48px; --space-16: 64px; --space-24: 96px;

  /* motion */
  --motion-instant: 100ms linear;
  --motion-standard: 240ms cubic-bezier(0.4, 0, 0.2, 1);
  --motion-deliberate: 480ms cubic-bezier(0.16, 1, 0.3, 1);

  /* radius */
  --radius: 2px;
}
```
