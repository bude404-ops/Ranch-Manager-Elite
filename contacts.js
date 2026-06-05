class ContactManager {

    constructor() {

        this.contacts =
            JSON.parse(
                localStorage.getItem(
                    "contacts"
                )
            ) || [];

        this.render();
    }

    save() {

        localStorage.setItem(
            "contacts",
            JSON.stringify(
                this.contacts
            )
        );
    }

    addContact() {

        const contact = {

            id: Date.now(),

            name:
                document.getElementById(
                    "contactName"
                ).value,

            type:
                document.getElementById(
                    "contactType"
                ).value,

            phone:
                document.getElementById(
                    "contactPhone"
                ).value,

            email:
                document.getElementById(
                    "contactEmail"
                ).value
        };

        if (!contact.name) {

            alert(
                "Contact Name Required"
            );

            return;
        }

        this.contacts.push(
            contact
        );

        this.save();

        this.render();
    }

    deleteContact(id) {

        this.contacts =
            this.contacts.filter(
                contact =>
                    contact.id !== id
            );

        this.save();

        this.render();
    }

    render() {

        const list =
            document.getElementById(
                "contactList"
            );

        if (!list) return;

        list.innerHTML = "";

        this.contacts.forEach(contact => {

            list.innerHTML += `

            <div class="card">

                <h3>${contact.name}</h3>

                <p>${contact.type}</p>

                <p>${contact.phone}</p>

                <p>${contact.email}</p>

                <button onclick="contacts.deleteContact(${contact.id})">
                Delete
                </button>

            </div>

            `;
        });
    }
}

const contacts =
    new ContactManager();

function addContact() {
    contacts.addContact();
}
