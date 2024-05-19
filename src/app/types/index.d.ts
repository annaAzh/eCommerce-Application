declare module '*.png';
declare module '*.jpg';

declare module '*.module.css' {
  interface ClassNames {
    [className: string]: string;
  }
  const classNames: ClassNames;
  export = classNames;
}
