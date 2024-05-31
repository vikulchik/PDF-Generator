// Creating general IStorage interface for cases if we need to switch from localstorage to any
// another storage or backend for example, so following interface making it easier to switch
// between storages

export interface IStorage {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
  clear(): void;
}
