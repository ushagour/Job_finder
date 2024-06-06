import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";


const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
  },
  userInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    // borderBottomWidth: 1,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 14,
    color: '#888',
  },
  editButton: {
    marginLeft: 16,
  },
  editButtonText: {
    color: '#007bff',
  },
  profileContent: {

    padding: 16,
  },
  contentText: {
    fontSize: 14,
    marginBottom: 8,
  },






});







export default styles;
