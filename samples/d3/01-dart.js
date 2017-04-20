width = 400;
height = 400;
function log(x){
    document.getElementsByClassName("log")[0].innerHTML += "<p>* " + x + "</p>"
}

log('Test')
var p = 1;
function choseColor(){
    log("p="+p);
    return ["red", "black"][p++%2];
}

var svg = d3.select(".chart");

data = [1,2,3,4,5,6,7,8,9,10];

svg.attr("width", width);
svg.attr("height", height);

var circles = svg.selectAll("circle")
    .data(data)
    ;


var pickRadius = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([width * 0.75, 0]);

circles.enter().append("circle")
    .attr("cx", width/2)
    .attr("cy", height/2)
    .attr("r", function(d){
        log("i=" + d)
        log("r=" + pickRadius(d))
        return pickRadius(d) / 2
    })
    .attr("fill", function(d){
        c = choseColor();
        log(c);
        return c;
    });