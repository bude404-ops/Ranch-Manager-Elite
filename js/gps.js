const GPSManager = {

data: [],

load() {

    this.data =
        JSON.parse(
            localStorage.getItem(
                "gpsMap"
            ) || "[]"
        );

    this.render();

},

save() {

    localStorage.setItem(
        "gpsMap",
        JSON.stringify(
            this.data
        )
    );

},

addPoint(
    type,
    name
) {

    this.data.push({

        id: Date.now(),

        type,

        name,

        created:
            new Date()
            .toISOString()

    });

    this.save();

    this.render();

},

render() {

    const map =
        document.getElementById(
            "gpsMap"
        );

    if (!map) return;

    if (
        this.data.length === 0
    ) {

        map.innerHTML = `

            <div class="card">

                No map objects added.

            </div>

        `;

        return;

    }

    map.innerHTML =
        this.data.map(item => `

            <div class="list-item">

                <strong>
                    ${item.name}
                </strong>

                <br>

                ${item.type}

            </div>

        `).join("");

}

};

function addFence() {

const name =
    prompt(
        "Fence Name"
    );

if (!name) return;

GPSManager.addPoint(
    "Fence",
    name
);

}

function addWaterSource() {

const name =
    prompt(
        "Water Source"
    );

if (!name) return;

GPSManager.addPoint(
    "Water",
    name
);

}

function addGate() {

const name =
    prompt(
        "Gate Name"
    );

if (!name) return;

GPSManager.addPoint(
    "Gate",
    name
);

}

document.addEventListener(
"DOMContentLoaded",
() => {

    GPSManager.load();

}

);
