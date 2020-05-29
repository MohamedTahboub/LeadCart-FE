
const cardShape = {
  height: 180,
  width: 120,
  marginTop: 5,
  marginBottom: 5,
  marginLeft: 15,
  marginRight: 15
};

export function getStartCircleCoords ({ x, y }) {
  return {
    x: x + cardShape.width + cardShape.marginRight,
    y: y + cardShape.height / 2 + cardShape.marginTop
  };
}
export function getPathCoords (start = {}, end = {}, withoutShift, curved = true) {
  const tension = 0.3;

  const { x: startX, y: startY } = start;
  const { x: endX, y: endY } = end;

  if (withoutShift)
    return `M ${startX} ${startY} ${endX} ${endY}`;


  const pathEndX = startX < endX ? (endX - cardShape.marginLeft) : (endX + cardShape.width + cardShape.marginRight);
  const pathEndY = endY + (cardShape.height / 2 + cardShape.marginTop);

  if (curved) {
    const delta = (pathEndX - startX) * tension;
    const hx1 = startX + delta;
    const hy1 = startY;
    const hx2 = pathEndX - delta;
    const hy2 = pathEndY;
    const path = `M${startX},${startY} C${hx1},${hy1} ${hx2},${hy2} ${pathEndX},${pathEndY}`;

    return path;
  }

  const path = `M ${startX} ${startY} ${pathEndX} ${pathEndY}`;
  return path ;
}

