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
    free: DS.attr('number'),
    imgSrc: function () {
        console.log('imgSrc!', this.get('name'));
        return "http://placehold.it/350x350&text=" + this.get('name');
    }.property('name')
});