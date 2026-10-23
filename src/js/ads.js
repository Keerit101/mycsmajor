// Ad slots for a later Google AdSense setup. Everything here is OFF by default.
//
// Every page that can show an ad has an empty placeholder like this, hidden with
// the `hidden` attribute and marked with an "AD SLOT" comment:
//
//   <aside class="ad-slot" data-ad-slot="home-below-problem" aria-label="Advertisement" hidden></aside>
//
// To turn ads on (see TODO.md for the full checklist, including the privacy
// policy and consent banner that must come first):
//   1. Set ADSENSE_CLIENT to your publisher ID, e.g. 'ca-pub-1234567890123456'.
//   2. Create one ad unit per placement in AdSense and put each unit's slot ID
//      in SLOT_IDS below. Placements without an ID stay hidden.
//   3. Add public/ads.txt with the line AdSense gives you.

const ADSENSE_CLIENT = ''; // TODO(ads): your AdSense publisher ID

const SLOT_IDS = {
  // TODO(ads): AdSense ad unit IDs per placement
  'home-below-problem': '',
  'problem-end': '',
  'problems-index': '',
  'book-chapter-end': '',
  'cyber-brief-middle': '',
};

export function initAds() {
  if (!ADSENSE_CLIENT) return;

  let shown = 0;
  for (const slot of document.querySelectorAll('[data-ad-slot]')) {
    const unit = SLOT_IDS[slot.dataset.adSlot];
    if (!unit) continue;
    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.dataset.adClient = ADSENSE_CLIENT;
    ins.dataset.adSlot = unit;
    ins.dataset.adFormat = 'auto';
    ins.dataset.fullWidthResponsive = 'true';
    slot.append(ins);
    slot.hidden = false;
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    shown++;
  }
  if (!shown) return;

  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  document.head.append(script);
}
