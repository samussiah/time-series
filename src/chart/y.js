export default function y() {
    //scale
    this.chart.y.scale = d3
        .scaleLinear()
        .range([this.dimensions.heightLessMargin, 0])
        .domain(this.y.domain)
        .nice();

    //axis
    this.chart.y.generator = d3.axisLeft().scale(this.chart.y.scale);
    this.chart.y.axis = this.chart.canvas
        .append('g')
        .classed('axis axis--y', true)
        .call(this.chart.y.generator);

    //grid lines
    this.chart.y.gridLinesGenerator = d3
        .axisLeft()
        .scale(this.chart.y.scale)
        .tickSize(-this.dimensions.widthLessMargin)
        .tickFormat('');
    this.chart.y.gridLines = this.chart.canvas
        .append('g')
        .classed('grid-lines grid-lines--y', true)
        .call(this.chart.y.gridLinesGenerator);

    //label
    this.chart.y.label = this.chart.y.axis
        .append('text')
        .classed('label label--x', true)
        .attr('transform', 'rotate(-90)')
        .attr('x', -(this.dimensions.heightLessMargin / 2))
        .attr('y', -this.dimensions.margin.left + 16)
        .style('text-anchor', 'middle')
        .style('fill', 'black');
    //.text(labelText || 'Result');
}
