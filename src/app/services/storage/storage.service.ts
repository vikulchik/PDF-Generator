import {Injectable} from '@angular/core';
import {IStorage} from "./storage.interface";

// Here implements IStorage interface for cases if we need to switch from localstorage to any
// another storage or backend for example, so following interface making it easier to switch
// between storages

@Injectable({
  providedIn: 'root'
})
export class StorageService implements IStorage {
  storage = localStorage;

  clear(): void {
    this.storage.clear();
  }

  get<T>(key: string): T | null {
    try {
      const item = this.storage.getItem(key);
      if (item) {
        return JSON.parse(item)
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }

  set<T>(key: string, value: T): void {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }
}
