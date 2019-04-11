import addBrushToChart from './addBrush/chart';
import addBrushToDrawer from './addBrush/drawer';

export default function addBrush(ts) {
    const chart = addBrushToChart(ts);
    const drawer = addBrushToDrawer(ts);

    return {
        chart: addBrushToChart(ts),
        drawer
    };
}
