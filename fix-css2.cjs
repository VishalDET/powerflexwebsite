const fs = require('fs');
const content = fs.readFileSync('src/index.css', 'utf8');

// Find exactly the string:
const targetStr = `  .md-signature-area {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
}`;
let index = content.indexOf(targetStr);
if (index === -1) {
  // try \r\n
  const targetStr2 = `  .md-signature-area {\r\n    flex-direction: column;\r\n    align-items: flex-start;\r\n    gap: 1.5rem;\r\n  }\r\n}`;
  index = content.indexOf(targetStr2);
  if (index > -1) {
    const goodContent = content.substring(0, index + targetStr2.length);
    const finalContent = goodContent + '\n\n' + fs.readFileSync('clean-css.txt', 'utf8');
    fs.writeFileSync('src/index.css', finalContent);
    console.log('Cleaned with \\r\\n');
  } else {
    console.log('Could not find cut point');
  }
} else {
  const goodContent = content.substring(0, index + targetStr.length);
  const finalContent = goodContent + '\n\n' + fs.readFileSync('clean-css.txt', 'utf8');
  fs.writeFileSync('src/index.css', finalContent);
  console.log('Cleaned with \\n');
}
