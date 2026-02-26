import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <h1 className="font-display text-7xl sm:text-8xl text-foreground/20 font-light mb-6">404</h1>
      <p className="text-sm text-muted-foreground font-light mb-12">Page not found</p>
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-sm text-primary/70 hover:text-primary transition-colors duration-300 font-light"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Return home
      </button>
    </div>
  );
};

export default NotFound;
