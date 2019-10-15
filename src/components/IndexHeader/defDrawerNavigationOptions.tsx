import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '@ant-design/react-native';
import navigation from '../../utils/navigation';

const styles = StyleSheet.create({
  icon: {
    marginLeft: 8
  }
})

const defDrawerNavigationOptions = {
  headerStyle: {
    height: 44,
    backgroundColor: "#AA824F"
  },
  headerTitleStyle: { color: '#fff' },
  headerLeft: (
    <TouchableOpacity onPress={navigation.toggleDrawer} style={styles.icon}>
      <Icon name="menu" size={30} color="#fff" />
    </TouchableOpacity>
  )
}

export default defDrawerNavigationOptions
