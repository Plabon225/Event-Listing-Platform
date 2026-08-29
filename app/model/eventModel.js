import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({

    name: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true}

}, {
    timestamps: true,
    versionKey: false
});

const EventModel = mongoose.model("events", DataSchema);

export default EventModel;