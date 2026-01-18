import { MarkdownView, Notice, Plugin, setIcon, TFile } from "obsidian";

export default class CopyNotePlugin extends Plugin {
  async onload() {
    this.registerEvent(
      this.app.workspace.on("layout-change", () => {
        this.addViewAction();
      }),
    );

    this.addCommand({
      id: "copy-note",
      name: "Copy current note",
      callback: () => this.copyActiveFileContent(),
    });
  }

  private addViewAction() {
    const views = this.app.workspace.getLeavesOfType("markdown");

    views.forEach((leaf) => {
      const view = leaf.view as MarkdownView;
      const actionContainer = view.containerEl.querySelector(".view-actions");

      if (actionContainer && !actionContainer.querySelector(".copy-note-button")) {
        const button = actionContainer.createEl("a", {
          cls: ["view-action", "copy-note-button"],
          attr: { "aria-label": "Copy entire note" },
        });

        setIcon(button, "copy");

        button.addEventListener("click", () => {
          void this.copyActiveFileContent();
        });
      }
    });
  }

  async copyActiveFileContent() {
    const activeFile = this.app.workspace.getActiveFile();

    if (activeFile instanceof TFile) {
      try {
        const content = await this.app.vault.read(activeFile);
        await navigator.clipboard.writeText(content);
        new Notice("Note content copied!");
      } catch (err) {
        new Notice("Error copying note");
        console.error(err);
      }
    }
  }
}
