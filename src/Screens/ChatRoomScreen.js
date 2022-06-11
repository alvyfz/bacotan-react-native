import { View, Text } from "react-native";

import { colors } from "../Utils/Colors";

const ChatRoomScreen = ({ route }) => {
  const { roomId } = route.params;
  return (
    <View>
      <Text style={{ color: colors.bg }}>{roomId}</Text>
    </View>
  );
};

export default ChatRoomScreen;
