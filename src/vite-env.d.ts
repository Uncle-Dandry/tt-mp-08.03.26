/// <reference types="vite/client" />

declare module '*.svg?react' {
  import type { FunctionComponent, SVGProps } from 'react'

  const component: FunctionComponent<SVGProps<SVGSVGElement>>
  export default component
}

declare module '*.svg' {
  const src: string
  export default src
}

declare module '*.module.scss' {
  const classes: Record<string, string>
  export default classes
}

declare module '*.scss'
