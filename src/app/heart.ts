export class Heart {
  path: string;
  fill: string;
  transform: string;
  constructor(svgPath: string, fillColor: string, transformValue: string) {
    this.path = svgPath;
    this.fill = fillColor;
    this.transform = transformValue;
  }
}
