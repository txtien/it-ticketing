import DepartmentTable from "./_components/department-table";
import { getDepartments } from "@/lib/department";

const DepartmentPage = async () => {
  const departments = await getDepartments();

  return (
    <div className="pl-20 sm:pl-0 flex-1 flex flex-col">
      <h1 className="text-2xl mx-auto my-8 font-bold">Department</h1>
      <DepartmentTable data={departments} />
    </div>
  );
};

export default DepartmentPage;
