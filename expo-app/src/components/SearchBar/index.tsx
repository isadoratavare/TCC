import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, FlatList, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import useAutoCompleteService from "../../services/autoComplete";
import { Place } from "../../@types/map";

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [autoCompleteList, setAutoCompleteList] = useState([]);
  const { getAutoCompleteList } = useAutoCompleteService();

  useEffect(() => {
    async function get() {
      const autoComplete = getAutoCompleteList({ input: search });
      setAutoCompleteList(await autoComplete);
    }
    get();
  }, [search]);
  return (
    <View
      style={{
        position: "absolute",
        zIndex: 2,
        top: 70,
        left: 0,
        width: "100%",
        alignItems: "center",
      }}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <AntDesign
            name="search1"
            size={20}
            color="#888"
            style={{ marginHorizontal: 10 }}
          />
          <TextInput
            placeholder="Pesquisar..."
            style={styles.input}
            value={search}
            onChangeText={(value) => {
              setSearch(value);
            }}
          />
        </View>
      </View>

      <FlatList
        data={autoCompleteList}
        renderItem={({ item }: { item: Place }) => {
          return <Text>{item.name}</Text>;
        }}
        contentContainerStyle={{
          width: "80%",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
    height: 65,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 55,
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  input: { flex: 1, padding: 0, margin: 0 },
});
