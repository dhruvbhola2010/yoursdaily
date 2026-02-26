import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

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

  const handleSubscribe = () => {
    if (!user) navigate("/auth");
  };

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/50">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-background p-10 flex flex-col ${plan.featured ? "bg-card" : ""}`}
            >
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6 font-sans">
                {plan.name}
              </p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="font-display text-4xl text-foreground font-light">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-muted-foreground text-sm font-light">{plan.period}</span>
                )}
              </div>

              <ul className="space-y-3 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-light">
                    <Check className="w-3 h-3 text-primary/60 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleSubscribe}
                className={`w-full py-3 text-sm tracking-wide font-sans font-light transition-all duration-300 border ${
                  plan.featured
                    ? "border-primary/30 text-primary hover:border-primary/60 hover:bg-primary/5"
                    : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                {plan.featured ? "Subscribe" : "Get Started"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
