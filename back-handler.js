(function () {
    let backLock = false;

    // Save the current NurseMate screen in browser history
    function saveScreen(screenId) {
        if (!screenId) return;

        const current = history.state?.nurseMateScreen;

        if (current !== screenId) {
            history.pushState(
                { nurseMateScreen: screenId },
                "",
                "#" + screenId
            );
        }
    }

    // Detect which screen is currently visible
    function getCurrentScreen() {
        const screens = document.querySelectorAll(".screen");

        for (const screen of screens) {
            const style = window.getComputedStyle(screen);

            if (
                style.display !== "none" &&
                !screen.classList.contains("hidden")
            ) {
                return screen.id;
            }
        }

        return null;
    }

    // Watch NurseMate screen changes
    const observer = new MutationObserver(() => {
        const screen = getCurrentScreen();

        if (screen && !backLock) {
            saveScreen(screen);
        }
    });

    observer.observe(document.body, {
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class"]
    });

    // Android/browser Back button
    window.addEventListener("popstate", function (event) {
        backLock = true;

        const previousScreen =
            event.state?.nurseMateScreen || "home";

        if (typeof showScreen === "function") {
            showScreen(previousScreen);
        } else if (typeof goHome === "function") {
            goHome();
        }

        setTimeout(() => {
            backLock = false;
        }, 100);
    });

    // Create initial history entry
    window.addEventListener("load", function () {
        const firstScreen = getCurrentScreen() || "home";

        history.replaceState(
            { nurseMateScreen: firstScreen },
            "",
            "#" + firstScreen
        );
    });
})();
