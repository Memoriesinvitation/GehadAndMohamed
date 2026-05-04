const config = window.siteConfig;

const root = document.documentElement;
const loadingScreen = document.getElementById("loading-screen");
const siteShell = document.getElementById("site-shell");
const modal = document.getElementById("rsvp-modal");
const rsvpForm = document.getElementById("rsvp-form");
const rsvpStatus = document.getElementById("rsvp-status");
const audioElement = document.getElementById("message-audio");
const audioToggle = document.getElementById("audio-toggle");
const audioProgress = document.getElementById("audio-progress");
const audioTime = document.getElementById("audio-time");

function getPathValue(source, path) {
  return path.split(".").reduce((value, segment) => value?.[segment], source);
}

function isVisible(path) {
  return getPathValue(config, path) !== false;
}

function setVisibility(node, visible) {
  if (!node) {
    return;
  }

  node.hidden = !visible;
  node.classList.toggle("is-hidden-by-config", !visible);

  const controls = node.matches("input, textarea, select, button")
    ? [node]
    : Array.from(node.querySelectorAll("input, textarea, select, button"));

  controls.forEach((control) => {
    if (!control.dataset.initialDisabled) {
      control.dataset.initialDisabled = control.disabled ? "true" : "false";
    }

    control.disabled = !visible || control.dataset.initialDisabled === "true";
  });
}

function splitCoupleNames(coupleNames) {
  const cleaned = coupleNames.replace(/\s+(and|&)\s+/i, " & ");
  const parts = cleaned.split(" & ").map((part) => part.trim()).filter(Boolean);
  const first = parts[0] || "";
  const second = parts[1] || "";

  return {
    partnerOneFullName: first,
    partnerTwoFullName: second,
    partnerOneFirstName: first.split(" ")[0] || first,
    partnerTwoFirstName: second.split(" ")[0] || second,
    shortNames: [first.split(" ")[0], second.split(" ")[0]].filter(Boolean).join(" & ")
  };
}

function formatDateParts(dateString) {
  const date = new Date(dateString);
  const month = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const weekdayLine = new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(date);

  return {
    month,
    yearLine: year,
    formattedDate: weekdayLine,
    dayNumber: date.getDate(),
    fullDate: date
  };
}

function formatDeadlineLine(deadlineString) {
  const deadline = new Date(deadlineString);
  const formatted = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(deadline);
  return `Please reply before ${formatted}.`;
}

