import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({

    name: {type: String, required: true},
    email: {type: String, unique: true, required: true, lowercase: true},
    password: {type: String, required: true},
    savedEvents: [{type: mongoose.Schema.Types.ObjectId, ref: "events"}]

}, {
    timestamps: true,
    versionKey: false
});

const UserModel = mongoose.model("users", DataSchema);

export default UserModel;