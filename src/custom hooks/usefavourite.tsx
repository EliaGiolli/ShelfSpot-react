import { useState, useCallback } from 'react';
import { FavoritesService } from '../services/FavouritesService';
import { LocalStorageService } from '../services/LocalStorageService';

export function useFavorites<T extends { id: string }>() {
  const service = new FavoritesService<T>(
    new LocalStorageService<T[]>(),
    'favorites'
  );

  const [favorites, setFavorites] = useState<T[]>(service.getFavorites());

  const addFavorite = useCallback((item: T) => {
    service.addFavorite(item);
    setFavorites(service.getFavorites());
  }, []);

  const removeFavorite = useCallback((id: string) => {
    service.removeFavorite(id);
    setFavorites(service.getFavorites());
  }, []);

  const isFavorite = useCallback((id: string) => {
    return service.isFavorite(id);
  }, [favorites]);

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
