"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import DeleteAlertDialog from "@/components/AlertDialog";
import { Category } from "@prisma/client";
import { toast } from "sonner";
import { createCategoryAction, deleteCategoryAction, updateCategoryAction } from "@/app/actions/category";

const CategoryTable = ({ data }: { data: Category[] }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [formData, setFormData] = useState<{
    id?: number;
    name: string;
    isActive: boolean;
    note: string | null;
  }>({
    id: undefined,
    name: "",
    isActive: true,
    note: "",
  });

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      toast.dismiss();
      toast.warning("Tên không được để trống");
      return;
    }

    if (formData.id) {
      updateCategoryAction(formData as Category);
    } else {
      createCategoryAction(formData as Category);
    }
    setOpenDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: undefined,
      name: "",
      note: "",
      isActive: true,
    });
  };

  const handleEdit = (item: Category) => {
    setOpenDialog(true);
    setFormData(item);
  };

  const openDeleteDialog = (item: Category) => {
    setOpenDeleteAlert(true);
    setFormData(item);
  };

  const handleDelete = () => {
    if (formData.id) {
      deleteCategoryAction(formData as Category);
    }
  };
  return (
    <Dialog
      open={openDialog}
      onOpenChange={(open) => {
        console.log("OOO", open);
        setOpenDialog(open);
      }}
    >
      <Button
        variant={"default"}
        onClick={() => setOpenDialog(true)}
        className="mx-4 mt-4 mb-8 self-start"
      >
        Thêm mới
      </Button>

      <div className="w-full px-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Index</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Note</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((ticket, index) => (
              <TableRow key={ticket.id}>
                <TableCell width={"10%"} className="font-medium">
                  {index + 1}
                </TableCell>
                <TableCell width={"25%"}>{ticket.name}</TableCell>
                <TableCell width={"30%"}>{ticket.note}</TableCell>
                <TableCell width={"20%"} className="text-right">
                  {ticket.isActive ? "Đang hoạt động" : "Ngưng hoạt động"}
                </TableCell>
                <TableCell width={"15%"}>
                  <div className="flex justify-end items-center gap-2 mx-auto w-full">
                    <Edit
                      size={16}
                      onClick={() => handleEdit(ticket)}
                      className="cursor-pointer"
                    />
                    <Trash2
                      size={16}
                      color="#FF0000"
                      className="cursor-pointer"
                      onClick={() => openDeleteDialog(ticket)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DeleteAlertDialog
        title="Bạn có chắc chắn muốn xoá?"
        content="Thao tác này sẽ không thể hoàn tác."
        show={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        onConfirm={handleDelete}
      />

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tạo nhóm</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name">Tên</Label>
            <Input
              id="name"
              placeholder="Tên nhóm"
              className="col-span-3"
              value={formData.name}
              onChange={(e) => {
                let value = e.target.value;
                setFormData({
                  ...formData,
                  name: value,
                });
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="note">Ghi chú</Label>
            <Input
              id="note"
              placeholder="Ghi chú"
              className="col-span-3"
              value={formData.note || ""}
              onChange={(e) => {
                let value = e.target.value;
                setFormData({
                  ...formData,
                  note: value,
                });
              }}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.isActive}
              onCheckedChange={(e) => {
                setFormData({
                  ...formData,
                  isActive: e as boolean,
                });
              }}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Trạng thái hoạt động
            </label>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryTable;
