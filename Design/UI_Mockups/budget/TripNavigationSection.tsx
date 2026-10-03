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

type Trip = {
  id: string;
  title: string;
  top: string;
  selected?: boolean;
  verified?: boolean;
};

const navigationItems = [
  {
    id: "explore",
    label: "Explore",
    icon: (
      <div className="relative h-[15px] w-[15px]" aria-hidden="true">
        <img
          className="absolute left-[8.33%] top-[8.33%] h-[91.67%] w-[91.67%]"
          alt=""
          src={vector3}
        />
      </div>
    ),
  },
  {
    id: "saved-itineraries",
    label: "Saved itineraries",
    icon: (
      <div className="relative h-[15px] w-[15px]" aria-hidden="true">
        <img
          className="absolute left-[8.33%] top-[12.5%] h-[87.5%] w-[91.67%]"
          alt=""
          src={vector4}
        />
        <img
          className="absolute left-[8.33%] top-[4.17%] h-[95.83%] w-[91.67%]"
          alt=""
          src={vector5}
        />
      </div>
    ),
  },
  {
    id: "budget-tracker",
    label: "Budget tracker",
    icon: (
      <div className="relative h-[15px] w-[15px]" aria-hidden="true">
        <img
          className="absolute left-[20.83%] top-0 h-full w-[79.17%]"
          alt=""
          src={vector6}
        />
      </div>
    ),
  },
];

const tripGroups = [
  { id: "today", label: "TODAY", top: "6px" },
  { id: "previous", label: "PREVIOUS 7 DAYS", top: "114px" },
  { id: "earlier", label: "EARLIER", top: "296px" },
];

const trips: Trip[] = [
  {
    id: "kandy",
    title: "4 days in Kandy, mid-range budget",
    top: "40px",
    selected: true,
  },
  {
    id: "sigiriya",
    title: "Is Sigiriya doable in a day trip?",
    top: "77px",
  },
  {
    id: "ella",
    title: "Weekend in Ella — train times",
    top: "148px",
  },
  {
    id: "galle",
    title: "Family trip to Galle Fort",
    top: "185px",
    verified: true,
  },
  {
    id: "mirissa",
    title: "Budget stays near Mirissa",
    top: "222px",
  },
  {
    id: "nuwara-eliya",
    title: "Rainy season — Nuwara Eliya or not?",
    top: "259px",
  },
  {
    id: "colombo",
    title: "3-day Colombo food itinerary",
    top: "330px",
  },
  {
    id: "yala",
    title: "Yala safari + Tissamaharama stay",
    top: "367px",
  },
  {
    id: "jaffna",
    title: "Solo trip, Jaffna, 5 days",
    top: "404px",
  },
];

