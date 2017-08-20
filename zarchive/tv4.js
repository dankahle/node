
var tv4 = require('tv4'),
   formats = require('tv4-formats'),
   schema = {type: 'string', format: 'guid'};

tv4.addFormat(formats);

console.log(tv4.validateMultiple('aaa07481-620c-5c23-83b4-ea7f56eeedfc', schema));
console.log('>>>>>>>>>>>>>>>>>>');
console.log(tv4.validateMultiple('not', schema));

// console.log(validator.validate('aaa07481-620c-5c23-83b4-ea7f56eeedfc', schema));
