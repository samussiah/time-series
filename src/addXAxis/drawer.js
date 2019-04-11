export default function drawer(dimensions, domain, canvas) {
    //scale
    const scale = d3.scaleTime()
        .range([0, dimensions.width])
        .domain(domain);

    //generators
    const generator = d3.axisBottom()
        .scale(scale);
    const gridLinesGenerator = d3.axisBottom()
        .scale(scale)
        .tickSize(-dimensions.height/4)
        .tickFormat('');

    //grid lines
    const gridLines = canvas
        .append('g')
        .classed('grid-lines grid-lines--x', true)
        .attr('transform', `translate(0,${dimensions.height/4})`)
        .call(gridLinesGenerator);

    //axis
    //const axis = canvas
    //    .append('g')
    //    .classed('axis axis--x', true)
    //    .attr('transform', `translate(0,${dimensions.height/4})`)
    //    .call(generator);

    return {
        scale,
        generator,
        gridLinesGenerator,
        gridLines,
    //    axis,
    };
}
