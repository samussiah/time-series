import getDimensions from './getDimensions';

export default function addXAxis(ts) {
    const dimensions = getDimensions(ts.containers.main);

    //domain
    const domain = d3.extent(
        ts.data,
        d => d3.timeParse(ts.settings.x.format)(d[ts.settings.x.field])
    );

    //scale
    const scale = d3.scaleTime()
        .range([0, dimensions.width])
        .domain(domain)

    //generators
    const generator = d3.axisBottom()
        .scale(scale);
    const gridLinesGenerator = d3.axisBottom()
        .scale(scale)
        .tickSize(-dimensions.height)
        .tickFormat('');

    //grid lines
    const gridLines = ts.containers.chart
        .append('g')
        .classed('grid-lines grid-lines--x', true)
        .attr('transform', `translate(0,${dimensions.height})`)
        .call(gridLinesGenerator);

    //axis
    const axis = ts.containers.chart
        .append('g')
        .classed('axis axis--x', true)
        .attr('transform', `translate(0,${dimensions.height})`)
        .call(generator);

    //label
    const label = axis.append('text')
        .classed('label label--x', true)
        .attr('x', dimensions.width/2)
        .attr('y', dimensions.margins.bottom - 16)
        .style('text-anchor', 'middle')
        .style('fill', 'black')
        .text(ts.settings.x.label || 'Date');

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
