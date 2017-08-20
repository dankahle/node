let log = console.log;
class Mine {
    constructor() {
        this.name = 'dank';
    }
    fcn() {
        console.log('name', this.name);
    }
}
let obj = new Mine();
obj.fcn();
