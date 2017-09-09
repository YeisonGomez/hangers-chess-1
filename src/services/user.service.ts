import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable()
export class UserService {
	
	constructor(public api: ApiService) {}

	public getAll(){
		return this.api.POST('/user/get-all', "key=321");
	}
}