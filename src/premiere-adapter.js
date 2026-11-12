export class PremiereAdapter {
  async getSelectedVideoClip() {
    // Replace with the Premiere Pro 26 UXP DOM integration.
    return { id: "demo-clip", duration: 0 };
  }

  async selectFaceRectangle() {
    throw new Error("Frame selection is not connected yet.");
  }

  async trackFace() {
    throw new Error("Face tracking is not connected yet.");
  }

  async applyTransforms() {
    throw new Error("Transform keyframes are not connected yet.");
  }
}
