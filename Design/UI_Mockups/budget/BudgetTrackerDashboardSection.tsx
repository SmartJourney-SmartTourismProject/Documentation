import { FormEvent, useState } from "react";
import vector10 from "./vector-10.svg";
import vector11 from "./vector-11.svg";

type ExpenseCategory = "Stays" | "Transport" | "Activities" | "Food & drink";

type Expense = {
  date: string;
  description: string;
  category: ExpenseCategory;
  day: string;
  amount: number;
};

const summaryCards = [
  {
    label: "TOTAL BUDGET",
    value: "LKR 60,000",
    detail: "Set for 4 days in Kandy",
    color: "#412874",
  },
  {
    label: "SPENT SO FAR",
    value: "LKR 41,250",
    detail: "69% of budget used",
    color: "#d552a3",
  },
  {
    label: "REMAINING",
    value: "LKR 18,750",
    detail: "On track for day 4",
    color: "#2fa86e",
    detailColor: "#2fa86e",
  },
  {
    label: "DAILY AVERAGE",
    value: "LKR 10,313",
    detail: "Across 4 planned days",
    color: "#e0436b",
  },
];

const tripBudgets = [
  {
    trip: "4 Days in Kandy",
    spent: "LKR 41,250",
    budget: "60,000",
    status: "ON TRACK",
    statusColor: "#2fa86e",
    statusBackground: "#e4f7ed",
    progress: 69,
    progressColor:
      "bg-[linear-gradient(90deg,rgba(131,28,145,1)_0%,rgba(213,82,163,1)_100%)]",
  },
  {
    trip: "Family trip to Galle Fort",
    spent: "$255",
    budget: "300",
    status: "WATCH",
    statusColor: "#e0a62a",
    statusBackground: "#fdf1dc",
    progress: 85,
    progressColor: "bg-[#e0a62a]",
  },
  {
    trip: "Sigiriya Adventure",
    spent: "$132",
    budget: "300",
    status: "ON TRACK",
    statusColor: "#2fa86e",
    statusBackground: "#e4f7ed",
    progress: 44,
    progressColor:
      "bg-[linear-gradient(90deg,rgba(131,28,145,1)_0%,rgba(213,82,163,1)_100%)]",
  },
  {
    trip: "Ella View",
    spent: "$318",
    budget: "300",
    status: "OVER BUDGET",
    statusColor: "#e0436b",
    statusBackground: "#fce3e9",
    progress: 100,
    progressColor: "bg-[#e0436b]",
  },
];

const categoryBreakdown = [
  { name: "Stays", percentage: "40%", color: "#412874" },
  { name: "Food & drink", percentage: "25%", color: "#d552a3" },
  { name: "Activities", percentage: "19%", color: "#d552a3" },
  { name: "Transport", percentage: "16%", color: "#e3d6ee" },
];

const initialExpenses: Expense[] = [
  {
    date: "Nov 12",
    description: "Amaya Hills — 2 nights, twin room",
    category: "Stays",
    day: "Day 1",
    amount: 16000,
  },
  {
    date: "Nov 12",
    description: "Tuk-tuk — airport to Temple of the Tooth",
    category: "Transport",
    day: "Day 1",
    amount: 2400,
  },
  {
    date: "Nov 13",
    description: "Royal Botanical Gardens — entry, 3 pax",
    category: "Activities",
    day: "Day 2",
    amount: 4500,
  },
  {
    date: "Nov 13",
    description: "Tea factory lunch set, 3 pax",
    category: "Food & drink",
    day: "Day 2",
    amount: 5850,
  },
  {
    date: "Nov 14",
    description: "Knuckles foothills — driver & guide",
    category: "Activities",
    day: "Day 3",
    amount: 7500,
  },
  {
    date: "Nov 14",
    description: "Dinner near Kandy Lake",
    category: "Food & drink",
    day: "Day 3",
    amount: 5000,
  },
];

const categoryColors: Record<ExpenseCategory, string> = {
  Stays: "#412874",
  Transport: "#e3d6ee",
  Activities: "#d552a3",
  "Food & drink": "#d552a3",
};

