
(function zgatto() {
    const gattoEl = document.createElement("div");
    let gattoPosX = 32;
    let gattoPosY = 32;
    let mousePosX = 0;
    let mousePosY = 0;
    const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
    if (isReduced) {
      return;
    }
  
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation = null;
    let idleAnimationFrame = 0;
    const gattoSpeed = 10;
    const spriteSets = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratchSelf: [
        [-5, 0],
        [-6, 0],
        [-7, 0],
      ],
      scratchWallN: [
        [0, 0],
        [0, -1],
      ],
      scratchWallS: [
        [-7, -1],
        [-6, -2],
      ],
      scratchWallE: [
        [-2, -2],
        [-2, -3],
      ],
      scratchWallW: [
        [-4, 0],
        [-4, -1],
      ],
      tired: [[-3, -2]],
      sleeping: [
        [-2, 0],
        [-2, -1],
      ],
      N: [
        [-1, -2],
        [-1, -3],
      ],
      NE: [
        [0, -2],
        [0, -3],
      ],
      E: [
        [-3, 0],
        [-3, -1],
      ],
      SE: [
        [-5, -1],
        [-5, -2],
      ],
      S: [
        [-6, -3],
        [-7, -2],
      ],
      SW: [
        [-5, -3],
        [-6, -1],
      ],
      W: [
        [-4, -2],
        [-4, -3],
      ],
      NW: [
        [-1, 0],
        [-1, -1],
      ],
    };
  
    function create() {
      gattoEl.id = "onegatto";
      gattoEl.style.width = "32px";
      gattoEl.style.height = "32px";
      gattoEl.style.position = "fixed";
      gattoEl.style.pointerEvents = "none";
      gattoEl.style.backgroundImage = "url('../images/zgatto.gif')";
      gattoEl.style.imageRendering = "pixelated";
      gattoEl.style.left = `${gattoPosX - 16}px`;
      gattoEl.style.top = `${gattoPosY - 16}px`;
      gattoEl.style.zIndex = "999";
  
      document.body.appendChild(gattoEl);
  
      document.onmousemove = (event) => {
        mousePosX = event.clientX;
        mousePosY = event.clientY;
      };
  
      window.onegattoInterval = setInterval(frame, 100);
    }
  
    function setSprite(name, frame) {
      const sprite = spriteSets[name][frame % spriteSets[name].length];
      gattoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    }
  
    function resetIdleAnimation() {
      idleAnimation = null;
      idleAnimationFrame = 0;
    }
  
    function idle() {
      idleTime += 1;
  
      // every ~ 20 seconds
      if (
        idleTime > 10 &&
        Math.floor(Math.random() * 200) == 0 &&
        idleAnimation == null
      ) {
        let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
        if (gattoPosX < 32) {
          avalibleIdleAnimations.push("scratchWallW");
        }
        if (gattoPosY < 32) {
          avalibleIdleAnimations.push("scratchWallN");
        }
        if (gattoPosX > window.innerWidth - 32) {
          avalibleIdleAnimations.push("scratchWallE");
        }
        if (gattoPosY > window.innerHeight - 32) {
          avalibleIdleAnimations.push("scratchWallS");
        }
        idleAnimation =
          avalibleIdleAnimations[
            Math.floor(Math.random() * avalibleIdleAnimations.length)
          ];
      }
  
      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) {
            resetIdleAnimation();
          }
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) {
            resetIdleAnimation();
          }
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleAnimationFrame += 1;
    }
  
    function frame() {
      frameCount += 1;
      const diffX = gattoPosX - mousePosX;
      const diffY = gattoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);
  
      if (distance < gattoSpeed || distance < 48) {
        idle();
        return;
      }
  
      idleAnimation = null;
      idleAnimationFrame = 0;
  
      if (idleTime > 1) {
        setSprite("alert", 0);
        // count down after being alerted before moving
        idleTime = Math.min(idleTime, 7);
        idleTime -= 1;
        return;
      }
  
      direction = diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite(direction, frameCount);
  
      gattoPosX -= (diffX / distance) * gattoSpeed;
      gattoPosY -= (diffY / distance) * gattoSpeed;
  
      gattoPosX = Math.min(Math.max(16, gattoPosX), window.innerWidth - 16);
      gattoPosY = Math.min(Math.max(16, gattoPosY), window.innerHeight - 16);
  
      gattoEl.style.left = `${gattoPosX - 16}px`;
      gattoEl.style.top = `${gattoPosY - 16}px`;
    }
  
    create();
  })();
  