import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function findGuruByEmail(email: string) {
  const user = await prisma.guru.findUnique({
    where: { email },
  });
  return user;
}

export async function findGuruById(id: string) {
  const user = await prisma.guru.findUnique({
    where: { id: id },
  });
  return user;
}

export async function createGuru(data: Prisma.GuruCreateInput) {
  const create = await prisma.guru.create({ data });
  return create;
}

export async function updateGuru(id: string, data: Prisma.GuruUpdateInput) {
  const update = await prisma.guru.update({
    where: { id },
    data,
  });
  return update;
}

export async function deleteGuru(id: string) {
  const deleteUser = await prisma.guru.delete({
    where: { id },
  });
  return deleteUser;
}
