const AuthLayout = ({ 
    children 
} : {
    children: React.ReactNode;
}) => {
    return (
        <div className="grid place-items-center h-[100vh] bg-login bg-cover">
            {children}
        </div>
    );
}

export default AuthLayout;