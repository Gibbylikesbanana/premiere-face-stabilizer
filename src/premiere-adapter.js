const ppro = typeof require === "function" ? require("premierepro") : null;

export class PremiereAdapter {
  async getSelectedVideoClip() {
    if (!ppro) {
      throw new Error("Premiere Pro is required to use this panel.");
    }

    const project = await ppro.Project.getActiveProject();
    if (!project) {
      throw new Error("Open a Premiere Pro project first.");
    }

    const sequence = await project.getActiveSequence();
    if (!sequence) {
      throw new Error("Open a sequence first.");
    }

    const selection = await sequence.getSelection();
    const items = await selection.getTrackItems();
    const clips = items.filter((item) => item instanceof ppro.VideoClipTrackItem);

    if (clips.length !== 1) {
      throw new Error("Select exactly one video clip in the active sequence.");
    }

    return { project, sequence, clip: clips[0] };
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
