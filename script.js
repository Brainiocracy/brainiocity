"use strict";

const byId = (id) => document.getElementById(id);

// Set this to the public site address before a custom-domain launch.
const publicSiteUrl = "https://brainiocracy.github.io/brainiocity/";
const certificateReferralLink = byId("certificate-referral-url");
certificateReferralLink.href = publicSiteUrl;
certificateReferralLink.textContent = publicSiteUrl;

const menuButton = byId("menu-button");
const mainNav = byId("main-nav");

function setMenuOpen(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  mainNav.classList.toggle("is-open", open);
}

menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});
mainNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});
document.querySelector(".header-action").addEventListener("click", () => setMenuOpen(false));
document.querySelector(".site-header").addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuButton.focus();
  }
});

const brain = byId("brain");
const brainContext = brain.getContext("2d");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Lateral view of the cerebrum, with a separate cerebellum and brainstem.
const cortex = new Path2D("M55 163 C42 147 44 124 55 106 C51 87 68 64 91 57 C100 39 126 31 148 33 C168 17 198 15 220 23 C244 13 272 17 289 30 C313 25 340 36 350 55 C373 58 397 74 403 94 C423 107 431 130 423 150 C434 171 422 192 404 202 C390 212 370 215 348 208 C331 208 322 214 306 218 C291 225 271 228 255 221 C236 231 213 228 200 216 C178 224 155 218 141 206 C112 212 92 201 84 186 C70 187 58 178 55 163 Z");
const cerebellum = new Path2D("M299 206 C316 197 353 195 378 205 C393 213 388 235 374 246 C354 260 320 253 303 239 C292 231 288 220 299 206 Z");
const brainstem = new Path2D("M266 209 C285 205 307 217 310 233 C308 246 310 257 319 270 L304 277 C289 270 277 251 277 239 C274 229 268 223 261 218 Z");

const folds = [
  "M57 106 C70 93 83 95 98 100 C113 106 122 104 127 94 C136 76 117 72 120 55 C124 44 138 37 148 33",
  "M71 131 C89 121 104 125 115 136 C126 146 126 161 140 164 C151 166 163 161 169 152",
  "M55 163 C73 152 88 159 93 174 C98 187 117 191 131 185",
  "M92 57 C95 73 86 82 73 84",
  "M148 206 C145 193 149 181 162 176 C177 170 195 178 204 165 C211 154 206 145 193 136",
  "M144 128 C147 112 162 110 177 117 C191 122 202 113 198 103 C194 92 177 85 177 72 C178 58 194 52 208 55",
  "M156 37 C148 49 148 66 159 78 C171 90 164 98 157 100",
  "M219 24 C212 35 220 48 230 55 C245 66 247 77 241 88 C233 104 217 111 222 125",
  "M252 24 C246 40 260 47 274 46 C285 45 295 50 298 60",
  "M222 125 C217 139 222 151 239 153 C261 156 272 143 267 132 C260 116 263 103 278 96 C300 85 319 98 320 117",
  "M198 215 C200 200 213 188 229 189 C245 190 250 201 255 221",
  "M235 173 C256 181 275 169 292 169 C313 170 325 183 349 172 C369 164 384 172 388 188",
  "M286 63 C301 65 307 76 322 76 C336 76 347 68 350 55",
  "M321 118 C322 135 342 144 352 133 C361 125 360 114 370 108 C384 100 395 106 401 119",
  "M352 83 C359 92 374 92 387 87",
  "M396 147 C404 155 412 152 423 150",
  "M287 150 C303 146 313 149 318 156",
  "M270 201 C281 191 294 192 303 197",
  "M346 188 C341 195 342 204 348 208",
  "M299 221 C319 209 355 208 380 218",
  "M300 228 C319 216 356 218 380 226",
  "M305 234 C328 225 353 226 374 235",
  "M316 241 C333 235 354 235 370 241",
  "M328 247 C341 242 355 243 363 246"
].map((path) => new Path2D(path));

