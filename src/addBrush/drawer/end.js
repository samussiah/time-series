import zoom from '../chart/zoom';
//import zoom from './zoom';

export default function end(ts) {
    //The coordinates of the brush.
    const s = d3.event.selection;
    console.table(s);

    if (s === null) {
    } else {
        //ts.x.drawer.scale.domain([s[0][0], s[1][0]].map(ts.x.drawer.scale.invert, ts.x.drawer.scale)); // update x-domain
        ts.x.chart.scale.domain(ts.x.domain);
        ts.x.chart.scale.domain([s[0], s[1]].map(ts.x.chart.scale.invert, ts.x.chart.scale)); // update x-domain
        zoom(ts);
    }
    //ts.containers.chart.brush.call(ts.brush.chart.generator.move, null); // reset brush

    //Update chart.
}
