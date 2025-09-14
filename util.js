document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("main-content");
  const reclutamientoBtn = document.getElementById("reclutamiento-btn");
  const editorContainer = document.getElementById("editor-container");
  const editor = document.getElementById("editor");
  const editorControls = document.getElementById("editor-controls");
  const pauseBtn = document.getElementById("pause-btn");
  const restartBtn = document.getElementById("restart-btn");
  const speedUpBtn = document.getElementById("speed-up-btn");
  const speedDownBtn = document.getElementById("speed-down-btn");
  const neoModeBtn = document.getElementById("neo-mode-btn");
  const copyBtn = document.getElementById("copy-btn");
  const scanLine = document.getElementById("scan-line");
  const particlesContainer = document.getElementById("particles");
  const goldenParticlesContainer = document.getElementById("golden-particles");
  const neuralNetwork = document.getElementById("neural-network");
  const dimensionPortal = document.getElementById("dimension-portal");
  const copyNotification = document.getElementById("copy-notification");

  // Variables de control
  let typingInterval;
  let currentIndex = 0;
  let isPaused = false;
  let typingSpeed = 20; // ms por carácter
  let isNeoMode = false;
  let neuralAnimationId = null;
  let originalText = "";

  // Variables para controlar el scroll en móviles
  let isMobile = window.innerWidth <= 480;
  let scrollFactor = isMobile ? 0.5 : 1;
  let lastScrollTop = 0;
  let scrollTimeout;

  // Optimización: Prevenir animaciones cuando no son visibles
  let isPageVisible = true;
  document.addEventListener("visibilitychange", function () {
    isPageVisible = !document.hidden;
    if (!isPageVisible) stopAnimations();
  });

  // Función para ajustar el scroll en dispositivos móviles
  function setupMobileScroll() {
    if (!isMobile) return;

    window.addEventListener(
      "scroll",
      function () {
        clearTimeout(scrollTimeout);

        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const scrollDirection = scrollTop > lastScrollTop ? "down" : "up";

        // Ajustar la posición del scroll según el factor
        if (scrollDirection === "down") {
          window.scrollTo(
            0,
            lastScrollTop + (scrollTop - lastScrollTop) * scrollFactor
          );
        } else {
          window.scrollTo(
            0,
            lastScrollTop - (lastScrollTop - scrollTop) * scrollFactor
          );
        }

        lastScrollTop = scrollTop;

        scrollTimeout = setTimeout(function () {
          lastScrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
        }, 100);
      },
      { passive: false }
    );
  }

  // Crear partículas neurales (optimizado)
  function createParticles(container, color, count, sizeRange, durationRange) {
    // Limpiar contenedor primero
    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");

      if (container === goldenParticlesContainer) {
        particle.classList.add("golden-particle");
      } else {
        particle.classList.add("particle");
      }

      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const size = Math.random() * sizeRange[1] + sizeRange[0];
      const delay = Math.random() * 15;
      const duration =
        Math.random() * (durationRange[1] - durationRange[0]) +
        durationRange[0];

      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;

      if (color) {
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 5px ${color}`;
      }

      container.appendChild(particle);
    }
  }

  // Crear red neuronal (optimizado)
  function createNeuralNetwork() {
    // Limpiar red neuronal existente
    neuralNetwork.innerHTML = "";

    const nodes = [];
    const connections = [];
    const nodeCount = window.innerWidth < 768 ? 12 : 20;

    // Crear nodos
    for (let i = 0; i < nodeCount; i++) {
      const node = document.createElement("div");
      node.classList.add("neural-node");

      const posX = Math.random() * 100;
      const posY = Math.random() * 100;

      node.style.left = `${posX}%`;
      node.style.top = `${posY}%`;

      neuralNetwork.appendChild(node);
      nodes.push({ element: node, x: posX, y: posY });
    }

    // Crear conexiones entre nodos
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        // Solo conectar algunos nodos (30% de probabilidad)
        if (Math.random() < 0.3) {
          const nodeA = nodes[i];
          const nodeB = nodes[j];

          const distance = Math.sqrt(
            Math.pow(nodeB.x - nodeA.x, 2) + Math.pow(nodeB.y - nodeA.y, 2)
          );

          // Solo conectar nodos cercanos
          if (distance < 40) {
            const connection = document.createElement("div");
            connection.classList.add("neural-connection");

            const angle =
              (Math.atan2(nodeB.y - nodeA.y, nodeB.x - nodeA.x) * 180) /
              Math.PI;
            const length = distance;

            connection.style.width = `${length}%`;
            connection.style.left = `${nodeA.x}%`;
            connection.style.top = `${nodeA.y}%`;
            connection.style.transform = `rotate(${angle}deg)`;
            connection.style.opacity = 0.1 + 0.4 * (1 - distance / 40);

            neuralNetwork.appendChild(connection);
            connections.push({ element: connection, nodeA: i, nodeB: j });
          }
        }
      }
    }

    // Animar la red neuronal
    animateNeuralNetwork(nodes, connections);
  }

  // Animar la red neuronal (optimizado para rendimiento)
  function animateNeuralNetwork(nodes, connections) {
    if (!isPageVisible) return;

    let time = 0;
    const centerX = 50;
    const centerY = 50;

    function update() {
      if (!isPageVisible) return;

      time += 0.01;

      // Mover nodos en patrones circulares suaves
      nodes.forEach((node, index) => {
        const angle = time * 0.5 + index * 0.3;
        const radius = 2 + Math.sin(time * 0.2 + index) * 1.5;

        const targetX = centerX + Math.cos(angle) * radius;
        const targetY = centerY + Math.sin(angle) * radius;

        // Suavizar el movimiento
        node.x += (targetX - node.x) * 0.05;
        node.y += (targetY - node.y) * 0.05;

        // Usar transform para mejor rendimiento
        node.element.style.transform = `translate(${node.x}%, ${node.y}%)`;
      });

      // Actualizar conexiones
      connections.forEach((conn) => {
        const nodeA = nodes[conn.nodeA];
        const nodeB = nodes[conn.nodeB];

        const distance = Math.sqrt(
          Math.pow(nodeB.x - nodeA.x, 2) + Math.pow(nodeB.y - nodeA.y, 2)
        );

        // Actualizar opacidad basada en la distancia
        if (distance < 40) {
          conn.element.style.opacity = 0.1 + 0.4 * (1 - distance / 40);
        } else {
          conn.element.style.opacity = "0";
        }
      });

      neuralAnimationId = requestAnimationFrame(update);
    }

    neuralAnimationId = requestAnimationFrame(update);
  }

  // Detener animaciones cuando no son visibles
  function stopAnimations() {
    if (neuralAnimationId) {
      cancelAnimationFrame(neuralAnimationId);
      neuralAnimationId = null;
    }
  }

  // Efecto de transición dimensional
  function activateDimensionPortal() {
    dimensionPortal.classList.add("portal-active");

    setTimeout(() => {
      dimensionPortal.classList.remove("portal-active");

      // Cambiar a modo Neo después de la transición
      toggleNeoMode();
    }, 1000);
  }

  // Alternar modo Neo (efecto Matrix)
  function toggleNeoMode() {
    isNeoMode = !isNeoMode;

    if (isNeoMode) {
      document.body.style.backgroundColor = "#000";
      document.querySelector(".cyber-background").style.background = "#000";
      document.querySelector(".grid-overlay").style.backgroundImage =
        "linear-gradient(rgba(0, 255, 76, 0.1) 1px, transparent 1px), " +
        "linear-gradient(90deg, rgba(0, 255, 76, 0.1) 1px, transparent 1px)";

      scanLine.style.background =
        "linear-gradient(to right, transparent, var(--matrix-green), transparent)";
      scanLine.style.boxShadow =
        "0 0 15px var(--matrix-green), 0 0 30px var(--matrix-green)";

      editor.style.color = "#00ff4c";
      document.querySelector(".editor-title").style.color = "#00ff4c";

      neoModeBtn.textContent = "MODO STANDARD";

      // Cambiar color de partículas a verde en modo Neo
      createParticles(
        particlesContainer,
        "var(--matrix-green)",
        window.innerWidth < 768 ? 25 : 50,
        [1, 3],
        [15, 25]
      );
    } else {
      document.body.style.backgroundColor = "var(--azul-oscuro)";
      document.querySelector(".cyber-background").style.background =
        "linear-gradient(135deg, #0a192f 0%, #0d1f3a 50%, #112240 100%)";
      document.querySelector(".grid-overlay").style.backgroundImage =
        "linear-gradient(rgba(100, 255, 218, 0.03) 1px, transparent 1px), " +
        "linear-gradient(90deg, rgba(100, 255, 218, 0.03) 1px, transparent 1px)";

      scanLine.style.background =
        "linear-gradient(to right, transparent, var(--azul-claro), transparent)";
      scanLine.style.boxShadow =
        "0 0 15px var(--azul-claro), 0 0 30px var(--azul-claro)";

      editor.style.color = "var(--texto-claro)";
      document.querySelector(".editor-title").style.color = "var(--azul-claro)";

      neoModeBtn.textContent = "MODO NEO";

      // Restaurar color original de partículas
      createParticles(
        particlesContainer,
        "var(--cyan-hologram)",
        window.innerWidth < 768 ? 25 : 50,
        [1, 3],
        [15, 25]
      );
    }
  }

  // Función para copiar texto al portapapeles
  function copyTextToClipboard() {
    // Obtener el texto sin el cursor
    const textToCopy = editor.textContent.replace("█", "");

    // Usar la API del portapapeles
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        // Mostrar notificación de copiado
        copyNotification.classList.add("show");

        // Ocultar notificación después de 2 segundos
        setTimeout(() => {
          copyNotification.classList.remove("show");
        }, 2000);
      })
      .catch((err) => {
        console.error("Error al copiar texto: ", err);
        // Fallback para navegadores más antiguos
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
          copyNotification.classList.add("show");
          setTimeout(() => {
            copyNotification.classList.remove("show");
          }, 2000);
        } catch (err) {
          console.error("Fallback: Error al copiar texto: ", err);
        }
        document.body.removeChild(textArea);
      });
  }

  // Ocultar loader y mostrar contenido principal
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
      mainContent.style.display = "flex"; // Cambiado a flex para que funcione correctamente
      setTimeout(() => {
        mainContent.style.opacity = "1";
      }, 50);

      // Configurar scroll para móviles
      setupMobileScroll();

      // Crear efectos de partículas
      createParticles(
        particlesContainer,
        "var(--cyan-hologram)",
        window.innerWidth < 768 ? 25 : 50,
        [1, 3],
        [15, 25]
      );
      createParticles(
        goldenParticlesContainer,
        "var(--golden)",
        window.innerWidth < 768 ? 10 : 20,
        [1, 2],
        [20, 30]
      );

      // Crear red neuronal
      createNeuralNetwork();
    }, 500);
  }, 2500);

  // Texto a mostrar en el editor
  originalText = [
    "=====================================================",
    "",
    "¡Bienvenidos al Proyecto SerakDep MS (SMS)!",
    "",
    "=====================================================",
    "",
    "Nos complace darles la bienvenida a esta iniciativa",
    "innovadora que busca revolucionar las comunicaciones",
    "tecnológicas. Este proyecto está diseñado específica-",
    "mente para programadores que deseen explorar nuevas",
    "fronteras del conocimiento y colaborar en un entorno",
    "de crecimiento mutuo. SerakDep MS será la llave que",
    "abrirá las puertas hacia un nuevo mundo de oportunid-",
    "ades tecnológicas, donde las herramientas más recono-",
    "cidas a nivel global serán puestas en práctica para",
    "crear soluciones innovadoras y accesibles.",
    "",
    "",
    "Este proyecto representa una etapa fundamental de",
    "desarrollo profesional y personal para cada uno de",
    "los participantes. Aquí no solo aprenderán técnicas",
    "avanzadas de programación, sino que también formarán",
    "parte de una comunidad colaborativa que valora el",
    "intercambio de conocimientos y la creatividad. ",
    "El trabajo en equipo y la capacidad de adaptación",
    "serán clave para lograr los objetivos propuestos.",
    "",
    "",
    "Para ser parte de SerakDep MS, es necesario cumplir",
    "con ciertos requisitos:",
    "conocimientos sólidos en desarrollo web básico",
    "(HTML, CSS, JavaScript), experiencia en el uso de",
    "frameworks como React or Vue.js, manejo de control",
    "de versiones con Git, y habilidad para trabajar en",
    "equipo. Además, valoramos la creatividad y la",
    "disposición para aprender y compartir ideas con",
    "otros profesionales.",
    "",
    "",
    "Si cumples con estos requisitos y estás listo para",
    "unirte a un proyecto transformador,",
    "¡esta es tu oportunidad!",
    "Agradecemos tu interés y esperamos contar con tu ",
    "talento para construir juntos el futuro de las comun-",
    "icaciones tecnológicas.",
    "",
    "",
    "=====================================================",
    "",
    "Atentamente,",
    "¬†¨®¢§¶¿°†¡£¥¦¥©±²³´",
    "",
    "=====================================================",
    "",
    "Un número clave está oculto tras tres capas de cifrado.",
    "Tu misión es encontrarlo. Si lo logras, estás listo para",
    "el siguiente nivel.",
    "",
    "Pista inicial:",
    "",
    "a9c3f1b7e6d8c4a1f2b7d3e9c6a4f1b8d7e2c3a9f0b6d1e4c8f3a2b5d6e7f9a0",
    "",
    "Pistas adicionales:",
    "",
    "RWwgbsO6bWVybyBvcmlnaW5hbCBlc3TDoSBlbiBmb3JtYXRvIGludGVybmFjaW9uYWwu",
    "",
    "U2UgY29kaWZpY8OzIHByaW1lcm8gZW4gQmFzZTY0LiBkYW1lIGVzdGUgdGV4dG8gZW4gYmFzZTY0",
    "",
    "THVlZ28gc2UgY2lmacOzIGNvbiBBRVMtQ0JDIHVzYW5kbyB1bmEgY2xhdmUgZGUgMjQgYnl0ZXM=",
    "",
    "RmluYWxtZW50ZSwgc2UgYXBsaWNvw7MgU0hBLTI1NiBhbCBibG9xdWUgY2lmcmFkby4=",
    "",
    "RWwgSVYgdXNhZG8gZnVlIGZpam86IDE2IGJ5dGVzIGRlIGNlcm9z",
    "",
    "TGEgY2xhdmUgQUVTIGVzOiBNaUNsYXZlVWx0cmFTZWNyZXRhMTIzNDU2Nzg=",
    "",
    "如果你成功获得了电话号码，",
    "那么你刚刚完成了第一阶段。接下来在第二阶段，",
    "你需要获取一个秘密验证码，",
    "该验证码将用于确认你被选为SMS项目的合作者之一。",
    "",
    "",
    "以下代码被加密了3次，请找出其内容。",
    "",
    "VEtGTUIgUVROR2MrQkxjSWdFbGRIZEdsdm9XRnNhWE4wTWk0UT09",
    "",
    "",
    "“Python是程序设计中最大秘密的钥匙” - MDA",
    "",
    "=====================================================",
  ].join("\n");

  // Función para mostrar el texto con efecto de escritura
  function typeCode() {
    reclutamientoBtn.style.display = "none";
    editorContainer.style.display = "block";
    editorControls.style.opacity = "1";
    scanLine.style.display = "block";

    setTimeout(() => {
      editorContainer.style.opacity = "1";
      editorContainer.style.transform = "translateY(0) rotateX(0)";
    }, 100);

    editor.innerHTML = "";
    currentIndex = 0;
    isPaused = false;

    clearInterval(typingInterval);

    typingInterval = setInterval(() => {
      if (!isPaused && currentIndex < originalText.length) {
        if (originalText.charAt(currentIndex) === "\n") {
          editor.innerHTML += "\n";
        } else {
          editor.innerHTML += originalText.charAt(currentIndex);
        }

        currentIndex++;

        // Añadir cursor al final
        editor.innerHTML = editor.innerHTML.replace(
          /<span class="cursor"><\/span>/,
          ""
        );
        editor.innerHTML += '<span class="cursor"></span>';

        editor.scrollTop = editor.scrollHeight;
      } else if (currentIndex >= originalText.length) {
        clearInterval(typingInterval);
        // Eliminar cursor al finalizar
        editor.innerHTML = editor.innerHTML.replace(
          /<span class="cursor"><\/span>/,
          ""
        );
      }
    }, typingSpeed);
  }

  // Función para pausar/reanudar
  function togglePause() {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? "REANUDAR" : "PAUSAR";
  }

  // Función para reiniciar
  function restartTyping() {
    clearInterval(typingInterval);
    typeCode();
  }

  // Función para ajustar velocidad
  function adjustSpeed(factor) {
    clearInterval(typingInterval);
    typingSpeed = Math.max(5, Math.min(100, typingSpeed * factor));

    if (currentIndex > 0 && currentIndex < originalText.length) {
      typingInterval = setInterval(() => {
        if (!isPaused && currentIndex < originalText.length) {
          if (originalText.charAt(currentIndex) === "\n") {
            editor.innerHTML += "\n";
          } else {
            editor.innerHTML += originalText.charAt(currentIndex);
          }

          currentIndex++;

          editor.innerHTML = editor.innerHTML.replace(
            /<span class="cursor"><\/span>/,
            ""
          );
          editor.innerHTML += '<span class="cursor"></span>';

          editor.scrollTop = editor.scrollHeight;
        } else if (currentIndex >= originalText.length) {
          clearInterval(typingInterval);
          editor.innerHTML = editor.innerHTML.replace(
            /<span class="cursor"><\/span>/,
            ""
          );
        }
      }, typingSpeed);
    }
  }

  // Event listeners
  reclutamientoBtn.addEventListener("click", typeCode);
  pauseBtn.addEventListener("click", togglePause);
  restartBtn.addEventListener("click", restartTyping);
  speedUpBtn.addEventListener("click", () => adjustSpeed(0.7));
  speedDownBtn.addEventListener("click", () => adjustSpeed(1.3));
  neoModeBtn.addEventListener("click", activateDimensionPortal);
  copyBtn.addEventListener("click", copyTextToClipboard);

  // Prevenir zoom en dispositivos móviles al hacer doble tap
  let lastTouchEnd = 0;
  document.addEventListener(
    "touchend",
    function (event) {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    false
  );

  // Detectar cambios de orientación y tamaño
  window.addEventListener("resize", function () {
    isMobile = window.innerWidth <= 480;
    scrollFactor = isMobile ? 0.5 : 1;

    // Recrear efectos al redimensionar
    createParticles(
      particlesContainer,
      isNeoMode ? "var(--matrix-green)" : "var(--cyan-hologram)",
      window.innerWidth < 768 ? 25 : 50,
      [1, 3],
      [15, 25]
    );
    createParticles(
      goldenParticlesContainer,
      "var(--golden)",
      window.innerWidth < 768 ? 10 : 20,
      [1, 2],
      [20, 30]
    );
    createNeuralNetwork();
  });
});
