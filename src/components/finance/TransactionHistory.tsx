"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { format } from "date-fns";

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  date: string;
  source_name?: string;
  category?: string;
  merchant_name?: string;
  payment_method?: string;
  frequency?: string;
  notes?: string;
  created_at: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
  isLoading: boolean;
  onRefresh: () => void;
}

export default function TransactionHistory({
  transactions,
  isLoading,
  onRefresh,
}: TransactionHistoryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      food: "Food & Dining",
      groceries: "Groceries",
      transportation: "Transportation",
      entertainment: "Entertainment",
      shopping: "Shopping",
      utilities: "Utilities",
      housing: "Housing",
      healthcare: "Healthcare",
      education: "Education",
      travel: "Travel",
      personal: "Personal Care",
      gifts: "Gifts & Donations",
      investments: "Investments",
      other: "Other",
    };
    
    return categories[category] || category;
  };

  const getPaymentMethodLabel = (method: string) => {
    const methods: Record<string, string> = {
      cash: "Cash",
      upi: "UPI",
      credit_card: "Credit Card",
      debit_card: "Debit Card",
      net_banking: "Net Banking",
      wallet: "Digital Wallet",
      other: "Other",
    };
    
    return methods[method] || method;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <ArrowDownCircle className="h-3 w-3 text-green-500" />
            Income
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <ArrowUpCircle className="h-3 w-3 text-red-500" />
            Expense
          </Badge>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center gap-1"
        >
          <RefreshCcw className="h-3 w-3" />
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading transactions...</div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No transactions found. Add your first transaction to get started.</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {format(new Date(transaction.date), 'dd MMM yyyy')}
                  </TableCell>
                  <TableCell>
                    {transaction.type === 'income' ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Income
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Expense
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      {transaction.type === 'income' ? (
                        <>
                          <span className="font-medium">{transaction.source_name}</span>
                          <span className="text-xs text-muted-foreground">{transaction.frequency}</span>
                        </>
                      ) : (
                        <>
                          <span className="font-medium">{getCategoryLabel(transaction.category || '')}</span>
                          <span className="text-xs text-muted-foreground">
                            {transaction.merchant_name ? `${transaction.merchant_name} • ` : ''}
                            {getPaymentMethodLabel(transaction.payment_method || '')}
                          </span>
                        </>
                      )}
                      {transaction.notes && (
                        <span className="text-xs italic mt-1 text-muted-foreground">
                          {transaction.notes.length > 30 
                            ? `${transaction.notes.substring(0, 30)}...` 
                            : transaction.notes}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className={`text-right font-medium ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+ ' : '- '}
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}