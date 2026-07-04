# UI/UX Design Document
## Portfolio Platform

| | |
|---|---|
| **Document type** | UI/UX Design Document |
| **Companion to** | Software Design Specification v1.0, Design System v1.0 |
| **Version** | 1.0 |

---

## 1. Purpose and Relationship to the SDS

The Software Design Specification defines *how the system is built* — the content model, the block registry, the rendering pipeline. This document defines *how it is experienced* — what a visitor does on the site, what the owner does in the CMS, and why each block, transition, and layout decision exists.

Nothing here should require a change to the content model in the SDS. If a UX decision needs a field that doesn't exist yet, that is a signal to revisit Section 4 of the SDS, not to special-case the frontend.

---

## 2. People and Intent

There are exactly two users of this system, and they should never be designed for at the same time.

### 2.1 The Visitor
Arrives with one of three intents:
- **Evaluating** — a hiring manager or collaborator deciding, in under two minutes, whether this person's work is credible.
- **Studying** — a peer or curious visitor reading a project in depth, willing to spend real time.
- **Reaching out** — someone who has already decided and wants a way to make contact.

The interface should never make one intent pay a tax for the others. A visitor skimming the project grid should not have to wait on animation; a visitor reading a case study should not be interrupted by chrome.

### 2.2 The Owner (Editor)
The one person who logs into the CMS. Their relationship to the tool is closer to a **notebook** than to enterprise software: infrequent, unhurried, and personal. The admin experience should never feel like it's asking to be learned — every field should explain itself in place.

---

## 3. Information Architecture

```
/                    Home — the two-minute pitch
/projects            Project index — the full body of work
/projects/[slug]     Project detail — one piece, in depth
/about               About — the person behind the work
/contact             Contact — the ask
/[slug]              Anything the owner adds later (e.g. /now, /writing, /uses)
```

**Navigation rule:** the nav bar is a live reflection of `Page.showInNav`, never a hardcoded list (per SDS §4.4). This is an information-architecture commitment, not just a technical one — the site's structure is allowed to grow without a design review gate.

**Depth rule:** no page should require more than one click from the nav to reach, and no project should require more than two clicks from Home. Depth is a proxy for how much friction stands between a Visitor and evidence of the work.

---

## 4. Core User Flows

### 4.1 Visitor: Evaluate in two minutes
1. Lands on Home via the Hero — one sentence of positioning, one image or motion moment that represents the work, one clear next step.
2. Scrolls into a `ProjectGridBlock` showing featured work only (`featured: true`), not the full catalog — curation over completeness.
3. Opens the strongest project without leaving Home in a dead end (opens in the same tab, back button returns to the same scroll position).
4. Either continues to `/projects` for more, or to `/contact` if already convinced.

**Design implication:** the Home hero and the featured grid carry the entire weight of the "evaluating" journey. They receive the highest craft budget on the site.

### 4.2 Visitor: Study a project in depth
1. Enters via `/projects` or directly via a shared link.
2. Reads the project detail page top to bottom: cover image, summary, tech stack, then a freeform `body: Block[]` — the same composability as a Page, so a project can be a case study, a gallery, or a long write-up without the template dictating which.
3. Exits via `liveUrl`/`repoUrl` (external) or via a "more projects" prompt at the foot of the page — the page should never dead-end without a next action.

### 4.3 Visitor: Reach out
1. Arrives at `/contact` via nav, a Home CTA, or the end of a project page.
2. Encounters a `ContactFormBlock` with the minimum viable fields — name, email, message. No field exists that the owner won't personally read.
3. Submits; sees an explicit confirmation state in the interface's voice ("Message sent — I'll reply within a few days"), never a bare success flag.
4. On validation failure, sees exactly what to fix, inline, without losing what they already typed.

### 4.4 Owner: Publish a new page without a deploy
This flow is the experiential proof of SDS §5.3 and deserves its own UX attention, not just backend correctness.
1. Owner opens the CMS admin and creates a `Page`.
2. Adds blocks in a visual, ordered list — the admin should represent blocks as stacked cards that can be reordered by drag, mirroring how they'll stack on the live page.
3. Each block's admin form asks only for what that block needs — no shared "content" textarea trying to serve every block type.
4. Owner publishes. The CMS gives immediate confirmation with a direct link to the live page — closing the loop the SDS's webhook opens.

