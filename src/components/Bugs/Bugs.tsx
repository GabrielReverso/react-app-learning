import { produce } from "immer";
import { useState } from "react";

export default function Bugs() {

    const [bugs, setBugs] = useState([
        { id: 1, title: "Bug 1", fixed: false },
        { id: 2, title: "Bug 2", fixed: false }
    ])

    const handleClick = () => {
        /* Regular way */
        //setBugs(bugs.map(bug => bug.id === 1? {...bug, fixed: true} : bug))

        /* Immer */
        setBugs(produce(draft => {
            const bug = draft.find(bug => bug.id === 1)
            if (bug) bug.fixed = true
        }))
    }

    return (
        <div>
            <button onClick={handleClick}>click</button>
            {bugs.map(bug => <p key={bug.id}>{bug.title} {bug.fixed ? "true" : "false"}</p>)}
        </div>
    );
}