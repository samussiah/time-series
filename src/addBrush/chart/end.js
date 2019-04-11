import zoom from './zoom';

export default function end(ts) {
    //The coordinates of the brush.
    const s = d3.event.selection;

    //Reset chart on double click.
    if (!s) {
        if (!ts.brush.chart.idleTimeout)
            return ts.brush.chart.idleTimeout = setTimeout(
                () => {
                    ts.brush.chart.idleTimeout = null;
                },
                ts.brush.chart.idleDelay
            );
        ts.x.chart.scale.domain(ts.x.domain);
        ts.y.chart.scale.domain(ts.y.domain).nice();
    }
    //Update x- and y-domains with coordinates of brushed region.
    else {
        ts.x.chart.scale.domain([s[0][0], s[1][0]].map(ts.x.chart.scale.invert, ts.x.chart.scale)); // update x-domain
        ts.y.chart.scale.domain([s[1][1], s[0][1]].map(ts.y.chart.scale.invert, ts.y.chart.scale)); // update y-domain
        ts.containers.chart.brush.call(ts.brush.chart.generator.move, null); // reset brush
    }

    //Update chart.
    zoom(ts);
}
