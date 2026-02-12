import { Clock, Crown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const TrialBanner = () => {
  const { isInTrial, trialDaysRemaining, profile } = useAuth();

  if (!isInTrial) return null;

  const hasSubscription =
    profile?.has_fun_facts_subscription || profile?.has_word_subscription;

  if (hasSubscription) return null;

  return (
    <div className="clay-card mb-6 animate-fade-in !p-4 sm:!p-5">
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-clay-button">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-display font-bold text-foreground text-sm">
              Free Trial Active
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              Enjoying full access to all premium features
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-sm font-bold text-primary">
            {trialDaysRemaining} day{trialDaysRemaining !== 1 ? "s" : ""} left
          </span>
        </div>
      </div>
    </div>
  );
};
