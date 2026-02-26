import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TrackedApartment, ApartmentTransaction } from "@/types/realestate";

export function useRealEstateData() {
  const [apartments, setApartments] = useState<TrackedApartment[]>([]);
  const [transactions, setTransactions] = useState<Record<string, ApartmentTransaction[]>>({});
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  // Load tracked apartments
  const loadApartments = useCallback(async () => {
    const { data, error } = await supabase
      .from("tracked_apartments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading apartments:", error);
      return;
    }
    setApartments(data || []);
  }, []);

  // Load cached transactions for an apartment
  const loadTransactions = useCallback(async (apartmentId: string) => {
    const { data, error } = await supabase
      .from("apartment_transactions")
      .select("*")
      .eq("apartment_id", apartmentId)
      .order("deal_year", { ascending: false })
      .order("deal_month", { ascending: false })
      .order("deal_day", { ascending: false });

    if (error) {
      console.error("Error loading transactions:", error);
      return;
    }
    setTransactions((prev) => ({ ...prev, [apartmentId]: data || [] }));
  }, []);

  // Add a new apartment to track
  const addApartment = useCallback(
    async (apt: Omit<TrackedApartment, "id" | "created_at">) => {
      const { data, error } = await supabase
        .from("tracked_apartments")
        .insert(apt)
        .select()
        .single();

      if (error) {
        console.error("Error adding apartment:", error);
        return null;
      }
      await loadApartments();
      return data;
    },
    [loadApartments]
  );

  // Delete a tracked apartment
  const deleteApartment = useCallback(
    async (id: string) => {
      const { error } = await supabase.from("tracked_apartments").delete().eq("id", id);
      if (error) {
        console.error("Error deleting apartment:", error);
        return;
      }
      setTransactions((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      await loadApartments();
    },
    [loadApartments]
  );

  // Fetch latest transactions from API
  const fetchTransactions = useCallback(
    async (apartment: TrackedApartment, dealYearMonth?: string) => {
      setFetching(true);
      try {
        const now = new Date();
        const ym = dealYearMonth || `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;

        const { data, error } = await supabase.functions.invoke("fetch-real-estate", {
          body: {
            apartmentId: apartment.id,
            regionCode: apartment.region_code,
            apartmentName: apartment.name,
            dealYearMonth: ym,
          },
        });

        if (error) {
          console.error("Edge function error:", error);
          return;
        }

        // Reload from DB
        await loadTransactions(apartment.id);
        return data;
      } finally {
        setFetching(false);
      }
    },
    [loadTransactions]
  );

  useEffect(() => {
    loadApartments().then(() => setLoading(false));
  }, [loadApartments]);

  // Load transactions for all apartments
  useEffect(() => {
    apartments.forEach((apt) => loadTransactions(apt.id));
  }, [apartments, loadTransactions]);

  return {
    apartments,
    transactions,
    loading,
    fetching,
    addApartment,
    deleteApartment,
    fetchTransactions,
    loadTransactions,
  };
}
