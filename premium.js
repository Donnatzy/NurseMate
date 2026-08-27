/* =========================================================
   NurseMate Premium System
   Version 1.0

   This file is designed to work alongside the existing
   NurseMate index.html without replacing it.

   Premium status can later be connected to Supabase and
   Paystack verification.
   ========================================================= */

(function () {
    "use strict";

    /* ---------------------------------------------------------
       NURSEMATE PREMIUM CONFIGURATION
       --------------------------------------------------------- */

    const PremiumSystem = {

        /* Current user status */
        isPremium: false,

        /* Storage key */
        storageKey: "nursemate_premium_status",

        /* -----------------------------------------------------
           INITIALIZE
           ----------------------------------------------------- */

        init: function () {
            this.loadStatus();
            this.updatePremiumUI();
            this.setupUpgradeButtons();
            this.setupPremiumContent();
            this.setupAdPlaceholders();

            console.log("NurseMate Premium System loaded.");
            console.log(
                "Premium status:",
                this.isPremium ? "PREMIUM" : "FREE"
            );
        },

        /* -----------------------------------------------------
           LOAD PREMIUM STATUS
           ----------------------------------------------------- */

        loadStatus: function () {

            try {

                const savedStatus =
                    localStorage.getItem(this.storageKey);

                if (savedStatus === "premium") {
                    this.isPremium = true;
                } else {
                    this.isPremium = false;
                }

            } catch (error) {

                console.warn(
                    "Could not read premium status:",
                    error
                );

                this.isPremium = false;
            }
        },

        /* -----------------------------------------------------
           SET PREMIUM STATUS
           ----------------------------------------------------- */

        setPremiumStatus: function (status) {

            this.isPremium = Boolean(status);

            try {

                localStorage.setItem(
                    this.storageKey,
                    this.isPremium
                        ? "premium"
                        : "free"
                );

            } catch (error) {

                console.warn(
                    "Could not save premium status:",
                    error
                );
            }

            this.updatePremiumUI();
            this.setupPremiumContent();
            this.setupAdPlaceholders();
        },

        /* -----------------------------------------------------
           CHECK PREMIUM STATUS
           ----------------------------------------------------- */

        checkPremium: function () {
            return this.isPremium === true;
        },

        /* -----------------------------------------------------
           PREMIUM BADGE / USER STATUS
           ----------------------------------------------------- */

        updatePremiumUI: function () {

            const badges =
                document.querySelectorAll(
                    "[data-premium-status]"
                );

            badges.forEach(function (badge) {

                if (PremiumSystem.isPremium) {

                    badge.innerHTML =
                        "👑 Premium";

                    badge.classList.add(
                        "nursemate-premium-active"
                    );

                    badge.classList.remove(
                        "nursemate-free-user"
                    );

                } else {

                    badge.innerHTML =
                        "Free";

                    badge.classList.add(
                        "nursemate-free-user"
                    );

                    badge.classList.remove(
                        "nursemate-premium-active"
                    );
                }
            });

            /* Optional premium body class */

            if (document.body) {

                document.body.classList.toggle(
                    "nursemate-is-premium",
                    PremiumSystem.isPremium
                );

                document.body.classList.toggle(
                    "nursemate-is-free",
                    !PremiumSystem.isPremium
                );
            }
        },

        /* -----------------------------------------------------
           PREMIUM CONTENT LOCKING
           ----------------------------------------------------- */

        setupPremiumContent: function () {

            const premiumItems =
                document.querySelectorAll(
                    "[data-premium]"
                );

            premiumItems.forEach(function (item) {

                if (PremiumSystem.isPremium) {

                    item.classList.remove(
                        "nursemate-premium-locked"
                    );

                    item.removeAttribute(
                        "aria-disabled"
                    );

                    item.style.pointerEvents = "";
                    item.style.opacity = "";

                    const lockMessage =
                        item.querySelector(
                            ".nursemate-lock-message"
                        );

                    if (lockMessage) {
                        lockMessage.remove();
                    }

                } else {

                    item.classList.add(
                        "nursemate-premium-locked"
                    );

                    item.setAttribute(
                        "aria-disabled",
                        "true"
                    );

                    /* Add visual lock message */

                    if (
                        !item.querySelector(
                            ".nursemate-lock-message"
                        )
                    ) {

                        const message =
                            document.createElement("div");

                        message.className =
                            "nursemate-lock-message";

                        message.innerHTML = `
                            <div class="nursemate-lock-icon">
                                🔒
                            </div>

                            <strong>Premium Content</strong>

                            <p>
                                Upgrade to NurseMate Premium
                                to access this content.
                            </p>

                            <button
                                type="button"
                                class="nursemate-upgrade-btn"
                                onclick="PremiumSystem.showUpgrade()"
                            >
                                👑 Upgrade to Premium
                            </button>
                        `;

                        item.appendChild(message);
                    }
                }
            });
        },

        /* -----------------------------------------------------
           UPGRADE BUTTONS
           ----------------------------------------------------- */

        setupUpgradeButtons: function () {

            const buttons =
                document.querySelectorAll(
                    "[data-upgrade-premium]"
                );

            buttons.forEach(function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        PremiumSystem.showUpgrade();
                    }
                );
            });
        },

        /* -----------------------------------------------------
           SHOW UPGRADE
           ----------------------------------------------------- */

        showUpgrade: function () {

            if (this.isPremium) {

                alert(
                    "You already have NurseMate Premium 👑"
                );

                return;
            }

            /* If a payment modal already exists,
               open it instead of creating another one. */

            let modal =
                document.getElementById(
                    "nursemate-premium-modal"
                );

            if (!modal) {

                modal =
                    this.createUpgradeModal();
            }

            modal.style.display = "flex";
        },

        /* -----------------------------------------------------
           CREATE UPGRADE MODAL
           ----------------------------------------------------- */

        createUpgradeModal: function () {

            const modal =
                document.createElement("div");

            modal.id =
                "nursemate-premium-modal";

            modal.className =
                "nursemate-premium-modal";

            modal.innerHTML = `

                <div class="nursemate-premium-modal-box">

                    <button
                        type="button"
                        class="nursemate-premium-close"
                        onclick="PremiumSystem.closeUpgrade()"
                        aria-label="Close"
                    >
                        ×
                    </button>

                    <div class="nursemate-premium-crown">
                        👑
                    </div>

                    <h2>
                        NurseMate Premium
                    </h2>

                    <p class="nursemate-premium-subtitle">
                        Unlock the full NurseMate experience.
                    </p>

                    <div class="nursemate-premium-features">

                        <div>
                            ✓ Access premium study materials
                        </div>

                        <div>
                            ✓ Unlock premium nursing content
                        </div>

                        <div>
                            ✓ Ad-free premium experience
                        </div>

                        <div>
                            ✓ Future premium features
                        </div>

                    </div>

                    <button
                        type="button"
                        class="nursemate-paystack-button"
                        onclick="PremiumSystem.startPayment()"
                    >
                        💳 Upgrade to Premium
                    </button>

                    <p class="nursemate-payment-note">
                        Secure payment powered by Paystack.
                    </p>

                </div>
            `;

            document.body.appendChild(modal);

            return modal;
        },

        /* -----------------------------------------------------
           CLOSE UPGRADE MODAL
           ----------------------------------------------------- */

        closeUpgrade: function () {

            const modal =
                document.getElementById(
                    "nursemate-premium-modal"
                );

            if (modal) {
                modal.style.display = "none";
            }
        },

        /* -----------------------------------------------------
           PAYMENT PLACEHOLDER
           
           IMPORTANT:
           Paystack will be connected here later.
           Do NOT add your Paystack secret key here.
           ----------------------------------------------------- */

        startPayment: function () {

            alert(
                "Premium payment setup is coming next.\n\n" +
                "We will connect this button to Paystack " +
                "and verify the payment securely before " +
                "activating Premium."
            );

            console.log(
                "Paystack payment initialization placeholder."
            );
        },

        /* -----------------------------------------------------
           FREE USER AD PLACEHOLDERS
           ----------------------------------------------------- */

        setupAdPlaceholders: function () {

            const ads =
                document.querySelectorAll(
                    "[data-ad-placeholder]"
                );

            ads.forEach(function (ad) {

                if (PremiumSystem.isPremium) {

                    ad.style.display = "none";

                } else {

                    ad.style.display = "block";

                    if (
                        !ad.dataset.adInitialized
                    ) {

                        ad.innerHTML = `
                            <div class="nursemate-ad-placeholder">

                                <span>
                                    Advertisement
                                </span>

                            </div>
                        `;

                        ad.dataset.adInitialized =
                            "true";
                    }
                }
            });
        },

        /* -----------------------------------------------------
           PROTECT CLICKABLE PREMIUM CONTENT
           ----------------------------------------------------- */

        protectElement: function (element) {

            if (!element) return;

            element.addEventListener(
                "click",
                function (event) {

                    if (
                        !PremiumSystem.isPremium
                    ) {

                        event.preventDefault();
                        event.stopPropagation();

                        PremiumSystem.showUpgrade();
                    }
                }
            );
        },

        /* -----------------------------------------------------
           MANUAL PREMIUM CHECK
           ----------------------------------------------------- */

        requirePremium: function (callback) {

            if (this.isPremium) {

                if (
                    typeof callback ===
                    "function"
                ) {

                    callback();
                }

                return true;
            }

            this.showUpgrade();

            return false;
        }
    };


    /* ---------------------------------------------------------
       MAKE SYSTEM AVAILABLE GLOBALLY
       --------------------------------------------------------- */

    window.PremiumSystem =
        PremiumSystem;


    /* ---------------------------------------------------------
       START WHEN PAGE IS READY
       --------------------------------------------------------- */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            function () {
                PremiumSystem.init();
            }
        );

    } else {

        PremiumSystem.init();
    }


})();
