"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
  const router = useRouter();
  const removeTopic = async () => {
    const confirmed = confirm("O`chirishga rozimisiz?");

    if (confirmed) {
      const res = await fetch(`/api/topics?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        location.reload();
      }
    }
  };

  return (
    <button onClick={removeTopic} className="text-red-400">
      {/* <HiOutlineTrash size={24} /> */}
      <button>O`chirish</button>
    </button>
  );
}
