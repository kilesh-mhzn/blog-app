import { Link } from 'react-router-dom';

const NotAuthorized = () => {
    return (
        <div className="not-authorized font-semibold text-2xl h-screen flex items-center justify-center flex-col text-gray-800 bg-slate-200 gap-6">
            <h1 className="text-red-400 text-6xl">Not Authorized</h1>
            <p>You are not authorized to view this page.</p>
            <Link to="/">
                <p className="underline">Go Home</p>
            </Link>
        </div>
    );
};

export default NotAuthorized;
