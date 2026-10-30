/* ================================================================
   CRAVELLE — SITE CONTENT
   ----------------------------------------------------------------
   Everything you'll want to edit lives in this file: business
   details, the menu, prices, gift boxes and FAQs. The layout in
   App.jsx reads from here, so you never need to touch it to
   change a price or add a cookie.

   Anything wrapped in [REPLACE …] is a placeholder that must be
   filled in before launch.
================================================================ */

const img = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const BUSINESS = {
  name: 'Cravelle',
  tagline: ['Beautifully Baked.', 'Happily Devoured.'],
  promise: 'Consistently delicious cookies, carefully presented and made to order.',
  story:
    'The best treats make ordinary moments feel a little more special. We create generously indulgent cookies with thoughtful flavour combinations, rich textures and a little surprise in every bite — from everyday cravings to meaningful gifts.',
  mission:
    'Create distinctive gourmet cookies that bring people together through indulgence, thoughtful gifting and memorable flavour.',

  // ---- Contact — replace before launch ----
  phone: '[REPLACE: +94 7X XXX XXXX]',
  phoneHref: '', // e.g. 'tel:+94771234567' — leave empty to hide call links
  email: '[REPLACE: hello@yourdomain.lk]',
  emailHref: '', // e.g. 'mailto:hello@cravelle.lk'
  instagram: '[REPLACE: @cravelle]',
  instagramHref: '', // e.g. 'https://instagram.com/cravelle'
  serviceArea: '[REPLACE: delivery area, e.g. Colombo 03–07]',
  bakeDays: '[REPLACE: e.g. Thursday – Saturday]',
  orderCutoff: '[REPLACE: e.g. 48 hours before delivery]',

  // WhatsApp ordering stays switched off until a real number is set.
  // Format: country code + number, digits only, e.g. '94771234567'
  whatsapp: '',
}

/* ---------------- Launch settings ---------------- */
export const SITE = {
  // Shows the "draft" ribbon and the launch-checklist note. Set to false at launch.
  showDraftNotes: true,
  // Keep false until you have real customer reviews (with permission).
  showReviews: false,
  currency: 'LKR',
}

/* ---------------- Menu ----------------
   status: 'available' | 'limited' | 'sold-out' | 'coming-soon'
   draftPrice: true shows a "Draft price" badge — set false once confirmed.
   allergens: confirm from your final recipes and supplier specs.
------------------------------------------ */
export const PRODUCTS = [
  {
    id: 'signature-chunk',
    name: 'The Signature Chunk',
    short: 'Chocolate chunks, balanced salt, rich buttery depth.',
    description:
      'Our house cookie. Thick, golden edges giving way to a soft centre loaded with chocolate chunks and finished with a pinch of salt.',
    weight: '110–120 g',
    price: 750,
    draftPrice: true,
    role: 'Permanent',
    allergens: ['Wheat (gluten)', 'Milk', 'Egg', 'Soy'],
    status: 'available',
    image: img('1600147566401-c2056eb69479'),
  },
  {
    id: 'midnight-double-chocolate',
    name: 'Midnight Double Chocolate',
    short: 'Cocoa dough with dark chocolate pieces.',
    description:
      'Deep cocoa dough folded with generous pieces of dark chocolate. For the people who think there is no such thing as too much chocolate.',
    weight: '110–120 g',
    price: 800,
    draftPrice: true,
    role: 'Permanent',
    allergens: ['Wheat (gluten)', 'Milk', 'Egg', 'Soy'],
    status: 'available',
    image: img('1618923850107-d1a234d7a73a'),
  },
  {
    id: 'velvet-pistachio',
    name: 'Velvet Pistachio',
    short: 'A soft cookie with a pistachio filling.',
    description:
      'A buttery cookie wrapped around a smooth pistachio filling. Break it open for the reveal.',
    weight: '120–130 g',
    price: 1050,
    draftPrice: true,
    role: 'Premium',
    allergens: ['Wheat (gluten)', 'Milk', 'Egg', 'Tree nuts (pistachio)', 'Soy'],
    status: 'limited',
    image: img('1634188023615-7e08901193b6'),
  },
  {
    id: 'golden-caramel',
    name: 'Golden Caramel',
    short: 'Soft-centred, with a caramel filling.',
    description:
      'Golden and gently chewy, with a soft caramel centre that melts as you bite in.',
    weight: '120–130 g',
    price: 850,
    draftPrice: true,
    role: 'Permanent',
    allergens: ['Wheat (gluten)', 'Milk', 'Egg'],
    status: 'available',
    image: img('1782852230919-3471990d385d'),
  },
  {
    id: 'biscuit-creme',
    name: 'Biscuit Crème',
    short: 'Caramelised biscuit flavour, through and through.',
    description:
      'Warm, spiced caramelised-biscuit flavour in a soft, generous cookie. Comfort in every bite.',
    weight: '120–130 g',
    price: 900,
    draftPrice: true,
    role: 'Permanent',
    allergens: ['Wheat (gluten)', 'Milk', 'Egg', 'Soy'],
    status: 'available',
    image: img('1557310717-d6bea9f36682'),
  },
  {
    id: 'velvet-centre',
    name: 'The Velvet Centre',
    short: 'Dark chocolate cookie, roasted-hazelnut filling.',
    description:
      'Dark chocolate dough with a roasted-hazelnut filling at its heart. Our most decadent bite.',
    weight: '120–130 g',
    price: 950,
    draftPrice: true,
    role: 'Signature',
    allergens: ['Wheat (gluten)', 'Milk', 'Egg', 'Tree nuts (hazelnut)', 'Soy'],
    status: 'coming-soon',
    image: img('1638194645412-1d0b4c53ffed'),
  },
]

