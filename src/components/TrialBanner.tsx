import { useAuth } from "@/contexts/AuthContext";

export const TrialBanner = () => {
  const { isInTrial, trialDaysRemaining, profile } = useAuth();

  if (!isInTrial) return null;

  const hasSubscription = profile?.has_fun_facts_subscription || profile?.has_word_subscription;
  if (hasSubscription) return null;

  return (
    <div className="mb-16 py-4 border-t border-b border-border/50 animate-fade-in">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground font-sans tracking-wide font-light">
          Free trial · Full access to all content
        </p>
        <p className="text-xs text-primary/70 font-sans tracking-wide font-light">
          {trialDaysRemaining} day{trialDaysRemaining !== 1 ? "s" : ""} remaining
        </p>
      </div>
    </div>
  );
};
