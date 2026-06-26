import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";

import { apiFetch } from "../../api/client";

export default function ClientDetailScreen() {
  const { id } = useLocalSearchParams();
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    apiFetch(`/api/v1/clients/${id}`)
      .then(setClient)
      .catch(console.error);
  }, [id]);

  if (!client) {
    return <Text>Loading client...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 24 }}>
      <Text style={{ fontSize: 28 }}>
        {client.first_name} {client.last_name}
      </Text>

      <Text>{client.email}</Text>
      <Text>{client.phone}</Text>

      <Text style={{ fontSize: 20, marginTop: 20 }}>Notes</Text>

      {client.notes?.map((note: any) => (
        <Text key={note.id}>{note.body}</Text>
      ))}
    </ScrollView>
  );
}