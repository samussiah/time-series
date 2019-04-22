import layout from './layout';
import dimensions from './dimensions';
import x from './x';
import y from './y';
import chart from './chart';
import drawer from './drawer';

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
            y: {}
        },
        drawer: {
            x: {},
            y: {}
        }
    };
    layout.call(ts);
    dimensions.call(ts);
    x.call(ts);
    y.call(ts);
    chart.call(ts);
    drawer.call(ts);

    return ts;
}
