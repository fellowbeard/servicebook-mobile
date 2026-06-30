import { useEffect, useState } from "react";

import { apiFetch } from "../api/client";
import type { Client } from "../types/client";
import type { DashboardData } from "../types/dashboard";

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch<DashboardData>("/api/v1/dashboard")
      .then((data) => setClients(data.clients))
      .catch((error) => {
        setError(error instanceof Error ? error.message : "Unable to load clients.");
      });
  }, []);

  return { clients, error };
}