// Wormhole Perspective with Particle Shuttle Animation
// 虫洞视角 - 粒子穿梭动画

class WormholeAnimation {
  constructor() {
    this.canvas = null;
    this.gl = null;
    this.program = null;
    this.particles = [];
    this.time = 0;
    this.controls = {};
    this.uniforms = {};

    this.init();
    this.setupControls();
    this.animate();
  }

  init() {
    // Create canvas
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.position = "absolute";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.zIndex = "1";
    document.getElementById("container").appendChild(this.canvas);

    // Get WebGL context
    this.gl =
      this.canvas.getContext("webgl") ||
      this.canvas.getContext("experimental-webgl");

    if (!this.gl) {
      console.error("WebGL not supported");
      document.getElementById("info").innerHTML =
        "<h2>Error: WebGL not supported</h2><p>Your browser does not support WebGL.</p>";
      return;
    }

    // Create shaders and program
    this.createShaders();
    this.createParticles();

    // Handle window resize
    window.addEventListener("resize", () => this.onWindowResize());
  }

  createShaders() {
    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      attribute float a_size;
      attribute vec3 a_color;
      attribute float a_life;
      
      uniform float u_time;
      uniform float u_speed;
      uniform float u_tunnelDepth;
      uniform vec2 u_resolution;
      
      varying vec3 v_color;
      varying float v_life;
      varying float v_size;
      
      void main() {
        v_color = a_color;
        v_life = a_life;
        v_size = a_size;
        
        vec2 pos = a_position;
        
        // Create wormhole tunnel effect
        float tunnelRadius = length(pos) * u_tunnelDepth;
        float tunnelZ = 0.0 + u_time * u_speed * 2.0;
        
        // Spiral motion
        float angle = atan(pos.y, pos.x) + u_time * u_speed * 0.5;
        float spiralRadius = tunnelRadius * (1.0 + 0.3 * sin(angle * 3.0 + u_time * u_speed));
        
        pos.x = spiralRadius * cos(angle);
        pos.y = spiralRadius * sin(angle);
        
        // Convert to clip space
        vec2 clipSpace = ((pos / u_resolution) * 2.0) - 1.0;
        gl_Position = vec4(clipSpace, 0.0, 1.0);
        gl_PointSize = a_size * 2.0;
      }
    `;

    // Fragment shader
    const fragmentShaderSource = `
      precision mediump float;
      
      uniform float u_time;
      uniform vec3 u_color1;
      uniform vec3 u_color2;
      
      varying vec3 v_color;
      varying float v_life;
      varying float v_size;
      
      void main() {
        // Create circular particle
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);
        
        if (dist > 0.5) discard;
        
        // Glow effect
        float alpha = (1.0 - dist * 2.0) * (0.8 + 0.2 * sin(u_time * 5.0 + v_life * 10.0));
        
        // Color mixing based on life
        vec3 baseColor = mix(u_color1, u_color2, v_life);
        vec3 finalColor = mix(baseColor, v_color, 0.7);
        
        // Add pulsing effect
        finalColor *= (0.8 + 0.2 * sin(u_time * 3.0 + v_life * 8.0));
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    // Create shaders
    const vertexShader = this.createShader(
      this.gl.VERTEX_SHADER,
      vertexShaderSource
    );
    const fragmentShader = this.createShader(
      this.gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    // Create program
    this.program = this.gl.createProgram();
    this.gl.attachShader(this.program, vertexShader);
    this.gl.attachShader(this.program, fragmentShader);
    this.gl.linkProgram(this.program);

    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      console.error(
        "Program linking failed:",
        this.gl.getProgramInfoLog(this.program)
      );
    }

    this.gl.useProgram(this.program);

    // Get attribute and uniform locations
    this.attribLocations = {
      position: this.gl.getAttribLocation(this.program, "a_position"),
      size: this.gl.getAttribLocation(this.program, "a_size"),
      color: this.gl.getAttribLocation(this.program, "a_color"),
      life: this.gl.getAttribLocation(this.program, "a_life"),
    };

    this.uniformLocations = {
      time: this.gl.getUniformLocation(this.program, "u_time"),
      speed: this.gl.getUniformLocation(this.program, "u_speed"),
      tunnelDepth: this.gl.getUniformLocation(this.program, "u_tunnelDepth"),
      resolution: this.gl.getUniformLocation(this.program, "u_resolution"),
      color1: this.gl.getUniformLocation(this.program, "u_color1"),
      color2: this.gl.getUniformLocation(this.program, "u_color2"),
    };

    // Set initial uniforms
    this.gl.uniform2f(
      this.uniformLocations.resolution,
      this.canvas.width,
      this.canvas.height
    );
    this.gl.uniform1f(this.uniformLocations.speed, 1.0);
    this.gl.uniform1f(this.uniformLocations.tunnelDepth, 1.5);
    this.gl.uniform3f(this.uniformLocations.color1, 1.0, 0.4, 0.2); // Orange
    this.gl.uniform3f(this.uniformLocations.color2, 0.0, 0.8, 1.0); // Cyan
  }

