class Storage {
  #model;
  constructor(model) {
    this.#model = model;
  }

  get(key) {
    const result = this.#model.getItem(key);
    try {
      return this.parse(result);
    } catch (error) {
      return result;
    }
  }

  set(key, value) {
    const currentData = this.get(key);
    if (typeof value === "object") {
      const data = this.stringify(value);
      const result = this.#model.setItem(key, data);
      return result;
    }
    return this.#model.setItem(key, value);
  }

  delete(key) {
    return this.#model.removeItem(key);
  }

  stringify(value) {
    return JSON.stringify(value);
  }

  parse(value) {
    return JSON.parse(value);
  }
}

const storage = new Storage(localStorage);

export { storage };
