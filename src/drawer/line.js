export default function line() {
    this.drawer.lineGenerator = d3
        .line()
        .x(d => this.drawer.x.scale(d3.timeParse(this.settings.x.format)(d[this.settings.x.field])))
        .y(d => this.drawer.y.scale(d[this.settings.y.field]))
        .curve(d3.curveLinear);
    this.drawer.linePath = this.drawer.canvas
        .append('path')
        .datum(this.data)
        .attr('d', this.drawer.lineGenerator)
        .attr('stroke', 'green')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 3)
        .attr('fill', 'none')
        .attr('clip-path', 'url(#ts-clip-path--drawer)');
}
