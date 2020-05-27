
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
export function getPathCoords ({
  target: targetId,
  type,
  coordinates: {
    x: endX,
    y: endY
  } = {},
  tension = 0.15
}, {
  x: startX,
  y: startY
}) {
  const y1 = type !== 'upsell' ? startY : startY + 20;
  const delta = (endX - startX) * tension;
  const hx1 = startX + delta;
  const hy1 = y1;
  const hx2 = endX - delta;
  const hy2 = endY;

  const pathEndX = startX < endX ? (endX - cardShape.marginLeft) : (endX + cardShape.width + cardShape.marginRight);
  const pathEndY = endY + cardShape.width / 2;

  const curveTension = startX < endX ? `${hx1} ${hy1} ${hx2} ${hy2}` : `${hx2} ${hy1} ${hx1} ${hy2}`;
  const path = `M ${startX} ${y1} C ${curveTension} ${pathEndX} ${pathEndY}`;

  return { path, id: targetId };
}

