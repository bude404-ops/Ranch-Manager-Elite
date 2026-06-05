class EquipmentManager {

    constructor() {

        this.equipment =
            JSON.parse(
                localStorage.getItem(
                    "equipment"
                )
            ) || [];

        this.render();
    }

    save() {

        localStorage.setItem(
            "equipment",
            JSON.stringify(
                this.equipment
            )
        );
    }

    addEquipment() {

        const equipment = {

            id: Date.now(),

            name:
                document.getElementById(
                    "equipmentName"
                ).value,

            type:
                document.getElementById(
                    "equipmentType"
                ).value,

            hours:
                Number(
                    document.getElementById(
                        "equipmentHours"
                    ).value
                ),

            interval:
                Number(
                    document.getElementById(
                        "serviceInterval"
                    ).value
                )
        };

        if (!equipment.name) {

            alert(
                "Equipment Name Required"
            );

            return;
        }

        this.equipment.push(
            equipment
        );

        this.save();

        this.render();
    }

    deleteEquipment(id) {

        this.equipment =
            this.equipment.filter(
                equipment =>
                    equipment.id !== id
            );

        this.save();

        this.render();
    }

    render() {

        const list =
            document.getElementById(
                "equipmentList"
            );

        if (!list) return;

        list.innerHTML = "";

        this.equipment.forEach(
            equipment => {

                const due =
                    equipment.hours >=
                    equipment.interval;

                list.innerHTML += `

                <div class="card">

                    <h3>
                        ${equipment.name}
                    </h3>

                    <p>
                        Type:
                        ${equipment.type}
                    </p>

                    <p>
                        Hours:
                        ${equipment.hours}
                    </p>

                    <p>
                        Service Interval:
                        ${equipment.interval}
                    </p>

                    <p class="${
                        due
                        ? "status-danger"
                        : "status-good"
                    }">

                        ${
                            due
                            ? "SERVICE DUE"
                            : "OK"
                        }

                    </p>

                    <button
                    onclick="equipment.deleteEquipment(${equipment.id})">
                    Delete
                    </button>

                </div>

                `;
            }
        );
    }
}

const equipment =
    new EquipmentManager();

function addEquipment() {

    equipment.addEquipment();
}
