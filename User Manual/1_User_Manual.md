# SmartJourney: User Manual (Traveler)

**SmartJourney** plans a trip around Sri Lanka from a conversation. You describe the trip in your own words, and it builds a day-by-day itinerary from real, admin-verified places, with costs, photos and a route map. You can then refine the plan by chatting, save it, track your spending, and browse places on your own.

**Web address:** https://aismartjourney.vercel.app

**Works in:** any recent desktop browser (Chrome, Edge, Firefox, Safari). The layout also adapts to phones.

---

## 1. Getting started

### 1.1 Create an account
1. Open https://aismartjourney.vercel.app and click **Sign up** (top right), or **Start planning for free**.
2. Click **Sign Up**. You'll go to the secure SmartJourney sign-in page (Keycloak).
3. Fill in your name, email and password. **The password must be 8–12 characters, with an upper-case letter, a lower-case letter, a number and a symbol.** Passwords longer than 12 characters are rejected.
4. If asked, verify your email: open the email from SmartJourney and click the link. **The link expires after 5 minutes.** If it has expired, use *Click here to re-send* on the sign-in page.

### 1.2 Sign in and sign out
- **Sign in:** click **Sign in**, then **Sign In**, then enter your email and password. You land on the planner (**Home**).
- **Sign out:** click the sign-out icon at the bottom of the left sidebar, or use **Settings → Account → Sign out of SmartJourney**. This signs you out on this device, including single sign-on.

### 1.3 Forgotten password
Go to the sign-in page and choose **Forgot password**. The **Reset your password** page offers two options:
- **I forgot my password:** you're emailed a one-time link to choose a new password.
- **I know it and want to change it:** sign in with your current password, then set a new one.

---

## 2. The screen layout

| Area | What it is |
|---|---|
| **Left sidebar** | **New trip**, your past chats (searchable with *Search your trips*), and links to **Explore**, **Saved itineraries** and **Budget tracker**. At the bottom: your name, **Settings** (gear icon) and **Sign out**. Admins also see **Admin**. |
| **Centre** | The chat with the trip planner. |
| **Right** | The **route map** of the selected itinerary. Hide or show it with the **Hide map / Show map** button. |

To delete a chat, hover over it in the sidebar and click the delete icon (**Delete chat**).

---

## 3. Planning a trip

### 3.1 Ask for a trip
Type into the message box (*"Message SmartJourney: ask about dates, budget, or a place…"*) and press **Enter**. **Shift+Enter** adds a new line.

Include what matters to you: **where**, **how many days**, **who's going**, **budget**, **interests**, **pace**, and optionally **where you start from** and **dates**. For example:

- *Plan a 5-day trip to Kandy, Nuwara Eliya and Ella for two people. We love nature, tea plantations and train rides, mid-range budget, relaxed pace.*
- *3 days in Galle and Mirissa for a couple, budget around LKR 60,000, beaches and whale watching.*
- *Plan 3 days in Sigiriya, Dambulla and Polonnaruwa. We're into history and photography.*
- *4-day family trip around Colombo and Negombo with two kids aged 6 and 9, nothing too tiring.*

If you haven't planned anything yet, suggestion chips (e.g. *Plan a 3-day trip in Kandy*) appear under the chat. Click one to send it.

If your request is too vague (for example, *"somewhere peaceful for a weekend"*), SmartJourney **asks a follow-up question** instead of guessing. Just answer it.

### 3.2 While it plans
A status bubble cycles through *Finding places worth your time… → Sequencing the days… → Optimizing the route… → Estimating costs…*. Planning usually takes **5–20 seconds**, but can take longer when the AI services are busy. Click the **Stop** button (square icon) to cancel.

### 3.3 Reading the itinerary card
| Part | Meaning |
|---|---|
| **Header** (e.g. *Kandy · 5 days*) | Click it to show this itinerary on the map. The badge shows how the plan was made: `llm` (the AI planner) or `fallback` (a rule-based planner used when the AI is unavailable; still a valid, budget-checked plan). |
| **DAY 1, DAY 2…** | Each day opens and closes on a click. Day 1 starts open. The right side shows that day's cost. |
| **Rows** | Time, estimated cost, and the place name. |
| **Photo strip** | Up to six photos of stops. Click one to enlarge it, and use the arrows to browse. Restaurants have no photos (no free photo source exists). |
| **Estimated cost** | Total for the whole trip, in the trip's currency. |
| **Save itinerary** | Saves the trip (see section 5). |

### 3.4 Your starting point (location)
If location access is on, trips start from where you are. If it's off or blocked, a bar under the chat says so. Click **Turn on**, allow it in the browser, or just write it in your request: *"…starting from Colombo"*.

