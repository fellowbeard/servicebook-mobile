import { Stack } from "expo-router";

import { AuthProvider } from "../auth/AuthProvider";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "ServiceBook Login" }}
        />

        <Stack.Screen
          name="dashboard"
          options={{ title: "Dashboard" }}
        />

        <Stack.Screen
          name="clients"
          options={{ title: "Clients" }}
        />

        <Stack.Screen
          name="clients/[id]"
          options={{ title: "Client Detail" }}
        />
      </Stack>
    </AuthProvider>
  );
}