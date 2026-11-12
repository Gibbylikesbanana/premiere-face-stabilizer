export function validateSelection(selection) {
  if (!selection || !Number.isFinite(selection.x) || !Number.isFinite(selection.y)) {
    throw new Error("Select a face rectangle before tracking.");
  }
  if (selection.width <= 0 || selection.height <= 0) {
    throw new Error("The face selection must have a positive size.");
  }
}

export async function trackFace(adapter, selection) {
  validateSelection(selection);
  const samples = await adapter.trackFace(selection);
  if (!Array.isArray(samples) || samples.length === 0) {
    throw new Error("The tracker returned no face positions.");
  }
  return samples;
}