export const STATUS_LABELS = {
  available: 'Available to pre-order',
  limited: 'Limited batch',
  'sold-out': 'Sold out this week',
  'coming-soon': 'Coming soon',
}

/* ---------------- Gift boxes ---------------- */
export const BOXES = [
  {
    id: 'tasting-2',
    name: 'The Tasting',
    count: 2,
    note: 'Two cookies of your choice — a small treat or a first try.',
    price: null, // [REPLACE] set once box pricing is confirmed
  },
  {
    id: 'assortment-4',
    name: 'The Assortment',
    count: 4,
    note: 'Four flavours, boxed to share (or not).',
    price: null,
  },
  {
    id: 'gift-6',
    name: 'The Gift Box',
    count: 6,
    note: 'Six cookies in our signature box, with a handwritten message card.',
    price: null,
  },
]

/* ---------------- How ordering works ---------------- */
export const STEPS = [
  {
    num: '01',
    title: 'Reserve your box',
    tagline: 'Pre-orders open each week.',
    text: 'Pick a box size and your flavours, choose a delivery date and send us your request. We confirm availability, total and payment details with you directly.',
    image: img('1588467850695-a898367ce465'),
    alt: 'Flour, eggs and butter laid out on a striped cloth',
  },
  {
    num: '02',
    title: 'Baked to order',
    tagline: 'Small batches, never stockpiled.',
    text: 'Every cookie is weighed, shaped and baked for your order in small batches — so what arrives is fresh, not from a shelf.',
    image: img('1506184341422-6cc152ae474b'),
    alt: 'Rows of portioned cookie dough ready for the oven',
  },
  {
    num: '03',
    title: 'Boxed & delivered',
    tagline: 'Wrapped with care.',
    text: 'Each cookie is individually wrapped and boxed. We deliver within our local area on confirmed dates — delivery fees are shown clearly before you pay.',
    image: img('1622467827417-bbe2237067a9'),
    alt: 'An assortment of cookies packed in a box',
  },
]

/* ---------------- FAQ ---------------- */
export const FAQS = [
  {
    q: 'How do I order?',
    a: 'Send a pre-order request using the form on this page. We reply to confirm availability, your total including delivery, and payment details. Your order is booked once payment is confirmed.',
  },
  {
    q: 'Where do you deliver?',
    a: `We currently deliver to ${BUSINESS.serviceArea} only. We don't offer islandwide delivery yet, as we're still testing how our cookies travel in the heat.`,
  },
  {
    q: 'How much notice do you need?',
    a: `We bake on ${BUSINESS.bakeDays}. Please order at least ${BUSINESS.orderCutoff}. Slots are limited each week.`,
  },
  {
    q: 'How should I store my cookies?',
    a: '[REPLACE: storage and best-before guidance — confirm through your own shelf-life testing before publishing.]',
  },
  {
    q: 'Do your cookies contain allergens?',
    a: 'Yes. Our cookies are made in a kitchen that handles wheat (gluten), milk, egg, soy and tree nuts, so cross-contact is possible with every product. Allergens are listed on each cookie. If you have a severe allergy, please talk to us before ordering.',
  },
  {
    q: 'Can I add a gift message?',
    a: 'Yes — add your message in the order request and we will handwrite it on a card inside the box.',
  },
  {
    q: 'Do you take corporate or event orders?',
    a: 'Not yet. We are keeping batches small while we perfect our process. Leave your details in the form and we will let you know when larger orders open.',
  },
]

/* ---------------- Launch checklist (shown while showDraftNotes is true) ---------------- */
export const LAUNCH_NOTES = [
  'Confirm food-premises registration, labelling and allergen requirements with the relevant Sri Lankan authorities (Ministry of Health / local PHI).',
  'Replace every [REPLACE …] placeholder: phone, email, WhatsApp, service area, bake days.',
  'Confirm prices and weights from real recipe costs, then set draftPrice: false.',
  'Swap stock photos for your own product photography.',
  'Check the Cravelle name for trademark, business-name, domain and social-handle conflicts.',
  'Review the privacy, terms, delivery and refund policies for your actual process.',
]
