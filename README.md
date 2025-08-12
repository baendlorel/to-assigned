# to-assigned

Create a new object, array, or function by copying enumerable properties from one or more source objects, with prototype and type inheritance from the first source. More flexible than `Object.assign`, supporting arrays, functions, and special objects as the first source.

## Features

- The returned value's prototype will be the same as the first source (if it's an object), or `null` if the first source is a primitive.
- If the first source is:
  - **Array**: result is an array, sharing the same prototype.
  - **Function**: result is a function with the same `name`, `length`, and prototype. (But `caller`, `callee`, and `arguments` are not copied.)
  - **Map/Set/WeakMap/WeakSet/Date**: result is a new instance of the same type, initialized from the first source. (But only own enumerable properties are merged, not collection contents.)
  - **Other objects**: result is a plain object with the same prototype.
  - **Non-object**: result is a plain object with `null` prototype.
- Only enumerable properties are copied (including symbol keys).
- Does not modify the sources.
- Ignores all non-object arguments.

## Installation

```bash
pnpm add to-assigned
# or
npm install to-assigned
# or
yarn add to-assigned
```

## Usage

```ts
import { toAssigned } from 'to-assigned';

// Object prototype inheritance
const proto = { foo: 1 };
const obj = Object.create(proto);
obj.bar = 2;
const result1 = toAssigned(obj, { baz: 3 });
// result1: { bar: 2, baz: 3 }, result1.__proto__ === proto

// Array as first source
const arr = [1, 2];
const result2 = toAssigned(arr, { 2: 3, length: 3 });
// result2: [1, 2, 3]

// Function as first source
function fn(a, b) {
  return a + b;
}
fn.extra = 42;
const result3 = toAssigned(fn, { extra: 99 });
// typeof result3 === 'function', result3(1,2) === 3, result3.extra === 99

// Map/Set/WeakMap/WeakSet/Date as first source
const map = new Map([[1, 'a']]);
const result4 = toAssigned(map, { foo: 'bar' });
// result4 instanceof Map, result4.get(1) === 'a', result4.foo === 'bar'

// Non-object as first source
const result5 = toAssigned(123, { a: 1 });
// result5: { a: 1 }, Object.getPrototypeOf(result5) === null
```

## API

### `toAssigned(...sources: any[]): any`

- **sources**: Any number of source objects. Non-object arguments are ignored.
- **Returns**: A new object, array, function, or special object (Map/Set/...) with all enumerable properties from the sources, and prototype/type inherited from the first source.

## License

MIT
