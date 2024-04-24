import { getTickets } from "@/lib/ticket";
import TicketTable from "./ticket-table";

export default async function Home() {
  const tickets = await getTickets();

  return (
    <main className="flex-1">
      <div className="w-full my-8">
        <h3 className="text-2xl font-semibold text-center">Danh sách ticket</h3>
      </div>
      <TicketTable data={tickets} />
    </main>
  );
}
