export default function chart(container, dimensions) {
    //svg
    const svg = container
        .append('svg')
        .classed('ts-svg', true)
        .attr('width', dimensions.width + dimensions.margins.left + dimensions.margins.right)
        .attr('height', dimensions.height + dimensions.margins.top + dimensions.margins.bottom);

    //clipPath
    const clipPath = svg
        .append('clipPath')
        .attr('id', 'ts-clip-path--chart');
    const clipPathRect = clipPath
        .append('rect')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height)
        //.attr('transform', `translate(${dimensions.margins.left},${dimensions.margins.top})`);

    //chart
    const canvas = svg
        .append('g')
        .classed('ts-chart', true)
        .attr('transform', `translate(${dimensions.margins.left},${dimensions.margins.top})`);

    //brush
    const brush = svg
        .append('g')
        .classed('ts-brush', true)
        .attr('transform', `translate(${dimensions.margins.left},${dimensions.margins.top})`);

    return {
        svg,
        clipPath,
        clipPathRect,
        canvas,
        brush
    };
}
