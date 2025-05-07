'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Calendar } from "lucide-react";
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

interface Statement {
  id: string;
  statement_date: string;
  billing_period: string;
  total_amount: number;
  minimum_due: number;
  due_date: string;
  file_path: string;
  created_at: string;
}

export default function StatementHistoryPage() {
  const [statements, setStatements] = useState<Statement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStatements = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('credit_card_statements')
          .select('*')
          .order('statement_date', { ascending: false });

        if (error) throw error;
        setStatements(data || []);
      } catch (error) {
        console.error('Error fetching statements:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatements();
  }, [user]);

  const downloadStatement = async (filePath: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('credit-card-statements')
        .download(filePath);

      if (error) throw error;

      // Create a download link
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = filePath.split('/').pop() || 'statement.pdf';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading statement:', error);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Statement History
            </h1>
            <p className="text-muted-foreground mt-2">
              View and manage your uploaded credit card statements
            </p>
          </div>
          
          <Link href="/dashboard/credit-card/statement-upload">
            <Button className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Upload New Statement
            </Button>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              Your Statements
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading statements...</div>
            ) : statements.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">You haven&apos;t uploaded any statements yet.</p>
                <Link href="/dashboard/credit-card/statement-upload">
                  <Button>Upload Your First Statement</Button>
                </Link>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Statement Date</TableHead>
                    <TableHead>Billing Period</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statements.map((statement) => (
                    <TableRow key={statement.id}>
                      <TableCell>
                        {format(new Date(statement.statement_date), 'dd MMM yyyy')}
                      </TableCell>
                      <TableCell>{statement.billing_period}</TableCell>
                      <TableCell>₹{statement.total_amount.toLocaleString()}</TableCell>
                      <TableCell>
                        {format(new Date(statement.due_date), 'dd MMM yyyy')}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => downloadStatement(statement.file_path)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Link href={`/dashboard/credit-card/statement-details/${statement.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}