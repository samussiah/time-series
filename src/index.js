import layout from './layout';
import addXAxis from './addXAxis';
import addYAxis from './addYAxis';
import drawLine from './drawLine';
import addBrush from './addBrush';

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
    ts.brush = addBrush(ts);

    return ts;
}
