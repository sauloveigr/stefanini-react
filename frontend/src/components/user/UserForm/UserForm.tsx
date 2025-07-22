import { useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import { X, Save } from "lucide-react";
import { Dialog, DialogPanel, Select, Transition, TransitionChild } from "@headlessui/react";
import type { UserFormData } from "@/types/user";
import type { User } from "@/types/user";
import { validateEmail } from "@/utils/validateEmail";
import { validateDate } from "@/utils/validateDate";
import { validateCPF } from "@/utils/validateCpf";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/form/FormField";
import { TextInputField } from "@/components/ui/form/TextInputField";
import { DialogHeader } from "@/components/ui/form/FormHeader";

interface UserFormProps {
  user?: User;
  onSubmit: (userData: UserFormData) => void;
  onCancel: () => void;
  title: string;
}

export const UserForm = ({ user, onSubmit, onCancel, title }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UserFormData>();

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("gender", user.gender);
      setValue("email", user.email);
      setValue("birthDate", user.birthDate);
      setValue("placeOfBirth", user.placeOfBirth);
      setValue("nationality", user.nationality);
      setValue("cpf", user.cpf);
    } else {
      reset();
    }
  }, [user]);

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
            <DialogPanel className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg">
              <DialogHeader title={title} onCancel={onCancel} />

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-0 gap-x-4">
                  <TextInputField
                    label="Nome"
                    required
                    placeholder="Digite o nome completo"
                    error={errors.name?.message}
                    register={register("name", { required: "Nome é obrigatório" })}
                  />

                  <FormField
                    label="Sexo"
                    required
                    error={errors.gender?.message}
                  >
                    <Select
                      {...register("gender")}
                      className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Selecione o sexo</option>
                      <option value="male">Masculino</option>
                      <option value="female">Feminino</option>
                      <option value="other">Outro</option>
                    </Select>
                  </FormField>

                  <TextInputField
                    label="Email"
                    required
                    placeholder="exemplo@email.com"
                    error={errors.email?.message}
                    register={register("email", {
                      validate: (email: string | undefined) => {
                        if (email) return validateEmail(email);
                        return true;
                      }
                    })}
                    type="email"
                  />

                  <TextInputField
                    label="Data de nascimento"
                    required
                    error={errors.birthDate?.message}
                    register={register("birthDate", {
                      required: "Data de nascimento é obrigatória",
                      validate: validateDate
                    })}
                    type="date"
                  />

                  <TextInputField
                    label="Naturalidade"
                    required
                    placeholder="Cidade onde nasceu"
                    error={errors.placeOfBirth?.message}
                    register={register("placeOfBirth")}
                  />

                  <TextInputField
                    label="Nacionalidade"
                    required
                    placeholder="País de origem"
                    error={errors.nationality?.message}
                    register={register("nationality")}
                  />

                  <TextInputField
                    label="CPF"
                    required
                    placeholder="000.000.000-00"
                    error={errors.cpf?.message}
                    register={register("cpf", {
                      required: "CPF é obrigatório",
                      validate: validateCPF
                    })}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button type="button" onClick={onCancel} icon={<X className="w-4 h-4 mr-2" />} variant="default">
                    Cancelar
                  </Button>

                  <Button type="submit" variant="primary" icon={<Save className="w-4 h-4 mr-2" />}>
                    Salvar
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};