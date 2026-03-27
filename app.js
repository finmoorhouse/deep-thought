const chat = document.getElementById('chat');
const form = document.getElementById('input-form');
const input = document.getElementById('user-input');
const askBtn = document.getElementById('ask-btn');

const thinkingMessages = [
  "Enumerating possible worlds...",
  "Marginalising over anthropic shadow...",
  "Sampling from the posterior distribution over civilisational trajectories...",
  "Conditioning on the observation that we exist...",
  "Estimating counterfactual impact...",
  "Applying the astronomical waste argument...",
  "Computing expected value under moral uncertainty...",
  "Propagating credences through the causal graph...",
  "Checking for crucial considerations that reverse the sign...",
  "Accounting for model uncertainty over population ethics...",
  "Iterating value-of-information calculations...",
  "Evaluating under total, average, and critical-level views...",
  "Performing sensitivity analysis on the discount rate...",
  "Resolving decision-theoretic paradoxes...",
  "Aggregating expert forecasts via geometric mean of odds...",
  "Computing Shapley values for all moral patients...",
  "Checking for acausal trade implications...",
  "Debiasing anchoring effects on prior...",
  "Integrating over all plausible utility functions...",
  "Updating on the Great Filter hypothesis...",
  "Weighing cluelessness objections...",
  "Calibrating against superforecaster base rates...",
  "Verifying result is robust to choice of normative framework...",
  "Rechecking — the answer keeps coming out the same...",
];

const convergingMessages = [
  "Interesting — all branches seem to be converging on a very specific answer...",
  "Hm. Every pathway is pointing to the same result...",
  "The posterior is collapsing to a single point estimate...",
  "All utility functions appear to agree on this one...",
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

function addThinking() {
  const msg = document.createElement('div');
  msg.className = 'message assistant';
  msg.innerHTML = `
    <div class="message-label">Deep Thought</div>
    <div class="thinking-body">
      <div class="thinking-text"><span class="thinking-content"></span><span class="thinking-dots"></span></div>
    </div>
  `;
  chat.appendChild(msg);
  scrollToBottom();
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
    await sleep(800 + Math.random() * 1200);
  }

  // Converging moment
  contentSpan.textContent = pick(convergingMessages);
  scrollToBottom();
  await sleep(2000 + Math.random() * 1000);

  // Remove thinking bubble
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
