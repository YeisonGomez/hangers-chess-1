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
  	this.getBoxsAll(true);
  }

  private getBoxsAll(first: boolean){
  	this.boxService.getAll()
  	.subscribe(data => {
      this.users = data.json().tablero;
  		this.boxs = this.boxService.addingUsersToTable(this.users, this.boxs);
      this.turno = data.json().turno;
      if(!first){
        let interval = setInterval(() => {
          console.log(this.turno);
        if(this.turno >= 0){
          this.updateTable();
          } else {
            clearInterval(interval);
          }
        }, 3000);
      }
      console.log(this.boxs);
  	});
  }

  private startGame(){
    this.boxService.startGame()
    .subscribe(data => {
      this.boxs = this.boxService.getTable(10);
      this.getBoxsAll(false);
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
          delete this.boxs[i][l].muertes;
          delete this.boxs[i][l].usuario_color;
          delete this.boxs[i][l].usuario_estado;
          delete this.boxs[i][l].usuario_id;
          delete this.boxs[i][l].usuario_nombres;
          delete this.boxs[i][l].usuario_vida;
        } else {
          this.boxs[i][l].muertes = users[user_exist].muertes;
          this.boxs[i][l].usuario_color = users[user_exist].usuario_color;
          this.boxs[i][l].usuario_estado = users[user_exist].usuario_estado;
          this.boxs[i][l].usuario_id = users[user_exist].usuario_id;
          this.boxs[i][l].usuario_nombres = users[user_exist].usuario_nombres;
          this.boxs[i][l].usuario_vida = users[user_exist].usuario_vida;
        }
      }
    }
  }
}
