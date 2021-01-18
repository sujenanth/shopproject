import {extendObservable} from "mobx";

class ItemStores{
    constructor() {
        extendObservable(this, {
            items : [],
            isLoaded : false,
            selected : '0',
            kategorie : []
        })
    }
}

export default new ItemStores();