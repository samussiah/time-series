(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.timeSeries = factory());
}(this, function () { 'use strict';

    function getWidth(element) {
        return typeof element.node === 'function'
            ? element.node().offsetWidth
            : element.offsetWidth;
    }

    function getMargins() {
        return {
            top: 10,
            bottom: 50,
            left: 50,
            right: 10
        };
    }

    function layout(ts) {
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

    function addXAxis(ts) {
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
            .domain(domain);
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

    function addYAxis(ts) {
        const width = getWidth(ts.containers.main);
        const height = width/3;
        const margins = getMargins();

        //scale
        const domain = d3.extent(ts.data, d => +d[ts.settings.y.field]);
        const scale = d3.scaleLinear()
            .range([height - margins.top - margins.bottom, 0])
            .domain(domain);
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

    function drawLine(ts) {
        const line = d3.line()
            .x(d => ts.x.scale(d3.timeParse(ts.settings.x.format)(d[ts.settings.x.field])))
            .y(d => ts.y.scale(d[ts.settings.y.field]))
            .curve(d3.curveLinear);
        const path = ts.containers.g
            .append('path')
            .datum(ts.data)
            .attr('d', line)
            .attr('stroke', 'green')
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', 3)
            .attr('fill', 'none');

        return {
            line,
            path,
        };
    }

    function timeSeries(data, settings = {}, element = 'body') {
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

    return timeSeries;

}));
