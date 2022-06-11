import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";
import { useState } from "react";
import { colors } from "../Utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Alert from "./Alert";

import { useNavigation } from "@react-navigation/native";
const HeaderComponent = ({ title }) => {
  const naviagtion = useNavigation();
  const [alert, setAlert] = useState(false);
  const deleteStorage = async () => {
    try {
      await AsyncStorage.removeItem("id");
      naviagtion.replace("AuthScreen");
    } catch (e) {
      ToastAndroid.showWithGravity(
        "Something Wrong!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }
  };
  const handleLogout = () => {
    deleteStorage();
  };
  return (
    <View
      style={{
        height: 55,
        justifyContent: "space-between",
        backgroundColor: colors.bg,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        elevation: 5,
      }}
    >
      <Alert
        title={"Apakah kamu yakin ingin logout?"}
        state={alert}
        setState={setAlert}
        handle={handleLogout}
      />
      <Text style={{ color: colors.text, fontSize: 24, fontWeight: "bold" }}>
        {title}
      </Text>

      <TouchableOpacity onPress={() => setAlert(true)}>
        <Ionicons name="log-out-outline" size={32} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({});
