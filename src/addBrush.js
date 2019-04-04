import end from './addBrush/end';

export default function addBrush(ts) {
    const generator = d3.brush();

    generator
        .on('end', function() {
            end(ts);
        });

    ts.containers.brush.call(generator);

    return {
        generator,
        idleTimeout: null,
        idleDelay: 350,
        idled() {
            console.log(this);
            this.idleTimeout = null;
        },
        container: ts.containers.brush,
    };
}
