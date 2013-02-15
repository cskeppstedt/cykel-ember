App = Ember.Application.create();

App.ApplicationController = Ember.Controller.extend();
App.ApplicationView = Ember.View.extend({
    templateName: 'application'
});;

App.AllStationsController = Ember.ArrayController.extend();
App.AllStationsView = Ember.View.extend({
    templateName: 'stations'
});

App.Store = DS.Store.extend({
    adapter: DS.RESTAdapter.create({
        url: 'api'
    }),
    revision: 11
});

App.Station = DS.Model.extend({
    name: DS.attr('string'),
    lat: DS.attr('number'),
    lng: DS.attr('number'),
    bikes: DS.attr('number'),
    free: DS.attr('number')
});

App.Router = Ember.Router.extend({
    enableLogging: true,
    root: Ember.Route.extend({
        stations: Ember.Route.extend({
            route: '/',
            connectOutlets: function (router) {
                router.get('applicationController').connectOutlet('allStations', App.Station.find());
            }
        })
    })
});

App.initialize();