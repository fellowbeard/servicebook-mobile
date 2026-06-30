import { router } from "expo-router";
import { FlatList, Pressable, Text } from "react-native";

import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { useResources } from "@/hooks/useResources";

export default function ResourcesScreen() {
  const { resources, error, isLoading } = useResources();

  if (error) {
    return <ErrorState message={error} />;
  }

  if (isLoading) {
    return <LoadingState message="Loading resources..." />;
  }

  if (resources.length === 0) {
    return <EmptyState message="No resources found." />;
  }

  return (
    <FlatList
      data={resources}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ padding: 24 }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => router.push(`/resources/${item.id}`)}
          accessibilityRole="button"
          accessibilityLabel={`Open resource ${item.name}`}
          style={{ padding: 16, borderBottomWidth: 1 }}
        >
          <Text style={{ fontSize: 18 }}>{item.name}</Text>
        </Pressable>
      )}
    />
  );
}