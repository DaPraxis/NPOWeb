/**
 * Extend
 * - vec2 mirror(vec2 uv, float num)
 * - vec2 mirror(vec2 uv, vec2 grid)
 * - vec2 repeat(vec2 uv, float num)
 * - vec2 repeat(vec2 uv, vec2 grid)
 * @type {string}
 */
export const extend = `
	// MIT License
	// Copyright © 2023 Zaron
	// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
	// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	vec2 mirror(vec2 uv, float num) {
		uv *= num;
		vec2 iuv = floor(uv);
		uv *= 1.-2.*mod(iuv, 2.);
		return fract(uv);
	}

	vec2 mirror(vec2 uv, vec2 grid) {
		uv *= grid;
		vec2 iuv = floor(uv);
		uv *= 1.-2.*mod(iuv, 2.);
		return fract(uv);
	}

	vec2 repeat(vec2 uv, float num) {
		return fract(uv*num);
	}

	vec2 repeat(vec2 uv, vec2 grid) {
		return fract(uv*grid);
	}
`
