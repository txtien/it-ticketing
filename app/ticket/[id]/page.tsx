import CreateTicketForm from "@/app/create-ticket/form";
import { getCategories } from "@/lib/category";
import { getDepartments } from "@/lib/department";
import { getTicketById } from "@/lib/ticket";
import { getTicketTypes } from "@/lib/ticket-type";
import React from "react";

const TicketDetail = async ({ params }: { params: { id: string } }) => {
  const ticket = await getTicketById(parseInt(params.id));
  if (ticket === null) {
    return <div>Không tìm thấy ticket</div>;
  }

  const departments = await getDepartments();
  const categories = await getCategories();
  const ticketTypes = await getTicketTypes();
  
  return (
    <CreateTicketForm
      dataSource={{ departments, categories, ticketTypes }}
      ticket={ticket}
    />
  );
};

export default TicketDetail;
