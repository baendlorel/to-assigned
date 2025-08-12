import {
  getPrototypeOf,
  ownKeys,
  isEnumerable,
  isArray,
  setPrototypeOf,
  notPrimitive,
  isArrowFunction,
  defineProperty,
} from './native.js';

function createResult(o: any) {
  const proto = notPrimitive(o) ? getPrototypeOf(o) : null;
  let result: any;
  if (isArray(o)) {
    result = [];
  } else if (typeof o === 'function') {
    let fn: (...args: unknown[]) => unknown;
    if (isArrowFunction(o)) {
      fn = (...args: any[]) => o(...args);
    } else {
      fn = function (...args: any[]) {
        return o(...args);
      };
      fn.bind = function (...args: any[]) {
        return o.bind(...args);
      };
    }
    // mimic name and length
    defineProperty(fn, 'name', { value: o.name, configurable: true });
    defineProperty(fn, 'length', { value: o.length, configurable: true });
    result = fn;
  } else {
    result = {};
  }

  setPrototypeOf(result, proto);
  return result;
}

/**
 * Creates a new object with properties from the provided sources
 * - Basically the same as Object.assign({}, ...sources.filter(isObjectOrFunction))
 * - returned prototype will be **the same as the first source**
 * - if the first source is:
 *   - *non-object*: `result.prototype` will be `null`
 *   - *array*: result will be an array and shares the same prototype
 *   - *function*: result will be a function with the same `name`, `length` and shares the same prototype. But `caller`, `callee`, and `arguments` will not be copied
 *   - *Map/Set/WeakXXX/NativeObjects*: ignores the source and returns an empty object
 * - only enumerable properties are copied
 * - will not modify the sources
 * - ignores all non-object arguments
 * @returns a new object with properties from the sources
 */
export function toAssigned(...sources: any[]): any {
  if (sources.length === 0) {
    return {};
  }

  const o = createResult(sources[0]);

  for (let i = 0; i < sources.length; i++) {
    const s = sources[i];
    if (s && typeof s === 'object') {
      for (const key of ownKeys(s)) {
        if (isEnumerable.call(s, key)) {
          o[key] = s[key];
        }
      }
    }
  }
  return o;
}

Reflect.set(toAssigned, Symbol('version'), '__VERSION__');
