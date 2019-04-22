export default function x() {
    //scale
    this.drawer.x.scale = d3
        .scaleTime()
        .range([0, this.dimensions.widthLessMargin])
        .domain(this.x.domain);

    //generators
    this.drawer.x.generator = d3.axisBottom().scale(this.drawer.x.scale);
    this.drawer.x.gridLinesGenerator = d3
        .axisBottom()
        .scale(this.drawer.x.scale)
        .tickSize(-this.dimensions.drawerHeight)
        .tickFormat('');

    //grid lines
    this.drawer.x.gridLines = this.drawer.canvas
        .append('g')
        .classed('grid-lines grid-lines--x', true)
        .attr('transform', `translate(0,${this.dimensions.drawerHeight})`)
        .call(this.drawer.x.gridLinesGenerator);

    //axis
    //this.drawer.x.axis = this.drawer.canvas
    //    .append('g')
    //    .classed('axis axis--x', true)
    //    .attr('transform', `translate(0,${this.dimensions.drawerHeight})`)
    //    .call(this.drawer.x.generator);
}
