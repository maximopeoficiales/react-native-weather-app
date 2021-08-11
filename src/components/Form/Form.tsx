import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
interface MyProps {
  handlerSubmit(city: string, country: string): void;
}
const defaultProps = {};
const Form = (props: MyProps) => {
  props = {...defaultProps, ...props};
  const {handlerSubmit} = props;
  //state
  const [animacionBoton] = useState(new Animated.Value(1));
  const [country, setCountry] = useState('PE');
  const [city, setCity] = useState('Lima');

  const animateIn = () => {
    Animated.spring(animacionBoton, {
      toValue: 0.75,
      useNativeDriver: true,
    }).start();
  };
  const animateOut = () => {
    Animated.spring(animacionBoton, {
      toValue: 1,
      useNativeDriver: true,
      friction: 4,
      tension: 30,
    }).start();
  };

  const handlerChangePicker = (itemValue: string) => {
    setCountry(itemValue);
  };

  // delego un evento al padre
  const handlerSubmitForm = () => {
    if (city.trim() === '' || country.trim() === '') {
      Alert.alert('Error', 'Agrega una ciudad para la busqueda', [
        {text: 'Entendido'},
      ]);
      return;
    }
    handlerSubmit(city, country);
  };
  const styleAnimation = {transform: [{scale: animacionBoton}]};

  return (
    <View>
      <View>
        <View>
          <TextInput
            value={city}
            style={styles.input}
            placeholder="City"
            placeholderTextColor="#666"
            onChangeText={(city: string) => {
              setCity(city);
            }}
          />
        </View>
      </View>

      <View>
        <Picker
          selectedValue={country}
          onValueChange={handlerChangePicker}
          style={{backgroundColor: '#FFF'}}
          itemStyle={{height: 120, backgroundColor: '#FFF'}}>
          <Picker.Item label="- Select to country -" value="" />
          <Picker.Item label="EEUU" value="US" />
          <Picker.Item label="Peru" value="PE" />
          <Picker.Item label="Mexico" value="MX" />
          <Picker.Item label="Argentina" value="AR" />
          <Picker.Item label="Colombia" value="CO" />
          <Picker.Item label="España" value="ES" />
          <Picker.Item label="Costa Rica" value="CS" />
        </Picker>
      </View>
      <TouchableWithoutFeedback
        onPress={handlerSubmitForm}
        onPressIn={() => {
          animateIn();
        }}
        onPressOut={() => {
          animateOut();
        }}>
        <Animated.View style={[styles.btnBuscar, styleAnimation]}>
          <Text style={styles.txtBuscar}>Buscar Clima</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#FFF',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnBuscar: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
  txtBuscar: {
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  },
});
export default Form;
