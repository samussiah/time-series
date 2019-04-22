export default function layout() {
    this.container = d3
        .select(this.element)
        .append('div')
        .classed('time-series', true);
    this.chart.container = this.container
        .append('div')
        .classed('ts-component ts-component--chart', true);
    this.drawer.container = this.container
        .append('div')
        .classed('ts-component ts-component--drawer', true);
}
