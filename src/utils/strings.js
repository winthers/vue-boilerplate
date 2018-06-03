
/** Searches the strings.json for a translation  */


function Strings () {
    this.data = {};
}
Strings.prototype = {

    setData: function (data) {
        this.data = data;
    },

    translate: function (id, language) {
        if(this.exists(id)) {

            var o = this.data[id];
            
            return o.hasOwnProperty(language) 
                ? o[language]
                : o.hasOwnProperty(config.defaultLanguage) 
                    ? o[config.defaultLanguage]
                    : "[Error String ID: ('" +  id + "') has no content]";

        }else{
            console.error("error string with id '%s' missing", id);
            return "[Translation Error Missing String ID: ('" +  id + "'), did you forget to add it to the strings.json? ]"
        }
    },

    exists: function (id) {
        return this.data.hasOwnProperty(id);
    }

}