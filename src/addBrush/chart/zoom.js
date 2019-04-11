export default function zoom(ts) {
    const transition = ts.containers.chart.canvas.transition().duration(750);
    ts.x.chart.axis.transition(transition).call(ts.x.chart.generator);
    ts.x.chart.gridLines.transition(transition).call(ts.x.chart.gridLinesGenerator);
    ts.y.chart.axis.transition(transition).call(ts.y.chart.generator);
    ts.y.chart.gridLines.transition(transition).call(ts.y.chart.gridLinesGenerator);
    ts.line.chart.path
        .transition(transition)
        .attr('d', ts.line.chart.generator);
}
