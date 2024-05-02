"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Category, Department, Ticket, TicketType } from "@prisma/client";
import { TicketStatus, createTicketData } from "@/lib/ticket";
import { Textarea } from "@/components/ui/textarea";
import { createTicketAction, updateTicketAction } from "../actions/ticket";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useIsClient } from "usehooks-ts";

const formSchema = z.object({
  subject: z.string().min(2),
  comment: z.string().min(2),
  department: z.string(),
  ticketType: z.string(),
  category: z.string(),
});

type Props = {
  ticket?: Ticket;
  dataSource: {
    departments: Department[];
    categories: Category[];
    ticketTypes: TicketType[];
  };
};

const CreateTicketForm = ({ ticket, dataSource }: Props) => {
  const router = useRouter();
  const isClient = useIsClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      comment: "",
      department: "",
      ticketType: "",
      category: "",
    },
  });

  useEffect(() => {
    if (ticket) {
      form.reset({
        subject: ticket.name,
        comment: ticket.comment || "",
        department: ticket.departmentId.toString(),
        ticketType: ticket.ticketTypeId.toString(),
        category: ticket.categoryId.toString(),
      });
    }
  }, [form, ticket]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const postData: createTicketData = {
        name: values.subject,
        comment: values.comment,
        departmentId: parseInt(values.department),
        ticketTypeId: parseInt(values.ticketType),
        categoryId: parseInt(values.category),
        userId: 1,
        status: TicketStatus.NEW,
      };
      if (ticket) {
        postData.id = ticket.id;
        postData.status = ticket.status;
        await updateTicketAction(postData);
      } else {
        await createTicketAction(postData);
      }
      // resetForm();
      router.push("/");
      toast.success(ticket ? "Cập nhật thành công" : "Tạo ticket thành công");
    } catch (e) {
      toast.error("Có lỗi xảy ra");
    }
  }

  const resetForm = () => {
    form.reset({
      subject: "",
      comment: "",
      department: "",
      ticketType: "",
      category: "",
    });
  };

  if (!isClient) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="px-12 pt-16 flex-1">
      <h1 className="text-2xl text-center text-primary">
        {ticket ? `Chỉnh sửa ${ticket.name}` : "Tạo mới Ticket"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="w-full flex gap-4 mt-8">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tên phiếu</FormLabel>
                  <FormControl>
                    <Input
                      type={"text"}
                      id={"subject"}
                      placeholder="Tên phiếu"
                      className={
                        "focus-visible:ring-0 focus-visible:ring-offset-0"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex gap-4 mt-8">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nội dung chi tiết</FormLabel>
                  <FormControl>
                    <Textarea
                      id={"comment"}
                      placeholder="Nội dung chi tiết"
                      className={
                        "focus-visible:ring-0 focus-visible:ring-offset-0"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex gap-4 mt-8">
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Phòng ban</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e);
                      }}
                      value={field.value}
                    >
                      <SelectTrigger
                        className={"w-full focus:ring-0 focus:ring-offset-0"}
                      >
                        <SelectValue placeholder={"Chọn phòng ban"} />
                      </SelectTrigger>
                      <SelectContent>
                        {dataSource.departments.map((option) => (
                          <SelectItem
                            key={option.id}
                            value={option.id.toString()}
                          >
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ticketType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Loại phiếu</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e);
                      }}
                      value={field.value}
                    >
                      <SelectTrigger
                        className={"w-full focus:ring-0 focus:ring-offset-0"}
                      >
                        <SelectValue placeholder={"Chọn loại phiếu"} />
                      </SelectTrigger>
                      <SelectContent>
                        {dataSource.ticketTypes.map((option) => (
                          <SelectItem
                            key={option.id}
                            value={option.id.toString()}
                          >
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nhóm</FormLabel>

                  <Select
                    value={field.value}
                    onValueChange={(e) => {
                      field.onChange(e);
                      console.log("CHANGGEEEE", field.value, e);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={"w-full focus:ring-0 focus:ring-offset-0"}
                      >
                        <SelectValue placeholder={"Chọn nhóm"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dataSource.categories.map((option) => (
                        <SelectItem
                          key={option.id}
                          value={option.id.toString()}
                        >
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex justify-center">
            <Button type="submit">{ticket ? "Cập nhật" : "Tạo ticket"}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateTicketForm;
