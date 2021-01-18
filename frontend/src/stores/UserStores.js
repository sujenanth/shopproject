import { extendObservable } from 'mobx';

class UserStore{
    constructor() {
        extendObservable(this, {
            isLoggedIn: localStorage.getItem("user"),
            username: '',
            lastname: '',
            items: [],
            currentItem : ''
            // Noch zu machen
            //accesstoken: localStorage.getItem("teacher"),
        })
    }
}

export default new UserStore();