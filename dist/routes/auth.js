"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_controller_1 = require("@/controllers/auth/auth.controller");
var auth_1 = require("@/middleware/auth");
var validateError_1 = require("@/middleware/validateError");
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var router = (0, express_1.Router)();
// MAIN ROUTER
router.get("/logout", auth_controller_1.Logout);
router.get("/me", (0, auth_1.auth)("ALL"), auth_controller_1.CurrentSession);
var setSemesterValidate = [
    (0, express_validator_1.check)("semester_id", "register_id is required").notEmpty(),
    validateError_1.validateError,
];
router.post("/set-semester", (0, auth_1.auth)("ALL"), setSemesterValidate, auth_controller_1.setSemester);
exports.default = router;
//# sourceMappingURL=auth.js.map