var jjv = require('jjv'),
   _ = require('lodash')


// create new JJV environment
var env = jjv();

// Register a `user` schema
env.addSchema('user', {
   $schema: 'http://json-schema.org/draft-04/schema#',
   type: 'object',
   properties: {
      name: {
         type: 'string',
         minLength: 3,
         maxLength: 5
      },
      age: {
         type: 'number',
         multipleOf: 3,
         minimum: 0,
         maximum: 100
      },
      addr: {$ref: 'addr.json'}
   },
   required: ['name', 'addr']
});
var obj = {
   name: 'dank',
   age: 51,
   addr: {
      street: 'lovell',
      zip: 12345
   }
   //stuff: 'lala'
};
// Perform validation against an incomplete user object (errors will be reported)
var errors = env.validate('user', obj, {
   checkRequired: true,
   removeAdditional: false,
   useDefault: false,
   useCoerce: false
});

// validation was successful
if (!errors) {
   console.log('User has been validated.')
} else {
   console.dir(errors);
}
console.log();
console.dir(obj)
