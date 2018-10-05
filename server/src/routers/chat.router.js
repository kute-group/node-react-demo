import express from "express";
import chat_controller from "../controllers/chat.controller";
const router = express.Router();
router.use(chat_controller);

module.exports = router;
