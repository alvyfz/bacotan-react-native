import {
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import HeaderComponent from "../Components/HeaderComponent";
import { useSubscription } from "@apollo/client";
import { colors } from "../Utils/Colors";
import { QUERY_SUBCRIPTION_ROOM } from "../Utils/QueryGQL";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChatScreen({ navigation }) {
  const [id, setId] = useState("");
  const getId = async () => {
    try {
      const value = await AsyncStorage.getItem("id");
      if (value !== null) {
        setId(value);
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
    getId();
  }, []);
  const { data, loading } = useSubscription(QUERY_SUBCRIPTION_ROOM, {
    variables: { user_id: id },
  });

  const dataList = data?.room_users;
  const tipString = (tip, length) => {
    if (tip.length > length) {
      return tip.substring(0, length) + "...";
    } else {
      return tip;
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: colors.secondary,
          marginVertical: 5,
          borderRadius: 5,
          marginHorizontal: 15,
          paddingVertical: 5,
          paddingHorizontal: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onPress={() => {
          navigation.navigate("ChatRoomScreen", {
            roomId: item.room.id,
          });
        }}
      >
        <View>
          <Text
            style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}
          >
            {tipString(item.room.name, 25)}
          </Text>
          <Text style={{ color: colors.text, fontSize: 16 }}>
            {item.room.description !== null
              ? tipString(item.room.description, 25)
              : "*No Description"}
          </Text>
        </View>
        <Ionicons
          name="chevron-forward-outline"
          size={24}
          color={colors.text}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <HeaderComponent title={"Chat"} />
      <View
        style={{
          flex: 1,
        }}
      >
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: colors.text, fontSize: 24 }}>Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={dataList}
            renderItem={renderItem}
            keyExtractor={(item) => item.room.id}
          />
        )}
      </View>
    </View>
  );
}
