export default function updateChart() {
    const extent = d3.event.selection;

    //Reset chart domain.
    //this.chart.x.scale.domain(this.x.domain);

    if (!extent) {
    } else {
        //Update x-scale with horizontal extent of brush.
        const xCoordinates = [extent[0][0], extent[1][0]];
        const xDomain = xCoordinates.map(this.chart.x.scale.invert);
        this.chart.x.scale.domain(xDomain);

        //Update y-scale with vertical extent of brush.
        const yCoordinates = [extent[1][1], extent[0][1]];
        const yDomain = yCoordinates.map(this.chart.y.scale.invert);
        this.chart.y.scale.domain(yDomain);

        //Clear chart brush.
        this.chart.brush.call(this.chart.brushGenerator.move, null);

        //Update drawer brush.
        const drawerExtent = xDomain.map(this.drawer.x.scale);
        this.drawer.brush.call(this.drawer.brushGenerator.move, drawerExtent);
    }

    //Define a transition on the chart canvas.
    const transition = this.chart.canvas.transition().duration(750);

    //Update the x-axis, x-gridlines, and line.
    this.chart.x.axis.transition(transition).call(this.chart.x.generator);
    this.chart.x.gridLines.transition(transition).call(this.chart.x.gridLinesGenerator);
    this.chart.y.axis.transition(transition).call(this.chart.y.generator);
    this.chart.y.gridLines.transition(transition).call(this.chart.y.gridLinesGenerator);
    this.chart.linePath.transition(transition).attr('d', this.chart.lineGenerator);
}
