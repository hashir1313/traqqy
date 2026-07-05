import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Trakki",
  version: packageJson.version,
  copyright: `© ${currentYear}, Trakki.`,
  meta: {
    title: "Trakki - Project Progress Tracking for Freelancers",
    description:
      "Trakki helps freelancers keep clients updated on project progress without sending repetitive messages.",
  },
};
