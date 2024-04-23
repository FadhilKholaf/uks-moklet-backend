"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kelas_controller_1 = require("@/controllers/kelas/kelas.controller");
var auth_1 = require("@/middleware/auth");
var validateError_1 = require("@/middleware/validateError");
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var router = (0, express_1.Router)();
// VALIDATION
var postKelasValidate = [
    (0, express_validator_1.check)("nama_kelas", "nama_kelas is required").notEmpty(),
    (0, express_validator_1.check)("tingkat", "tingkat is required").notEmpty(),
    validateError_1.validateError,
];
router.get("/search", (0, auth_1.auth)("ALL"), kelas_controller_1.SearchKelas);
// MAIN ROUTRER
router.use((0, auth_1.auth)("ADMIN", "WALAS"));
router.get("/", kelas_controller_1.GetAllKelas);
router.get("/:id", kelas_controller_1.FindKelasById);
router.use((0, auth_1.auth)("ADMIN"));
router.post("/", postKelasValidate, kelas_controller_1.CreateKelas);
router.put("/:id", postKelasValidate, kelas_controller_1.UpdateKelas);
router.delete("/:id", kelas_controller_1.DeleteKelas);
exports.default = router;
//# sourceMappingURL=kelas.js.map