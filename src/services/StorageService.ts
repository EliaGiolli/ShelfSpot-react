export abstract class StorageService<T = any> {
    abstract getItem(key:string): T | null;
    abstract setItem(key:string, value: T): T | void;
    abstract removeItem(key:string):void;
}