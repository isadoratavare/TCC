import React, { useState } from "react";

import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";

const ModalBottom: React.FC<{children: any, isOpen: boolean, setOpen: any}> = ({children, isOpen, setOpen}) => {
  return (
    <Modal transparent={true} visible={isOpen} >
      <TouchableOpacity
        style={styles.centeredView}
        onPress={() => {
            setOpen((prevState: boolean) => !prevState)
        }}
      />
      <View style={{ position: "absolute", width: "100%", bottom: 0 }}>
        <View style={styles.modalView}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    height: 200,
  },
});

export default ModalBottom;
