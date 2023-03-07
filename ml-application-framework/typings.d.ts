declare module '*.module.css';
declare module '*.jpg';

// src/typings/bootstrap.d.ts
declare module '*.css' {
  const content: Record<string, string>
  export default content
}

declare module '*.json' {
  const value: any
  export default value
}
