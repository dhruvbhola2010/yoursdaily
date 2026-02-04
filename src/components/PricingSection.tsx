import { Check, Lightbulb, BookOpen, Crown, Gift } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Start your daily inspiration journey",
    features: ["Daily quote of the day", "Beautiful reading experience", "Works on all devices"],
    icon: null,
    popular: false,
    buttonVariant: "outline" as const,
    buttonText: "Get Started",
  },
  {
    name: "Fun Facts",
    price: "$1",
    period: "/month",
    description: "Unlock fascinating daily facts",
    features: [
      "Everything in Free",
      "Daily fun fact with sources",
      "Shareable fact cards",
      "Access to fact archive",
    ],
    icon: Lightbulb,
    popular: false,
    buttonVariant: "gold" as const,
    buttonText: "Start Free Trial",
  },
  {
    name: "Word Lover",
    price: "$1",
    period: "/month",
    description: "Expand your vocabulary daily",
    features: [
      "Everything in Free",
      "Daily word with definition",
      "Pronunciation guide",
      "Usage examples",
    ],
    icon: BookOpen,
    popular: false,
    buttonVariant: "gold" as const,
    buttonText: "Start Free Trial",
  },
  {
    name: "Complete",
    price: "$2",
    period: "/month",
    description: "The full Yours Daily experience",
    features: [
      "Daily quote of the day",
      "Daily fun fact",
      "Daily word with definition",
      "Priority support",
      "Early access to new features",
    ],
    icon: Crown,
    popular: true,
    buttonVariant: "navy" as const,
    buttonText: "Start Free Trial",
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
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Gift className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent">
              7-Day Free Trial • No Credit Card Required
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Choose Your Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Start free, upgrade when you're ready. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative border-0 shadow-card card-hover overflow-hidden animate-slide-up ${
                plan.popular ? "ring-2 ring-accent" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-accent text-accent-foreground text-xs font-semibold py-1.5 text-center">
                  MOST POPULAR
                </div>
              )}
              
              <CardHeader className={`pb-4 ${plan.popular ? "pt-10" : "pt-6"}`}>
                <div className="flex items-center gap-2 mb-2">
                  {plan.icon && <plan.icon className="w-5 h-5 text-accent" />}
                  <span className="font-semibold text-foreground">{plan.name}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
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
