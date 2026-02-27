import React from 'react';
import { FaTimes } from 'react-icons/fa';

const AdminSettingsModal = ({ title, isOpen, onClose, children, maxWidth = 'max-w-lg' }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-fade-in"
            onClick={onClose}
        >
            <div
                className={`bg-white/90 backdrop-blur-xl rounded-2xl ${maxWidth} w-full shadow-2xl border border-peach-100/50 overflow-hidden animate-scale-in`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="px-5 sm:px-8 pt-6 sm:pt-8 pb-3 sm:pb-4 flex justify-between items-center bg-gradient-to-b from-peach-50/50 to-transparent">
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 tracking-wide uppercase">
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 sm:p-2.5 bg-beige-50 hover:bg-peach-100 text-gray-500 hover:text-gray-900 rounded-full transition-all duration-300 active:scale-95 group"
                    >
                        <FaTimes className="group-hover:rotate-90 transition-transform duration-300" size={14} />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="px-5 sm:px-8 pb-6 sm:pb-8 pt-1 sm:pt-2">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminSettingsModal;
