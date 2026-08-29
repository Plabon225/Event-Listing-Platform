import express from "express";

const router = express.Router();

import * as UserController from "../controller/userController.js";
import * as EventController from "../controller/eventController.js";

import AuthVerification from "../middleware/AuthVerification.js";


// ==================== User Routes ====================

router.post("/register", UserController.RegisterUser);
router.post("/login", UserController.LoginUser);
router.post("/logout", UserController.LogoutUser);


// ==================== Event Routes ====================

router.get("/events", EventController.ReadEvents);
router.get("/events/:id", EventController.ReadSingleEvent);
router.post("/events", AuthVerification, EventController.CreateEvent);
router.put("/events/:id", AuthVerification, EventController.UpdateEvent);
router.delete("/events/:id", AuthVerification, EventController.DeleteEvent);
router.post("/events/:id/save", AuthVerification, EventController.SaveEvent);


export default router;