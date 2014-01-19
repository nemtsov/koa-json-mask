
/**
 * Module dependencies.
 */

var mask = require('..');
var koa = require('koa');

var app = koa();

app.use(mask());

app.use(function *(){
  this.body = {
    name: 'tobi',
    packages: 5,
    friends: ['abby', 'loki', 'jane'],
    location: {
      id: '342',
      name: 'London'
    }
  }
});

app.listen(3000);
console.log('app listening on port 3000');
