export default function drawLine(ts) {
    const line = d3.line()
        .x(d => ts.x.scale(d3.timeParse(ts.settings.x.format)(d[ts.settings.x.field])))
        .y(d => ts.y.scale(d[ts.settings.y.field]))
        .curve(d3.curveLinear);
    const path = ts.containers.g
        .append('path')
        .datum(ts.data)
        .attr('d', line)
        .attr('stroke', 'green')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 3)
        .attr('fill', 'none');

    return {
        line,
        path,
    };
}
