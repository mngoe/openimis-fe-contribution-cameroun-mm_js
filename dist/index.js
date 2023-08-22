'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _extends = require('@babel/runtime/helpers/extends');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _inherits = require('@babel/runtime/helpers/inherits');
var _possibleConstructorReturn = require('@babel/runtime/helpers/possibleConstructorReturn');
var _getPrototypeOf = require('@babel/runtime/helpers/getPrototypeOf');
var React$1 = require('react');
var feCore = require('@openimis/fe-core');
var _assertThisInitialized = require('@babel/runtime/helpers/assertThisInitialized');
var reactIntl = require('react-intl');
var reactRedux = require('react-redux');
var redux = require('redux');
var styles$4 = require('@material-ui/core/styles');
var ReplayIcon = require('@material-ui/icons/Replay');
require('lodash');
require('lodash-uuid');
var core = require('@material-ui/core');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var icons = require('@material-ui/icons');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React$1);
var _assertThisInitialized__default = /*#__PURE__*/_interopDefaultLegacy(_assertThisInitialized);
var ReplayIcon__default = /*#__PURE__*/_interopDefaultLegacy(ReplayIcon);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

var RIGHT_CONTRIBUTION = 101301; // supposed to be 101300 ... but in practice
var RIGHT_CONTRIBUTION_EDIT = 101303;
var PAYMENT_OPERATORS = ["O", "M"];

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }
function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var PaymentOperatorPicker = /*#__PURE__*/function (_Component) {
  _inherits__default["default"](PaymentOperatorPicker, _Component);
  var _super = _createSuper$4(PaymentOperatorPicker);
  function PaymentOperatorPicker() {
    _classCallCheck__default["default"](this, PaymentOperatorPicker);
    return _super.apply(this, arguments);
  }
  _createClass__default["default"](PaymentOperatorPicker, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default["default"].createElement(feCore.ConstantBasedPicker, _extends__default["default"]({
        module: "contribution",
        label: "Payment.operator",
        constants: PAYMENT_OPERATORS
      }, this.props));
    }
  }]);
  return PaymentOperatorPicker;
}(React$1.Component);

var messages_en = {
	"contribution.Payment.paymentNumber": "Mobile Phone",
	"contribution.Payment.operator": "Network operator",
	"contribution.Payment.operator.O": "Orange Money",
	"contribution.Payment.operator.M": "MTN Mobile money",
	"contribution.Payment.operator.null": "Any"
};

var messages_fr = {
	"contribution.Payment.paymentNumber": "Numéro de téléphone",
	"contribution.Payment.operator": "Opérateur réseau",
	"contribution.Payment.operator.O": "Orange Money",
	"contribution.Payment.operator.M": "MTN Mobile money",
	"contribution.Payment.operator.null": "Tout"
};

