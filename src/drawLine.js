export default function drawLine(ts) {
    const generator = d3.line()
        .x(d => ts.x.scale(d3.timeParse(ts.settings.x.format)(d[ts.settings.x.field])))
        .y(d => ts.y.scale(d[ts.settings.y.field]))
        .curve(d3.curveLinear);
    const path = ts.containers.chart
        .append('path')
        .datum(ts.data)
        .attr('d', generator)
        .attr('stroke', 'green')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 3)
        .attr('fill', 'none')
        .attr('clip-path', 'url(#ts-clip-path)');

    return {
        generator,
        path,
    };
}