### 3.5 Asking questions
You can also ask travel questions (*"Is it safe to swim in Mirissa in July?"*, *"What should I wear to the Temple of the Tooth?"*). Answers drawn from the knowledge base show a **Sources** list with links underneath.

---

## 4. Refining a plan (follow-ups)

Keep chatting in the same conversation to change the plan:
- *Make day 2 more relaxed and add a tea factory visit.*
- *Make it cheaper.* / *Show budget breakdown* (also available as chips)
- *I'm starting from Polonnaruwa instead.*
- *Swap day 3 for something cheaper.*

**Only the part you mention is rebuilt.** If you ask about day 2, days 1, 3 and so on stay exactly the same, so you don't lose the parts you liked. Each change produces a new itinerary card; click a card's header to put it on the map.

---

## 5. Saved itineraries

### 5.1 Save a trip
Click **Save itinerary** on an itinerary card. It changes to **Saved**. Click **Saved** again to remove it from your saved trips.

### 5.2 Manage saved trips
Open **Saved itineraries** in the sidebar. Trips are grouped into tabs:
- **Upcoming**: confirmed trips with a start date in the future.
- **Drafts / In Progress**: newly saved trips that don't have dates yet.
- **Past Trips**: trips whose dates have passed.

Click a trip to open it. On the trip page you can:
- **Set the start date** with the date picker. Every day is re-dated from it.
- **Confirm trip** (for drafts). This needs a start date, and moves the trip to *Upcoming*.
- **Change the status** with the dropdown.
- **Delete** the trip.
- See every day's stops, and the route on the map.

---

## 6. Budget tracker

Open **Budget tracker** in the sidebar. You need at least one saved trip. The trip's budget is the budget you gave when planning, or otherwise the itinerary's estimated cost.

1. **Pick the trip** in the dropdown at the top right.
2. Read the four figures: **Total budget**, **Spent so far**, **Remaining** and **Daily average** (across the planned days).
3. **Log an expense** under *Recent expenses*: click **Add expense**, then enter a **Description**, **Amount**, **Category** (*Stays*, *Transport*, *Food & drink*, *Activities*, *Other*) and **Date**, then click **Save expense**. The figures update straight away. To remove an expense, use its delete icon (**Delete expense**).
4. **Spend by category** shows where your money is going on the current trip.
5. **Budgets by trip** compares all your saved trips at a glance.

---

## 7. Explore

Open **Explore** in the sidebar to browse places without planning a trip. Everything here is the same verified data the planner uses.

- Three sections: **Top Attractions & Hidden Gems**, **Hotels & Restaurants**, and **Local Events & Cultural Festivals**.
- Use **Search Here…** to find a place by name.
- Click the filter toggle to filter by **district** and **Minimum rating** (*Any rating* is the default).
- Click **See all** in a section to open its full list, with its own search and district filter.
- Each card shows the photo (where available), name, district, rating and price information.

If there are no upcoming events in the database, the events section says *"No upcoming events yet."*

---

## 8. Settings

Click the **gear icon** at the bottom of the sidebar.

### 8.1 Account (fully working)
- **Profile:** change your profile picture (click the avatar), name and **phone number**. Your email is shown, read-only.
- **Travel preferences:** **travel style** (*Budget*: hostels, local food, public transport; *Balanced*: mid-range stays with a few splurges; *Luxury*: top hotels and private transfers), **interests** (tags), **default budget** and **currency** (LKR, USD, EUR, GBP, INR, AUD). The planner uses these when your request doesn't say otherwise.
- **Privacy:** **Enable location access** (see 3.4).
- **Security:** **Sign out of SmartJourney**.

### 8.2 Notifications and Subscription (preview only)
These tabs show planned features: trip reminders, weather and budget alerts, and paid plans. **They're interface previews.** Your choices there aren't saved, and no payments are taken.

---

## 9. Troubleshooting and FAQ

| Problem | What to do |
|---|---|
| *"Something went wrong reaching the trip planner"* | The AI services may be busy (free-tier limits). Wait a minute and send the message again. |
| Planning takes a long time | This happens at busy times. The planner retries across several AI models, and if all of them are busy it falls back to the rule-based planner. You can click **Stop** and try again later. |
| The plan has few or no stops | The destination may have few verified places. Try a nearby district, or one of the suggestion chips. |
| The password is rejected | It must be 8–12 characters, with upper case, lower case, a number and a symbol. |
| The verification email link doesn't work | It expired (5 minutes). Request a new one from the sign-in page. |
| The trip doesn't start from my location | Turn on location access (section 3.4), or write *"starting from …"* in your message. |
| Can I use SmartJourney on my phone? | Yes, in the phone's browser. A dedicated mobile app is planned but not built yet. |
| Is my data private? | Yes. Your chats, trips and expenses are visible only to you. |
