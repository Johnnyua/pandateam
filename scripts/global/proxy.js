import { proxySubscribers } from './subscribers.js';
const proxy = (target, cbArray = []) => {
  let obj = {};
  let key = null;
  if (typeof target !== 'object') {
    obj = { value: target };
  } else {
    obj = target;
  }

  if (target.constructor !== Object) {
    key = 'value';
  }

  const proxy = new Proxy(obj, {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }
    },
    set(target, prop, value) {
      target[prop] = value;
      proxySubscribers.update(proxy, key ? key : prop);
      return true;
    },
  });
  return proxy;
};

export { proxy };
