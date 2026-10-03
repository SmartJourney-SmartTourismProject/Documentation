import { useMemo, useState } from "react";
import container from "./container.png";
import container2 from "./container-2.png";
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

type NavigationItem = {
  label: string;
  icon: "explore" | "saved" | "budget";
};

type TripItem = {
  id: string;
  label: string;
  top: string;
  selected?: boolean;
  verified?: boolean;
};

const navigationItems: NavigationItem[] = [
  { label: "Explore", icon: "explore" },
  { label: "Saved itineraries", icon: "saved" },
  { label: "Budget tracker", icon: "budget" },
];

const tripGroups = [
  {
    heading: "TODAY",
    headingTop: "6px",
    trips: [
      {
        id: "kandy",
        label: "4 days in Kandy, mid-range budget",
        top: "40px",
        selected: true,
      },
      {
        id: "sigiriya",
        label: "Is Sigiriya doable in a day trip?",
        top: "77px",
      },
    ],
  },
  {
    heading: "PREVIOUS 7 DAYS",
    headingTop: "114px",
    trips: [
      {
        id: "ella",
        label: "Weekend in Ella — train times",
        top: "148px",
      },
      {
        id: "galle",
        label: "Family trip to Galle Fort",
        top: "185px",
        verified: true,
      },
      {
        id: "mirissa",
        label: "Budget stays near Mirissa",
        top: "222px",
      },
      {
        id: "nuwara-eliya",
        label: "Rainy season — Nuwara Eliya or not?",
        top: "259px",
      },
    ],
  },
  {
    heading: "EARLIER",
    headingTop: "296px",
    trips: [
      {
        id: "colombo",
        label: "3-day Colombo food itinerary",
        top: "330px",
      },
      {
        id: "yala",
        label: "Yala safari + Tissamaharama stay",
        top: "367px",
      },
      {
        id: "jaffna",
        label: "Solo trip, Jaffna, 5 days",
        top: "404px",
      },
    ],
  },
];

const allTrips = tripGroups.flatMap((group) => group.trips);

