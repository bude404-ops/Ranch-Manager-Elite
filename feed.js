class FeedManager {

    constructor() {

        this.records =
            JSON.parse(
                localStorage.getItem(
                    "feedRecords"
                )
            ) || [];

        this.render();
    }

    save() {

        localStorage.setItem(
            "feedRecords",
            JSON.stringify(
                this.records
            )
        );
    }

    addRecord() {

        const record = {

            id: Date.now(),

            name:
                document.getElementById(
                    "feedName"
                ).value,

            quantity:
                Number(
                    document.getElementById(
                        "feedQuantity"
                    ).value
                ),

            cost:
                Number(
                    document.getElementById(
                        "feedCost"
                    ).value
                ),

            date:
                document.getElementById(
                    "feedDate"
                ).value
        };

        if (!record.name) {
            alert("Feed Name Required");
            return;
        }

        this.records.push(record);

        this.save();

        this.render();
    }

    deleteRecord(id) {

        this.records =
            this.records.filter(
                record =>
                    record.id !== id
            );

        this.save();

        this.render();
    }

    render() {

        const list =
            document.getElementById(
                "feedList"
            );

        if (!list) return;

        list.innerHTML = "";

        this.records.forEach(record => {

            list.innerHTML += `

            <div class="card">

                <h3>${record.name}</h3>

                <p>
                    Quantity:
                    ${record.quantity}
                </p>

                <p>
                    Cost:
                    $${record.cost.toFixed(2)}
                </p>

                <p>
                    Date:
                    ${record.date}
                </p>

                <button
                onclick="feed.deleteRecord(${record.id})">
                Delete
                </button>

            </div>

            `;
        });
    }
}

const feed =
    new FeedManager();

function addFeedRecord() {

    feed.addRecord();
}
