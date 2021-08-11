import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
interface MyProps {
  wheatherData: any;
}
const defaultProps = {};
const Weather = (props: MyProps) => {
  props = {...defaultProps, ...props};
  const {wheatherData} = props;
  const {name, main} = wheatherData;

  // evita que se cargue
  const kelvin = 273.15;
  return (
    <View style={styles.wheather}>
      <Text style={[styles.text, styles.current]}>
        {parseInt((main.temp - kelvin).toString())}
        <Text style={styles.temp}>&#x2103;</Text>
        <Image
          style={{width: 66, height: 58}}
          source={{
            uri: `http://openweathermap.org/img/w/${wheatherData.weather[0].icon}.png`,
          }}></Image>
      </Text>
      <View style={styles.temps}>
        <Text style={styles.text}>
          Max {''}
          <Text style={styles.temp}>
            {parseInt((main.temp_max - kelvin).toString())} &#x2103;
          </Text>
        </Text>

        <Text style={styles.text}>
          Min {''}
          <Text style={styles.temp}>
            {parseInt((main.temp_min - kelvin).toString())} &#x2103;
          </Text>
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wheather: {marginBottom: 20, flexDirection: 'column'},
  text: {
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    marginRight: 20,
  },
  current: {
    fontSize: 80,
    marginRight: 0,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temps: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
export default Weather;
