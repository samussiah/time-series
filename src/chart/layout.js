export default function layout() {
    //svg
    this.chart.svg = this.chart.container
        .append('svg')
        .classed('ts-svg', true)
        .attr('width', this.dimensions.width)
        .attr('height', this.dimensions.height);

    //clipPath
    this.chart.clipPath = this.chart.svg.append('clipPath').attr('id', 'ts-clip-path--chart');
    this.chart.clipPathRect = this.chart.clipPath
        .append('rect')
        .attr('width', this.dimensions.widthLessMargin)
        .attr('height', this.dimensions.heightLessMargin);
    //.attr('transform', `translate(${this.dimensions.margin.left},${this.dimensions.margin.top})`);

    //canvas
    this.chart.canvas = this.chart.svg
        .append('g')
        .classed('ts-chart', true)
        .attr(
            'transform',
            `translate(${this.dimensions.margin.left},${this.dimensions.margin.top})`
        );

    //brush
    this.chart.brush = this.chart.svg
        .append('g')
        .classed('ts-brush', true)
        .attr(
            'transform',
            `translate(${this.dimensions.margin.left},${this.dimensions.margin.top})`
        );
}
