//  Add your code here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const celebriSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        enum: ["actor", "singer", "comedian", "stranger"]
    },
    catchPhrase: {
        type: String,
        required: true,
    }
},{
    timestamps: true
});
const Celebrity = mongoose.model("Celebrity", celebriSchema);


module.exports = Celebrity;