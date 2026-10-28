// "Streak card": draws a 1080x1350 image of your streak, with a rank and a
// meme line, that you can post to a story or send to the group chat. Drawn on
// a canvas in the browser, so nothing is uploaded anywhere.

const W = 1080;
const H = 1350;

const RANKS = [
  [0, 'Hello World Intern', 'just typed print("hi") and felt something'],
  [3, 'Stack Overflow Regular', 'copy, paste, pray, works?'],
  [7, 'Bug Exterminator', 'reads the error message first. rare.'],
  [14, 'Senior Dev Energy', 'says "it depends" and is right'],
  [30, 'Certified 10x Legend', 'the compiler fears them'],
];

export function rankFor(streak) {
  let pick = RANKS[0];
  for (const r of RANKS) if (streak >= r[0]) pick = r;
  return { title: pick[1], line: pick[2] };
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export async function drawStreakCard({ current, best, total }) {
  await document.fonts?.ready;
  const display = "'Space Grotesk Variable', 'Inter Variable', system-ui, sans-serif";
  const body = "'Inter Variable', system-ui, sans-serif";

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Background: deep purple with two glows.
  ctx.fillStyle = '#0b0a14';
  ctx.fillRect(0, 0, W, H);
  for (const [x, y, r, c] of [
    [W, 0, 900, 'rgba(157, 123, 255, 0.45)'],
    [0, H, 800, 'rgba(94, 227, 255, 0.25)'],
  ]) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, c);
    g.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  // Brand.
  ctx.save();
  ctx.translate(110, 130);
  ctx.rotate(-0.1);
  ctx.fillStyle = '#c4f542';
  roundRect(ctx, -40, -40, 80, 80, 18);
  ctx.fill();
  ctx.fillStyle = '#0b0a14';
  ctx.font = `800 34px ui-monospace, monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('>_', 0, 2);
  ctx.restore();
  ctx.fillStyle = '#f5f3ff';
  ctx.font = `700 44px ${display}`;
  ctx.textBaseline = 'middle';
  ctx.fillText('mycsmajor', 170, 132);

  // Big streak number.
  const grad = ctx.createLinearGradient(80, 0, W - 80, 0);
  grad.addColorStop(0, '#c4f542');
  grad.addColorStop(0.5, '#5ee3ff');
  grad.addColorStop(1, '#ff6ad5');
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = grad;
  ctx.font = `700 380px ${display}`;
  ctx.fillText(String(current), 70, 600);
  const numWidth = ctx.measureText(String(current)).width;
  ctx.font = `120px system-ui, 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif`;
  ctx.fillText(current > 0 ? '🔥' : '💀', 70 + numWidth + 20, 560);

  ctx.fillStyle = '#f5f3ff';
  ctx.font = `700 72px ${display}`;
  ctx.fillText('day streak', 80, 700);

  // Rank sticker.
  const rank = rankFor(current);
  ctx.save();
  ctx.translate(80, 790);
  ctx.rotate(-0.03);
  ctx.font = `700 46px ${display}`;
  const rw = ctx.measureText(rank.title).width + 60;
  ctx.fillStyle = '#ff6ad5';
  roundRect(ctx, 0, -50, rw, 84, 42);
  ctx.fill();
  ctx.fillStyle = '#1a0614';
  ctx.fillText(rank.title, 30, 8);
  ctx.restore();
  ctx.fillStyle = '#b4afc9';
  ctx.font = `500 40px ${body}`;
  ctx.fillText(rank.line, 80, 905);

  // Stats.
  const stats = [
    [String(best), 'best streak'],
    [String(total), 'problems solved'],
  ];
  stats.forEach(([value, label], i) => {
    const x = 80 + i * 470;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    roundRect(ctx, x, 990, 440, 170, 28);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#f5f3ff';
    ctx.font = `700 76px ${display}`;
    ctx.fillText(value, x + 36, 1085);
    ctx.fillStyle = '#b4afc9';
    ctx.font = `500 34px ${body}`;
    ctx.fillText(label, x + 36, 1135);
  });

  // Footer.
  ctx.fillStyle = '#c4f542';
  ctx.font = `700 40px ${display}`;
  ctx.fillText('mycsmajor.com', 80, 1265);
  ctx.fillStyle = '#b4afc9';
  ctx.font = `500 32px ${body}`;
  ctx.textAlign = 'right';
  ctx.fillText('one CS problem a day', W - 80, 1265);

  return canvas;
}

// Shares the card as an image where the browser supports it (most phones),
// otherwise downloads it.
export async function shareStreakCard(state) {
  const canvas = await drawStreakCard(state);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  const file = new File([blob], 'mycsmajor-streak.png', { type: 'image/png' });
  const text = `${state.current} day streak on mycsmajor 🔥 one CS problem a day: https://mycsmajor.com/daily/`;
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], text });
      return { canvas, shared: true };
    } catch {
      // Cancelled: fall through to the preview, which has a download link.
    }
  }
  return { canvas, shared: false };
}
