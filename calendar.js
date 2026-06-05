class CalendarManager {

    constructor() {

        this.events =
            JSON.parse(
                localStorage.getItem(
                    "calendarEvents"
                )
            ) || [];

        this.render();
    }

    save() {

        localStorage.setItem(
            "calendarEvents",
            JSON.stringify(
                this.events
            )
        );
    }

    addEvent() {

        const event = {

            id: Date.now(),

            title:
                document.getElementById(
                    "eventTitle"
                ).value,

            date:
                document.getElementById(
                    "eventDate"
                ).value,

            type:
                document.getElementById(
                    "eventType"
                ).value,

            notes:
                document.getElementById(
                    "eventNotes"
                ).value
        };

        if (!event.title) {

            alert(
                "Event Title Required"
            );

            return;
        }

        this.events.push(
            event
        );

        this.save();

        this.render();
    }

    deleteEvent(id) {

        this.events =
            this.events.filter(
                event =>
                    event.id !== id
            );

        this.save();

        this.render();
    }

    render() {

        const list =
            document.getElementById(
                "calendarList"
            );

        if (!list) return;

        list.innerHTML = "";

        this.events
        .sort((a,b)=>
            new Date(a.date) -
            new Date(b.date)
        )
        .forEach(event => {

            list.innerHTML += `

            <div class="card">

                <h3>${event.title}</h3>

                <p>${event.type}</p>

                <p>${event.date}</p>

                <p>${event.notes}</p>

                <button
                onclick="calendar.deleteEvent(${event.id})">
                Delete
                </button>

            </div>

            `;
        });
    }
}

const calendar =
    new CalendarManager();

function addEvent() {

    calendar.addEvent();
}
