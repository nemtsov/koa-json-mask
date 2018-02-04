/**
 * Module dependencies.
 */

const mask = require('..');
const Koa = require('koa');

const app = new Koa();

app.use(mask());

app.use(async ctx => {
  ctx.body = [
    {
      name: 'tobi',
      packages: 5,
      friends: ['abby', 'loki', 'jane'],
      location: {
        id: '342',
        name: 'London'
      }
    },
    {
      name: 'loki',
      packages: 2,
      friends: ['loki', 'jane'],
      location: {
        id: '62',
        name: 'New York'
      }
    }
  ];
});

app.listen(3000);
console.log('app listening on port 3000');
