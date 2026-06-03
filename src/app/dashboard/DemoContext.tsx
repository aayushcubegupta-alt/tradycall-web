"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface DemoContextType {
  isDemoMode: boolean;
  setDemoMode: (val: boolean) => void;
  businessId: string | null;
  businessName: string;
  fullName: string;
  user: any;
  loadingProfile: boolean;
  isActive: boolean;
  onboardingBooked: boolean;
  setOnboardingBooked: (val: boolean) => Promise<void>;
  showBookingModal: boolean;
  setShowBookingModal: (val: boolean) => void;
}

const DemoContext = createContext<DemoContextType>({
  isDemoMode: false,
  setDemoMode: () => {},
  businessId: null,
  businessName: "ABC Plumbing",
  fullName: "John",
  user: null,
  loadingProfile: true,
  isActive: false,
  onboardingBooked: false,
  setOnboardingBooked: async () => {},
  showBookingModal: false,
  setShowBookingModal: () => {},
});

const DEMO_BUSINESS_ID = "00000000-0000-0000-0000-000000000000";

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isActiveState, setIsActiveState] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Initial mount load of demo mode setting
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const searchParams = new URLSearchParams(window.location.search);
      const isDemoEnv = hostname.startsWith("demo") || searchParams.get("demo") === "true";
      
      if (isDemoEnv) {
        setIsDemoModeState(true);
      } else {
        const saved = localStorage.getItem("tradycall_demo_mode");
        if (saved === "true") {
          setIsDemoModeState(true);
        }
      }
    }
  }, []);

  // Keep other state variables
  const [isDemoMode, setIsDemoModeState] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [onboardingBookedState, setOnboardingBookedState] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Fetch profiles and handle auto-provisioning
  useEffect(() => {
    const fetchProfileAndBusiness = async () => {
      setLoadingProfile(true);
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          setUser(authUser);
          
          // Query profiles with linked business and is_active column
          const { data: profile, error: profileErr } = await supabase
            .from("profiles")
            .select("*, businesses(name, is_active, onboarding_booked)")
            .eq("user_id", authUser.id)
            .maybeSingle();

          if (profile) {
            setFullName(profile.full_name || authUser.user_metadata?.full_name || "John");
            
            if (profile.businesses) {
              setBusinessId(profile.business_id);
              setBusinessName(profile.businesses.name || profile.business_name || "My Business");
              setIsActiveState(!!profile.businesses.is_active);
              setOnboardingBookedState(!!profile.businesses.onboarding_booked);
            } else {
              // Auto-provision a new business record
              const businessNameText = profile.business_name || authUser.user_metadata?.business_name || "My Business";
              
              const { data: newBus, error: busErr } = await supabase
                .from("businesses")
                .insert({ name: businessNameText })
                .select()
                .single();
              
              if (newBus) {
                // Update profile reference
                await supabase
                  .from("profiles")
                  .update({ business_id: newBus.id })
                  .eq("user_id", authUser.id);
                  
                setBusinessId(newBus.id);
                setBusinessName(newBus.name);
                setIsActiveState(!!newBus.is_active);
                setOnboardingBookedState(!!newBus.onboarding_booked);
              } else {
                console.error("Auto-provisioning business failed:", busErr);
                setBusinessName(businessNameText);
                setIsActiveState(false);
                setOnboardingBookedState(false);
              }
            }
          } else {
            // Fallback if profile doesn't exist
            setFullName(authUser.user_metadata?.full_name || "John");
            setBusinessName(authUser.user_metadata?.business_name || "ABC Plumbing");
            setOnboardingBookedState(false);
          }
        } else {
          // Dev Mode Fallback: Use mock session
          setUser({ email: "developer@tradycall.com.au" });
          setFullName("John");
          setBusinessName("ABC Plumbing");
          setIsActiveState(false);
        }
      } catch (err) {
        console.error("Failed to load user profile in layout:", err);
        // Dev Mode Fallback
        setUser({ email: "developer@tradycall.com.au" });
        setFullName("John");
        setBusinessName("ABC Plumbing");
        setIsActiveState(false);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfileAndBusiness();
  }, []);

  const setOnboardingBooked = async (val: boolean) => {
    setOnboardingBookedState(val);
    if (!isDemoMode && businessId) {
      try {
        const { error } = await supabase
          .from("businesses")
          .update({ onboarding_booked: val })
          .eq("id", businessId);
        if (error) {
          console.error("Failed to update onboarding_booked in db:", error);
        }
      } catch (err) {
        console.error("Error updating onboarding_booked:", err);
      }
    }
  };

  const setDemoMode = (val: boolean) => {
    setIsDemoModeState(val);
    if (typeof window !== "undefined") {
      localStorage.setItem("tradycall_demo_mode", String(val));
    }
  };

  console.log("DemoProvider render - isDemoMode:", isDemoMode, "businessId:", isDemoMode ? DEMO_BUSINESS_ID : businessId, "isActive:", isDemoMode ? true : isActiveState);

  return (
    <DemoContext.Provider
      value={{
        isDemoMode,
        setDemoMode,
        businessId: isDemoMode ? DEMO_BUSINESS_ID : businessId,
        businessName: isDemoMode ? "ABC Plumbing Demo" : businessName,
        fullName,
        user,
        loadingProfile,
        isActive: isDemoMode ? true : isActiveState,
        onboardingBooked: isDemoMode ? true : onboardingBookedState,
        setOnboardingBooked,
        showBookingModal,
        setShowBookingModal,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  return useContext(DemoContext);
}
