import { useEffect } from 'react'

// color: 'red' for error, else default
function getBg(color) {
    if (color === 'red') return 'bg-red-600';
    return 'bg-gradient-to-r from-violet-500 to-fuchsia-500';
}

function Toast({ message, show, onDismiss, color }) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onDismiss();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [show, onDismiss]);

    return (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-sm font-semibold z-50
                         ${getBg(color)} text-white
                         shadow-lg shadow-violet-500/30 whitespace-nowrap
                         transition-all duration-300 ease-in-out
                         ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
            {message}
        </div>
    );
}

export default Toast
