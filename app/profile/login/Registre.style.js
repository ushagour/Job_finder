import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: COLORS.lightWhite,
      padding: 20,
    },
    headerWrapper: {
      marginBottom: 20,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    inputsContainer: {
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    buttonsContainer: {
      marginBottom: 20,
    },
    button: {
      backgroundColor: COLORS.primary,
      padding: 15,
      borderRadius: 5,
      marginBottom: 10,
    },
    buttonOutLine: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: COLORS.primary,
    },
    buttonText: {
      textAlign: 'center',
      color: '#fff',
      fontWeight: 'bold',
    },
    buttonTextOutLine: {
      color: COLORS.primary,
    },
    lineStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    boxStyle: {
      padding: 10,
      alignItems: 'center',
    },
    imageStyle: {
      width: 50,
      height: 50,
    },
    indicatorContainer: {
      marginTop: 20,
      marginBottom: 20,

    },
  
  });

 export default styles;
