(function(window, document) {

    window.IT = window.IT || {};

    IT.Global = {

        init: function() {
            this.resultsSection = document.querySelector('.input-sections');
            this.inputSectionsForm = document.querySelector('.input-sections-form');
            this.inputSectionTemplate = tmpl("input_section_template");
            this.messageContainer = document.querySelector('.messages');
            this.welcomeMessageAlreadyLoaded = false;
            this.defaultInputValues = {
                "pattern": "",
                "placeholder": "",
                "required": "",
                "type": "",
                "value": ""
            };
            this.defaultTypes = [
                "text",
                "number",
                "tel"
            ];
            this.allowedInputAttributes = [
                'type',
                'step',
                'placeholder',
                'step',
                'required',
                'pattern'
            ];

            this.addSection(this.buildInputData(true), false, false);
            this.bindEvents();
        },

        bindFastClick: function() {
            FastClick.attach(document.body);           
        },

        bindEvents: function() {
            this.bindFastClick();
            var self = this;

            var inputSectionAddButton = document.querySelector('.input-section-add');
            inputSectionAddButton.addEventListener('click', function(e) {
                self.onAddClick(e);
            });
            
            this.inputSectionsForm.addEventListener('submit', function(e) {
                self.onSuccessfulFormSubmit(e);
            });

            document.addEventListener('click', function(e) {
                self._onDocumentClick(e);
            });

            document.addEventListener('change', function(e) {
                self._onDocumentChange(e);
            });

        },

        _onDocumentClick: function(e) {
            var classList = e.target.classList;
            if(classList.contains('input-section-remove'))
                this.removeSection(e);
        },

        _onDocumentChange: function(e) {
            var classList = e.target.classList;
            if(classList.contains('input-section-modifier-type') || 
                classList.contains('input-section-modifier-pattern') || 
                classList.contains('input-section-required'))
                this.getPropertyNameAndValue(e);
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
            this.addSection(this.buildInputData(), true, true);
        },

        addSection: function(data, prepend, addToUrl) {
            var inputSectionsHtml = '';

            for (var i = 0; i < data.length; i++) {
                var inputSectionHtml = this.inputSectionTemplate(data[i]);
                if (prepend) {
                    inputSectionsHtml = inputSectionHtml + inputSectionsHtml;
                } else {
                    inputSectionsHtml += inputSectionHtml;
                }
            }

            var insertPosition = prepend ? 'afterbegin' : 'beforeend';

            this.resultsSection.insertAdjacentHTML(insertPosition, inputSectionsHtml);

            if (addToUrl != false) {
                this.buildNewUrl();
            }
        },

        removeSection: function(e) {
            e.preventDefault();
            var inputSection = this._getParent(e.target, 'input-section');
            inputSection.parentNode.removeChild(inputSection);
            this.buildNewUrl();
        },

        getPropertyNameAndValue: function(e) {
            var element = e.target;
            var modifierProperties = {};
            modifierProperties.name = element.getAttribute('name');
            if (element.getAttribute('type') == 'checkbox') {
                if (!element.checked) {
                    modifierProperties.value = '';
                } else {
                    modifierProperties.value = 'required';
                }
            } else {
                modifierProperties.value = element.value;
            }
            this.applyPropertyChange(element, modifierProperties);
        },

        applyPropertyChange: function(element, properties) {
            var inputSection = this._getParent(element, 'input-section');
            var input = inputSection.querySelector('.input');
            var output = inputSection.querySelector('.input-output');
            if (properties.value == '') {
                input.removeAttribute(properties.name);
            }
            else {
                input.setAttribute(properties.name,properties.value);
            }
            var inputMarkup = input.outerHTML;
            inputMarkup = inputMarkup.replace('<','&lt;');
            inputMarkup = inputMarkup.replace('>','&gt;');
            inputMarkup = inputMarkup.replace(' class="input"', '');
            inputMarkup = inputMarkup.replace('/(style="([^"]*)")/','');
            output.innerHTML = inputMarkup;
            this.buildNewUrl();
            
        },

        buildNewUrl: function() {
            if (history.pushState) {
                var allInputs = this.resultsSection.querySelectorAll('.input');
                var allInputValues = [];

                for(var i = 0; i < allInputs.length; i++) {
                    var inputVals = {};
                    var input = allInputs[i];
                    var atts = input.attributes;

                    for(var j = 0; j < atts.length; j++){
                        var att = atts[j];
                        if (this.allowedInputAttributes.indexOf(att.name) != -1) {                            
                            if (att.name == 'required') {
                                inputVals[att.name] = 'required';
                            } else {
                                inputVals[att.name] = att.value;
                            }
                        }
                    }
                    allInputValues.push(inputVals);
                }
                
                var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                if (allInputValues.length > 0) {
                    newUrl = newUrl + '?inputs=' + encodeURIComponent(JSON.stringify(allInputValues));
                }
                window.history.pushState({path:newUrl},'',newUrl);
            }
        },

        onSuccessfulFormSubmit: function(e) {
            e.preventDefault();
            this.showMessage('Form submitted; no validation errors.');
        },

        showMessage: function(message) {
            this.messageContainer.innerHTML = message + '<br>';
            this.messageContainer.classList.add('active');
            var self = this;
            setTimeout(function(errorContainer) {
                  self.messageContainer.classList.remove('active');
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
                this.showMessage('The JSON in your URL is invalid.');
            }

            return false;
        },

        _getParent: function(element, className) {
            for ( ; element && element !== document; element = element.parentNode ) {
                if ( element.classList.contains(className) ) {
                    return element;
                }
            }

            return null;
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

})(window, document);