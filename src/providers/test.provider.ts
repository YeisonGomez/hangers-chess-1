import { Injectable } from '@angular/core';
import { User } from './user.provider';
import { Box } from './box.provider';

@Injectable()
export class Test {
	
	constructor() {

	}

	public userTest(){
		let array = [];
		array.push(new User(1, 111111, 'Julio Alfredo Vasquez', 0, 1)); 
		array.push(new User(2, 111112, 'Alfredo Vasquez Reyes', 0, 1)); 
		array.push(new User(3, 111113, 'Yeison Gomez Rodriguez', 0, 1)); 
		array.push(new User(4, 111114, 'Stiven Tovar Cesar', 0, 1)); 
		array.push(new User(5, 111115, 'Laura Osorio Garcia', 0, 1)); 
		array.push(new User(6, 111116, 'Milher Fabian Rubiano', 0, 1)); 
		return array;
	}

	public boxTest(){			
		let array = [];
		array.push(new Box(1, 'A1', 1));
		array.push(new Box(2, 'A2', 2));
		array.push(new Box(3, 'A3', 3));
		array.push(new Box(4, 'B1', undefined)); 
		array.push(new Box(5, 'B2', undefined)); 
		array.push(new Box(6, 'B3', undefined)); 
		array.push(new Box(7, 'C1', 4)); 	
		array.push(new Box(8, 'C2', 5)); 
		array.push(new Box(9, 'C3', 6));
		return array; 
	}

}