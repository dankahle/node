

let s_name = Symbol();
export class Employee{
	constructor(name){
		this.name = name;
	}
	get name() {
		return this[s_name];
	}
	set name(val) {
		this[s_name] = val;
	}
	doWork() {
		return `${this.name} is working.<br>`;
	}
};



