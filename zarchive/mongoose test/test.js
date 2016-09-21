var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  Q = require('q'),
  validate = require('mongoose-validator')


//mongoose.set('debug', true)
mongoose.connect('localhost', 'db')
mongoose.connection.on('error', function (err) {
  console.error('connectionError', err)
})

function cback(err, docs) {
  if (err)
    console.error(err)
  else
    console.log(docs)
}
function cbackclose(err, docs) {
  if (err)
    console.error(err)
  else
    console.log(docs)
  mongoose.disconnect()
}
var userSchema = new Schema({
  name: String,
  age: Number,
  addr: {street: {type: String, validate: validate({validator: 'isAlphanumeric', message: 'Name should contain alphanum only'})}}
})
/*
userSchema.pre('validate', function (next) {
  var addr = this.addr[0]
  console.log('owerner', addr.parent())
  this.addr.forEach(function(v) {
    if(v.street != 'lovell')
      v.invalidate('street', '{PATH} does not equal lovell')
  })
  next()
})
*/

var User = mongoose.model('User', userSchema)
User.on('error', function (err) {
  console.error('UserError:', err)
  mongoose.disconnect()
})

/*
User.findOne({name: 'dank'}, function (err, doc) {
  console.log(doc.addr == doc.addr)
  console.log('mod', doc.isModified())
  doc.addr = doc.addr
  console.log('mod', doc.isModified())
  //doc.addr.push( doc.addr.create({street: 'center'}))
  // doc.save(cbackclose)
})
*/

 User.remove({}, function() {
  new User({name: 'dank', age: 50, addr: {street: ''}}).save(cbackclose)
 })

/*
 User.remove({}, function() {
 new User({name: 'dank', age: 50}).save(cback)
 new User({name: 'carl', age: 60}).save()
 new User({name: 'jim', age: 40}).save()
 })
*/



/*
 User.remove({}, function() {
 User.create({name: 'Dank', age: 50}, function(){})
 User.create({name: 'Carl', age: 60}, function(){})
 User.create({name: 'jim', age: 40}, function(){})
 })
 */

/*
 User.remove({}, function(){
 var users = ['jim', 'dank', 'carl'].map(function(v,i) {
 return new User({name: v, age: 40 + i*10}).save()
 })
 })
 */


//User.where({name: 'dank'}).remove().exec()


/*
 User.find(function(err, docs) {
 console.log(docs)
 })
 */
