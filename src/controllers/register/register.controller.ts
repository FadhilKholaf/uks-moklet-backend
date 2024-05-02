import {
  findRegisterById,
  createRegister,
  updateRegister,
  deleteRegister,
  getAllRegister,
} from "@/utils/queries/register/register.query";
import { Request, Response } from "express";
import {
  BadRequest,
  CreatedSuccessfully,
  InternalServerError,
  NotFound,
  Success,
} from "@/utils/apiResponse";
import { uuidv7 } from "uuidv7";
import { registerWithDetail } from "@/types/prismaRelation";
import { Prisma } from "@prisma/client";
import { stringify } from "querystring";
import { findSemesterById } from "@/utils/queries/semester.query";

interface RegisterReqProps extends Request {
  body: Prisma.RegisterUncheckedCreateInput;
}

export const GetAllRegister = async (req: Request, res: Response) => {
  try {
    const semester = req.token?.semester
      ? await findSemesterById(req.token.semester)
      : undefined;
    const response = await getAllRegister({
      tgl_periksa: semester
        ? { lte: semester.tgl_awal, gte: semester.tgl_akhir }
        : undefined,
    });

    if (response == null) {
      return res.status(404).json(NotFound("Cannot find any register"));
    }

    return res
      .status(200)
      .json(Success("Register loaded successfully", { data: response }));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};
// FIND REGISTER BY ID
export const FindRegisterById = async (req: Request, res: Response) => {
  try {
    const response: registerWithDetail | null = await findRegisterById(
      req.params.id
    );
    if (response == null) {
      return res.status(404).json(NotFound("Cannot find any register"));
    }
    return res
      .status(200)
      .json(Success("Register loaded successfully", { data: response }));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

// CREATE NEW REGISTER
export const CreateRegister = async (req: RegisterReqProps, res: Response) => {
  try {
    const data: Prisma.RegisterUncheckedCreateInput = {
      ...req.body,
      tgl_periksa: new Date(req.body.tgl_periksa).toISOString(),
      id: uuidv7(),
    };
    const response = await createRegister(data);
    if (!response) {
      return res.status(400).json(BadRequest("Failed creating register"));
    }
    return res
      .status(200)
      .json(
        CreatedSuccessfully("Register created successfully", { data: response })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

// UPDATE EXISTING REGISTER
export const UpdateRegister = async (req: RegisterReqProps, res: Response) => {
  try {
    const response = await updateRegister(req.params.id, {
      ...req.body,
      tgl_periksa: new Date(req.body.tgl_periksa).toISOString(),
    });
    if (!response) {
      return res.status(400).json(BadRequest("Failed updating register"));
    }
    return res.status(200).json(Success("Register updated successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

// DELETE REGISTER
export const DeleteRegister = async (req: Request, res: Response) => {
  try {
    const response = await deleteRegister(req.params.id);
    if (!response) {
      return res.status(404).json(NotFound("Cannot find any register"));
    }

    return res.status(200).json(Success("Register deleted successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};
