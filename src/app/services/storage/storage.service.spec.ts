import {TestBed} from '@angular/core/testing';
import {StorageService} from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
    service = TestBed.inject(StorageService);
  });

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return localStorageMock[key] || null;
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      localStorageMock[key] = value;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
      delete localStorageMock[key];
    });
    spyOn(localStorage, 'clear').and.callFake(() => {
      localStorageMock = {};
    });
  });

  let localStorageMock: { [key: string]: string } = {};

  it('should set an item in localStorage', () => {
    const key = 'testKey';
    const value = {name: 'test'};

    service.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  it('should get an item from localStorage', () => {
    const key = 'testKey';
    const value = {name: 'test'};
    localStorageMock[key] = JSON.stringify(value);

    const result = service.get(key);
    expect(localStorage.getItem).toHaveBeenCalledWith(key);
    expect(result).toEqual(value);
  });

  it('should return Null if JSON parsing fails in get', () => {
    const key = 'invalidKey';
    localStorageMock[key] = 'invalidJSON';

    const result = service.get(key);
    expect(localStorage.getItem).toHaveBeenCalledWith(key);
    expect(result).toBeNull();
  });

  it('should remove an item from localStorage', () => {
    const key = 'testKey';

    service.remove(key);
    expect(localStorage.removeItem).toHaveBeenCalledWith(key);
  });

  it('should clear all items from localStorage', () => {
    service.clear();
    expect(localStorage.clear).toHaveBeenCalled();
  });
});
