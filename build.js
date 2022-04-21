const fs = require('fs');
const path = require('path');

const map = fs.readFileSync(path.join(__dirname, 'dist', 'worker.js.map')).toString();
const mapString = JSON.stringify(map)

const js = fs.readFileSync(path.join(__dirname, 'dist', 'worker.js')).toString();
const jsr = js.replace('"WILL_REPLACED"', mapString);

//console.log(jsr);
fs.writeFileSync(path.join(__dirname, 'dist', 'worker.a.js'), jsr);

