App.UrlConventionAdapter = DS.RESTAdapter.extend({
    serializer: DS.RESTSerializer.extend({
        rootForType: function (type) {
            var typeString = type.toString();
            Ember.assert("Your model must not be anonymous. It was " + type, typeString.charAt(0) !== '(');

            var parts = typeString.split(".");
            var name = parts[parts.length - 1];
            return name;
        }
    })
});

App.Store = DS.Store.extend({
    adapter: App.UrlConventionAdapter.create({
        url: 'api'
    }),
    revision: 11,
});

App.Station = DS.Model.extend({
    name: DS.attr('string'),
    lat: DS.attr('number'),
    lng: DS.attr('number'),
    bikes: DS.attr('number'),
    free: DS.attr('number'),
    imgSrc: function () {
        return "http://placehold.it/350x350&text=" + this.get('name');
    }.property('name')
});


App.StationListItem = DS.Model.extend({
    title: DS.attr("string"),
    subTitle: DS.attr("string"),
    //body: DS.belongsTo("App.StationListItemBody"),
    station: DS.attr("string")
});

App.StationListItemBody = DS.Model.extend({
    bodyText: DS.attr("string")
});