export const TripNavigationSection = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTripId, setActiveTripId] = useState("kandy");
  const [activeNavigationId, setActiveNavigationId] = useState<string | null>(
    null,
  );

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
    setSearchQuery("");
    setActiveNavigationId(null);
    setActiveTripId("kandy");
  };

  return (
    <aside
      className="relative flex h-[1218px] w-72 flex-col items-start border-r border-[#41287433] bg-white"
      aria-label="Trip navigation"
    >
      <header className="relative flex w-full flex-none flex-col items-start gap-3 px-4 pb-4 pt-[18px]">
        <div className="relative flex w-full flex-none items-center pb-1.5 pt-0">
          <div className="relative mr-[-10px] inline-flex flex-none items-center gap-[11px]">
            <div
              className="relative h-6 w-[25px] bg-[url(/container.png)] bg-cover bg-[50%_50%]"
              aria-hidden="true"
            />
            <div className="relative inline-flex flex-none items-center gap-[74px]">
              <div className="relative mt-[-1px] flex w-fit items-center font-fraunces-bold text-[length:var(--fraunces-bold-font-size)] font-[number:var(--fraunces-bold-font-weight)] leading-[var(--fraunces-bold-line-height)] tracking-[var(--fraunces-bold-letter-spacing)] text-black [font-style:var(--fraunces-bold-font-style)]">
                SmartJourney
              </div>
              <div
                className="relative h-[22px] w-[25px] bg-[url(/image.png)] bg-cover bg-[50%_50%]"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <button
          className="box-border relative flex w-full flex-none items-center gap-2.5 rounded-xl bg-[#831c91] px-3.5 py-3 text-left transition-colors hover:bg-[#741880] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#831c91]"
          type="button"
          onClick={handleNewTrip}
        >
          <div className="relative h-4 w-4" aria-hidden="true">
            <img
              className="absolute left-[16.25%] top-[16.25%] h-[83.75%] w-[83.75%]"
              alt=""
              src={vector}
            />
          </div>
          <span className="relative mt-[-1px] flex w-fit items-center justify-center font-['Plus_Jakarta_Sans-Bold',Helvetica] text-sm font-bold leading-[normal] tracking-[0] text-white">
            New trip
          </span>
        </button>
        <label className="relative flex w-full flex-none items-center gap-[9px] rounded-[10px] border border-solid border-[#00000014] bg-[#ffe6f4] px-3 py-[9px]">
          <span
            className="relative h-[15px] w-[15px] flex-none"
            aria-hidden="true"
          >
            <img
              className="absolute left-[12.5%] top-[12.5%] h-[87.5%] w-[87.5%]"
              alt=""
              src={image}
            />
            <img
              className="absolute left-[65.42%] top-[65.42%] h-[34.58%] w-[34.58%]"
              alt=""
              src={vector2}
            />
          </span>
          <span className="relative flex flex-1 flex-col items-start px-0.5 py-px">
            <input
              className="relative mt-[-1px] w-full self-stretch border-0 bg-transparent p-0 font-['Plus_Jakarta_Sans-Regular',Helvetica] text-[13.5px] font-normal leading-[normal] tracking-[0] text-black outline-none placeholder:text-[#00000066]"
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
        className="relative flex w-full flex-none flex-col items-start px-2.5 pb-2 pt-1"
        aria-label="Main navigation"
      >
        {navigationItems.map((item) => {
          const isActive = activeNavigationId === item.id;

          return (
            <button
              key={item.id}
              className={`relative flex w-full flex-none items-center gap-2.5 rounded-lg px-2 py-[9px] text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#831c91] ${
                isActive ? "bg-[#ffe6f4]" : "hover:bg-[#ffe6f4]"
              }`}
              type="button"
              onClick={() =>
                setActiveNavigationId((currentId) =>
                  currentId === item.id ? null : item.id,
                )
              }
              aria-pressed={isActive}
            >
              {item.icon}
              <span className="relative mt-[-1px] flex w-fit items-center font-['Plus_Jakarta_Sans-Regular',Helvetica] text-[13.5px] font-normal leading-[normal] tracking-[0] text-[#000000bf]">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
      <section
        className="relative w-full flex-1 grow overflow-y-auto overflow-x-hidden"
        aria-label="Trips"
      >
        {searchQuery.trim() === "" &&
          tripGroups.map((group) => (
            <div
              key={group.id}
              className="absolute left-2.5 flex w-[calc(100%_-_20px)] flex-col items-start px-2 pb-1.5 pt-3.5"
              style={{ top: group.top }}
            >
              <h2 className="relative mt-[-1px] flex w-fit items-center font-jetbrains-mono-regular-upper text-[length:var(--jetbrains-mono-regular-upper-font-size)] font-[number:var(--jetbrains-mono-regular-upper-font-weight)] leading-[var(--jetbrains-mono-regular-upper-line-height)] tracking-[var(--jetbrains-mono-regular-upper-letter-spacing)] text-[#00000059] [font-style:var(--jetbrains-mono-regular-upper-font-style)]">
                {group.label}
              </h2>
            </div>
          ))}

        {visibleTrips.map((trip) => {
          const isSelected = activeTripId === trip.id;

          return (
            <button
              key={trip.id}
              className={`absolute left-2.5 flex w-[calc(100%_-_20px)] items-center rounded-lg px-2.5 py-[9px] text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#831c91] ${
                isSelected ? "bg-[#ffe6f4]" : "hover:bg-[#ffe6f4]"
              } ${trip.verified ? "justify-between" : ""}`}
              style={
                searchQuery.trim() === ""
                  ? { top: trip.top }
                  : {
                      top: `${40 + visibleTrips.findIndex((item) => item.id === trip.id) * 37}px`,
                    }
              }
              type="button"
              onClick={() => {
                setActiveTripId(trip.id);
                setActiveNavigationId(null);
              }}
              aria-current={isSelected ? "page" : undefined}
            >
              <span className="relative inline-flex flex-none flex-col items-start">
                <span
                  className={`relative mt-[-1px] flex w-fit items-center font-['Plus_Jakarta_Sans-Regular',Helvetica] text-[13.5px] font-normal leading-[normal] tracking-[0] ${
                    isSelected ? "text-black" : "text-[#000000cc]"
                  }`}
                >
                  {trip.title}
                </span>
              </span>
              {trip.verified && (
                <span className="relative inline-flex flex-none flex-col items-start">
                  <span className="relative mt-[-1px] flex w-fit items-center font-jetbrains-mono-regular text-[length:var(--jetbrains-mono-regular-font-size)] font-[number:var(--jetbrains-mono-regular-font-weight)] leading-[var(--jetbrains-mono-regular-line-height)] tracking-[var(--jetbrains-mono-regular-letter-spacing)] text-[#412874] [font-style:var(--jetbrains-mono-regular-font-style)]">
                    verified
                  </span>
                </span>
              )}

              {isSelected && (
                <span
                  className="absolute -left-2.5 top-2 h-[calc(100%_-_16px)] w-[3px] rounded-[3px] bg-[#831c91]"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}

        {searchQuery.trim() !== "" && visibleTrips.length === 0 && (
          <p className="absolute left-2.5 top-10 w-[calc(100%_-_20px)] px-2.5 py-[9px] font-['Plus_Jakarta_Sans-Regular',Helvetica] text-[13.5px] font-normal leading-[normal] tracking-[0] text-[#00000080]">
            No trips found
          </p>
        )}
      </section>
      <footer className="relative flex w-full flex-none flex-col items-start border-t border-[#00000014] p-3">
        <button
          className="relative flex w-full flex-none items-center gap-2 px-2 pb-0.5 pt-2.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#831c91]"
          type="button"
          onClick={() => {
            setActiveNavigationId(null);
            setSearchQuery("");
          }}
        >
          <span className="relative h-[13px] w-[13px]" aria-hidden="true">
            <img
              className="absolute left-[16.67%] top-[16.67%] h-[83.33%] w-[83.33%]"
              alt=""
              src={vector7}
            />
          </span>
          <span className="relative mt-[-1px] flex w-fit items-center font-semantic-link text-[length:var(--semantic-link-font-size)] font-[number:var(--semantic-link-font-weight)] leading-[var(--semantic-link-line-height)] tracking-[var(--semantic-link-letter-spacing)] text-[#00000080] [font-style:var(--semantic-link-font-style)]">
            Back to overview
          </span>
        </button>
        <button
          className="relative flex w-full flex-none items-center gap-2.5 rounded-[10px] p-2 text-left hover:bg-[#ffe6f4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#831c91]"
          type="button"
          aria-label="Open Stt traveler account"
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded-2xl bg-[#831c91]">
            <span className="relative flex w-fit items-center justify-center font-plus-jakarta-sans-extrabold text-[length:var(--plus-jakarta-sans-extrabold-font-size)] font-[number:var(--plus-jakarta-sans-extrabold-font-weight)] leading-[var(--plus-jakarta-sans-extrabold-line-height)] tracking-[var(--plus-jakarta-sans-extrabold-letter-spacing)] text-center text-white [font-style:var(--plus-jakarta-sans-extrabold-font-style)]">
              ST
            </span>
          </span>
          <span className="relative flex flex-1 grow flex-col items-start">
            <span className="relative flex w-full flex-col items-start">
              <span className="relative mt-[-1px] flex self-stretch items-center font-['Plus_Jakarta_Sans-Bold',Helvetica] text-[13.5px] font-bold leading-[normal] tracking-[0] text-black">
                Stt
              </span>
            </span>
            <span className="relative flex w-full flex-col items-start">
              <span className="relative mt-[-1px] flex self-stretch items-center font-plus-jakarta-sans-regular text-[length:var(--plus-jakarta-sans-regular-font-size)] font-[number:var(--plus-jakarta-sans-regular-font-weight)] leading-[var(--plus-jakarta-sans-regular-line-height)] tracking-[var(--plus-jakarta-sans-regular-letter-spacing)] text-[#00000073] [font-style:var(--plus-jakarta-sans-regular-font-style)]">
                Traveler account
              </span>
            </span>
          </span>
          <span className="relative h-4 w-4 flex-none" aria-hidden="true">
            <img
              className="absolute left-[33.33%] top-[33.33%] h-[66.67%] w-[66.67%]"
              alt=""
              src={vector8}
            />
            <img
              className="absolute left-0 top-0 h-full w-full"
              alt=""
              src={vector9}
            />
          </span>
        </button>
      </footer>
    </aside>
  );
};
