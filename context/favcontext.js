import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (e) {
      console.error('Failed to load favorites', e);
    }
  };

  const saveFavorites = async (newFavorites) => {
    try {
      setFavorites(newFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (e) {
      console.error('Failed to save favorites', e);
    }
  };

  const addToFavorites = (movie) => {
    const alreadyAdded = favorites.find((m) => m.id === movie.id);
    if (!alreadyAdded) {
      const newFavorites = [...favorites, movie];
      saveFavorites(newFavorites);
    }
  };

  const removeFromFavorites = (id) => {
    const newFavorites = favorites.filter((movie) => movie.id !== id);
    saveFavorites(newFavorites);
  };

  const isFavorite = (id) => favorites.some((movie) => movie.id === id);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
