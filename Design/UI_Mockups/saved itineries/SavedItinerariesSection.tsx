import { useState } from "react";

type Itinerary = {
  id: number;
  title: string;
  status: string;
  statusClassName: string;
  image: string;
  days: string;
  dates: string;
  price: string;
};

const itineraries: Itinerary[] = [
  {
    id: 1,
    title: "Family trip to Galle Fort",
    status: "In Progress",
    statusClassName: "bg-[#ff70bf] text-white",
    image: "/background.png",
    days: "5 Days",
    dates: "Nov 12 -16",
    price: "$300",
  },
  {
    id: 2,
    title: "Sigiriya Adventure",
    status: "Verified",
    statusClassName: "bg-[#412874] text-white",
    image: "/image.png",
    days: "5 Days",
    dates: "Nov 12 -16",
    price: "$300",
  },
  {
    id: 3,
    title: "4 Days in Kandy",
    status: "Verified",
    statusClassName: "bg-[#412874] text-white",
    image: "/background-2.png",
    days: "5 Days",
    dates: "Nov 12 -16",
    price: "$300",
  },
  {
    id: 4,
    title: "4 Days in Temple",
    status: "In Progress",
    statusClassName: "bg-[#ff70bf] text-white",
    image: "/background-3.png",
    days: "5 Days",
    dates: "Nov 12 -16",
    price: "$300",
  },
  {
    id: 5,
    title: "4 Days in Kandy",
    status: "In Progress",
    statusClassName: "bg-[#ff70bf] text-[#e1c8c8]",
    image: "/background-4.png",
    days: "5 Days",
    dates: "Nov 12 -16",
    price: "$300",
  },
  {
    id: 6,
    title: "Ella View",
    status: "Missing Hotel",
    statusClassName: "bg-[#ffe6f4] text-[#d552a3]",
    image: "/background-5.png",
    days: "5 Days",
    dates: "Nov 12 -16",
    price: "$300",
  },
];

const tabs = ["Upcoming", "Drafts / In Progress", "Past Trips"];

