import { Component } from '@angular/core';

import { BoxService } from '../services/box.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	public users;
	public boxs;

  constructor(private boxService: BoxService, private userService: UserService){
  	this.getBoxsAll();
  	this.getUsersAll();
  }

  private getBoxsAll(){
  	this.boxService.getAll()
  	.subscribe(data => {
  		console.log(data.json());
  	});
  }

  private getUsersAll(){
  	this.userService.getAll()
  	.subscribe(data => {
  		console.log(data.json());
  	});
  }
}
