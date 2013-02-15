App = Ember.Application.create();

App.StationsController = Ember.ArrayController.extend();
App.StationController = Ember.ObjectController.extend();

App.Router.map(function () {
    this.resource('stations', { path: "/" });

    this.resource('station', { path: ":station_id" }, function () {
        this.route('map');
        this.route('info');
    })
});

App.StationsRoute = Ember.Route.extend({
    model: function() {
        return App.Station.find();
    }
});

App.StationRoute = Ember.Route.extend({
    model: function (params) {
        console.log("StationRoute", params)
        return App.Station.find(params.station_id);
    }
});

App.StationMapRoute = Ember.Route.extend({
    model: function (params) {
        console.log("StationMapRoute", params);
        return this.controllerFor('station').get('model');
        //var model = this.modelFor('station');
        //console.log(model);
        //return model;
    },
});