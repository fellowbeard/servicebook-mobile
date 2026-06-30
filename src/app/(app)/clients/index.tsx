import { router } from "expo-router";
import { FlatList, Pressable, Text } from "react-native";

import { useClients } from "@/hooks/useClients";

import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { ProtectedRoute } from "@/auth/ProtectedRoute";

export default function ClientsScreen() {
  const { clients, error } = useClients();

  if (error) {
    return <ErrorState message={error} />;
  }

  if (clients.length === 0) {
    return <LoadingState message="No clients yet." />;
  }

  return (
    <ProtectedRoute>
    <FlatList
      data={clients}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ padding: 24 }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => router.push(`/clients/${item.id}`)}
          accessibilityRole="button"
          accessibilityLabel={`Open client ${item.first_name} ${item.last_name}`}
          style={{
            padding: 16,
            borderBottomWidth: 1,
          }}
        >
          <Text>
            {item.first_name} {item.last_name}
          </Text>
        </Pressable>
      )}
      />
      </ProtectedRoute>
  );
}