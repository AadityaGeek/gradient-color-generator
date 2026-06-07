const gradientBox = document.querySelector(".gradient-box");
const selectMenu = document.querySelector(".select-box select");
const colorInputs = document.querySelectorAll(".colors input");
const textarea = document.querySelector("textarea");
const refreshBtn = document.querySelector(".refresh");
const copyBtn = document.querySelector(".copy");

const getRandomColor = () => {
  // Generate a 6-digit hexadecimal color (pad with leading zeros if needed)
  const randomHex = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");
  return `#${randomHex}`;
};

const generateGradient = (isRandom = false) => {
  if (isRandom) {
    colorInputs[0].value = getRandomColor();
    colorInputs[1].value = getRandomColor();
  }
  const gradient = `linear-gradient(${selectMenu.value}, ${colorInputs[0].value}, ${colorInputs[1].value})`;
  gradientBox.style.background = gradient;
  textarea.value = `background: ${gradient};`;
};

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(textarea.value);
    copyBtn.innerText = "Code Copied";
    setTimeout(() => (copyBtn.innerText = "Copy Code"), 1600);
  } catch (err) {
    console.error("Failed to copy code:", err);
  }
};

colorInputs.forEach((input) =>
  input.addEventListener("input", () => generateGradient(false)),
);
selectMenu.addEventListener("change", () => generateGradient(false));
refreshBtn.addEventListener("click", () => generateGradient(true));
copyBtn.addEventListener("click", copyCode);

// initialize year and gradient preview
document.getElementById("currentYear").textContent = new Date().getFullYear();
generateGradient(false);
