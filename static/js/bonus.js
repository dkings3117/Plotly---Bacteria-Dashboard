function buildGauge(wfreq) {
    // Trig to calc meter point
    var degrees = 180 - 20*wfreq,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var gaugeData = [{ type: 'scatter',
        x: [0], y:[0],
        marker: {size: 28, color:'850000'},
        showlegend: false,
        name: 'speed',
        text: wfreq,
        hoverinfo: 'text+name'},
        { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
        rotation: 90,
        text: ['8-9', '7-8', '6-7', '5-6',
            '4-5', '3-4', '2-3', '1-2', '0-1', ''],
        textinfo: 'text',
        textposition:'inside',
        marker: {colors:['rgba(0, 255, 0, .5)', 'rgba(32, 223, 0, .5)',
                         'rgba(64, 191, 0, .5)', 'rgba(96, 159, 0, .5)',
                         'rgba(127, 127, 0, .5)', 'rgba(159, 96, 0, .5)',
                         'rgba(191, 64, 0, .5)', 'rgba(223, 32, 0, .5)',
                         'rgba(255, 0, 0, .5)', 'rgba(255, 255, 255, 0)']},
        labels: ['161-180', '141-160', '121-140', '101-120', '81-100', '61-80', '41-60', '21-40', '0-20', ''],
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
    }];

    var gaugeLayout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
                }
        }],
        title: 'Belly Button Washing Frequency',
        height: 500,
        width: 500,
        xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
}
