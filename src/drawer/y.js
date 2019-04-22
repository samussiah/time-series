export default function y() {
    //scale
    this.drawer.y.scale = d3
        .scaleLinear()
        .range([this.dimensions.drawerHeight, 0])
        .domain(this.y.domain)
        .nice();

    //generator
    this.drawer.y.generator = d3.axisLeft().scale(this.drawer.y.scale);

    //axis
    //this.drawer.y.axis = this.drawer.canvas
    //    .append('g')
    //    .classed('axis axis--y', true)
    //    .call(this.drawer.y.generator);
}
