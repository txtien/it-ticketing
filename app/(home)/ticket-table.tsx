"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TicketStatus } from "@/lib/ticket";
import { Category, Ticket } from "@prisma/client";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const TicketTable = ({
  data,
}: {
  data: (Ticket & { category: Category })[];
}) => {
  const router = useRouter();

  const getTicketStatus = (status: string) => {
    if (status === TicketStatus.NEW) {
      return "Mới";
    } else if (status === TicketStatus.IN_PROGRESS) {
      return "Đang xử lý";
    } else if (status === TicketStatus.DONE) {
      return "Đã xử lý";
    } else if (status === TicketStatus.CLOSED) {
      return "Đã đóng";
    } else {
      return "Không xác định";
    }
  };

  return (
    <div className="w-full px-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead className="text-right">Trạng thái</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((ticket, index) => (
            <TableRow key={ticket.id}>
              <TableCell width={"10%"} className="font-medium">
                {index + 1}
              </TableCell>
              <TableCell width={"25%"}>{ticket.name}</TableCell>
              <TableCell width={"20%"} className="text-right">
                {getTicketStatus(ticket.status)}
              </TableCell>
              <TableCell width={"15%"}>
                <div className="flex justify-end items-center gap-2 mx-auto w-full">
                  <Edit
                    size={16}
                    onClick={() => router.push(`/ticket/${ticket.id}`)}
                    className="cursor-pointer"
                  />
                  <Trash2
                    size={16}
                    color="#FF0000"
                    className="cursor-pointer"
                    // onClick={() => openDeleteDialog(ticket)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TicketTable;
