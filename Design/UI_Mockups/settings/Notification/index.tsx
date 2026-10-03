import { NotificationPreferencesSection } from "./NotificationPreferencesSection";
import { SettingsNavigationSection } from "./SettingsNavigationSection";

export const Notification = (): JSX.Element => {
  return (
    <main className="flex flex-col items-center justify-center gap-2.5 px-[521px] py-[161px] relative bg-white">
      <section
        aria-label="Notification settings"
        className="flex max-w-[860px] w-[860px] max-h-[1080px] items-start relative flex-[0_0_auto] bg-korma rounded-3xl overflow-hidden shadow-[0px_0px_0px_1px_#0000001a,0px_30px_80px_#00000073]"
      >
        <SettingsNavigationSection />
        <NotificationPreferencesSection />
      </section>
    </main>
  );
};
