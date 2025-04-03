export default function FindIndex() {
    const numberArray1 = [1, 2, 4, 5, 6];
    const stringArray1 = ['string1', 'string3'];
    const fourIndex = numberArray1.findIndex(a => a === 4);
    const string3Index = stringArray1.findIndex(a => a === 'string3');

    return (
        <div id="wd-find-index">
            <h4>Find Index</h4>

            <p>Index of 4: {fourIndex}</p>
            <p>Index of 'string3': {string3Index}</p>
        </div>
    );
}


