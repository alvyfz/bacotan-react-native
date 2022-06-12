import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../Utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useNavigation } from "@react-navigation/native";

const HeaderChatRoom = ({ stateModal, setStateModal, data }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: 55,
        justifyContent: "space-between",
        backgroundColor: colors.bg,
        paddingHorizontal: 5,
        flexDirection: "row",
        alignItems: "center",
        elevation: 5,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Ionicons name="chevron-back-outline" size={32} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setStateModal(true)}
          disabled={data?.name ? false : true}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            {data?.name ? data.name : "Loading..."}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderChatRoom;
