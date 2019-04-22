(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory())
        : typeof define === 'function' && define.amd
        ? define(factory)
        : ((global = global || self), (global.timeSeries = factory()));
})(this, function() {
    'use strict';

    function layout() {
        this.container = d3
            .select(this.element)
            .append('div')
            .classed('time-series', true);
        this.chart.container = this.container
            .append('div')
            .classed('ts-component ts-component--chart', true);
        this.drawer.container = this.container
            .append('div')
            .classed('ts-component ts-component--drawer', true);
    }

    function dimensions() {
        //margin
        this.dimensions.margin = this.settings.margin || {};
        this.dimensions.margin.top = this.dimensions.margin.top || 10;
        this.dimensions.margin.right = this.dimensions.margin.right || 10;
        this.dimensions.margin.bottom = this.dimensions.margin.bottom || 20;
        this.dimensions.margin.left = this.dimensions.margin.left || 50;

        //width
        this.dimensions.width =
            this.settings.width || this.container.node().parentElement.offsetWidth;
        this.dimensions.widthLessMargin =
            this.dimensions.width - this.dimensions.margin.left - this.dimensions.margin.right;

        //height
        this.dimensions.height = this.settings.height
            ? this.settings.height
            : this.settings.aspect
            ? this.dimensions.width / this.settings.aspect
            : this.dimensions.width / (32 / 9);
        this.dimensions.heightLessMargin =
            this.dimensions.height - this.dimensions.margin.top - this.dimensions.margin.bottom;
        this.dimensions.drawerHeight = this.settings.drawerHeight
            ? this.settings.drawerHeight
            : this.settings.drawerAspect
            ? this.dimensions.width / this.settings.drawerAspect
            : this.dimensions.height / 4;
    }

    function x() {
        this.x.domain = d3.extent(this.data, d =>
            d3.timeParse(this.settings.x.format)(d[this.settings.x.field])
        );
    }

    function y() {
        this.y.domain = d3.extent(this.data, d => +d[this.settings.y.field]);
    }

    function layout$1() {
        //svg
        this.chart.svg = this.chart.container
            .append('svg')
            .classed('ts-svg', true)
            .attr('width', this.dimensions.width)
            .attr('height', this.dimensions.height);

        //clipPath
        this.chart.clipPath = this.chart.svg.append('clipPath').attr('id', 'ts-clip-path--chart');
        this.chart.clipPathRect = this.chart.clipPath
            .append('rect')
            .attr('width', this.dimensions.widthLessMargin)
            .attr('height', this.dimensions.heightLessMargin);
        //.attr('transform', `translate(${this.dimensions.margin.left},${this.dimensions.margin.top})`);

        //canvas
        this.chart.canvas = this.chart.svg
            .append('g')
            .classed('ts-chart', true)
            .attr(
                'transform',
                `translate(${this.dimensions.margin.left},${this.dimensions.margin.top})`
            );

        //brush
        this.chart.brush = this.chart.svg
            .append('g')
            .classed('ts-brush', true)
            .attr(
                'transform',
                `translate(${this.dimensions.margin.left},${this.dimensions.margin.top})`
            );
    }

    function x$1() {
        //scale
        this.chart.x.scale = d3
            .scaleTime()
            .range([0, this.dimensions.widthLessMargin])
            .domain(this.x.domain);

        //axis
        this.chart.x.generator = d3.axisBottom().scale(this.chart.x.scale);
        this.chart.x.axis = this.chart.canvas
            .append('g')
            .classed('axis axis--x', true)
            .attr('transform', `translate(0,${this.dimensions.heightLessMargin})`)
            .call(this.chart.x.generator);

        //grid lines
        this.chart.x.gridLinesGenerator = d3
            .axisBottom()
            .scale(this.chart.x.scale)
            .tickSize(-this.dimensions.heightLessMargin)
            .tickFormat('');
        this.chart.x.gridLines = this.chart.canvas
            .append('g')
            .classed('grid-lines grid-lines--x', true)
            .attr('transform', `translate(0,${this.dimensions.heightLessMargin})`)
            .call(this.chart.x.gridLinesGenerator);

        //label
        this.chart.x.label = this.chart.x.axis
            .append('text')
            .classed('label label--x', true)
            .attr('x', this.dimensions.widthLessMargin / 2)
            .attr('y', this.dimensions.margin.bottom)
            .style('text-anchor', 'middle')
            .style('fill', 'black');
        //.text(labelText || 'Date');
    }

    function y$1() {
        //scale
        this.chart.y.scale = d3
            .scaleLinear()
            .range([this.dimensions.heightLessMargin, 0])
            .domain(this.y.domain)
            .nice();

        //axis
        this.chart.y.generator = d3.axisLeft().scale(this.chart.y.scale);
        this.chart.y.axis = this.chart.canvas
            .append('g')
            .classed('axis axis--y', true)
            .call(this.chart.y.generator);

        //grid lines
        this.chart.y.gridLinesGenerator = d3
            .axisLeft()
            .scale(this.chart.y.scale)
            .tickSize(-this.dimensions.widthLessMargin)
            .tickFormat('');
        this.chart.y.gridLines = this.chart.canvas
            .append('g')
            .classed('grid-lines grid-lines--y', true)
            .call(this.chart.y.gridLinesGenerator);

        //label
        this.chart.y.label = this.chart.y.axis
            .append('text')
            .classed('label label--x', true)
            .attr('transform', 'rotate(-90)')
            .attr('x', -(this.dimensions.heightLessMargin / 2))
            .attr('y', -this.dimensions.margin.left + 16)
            .style('text-anchor', 'middle')
            .style('fill', 'black');
        //.text(labelText || 'Result');
    }

    function line() {
        this.chart.lineGenerator = d3
            .line()
            .x(d =>
                this.chart.x.scale(d3.timeParse(this.settings.x.format)(d[this.settings.x.field]))
            )
            .y(d => this.chart.y.scale(d[this.settings.y.field]))
            .curve(d3.curveLinear);
        this.chart.linePath = this.chart.canvas
            .append('path')
            .datum(this.data)
            .attr('d', this.chart.lineGenerator)
            .attr('stroke', 'green')
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', 3)
            .attr('fill', 'none')
            .attr('clip-path', 'url(#ts-clip-path--chart)');
    }

    function updateChart() {
        const extent = d3.event.selection;

        //Reset chart domain.
        //this.chart.x.scale.domain(this.x.domain);

        if (!extent);
        else {
            //Update x-scale with horizontal extent of brush.
            const xCoordinates = [extent[0][0], extent[1][0]];
            const xDomain = xCoordinates.map(this.chart.x.scale.invert);
            this.chart.x.scale.domain(xDomain);

            //Update y-scale with vertical extent of brush.
            const yCoordinates = [extent[1][1], extent[0][1]];
            const yDomain = yCoordinates.map(this.chart.y.scale.invert);
            this.chart.y.scale.domain(yDomain);

            //Clear chart brush.
            this.chart.brush.call(this.chart.brushGenerator.move, null);

            //Update drawer brush.
            const drawerExtent = xDomain.map(this.drawer.x.scale);
            this.drawer.brush.call(this.drawer.brushGenerator.move, drawerExtent);
        }

        //Define a transition on the chart canvas.
        const transition = this.chart.canvas.transition().duration(750);

        //Update the x-axis, x-gridlines, and line.
        this.chart.x.axis.transition(transition).call(this.chart.x.generator);
        this.chart.x.gridLines.transition(transition).call(this.chart.x.gridLinesGenerator);
        this.chart.y.axis.transition(transition).call(this.chart.y.generator);
        this.chart.y.gridLines.transition(transition).call(this.chart.y.gridLinesGenerator);
        this.chart.linePath.transition(transition).attr('d', this.chart.lineGenerator);
    }

    function brush() {
        this.chart.brushGenerator = d3
            .brush()
            .extent([[0, 0], [this.dimensions.widthLessMargin, this.dimensions.height]])
            .on('end', () => {
                //Redraw chart.
                updateChart.call(this);
            });
        this.chart.brush
            .on('dblclick', () => {
                //Reset x- and y-domains of chart.
                this.chart.x.scale.domain(this.x.domain);
                this.chart.y.scale.domain(this.y.domain);

                //Redraw chart.
                updateChart.call(this);

                //Update drawer brush.
                this.drawer.brush.call(this.drawer.brushGenerator.move, [
                    0,
                    this.dimensions.widthLessMargin
                ]);
            })
            .call(this.chart.brushGenerator);
    }

    function chart() {
        layout$1.call(this);
        x$1.call(this);
        y$1.call(this);
        line.call(this);
        brush.call(this);
    }

    function layout$2() {
        //svg
        this.drawer.svg = this.drawer.container
            .append('svg')
            .classed('ts-svg', true)
            .attr('width', this.dimensions.width)
            .attr('height', this.dimensions.drawerHeight);

        //clipPath
        this.drawer.clipPath = this.drawer.svg
            .append('clipPath')
            .attr('id', 'ts-clip-path--drawer');
        this.drawer.clipPathRect = this.drawer.clipPath
            .append('rect')
            .attr('width', this.dimensions.widthLessMargin)
            .attr('height', this.dimensions.drawerHeight);
        //.attr('transform', `translate(${this.dimensions.margin.left},0)`);//${this.dimensions.margin.top})`);

        //canvas
        this.drawer.canvas = this.drawer.svg
            .append('g')
            .classed('ts-drawer', true)
            .attr('transform', `translate(${this.dimensions.margin.left},0)`); //${this.dimensions.margin.top})`);

        //brush
        this.drawer.brush = this.drawer.svg
            .append('g')
            .classed('ts-brush', true)
            .attr('transform', `translate(${this.dimensions.margin.left},0)`); //${this.dimensions.margin.top})`);
    }

    function x$2() {
        //scale
        this.drawer.x.scale = d3
            .scaleTime()
            .range([0, this.dimensions.widthLessMargin])
            .domain(this.x.domain);

        //generators
        this.drawer.x.generator = d3.axisBottom().scale(this.drawer.x.scale);
        this.drawer.x.gridLinesGenerator = d3
            .axisBottom()
            .scale(this.drawer.x.scale)
            .tickSize(-this.dimensions.drawerHeight)
            .tickFormat('');

        //grid lines
        this.drawer.x.gridLines = this.drawer.canvas
            .append('g')
            .classed('grid-lines grid-lines--x', true)
            .attr('transform', `translate(0,${this.dimensions.drawerHeight})`)
            .call(this.drawer.x.gridLinesGenerator);

        //axis
        //this.drawer.x.axis = this.drawer.canvas
        //    .append('g')
        //    .classed('axis axis--x', true)
        //    .attr('transform', `translate(0,${this.dimensions.drawerHeight})`)
        //    .call(this.drawer.x.generator);
    }

    function y$2() {
        //scale
        this.drawer.y.scale = d3
            .scaleLinear()
            .range([this.dimensions.drawerHeight, 0])
            .domain(this.y.domain)
            .nice();

        //generator
        this.drawer.y.generator = d3.axisLeft().scale(this.drawer.y.scale);

        //axis
        //this.drawer.y.axis = this.drawer.canvas
        //    .append('g')
        //    .classed('axis axis--y', true)
        //    .call(this.drawer.y.generator);
    }

    function line$1() {
        this.drawer.lineGenerator = d3
            .line()
            .x(d =>
                this.drawer.x.scale(d3.timeParse(this.settings.x.format)(d[this.settings.x.field]))
            )
            .y(d => this.drawer.y.scale(d[this.settings.y.field]))
            .curve(d3.curveLinear);
        this.drawer.linePath = this.drawer.canvas
            .append('path')
            .datum(this.data)
            .attr('d', this.drawer.lineGenerator)
            .attr('stroke', 'green')
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', 3)
            .attr('fill', 'none')
            .attr('clip-path', 'url(#ts-clip-path--drawer)');
    }

    function updateChart$1() {
        const extent = d3.event.selection;

        //Reset x- and y-domains of chart.
        this.chart.x.scale.domain(this.x.domain);
        this.chart.y.scale.domain(this.y.domain);

        if (!extent) {
            this.drawer.brush.call(this.drawer.brushGenerator.move, [
                0,
                this.dimensions.widthLessMargin
            ]);
        } else {
            //Set chart domain to extent of drawer brush.
            this.chart.x.scale.domain(extent.map(this.chart.x.scale.invert));
        }

        //Define a transition on the chart canvas.
        const transition = this.chart.canvas.transition().duration(750);

        //Update the x-axis, x-gridlines, and line.
        this.chart.x.axis.transition(transition).call(this.chart.x.generator);
        this.chart.x.gridLines.transition(transition).call(this.chart.x.gridLinesGenerator);
        this.chart.linePath.transition(transition).attr('d', this.chart.lineGenerator);
    }

    function brush$1() {
        this.drawer.brushGenerator = d3
            .brushX()
            .extent([[0, 0], [this.dimensions.widthLessMargin, this.dimensions.drawerHeight]])
            .on('brush', () => {
                const extent = d3.event.selection;
                this.drawer.brushHandles
                    .attr('display', null)
                    .attr('transform', (d, i) => 'translate(' + extent[i] + ',0)');
            })
            .on('end', () => {
                //Redraw chart.
                updateChart$1.call(this);
            });
        this.drawer.brush.call(this.drawer.brushGenerator);
        this.drawer.brushHandles = this.drawer.brush
            .selectAll('rect.handle--custom')
            .data([{ type: 'w' }, { type: 'e' }])
            .enter()
            .append('rect')
            .classed('handle--custom', true)
            .attr('fill', '#666')
            .attr('fill-opacity', 0.8)
            .attr('stroke', '#000')
            .attr('stroke-width', 1.5)
            .attr('cursor', 'ew-resize')
            .attr('x', (d, i) => (i ? 0 : -5))
            .attr('y', 0)
            .attr('width', '5px')
            .attr('height', this.dimensions.drawerHeight);
        this.drawer.brush.call(this.drawer.brushGenerator.move, [
            0,
            this.dimensions.widthLessMargin
        ]);
    }

    function drawer() {
        layout$2.call(this);
        x$2.call(this);
        y$2.call(this);
        line$1.call(this);
        brush$1.call(this);
    }

    function timeSeries(data, settings = {}, element = 'body') {
        const ts = {
            data,
            settings,
            element,
            dimensions: {},
            x: {},
            y: {},
            chart: {
                x: {},
                y: {}
            },
            drawer: {
                x: {},
                y: {}
            }
        };
        layout.call(ts);
        dimensions.call(ts);
        x.call(ts);
        y.call(ts);
        chart.call(ts);
        drawer.call(ts);

        return ts;
    }

    return timeSeries;
});
