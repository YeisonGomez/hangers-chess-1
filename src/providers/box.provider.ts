import { Injectable } from '@angular/core';

@Injectable()
export class Box {

	private id: number;
	private nombre: string;
	private fk_usuario: number;

	constructor(id: number, nombre: string, fk_usuario: number) {
		this.id=id;
		this.nombre=nombre;
		this.fk_usuario=fk_usuario;
	}

	public testDB(){

	}
}