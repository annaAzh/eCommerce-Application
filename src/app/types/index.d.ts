declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '*.webp';

declare module '*.module.css' {
  interface ClassNames {
    [className: string]: string;
  }
  const classNames: ClassNames;
  export = classNames;
}

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
