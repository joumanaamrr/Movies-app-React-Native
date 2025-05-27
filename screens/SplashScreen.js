// import React, { Component, useEffect } from 'react'
// import { Text, View ,StyleSheet,Image,ActivityIndicator} from 'react-native'
// import constants from '../utils';

// export default function SplashScreen ({navigation}) {
//     useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.replace('Main')
//     }, 2000);

//     return () => clearTimeout(timer); 
//   }, [navigation]);

//     return (
//       <View style={styles.container}>
//         <Image 
//           source={require('../assets/movieslogo.jpg')} 
//         style={styles.logo}
//         >
           
//         </Image>
//           <Text style={styles.title}>🎬 Movies App</Text>
//           <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />
//     </View>
//     )
//   }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'
//   },
//   logo: {
//     width: 160, height: 170, marginBottom: 20
//   },
//   title: {
//     fontSize: 28, fontWeight: 'bold', color: '#fff'
//   }
// });

import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { FavoritesContext } from '../context/favcontext';
import constants from '../utils';

const API_KEY = 'c0e2960a6ca9527a86838cc38e2134d9';

export default function HomeScreen({ navigation }) {

  const [movies, setMovies] = useState([]);
  const [filterType, setFilterType] = useState('popular');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchMovies(filterType);
  }, [filterType]);

  const fetchMovies = async (type) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}`);
      setMovies(res.data.results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const displayData = isSearching ? searchResults : movies;

  const filterButtons = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Icon name="search" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {filterButtons.map((btn) => (
          <TouchableOpacity
            key={btn.value}
            style={[
              styles.filterButton,
              filterType === btn.value && styles.activeFilterButton,
            ]}
            onPress={() => {
              setIsSearching(false);
              setFilterType(btn.value);
            }}
          >
            <Text
              style={[
                styles.filterText,
                filterType === btn.value && styles.activeFilterText,
              ]}
            >
              {btn.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#e74c3c" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={displayData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.movieCard}
              onPress={() => navigation.navigate('Details', { movie: item })}
            >
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.posterImage}
              />
              <View style={styles.movieInfo}>
                <Text style={styles.movieTitle}>{item.title}</Text>
             
              </View>
              <View style={styles.movieMeta}>
                <Text style={styles.releaseDate}>🗓️ {item.release_date}</Text>
                <Text style={styles.rating}>🌟 {item.vote_average}/10</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    height: 40,
  },
  searchButton: {
    padding: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#333',
  },
  activeFilterButton: {
    backgroundColor: '#FFD700',
  },
  filterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  activeFilterText: {
    color: '#000',
  },
  movieCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginVertical: 8,
    padding: 12,
  },
  posterImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  movieInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  movieTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  favoriteButton: {
    padding: 8,
    marginLeft: 10,
  },
  movieMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  releaseDate: {
    color: '#AAA',
    fontSize: 14,
  },
  rating: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
