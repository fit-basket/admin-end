import { classNames } from "../../utils/helper";

function Tabs({ tabs, setTabs, setSelectedTab }) {
  // func
  const handleTabChange = (selectedTab) => {
    const updatedTabs = tabs?.map((tab) => ({
      ...tab,
      current: tab.name === selectedTab.name,
    }));
    setTabs(updatedTabs);
    setSelectedTab(selectedTab.id);
  };

  return (
    <div className="mb-5">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          defaultValue={tabs?.find((tab) => tab.current).name}
          onChange={(e) =>
            handleTabChange(tabs?.find((tab) => tab.name === e.target.value))
          }
        >
          {tabs?.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs?.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              className={classNames(
                tab.current
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-500 hover:text-gray-700",
                "px-3 py-2 font-medium text-sm rounded-md"
              )}
              aria-current={tab.current ? "page" : undefined}
              onClick={() => handleTabChange(tab)}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Tabs;
