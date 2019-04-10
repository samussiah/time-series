import getDimensions from './getDimensions';
import layoutChart from './layout/chart';
import layoutDrawer from './layout/drawer';

export default function layout(ts) {
    const main = d3.select(ts.element);
    const dimensions = getDimensions(main);

    //container
    const div = main
        .append('div')
        .classed('time-series', true);

    //chart
    const chart = layoutChart(div, dimensions);

    //drawer
    const drawer = layoutDrawer(div, dimensions);

    return {
        main,
        div,
        chart,
        drawer
    };
}
