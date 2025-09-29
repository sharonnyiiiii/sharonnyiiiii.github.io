class WormholeAnimation {
    constructor() {
        this.canvas = document.getElementById('wormholeCanvas');
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        
        if (!this.gl) {
            alert('WebGL not supported in this browser');
            return;
        }
        
        this.setupCanvas();
        this.initShaders();
        this.initBuffers();
        this.setupControls();
        this.animate();
        
        // Animation state
        this.time = 0;
        this.speed = 1.0;
        this.intensity = 1.0;
        this.colorMode = 'vibrant';
    }
    
    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        });
    }
    
    initShaders() {
        // Vertex Shader
        const vertexShaderSource = `
            attribute vec2 a_position;
            attribute float a_particleId;
            attribute float a_life;
            
            uniform float u_time;
            uniform float u_speed;
            uniform float u_intensity;
            uniform vec2 u_resolution;
            
            varying vec2 v_uv;
            varying float v_life;
            varying float v_particleId;
            varying float v_depth;
            
            // Noise function for organic movement
            float noise(vec2 p) {
                return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
            }
            
            // Smooth noise
            float smoothNoise(vec2 p) {
                vec2 i = floor(p);
                vec2 f = fract(p);
                f = f * f * (3.0 - 2.0 * f);
                
                float a = noise(i);
                float b = noise(i + vec2(1.0, 0.0));
                float c = noise(i + vec2(0.0, 1.0));
                float d = noise(i + vec2(1.0, 1.0));
                
                return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
            }
            
            // Fractal noise
            float fbm(vec2 p) {
                float value = 0.0;
                float amplitude = 0.5;
                float frequency = 1.0;
                
                for (int i = 0; i < 4; i++) {
                    value += amplitude * smoothNoise(p * frequency);
                    amplitude *= 0.5;
                    frequency *= 2.0;
                }
                return value;
            }
            
            void main() {
                v_uv = a_position;
                v_life = a_life;
                v_particleId = a_particleId;
                
                // Create wormhole tunnel effect
                vec2 center = vec2(0.0, 0.0);
                vec2 pos = a_position - center;
                
                // Distance from center for tunnel effect
                float dist = length(pos);
                v_depth = 1.0 - smoothstep(0.0, 1.0, dist);
                
                // Particle movement through wormhole
                float t = u_time * u_speed + a_particleId * 0.1;
                
                // Spiral motion
                float angle = t * 0.5 + a_particleId * 0.3;
                float radius = 0.3 + 0.2 * sin(t * 0.7 + a_particleId);
                
                // Add noise for organic movement
                vec2 noiseOffset = vec2(
                    fbm(vec2(t * 0.1, a_particleId * 0.1)),
                    fbm(vec2(t * 0.1 + 100.0, a_particleId * 0.1 + 100.0))
                ) * 0.1 * u_intensity;
                
                // Wormhole perspective transformation
                float z = 0.5 + 0.5 * sin(t * 0.3 + a_particleId * 0.2);
                float perspective = 1.0 / (z + 0.1);
                
                // Apply spiral and noise
                vec2 spiralPos = vec2(
                    cos(angle) * radius,
                    sin(angle) * radius
                ) + noiseOffset;
                
                // Apply perspective
                spiralPos *= perspective;
                
                // Add life-based scaling
                float lifeScale = smoothstep(0.0, 1.0, a_life) * smoothstep(1.0, 0.0, a_life);
                spiralPos *= (0.5 + 0.5 * lifeScale);
                
                // Convert to clip space
                vec2 clipSpace = (spiralPos * 2.0 - 1.0) * vec2(1.0, u_resolution.y / u_resolution.x);
                
                gl_Position = vec4(clipSpace, 0.0, 1.0);
                gl_PointSize = 2.0 + 3.0 * lifeScale * perspective * u_intensity;
            }
        `;
        
        // Fragment Shader
        const fragmentShaderSource = `
            precision mediump float;
            
            varying vec2 v_uv;
            varying float v_life;
            varying float v_particleId;
            varying float v_depth;
            
            uniform float u_time;
            uniform float u_intensity;
            uniform int u_colorMode;
            
            // Color palette functions
            vec3 getVibrantColor(float t) {
                return vec3(
                    0.5 + 0.5 * sin(t * 2.0 + 0.0),
                    0.5 + 0.5 * sin(t * 2.0 + 2.094),
                    0.5 + 0.5 * sin(t * 2.0 + 4.188)
                );
            }
            
            vec3 getNeonColor(float t) {
                return vec3(
                    0.8 + 0.2 * sin(t * 3.0),
                    0.2 + 0.8 * sin(t * 3.0 + 1.0),
                    0.5 + 0.5 * sin(t * 3.0 + 2.0)
                );
            }
            
            vec3 getCosmicColor(float t) {
                return vec3(
                    0.3 + 0.7 * sin(t * 1.5),
                    0.1 + 0.9 * sin(t * 1.5 + 1.57),
                    0.5 + 0.5 * sin(t * 1.5 + 3.14)
                );
            }
            
            // Glow effect
            float getGlow(float dist) {
                return exp(-dist * 8.0) * u_intensity;
            }
            
            void main() {
                vec2 center = gl_PointCoord - 0.5;
                float dist = length(center);
                
                if (dist > 0.5) discard;
                
                // Life-based alpha
                float alpha = v_life * (1.0 - smoothstep(0.0, 0.5, dist));
                
                // Color based on mode
                float colorTime = u_time * 0.5 + v_particleId * 0.1;
                vec3 color;
                
                if (u_colorMode == 0) {
                    color = getVibrantColor(colorTime);
                } else if (u_colorMode == 1) {
                    color = getNeonColor(colorTime);
                } else {
                    color = getCosmicColor(colorTime);
                }
                
                // Add depth-based color variation
                color = mix(color, color * 0.5, v_depth);
                
                // Add glow effect
                float glow = getGlow(dist);
                color += vec3(glow * 0.5);
                
                // Add particle trail effect
                float trail = smoothstep(0.0, 1.0, v_life) * smoothstep(1.0, 0.8, v_life);
                color *= (0.5 + 0.5 * trail);
                
                gl_FragColor = vec4(color, alpha * glow);
            }
        `;
        
        this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource);
        this.fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);
        this.program = this.createProgram(this.vertexShader, this.fragmentShader);
        
        this.gl.useProgram(this.program);
    }
    
    createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Shader compilation error:', this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }
        
        return shader;
    }
    
    createProgram(vertexShader, fragmentShader) {
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error('Program linking error:', this.gl.getProgramInfoLog(program));
            this.gl.deleteProgram(program);
            return null;
        }
        
        return program;
    }
    
    initBuffers() {
        // Create particle data
        const numParticles = 2000;
        const positions = [];
        const particleIds = [];
        const lives = [];
        
        for (let i = 0; i < numParticles; i++) {
            positions.push(
                Math.random() * 2 - 1,
                Math.random() * 2 - 1
            );
            particleIds.push(i / numParticles);
            lives.push(Math.random());
        }
        
        // Create buffers
        this.positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.DYNAMIC_DRAW);
        
        this.particleIdBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.particleIdBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(particleIds), this.gl.DYNAMIC_DRAW);
        
        this.lifeBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.lifeBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(lives), this.gl.DYNAMIC_DRAW);
        
        this.numParticles = numParticles;
    }
    
    setupControls() {
        const speedControl = document.getElementById('speedControl');
        const intensityControl = document.getElementById('intensityControl');
        const colorModeSelect = document.getElementById('colorMode');
        const resetBtn = document.getElementById('resetBtn');
        const speedValue = document.getElementById('speedValue');
        const intensityValue = document.getElementById('intensityValue');
        
        speedControl.addEventListener('input', (e) => {
            this.speed = parseFloat(e.target.value);
            speedValue.textContent = this.speed.toFixed(1);
        });
        
        intensityControl.addEventListener('input', (e) => {
            this.intensity = parseFloat(e.target.value);
            intensityValue.textContent = this.intensity.toFixed(1);
        });
        
        colorModeSelect.addEventListener('change', (e) => {
            this.colorMode = e.target.value;
        });
        
        resetBtn.addEventListener('click', () => {
            this.time = 0;
            this.speed = 1.0;
            this.intensity = 1.0;
            speedControl.value = 1.0;
            intensityControl.value = 1.0;
            speedValue.textContent = '1.0';
            intensityValue.textContent = '1.0';
        });
    }
    
    updateParticles() {
        const lives = [];
        for (let i = 0; i < this.numParticles; i++) {
            let life = (this.time * 0.001 + i * 0.0001) % 1.0;
            lives.push(life);
        }
        
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.lifeBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(lives), this.gl.DYNAMIC_DRAW);
    }
    
    render() {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE);
        
        this.updateParticles();
        
        // Set up attributes
        const positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
        const particleIdLocation = this.gl.getAttribLocation(this.program, 'a_particleId');
        const lifeLocation = this.gl.getAttribLocation(this.program, 'a_life');
        
        // Position attribute
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
        
        // Particle ID attribute
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.particleIdBuffer);
        this.gl.enableVertexAttribArray(particleIdLocation);
        this.gl.vertexAttribPointer(particleIdLocation, 1, this.gl.FLOAT, false, 0, 0);
        
        // Life attribute
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.lifeBuffer);
        this.gl.enableVertexAttribArray(lifeLocation);
        this.gl.vertexAttribPointer(lifeLocation, 1, this.gl.FLOAT, false, 0, 0);
        
        // Set uniforms
        const timeLocation = this.gl.getUniformLocation(this.program, 'u_time');
        const speedLocation = this.gl.getUniformLocation(this.program, 'u_speed');
        const intensityLocation = this.gl.getUniformLocation(this.program, 'u_intensity');
        const resolutionLocation = this.gl.getUniformLocation(this.program, 'u_resolution');
        const colorModeLocation = this.gl.getUniformLocation(this.program, 'u_colorMode');
        
        this.gl.uniform1f(timeLocation, this.time);
        this.gl.uniform1f(speedLocation, this.speed);
        this.gl.uniform1f(intensityLocation, this.intensity);
        this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);
        
        const colorModeMap = { 'vibrant': 0, 'neon': 1, 'cosmic': 2 };
        this.gl.uniform1i(colorModeLocation, colorModeMap[this.colorMode]);
        
        // Draw particles
        this.gl.drawArrays(this.gl.POINTS, 0, this.numParticles);
    }
    
    animate() {
        this.time += 16; // ~60fps
        this.render();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the animation when the page loads
window.addEventListener('load', () => {
    new WormholeAnimation();
});
