(function($){
    Router = Backbone.Router.extend({
        currentView: null,
        routes: {
            '': 'home'
        },
        reset: function(view) {
            var self = this;
            if (null !== self.currentView) {
                self.currentView.undelegateEvents();
            }

            self.currentView = view;
        },
        home: function() {
            var self = this;
            AppModel.textures = new Textures();
            AppModel.textures.fetch({
                success: function(data) {
                    self.reset(new Index({model: data}));// Get images here
                    self.currentView.render(function(html) {
                        $('#content').hide();
                        $('#content').html(html);
                        $('#content').fadeIn('slow');
                    });
                }
            });
        }
    });
}(jQuery));