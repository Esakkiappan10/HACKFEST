import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react"; // lightweight and Tailwind-friendly

const DarkModal = ({ isOpen, onClose, onSubmit, children }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* --- Backdrop --- */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </Transition.Child>

        {/* --- Modal Panel --- */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-lg rounded-2xl border border-[#FFD400]/30 bg-[#08123B] text-white shadow-[0_0_30px_rgba(255,212,0,0.25)] p-6">
              <Dialog.Title
                as="h3"
                className="text-lg font-[Fredoka] text-[#FFD400] text-center mb-4 border-b border-[#FFD400]/20 pb-2"
              >
                Add Your Teammate
              </Dialog.Title>
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                {children}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DarkModal;
