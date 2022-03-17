import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';

const data = [
  {
    id: '123',
    icon: 'home',
    location: 'Home',
    destination: 'M A Jinnah Road, Sanghar',
  },
  {
    id: '456',
    icon: 'briefcase',
    location: 'Work',
    destination: 'Karachi, Pakistan',
  },
];

const NavFavorites = () => {
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <View style={(tw`bg-gray-200`, { height: 0.5 })} />}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={tw`flex-row items-center p-4`}>
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={item.icon}
            type='ionicon'
            size={18}
          />
          <View>
            <Text style={tw`font-bold text-lg`}>{item.location}</Text>
            <Text style={tw`text-gray-500`}>{item.destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavorites;

const styles = StyleSheet.create({});
