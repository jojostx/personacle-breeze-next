import { useState } from 'react'

export default function Banner({
    children,
    position = 'bottom',
    color = 'white',
    isOpen = true,
    showCloseButton = true,
}) {
    const [bannerOpen, setBannerOpen] = useState(isOpen)

    const positions = {
        top: 'top-0 inset-x-0 shadow',
        topLeft: 'top-0 left-0 md:left-12 md:top-8',
        topRight: 'top-0 right-0 md:right-12 md:top-8',
        bottom: 'bottom-0 inset-x-0',
        bottomLeft: 'bottom-0 left-0 md:left-12 md:bottom-8',
        bottomRight: 'bottom-0 right-0 md:right-12 md:bottom-8',
    }

    const colors = {
        primary: {
            background: 'bg-primary-800',
            text: 'text-primary-100',
            border: 'border-primary-500',
            buttonIcon: 'text-primary-500',
            buttonIconHover: 'hover:text-primary-400',
        },
        danger: {
            background: 'bg-danger-800',
            text: 'text-danger-100',
            border: 'border-danger-500',
            buttonIcon: 'text-danger-500',
            buttonIconHover: 'hover:text-danger-400',
        },
        success: {
            background: 'bg-success-800',
            text: 'text-success-100',
            border: 'border-success-500',
            buttonIcon: 'text-success-500',
            buttonIconHover: 'hover:text-success-400',
        },
        warning: {
            background: 'bg-warning-800',
            text: 'text-warning-100',
            border: 'border-warning-500',
            buttonIcon: 'text-warning-500',
            buttonIconHover: 'hover:text-warning-400',
        },
        secondary: {
            background: 'bg-secondary-800',
            text: 'text-secondary-100',
            border: 'border-secondary-500',
            buttonIcon: 'text-secondary-500',
            buttonIconHover: 'hover:text-secondary-400',
        },
        white: {
            background: 'bg-white',
            text: 'text-secondary-800',
            border: 'border-secondary-200',
            buttonIcon: 'text-secondary-800',
            buttonIconHover: 'hover:text-secondary-600',
        },
    }

    const shadows = {
        top: 'shadow-lg',
        topLeft: 'shadow-lg',
        topRight: 'shadow-lg',
        bottom: 'shadow-t-lg',
        bottomLeft: 'shadow-t-lg',
        bottomRight: 'shadow-t-lg',
    }

    const _position =
        position in positions ? positions[position] : positions['bottom']
    const _color = color in colors ? colors[color] : colors['white']
    const shadow = position in shadows ? shadows[position] : shadows['top']

    return (
        <>
            {bannerOpen && (
                <div className={`${_position} fixed w-full md:w-auto z-50`}>
                    <div
                        className={`flex items-center justify-between p-2 px-4 text-sm ${shadow} ${_color.background} md:rounded`}>
                        <div className={`flex-1 ${_color.text}`}>
                            {children}
                        </div>
                        {showCloseButton && (
                            <button
                                className={`p-3 ml-3 border-l ${_color.border} ${_color.buttonIcon} ${_color.buttonIconHover}`}
                                onClick={() => setBannerOpen(false)}>
                                <span className="sr-only">Close</span>
                                <svg
                                    className="w-4 h-4 fill-current shrink-0"
                                    viewBox="0 0 16 16">
                                    <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
