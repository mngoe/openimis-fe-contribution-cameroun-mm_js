'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _extends = require('@babel/runtime/helpers/extends');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _inherits = require('@babel/runtime/helpers/inherits');
var _possibleConstructorReturn = require('@babel/runtime/helpers/possibleConstructorReturn');
var _getPrototypeOf = require('@babel/runtime/helpers/getPrototypeOf');
var React = require('react');
var feCore = require('@openimis/fe-core');
var styles$1 = require('@material-ui/core/styles');
var core = require('@material-ui/core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var messages_en = {
	"contributionCmr.Payment.paymentNumber": "Mobile Phone",
	"contributionCmr.Payment.operator": "Network operator",
	"contributionCmr.Payment.operator.O": "Orange Money",
	"contributionCmr.Payment.operator.M": "MTN Mobile money",
	"contributionCmr.Payment.operator.null": "Any"
};

var messages_fr = {
	"contributionCmr.Payment.paymentNumber": "Numéro de téléphone",
	"contributionCmr.Payment.operator": "Opérateur réseau",
	"contributionCmr.Payment.operator.O": "Orange Money",
	"contributionCmr.Payment.operator.M": "MTN Mobile money",
	"contributionCmr.Payment.operator.null": "Tout"
};

var PAYMENT_OPERATORS = ["O", "M"];

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }
function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var PaymentOperatorPicker = /*#__PURE__*/function (_Component) {
  _inherits__default["default"](PaymentOperatorPicker, _Component);
  var _super = _createSuper$1(PaymentOperatorPicker);
  function PaymentOperatorPicker() {
    _classCallCheck__default["default"](this, PaymentOperatorPicker);
    return _super.apply(this, arguments);
  }
  _createClass__default["default"](PaymentOperatorPicker, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default["default"].createElement(feCore.ConstantBasedPicker, _extends__default["default"]({
        module: "contributionCmr",
        label: "Payment.operator",
        constants: PAYMENT_OPERATORS
      }, this.props));
    }
  }]);
  return PaymentOperatorPicker;
}(React.Component);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var styles = function styles(theme) {
  return {
    tableTitle: theme.table.title,
    item: theme.paper.item
  };
};
var PaymentMobile = /*#__PURE__*/function (_Component) {
  _inherits__default["default"](PaymentMobile, _Component);
  var _super = _createSuper(PaymentMobile);
  function PaymentMobile() {
    _classCallCheck__default["default"](this, PaymentMobile);
    return _super.apply(this, arguments);
  }
  _createClass__default["default"](PaymentMobile, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        classes = _this$props.classes,
        edited = _this$props.edited,
        readOnly = _this$props.readOnly,
        required = _this$props.required,
        updateAttribute = _this$props.updateAttribute;
      return /*#__PURE__*/React__default["default"].createElement(core.Grid, {
        container: true
      }, /*#__PURE__*/React__default["default"].createElement(core.Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React__default["default"].createElement(feCore.PublishedComponent, {
        pubRef: "contributionCmr.PaymentOperatorPicker",
        withNull: true,
        required: required,
        readOnly: readOnly,
        value: !edited ? "" : edited.networkOperator,
        onChange: function onChange(c) {
          return updateAttribute('networkOperator', c);
        }
      })), /*#__PURE__*/React__default["default"].createElement(core.Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React__default["default"].createElement(feCore.NumberInput, {
        module: "contributionCmr",
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
}(React.Component);
var PaymentMobile$1 = styles$1.withTheme(styles$1.withStyles(styles)(PaymentMobile));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var DEFAULT_CONFIG = {
  "translations": [{
    key: "en",
    messages: messages_en
  }, {
    key: "fr",
    messages: messages_fr
  }],
  "refs": [{
    key: "contributionCmr.PaymentOperatorPicker",
    ref: PaymentOperatorPicker
  }]
};
var ContributionCmrModule = function ContributionCmrModule(cfg) {
  return _objectSpread(_objectSpread({}, DEFAULT_CONFIG), cfg);
};

exports.ContributionCmrModule = ContributionCmrModule;
exports.PaymentMobile = PaymentMobile$1;
//# sourceMappingURL=index.js.map