var CONTRIBUTION_FULL_PROJECTION = function CONTRIBUTION_FULL_PROJECTION(mm) {
  return ["id", "uuid", "payDate", "amount", "payType", "receipt", "isPhotoFee", "clientMutationId", "payer".concat(mm.getProjection("payer.PayerPicker.projection")), "policy".concat(mm.getProjection("policy.PolicyPicker.projection")), "networkOperator", "paymentNumber"];
};
function formatContributionGQL(mm, contribution) {
  var req = "\n      ".concat(contribution.uuid !== undefined && contribution.uuid !== null ? "uuid: \"".concat(contribution.uuid, "\"") : '', "\n      ").concat(!!contribution.receipt ? "receipt: \"".concat(feCore.formatGQLString(contribution.receipt), "\"") : "", "\n      ").concat(!!contribution.payDate ? "payDate: \"".concat(contribution.payDate, "\"") : "", "\n      ").concat(!!contribution.payType ? "payType: \"".concat(contribution.payType, "\"") : "", "\n      ", "isPhotoFee: ".concat(contribution.isPhotoFee), "\n      ").concat(!!contribution.action ? "action: \"".concat(contribution.action, "\"") : "", "\n      ").concat(!!contribution.amount ? "amount: \"".concat(contribution.amount, "\"") : "", "\n      ").concat(!!contribution.payer ? "payerUuid: \"".concat(contribution.payer.uuid, "\"") : "", "\n      ").concat(!!contribution.jsonExt ? "jsonExt: ".concat(feCore.formatJsonField(contribution.jsonExt)) : "", "\n      ").concat(!!contribution.policy ? "policyUuid: \"".concat(feCore.formatGQLString(contribution.policy.uuid), "\"") : "", "\n      ").concat(!!contribution.networkOperator ? "networkOperator: \"".concat(contribution.networkOperator, "\"") : "", "\n      ").concat(!!contribution.paymentNumber ? "paymentNumber: \"".concat(contribution.paymentNumber, "\"") : "", "\n    ");
  return req;
}
function fetchPolicySummary(mm, policyUuid) {
  var filters = [];
  if (!!policyUuid) {
    filters.push("uuid: \"".concat(policyUuid, "\""));
  }
  var payload = feCore.formatPageQuery("policies", filters, ["id", "uuid", "startDate", "product{name}", "expiryDate", "value"]);
  return feCore.graphql(payload, 'CONTRIBUTION_POLICY_SUMMARY');
}
function fetchContribution(mm, contributionUuid, clientMutationId) {
  var filters = [];
  if (!!contributionUuid) {
    filters.push("uuid: \"".concat(contributionUuid, "\""));
  } else if (!!clientMutationId) {
    filters.push("clientMutationId: \"".concat(clientMutationId, "\""));
  }
  var payload = feCore.formatPageQuery("premiums", filters, CONTRIBUTION_FULL_PROJECTION(mm));
  return feCore.graphql(payload, 'CONTRIBUTION_OVERVIEW', {
    clientMutationId: !contributionUuid && clientMutationId
  });
}
function newContribution() {
  return function (dispatch) {
    dispatch({
      type: 'CONTRIBUTION_NEW'
    });
  };
}
function createContribution(mm, contribution, clientMutationLabel) {
  var mutation = feCore.formatMutation("createPremium", formatContributionGQL(mm, contribution), clientMutationLabel);
  var requestedDateTime = new Date();
  return feCore.graphql(mutation.payload, ['CONTRIBUTION_MUTATION_REQ', 'CONTRIBUTION_CREATE_RESP', 'CONTRIBUTION_MUTATION_ERR'], {
    clientMutationId: mutation.clientMutationId,
    clientMutationLabel: clientMutationLabel,
    requestedDateTime: requestedDateTime
  });
}
function updateContribution(mm, contribution, clientMutationLabel) {
  var mutation = feCore.formatMutation("updatePremium", formatContributionGQL(mm, contribution), clientMutationLabel);
  var requestedDateTime = new Date();
  return feCore.graphql(mutation.payload, ['CONTRIBUTION_MUTATION_REQ', 'CONTRIBUTION_UPDATE_RESP', 'CONTRIBUTION_MUTATION_ERR'], {
    clientMutationId: mutation.clientMutationId,
    clientMutationLabel: clientMutationLabel,
    requestedDateTime: requestedDateTime,
    contributionUuid: contribution.uuid
  });
}

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }
function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var styles$3 = function styles(theme) {
  return {
    tableTitle: theme.table.title,
    item: theme.paper.item,
    fullHeight: {
      height: "100%"
    }
  };
};
var ContributionMasterPanel = /*#__PURE__*/function (_FormPanel) {
  _inherits__default["default"](ContributionMasterPanel, _FormPanel);
  var _super = _createSuper$3(ContributionMasterPanel);
  function ContributionMasterPanel() {
    _classCallCheck__default["default"](this, ContributionMasterPanel);
    return _super.apply(this, arguments);
  }
  _createClass__default["default"](ContributionMasterPanel, [{
    key: "render",
    value: function render() {
      var _this = this;
      var _this$props = this.props,
        classes = _this$props.classes,
        edited = _this$props.edited,
        readOnly = _this$props.readOnly;
      return /*#__PURE__*/React__default["default"].createElement(React$1.Fragment, null, !!edited && !!edited.policy && !!edited.policy.value && /*#__PURE__*/React__default["default"].createElement(core.Grid, {
        container: true,
        className: classes.item
      }, /*#__PURE__*/React__default["default"].createElement(core.Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React__default["default"].createElement(feCore.TextInput, {
        module: "contribution",
        label: "contribution.policy.name",
        readOnly: true,
        value: edited.policy.product && edited.policy.product.name || ""
      })), /*#__PURE__*/React__default["default"].createElement(core.Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React__default["default"].createElement(feCore.AmountInput, {
        module: "contribution",
        label: "contribution.policy.value",
        required: true,
        readOnly: true,
        value: edited.policy.value || ""
      })), /*#__PURE__*/React__default["default"].createElement(core.Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React__default["default"].createElement(feCore.PublishedComponent, {
        pubRef: "core.DatePicker",
        value: edited.policy.startDate || "",
        module: "contribution",
        label: "contribution.policy.startDate",
        readOnly: true
      })), /*#__PURE__*/React__default["default"].createElement(core.Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React__default["default"].createElement(feCore.PublishedComponent, {
        pubRef: "core.DatePicker",
        value: edited.policy.expiryDate || "",
        module: "contribution",
        label: "contribution.policy.expiryDate",
        readOnly: true
      }))), /*#__PURE__*/React__default["default"].createElement(core.Grid, {
        container: true,
        className: classes.item
      }, /*#__PURE__*/React__default["default"].createElement(core.Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React__default["default"].createElement(feCore.PublishedComponent, {
        pubRef: "core.DatePicker",
        value: !edited ? "" : edited.payDate,
        module: "contribution",
        required: true,
        label: "contribution.payDate",
        readOnly: readOnly,
        onChange: function onChange(c) {
          return _this.updateAttribute('payDate', c);
        }
      })), /*#__PURE__*/React__default["default"].createElement(core.Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React__default["default"].createElement(feCore.PublishedComponent, {
        pubRef: "payer.PayerPicker",
        withNull: true,
        readOnly: readOnly,
        value: !edited ? "" : edited.payer,
        onChange: function onChange(p) {
          return _this.updateAttribute('payer', p);
        }
      })), /*#__PURE__*/React__default["default"].createElement(core.Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React__default["default"].createElement(feCore.AmountInput, {
        module: "contribution",
        label: "contribution.amount",
        required: true,
        readOnly: readOnly,
        value: !edited ? "" : edited.amount,
        onChange: function onChange(c) {
          return _this.updateAttribute('amount', c);
        }
      })), /*#__PURE__*/React__default["default"].createElement(core.Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React__default["default"].createElement(feCore.PublishedComponent, {
        pubRef: "contribution.PremiumPaymentTypePicker",
        withNull: true,
        required: true,
        readOnly: readOnly,
        value: !edited ? "" : edited.payType,
        onChange: function onChange(c) {
          return _this.updateAttribute('payType', c);
        }
      })), !!edited && edited.payType == 'M' && /*#__PURE__*/React__default["default"].createElement(core.Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React__default["default"].createElement(feCore.PublishedComponent, {
        pubRef: "contribution.PaymentOperatorPicker",
        withNull: true,
        required: true,
        readOnly: readOnly,
        value: !edited ? "" : edited.networkOperator,
        onChange: function onChange(c) {
          return _this.updateAttribute('networkOperator', c);
        }
      })), !!edited && edited.payType == 'M' && /*#__PURE__*/React__default["default"].createElement(core.Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React__default["default"].createElement(feCore.NumberInput, {
        module: "contribution",
        label: "Payment.paymentNumber",
        required: true,
        readOnly: readOnly,
        value: !!edited && !!edited.paymentNumber ? edited.paymentNumber : "",
        onChange: function onChange(v) {
          return _this.updateAttribute("paymentNumber", v);
        }
      })), /*#__PURE__*/React__default["default"].createElement(core.Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React__default["default"].createElement(feCore.TextInput, {
        module: "contribution",
        label: "contribution.receipt",
        required: true,
        readOnly: readOnly,
        value: !edited ? "" : edited.receipt,
        onChange: function onChange(c) {
          return _this.updateAttribute('receipt', c);
        }
      })), /*#__PURE__*/React__default["default"].createElement(core.Grid, {
        item: true,
        xs: 3,
        className: classes.item
      }, /*#__PURE__*/React__default["default"].createElement(feCore.PublishedComponent, {
        pubRef: "contribution.PremiumCategoryPicker",
        withNull: false,
        readOnly: readOnly,
        value: edited && edited.isPhotoFee ? 'photoFee' : 'contribution',
        onChange: function onChange(c) {
          return _this.updateAttribute('isPhotoFee', c === 'photoFee');
        }
      }))));
    }
  }]);
  return ContributionMasterPanel;
}(feCore.FormPanel);
var ContributionMasterPanel$1 = feCore.withModulesManager(feCore.withHistory(reactIntl.injectIntl(styles$4.withTheme(styles$4.withStyles(styles$3)(ContributionMasterPanel)))));

