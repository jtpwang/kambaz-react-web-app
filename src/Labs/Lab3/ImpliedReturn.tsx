export default function ImpliedReturn() {
    /* Arrow function with implied return */
    const multiply = (a: number, b: number) => a * b;
    /* Calls the function */
    const fourTimesFive = multiply(4, 5);
    console.log(fourTimesFive);
    
    return (
        <div id="wd-implied-return">
            <h4>Implied return</h4>
            fourTimesFive = {fourTimesFive} <br />
            multiply(4,5) = {multiply(4, 5)} <hr />
        </div>
    );
}