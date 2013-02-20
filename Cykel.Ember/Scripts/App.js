    App = Ember.Application.create();

//  ListView and ListItemView ----------------------------------------------

    App.ListView = Ember.View.extend({
        templateName: "listView",
        bodyTemplate: Ember.View.extend({})
    });

    App.ListItemView = Ember.View.extend({
        templateName: 'listItemView'
    });


// Station list -----------------------------------------------------------

    App.StationListItemsController = Ember.ArrayController.extend({});

    App.StationListItemsView = App.ListView.extend({
        bodyTemplate: Ember.View.extend({ templateName: "stationBody" })
    });

// Routes ----------------------------------------------------------------

    App.Router.map(function () {
        this.resource('root', { path: '/' }, function () {
            this.route('list');

            this.resource('context', { path: 'context/:station_id' }, function () {
                this.route('edit');
                this.route('design');
            });
        });
    });

    App.ContextRoute = Ember.Route.extend({
        setupController: function (controller, model) {
            controller.set('content', App.Station.find(model.id));
        }
    });

    App.RootListRoute = Ember.Route.extend({
        setupController: function () {
            //console.log('setting up controller', this.controllerFor('StationListItems'));
            this.controllerFor('StationListItems').set('model', App.StationListItem.find());
        }
    });
