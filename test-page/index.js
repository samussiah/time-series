fetch('../../data/10295/day.csv')
    .then(response => response.text())
    .then(text => {
        const ts = timeSeries(
            d3.csvParse(text),
            {
                x: {
                    "field": "date",
                    "format": "%Y-%m-%d"
                },
                y: {
                    "field": "mean"
                },
            },
            '#container',
        );
    });
        //const container = d3.select('#container');
        //const width = container.node().offsetWidth;
        //const height = width*1/3;
        //const margin = { top: 10, bottom: 50, left: 50, right: 10 };
        //const svg = container.append('svg')
        //    .attr('width', width)
        //    .attr('height', height);
        //const g = svg.append('g')
        //    .attr('transform', `translate(${margin.left},${margin.top})`);

        ////x-axis
        //const xScale = d3.scaleTime()
        //    .range([0, width - margin.left - margin.right])
        //    .domain(d3.extent(data, d => d3.timeParse('%Y-%m-%d')(d.date)))
        //    //.nice();
        //const xAxis = d3.axisBottom()
        //    .scale(xScale);
        //const xAxisG = svg.append('g')
        //    .attr('transform', `translate(${margin.left},${height - margin.bottom})`)
        //    .call(xAxis);
        //const xAxisLabel = xAxisG.append('text')
        //    .attr('x', (width - margin.left)/2)
        //    .attr('y', margin.bottom - 15)
        //    .style('text-anchor', 'middle')
        //    .style('fill', 'black')
        //    .text('Date');

        ////y-axis
        //const yScale = d3.scaleLinear()
        //    .range([height - margin.top - margin.bottom, 0])
        //    .domain(d3.extent(data, d => +d.mean))
        //    .nice();
        //const yAxis = d3.axisLeft()
        //    .scale(yScale);
        //const yAxisG = svg.append('g')
        //    .attr('transform', `translate(${margin.left},${margin.top})`)
        //    .call(yAxis);
        //const yAxisLabel = yAxisG.append('text')
        //    .attr('transform', 'rotate(-90)')
        //    .attr('x', -((height - margin.top) / 2))
        //    .attr('y', -margin.left + 15)
        //    .style('text-anchor', 'middle')
        //    .style('fill', 'black')
        //    .text('Glucose');

        ////line
        //const line = d3.line()
        //    .x(d => xScale(d3.timeParse('%Y-%m-%d')(d.date)))
        //    .y(d => yScale(d.mean))
        //    .curve(d3.curveLinear);
        //const path = g.append('path')
        //    .datum(data)
        //    .attr('d', line)
        //    .attr('stroke', 'green')
        //    .attr('stroke-linecap', 'round')
        //    .attr('stroke-width', 3)
        //    .attr('fill', 'none');
