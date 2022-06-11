import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../Utils/Colors";
import Modal from "react-native-modal";

export default function AlertSuccessCreate({ state, setState, code, handle }) {
  return (
    <Modal isVisible={state}>
      <View
        style={{
          height: 220,
          backgroundColor: colors.secondary,
          borderRadius: 10,
        }}
      >
        <View style={{ justifyContent: "center", marginBottom: 40 }}>
          <Text
            style={{
              color: colors.text,
              textAlign: "center",
              fontSize: 18,
              margin: "auto",
              paddingHorizontal: 10,
              paddingTop: 10,
            }}
          >
            Buat room sukses!
          </Text>
          <Text
            style={{
              color: colors.text,
              textAlign: "center",
              fontSize: 18,
              margin: "auto",
              paddingHorizontal: 10,
              paddingBottom: 10,
            }}
          >
            Salin kode dibawah dan share ke temanmu!
          </Text>
          <TouchableOpacity onPress={handle}>
            <Text
              style={{
                color: colors.text,
                textAlign: "center",
                fontSize: 18,
                margin: "auto",
                paddingHorizontal: 10,

                textDecorationLine: "underline",
              }}
            >
              {code}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity
            style={{
              width: 150,
              paddingVertical: 10,

              borderRadius: 10,
              alignItems: "center",
            }}
            onPress={() => setState(false)}
          >
            <Text style={{ color: colors.text }}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 150,
              paddingVertical: 10,
              borderRadius: 10,
              backgroundColor: colors.primary,
              alignItems: "center",
            }}
            onPress={handle}
          >
            <Text
              style={{
                color: colors.text,
              }}
            >
              Copy to clipboard
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
