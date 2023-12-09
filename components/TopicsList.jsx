"use client";

import React, { useState, useEffect } from "react";
import RemoveBtn from "./RemoveBtn";
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.css'
// own css files here
// import "../css/customcss.css";


const Filter = () => {
  const [loading, setLoading] = useState(true);
  const [topics, setTopiclar] = useState([]);
  const [filteredMavzula, setFilteredMavzula] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(null);

  const router = useRouter()


  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [filterValue, setFilterValue] = useState({
    date: "",
  });
  const [hide, setHide] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/topics", {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Mavzular yuklanmadi");
        }

        const data = await res.json();
        const topics = data?.topics;

        setTopiclar(topics);
        setFilteredMavzula(topics);
      } catch (error) {
        console.log("Mavzular yuklanishda xatolik: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  const [usersAddedByDate, setUsersAddedByDate] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const usersGroupedByDate = filteredMavzula.reduce((acc, t) => {
        const dateKey = new Date(t.createdAt).toLocaleDateString();
        acc[dateKey] = acc[dateKey] || [];
        acc[dateKey].push(t);
        return acc;
      }, {});

      setUsersAddedByDate(usersGroupedByDate);
    };

    fetchData();
  }, [filteredMavzula]);




  const [filterStatus, setFilterStatus] = useState(null);

  const changeStatus = async (id) => {
    const confirmed = confirm("Buyurtma bajarildimi?");

    if (confirmed) {
      const res = await fetch(`/api/topics?id=${id}`, {
        method: "PUT",
      });

      if (res.ok) {
        location.reload();
      }
    }
  };




  return (
    <>
      <div className="min-h-screen">
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th className="py-4 px-3 text-[17px] uppercase">№</th>
                <th className="py-4 px-3 text-[17px] uppercase">Ovqat nomi</th>
                <th className="py-4 px-3 text-[17px] uppercase">Porsi</th>
                <th className="py-4 px-3 text-[17px] uppercase">Telefon raqami</th>
                <th className="py-4 px-3 text-[17px] uppercase">Manzili</th>
                <th className="py-4 px-3 text-[17px] uppercase">Jami narxi</th>
                <th className="py-4 px-3 text-[17px] uppercase"></th>
                <th className="py-4 px-3 text-[17px] uppercase"></th>
              </tr>
            </thead>
            <tbody className="text-center">
              {Object.keys(usersAddedByDate)
                .reverse()
                .map((date) => (
                  usersAddedByDate[date]
                    .filter((t) => (filterStatus === null ? true : t.isChecked === filterStatus))
                    .map((t, index) => (
                      <tr key={t._id}>
                        <td>{index + 1}</td>
                        <td>{t.title}</td>
                        <td>{t.description}</td>
                        <td>{t.telefon}</td>
                        <td>{t.adress}</td>
                        <td>{t.price}</td>
                        <td><RemoveBtn id={t._id} /></td>
                        <td>
                          <button onClick={() => changeStatus(t._id)} className={`py-2 px-2 ${t.isChecked
                            ? " text-white bg-red-500 rounded-md cursor-pointer"
                            : " text-white bg-green-800  rounded-md cursor-pointer "
                            }`}>
                            {t.isChecked ? "Buyurtma tugatilmadi" : "Buyurtma tugatildi"}
                          </button>
                        </td>
                      </tr>
                    ))
                ))}
            </tbody>
          </table>
        </div>
      </div>

    </>
  );

};

export default Filter;
