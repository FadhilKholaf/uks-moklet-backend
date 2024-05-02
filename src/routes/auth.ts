import {
  CurrentSession,
  Logout,
  setSemester,
} from "@/controllers/auth/auth.controller";
import { auth } from "@/middleware/auth";
import { validateError } from "@/middleware/validateError";
import { Router } from "express";
import { check } from "express-validator";

const router = Router();

// MAIN ROUTER
router.get("/logout", Logout);
router.get("/me", auth("ALL"), CurrentSession);

var setSemesterValidate = [
  check("semester_id", "register_id is required").notEmpty(),
  validateError,
];
router.post("/set-semester", auth("ALL"), setSemesterValidate, setSemester);

export default router;
