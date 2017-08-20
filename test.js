







// let obj = {name:'dank', age:50}
// let {age, name} = obj;

// let [a,b,...xx] = [1,2,4,5];
// console.log(a, b, xx);


/*
let a = [1,2];
let b = [...a];
console.log(a,b,a==b);

let c = {name:'dank'};
let d = {...c};
console.log(c,d,c ==d);
*/

/*
let getAgeReducer = () => (state, {type, value}) => {
   switch(type) {
      case 'add age':
         return {...state, age:value};
      default:
         return state;
   }
}

let newState = getAgeReducer()({name:'dank'}, {type:'add age', value:50});
console.log(newState);
*/




/*
let foo = ({type, action}) => console.log('type', type, 'action', action );
foo({
   type: 'mytype',
   action: 'myaction'
});

let a = {name:'dank', age:50};

// let b = Object.assign({}, a, {age:55});
let b = {...a};

console.log('a == b', a == b);

console.log(b);
*/








/*
let _ = require('lodash');

let users = [
   {id: 1, name: 'dank', age: 50},
   {id: 2, name: 'dank', age: 50},
   {id: 3, name: 'carl', age: 60},
   {id: 4, name: 'jim', age: 40},
   {id: 5, name: 'carl', age: 60},
   {id: 6, name: 'carl', age: 70},
   {id: 7, name: 'carl', age: 60},
   {id: 8, name: 'carl', age: 70},
];


console.log(_.uniqWith(users, (a,b) => {
   return a.name === b.name && a.age == b.age;
}));
console.log();
*/

/*
let clone = _.cloneDeep(users);
console.log(users.filter(x => {
   return !_.find(users, {name: x.name});
}));



updateCustomAttr:
add ia and ext.perm and in a separate array >> ext.new in arr1
then:

1. loop through arr1 and if in ia or ext.perm... toss
2. arr1 uniqueWith dcid, displayName
3. concat other attrs


*/






/*
let _ = require('lodash');

let a = {
   '0': 'zero',
   '1': 'one',
   length: 2
}

// a = 'lala';
console.log(_.isArrayLike('lala'));

[1,2,3].forEach((val,i) => {
   console.log(a[i]);
})
*/


/*
const Q = require('q');

   Q(5)
      .then(x => console.log('success', x))
      .then(x => console.log('success', x))
   .catch(e => console.log('err', e))
*/


/*
 let name = 'XIDN_UPDATE_DATE';
 console.log(name);
 console.log(standardizeName(name))


 function standardizeName(name)
 {
 var standardName ;

 // Check, if name starts with a letter.
 if (name.match(/^[^a-zA-Z]/))
 {
 // Add the first letter.
 name = 'X_' + name ;
 }

 // Replace all non-alphanumeric characters.
 standardName = name.replace(/[^a-zA-Z0-9]/gi,
 '_').toUpperCase() ;

 // Truncate the name, if necessary.
 standardName = standardName.substr(0, 30) ;

 return(standardName) ;
 }
 */


/*
// const fieldNameRegexp = /^(?:[A-Za-z]\w+)(?:[A-Za-z0-9 _]*)$/;
// var fieldNameRegexp = /^[a-zA-Z]\w*$/;
// var fieldNameRegexp = /^[a-zA-Z]\w*$/;
// var fieldNameRegexp = /^\w*$/;
fieldNameRegexp = /^[A-Z][A-Z0-9_]{0,29}$/;
validateFieldName = function validateFieldName(name) {
   return name.length <= 30 && fieldNameRegexp.test(name);
};

console.log(validateFieldName('X23456789012345678901234567890'))
*/



