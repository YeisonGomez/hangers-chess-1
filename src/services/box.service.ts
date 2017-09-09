import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable()
export class BoxService {
	
	constructor(public api: ApiService) {}

	getAll(){
    	return this.api.GET('/box');
  	}
}