import { router } from "expo-router";
import { FlatList, Pressable, Text } from "react-native";

import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { useAppointments } from "@/hooks/useAppointments";

export default function AppointmentsScreen() {
  const { appointments, error, isLoading } = useAppointments();

  if (error) {
    return <ErrorState message={error} />;
  }

  if (isLoading) {
    return <LoadingState message="Finding appointments..." />;
  }

  if (appointments.length === 0) {
    return <LoadingState message="No appointments found." />;
  }

  return (
    <FlatList
      data={appointments}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ padding: 24 }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => router.push(`/appointments/${item.id}`)}
          accessibilityRole="button"
          accessibilityLabel={`Open appointment ${item.id}`}
          style={{ padding: 16, borderBottomWidth: 1 }}
        >
          <Text style={{ fontSize: 18 }}>
            {item.client ? `${item.client.first_name} ${item.client.last_name}` : "No client"}
          </Text>

          <Text>{item.scheduled_at}</Text>
          <Text>{item.status}</Text>
        </Pressable>
      )}
    />
  );
}
