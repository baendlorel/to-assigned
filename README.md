# to-assigned

A simple utility to create a new object by copying enumerable properties from one or more source objects, similar to `Object.assign`, but ignores all non-object arguments and does not mutate the sources.

## Features

- Only copies enumerable properties (same as `Object.assign`)
- Ignores all non-object arguments
- Does not modify the source objects
- Returns a new object

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

const a = { x: 1 };
const b = { y: 2, z: 3 };
const result = toAssigned(a, b, null, 123);
// result: { x: 1, y: 2, z: 3 }
```

## API

### `toAssigned<T extends object>(...sources: any[]): T`

- **sources**: Any number of source objects. Non-object arguments are ignored.
- **Returns**: A new object with all enumerable properties from the sources.

## License

MIT
