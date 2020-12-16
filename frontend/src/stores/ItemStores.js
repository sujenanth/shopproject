import {extendObservable} from "mobx";

class ItemStores{
    constructor() {
        extendObservable(this, {
            items : [],
            isLoaded : false,
            selected : '0'
        })
    }
}

export default new ItemStores();