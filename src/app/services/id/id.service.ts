import {Injectable} from '@angular/core';
import {v4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class IdService {

  generate() {
    return v4();
  }
}
