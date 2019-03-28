export default function getWidth(element) {
    return typeof element.node === 'function'
        ? element.node().offsetWidth
        : element.offsetWidth;
}
