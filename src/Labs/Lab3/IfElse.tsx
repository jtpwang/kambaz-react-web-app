export default function IfElse() {
    let true1 = true, false1 = false;
    return (
        <div id="wd-if-else">
            <h4>If Else</h4>
            {true1 && <p>true1</p>}
            {!false1 ? <p>!false1</p>
                : <p>false1</p>}
            {!true1 ? <p>!true1 = true</p>
                : <p>!true1 = false. correct</p>}
            <hr />

        </div>


    )
}