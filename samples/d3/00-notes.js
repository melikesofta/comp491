// Tutorials

/*
    Selections
 */
var body = d3.select("body");
// same as document.querySelector("body")[0]

var all_a = d3.selectAll("a");
// same as document.querySelector("a") but
// useful for joinig


// DOM methods
element.style("color", "black");
element.attr("class", "special");
element.html("First!");
element.text();

// Move around
element.attr("transform", function(d, i) { return "translate(10px, 10px)"; });



/*
    Data
 */
// Simple Data joinig
var chart = d3
    .select(".chart")
    .selectAll("div")
    .data(data)
    .enter()
    .append("div")
    .style("width", function (current_data) {
        return 1
    })
    .text(function (current_data) {
        return 1
    });




// Create Scaler
var scaler = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, width]);

var scaler_percent = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 100]);
// data = [0, 5 ,10]
// scaler_percent(3) = 30





// Encoding Original Data
var ordinal_encoder_function = d3.scale.ordinal()
    .domain(["A", "B", "C", "D", "E", "F"])
    .range([0, 1, 2, 3, 4, 5]);

// ordinal_encoder_function(A) = 0
// ordinal_encoder_function(B) = 1
var ordinal_domain = d3.scale.ordinal()
    .domain(["A", "B", "C", "D", "E", "F"]);

ordinal_domain.range([0, 1, 2, 3, 4, 5]);
ordinal_domain.rangeBands([0, width]);
ordinal_domain.rangeRoundBands([0, width], .1);



/*
 * Axes
 */
var xAxis = d3.svg.axis()
    .scale(scaler)
    .ticks(10, "%")
    .orient("bottom");

chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
