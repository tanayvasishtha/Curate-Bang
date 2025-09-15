import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

        const variants = {
            primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl focus:ring-blue-500',
            secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
            outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500',
            ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500'
        }

        const sizes = {
            sm: 'h-9 px-4 text-sm',
            md: 'h-12 px-6 text-base',
            lg: 'h-14 px-8 text-lg'
        }

        return (
            <button
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        )
    }
)

Button.displayName = 'Button'

export { Button }