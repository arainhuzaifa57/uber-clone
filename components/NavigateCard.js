import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { API_KEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavorites from './NavFavorites';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View style={tw`bg-white flex-1`}>
      <Text style={tw`text-center p-5 text-xl`}>Good Morning, Huzaifa</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            styles={styles}
            minLength={2}
            enablePoweredByContainer={false}
            query={{
              key: API_KEY,
              language: 'en',
            }}
            fetchDetails={true}
            returnKeyType='search'
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate('RideOptionsCard');
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
            placeholder='Where to?'
          />
        </View>
        <NavFavorites />
      </View>
      <View style={tw`flex-row justify-center bg-white py-2 mt-auto border-t border-gray-100`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('RideOptionsCard')}
          style={(tw`flex flex-row justify-center bg-black px-4 py-3 rounded-full w-28`)}
        >
          <Icon name='car' type='font-awesome' color='white' size={16} />
          <Text style={tw`text-white text-center pl-3`}>RIDES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavigateCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: '#DDDEDF',
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
