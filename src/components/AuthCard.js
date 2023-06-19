const AuthCard = ({ logo, children }) => (
    <div className="flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0">
        <div>{logo}</div>

        <div className="w-full px-6 py-4 mt-4 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
            {children}
        </div>
    </div>
)

export default AuthCard
