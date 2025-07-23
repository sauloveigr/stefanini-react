import { Fragment, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error';

interface ToastProps {
  type: ToastType;
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast = ({ type, message, isVisible, onClose }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const icon = type === 'success' ? (
    <CheckCircle className="w-5 h-5 text-green-400" />
  ) : (
    <XCircle className="w-5 h-5 text-red-400" />
  );

  const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';

  return (
    <Transition
      show={isVisible}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[9999] max-w-sm">
        <div className={`w-full ${bgColor} shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden`}>
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${textColor} break-words`}>
                  {message}
                </p>
              </div>
              <div className="flex-shrink-0">
                <button
                  className={`${bgColor} rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}; 