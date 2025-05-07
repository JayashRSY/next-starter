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
import { Income } from "@/types/finance";
import { toast } from "sonner";

export function IncomeList() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchIncomes = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("incomes")
          .select("*")
          .order("date", { ascending: false });

        if (error) throw error;
        setIncomes(data || []);
      } catch (error) {
        console.error("Error fetching incomes:", error);
        toast( "There was an error loading your income data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIncomes();
  }, [user, toast]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this income?")) return;

    try {
      const { error } = await supabase.from("incomes").delete().eq("id", id);

      if (error) throw error;

      setIncomes((prev) => prev.filter((income) => income.id !== id));
      toast("The income has been deleted successfully.");
    } catch (error) {
      console.error("Error deleting income:", error);
      toast("There was an error deleting the income.");
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading income data...</div>;
  }

  if (incomes.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No income records found. Add your first income to get started.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incomes.map((income) => (
            <TableRow key={income.id}>
              <TableCell>
                {format(new Date(income?.date), "dd MMM yyyy")}
              </TableCell>
              <TableCell>{income.source_name}</TableCell>
              <TableCell>₹{income.amount.toLocaleString()}</TableCell>
              <TableCell>{income.frequency}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                {income.notes || "-"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(income.id!)}
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