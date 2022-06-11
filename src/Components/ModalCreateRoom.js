import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import { colors } from "../Utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation } from "@apollo/client";
import { QUERY_JOIN_ROOM, QUERY_CREATE_ROOM } from "./../Utils/QueryGQL";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ModalCreateRoom = ({ state, setState, setStateSuccess, setCodeRoom }) => {
  const [joinRoom, { data: dataJoin, loading: loadingJoin, error: errorJoin }] =
    useMutation(QUERY_JOIN_ROOM, {
      onError(error) {},
    });

  const [
    createRoom,
    { data: dataCreate, loading: loadingCreate, error: errorCreate },
  ] = useMutation(QUERY_CREATE_ROOM, {
    onError(error) {},
  });

  const [roomName, setRoomName] = useState("");
  const [roomDesc, setRoomDesc] = useState("");

  const [idUser, setIdUser] = useState("");

  const validation = roomName == "" || roomDesc == "";

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(dataCreate.insert_room_one.id);
    ToastAndroid.showWithGravity(
      "Code room telah di salin ke clipboard!",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
  };
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("id");
      if (value !== null) {
        setIdUser(value);
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
    if (errorCreate) {
      ToastAndroid.showWithGravity(
        "Something wrong!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }
    setState(false);
  }, [errorCreate]);

  useEffect(() => {
    if (dataCreate !== undefined) {
      joinRoom({
        variables: {
          room_id: dataCreate.insert_room_one.id,
          user_id: idUser,
        },
      });
      setCodeRoom(dataCreate.insert_room_one.id);
    }
  }, [dataCreate]);

  useEffect(() => {
    if (errorJoin) {
      ToastAndroid.showWithGravity(
        "Something wrong!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      setState(false);
    }
  }, [errorJoin]);

  useEffect(() => {
    if (dataJoin !== undefined) {
      setState(false);
      setStateSuccess(true);
      copyToClipboard();
    }
  }, [dataJoin]);

  const handleCreateRoom = () => {
    createRoom({
      variables: {
        name: roomName,
        description: roomDesc,
      },
    });
    retrieveData();
    setRoomName("");
    setRoomDesc("");
  };
  return (
    <Modal isVisible={state}>
      <View
        style={{
          height: 325,
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
              Buat room untuk memulai bacotanmu dan share kode agar temanmu bisa
              join ke room kamu!
            </Text>
            <View>
              <Text style={{ color: colors.text }}>Nama room</Text>

              <TextInput
                style={styles.input}
                onChangeText={setRoomName}
                value={roomName}
                placeholder="Nama room ketik disini"
                placeholderTextColor="#BDBDBD"
              />
            </View>
            <View>
              <Text style={{ color: colors.text }}>Deskripsi room</Text>

              <TextInput
                style={styles.input}
                onChangeText={setRoomDesc}
                value={roomDesc}
                placeholder="Deskripsi room ketik disini"
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
                onPress={handleCreateRoom}
                disabled={validation || loadingCreate || loadingJoin}
              >
                <Text
                  style={{
                    color: colors.text,
                  }}
                >
                  {loadingCreate || loadingJoin ? "Loading..." : "Buat"}
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
export default ModalCreateRoom;
