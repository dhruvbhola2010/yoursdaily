import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, Phone, Mail, Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import FloatingBlobs from "@/components/FloatingBlobs";
import { Header } from "@/components/Header";

const Profile = () => {
  const { user, profile, loading, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || "");
      setPhoneNumber(profile.phone_number || "");
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    const { error } = await supabase.from("profiles").update({
      display_name: displayName || null,
      phone_number: phoneNumber || null,
    }).eq("user_id", user.id);

    if (error) {
      toast.error("Failed to save profile.");
    } else {
      await refreshProfile();
      toast.success("Profile updated!");
    }
    setSaving(false);
  };

  if (loading) return null;

  const inputClass = "flex w-full border-0 bg-secondary/80 rounded-[20px] h-14 px-12 py-4 text-foreground text-base shadow-clay-pressed placeholder:text-muted-foreground focus:bg-white focus:ring-4 focus:ring-primary/20 focus:outline-none transition-all duration-200 font-medium";

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingBlobs />
      <Header />

      <main className="max-w-lg mx-auto px-4 pb-12 relative z-10">
        <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>

        <Card className="shadow-clay-card">
          <CardHeader>
            <h1 className="font-display text-2xl font-black text-foreground">Your Profile</h1>
            <p className="text-sm text-muted-foreground font-medium">Personalize your account</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email (read-only) */}
            <div className="relative opacity-60">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className={inputClass + " cursor-not-allowed"}
              />
            </div>

            <div className="relative">
              <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
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
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="tel"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={inputClass}
                maxLength={20}
              />
            </div>

            <Button variant="clay" className="w-full" onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
