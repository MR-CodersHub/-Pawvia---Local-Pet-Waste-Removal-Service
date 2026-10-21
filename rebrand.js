/**
 * PAWVIA REBRAND SCRIPT
 * Replaces all "Doody Patrol" branding with "Pawvia" across the full website.
 */

const fs = require('fs');

// ─── NEW LOGO HTML (header) ─────────────────────────────────────────────────
const HEADER_LOGO = `<a href="index.html" class="logo" aria-label="Pawvia Homepage">
        <div class="logo-icon">
          <svg width="26" height="26" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="19" cy="20" rx="4.8" ry="6.8" transform="rotate(-18 19 20)" fill="currentColor" opacity="0.7"/>
            <ellipse cx="27.5" cy="15" rx="5" ry="7.2" transform="rotate(-5 27.5 15)" fill="currentColor"/>
            <ellipse cx="36.5" cy="15" rx="5" ry="7.2" transform="rotate(5 36.5 15)" fill="currentColor"/>
            <ellipse cx="45" cy="20" rx="4.8" ry="6.8" transform="rotate(18 45 20)" fill="currentColor" opacity="0.7"/>
            <path d="M32 23.5 C21 23.5 14 30.5 14 39 C14 47 21.5 52.5 32 52.5 C42.5 52.5 50 47 50 39 C50 30.5 43 23.5 32 23.5 Z" fill="currentColor"/>
          </svg>
        </div>
        <div class="logo-text-group">
          <span class="logo-title">Paw<span>via</span></span>
          <span class="logo-tagline">Pet Waste Removal</span>
        </div>
      </a>`;

// ─── NEW LOGO HTML (footer) ─────────────────────────────────────────────────
const FOOTER_LOGO = `<a href="index.html" class="logo">
            <div class="logo-icon" style="background:var(--color-warm-cream); color:var(--color-forest-green);">
              <svg width="26" height="26" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="19" cy="20" rx="4.8" ry="6.8" transform="rotate(-18 19 20)" fill="currentColor" opacity="0.7"/>
                <ellipse cx="27.5" cy="15" rx="5" ry="7.2" transform="rotate(-5 27.5 15)" fill="currentColor"/>
                <ellipse cx="36.5" cy="15" rx="5" ry="7.2" transform="rotate(5 36.5 15)" fill="currentColor"/>
                <ellipse cx="45" cy="20" rx="4.8" ry="6.8" transform="rotate(18 45 20)" fill="currentColor" opacity="0.7"/>
                <path d="M32 23.5 C21 23.5 14 30.5 14 39 C14 47 21.5 52.5 32 52.5 C42.5 52.5 50 47 50 39 C50 30.5 43 23.5 32 23.5 Z" fill="currentColor"/>
              </svg>
            </div>
            <div class="logo-text-group">
              <span class="logo-title" style="color:var(--color-warm-cream);">Paw<span>via</span></span>
              <span class="logo-tagline" style="color:var(--color-sage-soft);">Pet Waste Removal</span>
            </div>
          </a>`;

// ─── NEW FAVICON SNIPPET ────────────────────────────────────────────────────
const FAVICON_SNIPPET = `<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="alternate icon" href="assets/favicon.ico">
  <link rel="apple-touch-icon" href="assets/favicon.svg">`;

// ─── OLD FAVICON PATTERNS to replace ────────────────────────────────────────
const OLD_FAVICON_PATTERN = /<link rel="icon"[^>]*>/g;

// ─── PER-PAGE TITLE MAPPINGS ─────────────────────────────────────────────────
const PAGE_TITLES = {
  'index.html': 'Pawvia | Local Pet Waste Removal & Yard Sanitization Service',
  'home-2.html': 'Pawvia | Premium Dog Waste Removal & Yard Sanitization',
  'about.html': 'About Us | Pawvia - Professional Pet Waste Removal Service',
  'services.html': 'Our Services | Pawvia - Professional Pet Waste Removal',
  'pricing.html': 'Pricing Plans | Pawvia - Transparent Pet Waste Removal Rates',
  'blog.html': 'Pet & Lawn Hygiene Blog | Pawvia - Expert Advice & Guides',
  'contact.html': 'Contact Us | Pawvia - Local Pet Waste Removal Service',
};

