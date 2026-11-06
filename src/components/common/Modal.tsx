import React, { ReactNode } from 'react';
import { X } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: string;
  children: ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
  maxWidth = 'max-w-md'
}) => {
  if (!isOpen) return null;

  const handleClose = () => {
    sound.playPop();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs select-none">
      <div
        className={`w-full ${maxWidth} max-h-[88vh] bg-[#FFF9F3] border-3 border-[#4B2925]/25 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-gentle-bounce`}
      >
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b-2 border-[#4B2925]/10 bg-[#FDF6EE] flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon && <span className="text-xl">{icon}</span>}
            <div>
              <h3 className="font-bold text-[#4B2925] text-base leading-tight">{title}</h3>
              {subtitle && <p className="text-[11px] text-[#8C6D62] mt-0.5">{subtitle}</p>}
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#FBEAE7] border-2 border-[#4B2925]/15 flex items-center justify-center text-[#4B2925] transition-transform active:scale-90 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};
