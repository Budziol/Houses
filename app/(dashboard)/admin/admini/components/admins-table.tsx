import { db } from "@/lib/prisma";
import { formatDate } from "@/utils/formatDate";
import DeleteItem from "@/components/delete-item";
import { deleteAdmin } from "../actions/deleteAdmin";
import { User } from "@prisma/client";

const AdminsTable = async () => {
  const data: User[] = await db.user.findMany();

  return data.length <= 0 ? (
    <div>Brak płatności</div>
  ) : (
    <table className="w-full caption-bottom text-sm">
      <thead className="text-text-sub">
        <tr className="border-b border-gray-200 transition-colors data-[state=selected]:bg-muted hover:bg-muted">
          <th className="h-12 px-4 text-left align-middle font-medium">Imie</th>
          <th className="h-12 px-4 text-left align-middle font-medium">
            Email
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium">
            Stworzono
          </th>
          <th className="h-12 px-4 text-right align-middle font-medium">
            Akcje
          </th>
        </tr>
      </thead>
      <tbody className="last:border-0">
        {data.map((a, i) => (
          <tr
            key={a.id}
            className="border-b last:border-none border-gray-200 transition-colors hover:bg-muted"
          >
            <td className="py-4 px-4 align-middle whitespace-nowrap">
              {a.name}
            </td>
            <td className="py-4 px-4 align-middle whitespace-nowrap">
              {a.email}
            </td>
            <td className="py-4 px-4 align-middle whitespace-nowrap">
              {formatDate(a.createdAt)}
            </td>
            <td className="py-4 px-4 align-middle">
              <div className="flex justify-end gap-2">
                <DeleteItem
                  id={a.id}
                  itemName="admina"
                  deleteAction={deleteAdmin}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default AdminsTable;
