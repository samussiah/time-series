import end from './chart/end';

export default function chart(ts) {
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
