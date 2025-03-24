// declare module '*.glb';
// declare module '*.png';

// declare module 'meshline' {
//   export const MeshLineGeometry: any;
//   export const MeshLineMaterial: any;
// }

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       meshLineGeometry: any;
//       meshLineMaterial: any;
//     }
//   }
// }

/// <reference types="react" />
/// <reference types="three" />

import { JSX as JSXNamespace } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements extends JSXNamespace.IntrinsicElements {}
  }
}
