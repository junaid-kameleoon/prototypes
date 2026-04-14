const ROADMAP_URL = "./data/roadmap.json";
const OVERRIDE_STORAGE_KEY = "canny-roadmap-pages-overrides-v1";

const state = {
  ideas: [],
  filters: {
    quarter: "",
    groupBy: "pm",
    pm: "All",
    squad: "All",
    tag: "All",
  },
  selectedIdeaId: null,
  interaction: null,
  isLoading: false,
  error: "",
  meta: null,
};

const elements = {
  quarterFilter: document.querySelector("#quarter-filter"),
  groupByFilter: document.querySelector("#group-by-filter"),
  pmFilter: document.querySelector("#pm-filter"),
  squadFilter: document.querySelector("#squad-filter"),
  tagFilter: document.querySelector("#tag-filter"),
  timelineTitle: document.querySelector("#timeline-title"),
  ideaCount: document.querySelector("#idea-count"),
  laneCount: document.querySelector("#lane-count"),
  focusedTag: document.querySelector("#focused-tag"),
  weekHeader: document.querySelector("#week-header"),
  timelineBody: document.querySelector("#timeline-body"),
  emptyState: document.querySelector("#empty-state"),
  ideaForm: document.querySelector("#idea-form"),
  ideaTitle: document.querySelector("#idea-title"),
  ideaPm: document.querySelector("#idea-pm"),
  ideaSquad: document.querySelector("#idea-squad"),
  ideaQuarter: document.querySelector("#idea-quarter"),
  ideaStart: document.querySelector("#idea-start"),
  ideaEnd: document.querySelector("#idea-end"),
  ideaStatus: document.querySelector("#idea-status"),
  syncStatus: document.querySelector("#sync-status"),
  resetButton: document.querySelector("#reset-button"),
};

void init();

async function init() {
  bindControls();
  await loadRoadmap();
}

function bindControls() {
  elements.quarterFilter.addEventListener("change", (event) => {
    state.filters.quarter = event.target.value;
    render();
  });

  elements.groupByFilter.addEventListener("change", (event) => {
    state.filters.groupBy = event.target.value;
    render();
  });

  elements.pmFilter.addEventListener("change", (event) => {
    state.filters.pm = event.target.value;
    render();
  });

  elements.squadFilter.addEventListener("change", (event) => {
    state.filters.squad = event.target.value;
    render();
  });

  elements.ideaForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveSelectedIdea();
  });

  elements.resetButton.addEventListener("click", () => {
    window.localStorage.removeItem(OVERRIDE_STORAGE_KEY);
    void loadRoadmap();
  });

  window.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("pointerup", handlePointerUp);
}

