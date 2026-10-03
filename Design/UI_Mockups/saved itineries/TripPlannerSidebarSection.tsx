import { useMemo, useState } from "react";
import image from "./image.svg";
import vector from "./vector.svg";
import vector2 from "./vector-2.svg";
import vector3 from "./vector-3.svg";
import vector4 from "./vector-4.svg";
import vector5 from "./vector-5.svg";
import vector6 from "./vector-6.svg";
import vector7 from "./vector-7.svg";
import vector8 from "./vector-8.svg";
import vector9 from "./vector-9.svg";

type TripItem = {
  title: string;
  top: string;
  group: "today" | "previous" | "earlier";
  verified?: boolean;
};

const navigationItems = [
  {
    label: "Explore",
    icon: (
      <div className="relative w-[15px] h-[15px]" aria-hidden="true">
        <img
          className="absolute w-[91.67%] h-[91.67%] top-[8.33%] left-[8.33%]"
          alt=""
          src={vector3}
        />
      </div>
    ),
  },
  {
    label: "Saved itineraries",
    icon: (
      <div className="relative w-[15px] h-[15px]" aria-hidden="true">
        <img
          className="absolute w-[91.67%] h-[87.50%] top-[12.50%] left-[8.33%]"
          alt=""
          src={vector4}
        />
        <img
          className="absolute w-[91.67%] h-[95.83%] top-[4.17%] left-[8.33%]"
          alt=""
          src={vector5}
        />
      </div>
    ),
  },
  {
    label: "Budget tracker",
    icon: (
      <div className="relative w-[15px] h-[15px]" aria-hidden="true">
        <img
          className="absolute w-[79.17%] h-full top-0 left-[20.83%]"
          alt=""
          src={vector6}
        />
      </div>
    ),
  },
];

const trips: TripItem[] = [
  {
    title: "4 days in Kandy, mid-range budget",
    top: "top-10",
    group: "today",
  },
  {
    title: "Is Sigiriya doable in a day trip?",
    top: "top-[77px]",
    group: "today",
  },
  {
    title: "Weekend in Ella — train times",
    top: "top-[148px]",
    group: "previous",
  },
  {
    title: "Family trip to Galle Fort",
    top: "top-[185px]",
    group: "previous",
    verified: true,
  },
  {
    title: "Budget stays near Mirissa",
    top: "top-[222px]",
    group: "previous",
  },
  {
    title: "Rainy season — Nuwara Eliya or not?",
    top: "top-[259px]",
    group: "previous",
  },
  {
    title: "3-day Colombo food itinerary",
    top: "top-[330px]",
    group: "earlier",
  },
  {
    title: "Yala safari + Tissamaharama stay",
    top: "top-[367px]",
    group: "earlier",
  },
  {
    title: "Solo trip, Jaffna, 5 days",
    top: "top-[404px]",
    group: "earlier",
  },
];

const dateGroups = [
  { label: "TODAY", top: "top-1.5" },
  { label: "PREVIOUS 7 DAYS", top: "top-[114px]" },
  { label: "EARLIER", top: "top-[296px]" },
];

