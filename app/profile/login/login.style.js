import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
 
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
},
headerwrapper:{},
headerTitle:{
  fontSize: 33,
  marginBottom: 16,
},
Inputscontainer:{
    width:'80%',
},
input:{
    backgroundColor:'white',
    paddingHorizontal:15,
    borderRadius:20,
    marginVertical: 7,
    height:40,
    fontSize:16,
    color:'black',
    borderWidth:.3,
    borderColor:'#ccc'
 
},
Buttunscontainer:{
    width:'60%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:40,

},
button:{
    backgroundColor:'#023047',
    width:'100%',
    padding:15,
    borderRadius:10,
    alignItems:'center'

},
buttonOutLine:{
    backgroundColor:'#219ebc',
    marginTop:5,
    borderColor:'#8ecae6',
    borderWidth:2
    

},

buttonOutLine:{
  backgroundColor:'#219ebc',
  marginTop:5,
  borderColor:'#8ecae6',
  borderWidth:2
  

},

lineStyle:{
flexDirection:'row',
marginTop:30,
marginLeft:15,
marginRight:15,
alignItems:'center'
},
imageStyle:{
width:80,
height:80,

},
boxStyle:{
flexDirection:'row',
marginTop:30,
marginLeft:15,
marginRight:15,
justifyContent:'space-around'
},

ButtunsText:{
    color:'white',
    fontSize:16,
    fontWeight:'700'
},
errorText: {
    color: COLORS.danger,
    marginBottom: 16,
  },

  LoginButton: {
      marginTop: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
   },
   LoginText: {
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
   },
});

  export default styles;
