// types.d.ts
import '@react-three/fiber';

declare module 'three' {
  export interface AmbientLight {}
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any; // ← You can type this better if needed
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}
