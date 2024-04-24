"use server";

import {
  createDepartment,
  deleteDepartment,
  updateDepartment,
} from "@/lib/department";
import { Department } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateDepartmentAction(data: Department) {
  await updateDepartment(data);
  revalidatePath("/settings/department");
}

export async function createDepartmentAction(data: Omit<Department, "id">) {
  await createDepartment(data);
  revalidatePath("/settings/department");
}

export async function deleteDepartmentAction(data: Department) {
  await deleteDepartment(data.id);
  revalidatePath("/settings/department");
}
