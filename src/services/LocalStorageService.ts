import { StorageService } from "./StorageService";

export class LocalStorageService<T = any> extends StorageService<T>{

    getItem(key: string): T | null {
        const item = localStorage.getItem(key);
        //this tells TypeScript that the parsed object is of type T
        return item ? JSON.parse(item) as T : null;
    }

    setItem(key: string, value: T): void | T {
        localStorage.setItem(key, JSON.stringify(value));
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }
}