declare module "*.module.css";
declare module '*.jpg';

// src/typings/bootstrap.d.ts
declare module '*.css' {
    const content: {[className: string]: string};
    export default content;
}  