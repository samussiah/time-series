import getWidth from './getWidth';
import getHeight from './getHeight';
import getMargins from './getMargins';

export default function layout(ts) {
    const main = d3.select(ts.element);

    //div
    const div = main
        .append('div')
        .classed('time-series', true);

    //svg
    const width = getWidth(main);
    const height = width/3;
    const svg = div
        .append('svg')
        .classed('ts-svg', true)
        .attr('width', width)
        .attr('height', height);

    //g
    const margins = getMargins();
    const g = svg
        .append('g')
        .classed('ts-g', true)
        .attr('transform', `translate(${margins.left},${margins.top})`);

    return {
        main,
        div,
        svg,
        g
    };
}
