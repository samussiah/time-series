export default function line() {
    this.chart.lineGenerator = d3.line()
        .x(d => this.chart.x.scale(d3.timeParse(this.settings.x.format)(d[this.settings.x.field])))
        .y(d => this.chart.y.scale(d[this.settings.y.field]))
        .curve(d3.curveLinear);
    this.chart.linePath = this.chart.canvas
        .append('path')
        .datum(this.data)
        .attr('d', this.chart.lineGenerator)
        .attr('stroke', 'green')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 3)
        .attr('fill', 'none')
        .attr('clip-path', 'url(#ts-clip-path--chart)');
}
