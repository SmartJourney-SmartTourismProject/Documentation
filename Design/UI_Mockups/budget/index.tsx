import { BudgetTrackerDashboardSection } from "./BudgetTrackerDashboardSection";
import { TripNavigationSection } from "./TripNavigationSection";

export const BudgetTracker = (): JSX.Element => {
  return (
    <main
      className="flex min-h-[1218px] min-w-[2109px] items-start bg-[#f7f7f4]"
      data-id="budget-tracker"
    >
      <TripNavigationSection />
      <BudgetTrackerDashboardSection />
    </main>
  );
};
