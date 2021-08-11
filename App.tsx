import React, {useState} from 'react';
import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {getWeatherByCityCountry} from './src/api/WeatherApi';
import Form from './src/components/Form/Form';
import Weather from './src/components/Weather/Weather';
const App = () => {
  const [wheatherData, setWheatherData] = useState(null);
  const [bgColor, setBgColor] = useState('rgb(71,149,212)');
  const bgColorApp = {backgroundColor: bgColor};

  const hiddenKeyboard = () => {
    Keyboard.dismiss();
  };

  const handlerSubmit = async (city: string, country: string) => {
    console.log(city, country);
    let data = await getWeatherByCityCountry(city, country);
    const kelvin = 273.15;

    if (!data) {
      Alert.alert('Error', 'No hay resultados con la ciudad o pais', [
        {text: 'Entendido'},
      ]);
    } else {
      const {main} = data;
      const currentWeather = main.temp - kelvin;
      // hace frio
      if (currentWeather < 10) {
        setBgColor('rgb(105,108,149)');
      } else if (currentWeather >= 10 && currentWeather < 20) {
        setBgColor('rgb(71,149,212)');
      } else {
        setBgColor('rgb(178,28,71)');
      }
    }
    setWheatherData(data);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={hiddenKeyboard}>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.container}>
            {wheatherData != null && <Weather wheatherData={wheatherData} />}
            <Form handlerSubmit={handlerSubmit} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    marginHorizontal: '2.5%',
  },
});

export default App;