export const TripNavigationSection = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTripId, setSelectedTripId] = useState("kandy");
  const [activeNavigation, setActiveNavigation] = useState<string | null>(null);

  const visibleTripIds = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return new Set(allTrips.map((trip) => trip.id));
    }

    return new Set(
      allTrips
        .filter((trip) => trip.label.toLowerCase().includes(normalizedQuery))
        .map((trip) => trip.id),
    );
  }, [searchQuery]);

  const handleNewTrip = () => {
    setSearchQuery("");
    setSelectedTripId("kandy");
    setActiveNavigation(null);
  };

  const _renderNavigationIcon = (icon: NavigationItem["icon"]) => {
    if (icon === "explore") {
      return (
        <span className="relative w-[15px] h-[15px]" aria-hidden="true">
          <img
            className="absolute w-[91.67%] h-[91.67%] top-[8.33%] left-[8.33%]"
            alt=""
            src={vector3}
          />
        </span>
      );
    }

    if (icon === "saved") {
      return (
        <span className="relative w-[15px] h-[15px]" aria-hidden="true">
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
        </span>
      );
    }

    return (
      <span className="relative w-[15px] h-[15px]" aria-hidden="true">
        <img
          className="absolute w-[79.17%] h-full top-0 left-[20.83%]"
          alt=""
          src={vector6}
        />
      </span>
    );
  };

  return (
    <aside
      className="flex flex-col w-72 h-[1218px] items-start relative bg-white border-r [border-right-style:solid] border-[#41287433]"
      aria-label="Trip navigation"
    >
      <header className="flex flex-col items-start gap-3 pt-[18px] pb-4 px-4 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex items-center pt-0 pb-1.5 px-0 relative self-stretch w-full flex-[0_0_auto]">
          <div className="inline-flex items-center gap-[11px] relative flex-[0_0_auto] mr-[-10.00px]">
            <div
              className="relative w-[25px] h-6 bg-cover bg-[50%_50%]"
              style={{ backgroundImage: `url(${container})` }}
              aria-hidden="true"
            />
            <div className="inline-flex items-center gap-[74px] relative flex-[0_0_auto]">
              <div className="relative flex items-center w-fit mt-[-1.00px] font-fraunces-bold font-[number:var(--fraunces-bold-font-weight)] text-black text-[length:var(--fraunces-bold-font-size)] tracking-[var(--fraunces-bold-letter-spacing)] leading-[var(--fraunces-bold-line-height)] [font-style:var(--fraunces-bold-font-style)]">
                SmartJourney
              </div>
              <div
                className="relative w-[25px] h-[22px] bg-cover bg-[50%_50%]"
                style={{ backgroundImage: `url(${container2})` }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <button
          className="box-border flex items-center gap-2.5 px-3.5 py-3 relative self-stretch w-full flex-[0_0_auto] bg-[#831c91] rounded-xl border-0 cursor-pointer"
          type="button"
          onClick={handleNewTrip}
        >
          <span className="relative w-4 h-4" aria-hidden="true">
            <img
              className="absolute w-[83.75%] h-[83.75%] top-[16.25%] left-[16.25%]"
              alt=""
              src={vector}
            />
          </span>
          <span className="relative flex items-center justify-center w-fit mt-[-1.00px] font-semantic-button font-[number:var(--semantic-button-font-weight)] text-white text-[length:var(--semantic-button-font-size)] text-center tracking-[var(--semantic-button-letter-spacing)] leading-[var(--semantic-button-line-height)] [font-style:var(--semantic-button-font-style)]">
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
              className="relative self-stretch w-full border-[none] [background:none] mt-[-1.00px] font-semantic-input font-[number:var(--semantic-input-font-weight)] text-[#00000066] text-[length:var(--semantic-input-font-size)] tracking-[var(--semantic-input-letter-spacing)] leading-[var(--semantic-input-line-height)] [font-style:var(--semantic-input-font-style)] p-0 outline-none"
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
        aria-label="Main navigation"
      >
        {navigationItems.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-2.5 px-2 py-[9px] relative self-stretch w-full flex-[0_0_auto] rounded-lg border-0 bg-transparent text-left cursor-pointer"
            type="button"
            onClick={() =>
              setActiveNavigation((currentItem) =>
                currentItem === item.label ? null : item.label,
              )
            }
            aria-pressed={activeNavigation === item.label}
          >
            <span className="relative flex items-center w-fit mt-[-1.00px] font-semantic-input font-[number:var(--semantic-input-font-weight)] text-[#000000bf] text-[length:var(--semantic-input-font-size)] tracking-[var(--semantic-input-letter-spacing)] leading-[var(--semantic-input-line-height)] [font-style:var(--semantic-input-font-style)]">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
      <section
        className="relative flex-1 self-stretch w-full grow overflow-y-auto overflow-x-hidden"
        aria-label="Your trips"
      >
        {tripGroups.map((group) => {
          const hasVisibleTrips = group.trips.some((trip) =>
            visibleTripIds.has(trip.id),
          );

          if (!hasVisibleTrips) {
            return null;
          }

          return (
            <div key={group.heading}>
              <div
                className="flex flex-col w-[calc(100%_-_20px)] items-start pt-3.5 pb-1.5 px-2 absolute left-2.5"
                style={{ top: group.headingTop }}
              >
                <div className="relative flex items-center w-fit mt-[-1.00px] [font-family:'JetBrains_Mono-Regular',Helvetica] font-normal text-[#00000059] text-[10.5px] tracking-[0.84px] leading-[normal]">
                  {group.heading}
                </div>
              </div>
              {group.trips.map((trip) => {
                if (!visibleTripIds.has(trip.id)) {
                  return null;
                }

                const isSelected = selectedTripId === trip.id;

                return (
                  <button
                    key={trip.id}
                    className={`flex w-[calc(100%_-_20px)] items-center px-2.5 py-[9px] absolute left-2.5 rounded-lg border-0 text-left cursor-pointer ${
                      isSelected ? "bg-[#ffe6f4]" : "bg-transparent"
                    } ${trip.verified ? "justify-between" : ""}`}
                    style={{ top: trip.top }}
                    type="button"
                    onClick={() => setSelectedTripId(trip.id)}
                    aria-current={isSelected ? "page" : undefined}
                  >
                    <span className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                      <span
                        className={`relative flex items-center w-fit mt-[-1.00px] font-semantic-input font-[number:var(--semantic-input-font-weight)] text-[length:var(--semantic-input-font-size)] tracking-[var(--semantic-input-letter-spacing)] leading-[var(--semantic-input-line-height)] [font-style:var(--semantic-input-font-style)] ${
                          isSelected ? "text-black" : "text-[#000000cc]"
                        }`}
                      >
                        {trip.label}
                      </span>
                    </span>
                    {trip.verified && (
                      <span className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                        <span className="text-[9.5px] leading-[normal] relative flex items-center w-fit mt-[-1.00px] [font-family:'JetBrains_Mono-Regular',Helvetica] font-normal text-[#412874] tracking-[0]">
                          verified
                        </span>
                      </span>
                    )}
                    {isSelected && (
                      <span
                        className="absolute h-[calc(100%_-_16px)] top-2 -left-2.5 w-[3px] bg-[#831c91] rounded-[3px]"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </section>
      <footer className="flex flex-col items-start p-3 relative self-stretch w-full flex-[0_0_auto] border-t [border-top-style:solid] border-[#00000014]">
        <button
          className="flex items-center gap-2 pt-2.5 pb-0.5 px-2 relative self-stretch w-full flex-[0_0_auto] border-0 bg-transparent text-left cursor-pointer"
          type="button"
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
          className="flex items-center gap-2.5 p-2 relative self-stretch w-full flex-[0_0_auto] rounded-[10px] border-0 bg-transparent text-left cursor-pointer"
          type="button"
          aria-label="Open traveler account"
        >
          <span className="flex w-8 h-8 items-center justify-center relative bg-[#831c91] rounded-2xl">
            <span className="text-white relative flex items-center justify-center w-fit font-plus-jakarta-sans-extrabold font-[number:var(--plus-jakarta-sans-extrabold-font-weight)] text-[length:var(--plus-jakarta-sans-extrabold-font-size)] text-center tracking-[var(--plus-jakarta-sans-extrabold-letter-spacing)] leading-[var(--plus-jakarta-sans-extrabold-line-height)] [font-style:var(--plus-jakarta-sans-extrabold-font-style)]">
              ST
            </span>
          </span>
          <span className="flex flex-col items-start relative flex-1 grow">
            <span className="flex self-stretch w-full flex-col items-start relative flex-[0_0_auto]">
              <span className="relative flex items-center self-stretch mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-black text-[13.5px] tracking-[0] leading-[normal]">
                Stt
              </span>
            </span>
            <span className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
              <span className="relative flex items-center self-stretch mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-[#00000073] text-[11.5px] tracking-[0] leading-[normal]">
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
