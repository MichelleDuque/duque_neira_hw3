export function lightbox() {
  const instructionCircle = document.querySelector(".instruction-circle");

  instructionCircle.addEventListener("click", toggleInstructionBox);

  function toggleInstructionBox() {
    const instructionBox = document.querySelector(".instruction-box");
    instructionBox.style.display =
      instructionBox.style.display === "block" ? "none" : "block";
  }
}
