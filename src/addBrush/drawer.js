import end from './drawer/end';

export default function drawer(ts) {
    const generator = d3.brushX();

    generator
        .extent([[0,0],[ts.containers.drawer.dimensions.width,ts.containers.drawer.dimensions.height]])
        .on('end', function() {
            end(ts);
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
