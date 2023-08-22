import PaymentOperatorPicker from "./pickers/PaymentOperatorPicker";
import messages_en from "./translations/en.json";
import messages_fr from "./translations/fr.json";
import ContributionPage from "./pages/ContributionPage";
import ContributionOverviewPage from "./pages/ContributionOverviewPage";

import { RIGHT_CONTRIBUTION } from "./constants";

const ROUTE_CONTRIBUTION_CONTRIBUTIONS = "contribution/contributions";
const ROUTE_CONTRIBUTION_CONTRIBUTION = "contribution/new";
const ROUTE_CONTRIBUTION_CONTRIBUTION_OVERVIEW = "contribution/overview";

const DEFAULT_CONFIG = {
  "translations": [
    { key: "en", messages: messages_en },
    { key: "fr", messages: messages_fr }
  ],

  "refs": [
    { key: "contribution.PaymentOperatorPicker", ref: PaymentOperatorPicker },
  ],

  "core.Router": [
    { path: ROUTE_CONTRIBUTION_CONTRIBUTION + "/:policy_uuid", component: ContributionPage },
    { path: ROUTE_CONTRIBUTION_CONTRIBUTION_OVERVIEW + "/:contribution_uuid", component: ContributionOverviewPage },
  ],
  "insuree.MainMenu": [
    {
      text: <FormattedMessage module="contribution" id="menu.contributions" />,
      icon: <MonetizationOn />,
      route: "/" + ROUTE_CONTRIBUTION_CONTRIBUTIONS,
      filter: rights => rights.includes(RIGHT_CONTRIBUTION)
    }
  ],
}

export const ContributionCmrModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}