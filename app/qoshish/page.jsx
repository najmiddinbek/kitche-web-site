"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [adress, setAdress] = useState("");
  const [telefon, setTelefon] = useState("")
  const [price, setPrice] = useState("");
  const [secondTitle, setSecondTitle] = useState("");
  const [secondPrice, setSecondPrice] = useState("");
  const [secondDescription, setSecondDescription] = useState("");
  const [secondAdress, setSecondAdress] = useState("");
  const [secondTelefon, setSecondTelefon] = useState("");
  const [drink, setDrink] = useState("");
  const [drink2, setDrink2] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  }




  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!title || !description || !adress || !telefon) {
    //   alert("Barcha maydonlarni to`ldiring!!!");
    //   return;
    // }

    try {
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description, adress, drink, drink2, telefon, price, secondTitle, secondPrice, secondDescription, secondAdress, secondTelefon }),
      });

      if (res.ok) {
        router.push("/qoshish");
        alert("Muvaffaqiyatli yuborildi!")
      } else {
        alert("Internetni tekshirib ko`ring")
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const taomlar = [
    {
      id: 1,
      taom: "Osh",
      narxi: "15000",
    },
    {
      id: 2,
      taom: "Sho`rva",
      narxi: "20000",
    },
    {
      id: 3,
      taom: "Qotirma",
      narxi: "25000",
    },
    {
      id: 4,
      taom: "Dimlama",
      narxi: "15000",
    },
  ]
  const taomlar2 = [
    {
      id: 1,
      taom: "Osh",
      narxi: "15000",
    },
    {
      id: 2,
      taom: "Sho`rva",
      narxi: "20000",
    },
    {
      id: 3,
      taom: "Qotirma",
      narxi: "25000",
    },
    {
      id: 4,
      taom: "Dimlama",
      narxi: "15000",
    },
  ]


  const ichimliklar = [
    {
      id: 1,
      nomi: 'Fanta 0.5',
      olchami: '0.5',
      narxi: '6000'
    },
    {
      id: 2,
      nomi: 'Fanta 1.0',
      olchami: '1.0',
      narxi: '10000'
    },
    {
      id: 3,
      nomi: 'Fanta 1.5',
      olchami: '1.5',
      narxi: '14000'
    },
    {
      id: 4,
      nomi: 'Cola 0.5',
      olchami: '0.5',
      narxi: '6000'
    },
    {
      id: 5,
      nomi: 'Cola 1.0',
      olchami: '1.0',
      narxi: '10000'
    },
    {
      id: 6,
      nomi: 'Cola 1.5',
      olchami: '1.5',
      narxi: '14000'
    }
  ]

  const [timeValue, setTimeValue] = useState(0);
  const [timeValue1, setTimeValue2] = useState(0);

  const [drinkPrice, setDrinkPrice] = useState(0);
  const [secondDrinkPrice, setSecondDrinkPrice] = useState(0);

  useEffect(() => {
    const selectedDrink = ichimliklar.find((item) => item.nomi === drink);
    if (selectedDrink) {
      setDrinkPrice(selectedDrink.narxi);
    } else {
      setDrinkPrice(0);
    }
  }, [drink]);

  useEffect(() => {
    const selectedDrink2 = ichimliklar.find((drink) => drink.nomi === drink2);
    if (selectedDrink2) {
      setSecondDrinkPrice(selectedDrink2.narxi);
    } else {
      setSecondDrinkPrice(0);
    }
  }, [drink2]);

  useEffect(() => {
    const selectedFood = taomlar.find((food) => food.taom === title);

    if (selectedFood) {
      setTimeValue(selectedFood.narxi);

      if (description === '1-pors') {
        setTimeValue(selectedFood.narxi * 1);
      } else if (description === '2-pors') {
        setTimeValue(selectedFood.narxi * 2);
      } else if (description === '3-pors') {
        setTimeValue(selectedFood.narxi * 3);
      }
    } else {
      setTimeValue(0);
    }
  }, [title, description]);


  useEffect(() => {
    const selectedFood2 = taomlar2.find((food) => food.taom === secondTitle);

    if (selectedFood2) {
      setTimeValue2(selectedFood2.narxi);

      if (secondDescription === '1-pors') {
        setTimeValue2(selectedFood2.narxi * 1);
      } else if (secondDescription === '2-pors') {
        setTimeValue2(selectedFood2.narxi * 2);
      } else if (secondDescription === '3-pors') {
        setTimeValue2(selectedFood2.narxi * 3);
      }
    } else {
      setTimeValue2(0);
    }
  }, [secondTitle, secondDescription]);


  return (
    <div className="min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <select className="border border-slate-800 py-2 px-3" onChange={(e) => setTitle(e.target.value)} value={title}>
          <option>Tanlang</option>
          {taomlar.map((ovqat, id) => (
            <option key={id}>{ovqat.taom}</option>
          ))}

        </select>


        <select className="border border-slate-800 py-2 px-3" onChange={(e) => setDescription(e.target.value)}>
          <option>Tanlang</option>
          <option>1-pors</option>
          <option>2-pors</option>
          <option>3-pors</option>
        </select>


        <input onChange={(e) => setAdress(e.target.value)} value={adress} className="border border-slate-500 px-8 py-2" type="text"
          placeholder="Manzili" />


        <input onChange={(e) => setTelefon(e.target.value)} value={telefon} className="border border-slate-500 px-8 py-2" type="text"
          placeholder="Telefon raqam" />

        <select className="border border-slate-800 py-2 px-3" onChange={(e) => setDrink(e.target.value)} value={drink}>
          <option>Tanlang</option>
          <option>Fanta 0.5</option>
          <option>Fanta 1.0</option>
          <option>Fanta 1.5</option>
          <option>Cola 0.5</option>
          <option>Cola 1.0</option>
          <option>Cola 1.5</option>
        </select>


        <select className="border border-slate-600 py-2 px-3" onChange={(e) => setPrice(e.target.value)} value={price}>
          <option>Tanlang</option>
          <option>{parseInt(timeValue) + parseInt(drinkPrice)} so`m</option>
        </select>




        <button type="submit" className="bg-green-800 py-2 px-4 rounded-md cursor-pointer  text-white">
          Qo`shish
        </button>

        <div onClick={handleOpen} className="bg-green-900 w-fit py-2 px-4 cursor-pointer rounded-md flex justify-center items-center gap-2 text-white">
          Yana ovqat  <FaPlus />
        </div>



        {open ? (
          <>
            <select className="border border-slate-800 py-2 px-3" onChange={(e) => setSecondTitle(e.target.value)} value={secondTitle}>
              <option>Tanlang</option>
              {taomlar2.map((ovqat, id) => (
                <option key={id}>{ovqat.taom}</option>
              ))}

            </select>


            <select className="border border-slate-800 py-2 px-3" onChange={(e) => setSecondDescription(e.target.value)} value={secondDescription}>
              <option>Tanlang</option>
              <option>1-pors</option>
              <option>2-pors</option>
              <option>3-pors</option>
            </select>


            <input onChange={(e) => setSecondAdress(e.target.value)} value={secondAdress} className="border border-slate-500 px-8 py-2" type="text"
              placeholder="Manzili" />
            <input onChange={(e) => setSecondTelefon(e.target.value)} value={secondTelefon} className="border border-slate-500 px-8 py-2" type="text"
              placeholder="Telefon raqam" />

            <select className="border border-slate-800 py-2 px-3" onChange={(e) => setDrink2(e.target.value)} value={drink2}>
              <option>Tanlang</option>
              <option>Fanta 0.5</option>
              <option>Fanta 1.0</option>
              <option>Fanta 1.5</option>
              <option>Cola 0.5</option>
              <option>Cola 1.0</option>
              <option>Cola 1.5</option>
            </select>


            <select className="border border-slate-600 py-2 px-3" onChange={(e) => setPrice(e.target.value)} value={price}>
              <option>Tanlang</option>
              <option>{parseInt(timeValue1) + parseInt(secondDrinkPrice)} so`m</option>
            </select>




            <button type="submit" className="bg-green-800 py-2 px-4 rounded-md cursor-pointer text-white">
              Qo`shish
            </button>
          </>
        ) : null}






      </form>
    </div>
  );
}