export const TripPlannerSidebarSection = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrip, setSelectedTrip] = useState(
    "4 days in Kandy, mid-range budget",
  );
  const [activeNavigation, setActiveNavigation] = useState("");
  const [isNewTripOpen, setIsNewTripOpen] = useState(false);

  const visibleTrips = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return trips;
    }

    return trips.filter((trip) =>
      trip.title.toLowerCase().includes(normalizedQuery),
    );
  }, [searchQuery]);

  const handleNewTrip = () => {
    setIsNewTripOpen(true);
    setSearchQuery("");
    setActiveNavigation("");
  };

  return (
    <aside
      className="flex flex-col w-72 h-[1218px] items-start relative bg-white border-r [border-right-style:solid] border-[#41287433]"
      aria-label="SmartJourney trip planner"
    >
      <header className="flex flex-col items-start gap-3 pt-[18px] pb-4 px-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex items-center pt-0 pb-1.5 px-0 relative self-stretch w-full flex-[0_0_auto]">
          <div className="inline-flex items-center gap-[11px] relative flex-[0_0_auto] mr-[-10.00px]">
            <div
              className="relative w-[25px] h-6 bg-[url(/container.png)] bg-cover bg-[50%_50%]"
              aria-hidden="true"
            />
            <div className="inline-flex gap-[74px] flex-[0_0_auto] items-center relative">
              <div className="relative flex items-center w-fit mt-[-1.00px] font-fraunces-bold font-[number:var(--fraunces-bold-font-weight)] text-black text-[length:var(--fraunces-bold-font-size)] tracking-[var(--fraunces-bold-letter-spacing)] leading-[var(--fraunces-bold-line-height)] [font-style:var(--fraunces-bold-font-style)]">
                SmartJourney
              </div>
              <div
                className="relative w-[25px] h-[22px] bg-[url(/container-2.png)] bg-cover bg-[50%_50%]"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <button
          className="all-unset box-border flex items-center gap-2.5 px-3.5 py-3 relative self-stretch w-full flex-[0_0_auto] bg-[#831c91] rounded-xl cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831c91]"
          type="button"
          onClick={handleNewTrip}
          aria-pressed={isNewTripOpen}
        >
          <div className="relative w-4 h-4" aria-hidden="true">
            <img
              className="absolute w-[83.75%] h-[83.75%] top-[16.25%] left-[16.25%]"
              alt=""
              src={vector}
            />
          </div>
          <span className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-white text-sm text-center tracking-[0] leading-[normal]">
            New trip
          </span>
        </button>
        <label className="flex items-center gap-[9px] px-3 py-[9px] relative self-stretch w-full flex-[0_0_auto] bg-[#ffe6f4] rounded-[10px] border border-solid border-[#00000014]">
          <span className="relative w-[15px] h-[15px]" aria-hidden="true">
            <img
              className="absolute w-[87.50%] h-[87.50%] top-[12.50%] left-[12.50%]"
              alt=""
              src={image}
            />
            <img
              className="absolute w-[34.58%] h-[34.58%] top-[65.42%] left-[65.42%]"
              alt=""
              src={vector2}
            />
          </span>
          <span className="flex flex-col items-start px-0.5 py-px relative flex-1 grow">
            <input
              className="relative self-stretch w-full border-[none] [background:none] mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-[#00000066] text-[13.5px] tracking-[0] leading-[normal] p-0 outline-none placeholder:text-[#00000066]"
              placeholder="Search your trips"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              aria-label="Search your trips"
            />
          </span>
        </label>
      </header>
      <nav
        className="flex flex-col items-start pt-1 pb-2 px-2.5 relative self-stretch w-full flex-[0_0_auto]"
        aria-label="Trip planner navigation"
      >
        {navigationItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => {
              setActiveNavigation(item.label);
              setIsNewTripOpen(false);
            }}
            className={`all-unset box-border flex items-center gap-2.5 px-2 py-[9px] relative self-stretch w-full flex-[0_0_auto] rounded-lg cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#831c91] ${
              activeNavigation === item.label ? "bg-[#ffe6f4]" : ""
            }`}
            aria-current={activeNavigation === item.label ? "page" : undefined}
          >
            {item.icon}
            <span className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-[#000000bf] text-[13.5px] tracking-[0] leading-[normal]">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
      <section
        className="relative flex-1 self-stretch w-full grow overflow-y-auto overflow-x-hidden"
        aria-label="Your trips"
      >
        {searchQuery.trim() === "" &&
          dateGroups.map((group) => (
            <div
              key={group.label}
              className={`flex flex-col w-[calc(100%_-_20px)] items-start pt-3.5 pb-1.5 px-2 absolute ${group.top} left-2.5`}
            >
              <div className="relative flex items-center w-fit mt-[-1.00px] font-jetbrains-mono-regular-upper font-[number:var(--jetbrains-mono-regular-upper-font-weight)] text-[#00000059] text-[length:var(--jetbrains-mono-regular-upper-font-size)] tracking-[var(--jetbrains-mono-regular-upper-letter-spacing)] leading-[var(--jetbrains-mono-regular-upper-line-height)] [font-style:var(--jetbrains-mono-regular-upper-font-style)]">
                {group.label}
              </div>
            </div>
          ))}

        {searchQuery.trim() === "" ? (
          trips.map((trip) => {
            const isSelected = selectedTrip === trip.title;

            return (
              <button
                key={trip.title}
                type="button"
                onClick={() => {
                  setSelectedTrip(trip.title);
                  setIsNewTripOpen(false);
                }}
                className={`all-unset box-border flex w-[calc(100%_-_20px)] items-center px-2.5 py-[9px] absolute ${trip.top} left-2.5 rounded-lg cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#831c91] ${
                  trip.verified ? "justify-between" : ""
                } ${isSelected ? "bg-[#ffe6f4]" : ""}`}
                aria-current={isSelected ? "page" : undefined}
              >
                <span className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                  <span
                    className={`relative flex items-center w-fit mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-[13.5px] tracking-[0] leading-[normal] ${
                      isSelected ? "text-black" : "text-[#000000cc]"
                    }`}
                  >
                    {trip.title}
                  </span>
                </span>
                {trip.verified && (
                  <span className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                    <span className="relative flex items-center w-fit mt-[-1.00px] font-jetbrains-mono-regular font-[number:var(--jetbrains-mono-regular-font-weight)] text-[#412874] text-[length:var(--jetbrains-mono-regular-font-size)] tracking-[var(--jetbrains-mono-regular-letter-spacing)] leading-[var(--jetbrains-mono-regular-line-height)] [font-style:var(--jetbrains-mono-regular-font-style)]">
                      verified
                    </span>
                  </span>
                )}
                {isSelected && (
                  <span className="absolute h-[calc(100%_-_16px)] top-2 -left-2.5 w-[3px] bg-[#831c91] rounded-[3px]" />
                )}
              </button>
            );
          })
        ) : (
          <div className="flex flex-col gap-1 px-2.5 py-3">
            {visibleTrips.map((trip) => {
              const isSelected = selectedTrip === trip.title;

              return (
                <button
                  key={trip.title}
                  type="button"
                  onClick={() => setSelectedTrip(trip.title)}
                  className={`all-unset box-border flex items-center justify-between px-2.5 py-[9px] relative self-stretch w-full rounded-lg cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#831c91] ${
                    isSelected ? "bg-[#ffe6f4]" : ""
                  }`}
                  aria-current={isSelected ? "page" : undefined}
                >
                  <span
                    className={`relative flex items-center w-fit [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-[13.5px] tracking-[0] leading-[normal] ${
                      isSelected ? "text-black" : "text-[#000000cc]"
                    }`}
                  >
                    {trip.title}
                  </span>
                  {trip.verified && (
                    <span className="font-jetbrains-mono-regular font-[number:var(--jetbrains-mono-regular-font-weight)] text-[#412874] text-[length:var(--jetbrains-mono-regular-font-size)] tracking-[var(--jetbrains-mono-regular-letter-spacing)] leading-[var(--jetbrains-mono-regular-line-height)] [font-style:var(--jetbrains-mono-regular-font-style)]">
                      verified
                    </span>
                  )}
                </button>
              );
            })}
            {visibleTrips.length === 0 && (
              <p className="px-2 py-[9px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-[#00000066] text-[13.5px] tracking-[0] leading-[normal]">
                No trips found
              </p>
            )}
          </div>
        )}
      </section>
      <footer className="flex flex-col items-start p-3 relative self-stretch w-full flex-[0_0_auto] border-t [border-top-style:solid] border-[#00000014]">
        <button
          type="button"
          className="all-unset box-border flex items-center gap-2 pt-2.5 pb-0.5 px-2 relative self-stretch w-full flex-[0_0_auto] cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831c91]"
          onClick={() => {
            setActiveNavigation("");
            setIsNewTripOpen(false);
          }}
        >
          <span className="relative w-[13px] h-[13px]" aria-hidden="true">
            <img
              className="absolute w-[83.33%] h-[83.33%] top-[16.67%] left-[16.67%]"
              alt=""
              src={vector7}
            />
          </span>
          <span className="relative flex items-center w-fit mt-[-1.00px] font-semantic-link font-[number:var(--semantic-link-font-weight)] text-[#00000080] text-[length:var(--semantic-link-font-size)] tracking-[var(--semantic-link-letter-spacing)] leading-[var(--semantic-link-line-height)] [font-style:var(--semantic-link-font-style)]">
            Back to overview
          </span>
        </button>
        <button
          type="button"
          className="all-unset box-border flex items-center gap-2.5 p-2 relative self-stretch w-full flex-[0_0_auto] rounded-[10px] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831c91]"
          aria-label="Open Stt traveler account"
        >
          <span className="flex w-8 h-8 items-center justify-center relative bg-[#831c91] rounded-2xl">
            <span className="relative flex items-center justify-center w-fit font-plus-jakarta-sans-extrabold font-[number:var(--plus-jakarta-sans-extrabold-font-weight)] text-white text-[length:var(--plus-jakarta-sans-extrabold-font-size)] text-center tracking-[var(--plus-jakarta-sans-extrabold-letter-spacing)] leading-[var(--plus-jakarta-sans-extrabold-line-height)] [font-style:var(--plus-jakarta-sans-extrabold-font-style)]">
              ST
            </span>
          </span>
          <span className="flex flex-col items-start relative flex-1 grow">
            <span className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
              <span className="relative flex items-center self-stretch mt-[-1.00px] font-semantic-strong font-[number:var(--semantic-strong-font-weight)] text-black text-[length:var(--semantic-strong-font-size)] tracking-[var(--semantic-strong-letter-spacing)] leading-[var(--semantic-strong-line-height)] [font-style:var(--semantic-strong-font-style)]">
                Stt
              </span>
            </span>
            <span className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
              <span className="relative flex items-center self-stretch mt-[-1.00px] font-plus-jakarta-sans-regular font-[number:var(--plus-jakarta-sans-regular-font-weight)] text-[#00000073] text-[length:var(--plus-jakarta-sans-regular-font-size)] tracking-[var(--plus-jakarta-sans-regular-letter-spacing)] leading-[var(--plus-jakarta-sans-regular-line-height)] [font-style:var(--plus-jakarta-sans-regular-font-style)]">
                Traveler account
              </span>
            </span>
          </span>
          <span className="relative w-4 h-4" aria-hidden="true">
            <img
              className="absolute w-[66.67%] h-[66.67%] top-[33.33%] left-[33.33%]"
              alt=""
              src={vector8}
            />
            <img
              className="absolute w-full h-full top-0 left-0"
              alt=""
              src={vector9}
            />
          </span>
        </button>
      </footer>
    </aside>
  );
};
