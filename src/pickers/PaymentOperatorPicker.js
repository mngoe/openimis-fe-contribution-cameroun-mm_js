import React, { Component } from "react";
import { ConstantBasedPicker } from "@openimis/fe-core";

import { PAYMENT_OPERATORS } from "../constants";

class PaymentOperatorPicker extends Component {

    render() {
        return <ConstantBasedPicker
            module="paymentCmr"
            label="Payment.operator"
            constants={PAYMENT_OPERATORS}
            {...this.props}
        />
    }
}

export default PaymentOperatorPicker;