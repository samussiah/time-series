import getWidth from './getWidth';
import getHeight from './getHeight';
import getMargins from './getMargins';

export default function addYAxis(ts) {
    const width = getWidth(ts.containers.main);
    const height = width/3;
    const margins = getMargins();

    //scale
    const domain = d3.extent(ts.data, d => +d[ts.settings.y.field]);
    const scale = d3.scaleLinear()
        .range([height - margins.top - margins.bottom, 0])
        .domain(domain)
        //.nice();

    //axis
    const axis = d3.axisLeft()
        .scale(scale);

    //grid lines
    const gridLines = ts.containers.g
        .append('g')
        .attr('transform', `translate(0,${margins.top})`)
        .call(
            d3.axisLeft().scale(scale).tickSize(-(width - margins.left)).tickFormat('')
        );

    //g
    const g = ts.containers.g
        .append('g')
        .attr('transform', `translate(0,${margins.top})`)
        .call(axis);

    //label
    const label = g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -((height - margins.top) / 2))
        .attr('y', -margins.left + 15)
        .style('text-anchor', 'middle')
        .style('fill', 'black')
        .text(ts.settings.y.label || 'Result');

    return {
        domain,
        scale,
        axis,
        gridLines,
        g,
        label,
    };
}
