import { View, Text, ToastAndroid, FlatList } from "react-native";
import { useSubscription } from "@apollo/client";
import { QUERY_SUBCRIPTION_CHAT } from "../Utils/QueryGQL";
import { colors } from "../Utils/Colors";
import MessageBubble from "./MessageBubble";

const MessageComponent = ({ id, userId, messagesEndRef }) => {
  const { data: dataMessage, loading } = useSubscription(
    QUERY_SUBCRIPTION_CHAT,
    {
      variables: { room_id: id },
    }
  );
  const data = dataMessage?.chats;

  const renderItem = ({ item }) => {
    return (
      <MessageBubble
        id={userId}
        userId={item.user_id}
        time={item.created_at}
        message={item.message}
        username={item.user.username}
      />
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <View>
        {loading ? (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Loading...
              </Text>
            </View>
          </>
        ) : (
          <>
            <View>
              <FlatList
                ref={messagesEndRef}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default MessageComponent;
