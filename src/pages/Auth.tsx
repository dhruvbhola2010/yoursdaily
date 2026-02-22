import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Mail, Lock, ArrowRight, UserCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import FloatingBlobs from "@/components/FloatingBlobs";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, signIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
        setIsLoading(false);
        return;
      }
    }

    if (isSignUp) {
      const { error } = await signUp(email, password);
      if (error) {
        toast.error(error.message.includes("already registered")
          ? "This email is already registered. Please sign in instead."
          : error.message);
      } else {
        // Update profile with name/phone after signup
        if (displayName || phoneNumber) {
          const { data: { user: newUser } } = await supabase.auth.getUser();
          if (newUser) {
            await supabase.from("profiles").update({
              display_name: displayName || null,
              phone_number: phoneNumber || null,
            }).eq("user_id", newUser.id);
          }
        }
        toast.success("Check your email to confirm your account!");
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(error.message.includes("Invalid login credentials")
          ? "Invalid email or password. Please try again."
          : error.message);
      } else {
        toast.success("Welcome back!");
        navigate("/");
      }
    }

    setIsLoading(false);
  };

  const inputClass = "flex w-full border-0 bg-secondary/80 rounded-[20px] h-14 px-12 py-4 text-foreground text-base shadow-clay-pressed placeholder:text-muted-foreground focus:bg-white focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all duration-200 font-medium";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 relative">
      <FloatingBlobs />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <button onClick={() => navigate("/")} className="inline-flex items-center gap-2.5 mb-4 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] flex items-center justify-center shadow-clay-button transition-all duration-300 group-hover:-translate-y-0.5">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-display text-3xl font-black text-foreground">
              Yours Daily
            </span>
          </button>
          <p className="text-muted-foreground font-medium">
            {isSignUp ? "Start your journey of daily inspiration" : "Welcome back! Sign in to continue"}
          </p>
        </div>

        <Card className="shadow-clay-card">
          <CardHeader className="pb-4">
            <h2 className="font-display text-2xl font-black text-foreground text-center">
              {isSignUp ? "Create Your Account" : "Sign In"}
            </h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  required
                  minLength={6}
                />
              </div>

              {/* Sign Up Extra Fields */}
              {isSignUp && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    <div className="h-px flex-1 bg-border" />
                    Personalize
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  <div className="relative">
                    <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Display name (optional)"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className={inputClass}
                      maxLength={50}
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="tel"
                      placeholder="Phone number (optional)"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className={inputClass}
                      maxLength={20}
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                variant="clay"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Please wait..." : (
                  <>
                    {isSignUp ? "Create Account" : "Sign In"}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground font-medium">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="ml-1 text-primary font-bold hover:underline"
                >
                  {isSignUp ? "Sign in" : "Create account"}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6 font-medium">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Auth;
