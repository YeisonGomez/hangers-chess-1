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

<<<<<<< HEAD
  // private startGameCls = false;
  private initGameCls = false;
  private deadCls = false;
=======
  private startGameCls = true;
  private initGameCls = true;
  private playGo = false;
>>>>>>> a6fb122d7508e738529314c1054053293a3694b9

  constructor(private boxService: BoxService){
    this.letters = this.boxService.letters;
    this.boxs = this.boxService.getTable(10);
    this.getBoxsAll();
  }

  public goGame(){
    let interval = setInterval(() => {
      console.log(this.turno);
      if(this.turno >= 0){
        this.updateTable();
        } else {
          clearInterval(interval);
        }
      }, 3000);
  }

  public getBoxsAll(){
  	this.boxService.getAll()
  	.subscribe(data => {
      this.users = data.json().tablero;
      for (let i = 0; i < this.users.length; ++i) {
        this.users[i].name = this.users[i].usuario_nombres.split(' ')[2];
      }
  		this.boxs = this.boxService.addingUsersToTable(this.users, this.boxs);
      this.turno = data.json().turno;

      
      console.log(this.boxs);
  	});
  }

  private startGame(){
    //this.startGameCls = true;
    this.initGameCls = true;
    this.boxService.startGame()
    .subscribe(data => {
      this.boxs = this.boxService.getTable(10);
      this.playGo = true;
      this.getBoxsAll(); 
    });
  }

  public updateTable(){
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
          delete this.boxs[i][l].name;

        } else {
          this.boxs[i][l].muertes = users[user_exist].muertes;
          this.boxs[i][l].usuario_color = users[user_exist].usuario_color;
          this.boxs[i][l].usuario_estado = users[user_exist].usuario_estado;
          this.boxs[i][l].usuario_id = users[user_exist].usuario_id;
          this.boxs[i][l].usuario_nombres = users[user_exist].usuario_nombres;
          this.boxs[i][l].usuario_vida = users[user_exist].usuario_vida;
          this.boxs[i][l].name = users[user_exist].usuario_nombres.split(' ')[2];
        }
      }
    }
  }

  /*Borrar*/
  private pjTest(type){
    if (type == "dead") {
      this.deadCls = true;
    }
    if (type=="move") {
      this.boxs[2][1].casilla == "c3";
      console.log(this.boxs[2][1]);
    }
  }
}
