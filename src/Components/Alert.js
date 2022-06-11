import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../Utils/Colors";
import Modal from "react-native-modal";

const Alert = ({ title, state, setState, handle }) => {
  return (
    <Modal isVisible={state}>
      <View
        style={{
          height: 190,
          backgroundColor: colors.secondary,
          borderRadius: 10,
        }}
      >
        <View style={{ justifyContent: "center", marginBottom: 40 }}>
          <Text
            style={{
              color: colors.text,
              textAlign: "center",
              fontSize: 24,
              margin: "auto",
              padding: 10,
            }}
          >
            {title}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity
            style={{
              width: 100,
              paddingVertical: 10,
              borderRadius: 10,
              backgroundColor: colors.primary,
              alignItems: "center",
            }}
            onPress={() => setState(false)}
          >
            <Text style={{ color: colors.text }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 100,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: colors.primary,
              borderRadius: 10,
              alignItems: "center",
            }}
            onPress={handle}
          >
            <Text
              style={{
                color: colors.text,
              }}
            >
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Alert;
