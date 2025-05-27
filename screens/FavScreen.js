
 import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { FavoritesContext } from '../context/favcontext';

export default function FavScreen() {
  const API_KEY = 'c0e2960a6ca9527a86838cc38e2134d9';
  const { favorites } = useContext(FavoritesContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then(res => {
        setMovies(res.data.results);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);
const favoriteMovies = favorites;


  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>Loading...</Text>
      </View>
    );
  }

  if (favoriteMovies.length === 0) {
    return (
      <View style={styles.container}>
       
        <Text style={styles.empty}>No favorites yet!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favoriteMovies}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
            style={styles.img}
          />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
      style={styles.flatList}
    />
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: 'black',
  },
  empty: {
    color: 'white',
    fontSize: 18,
  },
  card: {
    margin: 20,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  
  },
  img: {
    height:200,
    width: 150,
    borderRadius: 10,
    marginRight:0

  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 13,
    display:"flex"
     },
     flatList:{
        backgroundColor:"black"
     }
});
