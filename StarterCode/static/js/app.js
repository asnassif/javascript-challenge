
let tbody = d3.select("tbody");

let getMatchingRecords = dt => {
    let mdy1 = new Date(dt);
    // console.log(mdy1.getMonth());
    // console.log(mdy1.getDate());
    // console.log(mdy1.getFullYear());
    let sightings = []
    data.forEach(datum => {
        let mdy2 = new Date(datum.datetime);
        if ((mdy2.getTime() === mdy1.getTime()) || (dt === "")) {
            sightings.push(datum);
        }
    });
    return sightings;
}

let updateTable = sightings => {
    tbody.html("");
    if (sightings.length < 1) return;
    sightings.forEach(record => {
        let row = tbody.append("tr");
        Object.entries(record).forEach(([key, value]) => {
            let cell = row.append("td");
            cell.text(value);
        });
    });
}

let button = d3.select("#filter-btn");

let handleInput = () => {
    // stops the page refresh on "Enter" button
    d3.event.preventDefault();

    let dt = d3.select("#datetime").property("value");
    let sightings = getMatchingRecords(dt);
    updateTable(sightings);
}

// Update the table with button click
button.on("click", handleInput);
// Enter also update the output
d3.select("form").on("submit", handleInput);
