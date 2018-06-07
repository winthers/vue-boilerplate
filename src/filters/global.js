Vue.filter("translate", function (value) {
    return App.translate(value);
});

Vue.filter("caps", function (value) {
    return value.toUpperCase();
})

Vue.filter("caps:first", function (value) {
    return value ? value.substr(0,1).toUpperCase() + value.substr(1) : value;
})