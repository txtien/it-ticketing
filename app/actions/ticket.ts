"use server";
import { createTicket, createTicketData, updateTicketData, updateTicket } from "@/lib/ticket";
import { getMe } from "@/lib/user";

export const createTicketAction = async (
  data: Omit<createTicketData, "userId">
) => {
  const user = await getMe();

  const createData: createTicketData = {
    name: data.name,
    comment: data.comment,
    departmentId: data.departmentId!,
    ticketTypeId: data.ticketTypeId!,
    categoryId: data.categoryId!,
    userId: user!.id,
    status: data.status,
  };
  return await createTicket(createData);
};

export const updateTicketAction = async (data: updateTicketData) => {
  return await updateTicket(data);
};
