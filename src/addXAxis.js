import getDimensions from './getDimensions';
import addXAxisToChart from './addXAxis/chart';
import addXAxisToDrawer from './addXAxis/drawer';

export default function addXAxis(ts) {
    const dimensions = getDimensions(ts.containers.main);

    //domain
    const domain = d3.extent(
        ts.data,
        d => d3.timeParse(ts.settings.x.format)(d[ts.settings.x.field])
    );

    //scale, axis, grid lines
    const chart = addXAxisToChart(dimensions, domain, ts.containers.chart.canvas, ts.settings.x.label);

    //scale, axis, grid lines
    const drawer = addXAxisToDrawer(dimensions, domain, ts.containers.drawer.canvas);

    return {
        domain,
        chart,
        drawer,
    };
}
