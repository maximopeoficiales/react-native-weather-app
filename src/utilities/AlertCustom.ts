import { Alert } from "react-native"

export const showAlert = (title: string, message: string, txtButton?: string) => {
    Alert.alert(title, message, [{ text: txtButton }]);
}