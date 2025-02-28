#!/usr/bin/env node
import { ObsidianServer } from "./server.js";
import { createCreateNoteTool } from "./tools/create-note/index.js";
import { createEditNoteTool } from "./tools/edit-note/index.js";
import { createSearchVaultTool } from "./tools/search-vault/index.js";
import { createMoveNoteTool } from "./tools/move-note/index.js";
import { createCreateDirectoryTool } from "./tools/create-directory/index.js";
import { createDeleteNoteTool } from "./tools/delete-note/index.js";
import { createAddTagsTool } from "./tools/add-tags/index.js";
import { createRemoveTagsTool } from "./tools/remove-tags/index.js";
import { createRenameTagTool } from "./tools/rename-tag/index.js";
import { createReadNoteTool } from "./tools/read-note/index.js";

async function main() {
  const vaultPath = process.argv[2];
  if (!vaultPath) {
    console.error("Please provide the path to your Obsidian vault");
    process.exit(1);
  }

  try {
    const server = new ObsidianServer(vaultPath);
    
    // Register tools
    server.registerTool(createCreateNoteTool(vaultPath));
    server.registerTool(createEditNoteTool(vaultPath));
    server.registerTool(createSearchVaultTool(vaultPath));
    server.registerTool(createMoveNoteTool(vaultPath));
    server.registerTool(createCreateDirectoryTool(vaultPath));
    server.registerTool(createDeleteNoteTool(vaultPath));
    server.registerTool(createAddTagsTool(vaultPath));
    server.registerTool(createRemoveTagsTool(vaultPath));
    server.registerTool(createRenameTagTool(vaultPath));
    server.registerTool(createReadNoteTool(vaultPath));

    await server.start();
  } catch (error) {
    console.error("Fatal error:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
