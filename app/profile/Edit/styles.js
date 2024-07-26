import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";


const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.lightWhite,
    padding: 20,
  },
  avatarContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  avatar: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    borderRadius: 75, // Makes the avatar circular
    marginBottom: 10, // Adds some space below the avatar
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonEdit: {
    marginTop: 20,
    backgroundColor:COLORS.secondary,
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },


  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },



});







export default styles;
