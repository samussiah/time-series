import updateChart from './brush/updateChart';

export default function brush() {
    this.chart.brushGenerator = d3
        .brush()
        .extent([[0, 0], [this.dimensions.widthLessMargin, this.dimensions.height]])
        .on('end', () => {
            //Redraw chart.
            updateChart.call(this);
        });
    this.chart.brush
        .on('dblclick', () => {
            //Reset x- and y-domains of chart.
            this.chart.x.scale.domain(this.x.domain);
            this.chart.y.scale.domain(this.y.domain);

            //Redraw chart.
            updateChart.call(this);

            //Update drawer brush.
            this.drawer.brush.call(this.drawer.brushGenerator.move, [
                0,
                this.dimensions.widthLessMargin
            ]);
        })
        .call(this.chart.brushGenerator);
}
