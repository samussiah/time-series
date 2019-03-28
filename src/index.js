import layout from './layout';
import addXAxis from './addXAxis';
import addYAxis from './addYAxis';
import drawLine from './drawLine';

export default function timeSeries(data, settings = {}, element = 'body') {
    const ts = {
        data,
        element,
        settings
    };
    ts.containers = layout(ts);
    ts.x = addXAxis(ts);
    ts.y = addYAxis(ts);
    ts.line = drawLine(ts);
    console.log(ts.x.domain);
    console.log(ts.y.domain);

    return ts;
}
