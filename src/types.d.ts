import '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

declare module '*.glb';
declare module '*.png';

declare module 'meshline' {
  export const MeshLineGeometry: any;
  export const MeshLineMaterial: any;
}
