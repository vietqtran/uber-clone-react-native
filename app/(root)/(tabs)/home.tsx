import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { Link } from "expo-router";
import RideCar from "@/components/RideCar";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import { useEffect, useState } from "react";
import { useLocationStore } from "@/store";

const recetntRides = [
  {
    ride_id: "1",
    origin_address: "Kathmandu, Nepal",
    destination_address: "Pokhara, Nepal",
    origin_latitude: "27.717245",
    origin_longitude: "85.323961",
    destination_latitude: "28.209583",
    destination_longitude: "83.985567",
    ride_time: 391,
    fare_price: "19500.00",
    payment_status: "paid",
    driver_id: 2,
    user_id: "1",
    created_at: "2024-08-12 05:19:20.620007",
    driver: {
      driver_id: "2",
      first_name: "David",
      last_name: "Brown",
      profile_image_url: "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
      car_image_url: "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
      car_seats: 5,
      rating: "4.60",
    },
  },
  {
    ride_id: "2",
    origin_address: "Jalkot, MH",
    destination_address: "Pune, Maharashtra, India",
    origin_latitude: "18.609116",
    origin_longitude: "77.165873",
    destination_latitude: "18.520430",
    destination_longitude: "73.856744",
    ride_time: 491,
    fare_price: "24500.00",
    payment_status: "paid",
    driver_id: 1,
    user_id: "1",
    created_at: "2024-08-12 06:12:17.683046",
    driver: {
      driver_id: "1",
      first_name: "James",
      last_name: "Wilson",
      profile_image_url: "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
      car_image_url: "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
      car_seats: 4,
      rating: "4.80",
    },
  },
  {
    ride_id: "3",
    origin_address: "Zagreb, Croatia",
    destination_address: "Rijeka, Croatia",
    origin_latitude: "45.815011",
    origin_longitude: "15.981919",
    destination_latitude: "45.327063",
    destination_longitude: "14.442176",
    ride_time: 124,
    fare_price: "6200.00",
    payment_status: "paid",
    driver_id: 1,
    user_id: "1",
    created_at: "2024-08-12 08:49:01.809053",
    driver: {
      driver_id: "1",
      first_name: "James",
      last_name: "Wilson",
      profile_image_url: "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
      car_image_url: "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
      car_seats: 4,
      rating: "4.80",
    },
  },
  {
    ride_id: "4",
    origin_address: "Okayama, Japan",
    destination_address: "Osaka, Japan",
    origin_latitude: "34.655531",
    origin_longitude: "133.919795",
    destination_latitude: "34.693725",
    destination_longitude: "135.502254",
    ride_time: 159,
    fare_price: "7900.00",
    payment_status: "paid",
    driver_id: 3,
    user_id: "1",
    created_at: "2024-08-12 18:43:54.297838",
    driver: {
      driver_id: "3",
      first_name: "Michael",
      last_name: "Johnson",
      profile_image_url: "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
      car_image_url: "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
      car_seats: 4,
      rating: "4.70",
    },
  },
];

export default function Page() {
  const { setDestinationLocation, setUserLocation } = useLocationStore();
  const { user } = useUser();
  const loading = false;
  const [hasPermissions, setHasPermissions] = useState(false);

  useEffect(() => {
    const requestLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        setHasPermissions(true);
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setUserLocation({
        // latitude: location.coords.latitude,
        // longitude: location.coords.longitude,
        latitude: 37.78825,
        longitude: -122.4324,
        address: `${address[0].name}, ${address[0].region}`,
      });
    };

    requestLocation();
  }, []);

  const handleSignOut = () => {
    if (user) {
      // signOut();
    }
  };

  const handleDestinationPress = () => {};

  return (
    <SafeAreaView>
      <FlatList
        data={recetntRides.slice(0, 5)}
        renderItem={({ item }) => <RideCar key={item.ride_id} ride={item} />}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading && (
              <>
                <Image source={images.noResult} className="h-40 w-40" resizeMode="contain" />
                <Text>No recent rides found!</Text>
              </>
            )}
            {loading && <ActivityIndicator size={"small"} color={"#000"} />}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="my-5 flex flex-row items-center justify-between">
              <Text className="font-JakartaExtraBold text-2xl capitalize">
                Welcome {user?.firstName || user?.emailAddresses[0].emailAddress.split("@")[0]} 👋
              </Text>
              <TouchableOpacity
                className="h-10 w-10 items-center justify-center rounded-full bg-white"
                onPress={handleSignOut}
              >
                <Image source={icons.out} className="h-4 w-4" />
              </TouchableOpacity>
            </View>
            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />
            <>
              <Text className="mb-3 mt-5 font-JakartaBold text-xl">Your Current Location</Text>
              <View className="flex h-[300px] flex-row items-center bg-transparent">
                <Map />
              </View>
            </>
            <Text className="mb-3 mt-5 font-JakartaBold text-xl">Recent Rides</Text>
          </>
        )}
      ></FlatList>
    </SafeAreaView>
  );
}
