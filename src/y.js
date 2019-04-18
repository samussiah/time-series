export default function y() {
    this.y.domain = d3.extent(this.data, d => +d[this.settings.y.field]);
}
