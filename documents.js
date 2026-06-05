class DocumentManager {

    constructor() {

        this.documents =
            JSON.parse(
                localStorage.getItem(
                    "documents"
                )
            ) || [];

        this.render();
    }

    save() {

        localStorage.setItem(
            "documents",
            JSON.stringify(
                this.documents
            )
        );
    }

    addDocument() {

        const documentRecord = {

            id: Date.now(),

            name:
                document.getElementById(
                    "documentName"
                ).value,

            type:
                document.getElementById(
                    "documentType"
                ).value,

            date:
                document.getElementById(
                    "documentDate"
                ).value,

            link:
                document.getElementById(
                    "documentLink"
                ).value,

            notes:
                document.getElementById(
                    "documentNotes"
                ).value
        };

        if (!documentRecord.name) {

            alert(
                "Document Name Required"
            );

            return;
        }

        this.documents.push(
            documentRecord
        );

        this.save();

        this.render();
    }

    deleteDocument(id) {

        this.documents =
            this.documents.filter(
                documentRecord =>
                    documentRecord.id !== id
            );

        this.save();

        this.render();
    }

    render() {

        const list =
            document.getElementById(
                "documentList"
            );

        if (!list) return;

        list.innerHTML = "";

        this.documents.forEach(
            documentRecord => {

                list.innerHTML += `

                <div class="card">

                    <h3>
                        ${documentRecord.name}
                    </h3>

                    <p>
                        Type:
                        ${documentRecord.type}
                    </p>

                    <p>
                        Date:
                        ${documentRecord.date}
                    </p>

                    <p>
                        ${documentRecord.notes}
                    </p>

                    ${
                        documentRecord.link
                        ? `
                        <p>
                        <a href="${documentRecord.link}" target="_blank">
                        Open Document
                        </a>
                        </p>
                        `
                        : ""
                    }

                    <button
                    onclick="documents.deleteDocument(${documentRecord.id})">
                    Delete
                    </button>

                </div>

                `;
            }
        );
    }
}

const documents =
    new DocumentManager();

function addDocument() {

    documents.addDocument();
}
