(function($, window, document) {

    window.IT = window.IT || {};

    IT.Global = {

        init: function() {

            $(function() {
                FastClick.attach(document.body);
            });

            this.dataObject = {
                "type": "text",
                "pattern": "",
                "required": "required"
            };
            this.resultsSection = $('.input-sections');

            this.addSection();
            this.bindEvents();
        },

        bindEvents: function() {
            $('.input-section-add').on('click', $.proxy(this.addSection, this));
            $(document).on('click', '.input-section-remove', $.proxy(this.removeSection, this));
            $(document).on('change', '.input-section-modifiers select, .input-section-modifiers input', $.proxy(this.getPropertyNameAndValue, this));
        },

        addSection: function(e) {
            if (typeof e != 'undefined') {
                e.preventDefault();
            }
            this.resultsSection.append(tmpl('input_section_tmpl', this.dataObject));
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
                var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?myNewUrlQuery=1';
                window.history.pushState({path:newurl},'',newurl);
            }
        }

    }

    IT.Global.init();

})(jQuery, window, document);