---

## 5. Layout and Page-Level Composition

### 5.1 The block stack as the unit of design
Because every page is `Block[]`, the fundamental UX unit is not "the Home page" or "the About page" — it is the **block-to-block transition**. Two adjacent blocks should never feel like they belong to different sites, regardless of which page they're assembled into. This is enforced through the shared spacing, type, and color tokens defined in the Design System document, not through page-specific overrides.

### 5.2 Rhythm between blocks
- Blocks alternate visual density: a dense block (gallery, grid) is never immediately followed by another dense block without a breathing block (rich text, a divider moment) between them.
- Vertical spacing between blocks is fixed by role (§6 of the Design System), not chosen per page — this is what keeps a page assembled from arbitrary blocks from feeling arbitrary.

### 5.3 Responsive behavior
| Breakpoint | Behavior |
|---|---|
| ≥ 1200px | Full block layouts (multi-column grids, side-by-side hero). |
| 768–1199px | Grids collapse to two columns; hero stacks text above image. |
| < 768px | Single column throughout; `TimelineBlock` switches from horizontal to vertical; `ImageGalleryBlock` becomes a swipeable strip, not a shrunk grid. |

No block may simply scale down its desktop layout at small sizes — each has an explicit mobile composition, specified with the block in the Design System's component library.

---

## 6. Interaction Design by Block

| Block | Primary interaction | Notes |
|---|---|---|
| `HeroBlock` | Single CTA, one visual focal point | No carousel — one message stated once. |
| `RichTextBlock` | Reading only | No interactive elements inside prose; links are the only affordance. |
| `ProjectGridBlock` | Hover reveals project title/tags; click opens detail | Filtering by `tag` is a static server-side query, not client-side UI, unless a future revision calls for it explicitly. |
| `ImageGalleryBlock` | Click to enlarge (lightbox), keyboard arrow navigation | Never auto-plays. |
| `TimelineBlock` | Scroll-linked progressive reveal, not click-to-expand | Order is real information here — see Design System §7 on when sequence markers are earned. |
| `ContactFormBlock` | Inline validation on blur, not only on submit | Errors are specific ("Enter a valid email"), never generic ("Invalid input"). |
| `CustomEmbedBlock` | Whatever the embed provides | Must be visually contained (bordered, captioned) so it reads as *part of* the page, not a foreign iframe dropped in. |

---

## 7. Accessibility Requirements

- All interactive elements reachable and operable by keyboard alone; visible focus states on every focusable element (never suppressed for aesthetics).
- Color is never the only signal for state (form errors, active nav item) — paired with icon, text, or underline.
- Motion respects `prefers-reduced-motion`: scroll-linked reveals and hero animation degrade to an instant, static state.
- Text contrast meets WCAG AA at minimum against every background token defined in the Design System; hero text over imagery uses a scrim rather than assuming contrast.
- Every `Image` field in the content model requires alt text at the schema level — this is a content-model rule, not just a frontend convention, so it can't be skipped by an empty field.

---

## 8. Content and Voice in the Interface

- Buttons name the action, not the mechanism: "Send message," not "Submit"; "View project," not "Read more."
- Empty states are written as invitations, not apologies: an empty `ProjectGridBlock` (before any project is `featured`) should say what to do next in the owner's voice during editing, and simply not render on the public site rather than show a placeholder.
- Errors state what happened and what to do, without blaming the visitor: "That email doesn't look complete — check the @ and domain."
- The same word is used for the same action everywhere it appears — "Publish" in the CMS always produces a state described as "Published," never "Live" in one place and "Saved" in another.

---

## 9. What Is Deliberately Not Designed Here

- Visual specification of exact colors, type sizes, and spacing values — defined in the companion Design System document, which this document defers to entirely rather than duplicating.
- CMS admin visual chrome beyond the interaction principles in §4.4 — the admin shell is inherited from Payload per SDS §3, and effort is not spent re-skinning it beyond what §4.4 requires.
