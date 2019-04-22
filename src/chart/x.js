export default function x() {
    //scale
    this.chart.x.scale = d3
        .scaleTime()
        .range([0, this.dimensions.widthLessMargin])
        .domain(this.x.domain);

    //axis
    this.chart.x.generator = d3.axisBottom().scale(this.chart.x.scale);
    this.chart.x.axis = this.chart.canvas
        .append('g')
        .classed('axis axis--x', true)
        .attr('transform', `translate(0,${this.dimensions.heightLessMargin})`)
        .call(this.chart.x.generator);

    //grid lines
    this.chart.x.gridLinesGenerator = d3
        .axisBottom()
        .scale(this.chart.x.scale)
        .tickSize(-this.dimensions.heightLessMargin)
        .tickFormat('');
    this.chart.x.gridLines = this.chart.canvas
        .append('g')
        .classed('grid-lines grid-lines--x', true)
        .attr('transform', `translate(0,${this.dimensions.heightLessMargin})`)
        .call(this.chart.x.gridLinesGenerator);

    //label
    this.chart.x.label = this.chart.x.axis
        .append('text')
        .classed('label label--x', true)
        .attr('x', this.dimensions.widthLessMargin / 2)
        .attr('y', this.dimensions.margin.bottom)
        .style('text-anchor', 'middle')
        .style('fill', 'black');
    //.text(labelText || 'Date');
}
