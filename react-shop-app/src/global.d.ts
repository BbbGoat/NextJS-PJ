
declare module "*.scss" {
    const content: { [className: string]: string };
    export = content;
}
// => scss에 대한 모듈 형식 선언으로 타입에러 방지

declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}
