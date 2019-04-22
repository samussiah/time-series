export default function dimensions() {
    //margin
    this.dimensions.margin = this.settings.margin || {};
    this.dimensions.margin.top = this.dimensions.margin.top || 10;
    this.dimensions.margin.right = this.dimensions.margin.right || 10;
    this.dimensions.margin.bottom = this.dimensions.margin.bottom || 20;
    this.dimensions.margin.left = this.dimensions.margin.left || 50;

    //width
    this.dimensions.width = this.settings.width || this.container.node().parentElement.offsetWidth;
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
