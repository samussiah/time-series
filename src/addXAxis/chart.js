export default function chart(dimensions, domain, canvas, labelText) {
    //scale
    const scale = d3.scaleTime()
        .range([0, dimensions.width])
        .domain(domain);

    //generators
    const generator = d3.axisBottom()
        .scale(scale);
    const gridLinesGenerator = d3.axisBottom()
        .scale(scale)
        .tickSize(-dimensions.height)
        .tickFormat('');

    //grid lines
    const gridLines = canvas
        .append('g')
        .classed('grid-lines grid-lines--x', true)
        .attr('transform', `translate(0,${dimensions.height})`)
        .call(gridLinesGenerator);

    //axis
    const axis = canvas
        .append('g')
        .classed('axis axis--x', true)
        .attr('transform', `translate(0,${dimensions.height})`)
        .call(generator);

    //label
    const label = axis.append('text')
        .classed('label label--x', true)
        .attr('x', dimensions.width/2)
        .attr('y', dimensions.margins.bottom)
        .style('text-anchor', 'middle')
        .style('fill', 'black')
        //.text(labelText || 'Date');

    return {
        scale,
        generator,
        gridLinesGenerator,
        gridLines,
        axis,
        label,
    };
}
