import { View, Text } from "react-native";
import React from "react";
import moment from "moment";
import { colors } from "../Utils/Colors";
const MessageBubble = ({ id, userId, message, time, username }) => {
  return (
    <>
      {id === userId ? (
        <>
          {/* chat from me */}
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <View
              style={{
                backgroundColor: colors.bg,
                padding: 10,
                borderRadius: 10,
                maxWidth: "80%",
                minWidth: "20%",
                marginVertical: 2,
                marginHorizontal: 5,
              }}
            >
              <Text style={{ color: colors.text }}>{message} &nbsp;</Text>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 10,
                  textAlign: "right",
                }}
              >
                {moment(time).startOf("minute").fromNow()}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <>
          {/* from another user */}
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <View
              style={{
                backgroundColor: colors.secondary,
                padding: 10,
                borderRadius: 10,
                maxWidth: "80%",
                minWidth: "20%",
                marginVertical: 2,
                marginHorizontal: 5,
              }}
            >
              <Text style={{ color: colors.text, fontSize: 11 }}>
                from &nbsp;
                <Text style={{ fontWeight: "bold" }}>{username}</Text>
              </Text>
              <Text style={{ color: colors.text }}>{message}</Text>
              <Text style={{ color: colors.text, fontSize: 10 }}>
                {moment(time).startOf("minute").fromNow()}
              </Text>
            </View>
          </View>
          <></>
        </>
      )}
    </>
  );
};

export default MessageBubble;
