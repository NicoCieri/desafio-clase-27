(() => {
  // if query param registerSuccessful is true, show notification
  const urlParams = new URLSearchParams(window.location.search);
  const registerSuccessful = urlParams.get("registerSuccessful");

  if (registerSuccessful === "true") {
    Toastify({
      text: "User registered successfully",
      duration: 10000,
      gravity: "top",
      position: "right",
      backgroundColor: "#4CAF50",
      stopOnFocus: true,
    }).showToast();

    // remove query param
    window.history.replaceState({}, document.title, "/login");
  }
})();
