define(
    [
        'ko',
        'Magento_Ui/js/form/form',
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
            /**
             * Validate something
             *
             * @returns {boolean}
             *
             */

            initialize: function () {
                this._super();

                return this;

            },

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
            },

            validate: function() {
                //Put your validation logic here
                return true;
            }
        })
    }
);