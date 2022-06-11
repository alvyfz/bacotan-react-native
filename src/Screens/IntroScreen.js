import { View, Text, StatusBar, Image, TouchableOpacity } from "react-native";
import { colors } from "../Utils/Colors";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

function IntroScreen() {
  const navigation = useNavigation();
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("id");
      if (value !== null) {
        navigation.replace("HomeScreen");
      }
    } catch (error) {
      ToastAndroid.showWithGravity(
        "Something Wrong!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }
  };
  useEffect(() => {
    retrieveData();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.bg,
      }}
    >
      <StatusBar backgroundColor={colors.bg} barStyle="light-content" />

      <View style={{ alignItems: "center", height: "50%" }}>
        <Image
          style={{ marginBottom: 20 }}
          source={require("../../assets/bacotan-logo.png")}
        />
        <Text
          style={{
            fontSize: 24,
            textAlign: "center",
            color: colors.text,
          }}
        >
          Ayo bergabung dengan temanmu dan bacotin semua bacotanmu di percakapan
          grup.
        </Text>
        <TouchableOpacity
          style={{
            marginTop: 20,
            backgroundColor: colors.primary,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate("AuthScreen")}
        >
          <Text
            style={{ fontSize: 20, textAlign: "center", color: colors.text }}
          >
            Masuk/Daftar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default IntroScreen;
