import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, Phone, Mail, Save, ArrowLeft, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ThemeSelector, type ContentTheme } from "@/components/ThemeSelector";

const Profile = () => {
  const { user, profile, loading, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<ContentTheme>("all");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || "");
      setPhoneNumber(profile.phone_number || "");
      setSelectedTheme((profile.selected_theme as ContentTheme) || "all");
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    const { error } = await supabase.from("profiles").update({
      display_name: displayName || null,
      phone_number: phoneNumber || null,
      selected_theme: selectedTheme,
    }).eq("user_id", user.id);

    if (error) {
      toast.error("Failed to save profile.");
    } else {
      await refreshProfile();
      toast.success("Profile updated.");
    }
    setSaving(false);
  };

  if (loading) return null;

  const inputClass = "w-full bg-transparent border-b border-border/50 py-4 pl-10 pr-4 text-foreground text-sm font-light placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none transition-colors duration-300";

  return (
    <div className="min-h-screen bg-background relative">
      {/* Subtle ambient glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/[0.02] blur-[100px] rounded-full" />
      </div>

      <main className="max-w-md mx-auto px-6 py-12 relative z-10">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-light mb-16">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        {/* Profile section */}
        <div className="mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6 font-sans">Profile</p>

          <div className="space-y-1">
            <div className="relative opacity-50">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className={inputClass + " cursor-not-allowed"}
              />
            </div>

            <div className="relative">
              <UserCircle className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
              <input
                type="text"
                placeholder="Display name"
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
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={inputClass}
                maxLength={20}
              />
            </div>
          </div>
        </div>

        {/* Theme section */}
        <div className="mb-16">
          <div className="editorial-line mb-12" />
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6 font-sans">Content Theme</p>
          <ThemeSelector selected={selectedTheme} onChange={setSelectedTheme} />
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3.5 text-sm tracking-wide font-sans font-light border border-primary/30 text-primary hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 disabled:opacity-40 flex items-center justify-center gap-2"
        >
          <Save className="w-3.5 h-3.5" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </main>
    </div>
  );
};

export default Profile;