const nodes = [
  [78, 117], [103, 81], [127, 119], [120, 168], [156, 148],
  [161, 57], [175, 100], [192, 73], [207, 127], [191, 156],
  [187, 199], [222, 172], [224, 92], [250, 60], [248, 116],
  [245, 143], [269, 80], [288, 108], [294, 139], [268, 188],
  [301, 181], [331, 161], [338, 102], [315, 59], [359, 62],
  [376, 92], [393, 131], [373, 150], [402, 178], [354, 194],
  [321, 227], [346, 232], [368, 223]
];

const pathways = [
  [0, 1], [0, 2], [0, 3], [1, 2], [1, 5], [2, 4], [2, 6], [3, 4],
  [4, 6], [4, 9], [4, 10], [5, 7], [6, 7], [6, 8], [7, 12], [8, 9],
  [8, 12], [8, 15], [9, 10], [9, 11], [10, 11], [11, 15], [11, 19],
  [12, 13], [12, 14], [13, 16], [14, 15], [14, 16], [14, 17], [15, 18],
  [16, 17], [16, 23], [17, 18], [17, 22], [18, 20], [18, 21], [19, 20],
  [20, 21], [20, 30], [21, 22], [21, 27], [21, 29], [22, 23], [22, 25],
  [23, 24], [24, 25], [25, 26], [25, 27], [26, 27], [26, 28], [27, 28],
  [27, 29], [28, 29], [29, 32], [30, 31], [31, 32]
];

const stageDuration = 1050;
const stages = [
  { message: "Establishing neural synchronization…", nodes: [0, 1, 2, 3, 4] },
  { message: "Mapping existing cognitive pathways…", nodes: [5, 6, 7, 8, 12] },
  { message: "Optimizing restorative inactivity…", nodes: [9, 10, 11, 15, 19], relay: [21, 27, 29] },
  { message: "Detecting pre-existing intelligence…", nodes: [13, 14, 16, 17, 23] },
  { message: "Refining confidence architecture…", nodes: [18, 20, 21, 22, 24], relay: [0, 1, 2, 4] },
  { message: "Measuring enhanced potential…", nodes: [25, 26, 27, 28, 29] },
  { message: "Finalizing cognitive uplift…", nodes: [20, 29, 30, 31, 32] }
];

function softPulse(time, peak, width) {
  const distance = Math.min(1, Math.abs(time - peak) / width);
  return .5 + .5 * Math.cos(Math.PI * distance);
}

function brainActivity(stageIndex, elapsed) {
  const stage = stages[stageIndex];
  const finalStage = stageIndex === stages.length - 1;
  const time = elapsed - stageIndex * stageDuration;
  const brightness = nodes.map(([x], index) => {
    const regionalPulse = stage.nodes.includes(index) ? softPulse(time, 340 + index % 5 * 83, 340) : 0;
    const relayPulse = stage.relay?.includes(index) ? .65 * softPulse(time, 455 + index % 3 * 72, 260) : 0;
    const finale = finalStage ? .78 * softPulse(time, 260 + x * 1.04, 355) : 0;
    return Math.max(regionalPulse, relayPulse, finale);
  });

  const signals = [];
  pathways.forEach(([from, to], index) => {
    const regional = stage.nodes.includes(from) && stage.nodes.includes(to);
    const relay = stage.relay?.includes(from) && stage.relay.includes(to);
    const sweep = finalStage && index % 3 === 0;
    if (!regional && !relay && !sweep) return;

    const [startX, startY] = nodes[from];
    const [endX, endY] = nodes[to];
    const departure = sweep ? 95 + startX * .83 : (relay ? 340 : 95) + index % 6 * 49;
    const duration = 240 + Math.hypot(endX - startX, endY - startY) * 2;
    const travel = (time - departure) / duration;
    if (travel > 0 && travel < 1) {
      signals.push({
        start: nodes[from], end: nodes[to], travel,
        strength: (relay ? .64 : .88) * Math.min(1, travel * 7, (1 - travel) * 7)
      });
    }
    brightness[to] = Math.max(brightness[to], .9 * softPulse(time, departure + duration + 38, 142));
  });
  return { brightness, signals };
}

