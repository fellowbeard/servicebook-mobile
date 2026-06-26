import { router } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

import { useClients } from "../hooks/useClients";

export default function ClientsScreen() {
  const { clients, error } = useClients();

  if (error) {
    return (
      <View style={{ padding: 24 }}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (clients.length === 0) {
    return (
      <View style={{ padding: 24 }}>
        <Text>No clients yet.</Text>
      </View>
    );
  }

  return (
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
  );
}