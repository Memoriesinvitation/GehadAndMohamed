# Memories Invitation Template

This first iteration is a reusable one-page invitation website made for weddings, engagements, birthdays, Valentine's Day pages, and similar special occasions.

Open `index.html` in a browser to preview it.

## Where To Edit

All of the client-facing content lives in `site-config.js`.

- Change the main couple or celebrant names in `event.coupleNames`.
- Change the main title in `event.heroTitle`.
- Change the event type label in `event.invitationLabel`.
- Change the full date and time in `event.dateTime`.
- Change the venue name, address, description, and map link in:
  `event.venueName`, `event.venueAddress`, `event.venueDescription`, `event.mapsUrl`.
- Change all editable text blocks in the `copy` object.
- Change gallery cards in `media.memoryGallery`.
- Change timeline cards in the `schedule` array.
- Change the RSVP behavior in the `rsvp` object.
- Show or hide sections and inner elements from the `visibility` object.

## One-Place Name Editing

The template is wired so the names across the site come from one main field:

- `event.coupleNames`

Example:

```js
coupleNames: "Mohamed & Gehad"
```

The template automatically derives the short display version for repeated sections.

## Colors

Edit the palette in `theme.colors` inside `site-config.js`.

Main keys:

- `background`
- `backgroundAlt`
- `surface`
- `surfaceStrong`
- `ink`
- `inkSoft`
- `accent`
- `accentDeep`
- `accentSoft`
- `line`
- `shadow`

These values are mapped into CSS variables automatically by `script.js`, so you usually do not need to edit `styles.css` just to change colors.

## Fonts

Edit the font assignments in `theme.fonts` inside `site-config.js`.

- `heading`
- `body`
- `accent`

The current template loads these font families in `index.html`:

- `Cormorant Garamond`
- `Manrope`
- `Allura`

## Images

Image paths are controlled from `site-config.js`.

- `media.partnerOnePhoto`
- `media.partnerTwoPhoto`
- `media.venuePhoto`
- `media.memoryGallery`

You can replace image files with real `.jpg`, `.png`, or `.webp` files and then update the file paths in `site-config.js`.

## Visibility Toggles

The site now has a full visibility system inside `site-config.js`.

- Use `visibility.hero`, `visibility.welcome`, `visibility.date`, `visibility.location`, `visibility.gallery`, `visibility.program`, `visibility.rsvp`, `visibility.message`, and `visibility.closing` to show or hide full blocks.
- Inside each section object, you can also toggle inner parts like eyebrow text, titles, dividers, buttons, captions, and cards.
- For the first hero image pair, use:
  `visibility.hero.portraitOne.*` and `visibility.hero.portraitTwo.*`
- If you hide one portrait card, the remaining portrait will automatically stay centered.
- Each gallery card can be toggled in `media.memoryGallery` with:
  `visible`, `image`, `caption`
- Each program card can be toggled in `schedule` with:
  `visible`, `iconVisible`, `timeVisible`, `titleVisible`, `descriptionVisible`

Example:

```js
visibility: {
  hero: {
    portraitTwo: {
      card: false
    }
  },
  rsvp: {
    eyebrow: false
  }
}
```

That example hides the second landing portrait and also hides the `Your Reply` eyebrow while keeping the rest of the RSVP section visible.

## Audio

To add the song or voice note in the message section:

1. Put your audio file inside `assets/audio/`
2. Set `media.audioSrc` in `site-config.js`

Example:

```js
audioSrc: "assets/audio/our-song.mp3"
```

## RSVP Form

The modal form already works visually.

- If `rsvp.endpoint` is empty, submissions are saved only in the browser `localStorage` for preview/demo purposes.
- If `rsvp.endpoint` is set, the site sends the submission directly from the visitor's browser to that external form service.
- GitHub Pages only hosts the static files. It does not collect RSVP messages by itself.
- In the current setup, RSVP submissions go to Web3Forms using:
  `rsvp.endpoint` and `rsvp.accessKey`
- That means when you publish to a `github.io` domain, the messages still go to your Web3Forms inbox/dashboard side, not into GitHub.

Example:

```js
rsvp: {
  endpoint: "https://api.web3forms.com/submit",
  accessKey: "your-web3forms-key"
}
```

## Fixed Template Design

The decorative, non-client-edit parts are mostly in:

- `styles.css`
- `index.html`
- `assets/images/decor-rings.svg`
- `assets/images/decor-bouquet.svg`

That keeps the core visual style stable while making the occasion-specific content easy to swap.

## Files Overview

- `index.html`: Page structure
- `styles.css`: Template styling and responsiveness
- `site-config.js`: Main editable content, visibility toggles, colors, fonts, links, images
- `script.js`: Dynamic rendering, toggle logic, RSVP modal behavior, audio behavior
