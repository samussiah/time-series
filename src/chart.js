import layout from './chart/layout';
import x from './chart/x';
import y from './chart/y';
import line from './chart/line';
import brush from './chart/brush';

export default function chart() {
    layout.call(this);
    x.call(this);
    y.call(this);
    line.call(this);
    brush.call(this);
}
