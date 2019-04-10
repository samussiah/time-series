import getDimensions from './getDimensions';
import addYAxisToChart from './addYAxis/chart';
import addYAxisToDrawer from './addYAxis/drawer';

export default function addYAxis(ts) {
    const dimensions = getDimensions(ts.containers.main);

    //domain
    const domain = d3.extent(ts.data, d => +d[ts.settings.y.field]);

    //scale, axis, grid lines
    const chart = addYAxisToChart(dimensions, domain, ts.containers.chart.canvas, ts.settings.y.label);

    //scale, axis, grid lines
    const drawer = addYAxisToDrawer(dimensions, domain, ts.containers.drawer.canvas);

    return {
        domain,
        chart,
        drawer,
    };
}
