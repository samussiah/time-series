export default function chart(dimensions, domain, canvas, labelText) {
    //scale
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
    const gridLines = canvas
        .append('g')
        .classed('grid-lines grid-lines--y', true)
        .call(gridLinesGenerator);

    //axis
    const axis = canvas
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
        //.text(labelText || 'Result');

    return {
        scale,
        generator,
        gridLinesGenerator,
        gridLines,
        axis,
        label,
    };
}
