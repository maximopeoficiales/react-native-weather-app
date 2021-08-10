import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
interface MyProps {}
const defaultProps= {};
const TemplateName = (props: MyProps) => {
  props = {...defaultProps, ...props};
  const {} = props;
  return (
    <View>
      <Text>TemplateName</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  
});
export default TemplateName;
