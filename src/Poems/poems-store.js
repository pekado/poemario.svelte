import { writable } from "svelte/store";

let poems = writable([]);

const poemsStore = {
  subscribe: poems.subscribe,
  setPoemas: items => {
    let invertPoems = [];
    invertPoems.reverse.call(items);
    poems.set(items);
  },
  addPoem: poem => {
    poems.update(items => {
      // return items.splice(0, 0, poem);
      return [poem, ...items];
    });
  }
};

export default poemsStore;
