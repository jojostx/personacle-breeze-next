const Label = ({ className, children, ...props }) => (
    <label
        className={`${className} block text-sm font-medium text-gray-900 dark:text-white`}
        {...props}>
        {children}
    </label>
)

export default Label
