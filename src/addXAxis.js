import getWidth from './getWidth';
import getHeight from './getHeight';
import getMargins from './getMargins';

export default function addXAxis(ts) {
    const width = getWidth(ts.containers.main);
    const height = width/3;
    const margins = getMargins();

    //scale
    const domain = d3.extent(
        ts.data,
        d => d3.timeParse(ts.settings.x.format)(d[ts.settings.x.field])
    );
    const scale = d3.scaleTime()
        .range([0, width - margins.left - margins.right])
        .domain(domain)
        //.nice();

    //axis
    const axis = d3.axisBottom()
        .scale(scale);

    //grid lines
    const gridLines = ts.containers.g
        .append('g')
        .attr('transform', `translate(0,${height - margins.bottom})`)
        .call(
            d3.axisBottom().scale(scale).tickSize(-(height - margins.bottom)).tickFormat('')
        );

    //g
    const g = ts.containers.g
        .append('g')
        .attr('transform', `translate(0,${height - margins.bottom})`)
        .call(axis);

    //label
    const label = g.append('text')
        .attr('x', (width - margins.left)/2)
        .attr('y', margins.bottom - 15)
        .style('text-anchor', 'middle')
        .style('fill', 'black')
        .text(ts.settings.x.label || 'Date');

    return {
        domain,
        scale,
        axis,
        gridLines,
        g,
        label,
    };
}
