import { Component } from '@angular/core';

import { BoxService } from '../services/box.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	public boxs;
  public turno;

  constructor(private boxService: BoxService){
  	this.getBoxsAll();
  }

  private getBoxsAll(){
  	this.boxService.getAll()
  	.subscribe(data => {
  		this.boxs = data.json().tablero;
      this.turno = data.json().turno;
      console.log(this.boxs);
  	});
  }

  private restartGame(){
    this.boxService.startGame()
    .subscribe(data => {
    });
  }
}
