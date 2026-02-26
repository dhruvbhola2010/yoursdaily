import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect, useCallback, useRef, TouchEvent } from "react";

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
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleSubscribe = () => {
    if (!user) navigate("/auth");
  };

  const moveTo = useCallback((newIndex: number) => {
    const clamped = Math.max(0, Math.min(2, newIndex));
    if (clamped === activeIndex) return;
    setDirection(clamped > activeIndex ? "right" : "left");
    setActiveIndex(clamped);
  }, [activeIndex]);

  const move = useCallback((dir: 1 | -1) => {
    moveTo(activeIndex + dir);
  }, [activeIndex, moveTo]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move]);

  // Touch/swipe support
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      move(diff > 0 ? 1 : -1);
    }
  };

  // Clear direction after animation
  useEffect(() => {
    if (direction) {
      const t = setTimeout(() => setDirection(null), 400);
      return () => clearTimeout(t);
    }
  }, [direction, activeIndex]);

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="editorial-line mb-12 sm:mb-16" />

        <div className="text-center mb-12 sm:mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 sm:mb-6 font-sans">
            Pricing
          </p>
          <h2 className="font-display text-3xl sm:text-5xl text-foreground font-light">
            Simple, transparent
          </h2>
        </div>

        {/* Arrow controls */}
        <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => move(-1)}
            className={`p-2.5 sm:p-2 border border-border rounded-full transition-all duration-300 ${
              activeIndex === 0
                ? "opacity-20 cursor-not-allowed"
                : "text-muted-foreground hover:text-foreground hover:border-foreground/30 active:scale-90"
            }`}
            disabled={activeIndex === 0}
            aria-label="Previous plan"
          >
            <ChevronLeft className="w-5 h-5 sm:w-4 sm:h-4" />
          </button>
          <div className="flex gap-2">
            {plans.map((_, i) => (
              <button
                key={i}
                onClick={() => moveTo(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === activeIndex
                    ? "bg-primary w-8 sm:w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-1.5"
                }`}
                aria-label={`Select ${plans[i].name} plan`}
              />
            ))}
          </div>
          <button
            onClick={() => move(1)}
            className={`p-2.5 sm:p-2 border border-border rounded-full transition-all duration-300 ${
              activeIndex === 2
                ? "opacity-20 cursor-not-allowed"
                : "text-muted-foreground hover:text-foreground hover:border-foreground/30 active:scale-90"
            }`}
            disabled={activeIndex === 2}
            aria-label="Next plan"
          >
            <ChevronRight className="w-5 h-5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Mobile: single card with slide */}
        <div
          className="block md:hidden overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-400 ease-out"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
              transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className="w-full flex-shrink-0 px-2"
              >
                <div
                  className={`bg-card p-8 rounded-lg relative transition-all duration-400 ${
                    i === activeIndex ? "opacity-100 scale-100" : "opacity-50 scale-95"
                  }`}
                  style={{
                    boxShadow:
                      i === activeIndex
                        ? "0 0 40px hsl(40 30% 72% / 0.08), inset 0 0 0 1px hsl(40 30% 72% / 0.12)"
                        : "none",
                  }}
                >
                  {/* Spotlight glow */}
                  {i === activeIndex && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[180px] h-[180px] bg-primary/[0.05] blur-[70px] rounded-full" />
                    </div>
                  )}

                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-5 font-sans relative z-10">
                    {plan.name}
                  </p>
                  <div className="flex items-baseline gap-1 mb-6 relative z-10">
                    <span className="font-display text-5xl text-foreground font-light">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-muted-foreground text-sm font-light">{plan.period}</span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 relative z-10">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm font-light">
                        <Check className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubscribe();
                    }}
                    className="w-full py-3.5 text-sm tracking-wide font-sans font-light transition-all duration-300 border border-primary/30 text-primary hover:border-primary/60 hover:bg-primary/5 active:scale-[0.98] relative z-10 rounded"
                  >
                    {plan.featured ? "Subscribe" : "Get Started"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid grid-cols-3 gap-px bg-border/50 relative">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              onClick={() => moveTo(i)}
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