// ─── PER-PAGE META DESCRIPTION MAPPINGS ──────────────────────────────────────
const PAGE_METAS = {
  'about.html': 'content="Learn about Pawvia\'s mission, values, field team, and sanitization standards. Dedicated to keeping local yards clean, hygienic, and safe for dogs and families."',
  'blog.html': 'content="Read expert pet care advice, yard hygiene tips, dog waste management, seasonal cleanup guides, and responsible pet ownership from Pawvia specialists."',
  'contact.html': 'content="Contact Pawvia for yard cleanup inquiries, commercial proposals, and service area checks. Fast response, friendly service, and free custom quotes."',
};

// ─── SIMPLE TEXT REPLACEMENTS ─────────────────────────────────────────────────
const TEXT_REPLACEMENTS = [
  // Brand names
  [/Doody Patrol LLC/g, 'Pawvia LLC'],
  [/Doody Patrol/g, 'Pawvia'],
  [/DOODY PATROL/g, 'PAWVIA'],
  // Emails
  [/support@doodypatrol\.com/g, 'support@pawvia.com'],
  [/doodypatrol\.com/g, 'pawvia.com'],
  // localStorage key (JS only — preserve functionality)
  // (we keep doody_patrol_user key to not break existing sessions)
];

// ─── OLD HEADER LOGO PATTERNS ─────────────────────────────────────────────────
// Match the entire <a class="logo"...>...</a> block in the header
function replaceHeaderLogo(html) {
  // The header logo wraps: <a href="index.html" class="logo" aria-label="...">  ... </a>
  // followed immediately by the desktop nav comment
  return html.replace(
    /<a\s+href="index\.html"\s+class="logo"\s+aria-label="[^"]*">\s*<div class="logo-icon">[\s\S]*?<\/a>(?=\s*\n\s*<!-- Desktop Nav)/,
    HEADER_LOGO
  );
}

// ─── OLD FOOTER LOGO PATTERNS ─────────────────────────────────────────────────
function replaceFooterLogo(html) {
  // Footer logo: <a href="index.html" class="logo">  ... </a>
  // inside footer-col-brand div, followed by <p> with description
  return html.replace(
    /<a\s+href="index\.html"\s+class="logo">\s*<div class="logo-icon"[^>]*>[\s\S]*?<\/a>(?=\s*\n\s*<p>)/,
    FOOTER_LOGO
  );
}

// ─── PROCESS EACH FILE ────────────────────────────────────────────────────────
const htmlFiles = ['index.html', 'home-2.html', 'about.html', 'services.html', 'pricing.html', 'blog.html', 'contact.html'];

htmlFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`SKIP (not found): ${file}`);
    return;
  }

  let html = fs.readFileSync(file, 'utf8');

  // 1. Update page title
  if (PAGE_TITLES[file]) {
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${PAGE_TITLES[file]}</title>`);
  }

  // 2. Update meta description
  if (PAGE_METAS[file]) {
    html = html.replace(/content="[^"]*Doody Patrol[^"]*"/, PAGE_METAS[file]);
  }

  // 3. Replace old favicon with new one
  html = html.replace(OLD_FAVICON_PATTERN, FAVICON_SNIPPET);

  // 4. Replace header logo
  html = replaceHeaderLogo(html);

  // 5. Replace footer logo
  html = replaceFooterLogo(html);

  // 6. Apply text replacements (brand names, emails, etc.)
  TEXT_REPLACEMENTS.forEach(([pattern, replacement]) => {
    html = html.replace(pattern, replacement);
  });

  fs.writeFileSync(file, html, 'utf8');
  console.log(`✓ Rebranded: ${file}`);
});

// ─── UPDATE JS FILES ─────────────────────────────────────────────────────────
['js/theme-rtl.js', 'js/main.js'].forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  content = content
    .replace(/DOODY PATROL/g, 'PAWVIA')
    .replace(/Doody Patrol/g, 'Pawvia')
    .replace(/doodypatrol\.com/g, 'pawvia.com')
    .replace(/support@pawvia\.com/g, 'support@pawvia.com');
  // Keep localStorage key unchanged to avoid breaking sessions
  fs.writeFileSync(file, content, 'utf8');
  console.log(`✓ Updated JS: ${file}`);
});

// ─── UPDATE CSS COMMENT ───────────────────────────────────────────────────────
if (fs.existsSync('css/styles.css')) {
  let css = fs.readFileSync('css/styles.css', 'utf8');
  css = css.replace(/DOODY PATROL/gi, 'PAWVIA');
  fs.writeFileSync('css/styles.css', css, 'utf8');
  console.log('✓ Updated CSS comment: css/styles.css');
}

console.log('\n🎉 Pawvia rebrand complete across all files!');
