(function($){
    Index = Backbone.View.extend({
        title: 'Background Texture Browser',
        template: '/templates/index.html',
        events: {
            'click .texture': 'setBackground'
        },
        initialize: function() {
            //
        },
        render: function(done) {
            var self = this;
            document.title = self.title;

            Global.fetchTemplate(self.template, function(template) {
                self.el.innerHTML = template({textures: self.model.toJSON()});
                if (_.isFunction(done)) {
                    done(self.el);
                }
            });
        },
        setBackground: function(e) {
            e.preventDefault();
            var cssValue = Global.utils.stringFormat('url("{0}")', [e.currentTarget.children[0].src]);
            var selectedTextureName = e.currentTarget.children[1].innerText;
            $('body').css('background-image', cssValue);
            $('#dropdownTitle').text(selectedTextureName);
        }
    });
}(jQuery));