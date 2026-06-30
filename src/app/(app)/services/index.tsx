import { router } from "expo-router";
import { FlatList, Pressable, Text } from "react-native";

import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { useServices } from "@/hooks/useServices";

export default function ServicesScreen() {
  const { services, error, isLoading } = useServices();

  if (error) {
    return <ErrorState message={error} />;
  }

  if (isLoading) {
    return <LoadingState message="Loading services..." />;
  }

  if (services.length === 0) {
    return <EmptyState message="No services found." />;
  }

  return (
    <FlatList
      data={services}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ padding: 24 }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => router.push(`/services/${item.id}`)}
          accessibilityRole="button"
          accessibilityLabel={`Open service ${item.title}`}
          style={{ padding: 16, borderBottomWidth: 1 }}
        >
          <Text style={{ fontSize: 18 }}>{item.title}</Text>
          <Text>
            ${item.price} — {item.duration_minutes} min
          </Text>
        </Pressable>
      )}
    />
  );
}