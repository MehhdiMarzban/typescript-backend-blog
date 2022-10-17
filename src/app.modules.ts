import fs from "fs";

import "./utils/mongoDBContection";

//* auto import all of contorollers
fs.readdirSync(__dirname + "\\controllers").map(fileName => import(`./controllers/${fileName}`));

