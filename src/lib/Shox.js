
// Rebuilt Shox.js for clean Next.js usage

// Hash utilities
export function hash12(p) {
    return fract(Math.sin(dot(p, [12.9898, 78.233])) * 43758.5453);
}
function fract(x) { return x - Math.floor(x); }
function dot(a, b) { return a[0] * b[0] + a[1] * b[1]; }

// Basic displace
export function displace(p, amount = 0.5) {
    return [p[0] + Math.sin(p[1]) * amount, p[1] + Math.sin(p[0]) * amount];
}

// Voronoi
export function voronoi(p) {
    const cell = [Math.floor(p[0]), Math.floor(p[1])];
    const local = [p[0] - cell[0], p[1] - cell[1]];
    const dist = Math.sqrt(local[0] * local[0] + local[1] * local[1]);
    return dist;
}

// Basic Perlin-like noise (simplified)
export function cnoise2D(p) {
    return fract(Math.sin(dot(p, [127.1, 311.7])) * 43758.5453);
}

export function snoise2D(p) {
    return fract(Math.cos(dot(p, [269.5, 183.3])) * 43758.5453);
}

export function cnoise3D(p) {
    return fract(Math.sin(dot([p[0], p[1]], [12.989, 78.233])) * Math.sin(p[2]) * 43758.5453);
}

export function snoise3D(p) {
    return fract(Math.cos(dot([p[0], p[1]], [269.5, 183.3])) * Math.cos(p[2]) * 43758.5453);
}

// Gradient
export function gradient(t, colors) {
    const n = colors.length - 1;
    const i = Math.floor(t * n);
    const f = t * n - i;
    const c0 = colors[Math.min(i, n)];
    const c1 = colors[Math.min(i + 1, n)];
    return [
        c0[0] + (c1[0] - c0[0]) * f,
        c0[1] + (c1[1] - c0[1]) * f,
        c0[2] + (c1[2] - c0[2]) * f,
    ];
}

// Simple image blur (box blur style)
export function blur(image, radius = 1) {
    // Dummy function
    return image; // Should apply a blur but simplified here
}

// Other placeholder image functions
export function dither(image) { return image; }
export function emboss(image) { return image; }
export function laplacian(image) { return image; }
export function unsharp(image) { return image; }
export function mapFunc(x, inMin, inMax, outMin, outMax) {
    return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
export function smooth(t) {
    return t * t * (3.0 - 2.0 * t);
}
