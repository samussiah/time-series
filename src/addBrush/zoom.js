export default function zoom(ts) {
    const transition = ts.containers.chart.transition().duration(750);
    ts.x.axis.transition(transition).call(ts.x.generator);
    ts.x.gridLines.transition(transition).call(ts.x.gridLinesGenerator);
    ts.y.axis.transition(transition).call(ts.y.generator);
    ts.y.gridLines.transition(transition).call(ts.y.gridLinesGenerator);
    ts.line.path
        .transition(transition)
        .attr('d', ts.line.generator);
}