var styles$2 = function styles(theme) {
  return {
    primaryButton: theme.dialog.primaryButton,
    secondaryButton: theme.dialog.secondaryButton
  };
};
var SaveContributionDialog = function SaveContributionDialog(_ref) {
  var classes = _ref.classes,
    contribution = _ref.contribution,
    onCancel = _ref.onCancel,
    onConfirm = _ref.onConfirm;
  if (!contribution.policy || !contribution.policy.value) return null;
  var _useState = React$1.useState(1),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    step = _useState2[0],
    setStep = _useState2[1];
  var amount = parseInt(contribution.amount, 10);
  var policyValue = parseInt(contribution.policy.value, 10);
  return /*#__PURE__*/React__default["default"].createElement(core.Dialog, {
    open: !!contribution,
    onClose: onCancel
  }, /*#__PURE__*/React__default["default"].createElement(core.DialogTitle, null, /*#__PURE__*/React__default["default"].createElement(feCore.FormattedMessage, {
    module: "contribution",
    id: "saveContributionDialog.title"
  })), /*#__PURE__*/React__default["default"].createElement(core.DialogContent, null, amount < policyValue && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, step === 1 && /*#__PURE__*/React__default["default"].createElement(core.DialogContentText, null, /*#__PURE__*/React__default["default"].createElement(feCore.FormattedMessage, {
    module: "contribution",
    id: "saveContributionDialog.messageLower"
  })), step === 2 && /*#__PURE__*/React__default["default"].createElement(core.DialogContentText, null, /*#__PURE__*/React__default["default"].createElement(feCore.FormattedMessage, {
    module: "contribution",
    id: "saveContributionDialog.messageLowerConfirm"
  }))), amount >= policyValue && /*#__PURE__*/React__default["default"].createElement(core.DialogContentText, null, amount === policyValue && /*#__PURE__*/React__default["default"].createElement(feCore.FormattedMessage, {
    module: "contribution",
    id: "saveContributionDialog.messageEqual"
  }), amount > policyValue && /*#__PURE__*/React__default["default"].createElement(feCore.FormattedMessage, {
    module: "contribution",
    id: "saveContributionDialog.messageHigher"
  }))), /*#__PURE__*/React__default["default"].createElement(core.DialogActions, null, amount >= policyValue && /*#__PURE__*/React__default["default"].createElement(core.Button, {
    onClick: function onClick(e) {
      return onConfirm();
    },
    className: classes.primaryButton,
    autoFocus: true
  }, /*#__PURE__*/React__default["default"].createElement(feCore.FormattedMessage, {
    module: "contribution",
    id: "saveContributionDialog.ok.button"
  })), amount < policyValue && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, step === 1 && /*#__PURE__*/React__default["default"].createElement(core.Button, {
    onClick: function onClick(e) {
      return setStep(2);
    },
    className: classes.primaryButton,
    autoFocus: true
  }, /*#__PURE__*/React__default["default"].createElement(feCore.FormattedMessage, {
    module: "contribution",
    id: "saveContributionDialog.ok.button"
  })), step === 2 && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(core.Button, {
    onClick: function onClick(e) {
      return onConfirm('ENFORCE');
    },
    className: classes.primaryButton,
    autoFocus: true
  }, /*#__PURE__*/React__default["default"].createElement(feCore.FormattedMessage, {
    module: "contribution",
    id: "saveContributionDialog.yes.button"
  })), /*#__PURE__*/React__default["default"].createElement(core.Button, {
    onClick: function onClick(e) {
      return onConfirm('WAIT');
    },
    className: classes.primaryButton,
    autoFocus: true
  }, /*#__PURE__*/React__default["default"].createElement(feCore.FormattedMessage, {
    module: "contribution",
    id: "saveContributionDialog.no.button"
  })))), step === 1 && /*#__PURE__*/React__default["default"].createElement(core.Button, {
    onClick: onCancel,
    className: classes.secondaryButton
  }, /*#__PURE__*/React__default["default"].createElement(feCore.FormattedMessage, {
    module: "core",
    id: "cancel"
  }))));
};
var SaveContributionDialog$1 = reactIntl.injectIntl(styles$4.withTheme(styles$4.withStyles(styles$2)(SaveContributionDialog)));

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }
function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var styles$1 = function styles(theme) {
  return {
    lockedPage: theme.page.locked
  };
};
var CONTRIBUTION_OVERVIEW_MUTATIONS_KEY = "contribution.ContributionOverview.mutations";
var ContributionForm = /*#__PURE__*/function (_Component) {
  _inherits__default["default"](ContributionForm, _Component);
  var _super = _createSuper$2(ContributionForm);
  function ContributionForm() {
    var _this;
    _classCallCheck__default["default"](this, ContributionForm);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty__default["default"](_assertThisInitialized__default["default"](_this), "_newContribution", function () {
      return {
        isPhotoFee: false
      };
    });
    _defineProperty__default["default"](_assertThisInitialized__default["default"](_this), "state", {
      reset: 0,
      update: false,
      contribution: _this._newContribution(),
      newContribution: true,
      saveContribution: false
    });
    _defineProperty__default["default"](_assertThisInitialized__default["default"](_this), "reload", function () {
      var contribution = _this.state.contribution;
      _this.props.fetchContribution(_this.props.modulesManager, _this.state.contribution_uuid, contribution.clientMutationId);
    });
    _defineProperty__default["default"](_assertThisInitialized__default["default"](_this), "canSave", function () {
      var contribution = _this.state.contribution;
      if (!contribution || contribution && (!contribution.payDate || !contribution.payType || contribution.payType == 'M' && (!contribution.networkOperator || !contribution.paymentNumber) || !contribution.amount || !contribution.receipt || !contribution.policy || contribution.policy && !contribution.policy.uuid)) return false;
      return true;
    });
    _defineProperty__default["default"](_assertThisInitialized__default["default"](_this), "confirmSave", function () {
      _this.setState({
        saveContribution: true
      });
    });
    _defineProperty__default["default"](_assertThisInitialized__default["default"](_this), "_save", function (action) {
      _this.setState(function (prevState) {
        var contribution = prevState.contribution;
        if (!!action) {
          contribution.action = action;
        }
        _this.props.save(contribution);
        return {
          saveContribution: false
        };
      });
    });
    _defineProperty__default["default"](_assertThisInitialized__default["default"](_this), "onEditedChanged", function (contribution) {
      _this.setState({
        contribution: contribution,
        newContribution: false
      });
    });
    _defineProperty__default["default"](_assertThisInitialized__default["default"](_this), "onActionToConfirm", function (title, message, confirmedAction) {
      _this.setState({
        confirmedAction: confirmedAction
      }, _this.props.coreConfirm(title, message));
    });
    return _this;
  }
  _createClass__default["default"](ContributionForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
        contribution_uuid = _this$props.contribution_uuid,
        policy_uuid = _this$props.policy_uuid,
        modulesManager = _this$props.modulesManager,
        fetchContribution = _this$props.fetchContribution,
        fetchPolicySummary = _this$props.fetchPolicySummary;
      if (contribution_uuid) {
        this.setState(function (state, props) {
          return {
            contribution_uuid: props.contribution_uuid
          };
        }, function (e) {
          return fetchContribution(modulesManager, contribution_uuid);
        });
      }
      if (policy_uuid) {
        fetchPolicySummary(modulesManager, policy_uuid);
        this.setState({
          contribution: _objectSpread$1(_objectSpread$1({}, this._newContribution()), {}, {
            policy: {
              uuid: policy_uuid,
              value: undefined
            }
          })
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;
      if (!prevProps.fetchedContribution && !!this.props.fetchedContribution) {
        var contribution = this.props.contribution;
        this.setState({
          contribution: contribution,
          contribution_uuid: contribution.uuid,
          newContribution: false
        });
      } else if (prevProps.contribution_uuid && !this.props.contribution_uuid) {
        this.setState({
          contribution: this._newContribution(),
          newContribution: true,
          contribution_uuid: null
        });
      } else if (prevProps.submittingMutation && !this.props.submittingMutation) {
        this.props.journalize(this.props.mutation);
        this.setState(function (state, props) {
          return {
            contribution: _objectSpread$1(_objectSpread$1({}, state.contribution), {}, {
              clientMutationId: props.mutation.clientMutationId
            })
          };
        });
      } else if (prevProps.confirmed !== this.props.confirmed && !!this.props.confirmed && !!this.state.confirmedAction) {
        this.state.confirmedAction();
      }
      if (!prevProps.policySummary && !!this.props.policySummary) {
        this.setState(function (prevState) {
          return {
            contribution: _objectSpread$1(_objectSpread$1({}, prevState.contribution), {}, {
              policy: _this2.props.policySummary
            })
          };
        });
      }
    }
  }, {
    key: "_cancelSave",
    value: function _cancelSave() {
      var update = this.state.update;
      this.setState({
        saveContribution: false,
        update: !update
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props2 = this.props,
        modulesManager = _this$props2.modulesManager,
        classes = _this$props2.classes,
        state = _this$props2.state,
        rights = _this$props2.rights,
        contribution_uuid = _this$props2.contribution_uuid,
        fetchingContribution = _this$props2.fetchingContribution,
        fetchedContribution = _this$props2.fetchedContribution,
        errorContribution = _this$props2.errorContribution,
        _this$props2$overview = _this$props2.overview,
        overview = _this$props2$overview === void 0 ? false : _this$props2$overview,
        _this$props2$readOnly = _this$props2.readOnly,
        readOnly = _this$props2$readOnly === void 0 ? false : _this$props2$readOnly,
        save = _this$props2.save,
        back = _this$props2.back;
      var _this$state = this.state,
        contribution = _this$state.contribution,
        saveContribution = _this$state.saveContribution,
        newContribution = _this$state.newContribution,
        reset = _this$state.reset,
        update = _this$state.update;
      if (!rights.includes(RIGHT_CONTRIBUTION)) return null;
      var runningMutation = !!contribution && !!contribution.clientMutationId;
      var contributedMutations = modulesManager.getContribs(CONTRIBUTION_OVERVIEW_MUTATIONS_KEY);
      for (var i = 0; i < contributedMutations.length && !runningMutation; i++) {
        runningMutation = contributedMutations[i](state);
      }
      var actions = [{
        doIt: this.reload,
        icon: /*#__PURE__*/React__default["default"].createElement(ReplayIcon__default["default"], null),
        onlyIfDirty: !readOnly && !runningMutation
      }];
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: !!runningMutation ? classes.lockedPage : null
      }, /*#__PURE__*/React__default["default"].createElement(feCore.Helmet, {
        title: feCore.formatMessageWithValues(this.props.intl, "contribution", "ContributionOverview.title")
      }), /*#__PURE__*/React__default["default"].createElement(SaveContributionDialog$1, {
        contribution: saveContribution && contribution,
        onConfirm: this._save,
        onCancel: function onCancel() {
          return _this3._cancelSave();
        }
      }), /*#__PURE__*/React__default["default"].createElement(feCore.ProgressOrError, {
        progress: fetchingContribution,
        error: errorContribution
      }), (!!fetchedContribution && !!contribution && contribution.uuid === contribution_uuid || !contribution_uuid) && /*#__PURE__*/React__default["default"].createElement(feCore.Form, {
        module: "contribution",
        title: !!newContribution ? "ContributionOverview.newTitle" : "ContributionOverview.title",
        edited_id: contribution_uuid,
        edited: contribution,
        reset: reset,
        back: back
        // add={!!add && !newContribution ? this._add : null}
        ,
        readOnly: readOnly || runningMutation || contribution && !!contribution.validityTo,
        actions: actions,
        overview: overview,
        HeadPanel: ContributionMasterPanel$1,
        contribution: contribution,
        onEditedChanged: this.onEditedChanged,
        canSave: this.canSave,
        save: !!save ? this.confirmSave : null,
        update: update,
        onActionToConfirm: this.onActionToConfirm
      }));
    }
  }]);
  return ContributionForm;
}(React$1.Component);
var mapStateToProps$2 = function mapStateToProps(state, props) {
  return {
    rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
    fetchingContribution: state.contribution.fetchingContribution,
    errorContribution: state.contribution.errorContribution,
    fetchedContribution: state.contribution.fetchedContribution,
    submittingMutation: state.contribution.submittingMutation,
    policySummary: state.contribution.policySummary,
    mutation: state.contribution.mutation,
    contribution: state.contribution.contribution,
    confirmed: state.core.confirmed,
    state: state
  };
};
var mapDispatchToProps$1 = function mapDispatchToProps(dispatch) {
  return redux.bindActionCreators({
    fetchContribution: fetchContribution,
    fetchPolicySummary: fetchPolicySummary,
    newContribution: newContribution,
    createContribution: createContribution,
    journalize: feCore.journalize,
    coreConfirm: feCore.coreConfirm
  }, dispatch);
};
var ContributionForm$1 = feCore.withHistory(feCore.withModulesManager(reactRedux.connect(mapStateToProps$2, mapDispatchToProps$1)(reactIntl.injectIntl(styles$4.withTheme(styles$4.withStyles(styles$1)(ContributionForm))))));

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }
function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var styles = function styles(theme) {
  return {
    page: theme.page
  };
};
var ContributionPage = /*#__PURE__*/function (_Component) {
  _inherits__default["default"](ContributionPage, _Component);
  var _super = _createSuper$1(ContributionPage);
  function ContributionPage() {
    var _this;
    _classCallCheck__default["default"](this, ContributionPage);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty__default["default"](_assertThisInitialized__default["default"](_this), "save", function (contribution) {
      if (!contribution.uuid) {
        _this.props.createContribution(_this.props.modulesManager, contribution, feCore.formatMessageWithValues(_this.props.intl, "contribution", "CreateContribution.mutationLabel"));
      } else {
        _this.props.updateContribution(_this.props.modulesManager, contribution, feCore.formatMessageWithValues(_this.props.intl, "contribution", "UpdateContribution.mutationLabel"));
      }
    });
    return _this;
  }
  _createClass__default["default"](ContributionPage, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        classes = _this$props.classes,
        rights = _this$props.rights,
        contribution_uuid = _this$props.contribution_uuid,
        policy_uuid = _this$props.policy_uuid,
        overview = _this$props.overview;
      if (!rights.includes(RIGHT_CONTRIBUTION_EDIT)) return null;
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: classes.page
      }, /*#__PURE__*/React__default["default"].createElement(ContributionForm$1, {
        overview: overview,
        contribution_uuid: contribution_uuid,
        policy_uuid: policy_uuid,
        back: function back(e) {
          window.history.back();
        },
        save: rights.includes(RIGHT_CONTRIBUTION_EDIT) ? this.save : null
      }));
    }
  }]);
  return ContributionPage;
}(React$1.Component);
var mapStateToProps$1 = function mapStateToProps(state, props) {
  return {
    rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
    contribution_uuid: props.match.params.contribution_uuid,
    policy_uuid: props.match.params.policy_uuid
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return redux.bindActionCreators({
    createContribution: createContribution,
    updateContribution: updateContribution
  }, dispatch);
};
var ContributionPage$1 = feCore.withHistory(feCore.withModulesManager(reactRedux.connect(mapStateToProps$1, mapDispatchToProps)(reactIntl.injectIntl(styles$4.withTheme(styles$4.withStyles(styles)(ContributionPage))))));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf__default["default"](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default["default"](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default["default"](this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var ContributionOverviewPage = /*#__PURE__*/function (_Component) {
  _inherits__default["default"](ContributionOverviewPage, _Component);
  var _super = _createSuper(ContributionOverviewPage);
  function ContributionOverviewPage() {
    _classCallCheck__default["default"](this, ContributionOverviewPage);
    return _super.apply(this, arguments);
  }
  _createClass__default["default"](ContributionOverviewPage, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        history = _this$props.history,
        modulesManager = _this$props.modulesManager,
        contribution_uuid = _this$props.contribution_uuid;
      var actions = [{
        doIt: function doIt(e) {
          return feCore.historyPush(modulesManager, history, "contribution.contributionOverview", [contribution_uuid]);
        },
        icon: /*#__PURE__*/React__default["default"].createElement(icons.Edit, null),
        onlyIfDirty: false
      }];
      return /*#__PURE__*/React__default["default"].createElement(ContributionPage$1, _extends__default["default"]({}, this.props, {
        readOnly: true,
        overview: true,
        actions: actions
      }));
    }
  }]);
  return ContributionOverviewPage;
}(React$1.Component);
var mapStateToProps = function mapStateToProps(state, props) {
  return {
    contribution_uuid: props.match.params.contribution_uuid
  };
};
var ContributionOverviewPage$1 = feCore.withHistory(feCore.withModulesManager(reactRedux.connect(mapStateToProps)(ContributionOverviewPage)));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ROUTE_CONTRIBUTION_CONTRIBUTIONS = "contribution/contributions";
var ROUTE_CONTRIBUTION_CONTRIBUTION = "contribution/new";
var ROUTE_CONTRIBUTION_CONTRIBUTION_OVERVIEW = "contribution/overview";
var DEFAULT_CONFIG = {
  "translations": [{
    key: "en",
    messages: messages_en
  }, {
    key: "fr",
    messages: messages_fr
  }],
  "refs": [{
    key: "contribution.PaymentOperatorPicker",
    ref: PaymentOperatorPicker
  }],
  "core.Router": [{
    path: ROUTE_CONTRIBUTION_CONTRIBUTION + "/:policy_uuid",
    component: ContributionPage$1
  }, {
    path: ROUTE_CONTRIBUTION_CONTRIBUTION_OVERVIEW + "/:contribution_uuid",
    component: ContributionOverviewPage$1
  }],
  "insuree.MainMenu": [{
    text: /*#__PURE__*/React.createElement(FormattedMessage, {
      module: "contribution",
      id: "menu.contributions"
    }),
    icon: /*#__PURE__*/React.createElement(MonetizationOn, null),
    route: "/" + ROUTE_CONTRIBUTION_CONTRIBUTIONS,
    filter: function filter(rights) {
      return rights.includes(RIGHT_CONTRIBUTION);
    }
  }]
};
var ContributionCmrModule = function ContributionCmrModule(cfg) {
  return _objectSpread(_objectSpread({}, DEFAULT_CONFIG), cfg);
};

exports.ContributionCmrModule = ContributionCmrModule;
//# sourceMappingURL=index.js.map
