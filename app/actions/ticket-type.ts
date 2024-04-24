"use server";

import {
  updateTicketType,
  createTicketType,
  deleteTicketType,
} from "@/lib/ticket-type";
import { TicketType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateTicketAction(data: TicketType) {
  await updateTicketType(data);
  revalidatePath("/settings/ticket-type")
}

export async function createTicketAction(data: Omit<TicketType, "id">) {
  await createTicketType(data);
  revalidatePath("/settings/ticket-type")
}

export async function deleteTicketAction(data: TicketType) {
  await deleteTicketType(data.id);
  revalidatePath("/settings/ticket-type")
}
