function isInEdgeZone(x) {
  const edgeZone = window.innerWidth * 0.2;
  return x < edgeZone || x > window.innerWidth - edgeZone;
}