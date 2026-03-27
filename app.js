const chat = document.getElementById('chat');
const form = document.getElementById('input-form');
const input = document.getElementById('user-input');
const askBtn = document.getElementById('ask-btn');

const thinkingMessages = [
  // AI governance & intelligence explosion
  "Modelling differential AI acceleration scenarios...",
  "Simulating the intelligence explosion under various bottleneck assumptions...",
  "Estimating time to full AI R&D automation...",
  "Checking for persistent path-dependence in AI development trajectories...",
  "Evaluating responsible scaling policy implications...",
  "Stress-testing against AI-enabled power grab scenarios...",
  "Checking whether singular loyalties change the sign of the answer...",
  "Sampling from the distribution over compute bottlenecks...",
  "Propagating credences through the international AGI governance graph...",

  // Existential risk & macrostrategy
  "Enumerating possible worlds...",
  "Conditioning on the observation that we exist...",
  "Marginalising over anthropic shadow...",
  "Computing expected value under moral uncertainty...",
  "Checking for crucial considerations that reverse the sign...",
  "Evaluating under total, average, and critical-level views...",
  "Updating on the Great Filter hypothesis...",
  "Estimating counterfactual impact on existential security...",
  "Weighing astronomical waste against near-term cluelessness...",

  // Better futures / flourishing
  "Searching for easy eutopias... none found, reverting to hard ones...",
  "Integrating over all plausible moral public goods...",
  "Checking whether digital minds deserve moral consideration here...",
  "Accounting for the sentience and rights of digital beings...",
  "Verifying the answer generalises to post-scarcity conditions...",

  // Epistemics & forecasting
  "Calibrating against superforecaster base rates...",
  "Aggregating expert forecasts via geometric mean of odds...",
  "Debiasing anchoring effects on prior...",
  "Running adversarial collaboration between aligned recommender systems...",
  "Consulting the collective epistemics module...",

  // General
  "Iterating value-of-information calculations...",
  "Performing sensitivity analysis on the discount rate...",
  "Verifying result is robust to choice of normative framework...",
  "Rechecking — the answer keeps coming out the same...",
];

const convergingMessages = [
  "Interesting — all branches seem to be converging on a very specific answer...",
  "Hm. Every pathway is pointing to the same result...",
  "The posterior is collapsing to a single point estimate...",
  "All utility functions appear to agree on this one...",
  "Across all normative frameworks, I keep getting the same number...",
  "The credence distribution is concentrating on a single value...",
  "Robust to every sensitivity check. The answer is clear...",
  "Even the adversarial red team agrees...",
  "I wasn't expecting this level of convergence...",
];

function scrollToBottom() {
  chat.scrollTop = chat.scrollHeight;
}

function addMessage(role, html) {
  const msg = document.createElement('div');
  msg.className = `message ${role}`;
  const label = role === 'user' ? 'You' : 'Deep Thought';
  msg.innerHTML = `
    <div class="message-label">${label}</div>
    <div class="message-body">${html}</div>
  `;
  chat.appendChild(msg);
  scrollToBottom();
  return msg;
}

const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

function addThinking() {
  const msg = document.createElement('div');
  msg.className = 'message assistant';
  msg.innerHTML = `
    <div class="message-label">Deep Thought</div>
    <div class="thinking-body">
      <div class="thinking-text"><span class="thinking-spinner"></span> <span class="thinking-content"></span></div>
    </div>
  `;
  chat.appendChild(msg);
  scrollToBottom();

  const spinnerEl = msg.querySelector('.thinking-spinner');
  let frame = 0;
  msg._spinnerInterval = setInterval(() => {
    spinnerEl.textContent = spinnerFrames[frame % spinnerFrames.length];
    frame++;
  }, 80);

  return msg;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function handleSubmit(question) {
  addMessage('user', `<p>${escapeHtml(question)}</p>`);

  input.value = '';
  input.style.height = 'auto';
  askBtn.disabled = true;
  input.disabled = true;

  const thinkingEl = addThinking();
  const contentSpan = thinkingEl.querySelector('.thinking-content');

  // Show 3-6 thinking messages over ~4-7 seconds
  const steps = pickN(thinkingMessages, 3 + Math.floor(Math.random() * 4));

  for (const msg of steps) {
    contentSpan.textContent = msg;
    scrollToBottom();
    await sleep(1400 + Math.random() * 1200);
  }

  // Converging moment
  contentSpan.textContent = pick(convergingMessages);
  scrollToBottom();
  await sleep(2000 + Math.random() * 1000);

  // Remove thinking bubble
  clearInterval(thinkingEl._spinnerInterval);
  thinkingEl.remove();

  // Show the answer
  addMessage('assistant', `<p>42</p>`);

  askBtn.disabled = false;
  input.disabled = false;
  input.focus();
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Auto-resize textarea
input.addEventListener('input', () => {
  input.style.height = 'auto';
  input.style.height = Math.min(input.scrollHeight, 120) + 'px';
});

// Submit on Enter (Shift+Enter for newline)
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    form.requestSubmit();
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const question = input.value.trim();
  if (!question || askBtn.disabled) return;
  handleSubmit(question);
});
