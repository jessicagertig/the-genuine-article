import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';
import forEach from 'lodash/forEach';
import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';
import has from 'lodash/has';

// export const failureResultToErrorsArray = (object) => {
//   // console.warn('[stucture] failureResultToErrorsArray object', object.errors);
//   let errors = {};
//   if (has(object, 'errors')) {
//     errors = { ...errors, ...object.errors };
//   }
//   return errors;
// };

// export const keysToCamel = (obj) => {
//   if (!isPlainObject(obj)) {
//     return obj;
//   }
//   const newObject = {};
//   forEach(Object.keys(obj), (key) => {
//     newObject[camelCase(key)] = obj[key];
//   });
//   return newObject;
// };

// collection: array of objects
// export const collectionToCamel = (collection) => {
//   if (!isArray(collection)) {
//     return collection;
//   }
//   const newCollection = [];
//   forEach(collection, (obj) => {
//     newCollection.push(keysToCamel(obj));
//   });
//   return newCollection;
// };

// recursive
export const allKeysToCamel = (obj, modifyValues = {}) => {
  const simpleKeysToCamel = (object) => {
    if (!isPlainObject(object)) {
      return object;
    }
    const newObject = {};
    forEach(Object.keys(object), (key) => {
      if (has(modifyValues, key)) {
        newObject[camelCase(key)] = modifyValues[key](object[key]);
      } else {
        newObject[camelCase(key)] = allKeysToCamel(object[key], modifyValues);
      }
    });
    return newObject;
  };

  const simpleCollectionToCamel = (collection) => {
    const newCollection = [];
    forEach(collection, (object) => {
      newCollection.push(simpleKeysToCamel(object));
    });
    return newCollection;
  };

  if (isArray(obj)) {
    return simpleCollectionToCamel(obj);
  }
  if (isPlainObject(obj)) {
    return simpleKeysToCamel(obj);
  }
  return obj;
};

// export const keysToSnake = (obj) => {
//   if (!isPlainObject(obj)) {
//     return obj;
//   }
//   const newObject = {};
//   forEach(Object.keys(obj), (key) => {
//     newObject[snakeCase(key)] = obj[key];
//   });
//   return newObject;
// };

// export const collectionToSnake = (collection) => {
//   if (!isArray(collection)) {
//     return collection;
//   }
//   const newCollection = [];
//   forEach(collection, (obj) => {
//     newCollection.push(keysToSnake(obj));
//   });
//   return newCollection;
// };

export const allKeysToSnake = (obj, modifyValues = {}) => {
  const simpleKeysToSnake = (object) => {
    if (!isPlainObject(object)) {
      return object;
    }
    const newObject = {};
    forEach(Object.keys(object), (key) => {
      if (has(modifyValues, key)) {
        newObject[snakeCase(key)] = modifyValues[key](object[key]);
      } else {
        newObject[snakeCase(key)] = allKeysToSnake(object[key], modifyValues);
      }
    });
    return newObject;
  };

  const simpleCollectionToSnake = (collection) => {
    const newCollection = [];
    forEach(collection, (object) => {
      newCollection.push(simpleKeysToSnake(object));
    });
    return newCollection;
  };

  if (isArray(obj)) {
    return simpleCollectionToSnake(obj);
  }
  if (isPlainObject(obj)) {
    return simpleKeysToSnake(obj);
  }
  return obj;
};
