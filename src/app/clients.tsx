import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { router } from "expo-router";

import { apiFetch } from "../api/client";

export default function ClientsScreen() {
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    apiFetch("/api/v1/dashboard")
      .then((data) => setClients(data.clients || []))
      .catch(console.error);
  }, []);

  return (
    <FlatList
      data={clients}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => router.push(`/clients/${item.id}`)}
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