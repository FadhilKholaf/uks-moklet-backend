import {
  findSiswaById,
  createSiswa,
  updateSiswa,
  deleteSiswa,
  getAllSiswa,
  searchSiswa,
} from "@/utils/queries/siswa.query";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import {
  Success,
  BadRequest,
  CreatedSuccessfully,
  InternalServerError,
} from "@/utils/apiResponse";
import { uuidv7 } from "uuidv7";
import { connectSiswaToRombel } from "@/utils/queries/rombel.query";

interface siswaReqProps extends Request {
  body: Prisma.SiswaUncheckedCreateInput;
}

// FIND SISWA BY ID
export const GetAllSiswa = async (req: Request, res: Response) => {
  try {
    const response = await getAllSiswa();

    return res
      .status(200)
      .json(Success("Siswa loaded successfully", { data: response }));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

export const SearchSiswa = async (req: Request, res: Response) => {
  try {
    if (!req.query.name)
      return res.status(400).json(BadRequest("Name is required"));
    const response = await searchSiswa(req.query.name.toString());

    return res
      .status(200)
      .json(Success("Siswa loaded successfully", { data: response }));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

export const FindSiswaById = async (req: Request, res: Response) => {
  try {
    const response = await findSiswaById(req.params.id);
    if (response == null) {
      return res.status(400).json(BadRequest("Cannot find any siswa"));
    }
    return res.status(200).json(
      Success("Siswa loaded successfully", {
        data: { ...response, password: undefined },
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

// CREATE NEW SISWA
export const CreateSiswa = async (req: siswaReqProps, res: Response) => {
  try {
    const { rombel, ...siswa } = req.body;
    const data: Prisma.SiswaUncheckedCreateInput = {
      ...siswa,
      id: uuidv7(),
    };
    const response = await createSiswa(data);
    if (!response) {
      return res.status(500).json(InternalServerError("Failed creating siswa"));
    }
    const rombelSiswa: Prisma.RombelSiswaUncheckedCreateInput = {
      siswa_id: data.id!,
      rombel_id: rombel as string,
    };
    connectSiswaToRombel(rombelSiswa);
    return res
      .status(200)
      .json(
        CreatedSuccessfully("Siswa created successfully", { data: response })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

// UPDATE EXISTING SISWA
export const UpdateSiswa = async (req: siswaReqProps, res: Response) => {
  try {
    const { rombel, ...siswa } = req.body;
    const response = await updateSiswa(req.params.id, siswa);
    if (!response) {
      return res.status(400).json(BadRequest("Failed updating siswa"));
    }
    const rombelSiswa: Prisma.RombelSiswaUncheckedCreateInput = {
      siswa_id: req.params.id!,
      rombel_id: rombel as string,
    };
    connectSiswaToRombel(rombelSiswa);
    return res.status(200).json(Success("Siswa updated successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};

// DELETE SISWA
export const DeleteSiswa = async (req: Request, res: Response) => {
  try {
    const response = await deleteSiswa(req.params.id);
    if (!response) {
      return res.status(400).json(BadRequest("Cannot find any siswa"));
    }
    return res.status(200).json(Success("Siswa deleted successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).json(InternalServerError());
  }
};
