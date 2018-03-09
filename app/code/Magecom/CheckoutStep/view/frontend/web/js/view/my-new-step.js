/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define(
    [
        'ko',
        'jquery',
        'uiComponent',
        'underscore',
        'Magento_Checkout/js/model/step-navigator',
        'Magento_Checkout/js/model/quote',
        'mage/validation',
        'mage/translate' // Magento text translate (Validation message translte as per language)
    ],
    function (
        ko,
        $,
        Component,
        _,
        stepNavigator,
        quote,
        mageValidation
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

                this.customerFirstName = ko.observable();
                this.customerPhone = ko.observable();
                this.customerDataYear = ["1999","2000","2001"];
                this.customerYear = ko.observable();
                this.validationKey = ko.observableArray();
                this.values = ko.computed(function(){
                    return this.customerFirstName() + " " + this.customerPhone();
                }, this);

                var self = this;
                this.validationKey = function () {
                    if(self.customerFirstName() != "" && self.customerPhone() != ""){
                        return true;
                    }
                };

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


            /*validateFormMy: function () {
                var VAL = this.customerFirstName();

                    VAL.match(/^[A-Z\s-.]+$/) ? (
                        console.log(this.customerFirstName() + ' validate')
                    ) : (
                        console.log(this.customerFirstName() + ' no')
                    );


                    console.log(VAL);

                    return console.log(VAL);
            },*/



            /* Validation Form*/
            validateForm: function (formElem) {
                /*$(form).validation() && $(form).validation('isValid');
               return ;*/
                _.filter(
                    $(formElem),
                    function(formElem){
                        var dataValid = formElem.getAttribute('data-valid');
                        valid(dataValid, formElem);

                       // return $(formElem);
                    });

                function valid (dataValid, formElem){
                    switch (dataValid) {
                        case 'name':
                            var valInput = $(formElem).val();
                            var errorMessage = 'Invalid name';
                            if (!(valInput.replace(/^[A-Z\s-.]+$/))){
                                $(formElem).after('<span class="error">' + errorMessage + '</span>');
                            } else {
                                $(formElem).next().remove();
                            }
                            break;
                        case 'phone':
                            var valInput = $(formElem).val();
                            var errorMessage = 'Invalid phone number';
                            if (!(valInput.replace(/^((8|\+7|\+3)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/))){
                                $(formElem).after('<span class="error">' + errorMessage + '</span>');
                            } else {
                                $(formElem).next().remove();
                            }
                            break;
                        case 'age':
                            var myDate = new Date();
                            var year = myDate.getFullYear();
                            var selectVal = $(formElem).val();
                            var ageUser = function () {
                                if(selectVal == ""){
                                    return 0;
                                } else {
                                    return year-selectVal;
                                }
                            };
                            var errorMessage = '< 18 years';

                            if(ageUser() < 18){
                                $(formElem).after('<span class="error">' + errorMessage + '</span>');
                            }else{
                                $(formElem).next().remove();
                            }
                            break;
                        default:
                            console.log( 'hasnt regular rule' );
                    }
                }

            },


            navigateToNextStep: function () {
                // trigger form validation
                /*debugger*/

                 if (!this.validateForm('#custom-checkout-form .required')) {
                      /*this.validateFormMy();*/
                        //return stepNavigator.next();
                }

                //stepNavigator.next();


            }
        });

    }
);