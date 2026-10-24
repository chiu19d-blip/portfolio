/* =====================================================================
   SITE CONFIG — edit everything here. Save, then refresh the page.
   (Layout, animations and styling are untouched by these values.)
   Leave a value as '' to keep the default already written in index.html.
   ===================================================================== */
window.SITE_CONFIG = {

  /* ---------- NAME & LOGO ---------- */
  firstName:  'Kanika',               // hero name, line 1
  lastName:   'Sonawane',             // hero name, line 2 (the italic line)
  studioName: 'Kanika Sonawane Studio', // top-left brand text + footer
  role:       'Independent Graphic Designer',

  logo: {
    text:  'KS',                      // monogram shown in the square logo
    image: ''                         // e.g. 'assets/images/logo.png'. If set, it replaces the text.
                                      // Same 38x38 box, same position; square image works best.
  },

 /* ---------- IMAGES (just swap the path, or overwrite the file) ---------- */
  heroImage:     'assets/images/hero.jpg',      // hero background (overlay, parallax, drift stay as is)
  portraitImage: 'assets/images/portrait.jpg',  // About-section photo (4:5 ratio looks best)
  heroPosition:  'center 30%',                  // which part of the hero photo stays in view on desktop (e.g. 'center top', 'center 40%')

  /* ---------- HERO ---------- */
  heroLine: ['Graphic Design','Branding','Photography','Video Editing','Motion Graphics','3D Design'],
  heroButton: 'View selected work →',
  stickerHero: ['open for','freelance','✦'],    // round sticker lines
  stickerAbout: 'hello ♡',

  /* ---------- MARQUEE STRIPS ---------- */
  marqueeWords:  ['graphic design','branding','motion','3d','photography'],
  marqueePhrase: 'let’s make something good',

  /* ---------- ABOUT ---------- */
  about: {
    heading:        'hi, i’m kanika',
    intro:          'I’m Kanika, an independent graphic designer who turns ideas into identities, images and moving pieces. I work with brands and creators who want a clear, memorable look.',
    philosophyLabel:'Philosophy.',
    philosophy:     'Good design is restrained and intentional. I start with the story, strip away what doesn’t serve it, and let contrast, typography and colour do the work.',
    skillsHeading:  'Skills',
    skills: [
      'Graphic Design',
      'Poster Design',
      'Logo Design',
      'Thumbnail Design',
      'Creative Design',
      'Photo Editing',
      'Video Editing',
      'VFX — Currently Learning',
      '3D Modelling — Currently Learning'
    ],
    softwareHeading: 'Software',
    software: ['Photoshop','Illustrator','After Effects','Premiere Pro','Blender'],
    experienceHeading: 'Experience',
    experience: 'Add your years of experience here.'
  },

  /* ---------- SECTION TITLES ---------- */
  workHeading: 'selected work ✦',
  workNote:    'Sample layouts. Replace with real projects in script.js.',
  filmsHeading:'motion & films',

  /* ---------- CONTACT ---------- */
  contact: {
    heading: 'say hi ♡',
    intro:   'Have a project in mind? Let’s talk.',
    instagramLabel: '@kanikasonavne',
    whatsappLabel:  'WhatsApp +00 000 000 0000'
  },

  /* ---------- FOOTER ---------- */
  footer: {
    ctaHeading: 'Have a creative project in mind?',
    ctaText:    'Let’s collaborate and turn your ideas into meaningful visual experiences.',
    ctaButton:  'Let’s connect →',
    description:'Independent graphic designer creating identities, images and moving pieces for brands and creators.',
    tagline:    'Creating meaningful visuals with creativity and purpose.',
    services:   ['Graphic Design','Branding & Visual Identity','Photography','Video Editing','Motion Graphics','3D Design'],
    invite:     'Interested in working together? Reach out to discuss a creative project or collaboration.',
    note:       'Designed with creativity.'
  },

  /* ---------- SOCIAL LINKS ----------
     Each one updates the hero icon, the footer link and the contact list.
     Paste your real profile URLs here when you have them. */
  social: {
    instagram: 'https://instagram.com/kanikasonavne',
    behance:   'https://behance.net/',
    youtube:   'https://youtube.com/',
    pinterest: 'https://pinterest.com/',     // placeholder — paste your Pinterest profile URL
    whatsapp:  'https://wa.me/0000000000',   // format: https://wa.me/<country code + number>
    email:     'mailto:hello@kanikasonavne.com'
  }
};
