import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group',
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
                destructive:
                    'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
                outline:
                    'border-2 border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:border-primary/50',
                secondary:
                    'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline hover:text-primary/80',
                gradient:
                    'bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground shadow-md',
                glow: 'bg-primary text-primary-foreground shadow-glow',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-8 rounded-lg px-3 text-xs',
                lg: 'h-12 rounded-xl px-8 text-base',
                xl: 'h-14 rounded-xl px-10 text-lg',
                icon: 'h-10 w-10',
                'icon-sm': 'h-8 w-8 rounded-lg',
                'icon-lg': 'h-12 w-12 rounded-xl',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        className,
        variant,
        size,
        asChild = false,
        loading = false,
        icon,
        iconPosition = 'left',
        children,
        disabled,
        ...props
    }, ref) => {
        const Comp = asChild ? Slot : 'button';

        const isDisabled = disabled || loading;

        return (
            <Comp
                className={cn(
                    'cursor-pointer',
                    buttonVariants({ variant, size, className }),
                    isDisabled && 'cursor-not-allowed',
                )}
                ref={ref}
                disabled={isDisabled}
                {...props}
            >
                <div className="relative w-full h-full flex items-center justify-center">
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}

                    <div className={cn(
                        'flex items-center gap-2',
                        loading && 'opacity-0'
                    )}>
                        {icon && iconPosition === 'left' && (
                            <span className="inline-flex">{icon}</span>
                        )}
                        {children}
                        {icon && iconPosition === 'right' && (
                            <span className="inline-flex">{icon}</span>
                        )}
                    </div>
                </div>
            </Comp>
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
