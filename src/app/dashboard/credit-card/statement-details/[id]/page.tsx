'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, ArrowLeft, Calendar, DollarSign, Clock } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase/client';
import { format } from 'date-fns';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams, useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface Transaction {
  date: string;
  description: string;
  amount: number;
  category?: string;
}

interface Statement {
  id: string;
  statement_date: string;
  billing_period: string;
  total_amount: number;
  minimum_due: number;
  due_date: string;
  file_path: string;
  transactions: Transaction[];
  created_at: string;
}

export default function StatementDetailsPage() {
  const [statement, setStatement] = useState<Statement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const statementId = params.id as string;

  useEffect(() => {
    const fetchStatementDetails = async () => {
      if (!user || !statementId) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('credit_card_statements')
          .select('*')
          .eq('id', statementId)
          .single();

        if (error) throw error;
        setStatement(data);
      } catch (error) {
        console.error('Error fetching statement details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatementDetails();
  }, [user, statementId]);

  const downloadStatement = async () => {
    if (!statement) return;
    
    try {
      const { data, error } = await supabase.storage
        .from('credit-card-statements')
        .download(statement.file_path);

      if (error) throw error;

      // Create a download link
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = statement.file_path.split('/').pop() || 'statement.pdf';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading statement:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 max-w-6xl">
        <div className="text-center py-16">Loading statement details...</div>
      </div>
    );
  }

  if (!statement) {
    return (
      <div className="container mx-auto py-8 max-w-6xl">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Statement Not Found</h2>
          <p className="text-muted-foreground mb-6">The statement you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to view it.</p>
          <Link href="/dashboard/credit-card/statement-history">
            <Button>Back to Statement History</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Statement Details
              </h1>
              <p className="text-muted-foreground mt-1">
                {statement.billing_period}
              </p>
            </div>
          </div>
          
          <Button 
            className="flex items-center gap-2"
            onClick={downloadStatement}
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>

        {/* Statement Summary Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              Statement Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> Statement Date
                </span>
                <span className="text-lg font-medium">
                  {format(new Date(statement.statement_date), 'dd MMM yyyy')}
                </span>
              </div>
              
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <DollarSign className="h-4 w-4" /> Total Amount
                </span>
                <span className="text-lg font-medium text-red-600">
                  ₹{statement.total_amount.toLocaleString()}
                </span>
              </div>
              
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-4 w-4" /> Due Date
                </span>
                <span className="text-lg font-medium">
                  {format(new Date(statement.due_date), 'dd MMM yyyy')}
                </span>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Minimum Amount Due</span>
              <span className="font-medium">₹{statement.minimum_due.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-blue-600" />
              Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {statement.transactions && statement.transactions.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statement.transactions.map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {format(new Date(transaction.date), 'dd MMM yyyy')}
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        {transaction.category && (
                          <Badge variant="outline">{transaction.category}</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        ₹{transaction.amount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No transaction data available for this statement.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}