import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { useClient } from "../../hooks/useClient";

export default function ClientDetailScreen() {
  const { id } = useLocalSearchParams();
  const { client, error } = useClient(id);

  if (error) {
    return (
      <View style={{ padding: 24 }}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!client) {
    return (
      <View style={{ padding: 24 }}>
        <Text>Loading client...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 28 }}>
        {client.first_name} {client.last_name}
      </Text>

      <Text>{client.email || "No email"}</Text>
      <Text>{client.phone || "No phone"}</Text>

      <Text style={{ fontSize: 20, marginTop: 20 }}>Notes</Text>

      {client.notes.length === 0 ? (
        <Text>No notes yet.</Text>
      ) : (
        client.notes.map((note) => (
          <Text key={note.id}>{note.body}</Text>
        ))
      )}
    </ScrollView>
  );
}