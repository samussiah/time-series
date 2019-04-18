export default function brush() {
    const context = this;

    this.drawer.brushGenerator = d3.brushX()
        .extent([0,0],[this.dimensions.widthLessMargin,this.dimensions.drawerHeight])
        .on('brush end', brushed);

    this.drawer.brush.call(this.drawer.brushGenerator);

    function brushed() {
        if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
        var s = d3.event.selection || context.drawer.x.scale.range();
        context.chart.x.scale.domain(s.map(context.drawer.x.scale.invert, context.drawer.x.scale));
        context.chart.linePath.attr("d", area);
        context.chart.x.axis.call(context.chart.x.generator);
        //svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
        //    .scale(width / (s[1] - s[0]))
        //    .translate(-s[0], 0));
    }
    //generator
    //    .extent([[0,0],[ts.containers.drawer.dimensions.width,ts.containers.drawer.dimensions.height]])
    //    .on('end', function() {
    //        end(ts);
    //    });

    //ts.containers.drawer.brush.call(generator);
}
