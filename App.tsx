import React from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Form from './src/components/Form/Form';
const App = () => {
  const hiddenKeyboard = () => {
    Keyboard.dismiss();
  };

  const handlerSubmit = (city: string, country: string) => {
    console.log(city, country);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={hiddenKeyboard}>
        <View style={styles.app}>
          <View style={styles.container}>
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
    backgroundColor: 'rgb(71,149,212)',
    justifyContent: 'center',
  },
  container: {
    marginHorizontal: '2.5%',
  },
});

export default App;
