import { useState } from "react";

const LeadNotes = ({
    notes = [],
}) => {

    const [text, setText] = useState("");

    return (

        <div>

            <h3>

                Notes

            </h3>

            {notes.map((note, index) => (

                <p key={index}>

                    • {note}

                </p>

            ))}

            <textarea
                rows={4}
                value={text}
                onChange={(e) =>
                    setText(
                        e.target.value
                    )
                }
                placeholder="Add Note"
            />

            <button>

                Save Note

            </button>

        </div>

    );

};

export default LeadNotes;