(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.timeSeries = factory());
}(this, function () { 'use strict';

    function getMargins() {
        return {
            top: 10,
            bottom: 20,
            left: 50,
            right: 10
        };
    }

    function getWidth(element) {
        return typeof element.node === 'function'
            ? element.node().offsetWidth
            : element.offsetWidth;
    }

    function getHeight(width, margins) {
        return width/3 - margins.top - margins.bottom;
    }

    function getDimensions(element) {
        const margins = getMargins();
        const width = getWidth(element) - margins.left - margins.right;
        const height = getHeight(width, margins);

        return {
            margins,
            width,
            height
        };
    }

    function chart(container, dimensions) {
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
            .attr('height', dimensions.height);
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

    function drawer(container, dimensions) {
        dimensions.height = dimensions.height/4;
        //svg
        const svg = container
            .append('svg')
            .classed('ts-svg', true)
            .attr('width', dimensions.width + dimensions.margins.left + dimensions.margins.right)
            .attr('height', dimensions.height + dimensions.margins.top + dimensions.margins.bottom);

        //clipPath
        const clipPath = svg
            .append('clipPath')
            .attr('id', 'ts-clip-path--drawer');
        const clipPathRect = clipPath
            .append('rect')
            .attr('width', dimensions.width)
            .attr('height', dimensions.height);
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
            brush,
            dimensions
        };
    }

    function layout(ts) {
        const main = d3.select(ts.element);
        const dimensions = getDimensions(main);

        //container
        const div = main
            .append('div')
            .classed('time-series', true);

        //chart
        const chart$1 = chart(div, dimensions);

        //drawer
        const drawer$1 = drawer(div, dimensions);

        return {
            main,
            div,
            chart: chart$1,
            drawer: drawer$1
        };
    }

    function chart$1(dimensions, domain, canvas, labelText) {
        //scale
        const scale = d3.scaleTime()
            .range([0, dimensions.width])
            .domain(domain);

        //generators
        const generator = d3.axisBottom()
            .scale(scale);
        const gridLinesGenerator = d3.axisBottom()
            .scale(scale)
            .tickSize(-dimensions.height)
            .tickFormat('');

        //grid lines
        const gridLines = canvas
            .append('g')
            .classed('grid-lines grid-lines--x', true)
            .attr('transform', `translate(0,${dimensions.height})`)
            .call(gridLinesGenerator);

        //axis
        const axis = canvas
            .append('g')
            .classed('axis axis--x', true)
            .attr('transform', `translate(0,${dimensions.height})`)
            .call(generator);

        //label
        const label = axis.append('text')
            .classed('label label--x', true)
            .attr('x', dimensions.width/2)
            .attr('y', dimensions.margins.bottom)
            .style('text-anchor', 'middle')
            .style('fill', 'black');
            //.text(labelText || 'Date');

        return {
            scale,
            generator,
            gridLinesGenerator,
            gridLines,
            axis,
            label,
        };
    }

    function drawer$1(dimensions, domain, canvas) {
        //scale
        const scale = d3.scaleTime()
            .range([0, dimensions.width])
            .domain(domain);

        //generators
        const generator = d3.axisBottom()
            .scale(scale);
        const gridLinesGenerator = d3.axisBottom()
            .scale(scale)
            .tickSize(-dimensions.height/4)
            .tickFormat('');

        //grid lines
        const gridLines = canvas
            .append('g')
            .classed('grid-lines grid-lines--x', true)
            .attr('transform', `translate(0,${dimensions.height/4})`)
            .call(gridLinesGenerator);

        //axis
        //const axis = canvas
        //    .append('g')
        //    .classed('axis axis--x', true)
        //    .attr('transform', `translate(0,${dimensions.height/4})`)
        //    .call(generator);

        return {
            scale,
            generator,
            gridLinesGenerator,
            gridLines,
        //    axis,
        };
    }

    function addXAxis(ts) {
        const dimensions = getDimensions(ts.containers.main);

        //domain
        const domain = d3.extent(
            ts.data,
            d => d3.timeParse(ts.settings.x.format)(d[ts.settings.x.field])
        );

        //scale, axis, grid lines
        const chart = chart$1(dimensions, domain, ts.containers.chart.canvas, ts.settings.x.label);

        //scale, axis, grid lines
        const drawer = drawer$1(dimensions, domain, ts.containers.drawer.canvas);

        return {
            domain,
            chart,
            drawer,
        };
    }

    function chart$2(dimensions, domain, canvas, labelText) {
        //scale
        const scale = d3.scaleLinear()
            .range([dimensions.height, 0])
            .domain(domain)
            .nice();

        //generators
        const generator = d3.axisLeft()
            .scale(scale);
        const gridLinesGenerator = d3.axisLeft()
            .scale(scale)
            .tickSize(-dimensions.width)
            .tickFormat('');

        //grid lines
        const gridLines = canvas
            .append('g')
            .classed('grid-lines grid-lines--y', true)
            .call(gridLinesGenerator);

        //axis
        const axis = canvas
            .append('g')
            .classed('axis axis--y', true)
            .call(generator);

        //label
        const label = axis.append('text')
            .classed('label label--x', true)
            .attr('transform', 'rotate(-90)')
            .attr('x', -(dimensions.height / 2))
            .attr('y', -dimensions.margins.left + 16)
            .style('text-anchor', 'middle')
            .style('fill', 'black');
            //.text(labelText || 'Result');

        return {
            scale,
            generator,
            gridLinesGenerator,
            gridLines,
            axis,
            label,
        };
    }

    function chart$3(dimensions, domain, canvas) {
        //scale
        const scale = d3.scaleLinear()
            .range([dimensions.height/4, 0])
            .domain(domain)
            .nice();

        //generator
        const generator = d3.axisLeft()
            .scale(scale);

        //axis
        //const axis = canvas
        //    .append('g')
        //    .classed('axis axis--y', true)
        //    .call(generator);

        return {
            scale,
            generator,
        //    axis,
        };
    }

    function addYAxis(ts) {
        const dimensions = getDimensions(ts.containers.main);

        //domain
        const domain = d3.extent(ts.data, d => +d[ts.settings.y.field]);

        //scale, axis, grid lines
        const chart = chart$2(dimensions, domain, ts.containers.chart.canvas, ts.settings.y.label);

        //scale, axis, grid lines
        const drawer = chart$3(dimensions, domain, ts.containers.drawer.canvas);

        return {
            domain,
            chart,
            drawer,
        };
    }

    function chart$4(ts, xScale, yScale, canvas) {
        const generator = d3.line()
            .x(d => xScale(d3.timeParse(ts.settings.x.format)(d[ts.settings.x.field])))
            .y(d => yScale(d[ts.settings.y.field]))
            .curve(d3.curveLinear);
        const path = canvas
            .append('path')
            .datum(ts.data)
            .attr('d', generator)
            .attr('stroke', 'green')
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', 3)
            .attr('fill', 'none')
            .attr('clip-path', 'url(#ts-clip-path--chart)');

        return {
            generator,
            path,
        };
    }

    function drawer$2(ts, xScale, yScale, canvas) {
        const generator = d3.line()
            .x(d => xScale(d3.timeParse(ts.settings.x.format)(d[ts.settings.x.field])))
            .y(d => yScale(d[ts.settings.y.field]))
            .curve(d3.curveLinear);
        const path = canvas
            .append('path')
            .datum(ts.data)
            .attr('d', generator)
            .attr('stroke', 'green')
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', 3)
            .attr('fill', 'none')
            .attr('clip-path', 'url(#ts-clip-path--drawer)');

        return {
            generator,
            path,
        };
    }

    function drawLine(ts) {
        const chart = chart$4(ts, ts.x.chart.scale, ts.y.chart.scale, ts.containers.chart.canvas);
        const drawer = drawer$2(ts, ts.x.drawer.scale, ts.y.drawer.scale, ts.containers.drawer.canvas);

        return {
            chart,
            drawer,
        };
    }

    function zoom(ts) {
        const transition = ts.containers.chart.canvas.transition().duration(750);
        ts.x.chart.axis.transition(transition).call(ts.x.chart.generator);
        ts.x.chart.gridLines.transition(transition).call(ts.x.chart.gridLinesGenerator);
        ts.y.chart.axis.transition(transition).call(ts.y.chart.generator);
        ts.y.chart.gridLines.transition(transition).call(ts.y.chart.gridLinesGenerator);
        ts.line.chart.path
            .transition(transition)
            .attr('d', ts.line.chart.generator);
    }

    function end(ts) {
        //The coordinates of the brush.
        const s = d3.event.selection;

        //Reset chart on double click.
        if (!s) {
            if (!ts.brush.chart.idleTimeout)
                return ts.brush.chart.idleTimeout = setTimeout(
                    () => {
                        ts.brush.chart.idleTimeout = null;
                    },
                    ts.brush.chart.idleDelay
                );
            ts.x.chart.scale.domain(ts.x.domain);
            ts.y.chart.scale.domain(ts.y.domain).nice();
        }
        //Update x- and y-domains with coordinates of brushed region.
        else {
            ts.x.chart.scale.domain([s[0][0], s[1][0]].map(ts.x.chart.scale.invert, ts.x.chart.scale)); // update x-domain
            ts.y.chart.scale.domain([s[1][1], s[0][1]].map(ts.y.chart.scale.invert, ts.y.chart.scale)); // update y-domain
            ts.containers.chart.brush.call(ts.brush.chart.generator.move, null); // reset brush
        }

        //Update chart.
        zoom(ts);
    }

    function chart$5(ts) {
        const generator = d3.brush();

        generator
            .on('end', function() {
                end(ts);
            });

        ts.containers.chart.brush.call(generator);

        return {
            generator,
            idleTimeout: null,
            idleDelay: 350,
            container: ts.containers.chart.brush,
        };
    }

    //import zoom from './zoom';

    function end$1(ts) {
        //The coordinates of the brush.
        const s = d3.event.selection;

        if (s === null) ; else {
            ts.x.drawer.scale.domain([s[0][0], s[1][0]].map(ts.x.drawer.scale.invert, ts.x.drawer.scale)); // update x-domain
            ts.x.chart.scale.domain([s[0][0], s[1][0]].map(ts.x.chart.scale.invert, ts.x.chart.scale)); // update x-domain
            zoom(ts);
        }
        //ts.containers.chart.brush.call(ts.brush.chart.generator.move, null); // reset brush

        //Update chart.
    }

    function drawer$3(ts) {
        const generator = d3.brushX();

        generator
            .extent([[0,0],[ts.containers.drawer.dimensions.width,ts.containers.drawer.dimensions.height]])
            .on('end', function() {
                end$1(ts);
            });

        ts.containers.drawer.brush.call(generator);
        //ts.containers.drawer.brush.call(generator.move, ts.x.domain.map(ts.x.drawer.scale));

        return {
            generator,
            idleTimeout: null,
            idleDelay: 350,
            container: ts.containers.drawer.brush,
        };
    }

    function addBrush(ts) {
        const chart = chart$5(ts);
        const drawer = drawer$3(ts);

        return {
            chart: chart$5(ts),
            drawer
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
        ts.brush = addBrush(ts);

        return ts;
    }

    return timeSeries;

}));
