import { PremiereAdapter } from "./premiere-adapter.js";
import { smoothTransforms } from "./smoothing.js";
import { trackFace } from "./tracker.js";

const adapter = new PremiereAdapter();
const state = { clip: null, selection: null, samples: null };
const elements = {
  status: document.querySelector("#status"),
  selection: document.querySelector("#selection"),
  selectFace: document.querySelector("#select-face"),
  track: document.querySelector("#track"),
  apply: document.querySelector("#apply"),
  smoothing: document.querySelector("#smoothing"),
  smoothingValue: document.querySelector("#smoothing-value"),
  applyRotation: document.querySelector("#apply-rotation"),
};

function setStatus(message) {
  elements.status.textContent = message;
}

function setSelection(selection) {
  state.selection = selection;
  elements.selection.textContent = selection
    ? `Face: ${Math.round(selection.width * 100)}% x ${Math.round(selection.height * 100)}%`
    : "No face selected";
  elements.track.disabled = !selection;
}

async function initialize() {
  try {
    state.clip = await adapter.getSelectedVideoClip();
    elements.selectFace.disabled = false;
    setStatus("Select the face in the first frame.");
  } catch (error) {
    setStatus(error.message);
  }
}

elements.smoothing.addEventListener("input", () => {
  elements.smoothingValue.textContent = Number(elements.smoothing.value).toFixed(2);
});

elements.selectFace.addEventListener("click", async () => {
  try {
    setSelection(await adapter.selectFaceRectangle());
    setStatus("Face selected. Start tracking when ready.");
  } catch (error) {
    setStatus(error.message);
  }
});

elements.track.addEventListener("click", async () => {
  try {
    setStatus("Tracking...");
    state.samples = await trackFace(adapter, state.selection);
    elements.apply.disabled = false;
    setStatus(`${state.samples.length} tracking samples ready.`);
  } catch (error) {
    setStatus(error.message);
  }
});

elements.apply.addEventListener("click", async () => {
  try {
    const transforms = smoothTransforms(state.samples, Number(elements.smoothing.value));
    await adapter.applyTransforms(transforms, {
      applyRotation: elements.applyRotation.checked,
    });
    setStatus("Stabilization keyframes applied.");
  } catch (error) {
    setStatus(error.message);
  }
});

initialize();
