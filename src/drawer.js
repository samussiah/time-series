import layout from './drawer/layout';
import x from './drawer/x';
import y from './drawer/y';
import line from './drawer/line';
import brush from './drawer/brush';

export default function drawer() {
    layout.call(this);
    x.call(this);
    y.call(this);
    line.call(this);
    brush.call(this);
}
