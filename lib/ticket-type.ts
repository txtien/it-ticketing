import { Prisma, TicketType } from "@prisma/client";
import prisma from "./db";

export type ticketCreateBodyType = Prisma.Args<typeof prisma.ticketType, 'create'>['data']

export async function getTicketTypes() {
  return await prisma.ticketType.findMany();
}

export async function createTicketType(data: ticketCreateBodyType) {
  const ticket = await prisma.ticketType.create({
    data: data,
  });

  return ticket;
}

export async function updateTicketType(data: TicketType) {
  const updateTicket = await prisma.ticketType.update({
    where: {
      id: data.id,
    },
    data: data,
  });

  return updateTicket;
}

export async function deleteTicketType(ticketId: number) {
  const deletedTicket = await prisma.ticketType.delete({
    where: { id: ticketId },
  });

  return deletedTicket;
}
