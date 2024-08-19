import CustomButton from '@/components/CustomButton';
import InputField from "@/components/InputField";
import OAuth from '@/components/OAuth';
import { icons, images } from "@/constants";
import { Link } from 'expo-router';
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = async () => {
    console.log(form);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative h-[250px] w-full">
          <Image source={images.signUpCar} className="z-0 h-[250px] w-full" />
          <Text className="absolute bottom-5 left-5 font-JakartaSemiBold text-2xl text-black">Create Your Account</Text>
        </View>

        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton title='Sign Up' className='mt-6' onPress={onSignUpPress} />

          <OAuth />

          <Link href={"/sign-in"} className='mt-10 text-center text-lg text-general-200'>
            <Text>Already have an account? </Text>
            <Text className='text-primary-500'>Log In</Text>
          </Link>
        </View>


      </View>
    </ScrollView>
  );
};

export default SignUp;
