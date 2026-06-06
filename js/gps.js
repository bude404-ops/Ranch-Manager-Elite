/* =====================================================
RANCH OS ENTERPRISE
gps.js v1.0
Paddock Mapping System
===================================================== */

const RanchGPS = {

mapData: [],

load() {

    this.mapData =
        RanchOS.get(
            "gpsMapData",
            []
        );

    this.render();

},

save() {

    RanchOS.set(
        "gpsMapData",
        this.mapData
    );

},

render() {

    const map =
        document.getElementById(
            "gpsMap"
        );

    if (!map) return;

    if (
        this.mapData.length === 0
    ) {

        map.innerHTML = `

            <div class="card">

                No GPS objects added yet.

                <br><br>

                Add fences, gates,
                water sources,
                corrals, barns,
                and paddocks.

            </div>

        `;

        return;

    }

    map.innerHTML =
        this.mapData.map(
            item => `

            <div class="card">

                <strong>

                    ${item.type}

                </strong>

                <br>

                ${item.name}

                <br>

                Lat:
                ${item.lat}

                <br>

                Lng:
                ${item.lng}

            </div>

        `
        ).join("");

},

addObject(
    type,
    name,
    lat,
    lng
) {

    this.mapData.push({

        id: Date.now(),

        type,

        name,

        lat,

        lng,

        created:
            new Date()
            .toISOString()

    });

    this.save();

    this.render();

}

};

/* =====================================
GPS LOCATION
===================================== */

function getCurrentLocation(
callback
) {

if (
    !navigator.geolocation
) {

    alert(
        "GPS not supported"
    );

    return;

}

navigator.geolocation
    .getCurrentPosition(

        position => {

            callback({

                lat:
                    position
                    .coords
                    .latitude,

                lng:
                    position
                    .coords
                    .longitude

            });

        },

        () => {

            alert(
                "Location unavailable"
            );

        }

    );

}

/* =====================================
FENCES
===================================== */

function addFence() {

const name =
    prompt(
        "Fence Name"
    );

if (!name) return;

getCurrentLocation(
    location => {

        RanchGPS.addObject(

            "Fence",

            name,

            location.lat,

            location.lng

        );

    }
);

}

/* =====================================
GATES
===================================== */

function addGate() {

const name =
    prompt(
        "Gate Name"
    );

if (!name) return;

getCurrentLocation(
    location => {

        RanchGPS.addObject(

            "Gate",

            name,

            location.lat,

            location.lng

        );

    }
);

}

/* =====================================
WATER SOURCES
===================================== */

function addWaterSource() {

const name =
    prompt(
        "Water Source Name"
    );

if (!name) return;

getCurrentLocation(
    location => {

        RanchGPS.addObject(

            "Water Source",

            name,

            location.lat,

            location.lng

        );

    }
);

}

/* =====================================
BARNS
===================================== */

function addBarn() {

const name =
    prompt(
        "Barn Name"
    );

if (!name) return;

getCurrentLocation(
    location => {

        RanchGPS.addObject(

            "Barn",

            name,

            location.lat,

            location.lng

        );

    }
);

}

/* =====================================
CORRALS
===================================== */

function addCorral() {

const name =
    prompt(
        "Corral Name"
    );

if (!name) return;

getCurrentLocation(
    location => {

        RanchGPS.addObject(

            "Corral",

            name,

            location.lat,

            location.lng

        );

    }
);

}

/* =====================================
PADDOCK GPS
===================================== */

function mapPaddock() {

const name =
    prompt(
        "Paddock Name"
    );

if (!name) return;

getCurrentLocation(
    location => {

        RanchGPS.addObject(

            "Paddock",

            name,

            location.lat,

            location.lng

        );

    }
);

}

/* =====================================
EXPORT MAP
===================================== */

function exportGPSData() {

const blob =
    new Blob(

        [

            JSON.stringify(

                RanchGPS.mapData,

                null,

                2

            )

        ],

        {

            type:
            "application/json"

        }

    );

const url =
    URL.createObjectURL(
        blob
    );

const link =
    document.createElement(
        "a"
    );

link.href = url;

link.download =
    "ranch-gps-map.json";

link.click();

}

/* =====================================
IMPORT MAP
===================================== */

function importGPSData(
jsonData
) {

try {

    RanchGPS.mapData =
        JSON.parse(
            jsonData
        );

    RanchGPS.save();

    RanchGPS.render();

} catch {

    alert(
        "Invalid GPS file"
    );

}

}

/* =====================================
CLEAR GPS
===================================== */

function clearGPSData() {

const confirmed =
    confirm(

        "Delete all GPS map data?"

    );

if (!confirmed)
    return;

RanchGPS.mapData = [];

RanchGPS.save();

RanchGPS.render();

}

/* =====================================
GPS DASHBOARD STATS
===================================== */

function getGPSStats() {

return {

    total:
        RanchGPS.mapData.length,

    fences:
        RanchGPS.mapData.filter(
            item =>
            item.type ===
            "Fence"
        ).length,

    gates:
        RanchGPS.mapData.filter(
            item =>
            item.type ===
            "Gate"
        ).length,

    water:
        RanchGPS.mapData.filter(
            item =>
            item.type ===
            "Water Source"
        ).length,

    paddocks:
        RanchGPS.mapData.filter(
            item =>
            item.type ===
            "Paddock"
        ).length

};

}

/* =====================================
STARTUP
===================================== */

document.addEventListener(

"DOMContentLoaded",

() => {

    RanchGPS.load();

}

);

/* =====================================================
RANCH OS GPS MODULE COMPLETE
Ready for:

- Google Maps
- Mapbox
- Satellite Imagery
- Boundary Drawing
- Acre Calculations
- Grazing Rotation
  ===================================================== */
