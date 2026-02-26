import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect, useCallback } from "react";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["Daily quote", "All devices"],
  },
  {
    name: "Monthly",
    price: "$2",
    period: "/mo",
    featured: true,
    features: ["Daily quote", "Daily fact", "Daily word", "Content archive", "Priority support"],
  },
  {
    name: "Annual",
    price: "$20",
    period: "/yr",
    features: ["Everything in Monthly", "Best value", "Early access"],
  },
];

export const PricingSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeIndex, setActiveIndex] = useState(1);

  const handleSubscribe = () => {
    if (!user) navigate("/auth");
  };

  const move = useCallback((dir: 1 | -1) => {
    setActiveIndex((prev) => Math.max(0, Math.min(2, prev + dir)));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move]);

  return (
    <section className="py-32 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="editorial-line mb-16" />

        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6 font-sans">
            Pricing
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-foreground font-light">
            Simple, transparent
          </h2>
        </div>

        {/* Arrow controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => move(-1)}
            className={`p-2 border border-border rounded-full transition-all duration-300 ${
              activeIndex === 0
                ? "opacity-20 cursor-not-allowed"
                : "text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}
            disabled={activeIndex === 0}
            aria-label="Previous plan"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {plans.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                  i === activeIndex
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Select ${plans[i].name} plan`}
              />
            ))}
          </div>
          <button
            onClick={() => move(1)}
            className={`p-2 border border-border rounded-full transition-all duration-300 ${
              activeIndex === 2
                ? "opacity-20 cursor-not-allowed"
                : "text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}
            disabled={activeIndex === 2}
            aria-label="Next plan"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/50 relative">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              onClick={() => setActiveIndex(i)}
              className={`bg-background p-10 flex flex-col cursor-pointer transition-all duration-500 relative ${
                i === activeIndex
                  ? "bg-card scale-[1.02] z-10"
                  : "opacity-40 hover:opacity-60"
              }`}
              style={{
                boxShadow:
                  i === activeIndex
                    ? "0 0 40px hsl(40 30% 72% / 0.06), inset 0 0 0 1px hsl(40 30% 72% / 0.12)"
                    : "none",
              }}
            >
              {/* Spotlight glow */}
              {i === activeIndex && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-primary/[0.04] blur-[80px] rounded-full transition-all duration-700" />
                </div>
              )}

              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6 font-sans relative z-10">
                {plan.name}
              </p>
              <div className="flex items-baseline gap-1 mb-8 relative z-10">
                <span className="font-display text-4xl text-foreground font-light">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-muted-foreground text-sm font-light">{plan.period}</span>
                )}
              </div>

              <ul className="space-y-3 mb-10 flex-1 relative z-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-light">
                    <Check className="w-3 h-3 text-primary/60 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubscribe();
                }}
                className={`w-full py-3 text-sm tracking-wide font-sans font-light transition-all duration-300 border relative z-10 ${
                  i === activeIndex
                    ? "border-primary/30 text-primary hover:border-primary/60 hover:bg-primary/5"
                    : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                {i === activeIndex && plan.featured ? "Subscribe" : i === activeIndex ? "Get Started" : plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
