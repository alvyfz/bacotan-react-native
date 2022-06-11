import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import { colors } from "../Utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation } from "@apollo/client";
import { QUERY_JOIN_ROOM } from "./../Utils/QueryGQL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ModalJoinRoom = ({ state, setState }) => {
  const navigation = useNavigation();
  const [joinRoom, { data: dataJoin, loading: loadingJoin, error: errorJoin }] =
    useMutation(QUERY_JOIN_ROOM, {
      onError(error) {},
    });
  const [code, setCode] = useState("");
  const validation = code == "";

  useEffect(() => {
    if (errorJoin) {
      ToastAndroid.showWithGravity(
        "Kode yang kamu masukan salah atau kamu sudah masuk room ini!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }
  }, [errorJoin]);
  useEffect(() => {
    if (dataJoin !== undefined) {
      ToastAndroid.showWithGravity(
        "Join sukses! Kamu bisa mulai bacotan dengan temanmu di chat!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      setCode("");
      setState(false);
      navigation.navigate("Chat");
    }
  }, [dataJoin]);
  const handleJoinRoom = async () => {
    try {
      const value = await AsyncStorage.getItem("id");
      if (value !== null) {
        joinRoom({
          variables: {
            room_id: code,
            user_id: value,
          },
        });
      }
    } catch (error) {
      ToastAndroid.showWithGravity(
        "Something Wrong!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }
  };
  return (
    <Modal isVisible={state}>
      <View
        style={{
          height: 240,
          backgroundColor: colors.secondary,
          borderRadius: 10,
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <View>
            <TouchableOpacity
              style={{ alignItems: "flex-end", padding: 5 }}
              onPress={() => setState(false)}
            >
              <Ionicons
                name="ios-close-outline"
                size={30}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <Text
              style={{ fontSize: 18, textAlign: "center", color: colors.text }}
            >
              Masukan kode room yang didapatkan dari teman kamu!
            </Text>
            <View>
              <Text style={{ color: colors.text }}>Kode</Text>
              <TextInput
                style={styles.input}
                onChangeText={setCode}
                value={code}
                placeholder="Tempel kode room disini"
                placeholderTextColor="#BDBDBD"
              />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  width: 330,
                  paddingVertical: 10,
                  backgroundColor: colors.primary,
                  borderRadius: 5,
                  alignItems: "center",
                }}
                onPress={handleJoinRoom}
                disabled={validation || loadingJoin}
              >
                <Text
                  style={{
                    color: colors.text,
                  }}
                >
                  {loadingJoin ? "Loading..." : "Buat"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
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
export default ModalJoinRoom;
