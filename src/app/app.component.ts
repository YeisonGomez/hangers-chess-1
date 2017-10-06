import { Component } from '@angular/core';

import { BoxService } from '../services/box.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	public boxs;
  public turno;
  public users;
  public letters;

  constructor(private boxService: BoxService){
    this.letters = this.boxService.letters;
    this.boxs = this.boxService.getTable(10);
  	this.getBoxsAll();
  }

  private getBoxsAll(){
  	this.boxService.getAll()
  	.subscribe(data => {
      this.users = data.json().tablero;
  		this.boxs = this.boxService.addingUsersToTable(this.users, this.boxs);
      this.turno = data.json().turno;
      console.log(this.boxs);
  	});
  }

  private restartGame(){
    this.boxService.startGame()
    .subscribe(data => {
      this.boxs = this.boxService.getTable(10);
      this.getBoxsAll();
    });
  }

  private updateTable(){
    this.boxService.updateTable()
    .subscribe(data => {
      this.users = data.json().tablero;
      this.updateBoxsSecuencie(data.json().tablero);
      this.turno = data.json().turno;
    });
  }

  private updateBoxsSecuencie(users){
    for (let i = 0; i < this.boxs.length; ++i) {
      for (let l = 0; l < this.boxs[i].length; ++l) {
        let user_exist = -1;
        for (let j = 0; j < users.length; ++j) {
          if(users[j].casilla && users[j].casilla == this.boxs[i][l].casilla){
            user_exist = j;
            break;
          }
        }
        if(user_exist == -1){
          this.boxs[i][l] = { casilla: this.boxs[i].casilla };
        } else {
          this.boxs[i][l] = users[user_exist];
        }
      }
    }
  }
}
