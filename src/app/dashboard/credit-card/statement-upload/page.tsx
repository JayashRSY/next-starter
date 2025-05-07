'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Check, AlertCircle } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase/client';
import { Progress } from "@/components/ui/progress";
import { toast } from 'sonner';

export default function StatementUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [extractionStatus, setExtractionStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const { user } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (!selectedFile) {
      return;
    }

    // Validate file type
    if (selectedFile.type !== 'application/pdf') {
      toast("Please upload a PDF file");
      return;
    }

    // Validate file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast("Please upload a file smaller than 10MB");
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || !user) return;

    try {
      setIsUploading(true);
      setUploadProgress(10);

      // 1. Upload file to Supabase Storage
      const fileName = `${user.id}_${Date.now()}_${file.name}`;
      const { data: storageData, error: storageError } = await supabase.storage
      .from('credit-card-statements')
      .upload(fileName, file);
      console.log("🚀 ~ file: page.tsx:51 ~ storageData:", storageData)

      if (storageError) throw storageError;
      
      setUploadProgress(50);
      
      // 2. Call API to process the PDF
      setExtractionStatus('processing');
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/credit-card/extract-statement', {
        method: 'POST',
        body: formData,
      });
      
      setUploadProgress(80);
      
      if (!response.ok) {
        throw new Error('Failed to process statement');
      }
      
      const extractedData = await response.json();
      
      // 3. Store the extracted data in Supabase
      const { error: dbError } = await supabase
        .from('credit_card_statements')
        .insert({
          user_id: user.id,
          file_path: fileName,
          statement_date: extractedData.statementDate,
          billing_period: extractedData.billingPeriod,
          total_amount: extractedData.totalAmount,
          minimum_due: extractedData.minimumDue,
          due_date: extractedData.dueDate,
          transactions: extractedData.transactions,
          metadata: extractedData.metadata
        });
      
      if (dbError) throw dbError;
      
      setUploadProgress(100);
      setExtractionStatus('success');
      
      toast("Your credit card statement has been uploaded and processed");
      
    } catch (error) {
      console.error('Error uploading statement:', error);
      setExtractionStatus('error');
      toast("There was an error processing your statement. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Credit Card Statement Upload
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Upload your credit card statement to track expenses and get insights
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              Upload Statement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {file ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <FileText className="h-12 w-12 text-blue-600" />
                  </div>
                  <p className="text-lg font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <Button 
                    onClick={() => setFile(null)}
                    variant="outline"
                    className="mt-2"
                  >
                    Change File
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Upload className="h-12 w-12 text-gray-400" />
                  </div>
                  <p className="text-lg font-medium">Drag and drop your statement here</p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse (PDF only, max 10MB)
                  </p>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  <Button 
                    onClick={() => document.getElementById('file-upload')?.click()}
                    variant="outline"
                    className="mt-2"
                  >
                    Browse Files
                  </Button>
                </div>
              )}
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {extractionStatus === 'processing' && (
              <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <span>Processing your statement. This may take a moment...</span>
              </div>
            )}

            {extractionStatus === 'success' && (
              <div className="bg-green-50 text-green-800 p-4 rounded-md flex items-center gap-2">
                <Check className="h-5 w-5" />
                <span>Statement processed successfully!</span>
              </div>
            )}

            {extractionStatus === 'error' && (
              <div className="bg-red-50 text-red-800 p-4 rounded-md flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <span>Error processing statement. Please try again.</span>
              </div>
            )}

            <Button 
              onClick={handleUpload} 
              className="w-full"
              disabled={!file || isUploading}
            >
              {isUploading ? 'Processing...' : 'Upload and Process Statement'}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              We extract transaction details, statement date, due date, and other relevant information automatically.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}