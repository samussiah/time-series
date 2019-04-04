import zoom from './zoom';

export default function end(ts) {
    const s = d3.event.selection;

    if (!s) {
        if (!ts.brush.idleTimeout)
            return ts.brush.idleTimeout = setTimeout(ts.brush.idled, ts.brush.idleDelay);
        ts.x.scale.domain(ts.x.domain);
        ts.y.scale.domain(ts.y.domain).nice();
    } else {
        ts.x.scale.domain([s[0][0], s[1][0]].map(ts.x.scale.invert, ts.x.scale));
        ts.y.scale.domain([s[1][1], s[0][1]].map(ts.y.scale.invert, ts.y.scale));
        ts.containers.brush.call(ts.brush.generator.move, null);
    }

    zoom(ts);
}
