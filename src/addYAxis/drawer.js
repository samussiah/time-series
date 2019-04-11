export default function chart(dimensions, domain, canvas) {
    //scale
    const scale = d3.scaleLinear()
        .range([dimensions.height/4, 0])
        .domain(domain)
        .nice();

    //generator
    const generator = d3.axisLeft()
        .scale(scale);

    //axis
    //const axis = canvas
    //    .append('g')
    //    .classed('axis axis--y', true)
    //    .call(generator);

    return {
        scale,
        generator,
    //    axis,
    };
}
