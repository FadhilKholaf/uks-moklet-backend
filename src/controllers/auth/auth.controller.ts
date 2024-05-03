import { BadRequest, Success } from "@/utils/apiResponse";
import { findSemesterById } from "@/utils/queries/semester.query";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const Logout = (req: Request, res: Response) => {
  res.clearCookie("token").end();
};

export const CurrentSession = (req: Request, res: Response) => {
  res.json(Success("Success load current user", { data: req.token }));
};

export const setSemester = async (req: Request, res: Response) => {
  const semester = await findSemesterById(req.body.semester_id);
  if (!semester) return res.json(BadRequest("Invalid semester_id"));
  const token = {
    ...req.token,
    semester: semester.id,
  };

  const newJwt = jwt.sign(token, process.env.JWT_SECRET);

  res.cookie("token", newJwt, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000, //expired dalam 15 hari
    secure: true,
    sameSite: "none",
  });

  res.json(
    Success("Sukses change semester", {
      data: {
        token: newJwt,
      },
    })
  );
};
