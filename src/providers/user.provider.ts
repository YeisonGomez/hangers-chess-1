import { Injectable } from '@angular/core';

@Injectable()
export class User {

	private id: number;
	private code: number;
	private nombres: string;
	private movimiento: number;
	private estado: number;

	constructor(id: number, code: number, nombres: string, movimiento: number, estado: number) {
		this.id=id;
		this.code=code;
		this.nombres=nombres;
		this.movimiento=movimiento;
		this.estado=estado;
	}
}