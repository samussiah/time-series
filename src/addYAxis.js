import getDimensions from './getDimensions';

export default function addYAxis(ts) {
    const dimensions = getDimensions(ts.containers.main);

    //scale
    const domain = d3.extent(ts.data, d => +d[ts.settings.y.field]);
    const scale = d3.scaleLinear()
        .range([dimensions.height, 0])
        .domain(domain)
        .nice();

    //generators
    const generator = d3.axisLeft()
        .scale(scale);
    const gridLinesGenerator = d3.axisLeft()
        .scale(scale)
        .tickSize(-dimensions.width)
        .tickFormat('');

    //grid lines
    const gridLines = ts.containers.chart
        .append('g')
        .classed('grid-lines grid-lines--y', true)
        .call(gridLinesGenerator);

    //axis
    const axis = ts.containers.chart
        .append('g')
        .classed('axis axis--y', true)
        .call(generator);

    //label
    const label = axis.append('text')
        .classed('label label--x', true)
        .attr('transform', 'rotate(-90)')
        .attr('x', -(dimensions.height / 2))
        .attr('y', -dimensions.margins.left + 16)
        .style('text-anchor', 'middle')
        .style('fill', 'black')
        .text(ts.settings.y.label || 'Result');

    return {
        domain,
        scale,
        generator,
        gridLinesGenerator,
        gridLines,
        axis,
        label,
    };
}
