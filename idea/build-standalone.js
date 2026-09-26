const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const motionCss = fs.readFileSync('motion.css', 'utf8');
const extrasCss = fs.readFileSync('extras.css', 'utf8');
const motionJs = fs.readFileSync('motion.js', 'utf8');
const extrasJs = fs.readFileSync('extras.js', 'utf8');
const boardJs = fs.readFileSync('board.js', 'utf8');

const embeddedCss = `  <!-- Embedded Motion & Signature Extras Frameworks for 100% Standalone Sharing -->
  <style id="motion-framework-css">
${motionCss}
  </style>
  <style id="extras-framework-css">
${extrasCss}
  </style>`;

const cssTargetRegex = /<!--\s*Shared Motion & Signature Extras Frameworks\s*-->[\s\S]*?<link rel="stylesheet" href="extras\.css">/;

if (!cssTargetRegex.test(indexHtml)) {
  console.error('CSS target regex did not match!');
  process.exit(1);
}

let standaloneHtml = indexHtml.replace(cssTargetRegex, embeddedCss);

const embeddedJs = `  <!-- Embedded Shared Modular Scripts for 100% Standalone Sharing -->
  <script id="motion-framework-js">
${motionJs}
  </script>
  <script id="extras-framework-js">
${extrasJs}
  </script>
  <script id="board-framework-js">
${boardJs}
  </script>`;

const jsTargetRegex = /<!--\s*Shared Modular Scripts[\s\S]*?<script src="board\.js"><\/script>/;

if (!jsTargetRegex.test(standaloneHtml)) {
  console.error('JS target regex did not match!');
  process.exit(1);
}

standaloneHtml = standaloneHtml.replace(jsTargetRegex, embeddedJs);

fs.writeFileSync('swasthya-queue-standalone.html', standaloneHtml, 'utf8');
console.log('Successfully generated swasthya-queue-standalone.html! File size:', fs.statSync('swasthya-queue-standalone.html').size, 'bytes');
