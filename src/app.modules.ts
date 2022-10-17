import fs from "fs";

import "./utils/mongodb";

//* auto import all of contorollers
fs.readdirSync(__dirname + "\\controllers").map(fileName => import(`./controllers/${fileName}`));

