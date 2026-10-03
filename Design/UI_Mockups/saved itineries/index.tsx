import { SavedItinerariesSection } from "./SavedItinerariesSection";
import { TripPlannerSidebarSection } from "./TripPlannerSidebarSection";

export const SavedItineries = (): JSX.Element => {
  return (
    <main
      className="relative flex min-h-[1218px] min-w-[2109px] w-full items-start"
      aria-label="Saved itineraries"
    >
      <TripPlannerSidebarSection />
      <SavedItinerariesSection />
    </main>
  );
};
