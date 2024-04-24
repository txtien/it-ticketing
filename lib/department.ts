import { Department, Prisma } from "@prisma/client";
import prisma from "./db";

type createDepartmentBodyType = Prisma.Args<
  typeof prisma.department,
  "create"
>["data"];

export async function getDepartments() {
    return await prisma.department.findMany();
  }

export async function createDepartment(data: createDepartmentBodyType) {
  const department = await prisma.department.create({
    data,
  });
  return department;
}

export async function updateDepartment(data: Department) {
  const department = await prisma.department.update({
    where: {
      id: data.id,
    },
    data,
  });
  return department;
}

export async function deleteDepartment(departmentId: number) {
  const department = await prisma.department.delete({
    where: {
      id: departmentId,
    },
  });
  return department;
}