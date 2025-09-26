function displaceSVGCircle(pathId, displacement = 'cross', amount = 15, size = 100, complexity = 2, evolution = 0, baseRadius = 75) {
  const path = document.getElementById(pathId);
  const cx = 93; // Center X for 186x228 SVG
  const cy = 114; // Center Y for 186x228 SVG
  const r = baseRadius;
  const segments = 16;
  let points = [];

  if (r <= 0) {
    path.setAttribute('d', '');
    return;
  }

  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * 2 * Math.PI;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    const scale = 1 / size;
    const nx = fractalNoise(x * scale, y * scale, evolution, complexity);
    const ny = fractalNoise(x * scale + 1000, y * scale + 1000, evolution, complexity);
    let dx = (displacement === 'horizontal' || displacement === 'cross') ? nx * amount : 0;
    let dy = (displacement === 'vertical' || displacement === 'cross') ? ny * amount : 0;
    const radialFactor = 1 + (nx + ny) * 0.1;
    points.push({
      x: cx + (x - cx) * radialFactor + dx,
      y: cy + (y - cy) * radialFactor + dy
    });
  }

  let d = `M${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length; i++) {
    const p0 = points[i];
    const p1 = points[(i + 1) % segments];
    const p2 = points[(i + 2) % segments];
    const cp1x = p0.x + (p1.x - p0.x) * 0.3;
    const cp1y = p0.y + (p1.y - p0.y) * 0.3;
    const cp2x = p1.x - (p2.x - p1.x) * 0.3;
    const cp2y = p1.y - (p2.y - p1.y) * 0.3;
    d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
  }
  d += ' Z';

  path.setAttribute('d', d);
}

// Perlin Noise Implementation
const p = new Uint8Array(512);
const permutation = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];

for (let i = 0; i < 256; i++) p[256 + i] = p[i] = permutation[i];

function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
function lerp(t, a, b) { return a + t * (b - a); }
function grad(hash, x, y, z) {
  const h = hash & 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : (h === 12 || h === 14) ? x : z;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

function noise(x, y, z = 0) {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const Z = Math.floor(z) & 255;
  x -= Math.floor(x);
  y -= Math.floor(y);
  z -= Math.floor(z);
  const u = fade(x);
  const v = fade(y);
  const w = fade(z);
  const A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z;
  const B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;
  return lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)),
                      lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z))),
              lerp(v, lerp(u, grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1)),
                      lerp(u, grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1))));
}

function fractalNoise(x, y, z, octaves = 2, persistence = 1.3) {
  let total = 0;
  let frequency = 1;
  let amplitude = 1;
  let maxValue = 0;
  for (let i = 0; i < octaves; i++) {
    total += noise(x * frequency, y * frequency, z * frequency) * amplitude;
    maxValue += amplitude;
    amplitude *= persistence;
    frequency *= 2;
  }
  return total / maxValue;
}