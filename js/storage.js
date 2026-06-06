const StorageManager = {

exportData() {

const backup = {

  animals:
    RanchOS.get(
      "animals", []
    ),

  paddocks:
    RanchOS.get(
      "paddocks", []
    ),

  inventory:
    RanchOS.get(
      "inventory", []
    ),

  equipment:
    RanchOS.get(
      "equipment", []
    ),

  employees:
    RanchOS.get(
      "employees", []
    ),

  workorders:
    RanchOS.get(
      "workorders", []
    ),

  transactions:
    RanchOS.get(
      "transactions", []
    ),

  gpsMapData:
    RanchOS.get(
      "gpsMapData", []
    )

};

const blob =
  new Blob(

    [
      JSON.stringify(
        backup,
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
  "ranchos-backup.json";

link.click();

}

};
