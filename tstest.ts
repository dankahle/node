declare let console:any;
declare let window:any;
let log = console.log;


class Mine {

   name = 'dank';

   fcn() {
      console.log('name', this.name);
   }

}

let obj = new Mine();
obj.fcn();
