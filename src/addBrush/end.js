import zoom from './zoom';

export default function end(ts) {
    //The coordinates of the brush.
    const s = d3.event.selection;

    //Reset chart on double click.
    if (!s) {
        if (!ts.brush.idleTimeout)
            return ts.brush.idleTimeout = setTimeout(
                () => {
                    ts.brush.idleTimeout = null;
                },
                ts.brush.idleDelay
            );
        ts.x.scale.domain(ts.x.domain);
        ts.y.scale.domain(ts.y.domain).nice();
    }
    //Update x- and y-domains with coordinates of brushed region.
    else {
        ts.x.scale.domain([s[0][0], s[1][0]].map(ts.x.scale.invert, ts.x.scale)); // update x-domain
        ts.y.scale.domain([s[1][1], s[0][1]].map(ts.y.scale.invert, ts.y.scale)); // update y-domain
        ts.containers.brush.call(ts.brush.generator.move, null); // reset brush
    }

    //Update chart.
    zoom(ts);
}
