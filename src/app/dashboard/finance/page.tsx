"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

// Income frequency options
const FREQUENCY_OPTIONS = [
  { value: "one-time", label: "One-time" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

// Expense categories
const EXPENSE_CATEGORIES = [
  { value: "food", label: "Food & Dining" },
  { value: "transportation", label: "Transportation" },
  { value: "housing", label: "Housing & Rent" },
  { value: "utilities", label: "Utilities" },
  { value: "entertainment", label: "Entertainment" },
  { value: "shopping", label: "Shopping" },
  { value: "health", label: "Health & Medical" },
  { value: "education", label: "Education" },
  { value: "travel", label: "Travel" },
  { value: "personal", label: "Personal Care" },
  { value: "investments", label: "Investments" },
  { value: "debt", label: "Debt Payments" },
  { value: "gifts", label: "Gifts & Donations" },
  { value: "other", label: "Other" },
];

// Payment methods
const PAYMENT_METHODS = [
  { value: "cash", label: "Cash" },
  { value: "upi", label: "UPI" },
  { value: "credit_card", label: "Credit Card" },
  { value: "debit_card", label: "Debit Card" },
  { value: "net_banking", label: "Net Banking" },
  { value: "other", label: "Other" },
];

interface Income {
  id: string;
  source_name: string;
  amount: number;
  frequency: string;
  date: string;
  notes: string;
  created_at: string;
}

interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  payment_method: string;
  merchant_name: string;
  notes: string;
  created_at: string;
}

export default function FinancePage() {
  const { user } = useAuth();
  
  // Income form state
  const [incomeSource, setIncomeSource] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeFrequency, setIncomeFrequency] = useState("one-time");
  const [incomeDate, setIncomeDate] = useState<Date>(new Date());
  const [incomeNotes, setIncomeNotes] = useState("");
  
  // Expense form state
  const [expenseCategory, setExpenseCategory] = useState("food");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState<Date>(new Date());
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [merchantName, setMerchantName] = useState("");
  const [expenseNotes, setExpenseNotes] = useState("");
  
  // Data state
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch data on component mount
  useEffect(() => {
    if (user) {
      fetchIncomes();
      fetchExpenses();
    }
  }, [user]);
  
  const fetchIncomes = async () => {
    try {
      const { data, error } = await supabase
        .from("incomes")
        .select("*")
        .order("date", { ascending: false });
        
      if (error) throw error;
      setIncomes(data || []);
    } catch (error) {
      console.error("Error fetching incomes:", error);
      toast("Failed to fetch income data");
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchExpenses = async () => {
    try {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .order("date", { ascending: false });
        
      if (error) throw error;
      setExpenses(data || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      toast("Failed to fetch expense data");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleIncomeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!incomeSource || !incomeAmount || !incomeFrequency) {
      toast("Please fill in all required fields");
      return;
    }
    
    try {
      const { error } = await supabase.from("incomes").insert({
        user_id: user?.id,
        source_name: incomeSource,
        amount: parseFloat(incomeAmount),
        frequency: incomeFrequency,
        date: format(incomeDate, "yyyy-MM-dd"),
        notes: incomeNotes,
      });
      
      if (error) throw error;
      
      toast("Your income has been recorded successfully");
      
      // Reset form
      setIncomeSource("");
      setIncomeAmount("");
      setIncomeFrequency("one-time");
      setIncomeDate(new Date());
      setIncomeNotes("");
      
      // Refresh data
      fetchIncomes();
      
    } catch (error) {
      console.error("Error adding income:", error);
      toast("Failed to add income");
    }
  };
  
  const handleExpenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!expenseCategory || !expenseAmount || !paymentMethod) {
      toast("Please fill in all required fields");
      return;
    }
    
    try {
      const { error } = await supabase.from("expenses").insert({
        user_id: user?.id,
        category: expenseCategory,
        amount: parseFloat(expenseAmount),
        date: format(expenseDate, "yyyy-MM-dd"),
        payment_method: paymentMethod,
        merchant_name: merchantName,
        notes: expenseNotes,
      });
      
      if (error) throw error;
      
      toast("Your expense has been recorded successfully");
      
      // Reset form
      setExpenseCategory("food");
      setExpenseAmount("");
      setExpenseDate(new Date());
      setPaymentMethod("cash");
      setMerchantName("");
      setExpenseNotes("");
      
      // Refresh data
      fetchExpenses();
      
    } catch (error) {
      console.error("Error adding expense:", error);
      toast("Failed to add expense");
    }
  };
  
  const deleteIncome = async (id: string) => {
    try {
      const { error } = await supabase
        .from("incomes")
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      
      toast("The income entry has been deleted");
      
      // Refresh data
      fetchIncomes();
      
    } catch (error) {
      console.error("Error deleting income:", error);
      toast("Failed to delete income");
    }
  };
  
  const deleteExpense = async (id: string) => {
    try {
      const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      
      toast("The expense entry has been deleted");
      
      // Refresh data
      fetchExpenses();
      
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast("Failed to delete expense");
    }
  };
  
  // Helper function to get label from value
  const getFrequencyLabel = (value: string) => {
    return FREQUENCY_OPTIONS.find(option => option.value === value)?.label || value;
  };
  
  const getCategoryLabel = (value: string) => {
    return EXPENSE_CATEGORIES.find(option => option.value === value)?.label || value;
  };
  
  const getPaymentMethodLabel = (value: string) => {
    return PAYMENT_METHODS.find(option => option.value === value)?.label || value;
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Income & Expense Tracker
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Track your finances, manage your budget, and gain insights into your spending habits
          </p>
        </div>

        <Tabs defaultValue="add" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="add">Add New Entry</TabsTrigger>
            <TabsTrigger value="income">Income History</TabsTrigger>
            <TabsTrigger value="expenses">Expense History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="add" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Income Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-green-500" />
                    Add Income
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleIncomeSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="income-source">Income Source</Label>
                      <Input
                        id="income-source"
                        placeholder="e.g. Salary, Freelance, Investments"
                        value={incomeSource}
                        onChange={(e) => setIncomeSource(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="income-amount">Amount (₹)</Label>
                      <Input
                        id="income-amount"
                        type="number"
                        placeholder="0.00"
                        value={incomeAmount}
                        onChange={(e) => setIncomeAmount(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="income-frequency">Frequency</Label>
                      <Select
                        value={incomeFrequency}
                        onValueChange={setIncomeFrequency}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          {FREQUENCY_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {incomeDate ? format(incomeDate, "PPP") : "Select a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={incomeDate}
                            onSelect={(date) => date && setIncomeDate(date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="income-notes">Notes (Optional)</Label>
                      <Textarea
                        id="income-notes"
                        placeholder="Add any additional details"
                        value={incomeNotes}
                        onChange={(e) => setIncomeNotes(e.target.value)}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Add Income
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              {/* Expense Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-red-500" />
                    Add Expense
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleExpenseSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="expense-category">Category</Label>
                      <Select
                        value={expenseCategory}
                        onValueChange={setExpenseCategory}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {EXPENSE_CATEGORIES.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="expense-amount">Amount (₹)</Label>
                      <Input
                        id="expense-amount"
                        type="number"
                        placeholder="0.00"
                        value={expenseAmount}
                        onChange={(e) => setExpenseAmount(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {expenseDate ? format(expenseDate, "PPP") : "Select a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={expenseDate}
                            onSelect={(date) => date && setExpenseDate(date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="payment-method">Payment Method</Label>
                      <Select
                        value={paymentMethod}
                        onValueChange={setPaymentMethod}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          {PAYMENT_METHODS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="merchant-name">Merchant/Vendor (Optional)</Label>
                      <Input
                        id="merchant-name"
                        placeholder="e.g. Amazon, Zomato, Uber"
                        value={merchantName}
                        onChange={(e) => setMerchantName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="expense-notes">Notes (Optional)</Label>
                      <Textarea
                        id="expense-notes"
                        placeholder="Add any additional details"
                        value={expenseNotes}
                        onChange={(e) => setExpenseNotes(e.target.value)}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Add Expense
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="income" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Income History</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">Loading income data...</div>
                ) : incomes.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No income entries yet. Add your first income!</p>
                  </div>
                ) : (
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
                          <TableCell>{format(new Date(income.date), "dd MMM yyyy")}</TableCell>
                          <TableCell>{income.source_name}</TableCell>
                          <TableCell>₹{parseFloat(income.amount.toString()).toLocaleString()}</TableCell>
                          <TableCell>{getFrequencyLabel(income.frequency)}</TableCell>
                          <TableCell className="max-w-xs truncate">{income.notes}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteIncome(income.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="expenses" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Expense History</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">Loading expense data...</div>
                ) : expenses.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No expense entries yet. Add your first expense!</p>
                  </div>
                ) : (
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
                          <TableCell>{format(new Date(expense.date), "dd MMM yyyy")}</TableCell>
                          <TableCell>{getCategoryLabel(expense.category)}</TableCell>
                          <TableCell>₹{parseFloat(expense.amount.toString()).toLocaleString()}</TableCell>
                          <TableCell>{getPaymentMethodLabel(expense.payment_method)}</TableCell>
                          <TableCell>{expense.merchant_name || "-"}</TableCell>
                          <TableCell className="max-w-xs truncate">{expense.notes}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteExpense(expense.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}