var zoo  = {}


zoo.obj =  {
    clone: function (obj) {
        return JSON.parse(JSON.stringify(obj));
    }
}

zoo.string = {
    /** 
     * @description converts a formated string (like an querystring key=val&key=val) to an Object 
     * @param input  
     * @param delimiter {String} the delimiter of the key value pairs in the string for a query string this would be '&'
     * @param pair {String}      the delimiter between the key and value, for a query string this would be '='
     * @example zoo.string.formatToObject("a=b&c=d", "&", "=");
     * */
    formatToObject: function(input, delimiter, pair) {
        delimiter = delimiter || "&";
        pair      = pair      || "=";
        var r = {}, p = null;
        input.split(delimiter).forEach( f => {
            p = f.split(pair);
            r[p[0]] = p[1];
        })
        return r;
    }
}

zoo.request = {
    queryString: function (key) {
        var q = window.location.search
        if (q) {
            var o = zoo.string.formatToObject(q.replace("?", ""));
           if(key) {
               return o[key]
           }
           return o;
        }
        return false;
    }
}