const tripOptions = [
  "4 Days in Kandy",
  "Family trip to Galle Fort",
  "Sigiriya Adventure",
  "Ella View",
];

const _formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-US").format(amount);

export const BudgetTrackerDashboardSection = (): JSX.Element => {
  const [selectedTrip, setSelectedTrip] = useState("4 Days in Kandy");
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    date: "",
    description: "",
    category: "Food & drink" as ExpenseCategory,
    day: "Day 1",
    amount: "",
  });

  const handleExpenseSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !newExpense.date.trim() ||
      !newExpense.description.trim() ||
      !newExpense.amount.trim()
    ) {
      return;
    }

    const amount = Number(newExpense.amount.replace(/,/g, ""));

    if (Number.isNaN(amount) || amount <= 0) {
      return;
    }

    setExpenses((currentExpenses) => [
      ...currentExpenses,
      {
        date: newExpense.date,
        description: newExpense.description,
        category: newExpense.category,
        day: newExpense.day,
        amount,
      },
    ]);

    setNewExpense({
      date: "",
      description: "",
      category: "Food & drink",
      day: "Day 1",
      amount: "",
    });
    setIsModalOpen(false);
  };

  return (
    <section
      className="relative flex h-[1218px] w-[1821px] flex-col items-center justify-center gap-[50px] bg-white"
      aria-labelledby="budget-tracker-title"
    >
      <div className="relative flex w-[1280px] max-w-screen-xl flex-1 flex-col items-start gap-[26px] px-10 pb-[60px] pt-8">
        <header className="relative flex w-full flex-wrap items-end">
          <div className="inline-flex flex-col items-start gap-1.5">
            <div className="flex w-full flex-col items-start px-0 pb-0.5 pt-px">
              <h1
                id="budget-tracker-title"
                className="font-inter-bold mt-[-1px] flex w-fit items-center text-[length:var(--inter-bold-font-size)] font-[number:var(--inter-bold-font-weight)] tracking-[var(--inter-bold-letter-spacing)] text-black [font-style:var(--inter-bold-font-style)] leading-[var(--inter-bold-line-height)]"
              >
                Budget tracker
              </h1>
            </div>
            <div className="flex w-full items-center gap-[335px]">
              <p className="flex w-fit items-center font-normal text-[#d552a3] [font-family:'Inter-Regular',Helvetica] text-sm leading-[normal]">
                Every verified stay, ticket and meal across your trips, tracked
                against what you set out to spend.
              </p>
              <label className="relative inline-flex items-center gap-2.5 rounded-[10px] border border-solid border-[#f0e4f2] bg-korma px-3.5 py-[9px]">
                <span className="absolute left-0 top-0 h-full w-full rounded-[10px] bg-[#ffffff01] shadow-[0px_10px_30px_-14px_#4129752e]" />
                <span className="relative h-[15px] w-[15px]" aria-hidden="true">
                  <img
                    className="absolute left-[12.89%] top-[8.72%] h-[91.28%] w-[87.11%]"
                    alt=""
                    src={vector10}
                  />
                </span>
                <span className="relative inline-flex flex-col items-start justify-center py-0 pl-1 pr-4">
                  <select
                    aria-label="Select trip"
                    className="appearance-none bg-transparent font-semantic-options text-[length:var(--semantic-options-font-size)] font-[number:var(--semantic-options-font-weight)] leading-[var(--semantic-options-line-height)] tracking-[var(--semantic-options-letter-spacing)] text-[#831c91] outline-none [font-style:var(--semantic-options-font-style)]"
                    value={selectedTrip}
                    onChange={(event) => setSelectedTrip(event.target.value)}
                  >
                    {tripOptions.map((trip) => (
                      <option key={trip} value={trip}>
                        {trip}
                      </option>
                    ))}
                  </select>
                </span>
              </label>
            </div>
          </div>
        </header>
        <section
          className="relative flex w-full items-start justify-center gap-[18px]"
          aria-label="Budget summary"
        >
          {summaryCards.map((card) => (
            <article
              key={card.label}
              className="relative flex flex-1 flex-col items-start gap-1 rounded-[20px] border border-solid border-[#f0e4f2] bg-korma px-[22px] py-5"
            >
              <div className="absolute left-0 top-0 h-full w-full rounded-[20px] bg-[#ffffff01] shadow-[0px_10px_30px_-14px_#4129752e]" />
              <div className="relative flex w-full items-center gap-[7px]">
                <span
                  className="h-2 w-2 rounded"
                  style={{ backgroundColor: card.color }}
                  aria-hidden="true"
                />
                <span className="mt-[-1px] flex w-fit items-center whitespace-nowrap text-[12.5px] font-semibold tracking-[0.5px] text-[#d552a3] [font-family:'Inter-SemiBold',Helvetica] leading-[normal]">
                  {card.label}
                </span>
              </div>
              <div className="relative flex w-full flex-col items-start px-0 pb-0.5 pt-[7px]">
                <strong className="font-inter-bold mt-[-1px] flex w-full items-center text-[length:var(--inter-bold-font-size)] font-[number:var(--inter-bold-font-weight)] tracking-[var(--inter-bold-letter-spacing)] text-black [font-style:var(--inter-bold-font-style)] leading-[var(--inter-bold-line-height)]">
                  {card.value}
                </strong>
              </div>
              <div className="relative flex w-full flex-col items-start">
                <span
                  className="mt-[-1px] flex w-full items-center text-[12.5px] font-normal tracking-[0] [font-family:'Inter-Regular',Helvetica] leading-[normal]"
                  style={{ color: card.detailColor ?? "#d552a3" }}
                >
                  {card.detail}
                </span>
              </div>
            </article>
          ))}
        </section>
        <div className="grid h-[821.69px] grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] grid-rows-[357.69px_440px] gap-5 px-0 pb-0 pt-1">
          <section
            className="relative col-[1_/_2] row-[1_/_2] flex h-fit w-full flex-col items-start rounded-[20px] border border-solid border-[#f0e4f2] bg-korma px-6 py-[22px]"
            aria-labelledby="budgets-by-trip-title"
          >
            <div className="absolute left-0 top-0 h-full w-full rounded-[20px] bg-[#ffffff01] shadow-[0px_10px_30px_-14px_#4129752e]" />
            <div className="relative flex w-full items-start">
              <div className="inline-flex flex-col items-start gap-1 px-0 pb-[18px] pt-0">
                <div className="flex w-full flex-col items-start px-0 py-px">
                  <h2
                    id="budgets-by-trip-title"
                    className="font-semantic-heading-2 mt-[-1px] flex w-fit items-center text-[length:var(--semantic-heading-2-font-size)] font-[number:var(--semantic-heading-2-font-weight)] tracking-[var(--semantic-heading-2-letter-spacing)] text-[#831c91] [font-style:var(--semantic-heading-2-font-style)] leading-[var(--semantic-heading-2-line-height)]"
                  >
                    Budgets by trip
                  </h2>
                </div>
                <p className="mt-[-1px] flex w-fit items-center whitespace-nowrap text-[12.5px] font-normal tracking-[0] text-[#d552a3] [font-family:'Inter-Regular',Helvetica] leading-[normal]">
                  How each saved itinerary is tracking against what you set
                  aside.
                </p>
              </div>
            </div>
            <div className="relative flex w-full flex-col">
              {tripBudgets.map((budget, index) => (
                <article
                  key={budget.trip}
                  className={`flex w-full flex-col items-start gap-[9px] px-0 ${
                    index === 0
                      ? "border-b border-[#f0e4f2] pb-3.5 pt-5"
                      : index === tripBudgets.length - 1
                        ? "pb-0.5 pt-3.5"
                        : "border-b border-[#f0e4f2] py-3.5"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="flex h-[18.17px] items-center gap-2.5">
                      <span className="flex h-[17px] items-center text-sm font-semibold tracking-[0] text-black [font-family:'Inter-SemiBold',Helvetica] leading-[normal]">
                        {budget.trip}
                      </span>
                      <span
                        className="inline-flex items-start rounded-[20px] px-2 py-0.5 font-inter-semi-bold-upper text-[length:var(--inter-semi-bold-upper-font-size)] font-[number:var(--inter-semi-bold-upper-font-weight)] tracking-[var(--inter-semi-bold-upper-letter-spacing)] [font-style:var(--inter-semi-bold-upper-font-style)] leading-[var(--inter-semi-bold-upper-line-height)]"
                        style={{
                          backgroundColor: budget.statusBackground,
                          color: budget.statusColor,
                        }}
                      >
                        {budget.status}
                      </span>
                    </div>
                    <p className="mt-[-1px] whitespace-nowrap text-right text-[12.5px] font-normal tracking-[0] [font-family:'Inter-SemiBold',Helvetica] leading-[normal]">
                      <strong className="font-semantic-strong text-[length:var(--semantic-strong-font-size)] font-[number:var(--semantic-strong-font-weight)] tracking-[var(--semantic-strong-letter-spacing)] text-black [font-style:var(--semantic-strong-font-style)] leading-[var(--semantic-strong-line-height)]">
                        {budget.spent}
                      </strong>
                      <span className="text-[#d552a3] [font-family:'Inter-Regular',Helvetica]">
                        {" "}
                        / {budget.budget}
                      </span>
                    </p>
                  </div>
                  <div
                    className="h-2 w-full overflow-hidden rounded-[20px] bg-[#ffe6f4]"
                    role="progressbar"
                    aria-label={`${budget.trip} budget usage`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={budget.progress}
                  >
                    <div
                      className={`h-full rounded-[20px] ${budget.progressColor}`}
                      style={{ width: `${budget.progress}%` }}
                    />
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section
            className="relative col-[2_/_3] row-[1_/_2] flex h-fit w-full flex-col items-center justify-center gap-1 rounded-[20px] border border-solid border-[#f0e4f2] bg-korma px-6 py-[22px]"
            aria-labelledby="spend-category-title"
          >
            <div className="absolute left-0 top-0 h-full w-full rounded-[20px] bg-[#ffffff01] shadow-[0px_10px_30px_-14px_#4129752e]" />
            <div className="relative flex w-full flex-col items-start px-0 py-px">
              <h2
                id="spend-category-title"
                className="font-semantic-heading-2 mt-[-1px] flex w-full items-center text-[length:var(--semantic-heading-2-font-size)] font-[number:var(--semantic-heading-2-font-weight)] tracking-[var(--semantic-heading-2-letter-spacing)] text-[#831c91] [font-style:var(--semantic-heading-2-font-style)] leading-[var(--semantic-heading-2-line-height)]"
              >
                Spend by category
              </h2>
            </div>
            <p className="relative mt-[-1px] flex w-full items-center text-[12.5px] font-normal tracking-[0] text-[#d552a3] [font-family:'Inter-Regular',Helvetica] leading-[normal]">
              4 Days in Kandy · current trip
            </p>
            <div className="relative flex w-full items-center gap-[26px] px-0 pb-0 pt-3.5">
              <div
                className="relative flex h-[148px] w-[148px] items-center justify-center rounded-[74px]"
                aria-label="LKR 41,250 spent"
              >
                <div className="relative flex h-[92px] w-[92px] flex-col items-center justify-center rounded-[46px] bg-korma">
                  <div className="absolute left-[calc(50%-46px)] top-[calc(50%-46px)] h-[92px] w-[92px] rounded-[46px] bg-[#ffffff01] shadow-[inset_0px_0px_0px_1px_#f0e4f2]" />
                  <strong className="font-poppins-bold relative mt-[-1px] flex w-fit items-center text-[length:var(--poppins-bold-font-size)] font-[number:var(--poppins-bold-font-weight)] tracking-[var(--poppins-bold-letter-spacing)] text-[#831c91] [font-style:var(--poppins-bold-font-style)] leading-[var(--poppins-bold-line-height)]">
                    41,250
                  </strong>
                  <span className="relative mt-[-1px] flex w-fit items-center whitespace-nowrap pt-0.5 text-[10px] font-normal tracking-[0] text-[#d552a3] [font-family:'Inter-Regular',Helvetica] leading-[normal]">
                    LKR spent
                  </span>
                </div>
              </div>
              <ul className="relative flex flex-1 flex-col items-start gap-[11px]">
                {categoryBreakdown.map((category) => (
                  <li
                    key={category.name}
                    className="flex w-full items-center gap-[9px]"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-[3px]"
                      style={{ backgroundColor: category.color }}
                      aria-hidden="true"
                    />
                    <span className="font-semantic-input mt-[-1px] flex flex-1 items-center text-[length:var(--semantic-input-font-size)] font-[number:var(--semantic-input-font-weight)] tracking-[var(--semantic-input-letter-spacing)] text-black [font-style:var(--semantic-input-font-style)] leading-[var(--semantic-input-line-height)]">
                      {category.name}
                    </span>
                    <strong className="font-semantic-strong mt-[-1px] flex w-fit items-center whitespace-nowrap text-[length:var(--semantic-strong-font-size)] font-[number:var(--semantic-strong-font-weight)] tracking-[var(--semantic-strong-letter-spacing)] text-[#d552a3] [font-style:var(--semantic-strong-font-style)] leading-[var(--semantic-strong-line-height)]">
                      {category.percentage}
                    </strong>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section
            className="relative col-[1_/_3] row-[2_/_3] flex h-fit w-full flex-col items-start gap-1.5 rounded-[20px] border border-solid border-[#f0e4f2] bg-korma px-6 py-[22px]"
            aria-labelledby="recent-expenses-title"
          >
            <div className="absolute left-0 top-0 h-full w-full rounded-[20px] bg-[#ffffff01] shadow-[0px_10px_30px_-14px_#4129752e]" />
            <div className="relative flex w-full items-start justify-between">
              <div className="inline-flex flex-col items-start gap-1 px-0 pb-[18px] pt-0">
                <div className="flex w-full flex-col items-start px-0 py-px">
                  <h2
                    id="recent-expenses-title"
                    className="font-semantic-heading-2 mt-[-1px] flex w-fit items-center text-[length:var(--semantic-heading-2-font-size)] font-[number:var(--semantic-heading-2-font-weight)] tracking-[var(--semantic-heading-2-letter-spacing)] text-[#831c91] [font-style:var(--semantic-heading-2-font-style)] leading-[var(--semantic-heading-2-line-height)]"
                  >
                    Recent expenses
                  </h2>
                </div>
                <p className="mt-[-1px] flex w-fit items-center whitespace-nowrap text-[12.5px] font-normal tracking-[0] text-[#d552a3] [font-family:'Inter-Regular',Helvetica] leading-[normal]">
                  Logged against 4 Days in Kandy, mid-range budget.
                </p>
              </div>
              <button
                type="button"
                className="relative inline-flex items-center gap-[7px] rounded-[10px] border border-dashed border-[#d552a3] bg-[#ffe6f4] px-[15px] py-[9px] transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#831c91] focus:ring-offset-2"
                onClick={() => setIsModalOpen(true)}
              >
                <span className="relative h-[13px] w-[13px]" aria-hidden="true">
                  <img
                    className="absolute left-[15.83%] top-[15.84%] h-[84.16%] w-[84.17%]"
                    alt=""
                    src={vector11}
                  />
                </span>
                <span className="font-semantic-button flex w-fit items-center justify-center whitespace-nowrap text-center text-[length:var(--semantic-button-font-size)] font-[number:var(--semantic-button-font-weight)] tracking-[var(--semantic-button-letter-spacing)] text-[#412874] [font-style:var(--semantic-button-font-style)] leading-[var(--semantic-button-line-height)]">
                  Add expense
                </span>
              </button>
            </div>
            <div className="relative w-full">
              <table className="w-full table-fixed border-collapse text-left">
                <caption className="sr-only">
                  Expenses logged against 4 Days in Kandy
                </caption>
                <colgroup>
                  <col className="w-[115.14px]" />
                  <col className="w-[506.06px]" />
                  <col className="w-[223.41px]" />
                  <col className="w-[102.92px]" />
                  <col className="w-[202.47px]" />
                </colgroup>
                <thead>
                  <tr>
                    {[
                      "DATE",
                      "DESCRIPTION",
                      "CATEGORY",
                      "DAY",
                      "AMOUNT (LKR)",
                    ].map((heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="border-b border-[#f0e4f2] px-2.5 pb-3 pt-0 text-left font-semantic-cell-upper text-[length:var(--semantic-cell-upper-font-size)] font-[number:var(--semantic-cell-upper-font-weight)] tracking-[var(--semantic-cell-upper-letter-spacing)] text-[#d552a3] [font-style:var(--semantic-cell-upper-font-style)] leading-[var(--semantic-cell-upper-line-height)]"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense, index) => {
                    const isLastRow = index === expenses.length - 1;

                    return (
                      <tr key={`${expense.date}-${expense.description}`}>
                        <td
                          className={`px-2.5 pb-4 pt-[17px] font-inter-regular text-[length:var(--inter-regular-font-size)] font-[number:var(--inter-regular-font-weight)] tracking-[var(--inter-regular-letter-spacing)] text-black [font-style:var(--inter-regular-font-style)] leading-[var(--inter-regular-line-height)] ${
                            isLastRow ? "" : "border-b border-[#f0e4f2]"
                          }`}
                        >
                          {expense.date}
                        </td>
                        <td
                          className={`px-2.5 pb-4 pt-[17px] font-inter-regular whitespace-nowrap text-[length:var(--inter-regular-font-size)] font-[number:var(--inter-regular-font-weight)] tracking-[var(--inter-regular-letter-spacing)] text-black [font-style:var(--inter-regular-font-style)] leading-[var(--inter-regular-line-height)] ${
                            isLastRow ? "" : "border-b border-[#f0e4f2]"
                          }`}
                        >
                          {expense.description}
                        </td>
                        <td
                          className={`px-2.5 py-[13px] ${
                            isLastRow ? "" : "border-b border-[#f0e4f2]"
                          }`}
                        >
                          <span className="inline-flex items-center gap-1.5 rounded-[20px] bg-[#ffe6f4] py-1 pl-2 pr-2.5">
                            <span
                              className="h-[7px] w-[7px] rounded-[3.5px]"
                              style={{
                                backgroundColor:
                                  categoryColors[expense.category],
                              }}
                              aria-hidden="true"
                            />
                            <span className="mt-[-1px] flex w-fit items-center text-xs font-semibold tracking-[0] text-[#412874] [font-family:'Inter-SemiBold',Helvetica] leading-[normal]">
                              {expense.category}
                            </span>
                          </span>
                        </td>
                        <td
                          className={`px-2.5 pb-4 pt-[17px] font-inter-regular whitespace-nowrap text-[length:var(--inter-regular-font-size)] font-[number:var(--inter-regular-font-weight)] tracking-[var(--inter-regular-letter-spacing)] text-black [font-style:var(--inter-regular-font-style)] leading-[var(--inter-regular-line-height)] ${
                            isLastRow ? "" : "border-b border-[#f0e4f2]"
                          }`}
                        >
                          {expense.day}
                        </td>
                        <td
                          className={`px-2.5 py-[15px] text-right font-semantic-data text-[length:var(--semantic-data-font-size)] font-[number:var(--semantic-data-font-weight)] tracking-[var(--semantic-data-letter-spacing)] text-black [font-style:var(--semantic-data-font-style)] leading-[var(--semantic-data-line-height)] ${
                            isLastRow ? "" : "border-b border-[#f0e4f2]"
                          }`}
                        ></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#412874]/30 p-6"
          role="presentation"
          onMouseDown={() => setIsModalOpen(false)}
        >
          <section
            className="w-full max-w-[440px] rounded-[20px] border border-[#f0e4f2] bg-white p-6 shadow-[0px_20px_45px_-18px_#41297566]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-expense-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2
                id="add-expense-title"
                className="font-semantic-heading-2 text-[length:var(--semantic-heading-2-font-size)] font-[number:var(--semantic-heading-2-font-weight)] tracking-[var(--semantic-heading-2-letter-spacing)] text-[#831c91] [font-style:var(--semantic-heading-2-font-style)] leading-[var(--semantic-heading-2-line-height)]"
              >
                Add expense
              </h2>
              <button
                type="button"
                className="text-lg font-semibold text-[#831c91] focus:outline-none focus:ring-2 focus:ring-[#831c91]"
                aria-label="Close add expense dialog"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleExpenseSubmit}
            >
              <label className="flex flex-col gap-1.5 text-xs font-semibold tracking-[0.4px] text-[#d552a3]">
                DATE
                <input
                  type="text"
                  required={true}
                  placeholder="Nov 15"
                  value={newExpense.date}
                  onChange={(event) =>
                    setNewExpense((current) => ({
                      ...current,
                      date: event.target.value,
                    }))
                  }
                  className="rounded-[10px] border border-[#f0e4f2] px-3 py-2.5 text-sm font-normal text-black outline-none focus:border-[#831c91]"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-xs font-semibold tracking-[0.4px] text-[#d552a3]">
                DESCRIPTION
                <input
                  type="text"
                  required={true}
                  placeholder="Expense description"
                  value={newExpense.description}
                  onChange={(event) =>
                    setNewExpense((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  className="rounded-[10px] border border-[#f0e4f2] px-3 py-2.5 text-sm font-normal text-black outline-none focus:border-[#831c91]"
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1.5 text-xs font-semibold tracking-[0.4px] text-[#d552a3]">
                  CATEGORY
                  <select
                    value={newExpense.category}
                    onChange={(event) =>
                      setNewExpense((current) => ({
                        ...current,
                        category: event.target.value as ExpenseCategory,
                      }))
                    }
                    className="rounded-[10px] border border-[#f0e4f2] bg-white px-3 py-2.5 text-sm font-normal text-black outline-none focus:border-[#831c91]"
                  >
                    {(Object.keys(categoryColors) as ExpenseCategory[]).map(
                      (category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ),
                    )}
                  </select>
                </label>
                <label className="flex flex-col gap-1.5 text-xs font-semibold tracking-[0.4px] text-[#d552a3]">
                  DAY
                  <select
                    value={newExpense.day}
                    onChange={(event) =>
                      setNewExpense((current) => ({
                        ...current,
                        day: event.target.value,
                      }))
                    }
                    className="rounded-[10px] border border-[#f0e4f2] bg-white px-3 py-2.5 text-sm font-normal text-black outline-none focus:border-[#831c91]"
                  >
                    {["Day 1", "Day 2", "Day 3", "Day 4"].map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="flex flex-col gap-1.5 text-xs font-semibold tracking-[0.4px] text-[#d552a3]">
                AMOUNT (LKR)
                <input
                  type="number"
                  min="1"
                  required={true}
                  placeholder="0"
                  value={newExpense.amount}
                  onChange={(event) =>
                    setNewExpense((current) => ({
                      ...current,
                      amount: event.target.value,
                    }))
                  }
                  className="rounded-[10px] border border-[#f0e4f2] px-3 py-2.5 text-sm font-normal text-black outline-none focus:border-[#831c91]"
                />
              </label>
              <div className="mt-2 flex justify-end gap-3">
                <button
                  type="button"
                  className="rounded-[10px] px-4 py-2.5 text-sm font-semibold text-[#831c91] focus:outline-none focus:ring-2 focus:ring-[#831c91]"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-[10px] bg-[#831c91] px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#831c91] focus:ring-offset-2"
                >
                  Save expense
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </section>
  );
};
