(function($, window, document) {

    window.IT = window.IT || {};

    IT.Global = {

        init: function() {
            
            this.inputValues = {
                "type": "text",
                "pattern": "",
                "required": "required",
                "value": ""
            };

            this.resultsSection = $('.input-sections');

            var urlParams = this.getUrlParameter('inputs')
            if ((urlParams != null) && (urlParams.length > 0)) {
                this.dataObject = JSON.parse(urlParams);
                $.extend(this.inputValues, this.dataObject);
            }


            for (var i = 0; i < this.dataObject.length; i++) {
                this.addSection(this.dataObject[i]);
            }
            
            this.bindFastClick();
            this.bindEvents();
        },

        bindFastClick: function() {
            $(function() {
                FastClick.attach(document.body);
            });
        },

        bindEvents: function() {
            $('.input-section-add').on('click', $.proxy(this.onAddClick, this));
            $(document).on('click', '.input-section-remove', $.proxy(this.removeSection, this));
            $(document).on('change', '.input-section-modifiers select, .input-section-modifiers input', $.proxy(this.getPropertyNameAndValue, this));
        },

        onAddClick: function(e) {
            e.preventDefault();
            this.addSection(this.dataObject[0]);
        },

        addSection: function(inputObject) {
            console.log(inputObject);
            for (var key in inputObject) {
                if (inputObject.hasOwnProperty(key)) {
                    var obj = inputObject[key];
                    for (var prop in obj) {
                        if (obj.hasOwnProperty(prop)) {
                            alert(prop + " = " + obj[prop]);
                        }
                    }
                }
            }
            // this.resultsSection.append(tmpl('input_section_tmpl', inputObject));
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

        getUrlParameter: function(name) {
            var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        },

    }

    IT.Global.init();

})(jQuery, window, document);