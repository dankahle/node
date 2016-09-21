
import {Employee} from './employee'

export class Company{
	hire(...names) {
		this.employees = names.map(name => new Employee(name));
	}
	doWork(){
		return [for (e of this.employees) e.doWork()];
	}
}