function drawNeuralLight(ctx, x, y, strength, size) {
  const halo = ctx.createRadialGradient(x, y, .35, x, y, size);
  halo.addColorStop(0, "#fffaff");
  halo.addColorStop(.29, "#d4c1f0");
  halo.addColorStop(.61, "#9a7cc67a");
  halo.addColorStop(1, "#9a7cc600");
  ctx.globalAlpha = strength;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = halo;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x, y, size * .21, 0, Math.PI * 2);
  ctx.fillStyle = "#fdf8ff";
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawBrain(stageIndex = -1, elapsed = 0, complete = false) {
  if (!brainContext) return;
  const ctx = brainContext;
  const activity = stageIndex >= 0 && !reducedMotion.matches ? brainActivity(stageIndex, elapsed) : null;
  ctx.setTransform(2, 0, 0, 2, 0, 0);
  ctx.clearRect(0, 0, 480, 300);
  ctx.translate(1, 7);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  for (const [path, fill] of [[brainstem, "#ddD5e9"], [cerebellum, "#e5deef"], [cortex, "#e9e2f1"]]) {
    ctx.fillStyle = fill;
    ctx.fill(path);
    ctx.strokeStyle = "#645789";
    ctx.lineWidth = 1.15;
    ctx.stroke(path);
  }
  ctx.strokeStyle = "#7f719e91";
  ctx.lineWidth = 1.05;
  folds.forEach((path) => ctx.stroke(path));

  if (activity) {
    const scanX = 52 + (elapsed % 4200) / 4200 * 373;
    const scan = ctx.createLinearGradient(scanX - 28, 0, scanX + 28, 0);
    scan.addColorStop(0, "#bcb0d900");
    scan.addColorStop(.5, "#bcb0d937");
    scan.addColorStop(1, "#bcb0d900");
    ctx.save();
    ctx.clip(cortex);
    ctx.fillStyle = scan;
    ctx.fillRect(scanX - 28, 15, 56, 235);
    ctx.restore();
  }

  for (const [start, end] of pathways) {
    const strength = Math.min(activity?.brightness[start] ?? 0, activity?.brightness[end] ?? 0);
    ctx.beginPath();
    ctx.moveTo(...nodes[start]);
    ctx.lineTo(...nodes[end]);
    ctx.strokeStyle = "#76659d36";
    ctx.lineWidth = .72;
    ctx.stroke();
    if (strength > .06) {
      ctx.globalAlpha = strength;
      ctx.strokeStyle = "#785db0";
      ctx.lineWidth = 1.1;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  nodes.forEach(([x, y], index) => {
    const strength = activity?.brightness[index] ?? 0;
    ctx.beginPath();
    ctx.arc(x, y, 1.85 + strength * 1.45, 0, Math.PI * 2);
    ctx.fillStyle = strength > .14 ? "#654c94" : complete ? "#8271a8" : "#9386b4";
    ctx.fill();
    if (strength > .04) drawNeuralLight(ctx, x, y, strength, 7 + strength * 7);
  });

  for (const { start: [x1, y1], end: [x2, y2], travel, strength } of activity?.signals ?? []) {
    const tail = Math.max(0, travel - .29);
    const x = x1 + (x2 - x1) * travel;
    const y = y1 + (y2 - y1) * travel;
    const tailX = x1 + (x2 - x1) * tail;
    const tailY = y1 + (y2 - y1) * tail;
    const trail = ctx.createLinearGradient(tailX, tailY, x, y);
    trail.addColorStop(0, "#9274ba00");
    trail.addColorStop(.7, "#a18bc9");
    trail.addColorStop(1, "#fcf5ff");
    ctx.beginPath();
    ctx.moveTo(tailX, tailY);
    ctx.lineTo(x, y);
    ctx.globalAlpha = strength;
    ctx.strokeStyle = trail;
    ctx.lineWidth = 1.55;
    ctx.stroke();
    drawNeuralLight(ctx, x, y, strength, 6.5);
  }
}

const simStart = byId("sim-start");
const simPrecision = byId("sim-precision");
const simProgress = byId("sim-progress");
const simReadout = byId("sim-readout");
const simResults = byId("sim-results");
const simMessage = byId("sim-message");
const simState = byId("sim-state");
const precisionPanel = byId("precision-panel");
let running = false;

function setPrecisionOpen(open) {
  precisionPanel.hidden = !open;
  simPrecision.setAttribute("aria-expanded", String(open));
}

function finishSimulation() {
  running = false;
  simReadout.hidden = true;
  simResults.hidden = false;
  simPrecision.hidden = false;
  simStart.removeAttribute("aria-disabled");
  simStart.textContent = "Repeat NAP Session";
  simState.textContent = "Complete";
  drawBrain(-1, 0, true);
  if (document.activeElement === simStart) byId("sim-result-heading").focus({ preventScroll: true });
}

simStart.addEventListener("click", () => {
  if (running) return;
  running = true;
  setPrecisionOpen(false);
  simPrecision.hidden = true;
  byId("sim-intro").hidden = true;
  simResults.hidden = true;
  simReadout.hidden = false;
  simProgress.value = 0;
  byId("progress-text").textContent = "0%";
  simMessage.textContent = "";
  simStart.setAttribute("aria-disabled", "true");
  simStart.textContent = "Session in Progress";
  simState.textContent = "Optimizing";

  const started = performance.now();
  let previousStage = -1;
  let previousMotionPreference;
  let previousPercent = -1;
  function advance(now) {
    const elapsed = Math.max(0, now - started);
    const stageIndex = Math.floor(elapsed / stageDuration);
    if (stageIndex >= stages.length) {
      finishSimulation();
      return;
    }
    const stageChanged = stageIndex !== previousStage;
    if (stageChanged) {
      simMessage.textContent = stages[stageIndex].message;
      previousStage = stageIndex;
    }
    const percent = Math.floor(elapsed / (stageDuration * stages.length) * 100);
    if (percent !== previousPercent) {
      simProgress.value = percent;
      byId("progress-text").textContent = percent + "%";
      previousPercent = percent;
    }
    const reduce = reducedMotion.matches;
    if (!reduce || previousMotionPreference !== reduce) drawBrain(stageIndex, elapsed);
    previousMotionPreference = reduce;
    requestAnimationFrame(advance);
  }
  requestAnimationFrame(advance);
});

simPrecision.addEventListener("click", () => setPrecisionOpen(precisionPanel.hidden));
drawBrain();

const assessmentQuestions = [
  { text: "Are you currently thinking?", options: ["Yes", "I was until you asked", "I prefer to observe"] },
  { text: "Have you ever experienced an idea?", options: ["At least once", "Several, possibly related", "I’m waiting for independent confirmation"] },
  { text: "Can you recognize a brain?", options: ["In most contexts", "With appropriate labeling", "I’d like a second opinion"] },
  { text: "Do you believe you are more intelligent than average?", options: ["Yes", "It depends on the average", "I’m modest about these things"] },
  { text: "Have you ever disagreed with an expert on the internet?", options: ["Yes, in writing", "Privately", "I’ve shown considerable restraint"] }
];

const assessmentIntro = byId("assessment-intro");
const assessmentForm = byId("assessment-form");
const certificateForm = byId("certificate-form");
const certificateView = byId("certificate-view");
const assessmentNextStep = byId("assessment-next-step");
const displayName = byId("display-name");
const questionText = byId("question-text");
const questionOptions = byId("question-options");
const questionBack = byId("question-back");
const questionNext = byId("question-next");
const certificateDownloadStatus = byId("certificate-download-status");
const answers = [];
let questionIndex = 0;

function showQuestion() {
  const question = assessmentQuestions[questionIndex];
  assessmentIntro.hidden = true;
  certificateForm.hidden = true;
  assessmentForm.hidden = false;
  byId("question-count").textContent = `Question ${questionIndex + 1} of ${assessmentQuestions.length}`;
  questionText.textContent = question.text;
  questionOptions.replaceChildren();
  question.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.className = "question-option";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = String(index);
    input.required = true;
    input.checked = answers[questionIndex] === input.value;
    label.append(input, document.createTextNode(option));
    questionOptions.append(label);
  });
  questionBack.hidden = questionIndex === 0;
  questionNext.textContent = questionIndex === assessmentQuestions.length - 1 ? "View Result" : "Continue";
  questionText.focus({ preventScroll: true });
}

