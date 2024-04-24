import { getDepartments } from "@/lib/department";
import CreateTicketForm from "./form";
import { getCategories } from "@/lib/category";
import { getTicketTypes } from "@/lib/ticket-type";

const CreateTicketPage = async () => {
  const departments = await getDepartments();
  const categories = await getCategories();
  const ticketTypes = await getTicketTypes();

  return (
    <CreateTicketForm dataSource={{ departments, categories, ticketTypes }} />
  );
};

export default CreateTicketPage;
