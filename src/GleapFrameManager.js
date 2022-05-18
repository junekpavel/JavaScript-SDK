import { GleapStreamedEvent, GleapCustomActionManager, GleapEventManager, GleapMarkerManager, GleapFeedback, GleapFeedbackButtonManager, GleapTranslationManager, GleapSession, GleapConfigManager } from "./Gleap";

export default class GleapFrameManager {
  gleapFrameContainer = null;
  gleapFrame = null;
  injectedFrame = false;
  widgetOpened = false;
  listeners = [];
  frameURL = "http://localhost:3000"; // "https://frame.gleap.io";
  markerManager = undefined;
  escListener = undefined;

  // GleapFrameManager singleton
  static instance;
  static getInstance() {
    if (!this.instance) {
      this.instance = new GleapFrameManager();
    }
    return this.instance;
  }

  constructor() {
    this.startCommunication();
  }

  registerEscListener() {
    if (this.escListener) {
      return;
    }

    this.escListener = (evt) => {
      evt = evt || window.event;
      if (evt.key === "Escape") {
        this.hideWidget();
      }
    };
    document.addEventListener("keydown", this.escListener);
  }

  unregisterEscListener() {
    if (this.escListener) {
      document.removeEventListener("keydown", this.escListener);
      this.escListener = null;
    }
  }

  isOpened() {
    return this.widgetOpened;
  }

  injectFrame = () => {
    if (this.injectedFrame) {
      return;
    }
    this.injectedFrame = true;

    var elem = document.createElement("div");
    elem.className = "gleap-frame-container gleap-frame-container--hidden gleap-hidden";
    elem.innerHTML = `<div class="gleap-frame-container-inner"><iframe src="${this.frameURL}" class="gleap-frame" scrolling="no" title="Gleap Widget Window" allow="autoplay; encrypted-media; fullscreen;" frameborder="0"></iframe></div>`;
    document.body.appendChild(elem);

    this.gleapFrameContainer = elem;
    this.gleapFrame = document.querySelector(".gleap-frame");

    this.updateFrameStyle();
  };

  updateFrameStyle = () => {
    if (!this.gleapFrameContainer) {
      return;
    }

    const classicStyle = "gleap-frame-container--classic";
    const classicStyleLeft = "gleap-frame-container--classic-left";
    const modernStyleLeft = "gleap-frame-container--modern-left";
    const allStyles = [classicStyle, classicStyleLeft, modernStyleLeft];
    for (let i = 0; i < allStyles.length; i++) {
      this.gleapFrameContainer.classList.remove(allStyles[i]);
    }

    var styleToApply = undefined;
    const flowConfig = GleapConfigManager.getInstance().getFlowConfig();
    if (flowConfig.feedbackButtonPosition === GleapFeedbackButtonManager.FEEDBACK_BUTTON_CLASSIC ||
      flowConfig.feedbackButtonPosition === GleapFeedbackButtonManager.FEEDBACK_BUTTON_CLASSIC_BOTTOM) {
      styleToApply = classicStyle;
    }
    if (flowConfig.feedbackButtonPosition === GleapFeedbackButtonManager.FEEDBACK_BUTTON_CLASSIC_LEFT) {
      styleToApply = classicStyleLeft;
    }
    if (flowConfig.feedbackButtonPosition === GleapFeedbackButtonManager.FEEDBACK_BUTTON_BOTTOM_LEFT) {
      styleToApply = modernStyleLeft;
    }
    if (styleToApply) {
      this.gleapFrameContainer.classList.add(styleToApply);
    }
  }

  showWidget() {
    this.gleapFrameContainer.classList.remove('gleap-frame-container--hidden');
    this.widgetOpened = true;
    GleapFeedbackButtonManager.getInstance().updateFeedbackButtonState();
    GleapEventManager.notifyEvent("open");
    this.registerEscListener();
  }

