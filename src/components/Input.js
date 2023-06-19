const Input = ({ disabled = false, className, ...props }) => (
    <input
        disabled={disabled}
        className={`${className} bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 rounded-md shadow-sm focus:ring focus:ring-primary-200 focus:ring-opacity-50`}
        {...props}
    />
)

export default Input
