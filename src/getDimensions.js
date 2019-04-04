import getMargins from './getDimensions/getMargins';
import getWidth from './getDimensions/getWidth';
import getHeight from './getDimensions/getHeight';

export default function getDimensions(element) {
    const margins = getMargins();
    const width = getWidth(element) - margins.left - margins.right;
    const height = getHeight(width, margins);

    return {
        margins,
        width,
        height
    };
}
