import { useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";
import { colors } from "../Utils/Colors";

function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.bg,
      }}
    >
      <Image source={require("../../assets/bacotan-logo.png")} />
      <Text
        style={{
          fontWeight: "bold",
          fontStyle: "italic",
          color: colors.text,
          marginBottom: 30,
        }}
      >
        bacotin semua dengan temanmu
      </Text>
      <View
        style={{
          backgroundColor: colors.secondary,
          height: 300,
          width: "90%",
          borderRadius: 10,
        }}
      >
        <View style={{ flexDirection: "row", margin: 10 }}>
          <TouchableOpacity style={{ flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                color: isLogin ? colors.text : colors.primary,
                borderBottomWidth: 2,
                borderColor: isLogin ? colors.text : "transparent",
                marginHorizontal: 20,
              }}
              onPress={() => setIsLogin(true)}
            >
              Masuk
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setIsLogin(false)}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                color: isLogin ? colors.primary : colors.text,
                borderBottomWidth: 2,
                borderColor: isLogin ? "transparent" : colors.text,
                marginHorizontal: 20,
              }}
            >
              Daftar
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20, marginHorizontal: 20 }}>
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </View>
      </View>
    </View>
  );
}

export default AuthScreen;
