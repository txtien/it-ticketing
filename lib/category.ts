import { Category, Prisma } from "@prisma/client";
import prisma from "./db";

type createCategoryBodyType = Prisma.Args<
  typeof prisma.category,
  "create"
>["data"];

export async function getCategories() {
  return await prisma.category.findMany();
}

export async function createCategory(data: createCategoryBodyType) {
  const category = await prisma.category.create({
    data,
  });
  return category;
}

export async function updateCategory(data: Category) {
  const category = await prisma.category.update({
    where: {
      id: data.id,
    },
    data,
  });
  return category;
}

export async function deleteCategory(categoryId: number) {
  const category = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
  return category;
}