function applyTheme(theme) {
  const { colors, fonts } = theme;

  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${kebabCase(key)}`, value);
  });

  Object.entries(fonts).forEach(([key, value]) => {
    root.style.setProperty(`--font-${kebabCase(key)}`, value);
  });
}

function kebabCase(input) {
  return input.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

function getBoundValue(path, derivedValues) {
  const source = {
    ...config,
    derived: derivedValues
  };

  return getPathValue(source, path) ?? "";
}

function bindText(derivedValues) {
  document.querySelectorAll("[data-bind]").forEach((node) => {
    const path = node.getAttribute("data-bind");
    node.textContent = getBoundValue(path, derivedValues);
  });
}

function applyMedia() {
  document.getElementById("partner-one-photo").src = config.media.partnerOnePhoto;
  document.getElementById("partner-two-photo").src = config.media.partnerTwoPhoto;
  document.getElementById("venue-photo").src = config.media.venuePhoto;
  document.getElementById("maps-link").href = config.event.mapsUrl || "#";

  const galleryGrid = document.getElementById("gallery-grid");
  galleryGrid.innerHTML = "";

  config.media.memoryGallery.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "gallery-card";
    card.setAttribute("data-visible", `media.memoryGallery.${index}.visible`);
    card.setAttribute("data-auto-hide-empty", "");
    card.innerHTML = `
      <img
        class="gallery-card__image"
        src="${item.src}"
        alt="${item.alt}"
        data-visible="media.memoryGallery.${index}.image"
      />
      <p
        class="gallery-card__caption"
        data-visible="media.memoryGallery.${index}.caption"
        data-hide-if-empty
      >${item.captionText || ""}</p>
    `;
    galleryGrid.appendChild(card);
  });
}

function renderCalendar(dateInfo) {
  const container = document.getElementById("calendar-strip");
  container.innerHTML = "";

  const baseDate = dateInfo.fullDate;
  const startDate = new Date(baseDate);
  startDate.setDate(baseDate.getDate() - 2);

  for (let i = 0; i < 5; i += 1) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const day = document.createElement("div");
    day.className = "calendar-strip__day";

    if (
      currentDate.getDate() === baseDate.getDate() &&
      currentDate.getMonth() === baseDate.getMonth()
    ) {
      day.classList.add("is-highlighted");
    }

    day.textContent = currentDate.getDate();
    container.appendChild(day);
  }
}

function iconMarkup(icon) {
  const icons = {
    camera:
      '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M11 16h8l3-4h8l3 4h4a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H11a4 4 0 0 1-4-4V20a4 4 0 0 1 4-4Zm13 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"/></svg>',
    vows:
      '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M16 10a6 6 0 0 1 6 6c0 5-6 7-6 11s6 6 8 11M32 10a6 6 0 0 0-6 6c0 5 6 7 6 11s-6 6-8 11"/></svg>',
    toast:
      '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 10v10c0 5 4 9 9 9v7h-4m16-26v10c0 5-4 9-9 9v7h4M12 38h24"/></svg>',
    cake:
      '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M16 20h16v8H16Zm-3 8h22v10H13Zm7-17c0-3 4-3 4 0v4m4-4c0-3 4-3 4 0v4"/></svg>'
  };

  return icons[icon] || icons.camera;
}

function renderProgram() {
  const container = document.getElementById("program-list");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  config.schedule.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "program-card";
    card.setAttribute("data-visible", `schedule.${index}.visible`);
    card.setAttribute("data-auto-hide-empty", "");
    card.innerHTML = `
      <div class="program-card__icon" data-visible="schedule.${index}.iconVisible">${iconMarkup(item.icon)}</div>
      <div>
        <p class="program-card__time" data-visible="schedule.${index}.timeVisible">${item.time}</p>
        <h3 class="program-card__title" data-visible="schedule.${index}.titleVisible">${item.title}</h3>
        <p class="program-card__description" data-visible="schedule.${index}.descriptionVisible" data-hide-if-empty>${item.description}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

function applyVisibilityRules() {
  document.querySelectorAll("[data-visible]").forEach((node) => {
    setVisibility(node, isVisible(node.dataset.visible));
  });

  document.querySelectorAll("[data-hide-if-empty]").forEach((node) => {
    if (!node.hidden && !node.textContent.trim()) {
      setVisibility(node, false);
    }
  });

  document.querySelectorAll("[data-auto-hide-empty]").forEach((node) => {
    if (node.hidden) {
      return;
    }

    const hasVisibleChildren = Array.from(node.children).some((child) => !child.hidden);

    if (!hasVisibleChildren) {
      setVisibility(node, false);
    }
  });

  syncCollectionLayout("portrait-grid", "portrait-card", "portrait-grid--single");
  syncCollectionLayout("gallery-grid", "gallery-card", "gallery-grid--single");
  syncCollectionLayout("program-list", "program-card", "program-list--single");
}

function syncCollectionLayout(containerId, itemClass, singleClass) {
  const container = document.getElementById(containerId);

  if (!container || container.hidden) {
    return;
  }

  const visibleItems = Array.from(container.children).filter(
    (child) => child.classList.contains(itemClass) && !child.hidden
  );

  container.classList.toggle(singleClass, visibleItems.length === 1);

  if (visibleItems.length === 0) {
    setVisibility(container, false);
  }
}

function setupModal() {
  const openButtons = document.querySelectorAll("[data-open-rsvp]");
  const closeButtons = document.querySelectorAll("[data-close-rsvp]");

  const openModal = () => {
    if (modal.hidden) {
      return;
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  openButtons.forEach((button) => button.addEventListener("click", openModal));
  closeButtons.forEach((button) => button.addEventListener("click", closeModal));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

async function handleRsvpSubmit(event) {
  event.preventDefault();

  const formData = new FormData(rsvpForm);
  const endpoint = config.rsvp.endpoint?.trim();

  rsvpStatus.textContent = "Sending...";

  try {
    if (!endpoint) {
      localStorage.setItem(
        "memories-rsvp-preview",
        JSON.stringify(Object.fromEntries(formData.entries()))
      );
      rsvpStatus.textContent = config.rsvp.successMessage;
      rsvpForm.reset();
      return;
    }

    if (config.rsvp.accessKey) {
      formData.append("access_key", config.rsvp.accessKey);
    }

    if (config.rsvp.subject) {
      formData.append("subject", config.rsvp.subject);
    }

    if (config.rsvp.fromName) {
      formData.append("from_name", config.rsvp.fromName);
    }

    const response = await fetch(endpoint, {
      method: "POST",
      body: formData
    });

    const contentType = response.headers.get("content-type") || "";
    const result = contentType.includes("application/json") ? await response.json() : null;

    if (!response.ok || (result && result.success === false)) {
      throw new Error("Submission failed");
    }

    rsvpStatus.textContent = config.rsvp.successMessage;
    rsvpForm.reset();
  } catch (error) {
    rsvpStatus.textContent = "Something went wrong. Try again.";
  }
}

function setupAudio() {
  if (!config.media.audioSrc) {
    audioToggle.disabled = true;
    audioToggle.textContent = "Audio";
    audioTime.textContent = "Add audio in site-config.js";
    return;
  }

  audioElement.src = config.media.audioSrc;

  audioToggle.addEventListener("click", async () => {
    if (audioElement.paused) {
      await audioElement.play();
      audioToggle.textContent = "Pause";
    } else {
      audioElement.pause();
      audioToggle.textContent = "Play";
    }
  });

  audioElement.addEventListener("timeupdate", () => {
    const ratio = audioElement.duration ? audioElement.currentTime / audioElement.duration : 0;
    audioProgress.style.width = `${ratio * 100}%`;
    audioTime.textContent = `${formatSeconds(audioElement.currentTime)} / ${formatSeconds(
      audioElement.duration || 0
    )}`;
  });

  audioElement.addEventListener("ended", () => {
    audioToggle.textContent = "Play";
  });
}

function formatSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function revealSite() {
  siteShell.classList.remove("is-hidden");

  if (!loadingScreen || loadingScreen.hidden) {
    loadingScreen?.remove();
    return;
  }

  window.setTimeout(() => {
    loadingScreen.classList.add("is-fading");
    window.setTimeout(() => {
      loadingScreen.remove();
    }, 450);
  }, 1200);
}

function init() {
  const nameInfo = splitCoupleNames(config.event.coupleNames);
  const dateInfo = formatDateParts(config.event.dateTime);
  const derivedValues = {
    ...nameInfo,
    eventMonth: dateInfo.month,
    eventYearLine: dateInfo.yearLine,
    formattedDate: dateInfo.formattedDate,
    rsvpDeadlineLine: formatDeadlineLine(config.rsvp.deadline),
    footerMeta: `${dateInfo.fullDate
      .getDate()
      .toString()
      .padStart(2, "0")} / ${(dateInfo.fullDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")} / ${dateInfo.fullDate.getFullYear()} - ${config.event.footerLocation}`
  };

  applyTheme(config.theme);
  bindText(derivedValues);
  applyMedia();
  renderCalendar(dateInfo);
  renderProgram();
  applyVisibilityRules();
  setupModal();
  setupAudio();
  rsvpForm.addEventListener("submit", handleRsvpSubmit);
  revealSite();
}

init();

