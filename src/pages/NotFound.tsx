import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import FloatingBlobs from "@/components/FloatingBlobs";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative px-4">
      <FloatingBlobs />
      <div className="text-center relative z-10">
        <h1 className="font-display text-8xl sm:text-9xl font-bold text-gradient-primary mb-4">
          404
        </h1>
        <p className="font-display text-2xl font-bold text-foreground mb-2">
          Page Not Found
        </p>
        <p className="text-muted-foreground mb-8 font-medium max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button variant="clay" size="lg" asChild>
          <a href="/">
            <Home className="w-4 h-4 mr-2" />
            Return Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
