/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Place } from '../../../@types/map';
import { LocationContextProps, useLocation } from '../../../hooks/useLocation';

const RenderItem: React.FC<{ item: Place; closeSearch: () => void }> = ({
  item,
  closeSearch,
}) => {
  const { addLocation } = useLocation() as LocationContextProps;

  function onPress() {
    addLocation(item.id);
    closeSearch();
  }

  return (
    <TouchableOpacity
      style={{
        width: 300,
        flexShrink: 1,
        justifyContent: 'center',

        margin: 10,
        paddingHorizontal: 10,
      }}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row' }}>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={{ fontWeight: 'bold', color: 'black' }}>{item.name}</Text>
          <Text style={{ fontSize: 12, color: 'gray' }}>
            {item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RenderItem;
