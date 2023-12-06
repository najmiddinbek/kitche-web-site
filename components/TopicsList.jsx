"use client";

import React, { useState, useEffect } from "react";
import RemoveBtn from "./RemoveBtn";
import { useRouter } from "next/navigation";


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
          {Object.keys(usersAddedByDate)
            .reverse()
            .map((date) => (
              <div key={date}>
                {usersAddedByDate[date]
                  .filter((t) =>
                    filterStatus === null ? true : t.isChecked === filterStatus
                  )
                  .map((t, index) => (
                    <div key={t.id} data-aos-duration="1000" data-aos="fade-up" className="blur2 mb-2 w-full px-3 py-2 block md:flex card_main justify-between border rounded-md text-black">
                      <div>
                        <p>Ovqat nomi: {t.title}</p>
                        <p>Porsi: {t.description}</p>
                        <p className="">Telefon raqami: {t.telefon}</p>
                        <p className="">Ismi familiya: {t.adress}</p>
                        <p className="">Ovqat narxi: {t.price}</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <RemoveBtn id={t._id} />
                        <button onClick={() => changeStatus(t._id)} className={`py-2 px-2 ${t.isChecked
                          ? " text-white bg-red-500 rounded-md cursor-pointer"
                          : " text-white bg-green-800  rounded-md cursor-pointer "
                          }`}>
                          {t.isChecked ? "Buyurtma tugatilmadi" : "Buyurtma tugatildi"}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ))
          }
        </div>
      </div >
    </>
  );

};

export default Filter;
