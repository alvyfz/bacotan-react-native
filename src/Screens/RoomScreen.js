import { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  Image,
} from "react-native";
import HeaderComponent from "../Components/HeaderComponent";
import ModalCreateRoom from "../Components/ModalCreateRoom";
import * as Clipboard from "expo-clipboard";
import AlertSuccessCreate from "./../Components/AlertSuccessCreate";

import { colors } from "../Utils/Colors";
import ModalJoinRoom from "../Components/ModalJoinRoom";

export default function RoomScreen() {
  const [modalCreate, setModalCreate] = useState(false);
  const [modalCreateSuccess, setModalCreateSuccess] = useState(false);
  const [codeRoom, setCodeRoom] = useState("");
  const [modalJoin, setModalJoin] = useState(false);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(codeRoom);
    ToastAndroid.showWithGravity(
      "Code room telah di salin ke clipboard!",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ModalCreateRoom
        state={modalCreate}
        setState={setModalCreate}
        stateSuccess={modalCreateSuccess}
        setStateSuccess={setModalCreateSuccess}
        codeRoom={codeRoom}
        setCodeRoom={setCodeRoom}
      />
      <AlertSuccessCreate
        state={modalCreateSuccess}
        setState={setModalCreateSuccess}
        code={codeRoom}
        handle={copyToClipboard}
      />
      <ModalJoinRoom state={modalJoin} setState={setModalJoin} />
      <HeaderComponent title="Room" />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Image source={require("../../assets/bacotan-logo.png")} />
          <Text
            style={{
              fontWeight: "bold",
              fontStyle: "italic",
              color: colors.text,
              marginBottom: 50,
            }}
          >
            bacotin semua dengan temanmu
          </Text>
          <Text
            style={{
              color: colors.text,
              fontSize: 24,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Join room yang telah dibuatkan temanmu!
          </Text>
          <TouchableOpacity
            style={{
              paddingHorizontal: 130,
              paddingVertical: 10,
              backgroundColor: colors.primary,
              borderRadius: 5,
            }}
            onPress={() => setModalJoin(true)}
          >
            <Text style={{ color: colors.text, fontSize: 18 }}>Join room</Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Text
            style={{
              color: colors.text,

              fontSize: 24,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Ingin membuat room untuk bacotanmu?
          </Text>
          <TouchableOpacity
            style={{
              paddingHorizontal: 130,
              paddingVertical: 10,
              backgroundColor: colors.primary,
              borderRadius: 5,
            }}
            onPress={() => setModalCreate(true)}
          >
            <Text style={{ color: colors.text, fontSize: 18 }}>Buat room</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
