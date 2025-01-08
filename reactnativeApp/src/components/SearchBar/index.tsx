/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import { Place } from '../../@types/map';
import RenderItem from './components/RenderItem';
import Separator from './components/Separator';
import useMapsServices from '../../services/maps';

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [autoCompleteList, setAutoCompleteList] = useState<Place[]>([]);

  const { getAutoCompleteList } = useMapsServices();

  useEffect(() => {
    if (search.trim() !== '') {
      async function get() {
        await getAutoCompleteList(search)
          .then((res) => {
            setAutoCompleteList(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      get();
      return;
    }
    setAutoCompleteList([]);
  }, [search]);

  function closeSearch() {
    setSearch('');
  }
  return (
    <View style={styles.searchContainer}>
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Pesquisar..."
            placeholderTextColor={"#888"}
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
        renderItem={({ item }) => (
          <RenderItem item={item} closeSearch={closeSearch} />
        )}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    top: 70,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
    height: 65,
  },
  textInputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 55,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: { flex: 1, padding: 0, margin: 0, paddingHorizontal: 10, color: 'black' },
  listContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',

    borderRadius: 15,
    width: '95%',
  },
});
