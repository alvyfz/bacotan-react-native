import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Modal from "react-native-modal";
import { colors } from "../Utils/Colors";
import * as Clipboard from "expo-clipboard";
export default function ModalDetailRoom({
  state,
  setState,
  data,
  dataUpdate,
  setDataUpdate,
  setData,
  handleUpdate,
}) {
  handleCancelEdit = () => {
    setData({
      ...data,
      onEdit: false,
    });
    setDataUpdate({
      ...dataUpdate,
      name: data.name,
      description: data.description,
      id: data.id,
    });
  };
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(data.id);
    ToastAndroid.showWithGravity(
      "Code room telah di salin ke clipboard!",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
  };
  return (
    <Modal isVisible={state}>
      <View
        style={{
          height: 210,
          backgroundColor: colors.secondary,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            padding: 5,
          }}
        >
          {data.onEdit === true ? (
            <>
              <TouchableOpacity onPress={handleCancelEdit}>
                <Ionicons
                  name="ios-close-outline"
                  size={30}
                  color={colors.text}
                />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={{ paddingRight: 10, paddingTop: 5 }}
                onPress={() =>
                  setData({
                    ...data,
                    onEdit: true,
                  })
                }
              >
                <Ionicons name="brush-outline" size={20} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setState(false)}>
                <Ionicons
                  name="ios-close-outline"
                  size={30}
                  color={colors.text}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={{ paddingHorizontal: 15 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontWeight: "bold",
                marginRight: 45,
              }}
            >
              Nama
            </Text>
            <TextInput
              editable={data.onEdit}
              style={{
                flex: 1,
                height: 40,
                borderBottomWidth: 1,
                padding: 5,
                color: colors.text,
                borderColor: colors.primary,
                borderRadius: 5,
                backgroundColor:
                  data.onEdit === true ? colors.primary : colors.secondary,
              }}
              onChangeText={(text) =>
                setDataUpdate({ ...dataUpdate, name: text })
              }
              value={dataUpdate.name}
              placeholder="Name"
              placeholderTextColor="#BDBDBD"
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                color: colors.text,
                fontWeight: "bold",
                marginRight: 10,
              }}
            >
              Description
            </Text>
            <TextInput
              editable={data.onEdit}
              style={{
                flex: 1,
                height: 40,
                borderBottomWidth: 1,
                padding: 5,
                color: colors.text,
                borderColor: colors.primary,
                borderRadius: 5,
                backgroundColor:
                  data.onEdit === true ? colors.primary : colors.secondary,
              }}
              onChangeText={(text) =>
                setDataUpdate({ ...dataUpdate, description: text })
              }
              value={dataUpdate.description}
              placeholder="Name"
              placeholderTextColor="#BDBDBD"
            />
          </View>
          <View>
            <TouchableOpacity
              style={{
                marginTop: 15,
                flexDirection: "row",
                backgroundColor: colors.primary,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                borderRadius: 5,
              }}
              onPress={
                data.onEdit
                  ? () => {
                      handleUpdate();
                      setData({
                        ...data,
                        onEdit: false,
                      });
                    }
                  : copyToClipboard
              }
            >
              {data.onEdit === true ? (
                <>
                  <Text style={{ color: colors.text, marginLeft: 10 }}>
                    Edit
                  </Text>
                </>
              ) : (
                <>
                  <Ionicons
                    name="clipboard-outline"
                    size={18}
                    color={colors.text}
                  />
                  <Text style={{ color: colors.text, marginLeft: 10 }}>
                    Salin code untuk dishare ke temanmu
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
