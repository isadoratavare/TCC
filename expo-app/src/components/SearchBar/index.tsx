import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, FlatList, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import useMapsServices from "../../services/maps";
import { Place } from "../../@types/map";
import RenderItem from "./components/RenderItem";
import Separator from "./components/Separator";

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [autoCompleteList, setAutoCompleteList] = useState<Place[]>([]);

  const { getAutoCompleteList } = useMapsServices();

  useEffect(() => {
    if (search.trim() !== "") {
      async function get() {
        await getAutoCompleteList(search).then((res) =>
          setAutoCompleteList(res)
        );
      }
      get();
      return
    }
    setAutoCompleteList([])
  }, [search]);
  
  function closeSearch() {
    setSearch("");
  }
  return (
    <View style={styles.searchContainer}>
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
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
        renderItem={({ item }) => <RenderItem item={item} closeSearch={closeSearch}/>}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    position: "absolute",
    zIndex: 2,
    top: 70,
    left: 0,
    width: "100%",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
    height: 65,
  },
  textInputContainer: {
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
  listContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",

    borderRadius: 15,
    width: 300,
  },
});
