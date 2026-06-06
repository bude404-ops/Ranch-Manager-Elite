const Storage = {

get(k, f = []) {
return JSON.parse(localStorage.getItem(k)) || f;
},

set(k, v) {
localStorage.setItem(k, JSON.stringify(v));
}

};
