import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { API_KEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavorites from '../components/NavFavorites';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <View style={[tw`bg-white h-full pt-10`]}>
      <View style={tw`p-5`}>
        <Text
          style={{ fontSize: 45, fontWeight: 'bold', textAlign: 'left', textShadowColor: 'black', marginVertical: 8 }}
        >
          {`CHALAIN
PHIR!`}
        </Text>
        <GooglePlacesAutocomplete
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
            textInputContainer: {
              borderColor: 'black',
              borderBottomWidth: 1,
              marginHorizontal: 4,
              marginBottom: 8,
            },
          }}
          minLength={2}
          enablePoweredByContainer={false}
          query={{
            key: API_KEY,
            language: 'en',
          }}
          fetchDetails={true}
          returnKeyType='search'
          onPress={(data, details) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={400}
          placeholder='Where From?'
          // currentLocation={true}
          // currentLocationLabel='Current location'
        />
        <NavOptions navigation={navigation} />
        <NavFavorites />
      </View>
    </View>
  );
};

export default HomeScreen;
