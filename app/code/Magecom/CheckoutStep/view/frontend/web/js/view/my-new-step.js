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
        /**
         *
         * newcheckout - is the name of the component's .html template,
         * MD_Newcheckoutstep  - is the name of the your module directory.
         *
         */
        return Component.extend({
            defaults: {
                template: 'Magecom_CheckoutStep/mystep'
            },

            //add here your logic to display step,
            // I have given false here so that is will no merge with other step
            // if you make it true sometime happens that is merge with shipping step.
            visible: ko.observable(quote.isVirtual()),

            /**
             *
             * @returns {*}
             */
            initialize: function () {
                this._super();
                // register your step
                stepNavigator.registerStep(
                    //step code will be used as step content id in the component template
                    'newcheckoutstep',
                    //step alias
                    null,
                    //step title value
                    'New Checkout Step',
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
                self.visible(true);
            },

            /**
             * @returns void
             */
            navigateToNextStep: function () {
                stepNavigator.next();
            }
        });
    }
);