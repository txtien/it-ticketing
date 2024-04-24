"use server";

import { createCategory, deleteCategory, updateCategory } from "@/lib/category";
import { Category } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateCategoryAction(data: Category) {
  await updateCategory(data);
  revalidatePath("/settings/category");
}

export async function createCategoryAction(data: Omit<Category, "id">) {
  await createCategory(data);
  revalidatePath("/settings/category");
}

export async function deleteCategoryAction(data: Category) {
  await deleteCategory(data.id);
  revalidatePath("/settings/category");
}
