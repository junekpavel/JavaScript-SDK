export const setColor = (color) => {
  const colorStyleSheet = `
    .bugbattle--feedback-button {
        background-color: ${color};
    }
    .bugbattle--feedback-dialog-header-button {
        color: ${color};
    }
    .bugbattle-screenshot-editor-borderlayer {
        border-color: ${color};
    }
    .bugbattle-screenshot-editor-dot {
      background-color: ${color};
    }
    .bugbattle-screenshot-editor-rectangle {
      border-color: ${color};
    }
    .bugbattle--feedback-send-button {
      background-color: ${color};
    }
    .bugbattle--feedback-inputgroup--privacy-policy a {
      color: ${color};
    }
    .bugbattle-screenshot-editor-drag-info {
      background-color: ${color};
    }
    .bugbattle-double-bounce1,
    .bugbattle-double-bounce2 {
      background-color: ${color};
    }
    .bugbattle--feedback-dialog-header-button-cancel {
      background-color: ${color};
    }
    .bugbattle--feedback-type-icon {
      background-color: ${color};
    }
    .bugbattle--feedback-type:hover {
      background-color: ${color}10;
      border-bottom: 1px solid ${color}10;
    }
    `;

  const node = document.createElement("style");
  node.innerHTML = colorStyleSheet;
  document.body.appendChild(node);
};
