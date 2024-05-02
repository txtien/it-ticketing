import { getTicketTypes } from "@/lib/ticket-type";
import TicketTable from "./_components/ticket-table";

const TicketTypePage = async () => {
  const tickets = await getTicketTypes();

  return (
    <div className="pl-20 sm:pl-0 flex-1 flex flex-col">
      <h1 className="text-2xl mx-auto my-8 font-bold">Ticket Type</h1>
      <TicketTable data={tickets} />
    </div>
  );
};

export default TicketTypePage;
