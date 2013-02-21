    App = Ember.Application.create();

// Routes ----------------------------------------------------------------

    App.Router.map(function () {
        this.resource('root', { path: '/' }, function () {
            this.resource('list', { path: 'list' });

            this.resource('context', { path: 'context/:station_id' }, function () {
                this.route('edit');
                this.route('design');
            });
        });
    });

    App.ListRoute = Ember.Route.extend({
        setupController: function (controller, ctx) {
            console.log(App.ListView);
            controller.set('content', App.StationListItem.find());
        }
    });

//  ListView and ListItemView ----------------------------------------------

    App.ListViewItem = Ember.View.extend({
        expanded: false,
        templateName: 'listItemView',
        expand: function () {
            console.log('expanded!', arguments);
            this.set('expanded', !this.get('expanded'));
        }
    });

    App.ListView = Ember.CollectionView.extend({
        templateName: "list",
        willInsertElement: function () {
            var model = this.get('controller').get('content');
            this.set('content', model);
        },
        emptyView: Ember.View.extend({
            template: Ember.Handlebars.compile("The collection is empty {{controller}}")
        }),
        itemViewClass: App.ListViewItem
    });