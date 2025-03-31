export function Texture(dark) {
  // Create a gradient texture using a canvas
  const canvasTexture = document.createElement("canvas");
  canvasTexture.width = 512; // Adjust size as needed
  canvasTexture.height = 512;

  const context = canvasTexture.getContext("2d");

  // Create a linear gradient (for example, from blue to green)
  const gradient = context.createRadialGradient(
    256,
    256,
    0,
    256,
    256,
    dark ? 500 : 0,
  );
  gradient.addColorStop(0, "white");
  gradient.addColorStop(1, "black");

  // Fill the canvas with the gradient
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvasTexture.width, canvasTexture.height);
  return canvasTexture;
}
