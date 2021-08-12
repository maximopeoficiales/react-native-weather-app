import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  getAllCountryCitys,
  getCountryCodeByNameCountryAsync,
  getStateByCountry,
} from '../../api/CountryCityApi';
import {Country} from '../../api/responses/Country';
import {State} from '../../api/responses/State';
import {showAlert} from '../../utilities/AlertCustom';
interface MyProps {
  handlerSubmit(city: string, country: string): void;
}
const defaultProps = {};
const Form = (props: MyProps) => {
  props = {...defaultProps, ...props};
  const {handlerSubmit} = props;
  //state
  const [countrys, setCountrys] = useState<Country[]>([]);
  const [citys, setCitys] = useState<State[]>([]);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  // animacion
  const [animacionBoton] = useState(new Animated.Value(1));

  // obtengo todos los countrys
  useEffect(() => {
    (async () => {
      let countrys = await getAllCountryCitys();
      setCountrys(countrys);
    })();
  }, []);

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

  const handlerChangePickerCountry = async (nameCountry: string) => {
    let citys = getStateByCountry(countrys, nameCountry);
    if (citys?.length === 0) {
      showAlert('Error en la busqueda de ciudades', 'Seleccione otro pais');
    }

    setCitys(citys ?? []);
    setCountry(nameCountry);
  };

  const handlerChangePickerCity = (itemValue: string) => {
    setCity(itemValue);
  };

  // delego un evento al padre
  const handlerSubmitForm = async () => {
    if (city.trim() === '' || country.trim() === '') {
      showAlert('Error', 'Agrega una ciudad para la busqueda', 'Entendido');
      return;
    }
    let codeCountry = await getCountryCodeByNameCountryAsync(country);
    handlerSubmit(city, codeCountry ?? '');
  };
  const styleAnimation = {transform: [{scale: animacionBoton}]};

  return (
    <View>
      <View style={styles.bgSelect}>
        <Picker
          selectedValue={country}
          onValueChange={handlerChangePickerCountry}
          itemStyle={{height: 120, backgroundColor: '#FFF'}}>
          <Picker.Item label="- Selecciona un Pais -" value="" />
          {countrys.length !== 0 && 
            countrys.map(c => {
              return <Picker.Item key={c.code} label={c.name} value={c.name} />;
            })}
        </Picker>
      </View>

      <View style={styles.bgSelect}>
        <Picker
          selectedValue={city}
          onValueChange={handlerChangePickerCity}
          itemStyle={{height: 120, backgroundColor: '#FFF'}}>
          <Picker.Item label="- Selecciona una ciudad -" value="" />
          {citys.length !== 0 &&
            citys.map(c => {
              return (
                <Picker.Item key={c.state_code} label={c.name} value={c.name} />
              );
            })}
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
  bgSelect: {
    backgroundColor: '#FFF',
    marginVertical: 5,
    borderRadius:100
  },
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
    backgroundColor: '#F39237',
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
