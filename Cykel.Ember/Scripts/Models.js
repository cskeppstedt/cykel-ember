/*App.Store = DS.Store.extend({
    adapter: DS.RESTAdapter.create({
        url: 'api'
    }),
    revision: 11
});*/

App.OwnRest = DS.RESTAdapter.extend({
    buildURL: function (record, suffix) {
        console.log(record);
        console.log(suffix);
        
        return this._super(record, suffix)
    },
});

App.OwnRest.configure('plurals', {
    station_list_items: "stationlistitems"
});

App.Store = DS.Store.extend({
    adapter: App.OwnRest.create({
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


App.StationListItems = DS.Model.extend({
    title: DS.attr("string"),
    subTitle: DS.attr("string"),
    body: DS.belongsTo("App.StationListItemBody")
});

App.StationListItemBody = DS.Model.extend({
    bodyText: DS.attr("string")
});