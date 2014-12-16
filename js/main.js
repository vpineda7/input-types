(function($, window, document) {

    window.IT = window.IT || {};

    IT.Global = {

        init: function() {
            this.resultsSection = $('.input-sections');
            this.defaultInputValues = {
                "pattern": "",
                "placeholder": "",
                "required": "",
                "type": "text",
                "value": ""
            };
            this.defaultTypes = [
                "text",
                "number",
                "tel"
            ];

            this.addSection(this.buildInputData(true));
            this.bindEvents();
        },

        bindFastClick: function() {
            $(function() {
                FastClick.attach(document.body);
            });
        },

        bindEvents: function() {
            this.bindFastClick();
            $('.input-section-add').on('click', $.proxy(this.onAddClick, this));
            $(document).on('click', '.input-section-remove', $.proxy(this.removeSection, this));
            $(document).on('change', '.input-section-modifiers select, .input-section-modifiers input', $.proxy(this.getPropertyNameAndValue, this));
        },

        buildInputData: function(checkUrl) {
            var vals = [];
            var urlParams = this._getUrlParameter('inputs')
            if ((checkUrl == true) && (urlParams != null) && (this._isValidJson(urlParams))) {
                urlParams = JSON.parse(urlParams);
                for (var i = 0; i < urlParams.length; i++) {
                    vals.push(this._extendObjects({}, this.defaultInputValues, urlParams[i]));
                }
            } else {
                vals.push(this.defaultInputValues);
            }
            return vals;
        },

        onAddClick: function(e) {
            e.preventDefault();
            this.addSection(this.buildInputData(), true);
        },

        addSection: function(data, isReversed) {
            for (var i = 0; i < data.length; i++) {
                var rendered = tmpl("input_section_template", data[i]);
                if (isReversed) {
                    this.resultsSection.prepend(rendered);
                } else {
                    this.resultsSection.append(rendered);
                }
            }
            this.resultsSection.find('.input-section').first().find('.input').focus();
        },

        removeSection: function(e) {
            e.preventDefault();
            if (confirm('Are you sure?') == true) {
                var self = $(e.currentTarget);
                self.closest('.input-section').remove();
            }
        },

        getPropertyNameAndValue: function(e) {
            var self = $(e.currentTarget);
            var modifierProperties = {};
            modifierProperties.name = self.attr('name');
            if (self.attr('type') == 'checkbox') {
                if (!self.is(':checked')) {
                    modifierProperties.value = '';
                } else {
                    modifierProperties.value = 'required';
                }
            } else {
                modifierProperties.value = self.val();
            }
            this.applyPropertyChange(self, modifierProperties);
        },

        applyPropertyChange: function(element, properties) {
            var input = element.closest('.input-section-modifiers').siblings('.input');
            if (properties.value == '') {
                input.removeAttr(properties.name);
            }
            else {
                input.prop(properties.name,properties.value);
            }
            this.buildNewUrl();
            
        },

        buildNewUrl: function() {
            if (history.pushState) {
                // var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?myNewUrlQuery=1';
                // window.history.pushState({path:newurl},'',newurl);
            }
        },

        showError: function(message) {
            $('.error-messages').html(message).addClass('active');
            setTimeout(function(errorContainer) {
                  $('.error-messages').removeClass('active');
            }, 4000);
        },

        _getUrlParameter: function(name) {
            var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        },

        _isValidJson: function(jsonString) {
            try {
                var o = JSON.parse(jsonString);

                // Handle non-exception-throwing cases:
                // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
                // but... JSON.parse(null) returns 'null', and typeof null === "object", 
                // so we must check for that, too.
                if (o && typeof o === "object" && o !== null) {
                    return true;
                }
            }
            catch (e) { 
                this.showError('The JSON in your URL is invalid.');
            }

            return false;
        },

        _extendObjects: function(out) {
            
            out = out || {};

            for (var i = 1; i < arguments.length; i++) {
                if (!arguments[i]) {
                    continue;
                }
                for (var key in arguments[i]) {
                    if (arguments[i].hasOwnProperty(key))
                        out[key] = arguments[i][key];
                    }
                }
                return out;
            }
        }

    IT.Global.init();

})(jQuery, window, document);