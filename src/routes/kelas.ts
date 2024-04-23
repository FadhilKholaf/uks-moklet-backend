import {
  FindKelasById,
  CreateKelas,
  UpdateKelas,
  DeleteKelas,
  GetAllKelas,
  SearchKelas,
} from "@/controllers/kelas/kelas.controller";
import { auth } from "@/middleware/auth";
import { validateError } from "@/middleware/validateError";
import { Router } from "express";
import { check } from "express-validator";

const router = Router();

// VALIDATION
var postKelasValidate = [
  check("nama_kelas", "nama_kelas is required").notEmpty(),
  check("tingkat", "tingkat is required").notEmpty(),
  validateError,
];

router.get("/search", auth("ALL"), SearchKelas);

// MAIN ROUTRER
router.use(auth("ADMIN", "WALAS"));
router.get("/", GetAllKelas);
router.get("/:id", FindKelasById);
router.use(auth("ADMIN"));
router.post("/", postKelasValidate, CreateKelas);
router.put("/:id", postKelasValidate, UpdateKelas);
router.delete("/:id", DeleteKelas);

export default router;
