"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

// Income frequency options
const INCOME_FREQUENCIES = [
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

export default function FinanceTrackerPage() {
  const { user } = useAuth();
  
  // Income form state
  const [incomeSource, setIncomeSource] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeFrequency, setIncomeFrequency] = useState("one-time");
  const [incomeDate, setIncomeDate] = useState<Date | undefined>(new Date());
  const [incomeNotes, setIncomeNotes] = useState("");
  
  // Expense form state
  const [expenseCategory, setExpenseCategory] = useState("food");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState<Date | undefined>(new Date());
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
  
  // Fetch incomes from Supabase
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
  
  // Fetch expenses from Supabase
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
  
  // Add new income
  const handleAddIncome = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast("You must be logged in to add income");
      return;
    }
    
    if (!incomeSource || !incomeAmount || !incomeDate) {
      toast("Please fill in all required fields");
      return;
    }
    
    try {
      const { data, error } = await supabase.from("incomes").insert({
          user_id: user.id,
          source_name: incomeSource,
          amount: parseFloat(incomeAmount),
          frequency: incomeFrequency,
          income_date: incomeDate?.toISOString().split("T")[0],  // Changed from 'date' to 'income_date'
          notes: incomeNotes,
        }).select();
        console.log("🚀 ~ file: page.tsx:176 ~ data:", data)
      
      if (error) throw error;
      
      toast("Income added successfully");
      
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
  
  // Add new expense
  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast("You must be logged in to add expense");
      return;
    }
    
    if (!expenseCategory || !expenseAmount || !expenseDate || !paymentMethod) {
      toast("Please fill in all required fields");
      return;
    }
    
    try {
      const { data, error } = await supabase.from("expenses").insert({
          user_id: user.id,
          category: expenseCategory,
          amount: parseFloat(expenseAmount),
          expense_date: expenseDate?.toISOString().split("T")[0], // Changed from 'date' to 'expense_date'
          payment_method: paymentMethod,
          merchant_name: merchantName,
          notes: expenseNotes,
        }).select();
        console.log("🚀 ~ file: page.tsx:221 ~ data:", data)
      
      if (error) throw error;
      
      toast("Expense added successfully");
      
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
  
  // Delete income
  const handleDeleteIncome = async (id: string) => {
    try {
      const { error } = await supabase
        .from("incomes")
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      
      toast("Income deleted successfully");
      
      // Refresh data
      fetchIncomes();
      
    } catch (error) {
      console.error("Error deleting income:", error);
      toast("Failed to delete income");
    }
  };
  
  // Delete expense
  const handleDeleteExpense = async (id: string) => {
    try {
      const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      
      toast("Expense deleted successfully");
      
      // Refresh data
      fetchExpenses();
      
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast("Failed to delete expense");
    }
  };
  
  // Get frequency label
  const getFrequencyLabel = (value: string) => {
    return INCOME_FREQUENCIES.find(freq => freq.value === value)?.label || value;
  };
  
  // Get category label
  const getCategoryLabel = (value: string) => {
    return EXPENSE_CATEGORIES.find(cat => cat.value === value)?.label || value;
  };
  
  // Get payment method label
//   const getPaymentMethodLabel = (value: string) => {
//     return PAYMENT_METHODS.find(method => method.value === value)?.label || value;
//   };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Finance Tracker
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Track your income and expenses to better manage your finances
          </p>
        </div>

        <Tabs defaultValue="income" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>
          
          {/* Income Tab */}
          <TabsContent value="income">
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
                  <form onSubmit={handleAddIncome} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="income-source">Source</Label>
                      <Input
                        id="income-source"
                        placeholder="Salary, Freelance, etc."
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
                        step="0.01"
                        min="0"
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
                          {INCOME_FREQUENCIES.map((freq) => (
                            <SelectItem key={freq.value} value={freq.value}>
                              {freq.label}
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
                            {incomeDate ? (
                              format(incomeDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={incomeDate}
                            onSelect={setIncomeDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="income-notes">Notes (Optional)</Label>
                      <Textarea
                        id="income-notes"
                        placeholder="Additional details..."
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
              
              {/* Income List */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Income</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-4">Loading...</div>
                  ) : incomes.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      No income entries yet
                    </div>
                  ) : (
                    <div className="max-h-[400px] overflow-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Source</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {incomes.map((income) => (
                            <TableRow key={income.id}>
                              <TableCell className="font-medium">
                                {income.source_name}
                                <div className="text-xs text-muted-foreground">
                                  {getFrequencyLabel(income.frequency)}
                                </div>
                              </TableCell>
                              <TableCell>₹{parseFloat(income.amount.toString()).toLocaleString()}</TableCell>
                              <TableCell>{format(new Date(income.date), "dd MMM yyyy")}</TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteIncome(income.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Expenses Tab */}
          <TabsContent value="expenses">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Expense Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-red-500" />
                    Add Expense
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddExpense} className="space-y-4">
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
                          {EXPENSE_CATEGORIES.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
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
                        step="0.01"
                        min="0"
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
                            {expenseDate ? (
                              format(expenseDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={expenseDate}
                            onSelect={setExpenseDate}
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
                          {PAYMENT_METHODS.map((method) => (
                            <SelectItem key={method.value} value={method.value}>
                              {method.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="merchant-name">Merchant/Vendor (Optional)</Label>
                      <Input
                        id="merchant-name"
                        placeholder="Zomato, Amazon, etc."
                        value={merchantName}
                        onChange={(e) => setMerchantName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="expense-notes">Notes (Optional)</Label>
                      <Textarea
                        id="expense-notes"
                        placeholder="Additional details..."
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
              
              {/* Expense List */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-4">Loading...</div>
                  ) : expenses.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      No expense entries yet
                    </div>
                  ) : (
                    <div className="max-h-[400px] overflow-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Category</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {expenses.map((expense) => (
                            <TableRow key={expense.id}>
                              <TableCell className="font-medium">
                                {getCategoryLabel(expense.category)}
                                {expense.merchant_name && (
                                  <div className="text-xs text-muted-foreground">
                                    {expense.merchant_name}
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>₹{parseFloat(expense.amount.toString()).toLocaleString()}</TableCell>
                              <TableCell>{format(new Date(expense.date), "dd MMM yyyy")}</TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteExpense(expense.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}