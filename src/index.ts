const ownKeys = Reflect.ownKeys;
const isEnumerable = Object.prototype.propertyIsEnumerable;

/**
 * Creates a new object with properties from the provided sources
 * - only enumerable properties are copied(same as `Object.assign`)
 * - will not modify the sources
 * - ignores all non-object arguments
 * @returns a new object with properties from the sources
 */
export function toAssigned<T extends object>(...sources: any[]): T {
  const o: any = {};
  for (const s of sources) {
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
