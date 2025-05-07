"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Expense } from "@/types/finance";
import { toast } from "sonner";

export function ExpenseList() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchExpenses = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("expenses")
          .select("*")
          .order("date", { ascending: false });

        if (error) throw error;
        setExpenses(data || []);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        toast("There was an error loading your expense data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this expense?")) return;

    try {
      const { error } = await supabase.from("expenses").delete().eq("id", id);

      if (error) throw error;

      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
      toast("The expense has been deleted successfully.");
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast("There was an error deleting the expense.");
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading expense data...</div>;
  }

  if (expenses.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No expense records found. Add your first expense to get started.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Merchant</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>
                {format(new Date(expense.date), "dd MMM yyyy")}
              </TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>₹{expense.amount.toLocaleString()}</TableCell>
              <TableCell>{expense.payment_method}</TableCell>
              <TableCell>{expense.merchant_name || "-"}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                {expense.notes || "-"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(expense.id!)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}