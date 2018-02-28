/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define(
    [
        'ko',
        'uiComponent',
        'underscore',
        'Magento_Checkout/js/model/step-navigator'
    ],
    function (
        ko,
        Component,
        _,
        stepNavigator
    ) {
        'use strict';
        return Component.extend({
            defaults: {
                template: 'Magecom_CheckoutStep/mystep'
            },

            //add here your logic to display step,
            isVisible: ko.observable(true),

            /**
             *
             * @returns {*}
             */
            initialize: function () {
                this._super();

                /*this.customerFirstName = ko.observable();
                this.customerPhone = ko.observable();
                this.customerDataYear = ["1999","2000","2001"];
                this.customerYear = ko.observable();
                this.validationKey = ko.observableArray();
                this.fullName = ko.computed(function(){
                    return this.customerFirstName() + " " + this.customerPhone();
                }, this);

                var self = this;
                this.validationKey = function () {
                    if(self.customerFirstName() != "" && self.customerPhone() != ""){
                        return true;
                    }
                };*/




                stepNavigator.registerStep(
                    'step_age',
                    null,
                    'Step Age',
                    this.isVisible,
                    _.bind(this.navigate, this),
                    1
                );


                return this;
            },
            navigate: function () {

            },

            navigateToNextStep: function () {
                stepNavigator.next();
                /*console.log(this.customerPhone());
                if (this.validationKey() == true){
                    stepNavigator.next();
                    console.log('no disabled');
                } else {
                    console.log('disabled');
                }*/
            }
        });
        /*return ComponentForm.extend({
            initialize: function () {
                this._super();
                // component initialization logic
                return this;
            },

            /!**
             * Form submit handler
             *
             * This method can have any name.
             *!/
            onSubmit: function() {
                // trigger form validation
                this.source.set('params.invalid', false);
                this.source.trigger('customCheckoutForm.data.validate');

                // verify that form data is valid
                if (!this.source.get('params.invalid')) {
                    // data is retrieved from data provider by value of the customScope property
                    var formData = this.source.get('customCheckoutForm');
                    // do something with form data
                    console.dir(formData);
                }
            }
        });*/
    }
);