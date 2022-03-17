import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravalTimeInformation } from '../slices/navSlice';
import 'intl';
import 'intl/locale-data/jsonp/en';

const data = [
  {
    id: 'Uber-X-123',
    title: 'Non AC Ride',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn',
  },
  {
    id: 'Uber-XL-456',
    title: 'AC Ride',
    multiplier: 1.2,
    image: 'https://links.papareact.com/5w8',
  },
  {
    id: 'Uber-LUX-789',
    title: 'Business',
    multiplier: 1.75,
    image: 'https://links.papareact.com/7pf',
  },
];

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravalTimeInformation);
  const SURGE_CHARGE_RATE = 1.5;
  const formatVal = (val) =>
    new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'PKR',
    }).format(val);
  return (
    <View style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('NavigateCard')}
          style={tw`absolute top-1 left-3 z-50 p-3 rounded-full`}
        >
          <Icon name='chevron-left' type='fontawesome' />
        </TouchableOpacity>
        <Text style={tw`text-center text-xl py-3 mt-1`}>
          Select a ride - {travelTimeInformation?.distance?.text}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row items-center justify-between px-3 mb-2 ${
              item.id === selected?.id && 'bg-gray-200'
            }`}
          >
            <Image
              style={{
                width: 70,
                height: 80,
                resizeMode: 'contain',
              }}
              source={{ uri: item.image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-bold`}>{item.title}</Text>
              <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
            </View>
            <Text style={tw`text-lg`}>
              {formatVal(
                (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * item.multiplier) / 100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-2 my-4 mx-4 ${!selected && 'bg-gray-300'}`}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Text style={tw`text-center text-xl text-white`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
