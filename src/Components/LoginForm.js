import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { colors } from "../Utils/Colors";
import { useLazyQuery } from "@apollo/client";
import { QUERY_LOGIN } from "../Utils/QueryGQL";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginForm() {
  const navigation = useNavigation();
  const [doLogin, { data: dataLogin, loading: loading }] =
    useLazyQuery(QUERY_LOGIN);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let validation = username == "" || password.length == "";

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("id", dataLogin?.users[0].id);
    } catch (error) {
      ToastAndroid.showWithGravity(
        "Something Wrong!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }
  };

  useEffect(() => {
    if (dataLogin?.users.length > 0) {
      storeData();
      ToastAndroid.showWithGravity(
        "Login Success!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      navigation.navigate("HomeScreen");
    }
    if (dataLogin?.users.length === 0) {
      ToastAndroid.showWithGravity(
        "Username or Password Wrong!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }
  }, [dataLogin]);

  const handleLogin = () => {
    if (!validation) {
      doLogin({
        variables: {
          username: username.toLowerCase(),
          password: password,
        },
      });
      setPassword("");
    }
  };
  return (
    <View style={{}}>
      <View>
        <Text style={{ color: colors.text }}>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Your username"
          placeholderTextColor="#BDBDBD"
        />
      </View>
      <View>
        <Text style={{ color: colors.text }}>Password</Text>

        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Your password"
          placeholderTextColor="#BDBDBD"
          secureTextEntry={true}
        />
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
          onPress={handleLogin}
          disabled={validation || loading}
        >
          <Text
            style={{ color: colors.text, textAlign: "center", fontSize: 18 }}
          >
            {loading ? "Loading..." : "Masuk"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 12.5,
    borderWidth: 1,
    padding: 10,
    color: colors.text,
    borderColor: colors.primary,
    borderRadius: 5,
  },
});

export default LoginForm;
