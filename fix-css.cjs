const fs = require('fs');
const content = fs.readFileSync('src/index.css', 'utf8');

const str = ".md-signature-area";
const i1 = content.lastIndexOf(str);
if (i1 === -1) throw new Error("Could not find .md-signature-area");

let i2 = content.indexOf('}', i1);
i2 = content.indexOf('}', i2 + 1); // close selector
i2 = content.indexOf('}', i2 + 1); // close @media (max-width: 640px)

const goodContent = content.substring(0, i2 + 1);
const finalContent = goodContent + '\n\n' + fs.readFileSync('clean-css.txt', 'utf8');

fs.writeFileSync('src/index.css', finalContent);
console.log('Successfully cleaned CSS');
