import { Button } from "@/components/ui/button";
import Link from "next/link";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 bg-muted/40">
      <div className="text-center max-w-md">
        <h1 className="text-5xl md:text-7xl font-bold text-primary mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-6">
          We couldn&apos;t find the page you were looking for. Let&apos;s get you back on
          track.
        </p>
        <Button asChild>
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};
export default NotFound;
