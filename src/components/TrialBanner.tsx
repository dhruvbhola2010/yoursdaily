import { Clock, Crown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const TrialBanner = () => {
  const { isInTrial, trialDaysRemaining, profile } = useAuth();

  if (!isInTrial) return null;

  // Check if user has any active subscriptions
  const hasSubscription =
    profile?.has_fun_facts_subscription || profile?.has_word_subscription;

  if (hasSubscription) return null;

  return (
    <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 rounded-xl p-4 mb-6 flex items-center justify-between gap-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-accent/20">
          <Crown className="w-5 h-5 text-accent" />
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">
            Free Trial Active
          </p>
          <p className="text-xs text-muted-foreground">
            Enjoying full access to all premium features
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20">
        <Clock className="w-4 h-4 text-accent" />
        <span className="text-sm font-semibold text-accent">
          {trialDaysRemaining} day{trialDaysRemaining !== 1 ? "s" : ""} left
        </span>
      </div>
    </div>
  );
};
