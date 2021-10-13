

let session = {
    get : function(key){
        var r = sessionStorage.getItem(key);
        if(!r || !r.trim()){
            return null;
        }

        if(r[0] == '{' || r[0] == '['){
            return JSON.parse(r);
        }
    },
    set : function(key, data){
        if(typeof data == 'string'){
            sessionStorage.setItem(key,data);
        } else if(typeof data == 'object'){
            var value = JSON.stringify(data);
            session.setItem(key,value);
        }
    }
}

export default session