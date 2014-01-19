var request = require('supertest');
var fields = require('..');
var koa = require('koa');

var app = koa();

app.use(fields());

app.use(function *(next) {
  if ('/array' == this.path) return yield next;

  this.body = {
    name: 'tobi',
    email: 'tobi@segment.io',
    packages: 5,
    friends: ['tobi', 'loki', 'jane'],
    location: {id: '342', name: 'London'}
  };
});

app.use(function *() {
  this.body = [
    {
      name: 'tobi',
      email: 'tobi@segment.io',
      packages: 5,
      friends: ['abby', 'loki', 'jane'],
      location: {id: '342', name: 'London'}
    },
    {
      name: 'loki',
      email: 'loki@segment.io',
      packages: 2,
      friends: ['loki', 'jane'],
      location: {id: '62', name: 'New York'}
    }
  ];
});

describe('fields()', function () {
  describe('when ?fields is missing', function () {
    it('should be ignored', function (done) {
      request(app.listen())
        .get('/')
        .expect(200, done);
    });
  });

  describe('when ?fields is present', function () {
    describe('with one property', function () {
      it('should fields that property', function (done) {
        request(app.listen())
        .get('/?fields=name,location/name')
        .expect({name: 'tobi', location: {name: 'London'}}, done);
      });
    });

    describe('with an array response', function () {
      it('should fields each document', function (done) {
        request(app.listen())
        .get('/array?fields=name,location/name')
        .expect([
          {name: 'tobi', location: {name: 'London'}},
          {name: 'loki', location: {name: 'New York'}}
        ], done);
      });
    });

    describe('with multiple properties', function () {
      it('should split on commas', function (done) {
        request(app.listen())
        .get('/?fields=name,packages')
        .expect({name: 'tobi', packages: 5}, done);
      });
    });
  });
});
