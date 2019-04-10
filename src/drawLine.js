import drawLineOnChart from './drawLine/chart';
import drawLineOnDrawer from './drawLine/drawer';

export default function drawLine(ts) {
    const chart = drawLineOnChart(ts, ts.x.chart.scale, ts.y.chart.scale, ts.containers.chart.canvas);
    const drawer = drawLineOnDrawer(ts, ts.x.drawer.scale, ts.y.drawer.scale, ts.containers.drawer.canvas);

    return {
        chart,
        drawer,
    };
}
