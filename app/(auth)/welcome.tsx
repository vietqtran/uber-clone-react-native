import CustomButton from "@/components/CustomButton";
import { welcome } from "@/constants";
import { Href, router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === welcome.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up" as Href);
        }}
        className="flex w-full items-end justify-end p-5"
      >
        <Text className="text-md font-JakartaBold text-black">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="mx-1 h-1 w-8 rounded-full bg-[#e2e8f0]" />}
        activeDot={<View className="mx-1 h-1 w-8 rounded-full bg-[#0286ff]" />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {welcome.map((item, index) => (
          <View key={index} className="flex items-center justify-center p-5">
            <Image source={item.image} className="h-[300px] w-full" resizeMode="contain" />
            <View className="mt-10 flex w-full flex-row items-center justify-center">
              <Text className="mx-10 text-center text-3xl font-bold text-black">{item.title}</Text>
            </View>
            <Text className="text-md mx-10 mt-3 text-center font-JakartaSemiBold text-lg text-[#858585]">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        bgVariant="primary"
        className="mt-10 w-11/12"
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() => (isLastSlide ? router.replace("/(auth)/sign-up" as Href) : swiperRef.current?.scrollBy(1, true))}
      />
    </SafeAreaView>
  );
};

export default Welcome;