async function loadRoadmap() {
  state.isLoading = true;
  state.error = "";
  renderSyncStatus();

  try {
    const response = await fetch(ROADMAP_URL, { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not load roadmap data.");

    const overrides = readOverrides();
    state.meta = data.meta || null;
    state.ideas = mergeIdeasWithOverrides(data.ideas || [], overrides);

    if (!state.filters.quarter && state.ideas[0]?.quarter) {
      state.filters.quarter = state.ideas[0].quarter;
    }
  } catch (error) {
    state.error = error.message || "Could not load roadmap data.";
    state.ideas = [];
  } finally {
    state.isLoading = false;
    render();
  }
}

function render() {
  const quarters = quarterMapFromIdeas();
  if (!state.filters.quarter && quarters.size > 0) {
    state.filters.quarter = quarters.keys().next().value;
  }

  renderFilterControls();
  renderWeekHeader();
  renderBoard();
  renderSelectedIdea();
  renderSyncStatus();
}

function renderFilterControls() {
  const quarterOptions = [...quarterMapFromIdeas().keys()];
  if (state.filters.quarter && !quarterOptions.includes(state.filters.quarter)) {
    state.filters.quarter = quarterOptions[0] || "";
  }

  populateSelect(elements.quarterFilter, quarterOptions, state.filters.quarter);
  populateSelect(elements.groupByFilter, ["pm", "squad"], state.filters.groupBy);

  const visibleIdeas = state.ideas.filter((idea) => idea.quarter === state.filters.quarter);
  const pmOptions = ["All", ...uniqueValues(visibleIdeas, "pm")];
  const squadOptions = ["All", ...uniqueValues(visibleIdeas, "squad")];
  const tagOptions = ["All", ...uniqueTags(visibleIdeas)];

  if (!pmOptions.includes(state.filters.pm)) state.filters.pm = "All";
  if (!squadOptions.includes(state.filters.squad)) state.filters.squad = "All";
  if (!tagOptions.includes(state.filters.tag)) state.filters.tag = "All";

  populateSelect(elements.pmFilter, pmOptions, state.filters.pm);
  populateSelect(elements.squadFilter, squadOptions, state.filters.squad);
  populateSelect(
    elements.ideaQuarter,
    quarterOptions,
    getSelectedIdea()?.quarter || state.filters.quarter,
  );

  elements.tagFilter.innerHTML = "";
  for (const tag of tagOptions) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `tag-chip${state.filters.tag === tag ? " active" : ""}`;
    button.textContent = tag;
    button.addEventListener("click", () => {
      state.filters.tag = tag;
      render();
    });
    elements.tagFilter.appendChild(button);
  }
}

function renderWeekHeader() {
  const quarter = quarterMapFromIdeas().get(state.filters.quarter);
  elements.timelineTitle.textContent = state.filters.quarter
    ? `${state.filters.quarter} timeline`
    : "Roadmap timeline";
  elements.weekHeader.innerHTML = "";

  if (!quarter) return;

  for (let week = 1; week <= 13; week += 1) {
    const startDate = new Date(Date.UTC(quarter.year, quarter.startMonth, 1 + (week - 1) * 7));
    const month = startDate.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
    const day = startDate.toLocaleString("en-US", { day: "numeric", timeZone: "UTC" });

    const cell = document.createElement("div");
    cell.className = "week-cell";
    cell.innerHTML = `<strong>W${week}</strong><span>${month} ${day}</span>`;
    elements.weekHeader.appendChild(cell);
  }
}

function renderBoard() {
  const ideas = filteredIdeas();
  const groupedIdeas = groupIdeas(ideas, state.filters.groupBy);
  const lanes = Object.entries(groupedIdeas);

  elements.ideaCount.textContent = String(ideas.length);
  elements.laneCount.textContent = String(lanes.length);
  elements.focusedTag.textContent = state.filters.tag;
  elements.timelineBody.innerHTML = "";

  if (lanes.length === 0) {
    const empty = document.createElement("div");
    empty.className = "timeline-empty";
    empty.textContent = state.isLoading
      ? "Loading ideas from Canny…"
      : "No ideas match the current filters for this quarter.";
    elements.timelineBody.appendChild(empty);
    return;
  }

  for (const [laneName, laneIdeas] of lanes) {
    const row = document.createElement("div");
    row.className = "timeline-row";

    const label = document.createElement("div");
    label.className = "lane-label";
    label.innerHTML = `
      <div class="lane-meta">
        <strong>${laneName}</strong>
        <span>${laneIdeas.length} idea${laneIdeas.length === 1 ? "" : "s"}</span>
      </div>
    `;

    const track = document.createElement("div");
    track.className = "timeline-track";

    const rowAssignments = assignRows(laneIdeas);
    const rowHeight = 56;
    track.style.minHeight = `${Math.max(92, rowAssignments.totalRows * rowHeight + 20)}px`;

    for (const idea of laneIdeas) {
      const rowIndex = rowAssignments.rows.get(idea.id) || 0;
      track.appendChild(buildTimelineItem(idea, rowIndex, rowHeight));
    }

    row.append(label, track);
    elements.timelineBody.appendChild(row);
  }
}

function buildTimelineItem(idea, rowIndex, rowHeight) {
  const item = document.createElement("button");
  item.type = "button";
  item.className = `timeline-item${state.selectedIdeaId === idea.id ? " selected" : ""}`;
  item.dataset.ideaId = idea.id;
  item.dataset.status = idea.status;

  const span = Math.max(1, idea.endWeek - idea.startWeek + 1);
  item.style.left = `${((idea.startWeek - 1) / 13) * 100}%`;
  item.style.width = `${(span / 13) * 100}%`;
  item.style.top = `${10 + rowIndex * rowHeight}px`;

  const leftHandle = document.createElement("span");
  leftHandle.className = "resize-handle resize-left";
  leftHandle.dataset.action = "resize-left";

  const rightHandle = document.createElement("span");
  rightHandle.className = "resize-handle resize-right";
  rightHandle.dataset.action = "resize-right";

  const content = document.createElement("div");
  content.innerHTML = `
    <div class="item-label">${idea.title}</div>
    <div class="item-meta">W${idea.startWeek}-W${idea.endWeek} · ${idea.status}</div>
  `;

  item.append(leftHandle, content, rightHandle);

  item.addEventListener("click", () => {
    state.selectedIdeaId = idea.id;
    render();
  });

  item.addEventListener("pointerdown", (event) => {
    const action = event.target.dataset.action || "move";
    const trackRect = item.parentElement.getBoundingClientRect();
    state.interaction = {
      ideaId: idea.id,
      action,
      pointerStartX: event.clientX,
      originalStartWeek: idea.startWeek,
      originalEndWeek: idea.endWeek,
      trackWidth: trackRect.width,
    };
    state.selectedIdeaId = idea.id;
    item.setPointerCapture(event.pointerId);
  });

  return item;
}

function renderSelectedIdea() {
  const idea = getSelectedIdea();
  if (!idea) {
    elements.emptyState.classList.remove("hidden");
    elements.ideaForm.classList.add("hidden");
    return;
  }

  elements.emptyState.classList.add("hidden");
  elements.ideaForm.classList.remove("hidden");
  elements.ideaTitle.value = idea.title;
  elements.ideaPm.value = idea.pm;
  elements.ideaSquad.value = idea.squad;
  elements.ideaQuarter.value = idea.quarter;
  elements.ideaStart.value = String(idea.startWeek);
  elements.ideaEnd.value = String(idea.endWeek);
  elements.ideaStatus.value = idea.status;
}

function handlePointerMove(event) {
  if (!state.interaction) return;
  const idea = state.ideas.find((entry) => entry.id === state.interaction.ideaId);
  if (!idea) return;

  const weekDelta = Math.round(
    ((event.clientX - state.interaction.pointerStartX) / state.interaction.trackWidth) * 13,
  );

  if (state.interaction.action === "move") {
    const duration = state.interaction.originalEndWeek - state.interaction.originalStartWeek;
    const newStart = clampWeek(state.interaction.originalStartWeek + weekDelta);
    idea.startWeek = Math.min(newStart, 13 - duration);
    idea.endWeek = idea.startWeek + duration;
  }

  if (state.interaction.action === "resize-left") {
    idea.startWeek = Math.min(
      clampWeek(state.interaction.originalStartWeek + weekDelta),
      idea.endWeek,
    );
  }

  if (state.interaction.action === "resize-right") {
    idea.endWeek = Math.max(
      idea.startWeek,
      clampWeek(state.interaction.originalEndWeek + weekDelta),
    );
  }

  renderBoard();
  renderSelectedIdea();
}

function handlePointerUp() {
  if (!state.interaction) return;
  saveOverrides();
  state.interaction = null;
}

function saveSelectedIdea() {
  const idea = getSelectedIdea();
  if (!idea) return;

  idea.pm = elements.ideaPm.value.trim() || "Unassigned";
  idea.squad = elements.ideaSquad.value.trim() || "Unassigned";
  idea.quarter = elements.ideaQuarter.value;
  idea.startWeek = clampWeek(Number(elements.ideaStart.value));
  idea.endWeek = Math.max(idea.startWeek, clampWeek(Number(elements.ideaEnd.value)));

  saveOverrides();
  render();
}

function filteredIdeas() {
  return state.ideas.filter((idea) => {
    if (state.filters.quarter && idea.quarter !== state.filters.quarter) return false;
    if (state.filters.pm !== "All" && idea.pm !== state.filters.pm) return false;
    if (state.filters.squad !== "All" && idea.squad !== state.filters.squad) return false;
    if (state.filters.tag !== "All" && !(idea.tags || []).includes(state.filters.tag)) return false;
    return true;
  });
}

function groupIdeas(ideas, key) {
  return ideas.reduce((groups, idea) => {
    const groupKey = idea[key] || "Unassigned";
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(idea);
    return groups;
  }, {});
}

function assignRows(ideas) {
  const sorted = [...ideas].sort((a, b) => a.startWeek - b.startWeek || a.endWeek - b.endWeek);
  const rows = new Map();
  const rowEndWeeks = [];

  for (const idea of sorted) {
    let placed = false;
    for (let rowIndex = 0; rowIndex < rowEndWeeks.length; rowIndex += 1) {
      if (idea.startWeek > rowEndWeeks[rowIndex]) {
        rowEndWeeks[rowIndex] = idea.endWeek;
        rows.set(idea.id, rowIndex);
        placed = true;
        break;
      }
    }

    if (!placed) {
      rowEndWeeks.push(idea.endWeek);
      rows.set(idea.id, rowEndWeeks.length - 1);
    }
  }

  return { rows, totalRows: Math.max(1, rowEndWeeks.length) };
}

function getSelectedIdea() {
  return state.ideas.find((idea) => idea.id === state.selectedIdeaId) || null;
}

function populateSelect(element, options, selectedValue) {
  element.innerHTML = "";
  if (!options.length) return;

  for (const option of options) {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    optionElement.selected = option === selectedValue;
    element.appendChild(optionElement);
  }
}

function uniqueValues(items, key) {
  return [...new Set(items.map((item) => item[key]).filter(Boolean))].sort();
}

function uniqueTags(items) {
  return [...new Set(items.flatMap((item) => item.tags || []))].sort();
}

function clampWeek(value) {
  return Math.min(13, Math.max(1, Number.isFinite(value) ? value : 1));
}

function quarterMapFromIdeas() {
  const quarters = new Map();
  for (const idea of state.ideas) {
    if (!idea.quarter) continue;
    const parsed = parseQuarter(idea.quarter);
    if (parsed) quarters.set(idea.quarter, parsed);
  }

  return new Map(
    [...quarters.entries()].sort((a, b) => {
      const aScore = a[1].year * 10 + a[1].quarter;
      const bScore = b[1].year * 10 + b[1].quarter;
      return aScore - bScore;
    }),
  );
}

function parseQuarter(value) {
  const match = /^Q([1-4])\s+(\d{4})$/.exec(value);
  if (!match) return null;
  const quarter = Number(match[1]);
  const year = Number(match[2]);
  return {
    quarter,
    year,
    startMonth: (quarter - 1) * 3,
  };
}

function readOverrides() {
  try {
    return JSON.parse(window.localStorage.getItem(OVERRIDE_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveOverrides() {
  const overrides = Object.fromEntries(
    state.ideas.map((idea) => [
      idea.id,
      {
        pm: idea.pm,
        squad: idea.squad,
        quarter: idea.quarter,
        startWeek: idea.startWeek,
        endWeek: idea.endWeek,
      },
    ]),
  );

  window.localStorage.setItem(OVERRIDE_STORAGE_KEY, JSON.stringify(overrides));
}

function mergeIdeasWithOverrides(ideas, overrides) {
  return ideas.map((idea) => {
    const override = overrides[idea.id] || {};
    const startWeek = clampWeek(override.startWeek ?? idea.startWeek ?? 1);
    const endWeek = Math.max(startWeek, clampWeek(override.endWeek ?? idea.endWeek ?? 3));

    return {
      ...idea,
      pm: override.pm || idea.pm || "Unassigned",
      squad: override.squad || idea.squad || "Unassigned",
      quarter: override.quarter || idea.quarter,
      startWeek,
      endWeek,
      tags: Array.isArray(idea.tags) ? idea.tags : [],
    };
  });
}

function renderSyncStatus() {
  if (state.isLoading) {
    elements.syncStatus.textContent = "Loading roadmap data…";
    return;
  }

  if (state.error) {
    elements.syncStatus.textContent = state.error;
    return;
  }

  if (state.meta?.refreshedAt) {
    const timestamp = new Date(state.meta.refreshedAt).toLocaleString("en-US");
    elements.syncStatus.textContent = `Synced from Canny on ${timestamp}. Edits are local to this browser.`;
    return;
  }

  elements.syncStatus.textContent = "Roadmap data loaded.";
}
