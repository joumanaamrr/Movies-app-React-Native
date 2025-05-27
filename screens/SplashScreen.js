import React, { Component, useEffect } from 'react'
import { Text, View ,StyleSheet,Image,ActivityIndicator} from 'react-native'
import constants from '../utils';

export default function SplashScreen ({navigation}) {
    useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Main')
    }, 2000);

    return () => clearTimeout(timer); 
  }, [navigation]);

    return (
      <View style={styles.container}>
        <Image 
          source={require('../assets/movieslogo.jpg')} 
        style={styles.logo}
        >
           
        </Image>
          <Text style={styles.title}>🎬 Movies App</Text>
          <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />
    </View>
    )
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
     justifyContent: 'center',
      alignItems: 'center',
       backgroundColor: 'black'
  },
  logo: {
    width: 160, height: 170, marginBottom: 20
  },
  title: {
    fontSize: 28, fontWeight: 'bold', color: '#fff'
  }
});

