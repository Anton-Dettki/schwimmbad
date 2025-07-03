# Schwimmbad Planung
This is a proof of concept for a shared Calendar created in collaboration with Sternipark HH and TUHH Software Engineering Modul 2025.
You can find the Git History of this project here: https://github.com/Anton-Dettki/schwimmbad

✨ Features

This proof-of-concept application demonstrates a shared calendar system developed in collaboration with Sternipark Hamburg and as part of the TUHH Software Engineering Module (2025).

The following core features have been implemented:

    🔓 Public & Restricted Event Access

        Sternipark administrators can view all events from all associated daycares (Kitas).

        Swimming facility users (e.g., Schwimmbad Holstenstraße) can only see events taking place at their specific location.

        Parents can view all events related to their respective Kita.

    📅 Calendar and Table Views

        Events can be viewed either as a calendar or in a sortable table format.

        The table differentiates between own events and free (bookable) events.

    📝 Event Interaction

        Sternipark events can be published.

        Free slots can be booked by users and then customized as needed (e.g., title, class, supervisor).

    🌗 Light/Dark Mode

        Includes basic light/dark theme switching (note: the theme resets on reload for now).

    🔔 Notification Simulation

        Booking and publishing actions trigger simulated notifications.

        A notification bell icon updates to reflect unseen event activity.

    👤 User Switch (Presentation Mode)

        A quick-switch function allows seamless toggling between three predefined test users:

            Sternipark Admin — sees all events

            Schwimmbad Holstenstraße — sees only events at Holstenstraße 30

            Parents — see only their Kita’s events

    ♻️ Reset Functionality

        A Reset Events button is accessible via the profile avatar. Clicking it resets all data to the original demo state (refresh required afterward).

## Project Setup
You might not be able to run this on your local machine since you need a Premium Key for Schedule-X which was supplied to us for a limited time for free my Tom Österlund, the creator of the package.
If you still would like to try and play around with it locally, contact anton.dettki@tuhh.de or any other of the team members and we will try to give you access.

```sh
npm install

npm run dev
```
