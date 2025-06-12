import { StorageService } from "./StorageService";

//here TS now understands that the T type also has a id as string
export class FavoritesService<T extends { id: string }> {

    private storage: StorageService<T[]>
    private storageKey: string;

    constructor(storage:StorageService<T[]>, storageKey = 'favourites'){
        this.storage = storage;
        this.storageKey = storageKey;
    }

    getFavorites(): T[]{
        return this.storage.getItem(this.storageKey) || []
    }

    addFavorite(item: T):void {
        const favorites = this.getFavorites();
        if (!favorites.find(fav => fav['id'] === item['id'])) {
            this.storage.setItem(this.storageKey, [...favorites, item]);
        }
    }

    removeFavorite(itemId: string):void{
        const favorites = this.getFavorites().filter(fav => fav.id !== itemId);
        this.storage.setItem(this.storageKey, favorites);
    }

    isFavorite(itemId: string): boolean {
    return this.getFavorites().some(fav => fav.id === itemId);
  }
}