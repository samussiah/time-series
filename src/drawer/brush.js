import updateChart from './brush/updateChart';

export default function brush() {
    this.drawer.brushGenerator = d3
        .brushX()
        .extent([[0, 0], [this.dimensions.widthLessMargin, this.dimensions.drawerHeight]])
        .on('brush', () => {
            const extent = d3.event.selection;
            this.drawer.brushHandles
                .attr('display', null)
                .attr('transform', (d, i) => 'translate(' + extent[i] + ',0)');
        })
        .on('end', () => {
            //Redraw chart.
            updateChart.call(this);
        });
    this.drawer.brush.call(this.drawer.brushGenerator);
    this.drawer.brushHandles = this.drawer.brush
        .selectAll('rect.handle--custom')
        .data([{ type: 'w' }, { type: 'e' }])
        .enter()
        .append('rect')
        .classed('handle--custom', true)
        .attr('fill', '#666')
        .attr('fill-opacity', 0.8)
        .attr('stroke', '#000')
        .attr('stroke-width', 1.5)
        .attr('cursor', 'ew-resize')
        .attr('x', (d, i) => (i ? 0 : -5))
        .attr('y', 0)
        .attr('width', '5px')
        .attr('height', this.dimensions.drawerHeight);
    this.drawer.brush.call(this.drawer.brushGenerator.move, [0, this.dimensions.widthLessMargin]);
}
