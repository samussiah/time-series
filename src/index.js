import layout from './layout';
import dimensions from './dimensions';
import x from './x';
import y from './y';
import chart from './chart';
import drawer from './drawer';
//import layout from './layout';
//import addXAxis from './addXAxis';
//import addYAxis from './addYAxis';
//import drawLine from './drawLine';
//import addBrush from './addBrush';

export default function timeSeries(data, settings = {}, element = 'body') {
    const ts = {
        data,
        settings,
        element,
        dimensions: {},
        x: {},
        y: {},
        chart: {
            x: {},
            y: {},
        },
        drawer: {
            x: {},
            y: {},
        },
    };
    layout.call(ts);
    dimensions.call(ts);
    x.call(ts);
    y.call(ts);
    chart.call(ts);
    drawer.call(ts);
    //ts.containers = layout(ts);
    //ts.x = addXAxis(ts);
    //ts.y = addYAxis(ts);
    //ts.line = drawLine(ts);
    //ts.brush = addBrush(ts);

    return ts;
}
