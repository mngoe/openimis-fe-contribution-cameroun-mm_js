import React, { Component } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import {
    Grid,
} from "@material-ui/core";
import {
    NumberInput,
    PublishedComponent,
} from "@openimis/fe-core";

const styles = theme => ({
    tableTitle: theme.table.title,
    item: theme.paper.item,
});



class PaymentMobile extends Component {
    
    render() {
        const { classes, edited, readOnly, required, updateAttribute } = this.props;
        return (
            <Grid container>
                <Grid item xs={3} className={classes.item}>
                    <PublishedComponent
                        pubRef="contributionCmr.PaymentOperatorPicker"
                        withNull={true}
                        required={required}
                        readOnly={readOnly}
                        value={!edited ? "" : edited.networkOperator}
                        onChange={c => updateAttribute('networkOperator', c)}
                    />
                </Grid>
                <Grid item xs={3} className={classes.item}>
                    <NumberInput
                        module="contributionCmr"
                        label="Payment.paymentNumber"
                        required={required}
                        readOnly={readOnly}
                        value={!!edited && !!edited.paymentNumber ? edited.paymentNumber : ""}
                        onChange={(v) => updateAttribute("paymentNumber", v)}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default withTheme(withStyles(styles)(PaymentMobile));