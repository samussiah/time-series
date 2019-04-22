export default function updateChart() {
    const extent = d3.event.selection;

    //Reset x- and y-domains of chart.
    this.chart.x.scale.domain(this.x.domain);
    this.chart.y.scale.domain(this.y.domain);

    if (!extent) {
        this.drawer.brush.call(this.drawer.brushGenerator.move, [
            0,
            this.dimensions.widthLessMargin
        ]);
    } else {
        //Set chart domain to extent of drawer brush.
        this.chart.x.scale.domain(extent.map(this.chart.x.scale.invert));
    }

    //Define a transition on the chart canvas.
    const transition = this.chart.canvas.transition().duration(750);

    //Update the x-axis, x-gridlines, and line.
    this.chart.x.axis.transition(transition).call(this.chart.x.generator);
    this.chart.x.gridLines.transition(transition).call(this.chart.x.gridLinesGenerator);
    this.chart.linePath.transition(transition).attr('d', this.chart.lineGenerator);
}
