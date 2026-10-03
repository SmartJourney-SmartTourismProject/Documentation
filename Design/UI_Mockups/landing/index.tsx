import { useState } from "react";
import chatgptImageJul192026014658Pm11 from "./chatgpt-image-jul-19-2026-01-46-58-PM-1-1.png";

const statistics = [
  { value: "40+", label: "Itineraries built" },
  { value: "120+", label: "Countries Covered" },
  { value: "4.9", label: "Traveler Ratings" },
];

type AuthMode = "login" | "signup" | null;

export const LandingPage = (): JSX.Element => {
  const [authMode, setAuthMode] = useState<AuthMode>(null);

  const openAuthModal = (mode: Exclude<AuthMode, null>) => {
    setAuthMode(mode);
  };

  const closeAuthModal = () => {
    setAuthMode(null);
  };

  const handleAuthSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    closeAuthModal();
  };

  const scrollToStatistics = () => {
    document.getElementById("journey-statistics")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <main className="bg-white overflow-hidden w-full min-w-[1920px] min-h-[1080px] relative">
      <img
        className="absolute top-0 left-0 w-[1920px] h-[1080px] aspect-[1.53] object-cover"
        alt=""
        aria-hidden="true"
        src={chatgptImageJul192026014658Pm11}
      />
      <div
        className="flex flex-col w-[1940px] items-start gap-2.5 p-2.5 absolute -top-2.5 -left-2.5"
        aria-hidden="true"
      >
        <div className="relative self-stretch w-full h-[97px] bg-[#00000057]" />
      </div>
      <header className="flex w-[1862px] items-center justify-between absolute top-[17px] left-[31px]">
        <a
          className="inline-flex items-center gap-[5px] relative flex-[0_0_auto] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          href="#main-content"
          aria-label="SmartJourney home"
        >
          <span
            className="relative w-[65px] h-16 bg-[url(/container.png)] bg-cover bg-[50%_50%]"
            aria-hidden="true"
          />
          <span className="inline-flex items-center gap-[74px] relative flex-[0_0_auto]">
            <span className="relative flex items-center w-fit mt-[-1.00px] font-fraunces-semibold font-[number:var(--fraunces-semibold-font-weight)] text-white text-[length:var(--fraunces-semibold-font-size)] tracking-[var(--fraunces-semibold-letter-spacing)] leading-[var(--fraunces-semibold-line-height)] [font-style:var(--fraunces-semibold-font-style)]">
              SmartJourney
            </span>
          </span>
        </a>
        <nav
          className="inline-flex items-center gap-3 relative flex-[0_0_auto]"
          aria-label="Account actions"
        >
          <button
            className="all-unset box-border relative w-[140px] h-[53px] rounded-xl overflow-hidden border border-solid border-white shadow-[0px_2px_4px_#00000040] bg-[linear-gradient(171deg,rgba(213,82,163,0)_0%,rgba(65,41,117,0)_100%)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            type="button"
            onClick={() => openAuthModal("login")}
          >
            <span className="absolute top-4 left-[calc(50.00%_-_34px)] w-[68px] h-5 flex items-center justify-center [font-family:'Arial-Bold',Helvetica] font-bold text-white text-[17.6px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
              Log In
            </span>
          </button>
          <button
            className="all-unset box-border relative w-[140px] h-[53px] rounded-xl overflow-hidden bg-[linear-gradient(171deg,rgba(213,82,163,1)_0%,rgba(65,41,117,1)_100%)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            type="button"
            onClick={() => openAuthModal("signup")}
          >
            <span className="absolute top-4 left-[calc(50.00%_-_34px)] w-[68px] h-5 flex items-center justify-center [font-family:'Arial-Bold',Helvetica] font-bold text-white text-[17.6px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
              Sign Up
            </span>
          </button>
        </nav>
      </header>
      <section
        id="main-content"
        className="flex flex-col w-[1144px] items-start gap-[114px] absolute top-[273px] left-[101px]"
        aria-labelledby="hero-title"
      >
        <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
          <div className="grid grid-cols-1 grid-rows-[repeat(3,fit-content(100%))] h-fit">
            <p className="relative flex items-center row-[3_/_4] col-[1_/_2] w-full h-full [font-family:'Alexandria-Light',Helvetica] font-light text-[#00000099] text-[34px] tracking-[0] leading-[normal]">
              Discover destinations, build personalized itineraries, and travel
              with confidence using AI backed by verified local insights.
            </p>
            <h1
              id="hero-title"
              className="relative flex items-center row-[1_/_2] col-[1_/_2] w-full h-full [font-family:'Fraunces-SemiBold',Helvetica] font-semibold text-[#412874] text-[200px] tracking-[0] leading-[normal]"
            >
              SmartJourney
            </h1>
            <h2 className="relative flex items-center row-[2_/_3] col-[1_/_2] w-full h-full [font-family:'Alexandria-Light',Helvetica] font-light text-black text-6xl tracking-[0] leading-[normal]">
              AI-Powered Travel Planning
            </h2>
          </div>
          <button
            className="flex flex-col w-[334px] items-center justify-center gap-2.5 px-[91px] py-[15px] relative flex-[0_0_auto] bg-[#41287452] rounded-[15px] overflow-hidden border-2 border-solid border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            type="button"
            onClick={scrollToStatistics}
          >
            <span className="relative flex items-center self-stretch mt-[-2.00px] [font-family:'Alexandria-Regular',Helvetica] font-normal text-white text-3xl tracking-[0] leading-[normal] whitespace-nowrap">
              Start Here
            </span>
          </button>
        </div>
        <dl
          id="journey-statistics"
          className="inline-flex items-center gap-[35px] relative flex-[0_0_auto]"
          aria-label="SmartJourney statistics"
        >
          {statistics.map((statistic) => (
            <div key={statistic.label} className="relative w-fit mt-[-1.00px]">
              <dt className="sr-only">{statistic.label}</dt>
              <dd className="[font-family:'Alexandria-SemiBold',Helvetica] font-normal text-white text-[64px] tracking-[0] leading-[normal]">
                <span className="font-semibold">
                  {statistic.value}
                  <br />
                </span>
                <span className="[font-family:'Alexandria-Light',Helvetica] font-light text-[32px]">
                  {statistic.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>
      {authMode !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          role="presentation"
          onMouseDown={closeAuthModal}
        >
          <section
            className="w-[420px] rounded-2xl bg-white p-8 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-dialog-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-6">
              <h2
                id="auth-dialog-title"
                className="[font-family:'Fraunces-SemiBold',Helvetica] text-3xl font-semibold text-[#412874]"
              >
                {authMode === "login" ? "Log In" : "Create your account"}
              </h2>
              <button
                className="text-2xl leading-none text-[#412874] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#412874]"
                type="button"
                aria-label="Close dialog"
                onClick={closeAuthModal}
              >
                ×
              </button>
            </div>
            <form
              className="mt-6 flex flex-col gap-4"
              onSubmit={handleAuthSubmit}
            >
              {authMode === "signup" && (
                <label className="flex flex-col gap-1.5 [font-family:'Alexandria-Regular',Helvetica] text-sm text-[#412874]">
                  Full name
                  <input
                    className="rounded-lg border border-[#41287466] bg-white px-3 py-2 text-base text-black"
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                  />
                </label>
              )}

              <label className="flex flex-col gap-1.5 [font-family:'Alexandria-Regular',Helvetica] text-sm text-[#412874]">
                Email address
                <input
                  className="rounded-lg border border-[#41287466] bg-white px-3 py-2 text-base text-black"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                />
              </label>
              <label className="flex flex-col gap-1.5 [font-family:'Alexandria-Regular',Helvetica] text-sm text-[#412874]">
                Password
                <input
                  className="rounded-lg border border-[#41287466] bg-white px-3 py-2 text-base text-black"
                  type="password"
                  name="password"
                  autoComplete={
                    authMode === "login" ? "current-password" : "new-password"
                  }
                  minLength={8}
                  required
                />
              </label>
              <button
                className="mt-2 rounded-xl bg-[linear-gradient(171deg,rgba(213,82,163,1)_0%,rgba(65,41,117,1)_100%)] px-5 py-3 [font-family:'Arial-Bold',Helvetica] text-[17.6px] font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#412874]"
                type="submit"
              >
                {authMode === "login" ? "Log In" : "Sign Up"}
              </button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
};
