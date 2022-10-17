import mongoose from "mongoose";

import { MongooseConfig } from "../enums";

mongoose
    .connect(MongooseConfig.URL)
    .then(() => {
        console.log("connected to mongodb");
    })
    .catch((e) => console.log(e));
