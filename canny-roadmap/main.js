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
  
  // Right Sidebar Elements
  detailSidebar: document.querySelector("#detail-sidebar"),
  closeDetail: document.querySelector("#close-detail"),
  detailTitle: document.querySelector("#detail-title"),
  detailVotes: document.querySelector("#detail-votes"),
  detailScore: document.querySelector("#detail-score"),
  detailStatusPill: document.querySelector("#detail-status-pill"),
  detailOwner: document.querySelector("#detail-owner"),
  detailSquad: document.querySelector("#detail-squad"),
  detailForm: document.querySelector("#detail-form"),
  detailStart: document.querySelector("#detail-start"),
  detailEnd: document.querySelector("#detail-end"),
  detailQuarter: document.querySelector("#detail-quarter"),
};

void init();

async function init() {
  bindControls();
  await loadRoadmap();
}

function bindControls() {

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

  elements.closeDetail.addEventListener("click", () => {
    state.selectedIdeaId = null;
    document.body.classList.remove("detail-open");
    render();
  });

  elements.detailForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveSelectedIdea();
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
  renderFilterControls();
  renderWeekHeader();
  renderBoard();
  renderSelectedIdea();
  renderSyncStatus();
}

function renderFilterControls() {
  const quarterOptions = [...quarterMapFromIdeas().keys()];
  
  populateSelect(elements.groupByFilter, ["pm", "squad"], state.filters.groupBy);

  const visibleIdeas = filteredIdeas();
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
  elements.timelineTitle.textContent = "Annual Roadmap";
  elements.weekHeader.innerHTML = "";

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  for (let m = 0; m < 12; m++) {
    const monthCell = document.createElement("div");
    monthCell.className = "month-cell";
    monthCell.innerHTML = `<strong>${months[m]}</strong>`;
    
    // Create 4 subdivisions (weeks)
    for (let w = 0; w < 4; w++) {
      const divider = document.createElement("div");
      divider.className = "week-divider";
      monthCell.appendChild(divider);
    }
    
    elements.weekHeader.appendChild(monthCell);
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
  item.style.left = `${((idea.startWeek - 1) / 48) * 100}%`;
  item.style.width = `${(span / 48) * 100}%`;
  item.style.top = `${10 + rowIndex * rowHeight}px`;

  const leftHandle = document.createElement("span");
  leftHandle.className = "resize-handle resize-left";
  leftHandle.dataset.action = "resize-left";

  const rightHandle = document.createElement("span");
  rightHandle.className = "resize-handle resize-right";
  rightHandle.dataset.action = "resize-right";

  const votes = idea.voteCount || 0;
  const score = idea.score || 0;

  const content = document.createElement("div");
  content.className = "item-content";
  content.innerHTML = `
    <div class="item-header">
      <div class="item-label">${idea.title}</div>
      ${votes > 0 ? `<div class="item-badge" title="Score: ${score}">▲ ${votes}</div>` : ""}
    </div>
  `;

  item.append(leftHandle, content, rightHandle);

  item.addEventListener("pointerdown", (event) => {
    const action = event.target.dataset.action || "move";
    const trackRect = item.parentElement.getBoundingClientRect();
    state.interaction = {
      ideaId: idea.id,
      action,
      pointerStartX: event.clientX,
      pointerStartY: event.clientY,
      originalStartWeek: idea.startWeek,
      originalEndWeek: idea.endWeek,
      originalRowIndex: rowIndex,
      trackWidth: trackRect.width,
      didDrag: false,
    };
    item.classList.add("is-interacting");
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
  elements.detailTitle.textContent = idea.title;
  elements.detailVotes.textContent = idea.voteCount || 0;
  elements.detailScore.textContent = idea.score || 0;
  elements.detailStatusPill.textContent = idea.status;
  elements.detailStatusPill.dataset.status = idea.status;
  elements.detailOwner.textContent = idea.pm;
  elements.detailSquad.textContent = idea.squad;

  elements.detailStart.value = String(idea.startWeek);
  elements.detailEnd.value = String(idea.endWeek);
  
  populateSelect(
    elements.detailQuarter,
    [...quarterMapFromIdeas().keys()],
    idea.quarter
  );
  
  // Show right sidebar
  document.body.classList.add("detail-open");
}

function handlePointerMove(event) {
  if (!state.interaction) return;
  const idea = state.ideas.find((entry) => entry.id === state.interaction.ideaId);
  if (!idea) return;

  // Check if pointer moved far enough to count as a drag (5px threshold)
  const dx = event.clientX - state.interaction.pointerStartX;
  const dy = event.clientY - state.interaction.pointerStartY;
  if (!state.interaction.didDrag && Math.sqrt(dx * dx + dy * dy) > 5) {
    state.interaction.didDrag = true;
  }
  if (!state.interaction.didDrag) return;

  const weekDelta = Math.round(
    ((event.clientX - state.interaction.pointerStartX) / state.interaction.trackWidth) * 13,
  );

  if (state.interaction.action === "move") {
    const duration = state.interaction.originalEndWeek - state.interaction.originalStartWeek;
    
    const weekDelta = Math.round(
      ((event.clientX - state.interaction.pointerStartX) / state.interaction.trackWidth) * 48,
    );
    
    const newStart = clampWeek(state.interaction.originalStartWeek + weekDelta);
    idea.startWeek = Math.min(newStart, 48 - duration);
    idea.endWeek = idea.startWeek + duration;
    
    // Vertical Delta
    const rowHeight = 56;
    const rowDelta = Math.round((event.clientY - state.interaction.pointerStartY) / rowHeight);
    idea.manualRowIndex = Math.max(0, state.interaction.originalRowIndex + rowDelta);
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
  const wasDrag = state.interaction.didDrag;
  const ideaId = state.interaction.ideaId;
  
  if (wasDrag) {
    saveOverrides();
  } else {
    // Pure click — open detail sidebar
    state.selectedIdeaId = ideaId;
  }
  
  state.interaction = null;
  render();
}

function saveSelectedIdea() {
  const idea = getSelectedIdea();
  if (!idea) return;

  idea.quarter = elements.detailQuarter.value;
  idea.startWeek = clampWeek(Number(elements.detailStart.value));
  idea.endWeek = Math.max(idea.startWeek, clampWeek(Number(elements.detailEnd.value)));

  saveOverrides();
  render();
}

function filteredIdeas() {
  return state.ideas.filter((idea) => {
    if (state.filters.pm !== "All" && idea.pm !== state.filters.pm) return false;
    if (state.filters.squad !== "All" && idea.squad !== state.filters.squad) return false;
    if (state.filters.tag !== "All" && !(idea.tags || []).includes(state.filters.tag)) return false;
    return true;
  }).sort((a, b) => {
     // Sort by creation date (recency) then by votes
     const dateA = new Date(a.source?.created || 0);
     const dateB = new Date(b.source?.created || 0);
     if (dateA > dateB) return -1;
     if (dateA < dateB) return 1;
     return (b.voteCount || 0) - (a.voteCount || 0);
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
  // We prioritize the sort order (recency/votes) for the layout density
  const rows = new Map();
  const laneEnds = []; // Stores the endWeek for each row in this lane

  for (const idea of ideas) {
    let rowIndex = 0;
    // Find the first row where this idea can fit without overlapping
    // We only check if the startWeek > laneEnds[rowIndex]
    // Since ideas is already sorted by something else, we just find the first slot.
    while (laneEnds[rowIndex] !== undefined && idea.startWeek <= laneEnds[rowIndex]) {
      rowIndex++;
    }
    
    rows.set(idea.id, rowIndex);
    laneEnds[rowIndex] = idea.endWeek;
    
    // Update manualRowIndex to keep it here if they move it horizontally later
    idea.manualRowIndex = rowIndex; 
  }

  return { rows, totalRows: Math.max(1, laneEnds.length) };
}

function getSelectedIdea() {
  return state.ideas.find((idea) => idea.id === state.selectedIdeaId) || null;
}

function populateSelect(element, options, selectedValue) {
  if (!element) return;
  element.innerHTML = "";
  if (!options || !options.length) return;

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
  return Math.min(48, Math.max(1, Number.isFinite(value) ? value : 1));
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
        manualRowIndex: idea.manualRowIndex,
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
      manualRowIndex: override.manualRowIndex ?? idea.manualRowIndex,
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
