window.siteConfig = {
  theme: {
    colors: {
      background: "#F1F2EE",
      backgroundAlt: "#F1F1EC",
      surface: "#FFFFFF",
      surfaceStrong: "#F5F1E6",
      ink: "#3A3A36",
      inkSoft: "#6F6F68",
      accent: "#8C7B6B",
      accentDeep: "#6F5F50",
      accentSoft: "#E6E4DC",
      line: "#DCDAD2",
      shadow: "rgba(0, 0, 0, 0.08)"
    },
    fonts: {
      heading: "'Cormorant Garamond', serif",
      body: "'Manrope', sans-serif",
      accent: "'Allura', cursive"
    }
  },

  event: {
    invitationLabel: "Engagement Invitation",
    heroTitle: "Let's Get Engaged",
    heroTagline:
      "A soft little corner of the internet made for the people we love most.",
    coupleNames: "Mohamed & Gehad",
    dateTime: "2026-05-30T19:00:00+02:00",
    venueName: "بانوراما ٦ اكتوبر",
    venueAddress: "صلاح سالم – أمام مباني العبور – داخل نادي بانوراما ٦ أكتوب",
    venueDescription:
      "An open-air celebration tucked among olive trees, warm candlelight, and a long table waiting for every smile.",
    mapsUrl: "https://maps.app.goo.gl/dRmg2ooruYANjSwr5",
    footerLocation: "Cairo, Egypt"
  },

  copy: {
    loadingMessage: "You have received an invitation from",
    primaryCta: "Explore the Day",
    secondaryCta: "RSVP",
    introTitle: "Dear Guests",
    introBody:
      "Something beautiful is about to happen in our lives. We would be so happy to share this special day with the people who matter most to us. Please join us as we celebrate a new chapter, full of warmth, laughter, and memories we will keep forever.",
    dateEyebrow: "Save the Date",
    locationEyebrow: "Venue",
    locationTitle: "Location",
    locationButton: "Open in Google Maps",
    galleryEyebrow: "Memories",
    galleryTitle: "A Few Frames Before the Day",
    galleryBody:
      "Use these image slots for engagement photos, childhood photos, birthday pictures, or any meaningful moments that fit the occasion.",
    programEyebrow: "The Flow",
    programTitle: "Program",
    rsvpEyebrow: "Your Reply",
    rsvpTitle: "RSVP",
    rsvpBody:
      "We would love to know if you can celebrate with us. Open the form below and send your response in a few seconds.",
    rsvpButton: "Fill the Form",
    rsvpModalTitle: "We can't wait to see you",
    rsvpNameLabel: "Your name",
    rsvpQuestion: "Will you attend?",
    rsvpYes: "Yes, with joy",
    rsvpNo: "Sadly, no",
    rsvpNoteLabel: "A note for us (optional)",
    rsvpSubmit: "Send our love",
    messageEyebrow: "From Us",
    messageTitle: "A Message From Us",
    messageQuote: "We can't wait to celebrate this special day with you.",
    messageCaption: "",
    closingLead: "With love,"
  },

  visibility: {
    loadingScreen: {
      section: true,
      rings: true,
      eyebrow: true,
      names: true
    },
    hero: {
      section: true,
      ornaments: true,
      rings: true,
      eyebrow: true,
      title: true,
      divider: true,
      portraitGrid: true,
      portraitOne: {
        card: true,
        label: false,
        image: true
      },
      portraitTwo: {
        card: false,
        label: false,
        image: false
      },
      names: true,
      tagline: true,
      actions: true,
      primaryButton: true,
      secondaryButton: true
    },
    welcome: {
      section: true,
      title: true,
      rings: true,
      body: true
    },
    date: {
      section: true,
      sparks: true,
      eyebrow: true,
      title: true,
      subtitle: true,
      calendar: true,
      dateLine: true
    },
    location: {
      section: true,
      eyebrow: true,
      title: true,
      venueName: true,
      description: true,
      bouquet: true,
      card: true,
      cardImage: true,
      cardTitle: true,
      cardAddress: true,
      cardButton: true
    },
    gallery: {
      section: true,
      eyebrow: true,
      title: true,
      body: true,
      grid: true
    },
    program: {
      section: false,
      eyebrow: true,
      title: true,
      divider: true
    },
    rsvp: {
      section: true,
      eyebrow: true,
      title: true,
      body: true,
      deadline: true,
      button: true,
      modal: true,
      modalTitle: true,
      nameField: true,
      attendanceField: true,
      noteField: true,
      submitButton: true,
      status: true
    },
    message: {
      section: false,
      eyebrow: true,
      title: true,
      illustration: true,
      card: true,
      quote: true,
      player: true,
      caption: true
    },
    closing: {
      section: true,
      divider: true,
      rings: true,
      lead: true,
      names: true,
      meta: true
    }
  },

  media: {
    partnerOnePhoto: "assets/images/Hero.png",
    partnerTwoPhoto: "assets/images/portrait-two.svg",
    venuePhoto: "assets/images/Venue.jpg",
    memoryGallery: [
      {
        visible: true,
        image: true,
        caption: true,
        src: "assets/images/memory-one.jpg",
        alt: "Memory placeholder one",
        captionText: "The beginning"
      },
      {
        visible: true,
        image: true,
        caption: true,
        src: "assets/images/memory-two.jpg",
        alt: "Memory placeholder two",
        captionText: "A favorite memory"
      },
      {
        visible: true,
        image: true,
        caption: true,
        src: "assets/images/memory-three.jpg",
        alt: "Memory placeholder three",
        captionText: "A little glimpse of joy"
      }
    ],
    audioSrc: "assets/audio/alexzavesa-calm-elegant-logo-519008.mp3"
  },

  schedule: [
    {
      visible: true,
      iconVisible: true,
      timeVisible: true,
      titleVisible: true,
      descriptionVisible: true,
      time: "5:00 PM",
      title: "Guest Arrival",
      description: "A calm welcome, light conversation, and the first shared smiles.",
      icon: "camera"
    },
    {
      visible: true,
      iconVisible: true,
      timeVisible: true,
      titleVisible: true,
      descriptionVisible: true,
      time: "6:00 PM",
      title: "Ceremony",
      description: "The heart of the occasion, surrounded by everyone who matters.",
      icon: "vows"
    },
    {
      visible: true,
      iconVisible: true,
      timeVisible: true,
      titleVisible: true,
      descriptionVisible: true,
      time: "7:30 PM",
      title: "Dinner",
      description: "A warm table, beautiful details, and time to enjoy the evening.",
      icon: "toast"
    },
    {
      visible: true,
      iconVisible: true,
      timeVisible: true,
      titleVisible: true,
      descriptionVisible: true,
      time: "9:00 PM",
      title: "Celebration",
      description: "Music, laughter, photos, and a memory-filled ending to the night.",
      icon: "cake"
    }
  ],

  rsvp: {
    deadline: "2026-05-23",
    successMessage: "Thank you!",
    endpoint: "https://api.web3forms.com/submit",
    accessKey: "128956ca-abec-4be2-9bcd-eb1a295253e0",
    subject: "New RSVP Submission",
    fromName: "Wedding Invitation"
  }
};
