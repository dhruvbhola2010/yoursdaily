import { Check, Crown, Zap } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Your daily dose of inspiration",
    features: ["Daily quote of the day", "Beautiful reading experience", "Works on all devices"],
    popular: false,
    buttonVariant: "clayOutline" as const,
    buttonText: "Get Started",
    gradient: "",
  },
  {
    name: "Monthly",
    price: "$2",
    period: "/month",
    description: "The full Yours Daily experience",
    features: [
      "Daily quote of the day",
      "Daily fun fact with sources",
      "Daily word with definition",
      "Access to content archive",
      "Priority support",
    ],
    popular: true,
    buttonVariant: "clay" as const,
    buttonText: "Subscribe Now",
    gradient: "bg-gradient-to-br from-[#A78BFA]/5 to-[#7C3AED]/5",
  },
  {
    name: "Annual",
    price: "$20",
    period: "/year",
    description: "Best value — save $4/year",
    features: [
      "Everything in Monthly",
      "2 months free",
      "Early access to new features",
      "Exclusive content drops",
    ],
    popular: false,
    buttonVariant: "clayPink" as const,
    buttonText: "Subscribe & Save",
    gradient: "",
  },
];

export const PricingSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubscribe = () => {
    if (!user) {
      navigate("/auth");
    }
    // TODO: Implement Stripe checkout
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-xl shadow-clay-card mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">
              Simple, Transparent Pricing
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-foreground mb-4 tracking-tight">
            Choose Your Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto font-medium leading-relaxed">
            Start free with daily quotes. Upgrade for the complete experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pricingPlans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative hover:-translate-y-2 animate-slide-up ${
                plan.popular ? "ring-4 ring-primary/20 md:scale-105" : ""
              } ${plan.gradient}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] text-white text-xs font-bold uppercase tracking-wider shadow-clay-button">
                    <Crown className="w-3.5 h-3.5" />
                    Most Popular
                  </div>
                </div>
              )}

              <CardHeader className={`pb-4 ${plan.popular ? "pt-10" : ""}`}>
                <span className="font-display font-extrabold text-foreground text-lg">{plan.name}</span>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="font-display text-5xl font-black text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground font-medium">{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2 font-medium">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#10B981]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#10B981]" />
                      </div>
                      <span className="text-muted-foreground font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.buttonVariant}
                  className="w-full"
                  onClick={handleSubscribe}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
