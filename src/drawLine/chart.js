export default function chart(ts, xScale, yScale, canvas) {
    const generator = d3.line()
        .x(d => xScale(d3.timeParse(ts.settings.x.format)(d[ts.settings.x.field])))
        .y(d => yScale(d[ts.settings.y.field]))
        .curve(d3.curveLinear);
    const path = canvas
        .append('path')
        .datum(ts.data)
        .attr('d', generator)
        .attr('stroke', 'green')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 3)
        .attr('fill', 'none')
        .attr('clip-path', 'url(#ts-clip-path--chart)');

    return {
        generator,
        path,
    };
}
