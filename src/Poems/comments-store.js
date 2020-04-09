import { writable } from "svelte/store";


let comments = writable ([]);


const commentsStore = {
    subscribe: comments.subscribe,
    setComments: (items) => {
        comments.set(items)
    },

    updateComments: (comment) => {
        comments.update((items) => {
    //         fetch("https://poemario-407fa.firebaseio.com/comments.json")
    //   .then(res => {
    //     if (!res.ok) {
    //       throw new Error("failed");
    //     }
    //     return res.json();
    //   })
    //   .then(data => {
    //       console.log(data)
    //         items = Object.values(data)
            return [...items, comment]
        })
    
}
};

export default commentsStore;
