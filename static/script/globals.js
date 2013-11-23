(function($){
    Global = {
        app: _.extend({}, Backbone.Events),
        component: function(properties) {
            return _.extend({
                Views: {},
                Models: {},
                Collections: {},
                Routers: {}
            }, properties);
        },
        options: {
            appTitle: 'PCSWebLabs'
        },
        fetchTemplate: function(path, done) {
            var jsTemplate = window.jsTemplate = window.jsTemplate || {};
            var deferred = new $.Deferred();

            // Synchronously retrieve template objects if they exist
            if (jsTemplate[path]) {
                if (_.isFunction(done)) {
                    done(jsTemplate[path]);
                }

                return deferred.resolve(jsTemplate[path]);
            }

            // Fetch asynchronously when unavailable in the window object
            $.ajax({
                url: path,
                type: 'GET',
                dataType: 'text',
                cache: false,
                global: false,
                success: function(content) {
                    jsTemplate[path] = _.template(content);

                    // Set jsTemplate cache and return the template
                    if (_.isFunction(done)) {
                        done(jsTemplate[path]);
                    }

                    // Resolve deferred template
                    deferred.resolve(jsTemplate[path]);
                }
            });

            // Ensure return promise (notmalized value)
            return deferred.promise();
        },
        utils: {
            stringFormat: function(){
                var result = arguments[0];
                var index = arguments[1].length;
                while (index--) {
                    result = result.replace(new RegExp("\\{" + index + "\\}", "gm"), arguments[1][index]);
                }

                return result;
            }
        }
    };
}(jQuery));