export const SavedItinerariesSection = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  return (
    <section
      className="relative flex h-[1218px] w-[1821px] flex-col items-center justify-center gap-[50px] bg-white"
      aria-labelledby="saved-itineraries-heading"
    >
      <div className="relative flex h-full w-[1280px] flex-1 grow flex-col items-start gap-2 overflow-scroll p-12">
        <header className="relative flex flex-[0_0_auto] flex-col items-start self-stretch">
          <h1
            id="saved-itineraries-heading"
            className="relative mt-[-1px] flex items-center self-stretch font-inter-bold text-[length:var(--inter-bold-font-size)] font-[number:var(--inter-bold-font-weight)] leading-[var(--inter-bold-line-height)] tracking-[var(--inter-bold-letter-spacing)] text-gray-800 [font-style:var(--inter-bold-font-style)]"
          >
            Saved itineraries
          </h1>
        </header>
        <div className="relative flex w-full flex-[0_0_auto] flex-col items-start px-0 pb-2 pt-0">
          <p className="relative mt-[-1px] flex items-center self-stretch font-inter-semi-bold-upper text-[length:var(--inter-semi-bold-upper-font-size)] font-[number:var(--inter-semi-bold-upper-font-weight)] leading-[var(--inter-semi-bold-upper-line-height)] tracking-[var(--inter-semi-bold-upper-letter-spacing)] text-[#ff70bf] [font-style:var(--inter-semi-bold-upper-font-style)]">
            YOUR JOURNEYS
          </p>
        </div>
        <nav
          className="relative flex w-full flex-[0_0_auto] items-start gap-6 border border-b border-solid"
          aria-label="Itinerary categories"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative inline-flex flex-[0_0_auto] items-center gap-2 border-0 bg-transparent px-0 pb-3 pt-0 outline-none ${
                  isActive ? "text-[#412874]" : "text-[#412874]"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="relative mt-[-1px] flex w-fit items-center whitespace-nowrap [font-family:'Inter-SemiBold',Helvetica] text-[15px] font-semibold leading-[normal] tracking-[0]">
                  {tab}
                </span>
                {tab === "Upcoming" && (
                  <span className="relative inline-flex flex-[0_0_auto] flex-col items-start rounded-xl bg-[#412874] px-2 py-0.5">
                    <span className="relative mt-[-1px] flex w-fit items-center whitespace-nowrap font-inter-semi-bold text-[length:var(--inter-semi-bold-font-size)] font-[number:var(--inter-semi-bold-font-weight)] leading-[var(--inter-semi-bold-line-height)] tracking-[var(--inter-semi-bold-letter-spacing)] text-white [font-style:var(--inter-semi-bold-font-style)]">
                      Active
                    </span>
                  </span>
                )}
                {isActive && (
                  <span
                    className="absolute -bottom-px left-0 h-0.5 w-full bg-[#412874]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>
        <div className="grid h-[621.59px] grid-cols-3 grid-rows-[286.80px_286.80px] gap-6 px-0 pb-0 pt-6">
          {itineraries.map((itinerary) => {
            const isMenuOpen = openMenuId === itinerary.id;

            return (
              <article
                key={itinerary.id}
                className="relative flex h-fit w-full flex-col items-start overflow-visible rounded-xl border border-solid bg-white shadow-[0px_1px_2px_#0000000d]"
                aria-labelledby={`itinerary-title-${itinerary.id}`}
              >
                <div
                  className="relative z-[1] h-40 w-full self-stretch rounded-t-xl bg-cover bg-[50%_50%]"
                  style={{ backgroundImage: `url(${itinerary.image})` }}
                >
                  <span
                    className={`absolute left-3 top-3 inline-flex flex-col items-start rounded-md px-2.5 py-1 shadow-[0px_1px_2px_#0000000d] ${itinerary.statusClassName}`}
                  >
                    <span className="relative mt-[-1px] flex w-fit items-center whitespace-nowrap font-inter-semi-bold text-[length:var(--inter-semi-bold-font-size)] font-[number:var(--inter-semi-bold-font-weight)] leading-[var(--inter-semi-bold-line-height)] tracking-[var(--inter-semi-bold-letter-spacing)] [font-style:var(--inter-semi-bold-font-style)]">
                      {itinerary.status}
                    </span>
                  </span>
                  <button
                    type="button"
                    aria-label={`Actions for ${itinerary.title}`}
                    aria-expanded={isMenuOpen}
                    onClick={() =>
                      setOpenMenuId(isMenuOpen ? null : itinerary.id)
                    }
                    className="absolute right-[11px] top-3 flex h-7 w-7 items-center justify-center rounded-md border-0 bg-white p-0 shadow-[0px_1px_2px_#0000000d]"
                  >
                    <span
                      className="relative flex w-fit items-center justify-center font-semantic-button text-[length:var(--semantic-button-font-size)] font-[number:var(--semantic-button-font-weight)] leading-[var(--semantic-button-line-height)] tracking-[var(--semantic-button-letter-spacing)] text-gray-800 [font-style:var(--semantic-button-font-style)]"
                      aria-hidden="true"
                    >
                      •••
                    </span>
                  </button>
                  {isMenuOpen && (
                    <div
                      className="absolute right-[11px] top-11 z-10 flex min-w-[104px] flex-col overflow-hidden rounded-md border border-solid border-gray-200 bg-white py-1 shadow-[0px_4px_12px_#0000001a]"
                      role="menu"
                      aria-label={`Actions for ${itinerary.title}`}
                    >
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => setOpenMenuId(null)}
                        className="border-0 bg-white px-3 py-2 text-left [font-family:'Inter-SemiBold',Helvetica] text-xs font-semibold text-[#412874] hover:bg-[#ffe6f4]"
                      >
                        View trip
                      </button>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => setOpenMenuId(null)}
                        className="border-0 bg-white px-3 py-2 text-left [font-family:'Inter-SemiBold',Helvetica] text-xs font-semibold text-[#412874] hover:bg-[#ffe6f4]"
                      >
                        Edit trip
                      </button>
                    </div>
                  )}
                </div>
                <div className="relative z-0 flex w-full flex-[0_0_auto] flex-col items-start gap-1 px-4 pb-5 pt-[15.9px]">
                  <h2
                    id={`itinerary-title-${itinerary.id}`}
                    className="relative mt-[-1px] flex items-center self-stretch font-semantic-heading-3 text-[length:var(--semantic-heading-3-font-size)] font-[number:var(--semantic-heading-3-font-weight)] leading-[var(--semantic-heading-3-line-height)] tracking-[var(--semantic-heading-3-letter-spacing)] text-gray-800 [font-style:var(--semantic-heading-3-font-style)]"
                  >
                    {itinerary.title}
                  </h2>
                  <p className="relative mt-[-1px] w-fit font-semantic-input text-[length:var(--semantic-input-font-size)] font-[number:var(--semantic-input-font-weight)] leading-[var(--semantic-input-line-height)] tracking-[var(--semantic-input-letter-spacing)] text-[#412874b2] [font-style:var(--semantic-input-font-style)]">
                    {itinerary.days}
                    <br />
                    {itinerary.dates}
                    <br />
                    {itinerary.price}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