  hideMarkerManager() {
    if (this.markerManager) {
      this.markerManager.clear();
      this.markerManager = null;
    }
  }

  hideWidget() {
    this.hideMarkerManager();
    this.gleapFrameContainer.classList.add('gleap-frame-container--hidden');
    this.widgetOpened = false;
    GleapFeedbackButtonManager.getInstance().updateFeedbackButtonState();
    GleapEventManager.notifyEvent("close");
    this.unregisterEscListener();

    if (typeof window !== "undefined" && typeof window.focus !== "undefined") {
      window.focus();
    }
  }

  sendMessage(data) {
    if (this.gleapFrame) {
      this.gleapFrame.contentWindow.postMessage(JSON.stringify(data), "*");
    }
  };

  sendSessionUpdate() {
    this.sendMessage({
      name: "session-update",
      data: {
        sessionData: GleapSession.getInstance().getSession(),
        apiUrl: GleapSession.getInstance().apiUrl,
        sdkKey: GleapSession.getInstance().sdkKey,
      }
    });
  }

  sendConfigUpdate() {
    this.sendMessage({
      name: "config-update",
      data: {
        config: GleapConfigManager.getInstance().getFlowConfig(),
        actions: GleapConfigManager.getInstance().getProjectActions(),
        overrideLanguage: GleapTranslationManager.getInstance().getOverrideLanguage(),
      }
    });

    this.updateFrameStyle();
  }

  showDrawingScreen(type) {
    this.hideWidget();

    // Show screen drawing.
    this.markerManager = new GleapMarkerManager(type);
    this.markerManager.show((success) => {
      if (!success) {
        this.hideMarkerManager();
      }
      this.showWidget();
    });
  }

  startCommunication() {
    // Listen for messages.
    this.addMessageListener((data) => {
      if (data.name === "ping") {
        GleapStreamedEvent.getInstance().start();

        // Inject the widget buttons
        GleapFeedbackButtonManager.getInstance().injectFeedbackButton();

        this.sendConfigUpdate();
        this.sendSessionUpdate();
      }

      if (data.name === "height-update") {
        this.gleapFrameContainer.style.maxHeight = data.data + "px";
      }

      if (data.name === "notify-event") {
        GleapEventManager.notifyEvent(data.data.type, data.data.data);
      }

      if (data.name === "cleanup-drawings") {
        this.hideMarkerManager();
      }

      if (data.name === "open-url") {
        const url = data.data;
        if (url && url.length > 0) {
          window.open(url, '_blank').focus();
        }
      }

      if (data.name === "run-custom-action") {
        GleapCustomActionManager.triggerCustomAction(data.data);
      }

      if (data.name === "close-widget") {
        this.hideWidget();
      }

      if (data.name === "send-feedback") {
        const formData = data.data.formData;
        const action = data.data.action;
        const outboundId = data.data.outboundId;

        const feedback = new GleapFeedback(action.feedbackType, "MEDIUM", formData, false, action.excludeData, outboundId);
        feedback.sendFeedback().then(() => {
          this.sendMessage({
            name: "feedback-sent"
          });
          GleapEventManager.notifyEvent("feedback-sent", formData);
        }).catch((error) => {
          this.sendMessage({
            name: "feedback-sending-failed",
            data: "Error sending data."
          });
          GleapEventManager.notifyEvent("error-while-sending");
        });
      }

      if (data.name === "start-screen-drawing") {
        this.showDrawingScreen(data.data);
      }
    });

    // Add window message listener.
    window.addEventListener("message", (event) => {
      if (event.origin !== this.frameURL) {
        return;
      }

      try {
        const data = JSON.parse(event.data);
        for (var i = 0; i < this.listeners.length; i++) {
          if (this.listeners[i]) {
            this.listeners[i](data);
          }
        }
      } catch (exp) { }
    });
  }

  addMessageListener(callback) {
    this.listeners.push(callback);
  }
}
