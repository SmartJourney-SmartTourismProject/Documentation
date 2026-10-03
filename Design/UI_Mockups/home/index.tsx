import { TripNavigationSection } from "./TripNavigationSection";
import { TripPlanningWorkspaceSection } from "./TripPlanningWorkspaceSection";

export const Home = (): JSX.Element => {
  return (
    <main className="inline-flex min-h-[1218px] min-w-[2109px] items-start relative w-full">
      <TripNavigationSection />
      <TripPlanningWorkspaceSection />
    </main>
  );
};
