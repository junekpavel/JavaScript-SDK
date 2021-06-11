const BugBattle = window.BugBattle.default;

BugBattle.initialize(
  "J4ADFNfzzCdYWr8NBO4rozcb6NFeyyES",
  BugBattle.FEEDBACK_BUTTON
);

// Sample for feedback type options
BugBattle.setFeedbackTypeOptions([
  {
    title: "Support",
    description: "Get in touch with us.",
    icon: "https://jssdk.bugbattle.io/res/support.svg",
    action: () => {
      alert("Open Intercom for example.");
    },
  },
  {
    title: "Rate your experience",
    description: "Something is broken? Let us know!",
    icon: "https://jssdk.bugbattle.io/res/bug.svg",
    action: () => {
      BugBattle.startBugReporting({
        title: "Feedback",
        form: [
          {
            title: "Rate your experience",
            type: "rating",
            ratingtype: "emoji",
            name: "pagerating",
            required: true,
          },
          {
            placeholder: "Ihre E-Mail Adresse",
            type: "text",
            inputtype: "email",
            name: "reportedBy",
            required: true,
            remember: true,
            defaultValue: "lukas@bugbattle.io",
            showAfter: "pagerating",
          },
          {
            placeholder: "Wie können wir uns verbessern?",
            type: "textarea",
            name: "description",
            showAfter: "pagerating",
          },
        ],
        enablePrivacyPolicy: false,
        privacyPolicyUrl: "",
        disableUserScreenshot: true,
      });
    },
  },
  {
    title: "Report an issue",
    description: "Something is broken? Let us know!",
    icon: "https://jssdk.bugbattle.io/res/bug.svg",
    action: () => {
      BugBattle.startBugReporting();
    },
  },
]);

BugBattle.setApiUrl("http://localhost:9000");

BugBattle.setAppBuildNumber("2345");

BugBattle.enableReplays(true);

BugBattle.enablePoweredByBugbattle(true);

BugBattle.enableNetworkLogger();

BugBattle.enableCrashDetector(false, true);

// Sets the app's build number.
BugBattle.setAppBuildNumber(5);

// Sets the app's version code.
BugBattle.setAppVersionCode("v5.0");

// Attaches custom data to the bug reports.
BugBattle.attachCustomData({
  test1: "Battle",
  data2: "Unicorn",
});

// Disable shortcuts
BugBattle.enableShortcuts(true);

// Turn the privacy policy check on or off.
BugBattle.enablePrivacyPolicy(true);
BugBattle.setPrivacyPolicyUrl("htpp...");

// Sets weather to enable or disable the user screenshot step within the bug reporting flow.
BugBattle.disableUserScreenshot(true);

const feedbackButton = document.querySelector("#feedback-button");
if (feedbackButton) {
  feedbackButton.onclick = function () {
    BugBattle.xxx();
  };
}

console.warn("DEMO!");
console.log("HI!");

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    console.log(this.responseText);
  }
};
xhttp.open(
  "GET",
  "https://run.mocky.io/v3/274ec30c-eeba-4248-b605-ace31b7e3b52",
  true
);
xhttp.send();
