import { Stack } from "expo-router";

import { ProtectedRoute } from "@/auth/ProtectedRoute";

export default function AppLayout() {
  return (
    <ProtectedRoute>
      <Stack>
        <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />

        <Stack.Screen name="clients" options={{ title: "Clients" }} />

        <Stack.Screen name="clients/[id]" options={{ title: "Client Detail" }} />

        <Stack.Screen name="appointments/index" options={{ title: "Appointments" }} />
      </Stack>
    </ProtectedRoute>
  );
}
