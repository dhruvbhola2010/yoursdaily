import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, UserCircle, Phone } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

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
          ? "Invalid email or password."
          : error.message);
      } else {
        toast.success("Welcome back.");
        navigate("/");
      }
    }

    setIsLoading(false);
  };

  const inputClass = "w-full bg-transparent border-b border-border/50 py-4 pl-10 pr-4 text-foreground text-sm font-light placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none transition-colors duration-300";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12 relative">
      {/* Subtle ambient glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/[0.02] blur-[100px] rounded-full" />
      </div>

      <div className="w-full max-w-sm relative z-10 animate-cinema-reveal" style={{ animationDelay: "0.3s" }}>
        {/* Logo */}
        <div className="text-center mb-16">
          <button onClick={() => navigate("/")} className="inline-block mb-6">
            <span className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-sans font-medium">
              Yours Daily
            </span>
          </button>
          <h1 className="font-display text-3xl text-foreground font-light">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-1">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
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
            <>
              <div className="relative">
                <UserCircle className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                <input
                  type="text"
                  placeholder="Name (optional)"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className={inputClass}
                  maxLength={50}
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={inputClass}
                  maxLength={20}
                />
              </div>
            </>
          )}

          <div className="pt-10">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 text-sm tracking-wide font-sans font-light border border-primary/30 text-primary hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 disabled:opacity-40"
            >
              {isLoading ? "Please wait..." : (
                <span className="flex items-center justify-center gap-2">
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              )}
            </button>
          </div>
        </form>

        <div className="mt-10 text-center">
          <p className="text-xs text-muted-foreground/50 font-light">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="ml-1 text-primary/60 hover:text-primary transition-colors duration-300"
            >
              {isSignUp ? "Sign in" : "Create one"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
