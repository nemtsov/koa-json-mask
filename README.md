# koa-json-mask

Middleware allowing the client to mask / filter the response to only what they need,
reducing the amount of traffic over the wire using the `?fields=foo,bar,baz`
querystring parameter.

If you've used the Google APIs, provided a `?fields=` query-string to get a
[Partial Response](https://developers.google.com/+/api/#partial-responses),
and wanted to do the same for your own server, you can do so with this
middleware.

The difference between `koa-json-filter` and `koa-json-mask` is that this middleware
supports filtering parts deep within objects. If you only need to be able to
filter top-level params of objects in the response use `filter`, and if you need
more power user `mask`.

_Underneath, this middleware uses [json-mask](https://github.com/nemtsov/json-mask).
Use it directly without this middleware if you need more flexibility._

## Installation

```
$ npm install koa-json-mask
```

In order to use this plugin with the previous version of Koa using generator functions, please use version `0.3.2`

```
$ npm install koa-json-mask@0.3.2
```

## Options

* `name` querystring param name defaulting to "fields"

## Example

### Object responses

Script:

```js
const Koa = require('koa');
const mask = require('koa-json-mask');

const app = new Koa();

app.use(mask());

app.use(async ctx => {
  ctx.body = {
    name: 'tobi',
    packages: 5,
    friends: ['abby', 'loki', 'jane'],
    location: {
      id: '342',
      name: 'London'
    }
  };
});

app.listen(3000);
console.log('app listening on port 3000');
```

Response:

```
$ GET /?fields=name,location/name
{
  "name": "tobi",
  "location": {
    "name": "London"
  }
}
```

### Array responses

Script:

```js
const Koa = require('koa');
const mask = require('koa-json-mask');

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
```

Response:

```
$ GET /?fields=name,location/name
[
  {
    "name": "tobi",
    "location": {
      "name": "London"
    }
  },
  {
    "name": "loki",
    "location": {
      "name": "New York"
    }
  }
]
```

## Syntax

The syntax is loosely based on XPath:

* `a,b,c` comma-separated list will select multiple fields
* `a/b/c` path will select a field from its parent
* `a(b,c)` sub-selection will select many fields from a parent
* `a/*/c` the star `*` wildcard will select all items in a field

## More examples

For more examples, take a look at the
[examples section of the json-mask README](https://github.com/nemtsov/json-mask/#examples).

# License

MIT
