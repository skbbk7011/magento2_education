var config = {
    'config': {
        'mixins': {
            'Magento_Checkout/js/view/shipping': {
                'Vendor_Module/js/view/shipping-payment-mixin': true
            },
            'Magento_Checkout/js/view/payment': {
                'Vendor_Module/js/view/shipping-payment-mixin': true
            }
        }
    }