  createShader(type, source) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error(
        "Shader compilation failed:",
        this.gl.getShaderInfoLog(shader)
      );
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  createParticles() {
    const particleCount = 2000;
    this.particles = [];

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
        size: Math.random() * 3 + 1,
        color: [
          Math.random() < 0.3 ? 1.0 : Math.random() < 0.6 ? 0.0 : 1.0,
          Math.random() < 0.3 ? 0.2 : Math.random() < 0.6 ? 0.8 : 0.6,
          Math.random() < 0.3 ? 0.8 : Math.random() < 0.6 ? 1.0 : 0.0,
        ],
        life: Math.random(),
      });
    }
  }

  setupControls() {
    this.controls.speed = document.getElementById("speed");
    this.controls.particleCount = document.getElementById("particleCount");
    this.controls.tunnelDepth = document.getElementById("tunnelDepth");
    this.controls.color1 = document.getElementById("color1");
    this.controls.color2 = document.getElementById("color2");

    // Add event listeners
    this.controls.speed.addEventListener("input", (e) => {
      this.gl.uniform1f(
        this.uniformLocations.speed,
        parseFloat(e.target.value)
      );
    });

    this.controls.tunnelDepth.addEventListener("input", (e) => {
      this.gl.uniform1f(
        this.uniformLocations.tunnelDepth,
        parseFloat(e.target.value)
      );
    });

    this.controls.color1.addEventListener("input", (e) => {
      const color = this.hexToRgb(e.target.value);
      this.gl.uniform3f(
        this.uniformLocations.color1,
        color.r,
        color.g,
        color.b
      );
    });

    this.controls.color2.addEventListener("input", (e) => {
      const color = this.hexToRgb(e.target.value);
      this.gl.uniform3f(
        this.uniformLocations.color2,
        color.r,
        color.g,
        color.b
      );
    });

    this.controls.particleCount.addEventListener("input", (e) => {
      this.updateParticleCount(parseInt(e.target.value));
    });
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16) / 255,
          g: parseInt(result[2], 16) / 255,
          b: parseInt(result[3], 16) / 255,
        }
      : null;
  }

  updateParticleCount(count) {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
        size: Math.random() * 3 + 1,
        color: [
          Math.random() < 0.3 ? 1.0 : Math.random() < 0.6 ? 0.0 : 1.0,
          Math.random() < 0.3 ? 0.2 : Math.random() < 0.6 ? 0.8 : 0.6,
          Math.random() < 0.3 ? 0.8 : Math.random() < 0.6 ? 1.0 : 0.0,
        ],
        life: Math.random(),
      });
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    this.time += 0.016; // ~60fps

    // Clear canvas
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    // Enable blending for glow effect
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE);

    // Set time uniform
    this.gl.uniform1f(this.uniformLocations.time, this.time);

    // Draw particles
    this.particles.forEach((particle) => {
      // Create buffers for this particle
      const positionBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        new Float32Array([particle.x, particle.y]),
        this.gl.STATIC_DRAW
      );

      const sizeBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, sizeBuffer);
      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        new Float32Array([particle.size]),
        this.gl.STATIC_DRAW
      );

      const colorBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        new Float32Array(particle.color),
        this.gl.STATIC_DRAW
      );

      const lifeBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, lifeBuffer);
      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        new Float32Array([particle.life]),
        this.gl.STATIC_DRAW
      );

      // Set attributes
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
      this.gl.enableVertexAttribArray(this.attribLocations.position);
      this.gl.vertexAttribPointer(
        this.attribLocations.position,
        2,
        this.gl.FLOAT,
        false,
        0,
        0
      );

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, sizeBuffer);
      this.gl.enableVertexAttribArray(this.attribLocations.size);
      this.gl.vertexAttribPointer(
        this.attribLocations.size,
        1,
        this.gl.FLOAT,
        false,
        0,
        0
      );

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
      this.gl.enableVertexAttribArray(this.attribLocations.color);
      this.gl.vertexAttribPointer(
        this.attribLocations.color,
        3,
        this.gl.FLOAT,
        false,
        0,
        0
      );

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, lifeBuffer);
      this.gl.enableVertexAttribArray(this.attribLocations.life);
      this.gl.vertexAttribPointer(
        this.attribLocations.life,
        1,
        this.gl.FLOAT,
        false,
        0,
        0
      );

      // Draw point
      this.gl.drawArrays(this.gl.POINTS, 0, 1);

      // Clean up
      this.gl.deleteBuffer(positionBuffer);
      this.gl.deleteBuffer(sizeBuffer);
      this.gl.deleteBuffer(colorBuffer);
      this.gl.deleteBuffer(lifeBuffer);
    });
  }

  onWindowResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.uniform2f(
      this.uniformLocations.resolution,
      this.canvas.width,
      this.canvas.height
    );
  }
}

// Initialize the animation when the page loads
window.addEventListener("load", () => {
  try {
    new WormholeAnimation();
    console.log("Wormhole animation initialized successfully!");
  } catch (error) {
    console.error("Error initializing animation:", error);
    document.getElementById("info").innerHTML =
      "<h2>Error: Animation failed to initialize</h2><p>Check the console for details.</p>";
  }
});