function saveAnswer() {
  const answer = assessmentForm.querySelector("input:checked");
  if (answer) answers[questionIndex] = answer.value;
}

byId("assessment-start").addEventListener("click", showQuestion);

questionBack.addEventListener("click", () => {
  saveAnswer();
  questionIndex -= 1;
  showQuestion();
});

assessmentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveAnswer();
  if (questionIndex === assessmentQuestions.length - 1) {
    assessmentForm.hidden = true;
    certificateForm.hidden = false;
    assessmentNextStep.hidden = false;
    byId("qualification-title").focus({ preventScroll: true });
    return;
  }
  questionIndex += 1;
  showQuestion();
});

byId("assessment-restart").addEventListener("click", () => {
  answers.length = 0;
  questionIndex = 0;
  certificateForm.reset();
  assessmentNextStep.hidden = true;
  displayName.setCustomValidity("");
  showQuestion();
});

displayName.addEventListener("input", () => displayName.setCustomValidity(""));

certificateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = displayName.value.trim();
  if (!name) {
    displayName.setCustomValidity("Enter a name for your certificate.");
    displayName.reportValidity();
    return;
  }
  byId("certificate-name").textContent = name;
  certificateForm.hidden = true;
  certificateView.hidden = false;
  certificateDownloadStatus.hidden = true;
  byId("certificate-title").focus({ preventScroll: true });
});

