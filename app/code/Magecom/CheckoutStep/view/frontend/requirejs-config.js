var config = {
        'config': {
            'mixins': {
                'Magento_Checkout/js/view/shipping': {
                    'Magecom_CheckoutStep/js/view/shipping-payment-mixin': true
                },
                'Magento_Checkout/js/view/payment': {
                    'Magecom_CheckoutStep/js/view/shipping-payment-mixin': true
                }
            }
        }
        }