import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable()
export class BoxService {
	
	constructor(public api: ApiService) {}

	getAll(){
    	return this.api.POST('/box/table/get-table-private', `key=${321}`);
  	}

  	updateTable(){
    	return this.api.POST('/box/update-table', `key=${321}`);
  	}

  	startGame(){
    	return this.api.POST('/box/start-game', `key=${321}`);
  	}
}