import { FormEvent, useState } from "react";
import background from "./background.png";
import background2 from "./background-2.png";
import container from "./container.svg";
import image from "./image.png";

const itineraryDays = [
  {
    day: "DAY 1",
    activity: "Temple of the Tooth (early) → Kandy Lake walk",
  },
  {
    day: "DAY 2",
    activity: "Royal Botanical Gardens → Tea factory tour",
  },
  {
    day: "DAY 3",
    activity: "Knuckles foothills viewpoint (easy trail)",
  },
  {
    day: "DAY 4",
    activity: "Local market → departure",
  },
];

const quickActions = [
  "Show budget breakdown",
  "Swap day 3 for something else",
  "Add a restaurant near the lake",
];

const assistantAvatars = [background, image, background2];

export const TripPlanningWorkspaceSection = (): JSX.Element => {
  const [message, setMessage] = useState("");
  const [lastAction, setLastAction] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message.trim()) {
      setLastAction(message.trim());
      setMessage("");
    }
  };

  const handleQuickAction = (action: string) => {
    setLastAction(action);
  };

  return (
    <main className="inline-flex items-center justify-center gap-[15px] relative flex-[0_0_auto] bg-white">
      <section
        className="flex flex-col w-[780px] h-[1217.75px] items-center justify-center relative"
        aria-label="Trip planning conversation"
      >
        <div className="flex items-center gap-2.5 p-2.5 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col max-w-[760px] w-[760px] h-[1062px] items-start gap-[22px] pt-8 pb-12 px-6 relative">
            <article className="flex items-start gap-3.5 pl-[110.64px] pr-0 py-0 relative self-stretch w-full flex-[0_0_auto]">
              <div className="inline-flex max-w-[555.36px] items-start justify-end relative flex-[0_0_auto]">
                <div className="inline-flex flex-col items-start pl-4 pr-[39.66px] pt-[10.88px] pb-[12.62px] relative self-stretch flex-[0_0_auto] ml-[-0.30px] bg-[#ffe6f4] rounded-[16px_16px_4px_16px]">
                  <p className="text-[#412874] text-[15px] leading-[24.8px] relative w-fit mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal tracking-[0]">
                    4 days in Kandy, mid-range budget, traveling with my parents
                    — no long
                    <br />
                    hikes please.
                  </p>
                </div>
              </div>
              <div
                className="flex w-8 h-8 items-center justify-center relative bg-[#ffe6f4] rounded-[9px]"
                aria-label="Traveler initials ST"
              >
                <span className="text-[#412874] relative flex items-center justify-center w-fit font-plus-jakarta-sans-extrabold font-[number:var(--plus-jakarta-sans-extrabold-font-weight)] text-[length:var(--plus-jakarta-sans-extrabold-font-size)] text-center tracking-[var(--plus-jakarta-sans-extrabold-letter-spacing)] leading-[var(--plus-jakarta-sans-extrabold-line-height)] [font-style:var(--plus-jakarta-sans-extrabold-font-style)]">
                  ST
                </span>
              </div>
            </article>
            <article className="flex items-start gap-3.5 pt-1.5 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex w-8 h-8 items-center justify-center relative bg-[#412874] rounded-[9px]">
                <img
                  className="relative w-7 h-[27px] bg-blend-lighten"
                  alt="SmartJourney"
                  src={assistantAvatars[0]}
                />
              </div>
              <div className="inline-flex flex-col min-w-[555.36px] max-w-[555.36px] items-start gap-[5px] relative flex-[0_0_auto]">
                <header className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                  <span className="relative flex items-center w-fit mt-[-1.00px] font-plus-jakarta-sans-bold-upper font-[number:var(--plus-jakarta-sans-bold-upper-font-weight)] text-[#ff70bfcc] text-[length:var(--plus-jakarta-sans-bold-upper-font-size)] tracking-[var(--plus-jakarta-sans-bold-upper-letter-spacing)] leading-[var(--plus-jakarta-sans-bold-upper-line-height)] [font-style:var(--plus-jakarta-sans-bold-upper-font-style)]">
                    SMARTJOURNEY
                  </span>
                </header>
                <div className="flex flex-col items-start gap-[14.62px] pt-[1.88px] pb-[3px] px-0 relative self-stretch w-full flex-[0_0_auto]">
                  <p className="relative w-fit mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-[#12141a] text-[15px] tracking-[0] leading-[24.8px]">
                    <span className="text-[#412874]">
                      Got it — four easy-paced days, mid-range budget, nothing
                      strenuous. Pulling
                      <br />
                      only from{" "}
                    </span>
                    <strong className="text-[#412874] font-plus-jakarta-sans-bold font-[number:var(--plus-jakarta-sans-bold-font-weight)] [font-style:var(--plus-jakarta-sans-bold-font-style)] tracking-[var(--plus-jakarta-sans-bold-letter-spacing)] leading-[var(--plus-jakarta-sans-bold-line-height)] text-[length:var(--plus-jakarta-sans-bold-font-size)]">
                      verified
                    </strong>
                    <span className="text-[#412874]">
                      {" "}
                      Kandy listings. Here&apos;s a first draft:
                    </span>
                  </p>
                  <section
                    className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] rounded-2xl overflow-hidden shadow-[0px_12px_28px_-18px_#1a326340] bg-white border border-solid border-[#4129751f]"
                    aria-label="Kandy four day draft itinerary"
                  >
                    <header className="flex items-center justify-between px-4 py-3 relative self-stretch w-full flex-[0_0_auto] bg-[#412874]">
                      <strong className="relative flex items-center w-fit mt-[-1.00px] font-semantic-strong font-[number:var(--semantic-strong-font-weight)] text-white text-[length:var(--semantic-strong-font-size)] tracking-[var(--semantic-strong-letter-spacing)] leading-[var(--semantic-strong-line-height)] whitespace-nowrap [font-style:var(--semantic-strong-font-style)]">
                        Kandy · 4 days
                      </strong>
                      <span className="relative flex items-center w-fit mt-[-1.00px] font-jetbrains-mono-regular font-[number:var(--jetbrains-mono-regular-font-weight)] text-[#ffe6f4] text-[length:var(--jetbrains-mono-regular-font-size)] tracking-[var(--jetbrains-mono-regular-letter-spacing)] leading-[var(--jetbrains-mono-regular-line-height)] [font-style:var(--jetbrains-mono-regular-font-style)]">
                        DRAFT V1
                      </span>
                    </header>
                    <ol className="w-full">
                      {itineraryDays.map((item, index) => (
                        <li
                          className={`flex items-center gap-3 pt-[11.11px] pb-3 px-4 relative self-stretch w-full flex-[0_0_auto] ${
                            index < itineraryDays.length - 1
                              ? "border-b [border-bottom-style:solid] border-[#4129751f]"
                              : ""
                          }`}
                          key={item.day}
                        >
                          <span className="flex flex-col w-[74px] items-start relative font-jetbrains-mono-bold font-[number:var(--jetbrains-mono-bold-font-weight)] text-[#831c91] text-[length:var(--jetbrains-mono-bold-font-size)] tracking-[var(--jetbrains-mono-bold-letter-spacing)] leading-[var(--jetbrains-mono-bold-line-height)] whitespace-nowrap [font-style:var(--jetbrains-mono-bold-font-style)]">
                            {item.day}
                          </span>
                          <span className="flex flex-col w-[359.36px] items-start relative font-plus-jakarta-sans-regular font-[number:var(--plus-jakarta-sans-regular-font-weight)] text-[#412874] text-[length:var(--plus-jakarta-sans-regular-font-size)] tracking-[var(--plus-jakarta-sans-regular-letter-spacing)] leading-[var(--plus-jakarta-sans-regular-line-height)] whitespace-nowrap [font-style:var(--plus-jakarta-sans-regular-font-style)]">
                            {item.activity}
                          </span>
                          <span className="flex flex-col w-16 items-start px-2 py-[3px] relative bg-[#ffe6f4] rounded-md text-[length:var(--jetbrains-mono-regular-font-size)] leading-[var(--jetbrains-mono-regular-line-height)] whitespace-nowrap font-jetbrains-mono-regular font-[number:var(--jetbrains-mono-regular-font-weight)] text-[#412874] tracking-[var(--jetbrains-mono-regular-letter-spacing)] [font-style:var(--jetbrains-mono-regular-font-style)]">
                            Verified
                          </span>
                        </li>
                      ))}
                    </ol>
                  </section>
                </div>
              </div>
            </article>
            <article className="flex items-start gap-3.5 pl-[110.64px] pr-0 pt-1.5 pb-0 relative self-stretch w-full flex-[0_0_auto]">
              <div className="inline-flex max-w-[555.36px] items-start justify-end relative flex-[0_0_auto]">
                <div className="inline-flex flex-col items-start pl-4 pr-[46.14px] pt-[10.88px] pb-[12.62px] relative self-stretch flex-[0_0_auto] ml-[-0.78px] bg-[#ffe6f4] rounded-[16px_16px_4px_16px]">
                  <p className="relative w-fit mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-[#412874] text-[15px] tracking-[0] leading-[24.8px]">
                    Looks good — can you check if it&apos;ll rain, and keep us
                    under LKR 60,000
                    <br />
                    total for stays?
                  </p>
                </div>
              </div>
              <div
                className="flex w-8 h-8 items-center justify-center relative bg-[#ffe6f4] rounded-[9px]"
                aria-label="Traveler initials ST"
              >
                <span className="text-[#412874] relative flex items-center justify-center w-fit font-plus-jakarta-sans-extrabold font-[number:var(--plus-jakarta-sans-extrabold-font-weight)] text-[length:var(--plus-jakarta-sans-extrabold-font-size)] text-center tracking-[var(--plus-jakarta-sans-extrabold-letter-spacing)] leading-[var(--plus-jakarta-sans-extrabold-line-height)] [font-style:var(--plus-jakarta-sans-extrabold-font-style)]">
                  ST
                </span>
              </div>
            </article>
            <article className="flex items-start gap-3.5 pt-1.5 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex w-8 h-8 items-center justify-center relative bg-[#412874] rounded-[9px]">
                <img
                  className="relative w-7 h-[27px] bg-blend-lighten"
                  alt="SmartJourney"
                  src={assistantAvatars[1]}
                />
              </div>
              <div className="inline-flex flex-col max-w-[555.36px] items-start gap-[5px] relative flex-[0_0_auto]">
                <header className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                  <span className="relative flex items-center w-fit mt-[-1.00px] font-plus-jakarta-sans-bold-upper font-[number:var(--plus-jakarta-sans-bold-upper-font-weight)] text-[#ff70bfcc] text-[length:var(--plus-jakarta-sans-bold-upper-font-size)] tracking-[var(--plus-jakarta-sans-bold-upper-letter-spacing)] leading-[var(--plus-jakarta-sans-bold-upper-line-height)] [font-style:var(--plus-jakarta-sans-bold-upper-font-style)]">
                    SMARTJOURNEY
                  </span>
                </header>
                <div className="flex flex-col items-start gap-[14.5px] pt-[1.75px] pb-[3px] px-0 relative self-stretch w-full flex-[0_0_auto]">
                  <p className="relative w-fit mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-transparent text-[15px] tracking-[0] leading-[24.8px]">
                    <span className="text-[#412874]">
                      Checked the forecast —{" "}
                    </span>
                    <strong className="text-[#831c91] font-plus-jakarta-sans-bold font-[number:var(--plus-jakarta-sans-bold-font-weight)] [font-style:var(--plus-jakarta-sans-bold-font-style)] tracking-[var(--plus-jakarta-sans-bold-letter-spacing)] leading-[var(--plus-jakarta-sans-bold-line-height)] text-[length:var(--plus-jakarta-sans-bold-font-size)]">
                      light showers after 4pm on day one
                    </strong>
                    <span className="text-[#412874]">
                      , clear the rest of
                      <br />
                      the trip. I&apos;ve moved the lake walk to the morning.
                      For stays, I fit two verified mid-
                      <br />
                      range hotels into your budget with a small margin left for
                      meals.
                    </span>
                  </p>
                  <div
                    className="relative self-stretch w-full h-[85.25px]"
                    aria-label="Suggested follow-up questions"
                  >
                    {quickActions.map((action, index) => {
                      const positions = [
                        "top-0 left-0",
                        "top-0 left-[191px]",
                        "top-[47px] left-0",
                      ];

                      return (
                        <button
                          className={`inline-flex flex-col h-[calc(100%_-_47px)] items-start px-3.5 py-2 absolute ${positions[index]} rounded-[999px] bg-white border border-solid border-[#4129751f]`}
                          type="button"
                          key={action}
                          onClick={() => handleQuickAction(action)}
                        >
                          <span className="relative flex items-center w-fit font-plus-jakarta-sans-semibold font-[number:var(--plus-jakarta-sans-semibold-font-weight)] text-[#412874] text-[length:var(--plus-jakarta-sans-semibold-font-size)] tracking-[var(--plus-jakarta-sans-semibold-letter-spacing)] leading-[var(--plus-jakarta-sans-semibold-line-height)] whitespace-nowrap [font-style:var(--plus-jakarta-sans-semibold-font-style)]">
                            {action}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </article>
            <div className="flex flex-col items-center pt-[7px] pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]">
              <span className="inline-flex items-start justify-center px-3.5 py-[5px] relative flex-[0_0_auto] bg-[#ffe6f4] rounded-[999px]">
                <span className="justify-center text-[#ff70bfcc] text-[length:var(--jetbrains-mono-regular-upper-font-size)] text-center tracking-[var(--jetbrains-mono-regular-upper-letter-spacing)] relative flex items-center w-fit mt-[-1.00px] font-jetbrains-mono-regular-upper font-[number:var(--jetbrains-mono-regular-upper-font-weight)] leading-[var(--jetbrains-mono-regular-upper-line-height)] [font-style:var(--jetbrains-mono-regular-upper-font-style)]">
                  TODAY
                </span>
              </span>
            </div>
            <article className="flex items-start gap-3.5 pl-[305.48px] pr-0 py-0 relative self-stretch w-full flex-[0_0_auto]">
              <div className="inline-flex max-w-[555.36px] items-start justify-end relative flex-[0_0_auto]">
                <div className="inline-flex flex-col items-start pt-[11px] pb-[12.75px] px-4 relative self-stretch flex-[0_0_auto] bg-[#ffe6f4] rounded-[16px_16px_4px_16px]">
                  <p className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-[#412874] text-[15px] tracking-[0] leading-[24.8px] whitespace-nowrap">
                    Perfect, lock it in. Add it to my saved itineraries.
                  </p>
                </div>
              </div>
              <div
                className="flex w-8 h-8 items-center justify-center relative mr-[-0.48px] bg-[#ffe6f4] rounded-[9px]"
                aria-label="Traveler initials ST"
              >
                <span className="text-[#412874] relative flex items-center justify-center w-fit font-plus-jakarta-sans-extrabold font-[number:var(--plus-jakarta-sans-extrabold-font-weight)] text-[length:var(--plus-jakarta-sans-extrabold-font-size)] text-center tracking-[var(--plus-jakarta-sans-extrabold-letter-spacing)] leading-[var(--plus-jakarta-sans-extrabold-line-height)] [font-style:var(--plus-jakarta-sans-extrabold-font-style)]">
                  ST
                </span>
              </div>
            </article>
            <article className="flex items-start gap-3.5 pt-1.5 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto] mb-[-0.19px]">
              <div className="flex w-8 h-8 items-center justify-center relative bg-[#412874] rounded-[9px]">
                <img
                  className="relative w-7 h-[27px] bg-blend-lighten"
                  alt="SmartJourney"
                  src={assistantAvatars[2]}
                />
              </div>
              <div className="inline-flex flex-col min-w-[555.36px] max-w-[555.36px] items-start gap-[5px] relative flex-[0_0_auto]">
                <header className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                  <span className="relative flex items-center w-fit mt-[-1.00px] font-plus-jakarta-sans-bold-upper font-[number:var(--plus-jakarta-sans-bold-upper-font-weight)] text-[#ff70bfcc] text-[length:var(--plus-jakarta-sans-bold-upper-font-size)] tracking-[var(--plus-jakarta-sans-bold-upper-letter-spacing)] leading-[var(--plus-jakarta-sans-bold-upper-line-height)] [font-style:var(--plus-jakarta-sans-bold-upper-font-style)]">
                    SMARTJOURNEY
                  </span>
                </header>
                <div className="flex flex-col items-start px-0 py-[3px] relative self-stretch w-full flex-[0_0_auto]">
                  <p className="relative w-fit mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-[#12141a] text-[15px] tracking-[0] leading-[24.8px]">
                    <span className="text-[#412874]">Saved as </span>
                    <strong className="text-[#412874] font-plus-jakarta-sans-bold font-[number:var(--plus-jakarta-sans-bold-font-weight)] [font-style:var(--plus-jakarta-sans-bold-font-style)] tracking-[var(--plus-jakarta-sans-bold-letter-spacing)] leading-[var(--plus-jakarta-sans-bold-line-height)] text-[length:var(--plus-jakarta-sans-bold-font-size)]">
                      &quot;4 days in Kandy, mid-range budget&quot;
                    </strong>
                    <span className="text-[#412874]">
                      {" "}
                      — you&apos;ll find it in the sidebar,
                      <br />
                      and it&apos;ll sync to the map view on mobile
                      automatically.
                    </span>
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
        <form
          className="flex flex-col items-start gap-2.5 p-2.5 relative self-stretch w-full flex-[0_0_auto]"
          onSubmit={handleSubmit}
        >
          <label className="sr-only" htmlFor="trip-message">
            Message Wayfare
          </label>
          <div className="flex max-w-[760px] items-end gap-2.5 pl-[18px] pr-2 py-2 relative w-full flex-[0_0_auto] rounded-[20px] bg-white border border-solid border-[#4129751f]">
            <div className="absolute w-full h-full top-0 left-0 bg-[#ffffff01] rounded-[20px] shadow-[0px_14px_34px_-20px_#1a32634c] pointer-events-none" />
            <div className="flex flex-col max-h-[140px] items-start pt-[9px] pb-2.5 px-0 relative flex-1 grow overflow-scroll">
              <textarea
                id="trip-message"
                className="relative flex items-center self-stretch mt-[-1.00px] min-h-[24px] resize-none bg-transparent outline-none font-semantic-textarea font-[number:var(--semantic-textarea-font-weight)] text-[#412874] text-[length:var(--semantic-textarea-font-size)] tracking-[var(--semantic-textarea-letter-spacing)] leading-[var(--semantic-textarea-line-height)] [font-style:var(--semantic-textarea-font-style)] placeholder:text-[#ff70bfcc]"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Message Wayfare — ask about dates, budget, or a place..."
                aria-describedby={lastAction ? "last-action" : undefined}
                rows={1}
              />
            </div>
            <button
              className="relative flex-[0_0_auto] rounded-full focus:outline-none focus:ring-2 focus:ring-[#831c91]"
              type="submit"
              aria-label="Send message"
            >
              <img alt="" src={container} />
            </button>
          </div>
          {lastAction ? (
            <span id="last-action" className="sr-only" aria-live="polite">
              Selected: {lastAction}
            </span>
          ) : null}
        </form>
      </section>
      <aside
        className="relative w-[1026px] h-[1218px] bg-cover bg-[50%_50%]"
        style={{ backgroundImage: "url(/frame-10.png)" }}
        aria-label="Kandy itinerary map"
      />
    </main>
  );
};
