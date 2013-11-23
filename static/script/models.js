(function($){
    BaseModel = Backbone.Model.extend({
        //idAttribute: '_id',
        initialize: function() {
            this.active = true;
            this.created = Date.now();
            this.updated = Date.now();
        }
    });

    Texture = BaseModel.extend({
        initialize: function() {
            this.textureName = '';
            this.texturePath = '';
        }
    });

    Textures = Backbone.Collection.extend({
        model: Texture,
        url: '/services/textures'
    });

    AppModel = Backbone.Model.extend({
        initialize: function() {
            this.textures = null;
        }
    });
}(jQuery));