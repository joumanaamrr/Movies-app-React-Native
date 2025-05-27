import React, { Component } from 'react'
import { Text, View ,Image,ScrollView,StyleSheet} from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function DetailsScreen ({route}) {
   const {movie}=route.params
    return (
       <ScrollView style={styles.sc}contentContainerStyle={{ padding: 20 }}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }}
        style={styles.img}
      />
      
      <Text style={styles.ov}>{movie.overview}</Text>
    </ScrollView>
    )
  }




const styles = StyleSheet.create({

sc:{
backgroundColor:"black"
},
img:{
     height: 200,
      borderRadius: 10,
      paddingTop:10,

},
ov:{
    color:"white",
     fontSize: 24,
      fontWeight: 'bold',
       marginVertical: 10
}


})