declare module "*.css";
declare module "*.scss";
declare module "*.sass";
declare module "*.module.css";
declare module "*.module.scss";
declare module "*.module.sass";

// Optional: allow importing CSS as records of class names
declare const styles: { [className: string]: string };
// export default styles;
