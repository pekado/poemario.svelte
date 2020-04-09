import { writable } from "svelte/store";


let autores = writable ([])

const autoresStore = {
    subscribe: autores.subscribe,
    reset: autores.reset,
    actAutores: (autor) => {
        autores.update(items => {
            // return items.splice(0, 0, poem);
            return [...items, autor];
          })
    },
    setAutores: (items) => {
        autores.set(items);
    },
}

export default autoresStore;