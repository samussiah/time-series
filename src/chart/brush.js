import updateChart from './brush/updateChart';

export default function brush() {
    this.chart.brushGenerator = d3.brush()
        .extent([[0,0],[this.dimensions.widthLessMargin,this.dimensions.height]])
        .on('end', () => {
            updateChart.call(this);
        });
    this.chart.brush
        .on('dblclick', () => {
            //Reset chart domains.
            this.chart.x.scale.domain(this.x.domain);
            this.chart.y.scale.domain(this.y.domain);
            updateChart.call(this);
        })
        .call(this.chart.brushGenerator);
}
