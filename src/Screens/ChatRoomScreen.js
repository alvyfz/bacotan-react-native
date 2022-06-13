import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ToastAndroid,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from "react-native";
import HeaderChatRoom from "../Components/HeaderChatRoom";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { colors } from "../Utils/Colors";
import {
  QUERY_ROOM_BY_ID,
  QUERY_SEND_CHAT,
  QUERY_UPDATE_ROOM,
  QUERY_SUBCRIPTION_CHAT,
} from "../Utils/QueryGQL";
import ModalDetailRoom from "../Components/ModalDetailRoom";
import MessageBubble from "../Components/MessageBubble";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";

const ChatRoomScreen = ({ route }) => {
  const { roomId } = route.params;
  const [modalDetail, setModalDetail] = useState(false);
  const [detailRoom, setDetailRoom] = useState({
    id: roomId,
    name: "",
    description: "",
    onEdit: false,
  });
  const [message, setMessage] = useState("");
  const [detailUpdate, setDetailUpdate] = useState({
    id: roomId,
    name: "",
    description: "",
  });
  const [userId, setUserId] = useState("");
  const messagesEndRef = useRef(null);
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("id");
      if (value !== null) {
        setUserId(value);
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
    retrieveData();
  }, []);
  // console.log(messagesEndRef.current);

  const { data, error } = useQuery(QUERY_ROOM_BY_ID, {
    variables: { id: roomId },
  });
  const [sendMessage, { error: errorMessage }] = useMutation(QUERY_SEND_CHAT, {
    onError(error) {
      console.log(error);
    },
  });
  const [updateRoom, { data: dataUpdate, error: errorUpdate }] = useMutation(
    QUERY_UPDATE_ROOM,
    {
      onError(error) {
        console.log(error);
      },
    }
  );
  const { data: dataMessage, loading } = useSubscription(
    QUERY_SUBCRIPTION_CHAT,
    {
      variables: { room_id: roomId },
    }
  );
  const dataRoom = data?.room_by_pk;

  useEffect(() => {
    setDetailRoom({
      ...detailRoom,
      name: dataRoom?.name,
      description: dataRoom?.description || "Tidak ada deskripsi",
      id: dataRoom?.id,
    });
    setDetailUpdate({
      name: dataRoom?.name,
      description: dataRoom?.description || "Tidak ada deskripsi",
      id: dataRoom?.id,
    });
  }, [dataRoom]);

  useEffect(() => {
    setDetailRoom({
      ...detailRoom,
      name: dataUpdate?.update_room_by_pk.name,
      description:
        dataUpdate?.update_room_by_pk.description || "Tidak ada deskripsi",
      id: dataUpdate?.update_room_by_pk.id,
      onEdit: false,
    });
    setDetailUpdate({
      name: dataUpdate?.update_room_by_pk.name,
      description:
        dataUpdate?.update_room_by_pk.description || "Tidak ada deskripsi",
      id: dataUpdate?.update_room_by_pk.id,
    });
  }, [dataUpdate]);

  useEffect(() => {
    if (error || errorMessage || errorUpdate) {
      ToastAndroid.showWithGravity(
        "Something Wrong!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }
  }, [error, errorMessage, errorUpdate]);

  const HandleSendMessage = () => {
    sendMessage({
      variables: {
        room_id: roomId,
        message: message,
        user_id: userId,
      },
    });
    setMessage("");
  };

  const HandleUpdateRoom = () => {
    updateRoom({
      variables: {
        id: roomId,
        name: detailUpdate.name,
        description: detailUpdate.description,
      },
    });
  };

  const dataMessages = dataMessage?.chats;

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
    <ImageBackground
      style={{ flex: 1 }}
      source={{
        uri: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      }}
      resizeMode="cover"
    >
      <ModalDetailRoom
        state={modalDetail}
        setState={setModalDetail}
        data={detailRoom}
        dataUpdate={detailUpdate}
        setDataUpdate={setDetailUpdate}
        setData={setDetailRoom}
        handleUpdate={HandleUpdateRoom}
      />
      <HeaderChatRoom
        stateModal={modalDetail}
        setStateModal={setModalDetail}
        data={detailRoom}
      />
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
                  onContentSizeChange={() => {
                    messagesEndRef.current.scrollToEnd();
                  }}
                  ref={messagesEndRef}
                  data={dataMessages}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                />
              </View>
            </>
          )}
        </View>
      </View>

      <View
        style={{
          height: 60,
          backgroundColor: colors.bg,
          elevation: 5,
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          style={{
            color: colors.text,
            paddingHorizontal: 10,
            backgroundColor: colors.secondary,
            margin: 10,
            borderRadius: 10,
            height: 40,
            flex: 1,
          }}
          value={message}
          onChangeText={setMessage}
          blurOnSubmit={true}
          editable={true}
          multiline={true}
          returnKeyType="send"
          placeholder="Message..."
          onSubmitEditing={HandleSendMessage}
          placeholderTextColor={colors.text}
        />
        <TouchableOpacity onPress={HandleSendMessage}>
          <Ionicons name="ios-send-outline" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ChatRoomScreen;
