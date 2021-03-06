import { CallbackContainer, Listener } from './interfaces';

/** @hidden */
function add(container: CallbackContainer, type: string, listener: Listener): void {
  container[type] = container[type] || [];
  if (container[type].indexOf(listener) < 0) {
    container[type].push(listener);
  }
}

/** @hidden */
function remove(container: CallbackContainer, type: string, listener: Listener): void {
  if (!container[type]) {
    return;
  }
  const index = container[type].indexOf(listener);
  if (index >= 0) {
    container[type].splice(index, 1);
  }
}

/** @hidden */
function clear(container: CallbackContainer, type?: string): void {
  Object.keys(container).forEach((k: string) => {
    if (!type || k === type) {
      delete container[k];
    }
  });
}

export { add, clear, remove };
