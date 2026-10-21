const fs = require('fs');

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="16" fill="#365640"/>
  <!-- Paw Toe Pads -->
  <ellipse cx="19" cy="20" rx="4.8" ry="6.8" transform="rotate(-18 19 20)" fill="#DCE9D5"/>
  <ellipse cx="27.5" cy="15" rx="5" ry="7.2" transform="rotate(-5 27.5 15)" fill="#78966B"/>
  <ellipse cx="36.5" cy="15" rx="5" ry="7.2" transform="rotate(5 36.5 15)" fill="#78966B"/>
  <ellipse cx="45" cy="20" rx="4.8" ry="6.8" transform="rotate(18 45 20)" fill="#DCE9D5"/>
  <!-- Main Palm Pad as an Organic Leaf -->
  <path d="M32 23.5 C21 23.5 14 30.5 14 39 C14 47 21.5 52.5 32 52.5 C42.5 52.5 50 47 50 39 C50 30.5 43 23.5 32 23.5 Z" fill="#DCE9D5"/>
  <!-- Leaf Vein Accents representing cleanliness & growth -->
  <path d="M32 27.5 Q32 39 32 48.5" stroke="#365640" stroke-width="2.4" stroke-linecap="round" fill="none"/>
  <path d="M32 34.5 Q39.5 32.5 42.5 36" stroke="#365640" stroke-width="1.8" stroke-linecap="round" fill="none"/>
  <path d="M32 40.5 Q24.5 38.5 21.5 42" stroke="#365640" stroke-width="1.8" stroke-linecap="round" fill="none"/>
</svg>`;

const fullLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 48" width="210" height="48" fill="none">
  <!-- Logo Icon -->
  <g transform="translate(2, 2)">
    <rect width="44" height="44" rx="12" fill="#365640"/>
    <ellipse cx="13" cy="14" rx="3.4" ry="4.8" transform="rotate(-18 13 14)" fill="#DCE9D5"/>
    <ellipse cx="19" cy="10.5" rx="3.5" ry="5.1" transform="rotate(-5 19 10.5)" fill="#78966B"/>
    <ellipse cx="25" cy="10.5" rx="3.5" ry="5.1" transform="rotate(5 25 10.5)" fill="#78966B"/>
    <ellipse cx="31" cy="14" rx="3.4" ry="4.8" transform="rotate(18 31 14)" fill="#DCE9D5"/>
    <path d="M22 16.5 C14.5 16.5 9.5 21.5 9.5 27.5 C9.5 33 14.5 37 22 37 C29.5 37 34.5 33 34.5 27.5 C34.5 21.5 29.5 16.5 22 16.5 Z" fill="#DCE9D5"/>
    <path d="M22 19.5 Q22 27.5 22 34" stroke="#365640" stroke-width="1.8" stroke-linecap="round" fill="none"/>
    <path d="M22 24.5 Q27 23 29 26" stroke="#365640" stroke-width="1.4" stroke-linecap="round" fill="none"/>
    <path d="M22 28.5 Q17 27 15 30" stroke="#365640" stroke-width="1.4" stroke-linecap="round" fill="none"/>
  </g>
  <!-- Wordmark -->
  <text x="56" y="27" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="24" font-weight="900" fill="#365640" letter-spacing="-0.5">Paw<tspan fill="#78966B">via</tspan></text>
  <text x="57" y="39" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="8.5" font-weight="700" fill="#78966B" letter-spacing="1.4">PET WASTE REMOVAL</text>
</svg>`;

if (!fs.existsSync('assets')) {
  fs.mkdirSync('assets');
}

fs.writeFileSync('assets/favicon.svg', faviconSvg, 'utf8');
fs.writeFileSync('assets/pawvia-logo.svg', fullLogoSvg, 'utf8');
fs.writeFileSync('assets/favicon.ico', faviconSvg, 'utf8');

console.log('Successfully generated assets/favicon.svg, assets/pawvia-logo.svg, and assets/favicon.ico');