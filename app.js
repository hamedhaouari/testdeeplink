const SERVICES = {
  playweez: {
    deeplink: "vfss://app/ENTERTAINMENTHUB/PAGE/kesfeteglenPlayweez",
  },
  veedz: {
    deeplink: "vfss://app/ENTERTAINMENTHUB/PAGE/kesfeteglenVeedz",
  },
  astrolojimclub: {
    deeplink: "vfss://app/ENTERTAINMENTHUB/PAGE/kesfeteglenAstrolojimClub",
  },
};

const STORE_LINKS = {
  android: "https://play.google.com/store/apps/details?id=com.vodafone.selfservis",
  ios: "https://apps.apple.com/tr/app/vodafone-yan%C4%B1mda/id489845659",
};

const platformHint = document.getElementById("platformHint");

const isAndroid = () => /Android/i.test(navigator.userAgent);
const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);

const isMobile = () => isAndroid() || isIOS();

const setHint = () => {
  if (!isMobile()) {
    platformHint.textContent = "Desktop detected. This flow is mobile-only.";
  } else if (isAndroid()) {
    platformHint.textContent = "Android detected. You'll open the Vodafone app or Play Store.";
  } else {
    platformHint.textContent = "iOS detected. You'll open the Vodafone app or App Store.";
  }
};

const openService = (serviceKey) => {
  if (!isMobile()) {
    platformHint.textContent = "Desktop detected. Please open this page on your phone.";
    return;
  }

  const service = SERVICES[serviceKey];
  if (!service) return;

  const fallbackUrl = isAndroid() ? STORE_LINKS.android : STORE_LINKS.ios;
  const deeplink = service.deeplink;

  let didHide = false;
  const timeoutId = setTimeout(() => {
    if (!didHide) {
      window.location.href = fallbackUrl;
    }
  }, 900);

  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden) {
        didHide = true;
        clearTimeout(timeoutId);
      }
    },
    { once: true }
  );

  window.location.href = deeplink;
};

const wireUpCards = () => {
  document.querySelectorAll(".card").forEach((card) => {
    const key = card.getAttribute("data-service");
    const button = card.querySelector(".card__cta");
    if (!button) return;

    button.addEventListener("click", () => openService(key));
  });
};

setHint();
wireUpCards();

