import React from 'react';
import { View, Text } from 'react-native';

import styles from './screenheader.style'
import { TouchableOpacity, Image } from 'react-native';

const ScreenHeaderBtn = ({iconUrl,dimension,HandelOnPress}) => {
  return (
  <TouchableOpacity style={styles.btnContainer} onPress={HandelOnPress}>
    <Image
    
    source={iconUrl}
    resizeMode='cover'
    style={styles.btnImg(dimension)}
    />
  </TouchableOpacity>
  )
}

export default ScreenHeaderBtn