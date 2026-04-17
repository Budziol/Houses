"use client";

import { DeleteButton, GhostButton } from "@/components/buttons";
import ModalBackground from "@/components/modal-background";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

type DeleteActionResponse = {
  success?: boolean;
  error?: string;
};

type Props = {
  id: string;
  itemName: string; // np. "użytkownika", "posta"
  deleteAction: (id: string) => Promise<DeleteActionResponse>; // Tu przekazujemy Server Action
};

const DeleteItem = ({ id, itemName, deleteAction }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    // startTransition informuje Reacta, że wykonujemy akcję serwerową
    startTransition(async () => {
      const result = await deleteAction(id);

      if (result.success) {
        setIsOpen(false); // Zamknij modal po sukcesie
      } else {
        alert(result.error); // Prosty komunikat o błędzie
      }
    });
  };

  return (
    <>
      <button
        className="p-2 border border-gray-200 hover:border-background-muted rounded-lg hover:bg-gray-100 duration-150 transition-all cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Trash2 size={14} className="text-background-muted" />
      </button>

      {isOpen && (
        <ModalBackground onClose={() => setIsOpen(false)}>
          <h3 className="font-bold text-xl">Potwierdź usunięcie</h3>
          <p>
            Czy chcesz usunąć {itemName} o ID: {id}
          </p>
          <div className="">
            <DeleteButton onClick={handleDelete} disabled={isPending}>
              {isPending ? "Usuwanie..." : "Usuń"}
            </DeleteButton>
            <GhostButton className="mt-2" onClick={() => setIsOpen(false)}>
              Anuluj
            </GhostButton>
          </div>
        </ModalBackground>
      )}
    </>
  );
};
export default DeleteItem;
