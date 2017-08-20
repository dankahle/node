
const Q = require('Q');
const _ = require('lodash');




console.log(createSystemName('lala'))

function createSystemName(name)
{
   var oracleName;

   // Check, if name starts with a letter.
   if (name.match(/^[^a-zA-Z]/))
   {
      // Add the first letter.
      name = 'X_' + name ;
   }

   // Replace all non-alphanumeric characters.
   oracleName = name.replace(/[^a-zA-Z0-9]/gi,
      '_').toUpperCase() ;

   // Truncate the name to <= 27, oracle allows 30, but we reserve 3 places at the end to add up to 1000 numbers for uniqueness
   // see createUniqueSystemName()
   oracleName = oracleName.substr(0, 27);

   // make sure this guy will pass mde core's restictions: start with letter, all upper alphanumeric or underscore, <= 30
   if (!/^[A-Z][A-Z0-9_]{0,26}$/.test(oracleName)) {
      throw new Error(oracleName + ' is not a standard Oracle name.');
   }

   return oracleName;
}

/*
let p1 = Q({prop:'one'});
let p2 = Q({prop:'two'});
let p3 = Q({prop: 'three'});
let p4 = Q({prop:'four'});
*/

/*
let p1 = Q({name:'one'});
let p2 = Q.reject({error:'two'});
let p3 = Q({name: 'three'});
let p4 = Q.reject({error:'four'});

let items = [
   {number: '11'},
   {number: '22'},
   {number: '33'},
   {number: '44'},
]



let dataArray = [
   {number: '11'},
   {number: '22'},
   {number: '33'},
   {number: '44'},
];


Q.allSettled([p1, p2, p3, p4])
   .then(handleQAllSettled(dataArray, 'Catch Name'))
   .then(function () {
      console.log('then block')
   })
   .catch(function (resp) {
      console.log('catch block')
   });

*/


/*
Q.allSettled([p1, p2, p3, p4])
   .then(handleQAllSettled())
   .then(x => console.log('success', JSON.stringify(x,null,2)))
   .catch(x => console.log('fail', JSON.stringify(x,null,2) ));
*/

/*
Q.allSettled([p1, p2, p3, p4])
   .then(x => console.log('success', x))
   .catch(e => console.log('fail', e ));
*/

/*
Q.allSettled([p1, p2, p3, p4])
   .then(handleQAllSettled)
   .then(x => console.log('success', x))
   .catch(x => console.log('fail', x));
*/


function handleQAllSettled(dataArray, rejectName) {
   return (responses) => {
      responses = responses.map((response, i) => {
         response.index = i;
         if (dataArray && _.isArrayLike(dataArray)) {
            response.data = dataArray[i];
         }
         return response;
      });

      const rtn = {};
      rtn.resolves = responses.filter((response) => response.state === 'fulfilled')
         .map((resolve) => {
            delete resolve.state;
            return resolve;
         });

      rtn.rejects = responses.filter((response) => response.state === 'rejected')
         .map((reject) => {
            reject.error = reject.reason;
            delete reject.reason;
            delete reject.state;
            return reject;
         });

      rtn.hasResolves = !!rtn.resolves.length;
      rtn.hasRejects = !!rtn.rejects.length;
      rtn.isEmpty = !rtn.hasResolves && !rtn.hasRejects;

      if (rtn.hasRejects && rejectName) {
         rtn.name = rejectName.toString();
         return Q.reject(rtn);
      }
      else {
         return rtn;
      }
   };
}
