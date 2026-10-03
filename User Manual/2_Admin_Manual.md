# SmartJourney: Administrator Manual

Administrators keep SmartJourney's data trustworthy and the AI running. **The trip planner only uses verified places**, so the review queues here directly decide what travelers get recommended.

**Web address:** https://aismartjourney.vercel.app (sign in, then click **Admin** in the left sidebar)

---

## 1. Admin access

- Admin rights come from the Keycloak **realm role `admin`**. Accounts with that role see an **Admin** item in the sidebar, and their profile shows *Platform admin* instead of *Traveler account*.
- `/admin` is protected twice: the web app sends anyone without the role away, and **every admin API call is re-checked by the server**.
- There are two ways to make someone an admin:
  1. An existing admin opens **Admin → Users** and clicks **Make admin** (section 6).
  2. In the **Keycloak admin console** (realm `smartjourney`), go to **Users**, open the user, then **Role mapping → Assign role → `admin`**.
- A role change takes effect when the user's session refreshes (within about 5 minutes), or straight away if they sign out and back in.

---

## 2. The admin dashboard

The top of the Admin page shows four counters: **Travellers**, **Itineraries**, **Published** (approved listings and events), and **Awaiting review** (the size of the pending queues).

Below them are six tabs: **Listings · Events · Entry fees · Users · Analytics · AI models**.

---

## 3. Listings

Listings are attractions, hotels and restaurants, imported from OpenStreetMap, Booking.com, Wikidata and other sources, or added by an admin.

### 3.1 The review queues
Use the buttons at the top to switch queues:
- **Pending review**: imported and not yet checked. **Travelers never see these.**
- **Approved**: published. Used by the planner and shown in Explore.
- **Rejected**: hidden. Can be approved later if the decision changes.

Narrow the list with the **search box**, **All categories**, and **All districts**. The line above the list shows how many records match.

### 3.2 Reviewing
For each row:
- **Approve**: publishes the listing.
- **Reject**: hides it. You're asked for an optional reason, which is recorded.
- **Edit**: fixes details before approving (see 3.3).
- **Delete** (bin icon): removes it **permanently**, after a confirmation. *Rejecting is usually enough.*

**Approve all N shown** approves only the pending rows **currently on screen**, after a confirmation. Filter the list first, so you approve only rows you have actually looked at.

### 3.3 Adding or editing a listing
Click **Add listing**, or **Edit** on a row. The form fields are:

| Field | Notes |
|---|---|
| **Name** | Required |
| **District**, **Category** | Required (dropdowns) |
| **Latitude**, **Longitude** | **Required.** The map and distance scoring need them (e.g. `7.2936`, `80.6413`) |
| **Description** | Optional |
| **Price level** | 1 (cheap) to 4 (expensive) |
| **Rating** | Optional |
| **Image URL** | Shown on the listing card in Explore |

A listing an admin creates is **published straight away**. Edits are recorded in the activity log.

---

## 4. Events

Events (festivals, cultural events) work just like listings: the same **Pending review / Approved / Rejected** queues, the same **Approve / Reject / Edit / Delete** actions, and **Add event**. Event forms also have **Venue**, **Starts** and **Ends**. Only approved events with a future date appear in Explore and in trip plans.

Most events come from the event scraper, so **checking the dates and venue is the main review job.**

---

## 5. Entry fees

Ticket prices for heritage sites, scraped from official sources. Nothing here is written by an admin; it's **review only**.

Each row shows the site name, the **foreign adult** price (and the child price if known), a link to the **source page**, and the **suggested listing** it belongs to.

1. **Check the link.** The suggested listing is only the scraper's guess, based on name and district. If it's wrong or missing, click **Change link** / **Link a listing**, search for the correct listing by name, and pick it. **Unlink** removes a wrong link.
2. **Approve.** This only works once a listing is linked (the button says *Link a listing first* otherwise). Approved fees are used in trip cost estimates.
3. **Reject** fees that are wrong or outdated.

---

## 6. Users

- **Search** by name or email, and filter by role (**All roles / Travelers / Admins**) and status (**Any status / Active / Deactivated**).
- **Make admin / Revoke admin**: changes the user's role in Keycloak.
- **Deactivate / Reactivate**: a deactivated user can't sign in again. A session that's already open runs until its token expires (within about 5 minutes).
- **Account activity**: shows a user's most recent 100 actions.
- **Locked rows:** you can't change your own role or status, and accounts created before Keycloak was introduced can't be managed here.

---

## 7. Analytics

All charts cover a recent time window, shown in the subtitle (e.g. *Last 30 days, from …*):
- **Platform activity**: new travellers, chat sessions and itineraries per day.
- **Moderation activity**: listings and events approved vs rejected, per day.
- **Saved itineraries by status**: draft, upcoming, past.
- **Published listings by category** and **by district**.
- **Most active planners** (top 8, by saved itineraries). Click **View / Hide** to show the details.

---

## 8. AI models

This tab controls which language models the trip planner uses. Changes **take effect from the next request**, with no restart or redeploy.

### 8.1 Model order
- The list is a **failover chain**. The first model is **Main**, and the others are tried automatically in order when the one before them is out of quota or down. If every model fails, the planner still returns a rule-based (`fallback`) plan.
- Each row has a **Provider** (Google Gemini, Groq, OpenAI, Anthropic Claude) and a **Model** name. Use **Move up / Move down / Remove** to arrange the list, and **Add model** to add one. At least one model must remain.
- Click **Save order**. The notice *"Saved. The trip planner uses the new order from the next request."* confirms it.
- If nothing has been saved here, the list shows *"Currently the default order from the server .env."*

### 8.2 Testing
**Test models** sends one tiny request to every model in the chain and shows whether each one works. Save your changes before testing.

### 8.3 API keys
For each provider, the key source is shown as **Saved here**, **From server .env**, or **Not set**.
- **Add key / Replace**: paste the key and click **Save**. Keys are stored **encrypted**, and are never shown again after saving.
- **Remove**: deletes the saved key. The server's `.env` key (if any) is used instead.

Free tiers have limits: **Gemini** has a daily request limit per model, and **Groq** has a small per-minute token limit. **OpenAI** and **Anthropic** are paid.

---

## 9. Good practice

- Work the **Pending review** queues regularly. New data isn't visible to travelers until it's approved.
- Filter before using **Approve all**.
- Prefer **Reject** over **Delete**, since rejected items can be restored.
- Keep at least two models in the AI chain, from different providers.
- Use **Test models** after changing keys or the order.
