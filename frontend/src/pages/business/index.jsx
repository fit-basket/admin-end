import React, { useState } from "react";
import { PageHeading } from "../../components/headings";

import { settingTabs } from "../../constants/navigation";
import Tabs from "../../components/tabs";
import Profile from "./Profile";
import Billing from "./Billing";

function Business() {
  // variables and state
  const [tabs, setTabs] = useState(settingTabs);
  const [selectedTab, setSelectedTab] = useState("account");

  const renderSelectedTabContent = () => {
    switch (selectedTab) {
      case "account":
        return <Profile />;
      default:
        return <Billing />; // Replace with content for other tabs
    }
  };

  return (
    <div>
      <div className="flex-1 min-w-0 mb-6">
        <PageHeading title="Business" />
      </div>
      <Tabs tabs={tabs} setTabs={setTabs} setSelectedTab={setSelectedTab} />
      {renderSelectedTabContent()}
    </div>
  );
}

export default Business;
