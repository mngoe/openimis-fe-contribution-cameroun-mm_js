import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _extends from '@babel/runtime/helpers/extends';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _inherits from '@babel/runtime/helpers/inherits';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import React, { Component } from 'react';
import { ConstantBasedPicker, PublishedComponent, NumberInput } from '@openimis/fe-core';
import { withTheme, withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

var messages_en = {
	"paymentCmr.Payment.paymentNumber": "Mobile Phone",
	"paymentCmr.Payment.operator": "Network operator",
	"paymentCmr.Payment.operator.O": "Orange Money",
	"paymentCmr.Payment.operator.M": "MTN Mobile money",
	"paymentCmr.Payment.operator.null": "Any"
};

var messages_fr = {
	"paymentCmr.Payment.paymentNumber": "Numéro de téléphone",
	"paymentCmr.Payment.operator": "Opérateur réseau",
	"paymentCmr.Payment.operator.O": "Orange Money",
	"paymentCmr.Payment.operator.M": "MTN Mobile money",
	"paymentCmr.Payment.operator.null": "Tout"
};

var PAYMENT_OPERATORS = ["O", "M"];

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var PaymentOperatorPicker = /*#__PURE__*/function (_Component) {
  _inherits(PaymentOperatorPicker, _Component);
  var _super = _createSuper$1(PaymentOperatorPicker);
  function PaymentOperatorPicker() {
    _classCallCheck(this, PaymentOperatorPicker);
    return _super.apply(this, arguments);
  }
  _createClass(PaymentOperatorPicker, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(ConstantBasedPicker, _extends({
        module: "paymentCmr",
        label: "Payment.operator",
        constants: PAYMENT_OPERATORS
      }, this.props));
    }
  }]);
  return PaymentOperatorPicker;
}(Component);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var styles = function styles(theme) {
  return {
    tableTitle: theme.table.title,
    item: theme.paper.item
  };
};
var PaymentMobile = /*#__PURE__*/function (_Component) {
  _inherits(PaymentMobile, _Component);
  var _super = _createSuper(PaymentMobile);
  function PaymentMobile() {
    _classCallCheck(this, PaymentMobile);
    return _super.apply(this, arguments);
  }
  _createClass(PaymentMobile, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        classes = _this$props.classes,
        edited = _this$props.edited,
        readOnly = _this$props.readOnly,
        required = _this$props.required,
        updateAttribute = _this$props.updateAttribute;
      return /*#__PURE__*/React.createElement(Grid, {
        container: true
      }, /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React.createElement(PublishedComponent, {
        pubRef: "paymentCmr.PaymentOperatorPicker",
        withNull: true,
        required: required,
        readOnly: readOnly,
        value: !edited ? "" : edited.operator,
        onChange: function onChange(c) {
          return updateAttribute('operator', c);
        }
      })), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React.createElement(NumberInput, {
        module: "paymentCmr",
        label: "Payment.paymentNumber",
        required: required,
        readOnly: readOnly,
        value: !!edited && !!edited.paymentNumber ? edited.paymentNumber : "",
        onChange: function onChange(v) {
          return updateAttribute("paymentNumber", v);
        }
      })));
    }
  }]);
  return PaymentMobile;
}(Component);
var PaymentMobile$1 = withTheme(withStyles(styles)(PaymentMobile));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var DEFAULT_CONFIG = {
  "translations": [{
    key: "en",
    messages: messages_en
  }, {
    key: "fr",
    messages: messages_fr
  }],
  "refs": [{
    key: "paymentCmr.PaymentOperatorPicker",
    ref: PaymentOperatorPicker
  }]
};
var PaymentCmrModule = function PaymentCmrModule(cfg) {
  return _objectSpread(_objectSpread({}, DEFAULT_CONFIG), cfg);
};

export { PaymentCmrModule, PaymentMobile$1 as PaymentMobile };
//# sourceMappingURL=index.es.js.map
