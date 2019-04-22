export default function x() {
    this.x.domain = d3.extent(this.data, d =>
        d3.timeParse(this.settings.x.format)(d[this.settings.x.field])
    );
}
