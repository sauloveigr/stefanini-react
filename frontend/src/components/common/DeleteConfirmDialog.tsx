import type { User } from "../../features/user/types/user";
import { AlertTriangle } from "lucide-react";
import { Dialog, DialogPanel, Transition, TransitionChild, DialogTitle } from "@headlessui/react";
import { Button } from "../ui/Button";
import { Fragment } from "react";

interface DeleteConfirmDialogProps {
  user: User;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmDialog = ({ user, onConfirm, onCancel }: DeleteConfirmDialogProps) => {
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onCancel}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2.5 bg-red-100 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-semibold text-gray-900">Confirmar Exclusão</DialogTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Esta ação não pode ser desfeita
                  </p>
                </div>
              </div>

              <p className="text-base text-gray-600 mb-8">
                Tem certeza que deseja excluir <span className="font-medium text-gray-900">{user.name}</span>?
                Esta ação removerá permanentemente o usuário e todos os dados associados.
              </p>

              <div className="flex justify-end gap-3">
                <Button
                  onClick={onCancel}
                  variant="default"
                  className="text-sm font-medium"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={onConfirm}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium"
                >
                  Excluir
                </Button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};