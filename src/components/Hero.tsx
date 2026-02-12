import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="text-center py-12 sm:py-20 px-4 animate-fade-in relative">
      {/* Floating decorative shapes */}
      <div className="hidden lg:block absolute top-8 right-12 w-16 h-16 rounded-[24px] bg-gradient-to-br from-[#A78BFA]/20 to-[#7C3AED]/20 animate-clay-float-slow" />
      <div className="hidden lg:block absolute bottom-12 left-8 w-12 h-12 rounded-full bg-gradient-to-br from-[#EC4899]/20 to-[#DB2777]/20 animate-clay-float animation-delay-2000" />

      {/* Date pill */}
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-xl shadow-clay-card mb-8">
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold text-muted-foreground">{today}</span>
      </div>

      {/* Main headline */}
      <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground mb-6 tracking-tight leading-[1.1]">
        Yours{" "}
        <span className="text-gradient-primary">Daily</span>
      </h1>

      <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
        Start each day with inspiration, knowledge, and wonder.
        A curated collection of wisdom delivered fresh to you.
      </p>

      {!user && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="clay" size="lg" onClick={() => navigate("/auth")} className="w-full sm:w-auto group">
            Get Started
            <ArrowRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="clayOutline" size="lg" onClick={() => navigate("/auth")} className="w-full sm:w-auto">
            Sign In
          </Button>
        </div>
      )}
    </section>
  );
};
