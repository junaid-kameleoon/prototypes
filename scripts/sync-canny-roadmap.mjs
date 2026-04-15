import fs from "fs";
import path from "path";

const outputPath = path.resolve(process.cwd(), "canny-roadmap/data/roadmap.json");
const apiKey = process.env.CANNY_API_KEY;
const groupId = process.env.CANNY_GROUP_ID || "";
const boardId = process.env.CANNY_BOARD_ID || "";

if (!apiKey) {
  console.log("CANNY_API_KEY is not set. Keeping existing roadmap data.");
  process.exit(0);
}

const ideas = await fetchAllIdeas();
const payload = {
  ideas,
  meta: {
    source: "canny",
    refreshedAt: new Date().toISOString(),
    count: ideas.length,
    filterGroupId: groupId || null,
    filterBoardId: boardId || null,
  },
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2) + "\n");
console.log(`Synced ${ideas.length} ideas to ${outputPath}`);

async function fetchAllIdeas() {
  const items = [];
  let cursor = null;

  while (true) {
    const body = {
      apiKey,
      limit: 100,
      sort: { field: "_id", direction: "desc" },
    };

    if (cursor) body.cursor = cursor;

    const filters = [];
    if (groupId) {
      filters.push({
        resource: "ideaDefaultField",
        condition: "is",
        value: {
          fieldID: "group",
          value: groupId,
        },
      });
    }

    if (boardId) {
      filters.push({
        resource: "ideaDefaultField",
        condition: "is",
        value: {
          fieldID: "board",
          value: boardId,
        },
      });
    }

    if (filters.length > 0) {
      body.filtering = {
        filtersOperator: "all",
        filters,
      };
    }

    const response = await fetch("https://canny.io/api/v1/ideas/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Canny sync failed with status ${response.status}`);
    }

    const data = await response.json();
    const pageItems = Array.isArray(data.items) ? data.items : [];
    items.push(...pageItems.map(normalizeIdea));

    if (!data.hasNextPage || !data.cursor) break;
    cursor = data.cursor;
  }

  return items;
}

function normalizeIdea(item) {
  const created = item.created || item.createdAt || new Date().toISOString();
  const updatedAt = item.updatedAt || created;
  const ownerName = item.owner?.name || "Unassigned";
  const groupName = item.group?.name || "No Group";
  const statusName = item.status?.name ? String(item.status.name).toLowerCase() : "open";

  return {
    id: item.id,
    title: item.title || "Untitled Idea",
    pm: ownerName,
    squad: groupName,
    quarter: detectQuarterFromDate(updatedAt),
    startWeek: 1,
    endWeek: 3,
    status: statusName,
    tags: [groupName].filter(Boolean),
    score: item.score || 0,
    voteCount: item.voteCount || 0,
    source: {
      created,
      updatedAt,
      owner: ownerName,
      group: groupName,
      urlName: item.urlName || null,
      score: item.score || 0,
      voteCount: item.voteCount || 0,
    },
  };
}

function detectQuarterFromDate(value) {
  const date = new Date(value);
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();
  const quarter = Math.floor(month / 3) + 1;
  return `Q${quarter} ${year}`;
}
