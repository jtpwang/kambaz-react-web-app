export default function TernaryOperator() {
    const loggedIn = true;

    return (
        <div id="wd-ternary-operator">
            <h4>Logged In</h4>
            {loggedIn ? <p>Welcome</p>
                : <p>Please Login</p>}<hr />

        </div>
    )
}