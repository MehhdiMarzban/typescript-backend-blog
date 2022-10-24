import fs from "fs";

import "./utils/mongoDBContection";

//* auto import all of contorollers [for fix error must import manually]
fs.readdirSync(__dirname + "\\controllers").map(fileName => import(`./controllers/${fileName}`));

