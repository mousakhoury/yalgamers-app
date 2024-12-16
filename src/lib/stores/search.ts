import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

// export interface SearchStoreModel <T extends Record<PropertyKey,any>> {
//     data: T[],
//     filtered: T[],
//     search: string
// }

export function CreateSearchStore (data: any){
    const {subscribe, set, update}  = writable({
        data,
        filtered: data,
        search: ""
    });
    return {subscribe,set,update}

}

export function searchHandle(store: { search: string; filtered: any; data: any[]; }){
    const searchTerm = store.search.toLowerCase() || "";
    store.filtered = store.data.filter((item: { searchTerms: string; })=>{
        return item.searchTerms.toLowerCase().includes(searchTerm)
    })

}