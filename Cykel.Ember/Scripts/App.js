App = Ember.Application.create();

App.StationsController = Ember.ArrayController.extend();
App.StationController = Ember.ObjectController.extend({
    allStations: function () {
        this.transitionToRoute('stations');
    }
});

App.ListView = Ember.View.extend({
    templateName: "stations",
    bodyTemplate: Ember.View.extend({})
});

App.StationsView = App.ListView.extend({
    bodyTemplate: Ember.View.extend({ templateName: "stationBody" })
});

App.StationView = App.ListView.extend({});

App.StationMapController = Ember.ObjectController.extend({
    expand: function (params) {
        this.get('model').set('isExpanded', !this.get('model').get('isExpanded'));
    }
});

App.Router.map(function () {
    this.resource('stations', { path: "/" });

    this.resource('station', { path: ":station_id" }, function () {
        this.route('map');
        this.route('info');
    });
});

App.StationsRoute = Ember.Route.extend({
    model: function () {
        return App.StationListItem.find();
    }
});

App.StationRoute = Ember.Route.extend({
    model: function (params) {
        console.log("StationRoute", params);
        return App.Station.find(params.station_id);
    }
});

App.StationMapRoute = Ember.Route.extend({ model: function (params) { return this.modelFor('station'); }, });