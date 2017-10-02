import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable()
export class BoxService {
	
	private code_private = 321;
	public letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

	constructor(public api: ApiService) {}

	getAll(){
    	return this.api.POST('/box/table/get-table-private', `key=${this.code_private}`);
  	}

  	updateTable(){
    	return this.api.POST('/box/update-table', `key=${this.code_private}`);
  	}

  	startGame(){
    	return this.api.POST('/box/start-game', `key=${this.code_private}`);
  	}

  	getTable(size){
  		let table = [];
  		for (let i = 0; i < size; ++i) {
  			table[i] = [];
  			for (let j = 1; j < size + 1; ++j) {
  				table[i].push({ casilla: this.letters[i] + j });
  			}
  		}
  		return table;
  	}

  	addingUsersToTable(users, table){
  		for (let i = 0; i < users.length; ++i) {
  			if(users[i].casilla){
  				let c_num = parseInt(users[i].casilla.substring(1, users[i].casilla.length));
  				let index = this.letters.indexOf(users[i].casilla.substring(0, 1));
  				table[index][(c_num - 1)] = users[i];
  			}
  		}
  		return table;
  	}
}