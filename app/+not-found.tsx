import { Link, Stack } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <SafeAreaView>
        <Text type="title">This screen doesn't exist.</Text>
        <Link href={"/"}>
          <Text>Go to home screen!</Text>
        </Link>
      </SafeAreaView>
    </>
  );
}
