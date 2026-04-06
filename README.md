# Booking-reservation-system
Full-stack booking and reservation system with a React + Tailwind front end and a Node.js/Express API, allowing users to view availability, book time slots, and manage reservations with conflict validation.

---

# Features
* **Vet Selection** - Choose a veterinarian along with their speciality/role.
* **Date Picker** - Disabled weekends to prevent booking on closed days.
* **Available Slots** - Always visible; dynamically updates based on existing bookings.
* **Booking Form** - Enter Full Name and Email to create an appointment.
* **Booking List** - Real time list of all bookings with delete functionality.
* **Conflict Detection** - Prevent double-booking of the same slot.
* **Responsive UI** - Modern layout inspired by Calendly.
* **Vite + React** - Fast and modular forntend.

---

## Tech Stack
| Frontend       | Backend      | Other        |
|----------------|--------------|--------------|
| React + Vite   | Node.js + Express | Tailwind CSS |
| JSX Components | REST API Endpoints | In-memory booking store |
| React Hooks & Context | Server-side validation | Responsive UI design

---

# Styling
* Tailwind CSS used for rapid UI development.
* Modern font: **Inter**.
* Layout inspired by Calendly: step-by-step booking, slots always visible, booking list on the right.

---

## Setup
### Backend

* 1. Navigate to backend folder:

```bash
cd express-server

* 2. Install dependencies:

```bash
npm install

* 3. Start server:

```bash
node server.js

### Frontend

* 1. Navigate to frontend folder:

```bash
cd vite-react-app

* 2. Install dependencies:

```bash
npm install

* 3. Start development server:

```bash
npm run dev