byId("edit-name").addEventListener("click", () => {
  certificateView.hidden = true;
  certificateForm.hidden = false;
  displayName.focus();
});

byId("print-certificate").addEventListener("click", () => {
  document.body.classList.add("printing");
  try {
    window.print();
  } finally {
    document.body.classList.remove("printing");
  }
});

byId("download-certificate").addEventListener("click", async () => {
  const name = byId("certificate-name").textContent;
  try {
    await document.fonts.ready;
    const image = document.createElement("canvas");
    image.width = 1600;
    image.height = 1040;
    const ctx = image.getContext("2d");
    if (!ctx) throw new Error("Canvas export is unavailable.");

    ctx.fillStyle = "#f7f6fa";
    ctx.fillRect(0, 0, image.width, image.height);
    ctx.strokeStyle = "#9386bc";
    ctx.lineWidth = 3;
    ctx.strokeRect(54, 54, 1492, 932);
    ctx.lineWidth = 1.4;
    ctx.strokeRect(66, 66, 1468, 908);

    ctx.strokeStyle = "#554d86";
    ctx.lineWidth = 2.4;
    for (const rotation of [-.63, .94]) {
      ctx.beginPath();
      ctx.ellipse(800, 193, 38, 16, rotation, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.textAlign = "center";
    ctx.fillStyle = "#554d86";
    ctx.font = "600 26px Inter, sans-serif";
    ctx.fillText("THE BRAINIOCRACY™", 800, 278);
    ctx.fillStyle = "#252044";
    ctx.font = "400 94px Newsreader, Georgia, serif";
    ctx.fillText("Certified Cognitive Elite", 800, 420, 1300);
    ctx.font = "italic 400 100px Newsreader, Georgia, serif";
    ctx.direction = getComputedStyle(byId("certificate-name")).direction;
    ctx.fillText(name, 800, 578, 1300);
    ctx.direction = "ltr";

    ctx.fillStyle = "#615d70";
    ctx.font = "400 30px Inter, sans-serif";
    ctx.fillText("This individual has demonstrated extraordinary potential", 800, 700);
    ctx.fillText("for intellectual self-confidence.", 800, 747);
    ctx.font = "400 23px Inter, sans-serif";
    ctx.fillText("Novelty credential. No academic or professional standing.", 800, 895);
    ctx.fillStyle = "#554d86";
    ctx.font = "400 20px Inter, sans-serif";
    ctx.fillText(byId("certificate-referral-label").textContent, 800, 926, 1300);
    ctx.font = "500 23px Inter, sans-serif";
    ctx.fillText(publicSiteUrl, 800, 953, 1300);

    const blob = await new Promise((resolve) => image.toBlob(resolve, "image/png"));
    if (!blob) throw new Error("The certificate image could not be generated.");
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "brainiocity-certificate.png";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    certificateDownloadStatus.hidden = true;
  } catch {
    certificateDownloadStatus.hidden = false;
    certificateDownloadStatus.textContent = "This browser could not download the image. Use Print to save a PDF copy.";
  }
});

const plans = {
  basic: {
    title: "NAP Basic",
    copy: "Your Bronze distinction includes ordinary thinking and essential reassurance. Independent thought is available as standard.",
    detail: "Entry-level cognitive distinction. A formal acknowledgment that you have begun to think about thinking."
  },
  plus: {
    title: "NAP Plus",
    copy: "Your Silver distinction includes access to a digital credential. The credential is portable between conversations.",
    detail: "Enhanced intellectual recognition. Receive a credential you can include in correspondence that did not request one."
  },
  pro: {
    title: "NAP Pro",
    copy: "Your Gold distinction includes additional decimal places for the same estimated improvement. Precision is a matter of presentation.",
    detail: "Advanced cognitive prestige. Your conclusions may now be presented with the assurance typically reserved for preliminary findings."
  },
  executive: {
    title: "NAP Executive",
    copy: "Your Platinum distinction includes confidence without evidence, even in fields outside your experience.",
    detail: "Exceptional intellectual confidence. Benefit from institutional reassurance even when the evidence is taking its time."
  }
};

const noveltyDialog = byId("novelty-dialog");
const dialogAction = byId("dialog-action");

function openNovelty({ label, title, copy, detail = "", note, action, target }) {
  byId("dialog-label").textContent = label;
  byId("dialog-title").textContent = title;
  byId("dialog-copy").textContent = copy;
  byId("dialog-detail").textContent = detail;
  byId("dialog-detail").hidden = !detail;
  byId("dialog-note").textContent = note;
  dialogAction.textContent = action;
  dialogAction.href = target;
  noveltyDialog.showModal();
}

document.querySelectorAll(".plan-button").forEach((button) => {
  button.addEventListener("click", () => {
    openNovelty({
      label: "Plan Preview", ...plans[button.dataset.plan],
      note: "This plan and its price are fictional. No purchase or subscription is available.",
      action: "Take the Assessment", target: "#assessment"
    });
  });
});

byId("join-button").addEventListener("click", () => {
  openNovelty({
    label: "The Brainiocracy™",
    title: "Your membership is entirely in your head.",
    copy: "Consider yourself informally admitted. Your existing thoughts are eligible for immediate use.",
    note: "This is a novelty interaction. No account or subscription has been created.",
    action: "Get a Novelty Certificate", target: "#assessment"
  });
});

dialogAction.addEventListener("click", () => noveltyDialog.close());
