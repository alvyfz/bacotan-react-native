import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useMutation } from "@apollo/client";
import { colors } from "../Utils/Colors";
import { QUERY_SIGNUP } from "../Utils/QueryGQL";

function RegisterForm() {
  const [SignupInsert, { data, loading, error }] = useMutation(QUERY_SIGNUP, {
    onError(error) {},
  });

  const [username, setUsername] = useState({
    value: "",
    isValid: false,
  });
  const [password, setPassword] = useState({
    value: "",
    isValid: false,
  });

  useEffect(() => {
    if (error) {
      ToastAndroid.showWithGravity(
        "Username telah digunakan, tolong gunakan username lain!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }
  }, [error]);

  useEffect(() => {
    if (data !== undefined) {
      setUsername({
        ...username,
        value: "",
        isValid: true,
      });
      setPassword({
        ...password,
        value: "",
        isValid: false,
      });
      ToastAndroid.showWithGravity(
        "Daftar sukses, sekarang anda bisa login!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }
  }, [data]);

  const validation = username.isValid && password.isValid;
  const RegexUsername = /^[a-z0-9_.]{5,15}$/;
  const RegexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,15}$/;

  const handleRegister = () => {
    SignupInsert({
      variables: {
        object: {
          username: username.value,
          password: password.value,
        },
      },
    });
  };

  const onChangeUsername = (text) => {
    if (!RegexUsername.test(text)) {
      setUsername({
        ...username,
        value: text,
        isValid: false,
      });
    } else {
      setUsername({
        ...username,
        value: text,
        isValid: true,
      });
    }
  };
  const onChangePassword = (text) => {
    if (!RegexPassword.test(text)) {
      setPassword({
        ...password,
        value: text,
        isValid: false,
      });
    } else {
      setPassword({
        ...password,
        value: text,
        isValid: true,
      });
    }
  };
  return (
    <View style={{}}>
      <View>
        <Text style={{ color: colors.text }}>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeUsername}
          value={username.value}
          placeholder="Your username"
          placeholderTextColor="#BDBDBD"
          textContentType="username"
        />
        <Text
          style={{
            color: !username.isValid ? colors.tertiary : "transparent",
            fontSize: 9,
          }}
        >
          Username tidak valid
        </Text>
      </View>
      <View>
        <Text style={{ color: colors.text }}>Password</Text>

        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password.value}
          placeholder="Your password"
          placeholderTextColor="#BDBDBD"
          secureTextEntry={true}
        />
        <Text
          style={{
            color: !password.isValid ? colors.tertiary : "transparent",
            fontSize: 9,
          }}
        >
          Password harus memiliki panjang 8-15, huruf besar, huruf kecil dan
          angka
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            height: 40,
            width: "100%",
            borderRadius: 10,
            marginTop: 20,
            justifyContent: "center",
          }}
          onPress={handleRegister}
          disabled={loading || !validation}
        >
          <Text
            style={{ color: colors.text, textAlign: "center", fontSize: 18 }}
          >
            {loading ? "Loading..." : "Daftar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,

    borderWidth: 1,
    padding: 10,
    color: colors.text,
    borderColor: colors.primary,
    borderRadius: 5,
  },
});

export default RegisterForm;
