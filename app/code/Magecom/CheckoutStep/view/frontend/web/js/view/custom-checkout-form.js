
/*global define*/
/*
define([
    'Magento_Ui/js/form/form'
], function(Component) {
    'use strict';
    return Component.extend({
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
    });
});*/


define(
    [
        'ko',
        'uiComponent',
        'underscore',
        'Magento_Checkout/js/model/step-navigator',
        'Magento_Ui/js/form/form'
    ],
    function (
        ko,
        Component,
        _,
        stepNavigator,
        ComponentForm
    ) {
        'use strict';
        /**
         *
         * mystep - is the name of the component's .html template,
         * <Vendor>_<Module>  - is the name of the your module directory.
         *
         */
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
                // register your step
                stepNavigator.registerStep(
                    //step code will be used as step content id in the component template
                    'step_age',
                    //step alias
                    null,
                    //step title value
                    'Identification Age',
                    //observable property with logic when display step or hide step
                    this.isVisible,

                    _.bind(this.navigate, this),

                    /**
                     * sort order value
                     * 'sort order value' < 10: step displays before shipping step;
                     * 10 < 'sort order value' < 20 : step displays between shipping and payment step
                     * 'sort order value' > 20 : step displays after payment step
                     */
                    1
                );

                return this;
            },

            /**
             * The navigate() method is responsible for navigation between checkout step
             * during checkout. You can add custom logic, for example some conditions
             * for switching to your custom step
             */
            navigate: function () {

            },


            /**
             * @returns void
             */

            navigateToNextStep: function () {
                stepNavigator.next();
            }
        });
        return ComponentForm.extend({
            initialize: function () {
                this._super();
                // component initialization logic
                return this;
            },

            /**
             * Form submit handler
             *
             * This method can have any name.
             */
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
                Component.stepNavigator.next();
            }
        })

    }
);