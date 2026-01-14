import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-[12px] font-semibold transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-1 focus-visible:ring-primary/50 border border-transparent",
  {
    variants: {
      variant: {
        default: 'bg-primary text-[#050505] hover:bg-[#FF5511] font-bold shadow-sm',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90',
        outline:
          'border-border bg-transparent hover:bg-white/5 hover:border-white/20 text-zinc-300',
        secondary:
          'bg-[#313131] text-zinc-200 hover:bg-[#3D3D3D] border border-[#404040]',
        ghost:
          'hover:bg-white/5 hover:text-white text-zinc-400',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-8 px-3 py-1',
        sm: 'h-7 rounded-sm px-2 text-[11px]',
        lg: 'h-9 rounded-sm px-6 text-[13px]',
        icon: 'size-7',
        'icon-sm': 'size-6',
        'icon-lg': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
