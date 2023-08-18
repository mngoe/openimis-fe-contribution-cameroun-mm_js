import messages_en from "./translations/en.json";
import messages_fr from "./translations/fr.json";
import PaymentOperatorPicker from "./pickers/PaymentOperatorPicker";
import PaymentMobile from "./components/PaymentMobile";

const DEFAULT_CONFIG = {
  "translations": [
    { key: "en", messages: messages_en },
    { key: "fr", messages: messages_fr }
  ],

  "refs": [
    { key: "contributionCmr.PaymentOperatorPicker", ref: PaymentOperatorPicker }
  ],
}

export const ContributionCmrModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}

export {
  PaymentMobile
}