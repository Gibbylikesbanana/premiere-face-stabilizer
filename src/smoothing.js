function lerp(previous, current, amount) {
  return previous + (current - previous) * amount;
}

export function smoothTransforms(transforms, smoothing) {
  if (!Number.isFinite(smoothing) || smoothing < 0 || smoothing > 1) {
    throw new RangeError("smoothing must be between 0 and 1");
  }
  if (transforms.length === 0) return [];

  const result = [{ ...transforms[0] }];
  for (let index = 1; index < transforms.length; index += 1) {
    const previous = result[index - 1];
    const current = transforms[index];
    result.push({
      time: current.time,
      x: lerp(previous.x, current.x, 1 - smoothing),
      y: lerp(previous.y, current.y, 1 - smoothing),
      scale: lerp(previous.scale, current.scale, 1 - smoothing),
      rotation: lerp(previous.rotation, current.rotation, 1 - smoothing),
    });
  }
  return result;
}
