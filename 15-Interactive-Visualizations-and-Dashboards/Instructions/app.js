

d3.json("new.json").then((importedData) => {
 var ata = importedData;
 console.log(ata.samples[0].otu_ids.slice(0,10));
 var select = document.getElementById("selDataset"); 
 var options = ata.names;
 console.log(options);

for(var i = 0; i < options.length; i++) {
  console.log("in");   
      var opt = options[i];
      var op = document.createElement("option");
      op.textContent = opt;
      op.value = opt;
      select.appendChild(op);  
}
let ind = 6
let dataset = 0
d3.selectAll("#selDataset").on("change", getData);
function getData(){
var dropdownMenu = d3.select("#selDataset");
dataset = dropdownMenu.property("value");
ind = options.indexOf(dataset)
console.log(ind);

var trace1 = {
  x: ata.samples[ind].otu_ids.slice(0,10),
  y: ata.samples[ind].sample_values.slice(0,10),
  text: ata.samples[ind].otu_labels.slice(0,10),
  name: dataset,
  type: "bar",
  orientation: "h"
};
var tracebubble = {
  x: ata.samples[ind].otu_ids.slice(0,10),
  y: ata.samples[ind].sample_values.slice(0,10),
  mode: 'markers',
  marker: {
    size: ata.samples[ind].sample_values.slice(0,10) 
  }
};

var chartbubble = [tracebubble];

var layoutbubble = {
  title: 'Marker Size',
  showlegend: false,
  height: 600,
  width: 600
};

Plotly.newPlot('bubble', chartbubble, layoutbubble);
// data
var chartData = [trace1];

// Apply the group bar mode to the layout
  var layout = {
  title: "sample",
  xaxis: { title: "otu_ids" },
  yaxis: { title: "sample_values" },
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
};
   Plotly.newPlot("bar", chartData, layout);
   var list = d3.select(".panel-body");

   // remove any children from the list to
   list.html("");
 
   // append stats to the list
   list.append("li").text(`id: ${ata.metadata[ind].id}`);
   list.append("li").text(`ethnicity: ${ata.metadata[ind].ethnicity}`);
   list.append("li").text(`gender: ${ata.metadata[ind].gender}`);
   list.append("li").text(`age: ${ata.metadata[ind].age}`);
   list.append("li").text(`location: ${ata.metadata[ind].location}`);
   list.append("li").text(`bbtype: ${ata.metadata[ind].bbtype}`);
   list.append("li").text(`wfreq: ${ata.metadata[ind].wfreq}`);
   var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: ata.metadata[ind].wfreq,
      title: { text: "Speed" },
      type: "indicator",
      mode: "gauge+number+delta",
      gauge: {
        axis: { range: [null, 9] },
        steps: [
          { range: [0, 2], color: "lightgray" },
          { range: [0, 4], color: "gray" },
          { range: [0, 6], color: "lightgreen" },
          { range: [0, 9], color: "green" },
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: ata.metadata[ind].wfreq
        }
      }
    }
  ];
  
  var layout2 = { width: 600, height: 450, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', data, layout2);

}
  

  
  // Slice the first 10 objects for plotting
 // data = data.samples;
  // Reverse the array due to Plotly's defaults
  
   
   

  // Render the plot to the div tag with id "plot"
  
});