import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Text, View } from "react-native";

import { Link } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Page() {
  const { user } = useUser();

  return (
    <SafeAreaView>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Text>Sign In</Text>
        </Link>
        <Link href="/sign-up">
          <Text>Sign Up</Text>
        </Link>
      </SignedOut>
    </SafeAreaView>
  );
}
