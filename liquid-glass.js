(() => {
  "use strict";

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const lerp = (start, end, amount) => start + (end - start) * amount;

  const isAppleTouchDevice = () => (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );

  const isStandalone = () => (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );

  const hasGpuBackend = () => {
    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!context) {
        return false;
      }
      context.getExtension("WEBGL_lose_context")?.loseContext();
      return true;
    } catch {
      return false;
    }
  };

  const state = {
    initialized: false,
    loading: false,
    lens: null,
    nav: null,
    drag: null,
    reboundAnimation: null
  };

  let liquidGLLoader = null;

  function loadLiquidGL() {
    if (typeof window.liquidGL === "function") {
      return Promise.resolve();
    }
    if (liquidGLLoader) {
      return liquidGLLoader;
    }

    liquidGLLoader = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "./liquidGL.js";
      script.async = true;
      script.onload = () => {
        if (typeof window.liquidGL === "function") {
          resolve();
        } else {
          reject(new Error("液態玻璃模組未能初始化"));
        }
      };
      script.onerror = () => reject(new Error("液態玻璃模組載入失敗"));
      document.head.append(script);
    });

    return liquidGLLoader;
  }

  function setDragTransform(nav, x, y, velocityX = 0, velocityY = 0) {
    const speed = Math.hypot(velocityX, velocityY);
    const stretchX = clamp(1.03 + speed * 0.022 + Math.abs(x) * 0.0001, 1.03, 1.055);
    const stretchY = clamp(1.03 - speed * 0.014 - Math.abs(y) * 0.00008, 0.995, 1.03);
    nav.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${stretchX}, ${stretchY})`;
  }

  function latestPointerPoint(event) {
    const samples = event.getCoalescedEvents?.();
    return samples?.length ? samples[samples.length - 1] : event;
  }

  function refreshLens() {
    if (!state.lens) {
      return;
    }
    state.lens.updateMetrics();
    state.lens.renderer?.render();
  }

  function releasePointerCapture(nav, pointerId) {
    try {
      if (nav.hasPointerCapture?.(pointerId)) {
        nav.releasePointerCapture(pointerId);
      }
    } catch {
      // Ignore stale pointer captures after Safari cancels a gesture.
    }
  }

  function stopReboundAnimation() {
    if (state.reboundAnimation) {
      state.reboundAnimation.cancel();
      state.reboundAnimation = null;
    }
  }

  function reboundToHome(nav) {
    const drag = state.drag;
    if (!drag) {
      return;
    }

    const startX = drag.x;
    const startY = drag.y;
    const projectedX = clamp(startX + drag.velocityX * 150, drag.minX, drag.maxX);
    const projectedY = clamp(startY + drag.velocityY * 110, drag.minY, drag.maxY);
    const speed = Math.hypot(drag.velocityX, drag.velocityY);

    stopReboundAnimation();
    nav.classList.remove("is-dragging");
    nav.classList.add("is-rebounding");

    state.reboundAnimation = nav.animate(
      [
        {
          transform: `translate3d(${startX}px, ${startY}px, 0) scale(${1.03 + Math.min(speed * 0.03, 0.04)}, ${1.03 - Math.min(speed * 0.018, 0.028)})`,
          boxShadow: "0 24px 52px rgba(0, 0, 0, 0.46), 0 0 42px rgba(84, 86, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.24), inset 0 -1px 0 rgba(0, 0, 0, 0.4)",
          offset: 0
        },
        {
          transform: `translate3d(${projectedX * 0.24}px, ${projectedY * 0.18}px, 0) scale(0.992, 1.012)`,
          boxShadow: "0 21px 46px rgba(0, 0, 0, 0.42), 0 0 36px rgba(84, 86, 255, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.22), inset 0 -1px 0 rgba(0, 0, 0, 0.38)",
          offset: 0.56
        },
        {
          transform: `translate3d(${projectedX * -0.035}px, ${projectedY * -0.028}px, 0) scale(1.008, 0.994)`,
          boxShadow: "0 15px 36px rgba(0, 0, 0, 0.36), 0 0 30px rgba(84, 86, 255, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.36)",
          offset: 0.78
        },
        {
          transform: "translate3d(0, 0, 0) scale(1, 1)",
          boxShadow: "0 14px 34px rgba(0, 0, 0, 0.34), 0 0 28px rgba(84, 86, 255, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.16), inset 0 -1px 0 rgba(0, 0, 0, 0.34)",
          offset: 1
        }
      ],
      {
        duration: 500,
        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        fill: "forwards"
      }
    );

    state.reboundAnimation.finished
      .then(() => {
        nav.style.transform = "";
        nav.classList.remove("is-rebounding");
        state.reboundAnimation = null;
        state.drag = null;
        refreshLens();
      })
      .catch(() => {
        nav.style.transform = "";
        nav.classList.remove("is-rebounding");
        state.drag = null;
      });
  }

  function bindDrag(nav) {
    if (nav.dataset.glassDragBound === "true") {
      return;
    }
    nav.dataset.glassDragBound = "true";

    let suppressClick = false;

    const endDrag = (event) => {
      const drag = state.drag;
      if (!drag || (event?.pointerId !== undefined && event.pointerId !== drag.pointerId)) {
        return;
      }

      releasePointerCapture(nav, drag.pointerId);

      if (!drag.moved) {
        const tabTarget = drag.tabTarget;
        state.drag = null;
        nav.classList.remove("is-dragging");
        if (tabTarget && event?.type !== "pointercancel") {
          suppressClick = true;
          window.setTimeout(() => {
            suppressClick = false;
            tabTarget.click();
          }, 0);
        }
        return;
      }

      suppressClick = true;
      window.setTimeout(() => {
        suppressClick = false;
      }, 320);
      if (event?.cancelable) {
        event.preventDefault();
      }
      reboundToHome(nav);
    };

    nav.addEventListener("pointerdown", (event) => {
      if (event.button !== undefined && event.button !== 0) {
        return;
      }
      if (state.drag) {
        return;
      }

      stopReboundAnimation();
      try {
        nav.setPointerCapture(event.pointerId);
      } catch {
        // Safari may reject capture for synthetic events; native gestures still work.
      }
      const rect = nav.getBoundingClientRect();
      const horizontalRange = Math.max(48, window.innerWidth * 0.28);
      const verticalRange = 96;
      const minX = Math.max(40 - rect.right, -horizontalRange);
      const maxX = Math.min(window.innerWidth - 40 - rect.left, horizontalRange);
      const minY = Math.max(40 - rect.bottom, -verticalRange);
      const maxY = Math.min(window.innerHeight - 40 - rect.top, verticalRange);
      state.drag = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        lastX: event.clientX,
        lastY: event.clientY,
        lastTime: performance.now(),
        x: 0,
        y: 0,
        velocityX: 0,
        velocityY: 0,
        moved: false,
        tabTarget: event.target.closest("[data-tab]"),
        minX,
        maxX,
        minY,
        maxY
      };
    }, { passive: true });

    nav.addEventListener("pointermove", (event) => {
      const drag = state.drag;
      if (!drag || event.pointerId !== drag.pointerId) {
        return;
      }
      const point = latestPointerPoint(event);

      const rawX = point.clientX - drag.startX;
      const rawY = point.clientY - drag.startY;

      if (!drag.moved && Math.hypot(rawX, rawY) < 7) {
        return;
      }

      if (!drag.moved) {
        drag.moved = true;
        nav.classList.add("is-dragging");
      }

      event.preventDefault();

      const now = performance.now();
      const elapsed = Math.max(8, now - drag.lastTime);
      const nextX = clamp(rawX, drag.minX, drag.maxX);
      const nextY = clamp(rawY, drag.minY, drag.maxY);
      drag.velocityX = lerp(drag.velocityX, (point.clientX - drag.lastX) / elapsed, 0.72);
      drag.velocityY = lerp(drag.velocityY, (point.clientY - drag.lastY) / elapsed, 0.72);
      drag.lastX = point.clientX;
      drag.lastY = point.clientY;
      drag.lastTime = now;
      drag.x = nextX;
      drag.y = nextY;

      setDragTransform(nav, nextX, nextY, drag.velocityX, drag.velocityY);
    }, { passive: false });

    nav.addEventListener("pointerup", endDrag, { passive: false });
    nav.addEventListener("pointercancel", endDrag, { passive: false });
    window.addEventListener("blur", () => {
      if (state.drag?.moved) {
        reboundToHome(nav);
      } else {
        state.drag = null;
      }
    });

    nav.addEventListener(
      "click",
      (event) => {
        if (!suppressClick) {
          return;
        }
        event.preventDefault();
        event.stopImmediatePropagation();
        suppressClick = false;
      },
      true
    );
  }

  function initialize(nav) {
    if (!nav) {
      return;
    }

    state.nav = nav;
    bindDrag(nav);

    if (state.initialized) {
      refreshLens();
      return;
    }
    state.initialized = true;

    // Safari 对宽幅固定层的 WebGL 快照较脆弱，独立窗口改用稳定的 CSS 玻璃。
    const allowGpuGlass = !isAppleTouchDevice() && !isStandalone() && hasGpuBackend();
    if (!allowGpuGlass) {
      nav.classList.add("liquid-glass-fallback");
      return;
    }

    state.loading = true;
    loadLiquidGL()
      .then(() => {
        state.lens = window.liquidGL({
          engine: "webgl2",
          snapshot: "body",
          target: "#glassDock",
          resolution: Math.min(window.devicePixelRatio || 1, 1.5),
          refraction: 0.018,
          aberration: 0.012,
          bevelDepth: 0.085,
          bevelWidth: 0.16,
          frost: 0.55,
          shadow: false,
          specular: true,
          reveal: "fade",
          draggable: false,
          interaction: "fluid",
          interactionStrength: 0.58,
          interactionRadius: 0.42,
          interactionViscosity: 0.78,
          tint: "rgba(30, 30, 30, 0.6)"
        });
        nav.classList.remove("liquid-glass-fallback");
        nav.classList.add("liquid-glass-ready");
      })
      .catch((error) => {
        nav.dataset.glassError = error instanceof Error ? error.message : String(error);
        nav.classList.add("liquid-glass-fallback");
      })
      .finally(() => {
        state.loading = false;
        refreshLens();
      });
  }

  function updateTheme(theme) {
    if (!state.lens || typeof state.lens.setTint !== "function") {
      return;
    }
    state.lens.setTint("rgba(30, 30, 30, 0.6)");
    refreshLens();
  }

  window.MyTimetableGlass = {
    initialize,
    updateTheme,
    isAppleTouchDevice,
    isStandalone
  };
})();
