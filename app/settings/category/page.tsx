import { getCategories } from "@/lib/category";
import CategoryTable from "./_components/category-table";

const CategoryPage = async () => {
  const categories = await getCategories();

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-2xl mx-auto my-8 font-bold">Category</h1>
      <CategoryTable data={categories} />
    </div>
  );
};

export default CategoryPage;
