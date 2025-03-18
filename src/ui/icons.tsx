import type { HTMLAttributes } from 'react'

export const Icons = {
  VSCode: (props: HTMLAttributes<SVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 128 128'
      {...props}
    >
      <mask
        id='vs-code-mask'
        width='128'
        height='128'
        x='0'
        y='0'
        maskUnits='userSpaceOnUse'
        style={{ maskType: 'alpha' }}
      >
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M90.767 127.126a7.968 7.968 0 0 0 6.35-.244l26.353-12.681a8 8 0 0 0 4.53-7.209V21.009a8 8 0 0 0-4.53-7.21L97.117 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026L15.6 32.013a5.328 5.328 0 0 0-6.807.302l-7.048 6.411a5.335 5.335 0 0 0-.006 7.888L20.796 64 1.74 81.387a5.336 5.336 0 0 0 .006 7.887l7.048 6.411a5.327 5.327 0 0 0 6.807.303l21.974-16.68 50.45 46.025a7.96 7.96 0 0 0 2.743 1.793Zm5.252-92.183L57.74 64l38.28 29.058V34.943Z'
          clipRule='evenodd'
        />
      </mask>
      <g mask='url(#vs-code-mask)'>
        <path
          fill='#0065A9'
          d='M123.471 13.82 97.097 1.12A7.973 7.973 0 0 0 88 2.668L1.662 81.387a5.333 5.333 0 0 0 .006 7.887l7.052 6.411a5.333 5.333 0 0 0 6.811.303l103.971-78.875c3.488-2.646 8.498-.158 8.498 4.22v-.306a8.001 8.001 0 0 0-4.529-7.208Z'
        />
        <g filter='url(#vs-code-filter-b)'>
          <path
            fill='#007ACC'
            d='m123.471 114.181-26.374 12.698A7.973 7.973 0 0 1 88 125.333L1.662 46.613a5.333 5.333 0 0 1 .006-7.887l7.052-6.411a5.333 5.333 0 0 1 6.811-.303l103.971 78.874c3.488 2.647 8.498.159 8.498-4.219v.306a8.001 8.001 0 0 1-4.529 7.208Z'
          />
        </g>
        <g filter='url(#vs-code-filter-c)'>
          <path
            fill='#1F9CF0'
            d='M97.098 126.882A7.977 7.977 0 0 1 88 125.333c2.952 2.952 8 .861 8-3.314V5.98c0-4.175-5.048-6.266-8-3.313a7.977 7.977 0 0 1 9.098-1.549L123.467 13.8A8 8 0 0 1 128 21.01v85.982a8 8 0 0 1-4.533 7.21l-26.369 12.681Z'
          />
        </g>
        <path
          fill='url(#vs-code-grad-d)'
          fillRule='evenodd'
          d='M90.69 127.126a7.968 7.968 0 0 0 6.349-.244l26.353-12.681a8 8 0 0 0 4.53-7.21V21.009a8 8 0 0 0-4.53-7.21L97.039 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026-21.974-16.68a5.328 5.328 0 0 0-6.807.302l-7.048 6.411a5.336 5.336 0 0 0-.006 7.888L20.718 64 1.662 81.386a5.335 5.335 0 0 0 .006 7.888l7.048 6.411a5.328 5.328 0 0 0 6.807.303l21.975-16.681 50.45 46.026a7.959 7.959 0 0 0 2.742 1.793Zm5.252-92.184L57.662 64l38.28 29.057V34.943Z'
          clipRule='evenodd'
          opacity='0.25'
          style={{ mixBlendMode: 'overlay' }}
        />
      </g>
      <defs>
        <filter
          id='vs-code-filter-b'
          width='144.744'
          height='113.408'
          x='-8.41115'
          y='22.5944'
          colorInterpolationFilters='sRGB'
          filterUnits='userSpaceOnUse'
        >
          <feFlood
            floodOpacity='0'
            result='BackgroundImageFix'
          />
          <feColorMatrix
            in='SourceAlpha'
            result='hardAlpha'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          />
          <feGaussianBlur stdDeviation='4.16667' />
          <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
          <feBlend
            in2='BackgroundImageFix'
            mode='overlay'
            result='effect1_dropShadow_1_36'
          />
          <feBlend
            in='SourceGraphic'
            in2='effect1_dropShadow_1_36'
            result='shape'
          />
        </filter>
        <filter
          id='vs-code-filter-c'
          width='56.6667'
          height='144.007'
          x='79.6667'
          y='-8.0035'
          colorInterpolationFilters='sRGB'
          filterUnits='userSpaceOnUse'
        >
          <feFlood
            floodOpacity='0'
            result='BackgroundImageFix'
          />
          <feColorMatrix
            in='SourceAlpha'
            result='hardAlpha'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          />
          <feGaussianBlur stdDeviation='4.16667' />
          <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
          <feBlend
            in2='BackgroundImageFix'
            mode='overlay'
            result='effect1_dropShadow_1_36'
          />
          <feBlend
            in='SourceGraphic'
            in2='effect1_dropShadow_1_36'
            result='shape'
          />
        </filter>
        <linearGradient
          id='vs-code-grad-d'
          x1='63.9222'
          x2='63.9222'
          y1='0.329902'
          y2='127.67'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#fff' />
          <stop
            offset='1'
            stopColor='#fff'
            stopOpacity='0'
          />
        </linearGradient>
      </defs>
    </svg>
  ),
  Cursor: (props: HTMLAttributes<SVGElement>) => (
    <svg
      height='1em'
      style={{ flex: 'none', lineHeight: 1 }}
      viewBox='0 0 24 24'
      width='1em'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <title>Cursor</title>
      <path
        d='M11.925 24l10.425-6-10.425-6L1.5 18l10.425 6z'
        fill='url(#cursor-fill-0)'
      />
      <path
        d='M22.35 18V6L11.925 0v12l10.425 6z'
        fill='url(#cursor-fill-1)'
      />
      <path
        d='M11.925 0L1.5 6v12l10.425-6V0z'
        fill='url(#cursor-fill-2)'
      />
      <path
        d='M22.35 6L11.925 24V12L22.35 6z'
        fill='#555'
      />
      <path
        d='M22.35 6l-10.425 6L1.5 6h20.85z'
        fill='#000'
      />
      <defs>
        <linearGradient
          gradientUnits='userSpaceOnUse'
          id='cursor-fill-0'
          x1='11.925'
          x2='11.925'
          y1='12'
          y2='24'
        >
          <stop
            offset='.16'
            stopColor='#000'
            stopOpacity='.39'
          />
          <stop
            offset='.658'
            stopColor='#000'
            stopOpacity='.8'
          />
        </linearGradient>
        <linearGradient
          gradientUnits='userSpaceOnUse'
          id='cursor-fill-1'
          x1='22.35'
          x2='11.925'
          y1='6.037'
          y2='12.15'
        >
          <stop
            offset='.182'
            stopColor='#000'
            stopOpacity='.31'
          />
          <stop
            offset='.715'
            stopColor='#000'
            stopOpacity='0'
          />
        </linearGradient>
        <linearGradient
          gradientUnits='userSpaceOnUse'
          id='cursor-fill-2'
          x1='11.925'
          x2='1.5'
          y1='0'
          y2='18'
        >
          <stop
            stopColor='#000'
            stopOpacity='.6'
          />
          <stop
            offset='.667'
            stopColor='#000'
            stopOpacity='.22'
          />
        </linearGradient>
      </defs>
    </svg>
  ),
  Logo: (props: HTMLAttributes<SVGElement>) => (
    <svg
      {...props}
      width='180'
      height='210'
      viewBox='0 0 180 210'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M169.66 80.46L142.84 53.64L143.23 54.34C130.8 42.14 110.87 42.22 98.4901 54.44L62.5401 90.05C58.0101 94.52 60.0201 102.2 66.1801 103.89L90.0901 110.37V126.97L44.3901 114.51C33.3101 111.49 29.6701 97.63 37.8301 89.56L90.0101 37.79C100.23 27.62 100.28 11.07 90.1101 0.850006L30.7501 60.21L30.6501 60.34L10.5201 80.45C-3.07993 94.05 -3.07993 116.11 10.5201 129.72L37.3401 156.51L36.9501 155.83C49.3801 168 69.3101 167.95 81.6901 155.7L117.64 120.11C122.17 115.64 120.16 107.96 114 106.27L90.0901 99.76V83.19L135.79 95.65C146.87 98.67 150.51 112.53 142.35 120.6L90.1901 172.37C79.9401 182.51 79.8901 199.06 90.0601 209.28L149.42 149.94L149.52 149.81L169.65 129.7C183.26 116.12 183.26 94.07 169.66 80.46Z'
        fill='url(#paint0_linear_29_119)'
      />
      <path
        d='M155.72 101.11C148.5 99.14 140.77 97.03 133.17 94.96L135.79 95.67C146.87 98.69 150.51 112.55 142.35 120.62L90.1901 172.39C89.8001 172.77 89.4601 173.18 89.1001 173.58L90.0801 209.31L149.43 149.96L149.53 149.83L164.69 134.69C175.54 123.76 170.6 105.17 155.72 101.11Z'
        fill='url(#paint1_linear_29_119)'
      />
      <path
        d='M24.4601 109.07C31.6801 111.04 39.4101 113.15 47.0101 115.22L44.3901 114.51C33.3101 111.49 29.6701 97.63 37.8301 89.56L90.0001 37.79C90.3901 37.41 90.7301 37 91.0901 36.6L90.1101 0.869995L30.7601 60.22L30.6601 60.35L15.5001 75.49C4.63012 86.42 9.58012 105.01 24.4601 109.07Z'
        fill='url(#paint2_linear_29_119)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_29_119'
          x1='123.32'
          y1='55.353'
          x2='12.7707'
          y2='220.818'
          gradientUnits='userSpaceOnUse'
        >
          <stop
            offset='0.1774'
            stopColor='#FF3042'
          />
          <stop
            offset='0.8441'
            stopColor='#CE009F'
          />
        </linearGradient>
        <linearGradient
          id='paint1_linear_29_119'
          x1='79.7322'
          y1='179.48'
          x2='181.826'
          y2='91.8973'
          gradientUnits='userSpaceOnUse'
        >
          <stop
            stopColor='#9814A8'
            stopOpacity='0'
          />
          <stop
            offset='0.222'
            stopColor='#9614A5'
            stopOpacity='0.222'
          />
          <stop
            offset='0.3777'
            stopColor='#90139C'
            stopOpacity='0.3777'
          />
          <stop
            offset='0.5131'
            stopColor='#85118C'
            stopOpacity='0.5131'
          />
          <stop
            offset='0.637'
            stopColor='#760E77'
            stopOpacity='0.637'
          />
          <stop
            offset='0.753'
            stopColor='#630B5A'
            stopOpacity='0.753'
          />
          <stop
            offset='0.8631'
            stopColor='#4C0737'
            stopOpacity='0.8631'
          />
          <stop
            offset='0.9667'
            stopColor='#30020F'
            stopOpacity='0.9667'
          />
          <stop
            offset='1'
            stopColor='#260000'
          />
        </linearGradient>
        <linearGradient
          id='paint2_linear_29_119'
          x1='100.426'
          y1='30.6848'
          x2='-1.66754'
          y2='118.268'
          gradientUnits='userSpaceOnUse'
        >
          <stop
            stopColor='#9814A8'
            stopOpacity='0'
          />
          <stop
            offset='0.222'
            stopColor='#9614A5'
            stopOpacity='0.222'
          />
          <stop
            offset='0.3777'
            stopColor='#90139C'
            stopOpacity='0.3777'
          />
          <stop
            offset='0.5131'
            stopColor='#85118C'
            stopOpacity='0.5131'
          />
          <stop
            offset='0.637'
            stopColor='#760E77'
            stopOpacity='0.637'
          />
          <stop
            offset='0.753'
            stopColor='#630B5A'
            stopOpacity='0.753'
          />
          <stop
            offset='0.8631'
            stopColor='#4C0737'
            stopOpacity='0.8631'
          />
          <stop
            offset='0.9667'
            stopColor='#30020F'
            stopOpacity='0.9667'
          />
          <stop
            offset='1'
            stopColor='#260000'
          />
        </linearGradient>
      </defs>
    </svg>
  ),
  Twitter: (props: HTMLAttributes<SVGElement>) => (
    <svg
      {...props}
      height='23'
      viewBox='0 0 1200 1227'
      width='23'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z' />
    </svg>
  ),
  TikTok: (props: HTMLAttributes<SVGElement>) => (
    <svg
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M19.321 5.562C18.0655 4.2008 17.3451 2.4446 17.3132 0.608C17.3132 0.271 17.0423 0 16.7053 0H12.5347C12.1977 0 11.9268 0.271 11.9268 0.608V16.5062C11.9268 18.289 10.482 19.7337 8.69931 19.7337C6.91661 19.7337 5.47179 18.289 5.47179 16.5062C5.47179 14.7235 6.91661 13.2788 8.69931 13.2788C9.0363 13.2788 9.30721 13.0078 9.30721 12.6708V8.77366C9.30721 8.43667 9.0363 8.16576 8.69931 8.16576C3.89196 8.16576 0 12.0584 0 16.8657C0 21.6729 3.89196 25.5649 8.69931 25.5649C13.5066 25.5649 17.3986 21.6729 17.3986 16.8657V8.28208C18.8917 9.37073 20.6665 9.95117 22.4968 9.95177C22.8338 9.95177 23.1047 9.68086 23.1047 9.34387V5.44677C23.1047 5.10978 22.8338 4.83887 22.4968 4.83887C21.3789 4.83887 20.2814 4.36599 19.4327 3.51731L19.321 5.562Z'
        fill='currentColor'
      />
    </svg>
  ),
  GitHub: (props: HTMLAttributes<SVGElement>) => (
    <svg
      viewBox='0 0 438.549 438.549'
      {...props}
    >
      <path
        fill='currentColor'
        d='M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z'
      />
    </svg>
  ),
  Google: (props: HTMLAttributes<SVGElement>) => (
    <svg
      role='img'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='currentColor'
        d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
      />
    </svg>
  ),
  Apple: (props: HTMLAttributes<SVGElement>) => (
    <svg
      role='img'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        d='M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701'
        fill='currentColor'
      />
    </svg>
  ),
  Spinner: (props: HTMLAttributes<SVGElement>) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d='M21 12a9 9 0 1 1-6.219-8.56' />
    </svg>
  )
}
