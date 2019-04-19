export default function layout() {
    //svg
    this.drawer.svg = this.drawer.container
        .append('svg')
        .classed('ts-svg', true)
        .attr('width', this.dimensions.width)
        .attr('height', this.dimensions.drawerHeight);

    //clipPath
    this.drawer.clipPath = this.drawer.svg
        .append('clipPath')
        .attr('id', 'ts-clip-path--drawer');
    this.drawer.clipPathRect = this.drawer.clipPath
        .append('rect')
        .attr('width', this.dimensions.widthLessMargin)
        .attr('height', this.dimensions.drawerHeight)
        //.attr('transform', `translate(${this.dimensions.margin.left},0)`);//${this.dimensions.margin.top})`);

    //canvas
    this.drawer.canvas = this.drawer.svg
        .append('g')
        .classed('ts-drawer', true)
        .attr('transform', `translate(${this.dimensions.margin.left},0)`);//${this.dimensions.margin.top})`);

    //brush
    this.drawer.brush = this.drawer.svg
        .append('g')
        .classed('ts-brush', true)
        .attr('transform', `translate(${this.dimensions.margin.left},0)`);//${this.dimensions.margin.top})`);
}
