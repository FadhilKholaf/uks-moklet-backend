import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// FIND KELAS BY ID
export const findKelasById = async (id: string) => {
  const response = await prisma.kelas.findUnique({ where: { id } });
  return response;
};

export async function searchKelas(query: string) {
  const kelas = await prisma.kelas.findMany({
    where: { nama_kelas: { contains: query } },
    select: { tingkat: true, nama_kelas: true, rombel: true },
  });
  return kelas;
}

// CREATE NEW KELAS
export const getAllKelas = async (where?: Prisma.KelasWhereInput) => {
  const response = await prisma.kelas.findMany({
    where,
    include: { _count: { select: { rombel: true } } },
  });
  return response;
};

export const createKelas = async (data: Prisma.KelasUncheckedCreateInput) => {
  const response = await prisma.kelas.create({ data });
  return response;
};

// UPDATE EXISTING KELAS
export const updateKelas = async (
  id: string,
  data: Prisma.KelasUpdateInput
) => {
  const response = await prisma.kelas.update({ where: { id }, data });
  return response;
};

// DELETE KELSS
export const deleteKelas = async (id: string) => {
  const response = await prisma.kelas.delete({ where: { id } });
  return response;
};
