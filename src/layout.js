import getDimensions from './getDimensions';

export default function layout(ts) {
    const main = d3.select(ts.element);
    const dimensions = getDimensions(main);

    //div
    const div = main
        .append('div')
        .classed('time-series', true);

    //svg
    const svg = div
        .append('svg')
        .classed('ts-svg', true)
        .attr('width', dimensions.width + dimensions.margins.left + dimensions.margins.right)
        .attr('height', dimensions.height + dimensions.margins.top + dimensions.margins.bottom);

    //clipPath
    const clipPath = svg
        .append('clipPath')
        .attr('id', 'ts-clip-path');
    const clipPathRect = clipPath
        .append('rect')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height)
        //.attr('transform', `translate(${dimensions.margins.left},${dimensions.margins.top})`);

    //chart
    const chart = svg
        .append('g')
        .classed('ts-chart', true)
        .attr('transform', `translate(${dimensions.margins.left},${dimensions.margins.top})`);

    //brush
    const brush = svg
        .append('g')
        .classed('ts-brush', true)
        .attr('transform', `translate(${dimensions.margins.left},${dimensions.margins.top})`);

    return {
        main,
        div,
        svg,
        clipPath,
        clipPathRect,
        chart,
        brush
    };
}
