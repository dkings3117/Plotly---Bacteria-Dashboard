function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(`/metadata/${sample}`).then(function(sampleData) {
    console.log(sampleData);
    // Use d3 to select the panel with id of `#sample-metadata`
    var metadata = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    metadata.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(sampleData).forEach(([key, value]) => 
      {
        console.log(`Key: ${key} and Value ${value}`);
        var text = metadata.append("p");
        text.text(`${key}: ${value}`);
      }
      );

    // BONUS: Build the Gauge Chart
    buildGauge(sampleData.WFREQ);
  });
}

function buildCharts(sample) {

  console.log(sample);
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then(function(sampleData) {

    // Grab values from the data json object to build the plots
    console.log(sampleData);

    // @TODO: Build a Bubble Chart using the sample data
    var trace = {
      type: "scatter",
      mode: "markers",
      marker: {
            "size": sampleData.sample_values,
            "color": sampleData.otu_ids,
            "line": {
                "color": sampleData.otu_ids,
                "width": 1
            }},
      text: sampleData.otu_labels,
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
    };

    var bubbleData = [trace];

    var bubbleLayout = {
      title: "OTU Bacteria Population",
      xaxis: {
        type: "linear"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

    // convert from object of arrays to array of objects to make it easier to sort
    var i;
    var data = [];
    var object;
    for (i = 0; i < sampleData.sample_values.length; i++)
    {
      object = {otu_id: sampleData.otu_ids[i],
        otu_label: sampleData.otu_labels[i],
        sample_value: sampleData.sample_values[i]};
      data.push(object);
    }
    console.log(data);

    data.sort(function(a, b) {
      return parseFloat(b.sample_value) - parseFloat(a.sample_value);
    });

    // Slice the first 10 objects for plotting
    data = data.slice(0, 10);

    // Reverse the array due to Plotly's defaults
    data = data.reverse();
    console.log(data);

    var trace1 = {
      labels: data.map(row => row.otu_id),
      values: data.map(row => row.sample_value),
      text: data.map(row => row.otu_label),
      hoverinfo: 'label+percent+text',
      textinfo: 'percent',
      type: 'pie'
    };

    var pieData = [trace1];

    var pieLayout = {
      title: "Top 10 OTUs",
    };

    Plotly.newPlot("pie", pieData, pieLayout);
  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
