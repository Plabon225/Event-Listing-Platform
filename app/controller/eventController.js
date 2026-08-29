import EventModel from "../model/EventModel.js";
import UserModel from "../model/UserModel.js";


// Create Event
export const CreateEvent = async (req, res) => {

    try {

        const {name, date, time, location, description, category} = req.body;
        const result = await EventModel.create({name, date, time, location, description, category, createdBy: req.headers.user_id});
        return res.status(201).json({status: "success", message: "Event created successfully", data: result});

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};


// Read All Events
export const ReadEvents = async (req, res) => {

    try {
        const { category, location } = req.query;
        let query = {};
        if (category) {query.category = category;}
        if (location) {query.location = location;}
        const result = await EventModel.find(query);
        return res.status(200).json({status: "success", data: result});

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};


// Read Single Event
export const ReadSingleEvent = async (req, res) => {

    try {
        const result = await EventModel.findById(req.params.id);
        if (!result) {
            return res.status(404).json({status: "fail", message: "Event not found"});
        }
        return res.status(200).json({status: "success", data: result});

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};


// Update Event
export const UpdateEvent = async (req, res) => {

    try {

        const event = await EventModel.findById(req.params.id);
        if (!event) {
            return res.status(404).json({status: "fail", message: "Event not found"});
        }

        if (event.createdBy.toString() !== req.headers.user_id) {
            return res.status(403).json({status: "fail", message: "You cannot update this event"});
        }

        const result = await EventModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        return res.status(200).json({
            status: "success",
            message: "Event updated successfully",
            data: result
        });

    } catch (error) {

        return res.status(500).json({
            status: "fail",
            message: error.message
        });

    }
};


// Delete Event
export const DeleteEvent = async (req, res) => {

    try {

        const event = await EventModel.findById(req.params.id);
        if (!event) {
            return res.status(404).json({status: "fail", message: "Event not found"});
        }

        if (event.createdBy.toString() !== req.headers.user_id) {
            return res.status(403).json({status: "fail", message: "You cannot delete this event"});
        }
        await EventModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({status: "success", message: "Event deleted successfully"});

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};


// Save Event
export const SaveEvent = async (req, res) => {

    try {

        const user_id = req.headers.user_id;
        const event_id = req.params.id;
        const event = await EventModel.findById(event_id);

        if (!event) {
            return res.status(404).json({status: "fail", message: "Event not found"});
        }

        await UserModel.findByIdAndUpdate(
            user_id,
            {
                $addToSet: {
                    savedEvents: event_id
                }
            }
        );

        return res.status(200).json({status: "success", message: "Event saved successfully"});

    } catch (error) {
        return res.status(500).json({status: "fail", message: error.message});
    }
};