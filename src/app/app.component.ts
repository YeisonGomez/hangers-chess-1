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
  public tableScore = window.location.search.indexOf("view") != -1;
  public clickPressed = false;
  public deadBoard = [];
  public userWinner;

  private initGameCls = true;
  private playGo = false;
  private deadCls = false;
  private displayModalWinner = "none";
  /*private displayModalWinner = "block";*/

  constructor(private boxService: BoxService){
    if(this.tableScore){
      this.getScoreTable();
    }
    this.letters = this.boxService.letters;
    this.boxs = this.boxService.getTable(10);
    this.getBoxsAll();
  }

  public goGame(){
    if(!this.clickPressed){
      this.clickPressed = true;
      let interval = setInterval(() => {
        console.log(this.turno);
        if(this.turno >= 0){
          this.updateTable();
        } else {
          clearInterval(interval);
          this.clickPressed = false;
        }
        }, 5000);
    }
  }

  public getBoxsAll(){
  	this.boxService.getAll()
  	.subscribe(data => {
  		this.boxs = this.boxService.addingUsersToTable(data.json().tablero, this.boxs);
      this.turno = data.json().turno;
  	});
  }

  private startGame(){
    //this.startGameCls = true;
    this.initGameCls = true;
    this.boxService.startGame()
    .subscribe(data => {
      this.boxs = this.boxService.getTable(10);
      this.deadBoard = [];
      this.playGo = true;
      this.displayModalWinner = "none";
      this.getBoxsAll(); 
    });
  }

  public updateTable(){
      this.boxService.updateTable()
      .subscribe(data => {
        if(this.users){
          this.validUserDead(data.json().tablero);
        }
        this.users = data.json().tablero;
        this.updateBoxsSecuencie(data.json().tablero);
        this.turno = data.json().turno;
        if(this.turno == -1){
          this.userWinner = this.users.find((user) => { return user.usuario_estado == "2" });
          this.displayModalWinner = "block";
        }
      });
  }

  private async getScoreTable(){
    await this.boxService.getScoreTable()
    .subscribe(data => {
        let turno = data.json().turno;
        if(turno >= 0){
          this.users = data.json().tablero;
          this.getScoreTable();
        } else {  
          this.users = data.json().tablero;
          setTimeout(() => {
            this.getScoreTable();
          }, 1000);
        }
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

  private validUserDead(new_users){
    for (let i = 0; i < this.users.length; ++i) {
      for (let j = 0; j < new_users.length; ++j) {
        if(this.users[i].usuario_id == new_users[j].usuario_id && (new_users[j].usuario_estado == "0" || new_users[j].usuario_vida == 5) ){
          this.deadBoard.push(this.users[i].casilla);
          break;
        }
      }
    }
    console.log(this.deadBoard);
  }
}
