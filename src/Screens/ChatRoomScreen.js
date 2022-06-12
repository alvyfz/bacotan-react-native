import { useEffect, useState } from "react";
import { View, Text, ToastAndroid } from "react-native";
import HeaderChatRoom from "../Components/HeaderChatRoom";
import { useMutation, useQuery } from "@apollo/client";
import { colors } from "../Utils/Colors";
import {
  QUERY_ROOM_BY_ID,
  QUERY_SEND_CHAT,
  QUERY_UPDATE_ROOM,
} from "../Utils/QueryGQL";
import ModalDetailRoom from "../Components/ModalDetailRoom";
const ChatRoomScreen = ({ route }) => {
  const { roomId } = route.params;
  const [modalDetail, setModalDetail] = useState(false);
  const [detailRoom, setDetailRoom] = useState({
    id: roomId,
    name: "",
    description: "",
    onEdit: false,
  });
  const [detailUpdate, setDetailUpdate] = useState({
    id: roomId,
    name: "",
    description: "",
  });

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
        user_id: auth,
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
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
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
    </View>
  );
};

export default ChatRoomScreen;
