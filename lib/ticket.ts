import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export type createTicketData = Prisma.Args<
  typeof prisma.ticket,
  "create"
>["data"];

export type updateTicketData = Prisma.Args<
  typeof prisma.ticket,
  "update"
>["data"];

export const enum TicketStatus {
  NEW = "New",
  IN_PROGRESS = "In Progress",
  DONE = "Done",
  CLOSED = "Closed",
}

export const createTicket = async (data: createTicketData) => {
  return await prisma.ticket.create({
    data,
  });
};

export const updateTicket  = async (data: updateTicketData) => {
  return await prisma.ticket.update({
    where: {
      id: data.id as number,
    },
    data,
  });

}

export const getTicketById = async (id: number) => {
  return await prisma.ticket.findUnique({
    where: {
      id,
    },
  });
};

export const getTickets = async () => {
  return await prisma.ticket.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      category: true,
    }
  });
};
