class ProxySubscribers {
  #listeners = new WeakMap();
  subscribe(target, prop, func) {
    const subscribers = this.#getSubscribers(target, prop);
    if (subscribers) {
      subscribers.add(func);
    }
  }
  unsubscribe(target, prop, func) {
    const subscribers = this.#getSubscribers(target, prop);
    if (subscribers) {
      subscribers.filter((f) => f !== func);
    }
  }
  update(target, prop) {
    const subscribers = this.#getSubscribers(target, prop);
    if (subscribers) {
       subscribers.forEach((f) => f());
    }
  }
  #getSubscribers(target, prop) {
    let findedTarget = this.#listeners.get(target);
    if (!findedTarget) {
      this.#listeners.set(target, (findedTarget = new Map()));
    }

    let subscribers = findedTarget.get(prop);
    if (!subscribers) {
      findedTarget.set(prop, (subscribers = new Set()));
    }
    return subscribers;
  }
}

const proxySubscribers = new ProxySubscribers();

const subscribe = (target, prop, func) => {
  return proxySubscribers.subscribe(target, prop, func);
};

const unsubscribe = (target, prop, func) => {
  return proxySubscribers.unsubscribe(target, prop, func);
};

export { proxySubscribers, subscribe, unsubscribe };
