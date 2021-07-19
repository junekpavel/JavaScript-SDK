const BugBattle = window.BugBattle.default;

BugBattle.initialize(
  "J4ADFNfzzCdYWr8NBO4rozcb6NFeyyES",
  BugBattle.FEEDBACK_BUTTON
);

BugBattle.logEvent("Booted");

// Sample for feedback type options
BugBattle.setFeedbackTypeOptions([
  {
    title: "Request a feature",
    description: "Get in touch with us.",
    icon: "https://jssdk.bugbattle.io/res/support.svg",
    action: () => {
      BugBattle.startBugReporting(BugBattle.FLOW_FEATUREREQUEST);
    },
  },
  {
    title: "Rate your experience",
    description: "Let us know how we could improve!",
    icon: "https://jssdk.bugbattle.io/res/star.svg",
    action: () => {
      BugBattle.startBugReporting(BugBattle.FLOW_RATING);
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

BugBattle.enableNetworkLogger();

fetch("https://run.mocky.io/v3/002b4638-e1de-465c-9a7e-cd4216fd1389").then(
  (data) => {
    console.log(data);
    data.arrayBuffer().then((d) => {
      console.log(d);
    });
  }
);

// BugBattle.setApiUrl("http://localhost:9000");

BugBattle.setAppBuildNumber("2345");

BugBattle.enableReplays(true);

BugBattle.enablePoweredByBugbattle(true);

BugBattle.enableCrashDetector(true, false);

// Sets the app's build number.
BugBattle.setAppBuildNumber(5);

// Sets the app's version code.
BugBattle.setAppVersionCode("v5.0");

// Attaches custom data to the bug reports.
BugBattle.attachCustomData({
  test1: "Battle",
  data2: "Unicorn",
});

BugBattle.logEvent("Booted");

BugBattle.enableRageClickDetector();

// Disable shortcuts
BugBattle.enableShortcuts(true);

// Turn the privacy policy check on or off.
BugBattle.enablePrivacyPolicy(true);
BugBattle.setPrivacyPolicyUrl("htpp...");

BugBattle.setMainColor("#2A9D8F");

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

var xhttpa = new XMLHttpRequest();
xhttpa.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    console.log(this.responseText);
  }
};
xhttpa.open(
  "GET",
  "https://runa.mocky.io/v3/274ec30c-eeba-4248-b605-ace31b7e3b52",
  true
);
xhttpa.send();

BugBattle.setCustomerInfo({
  email: "asdf@asdf.de",
  name: "Lukas",
});

BugBattle.logEvent("Sample", {
  userId: 1234,
});

console.error("Demo error");

BugBattle.logEvent("User signed in", {
  userId: 1242,
  name: "Isabella",
  skillLevel: "🤩",
});

setTimeout(() => {
  BugBattle.logEvent("User signed out", {
    userId: 1242,
    name: "Isabella",
    skillLevel: "🤩",
  });
}, 5000);

/*setTimeout(() => {
  var x = [];

x[0].as = 1;
}, 5000);*/

BugBattle.autoPromptForRating();