import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

function report() {
  const [graff, setgraff] = useState([]);
  const [graffMoney, setgraffMoney] = useState([]);
  useEffect(() => {
    get_rents();
  }, []);

  async function get_rents() {
    var list = [];
    var money = [];
    await axios
      .get(`https://desolate-sea-14156.herokuapp.com/rent`)
      .then((res) => {
        res.data.forEach((rent) => {
          console.log(rent.price);
          if (!list[new Date(rent.pickUp).getMonth()]) {
            list[new Date(rent.pickUp).getMonth()] = 1;
          } else {
            list[new Date(rent.pickUp).getMonth()] =
              list[new Date(rent.pickUp).getMonth()] + 1;
          }
        });
        console.log(list);
        setgraff(list);
        res.data.forEach((rent) => {
          if (!money[new Date(rent.pickUp).getMonth()]) {
            money[new Date(rent.pickUp).getMonth()] = 1;
          } else {
            if (rent.price)
              money[new Date(rent.pickUp).getMonth()] += rent.price;
          }
        });
        console.log(money);
        setgraffMoney(money);
      });
  }

  return (
    <main>
      <h2>Cantidad de rentas por meses</h2>
      <Chart
        width={320}
        height={300}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[
          [
            { type: "date", label: "Mes" },
            { type: "number", label: "values" },
          ],
          [new Date(2021, 0), graff[0]],
          [new Date(2021, 1), graff[1]],
          [new Date(2021, 2), graff[2]],
          [new Date(2021, 3), graff[3]],
          [new Date(2021, 4), graff[4]],
          [new Date(2021, 5), graff[5]],
          [new Date(2021, 6), graff[6]],
          [new Date(2021, 7), graff[7]],
          [new Date(2021, 8), graff[8]],
          [new Date(2021, 9), graff[9]],
          [new Date(2021, 10), graff[10]],
          [new Date(2021, 11), graff[11]],
        ]}
        options={{
          intervals: { style: "sticks" },
          legend: "none",
        }}
      />
      <h2>Dinero generado de rentas por meses</h2>
      <Chart
        width={320}
        height={300}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[
          [
            { type: "date", label: "Mes" },
            { type: "number", label: "values" },
          ],
          [new Date(2021, 0), graffMoney[0]],
          [new Date(2021, 1), graffMoney[1]],
          [new Date(2021, 2), graffMoney[2]],
          [new Date(2021, 3), graffMoney[3]],
          [new Date(2021, 4), graffMoney[4]],
          [new Date(2021, 5), graffMoney[5]],
          [new Date(2021, 6), graffMoney[6]],
          [new Date(2021, 7), graffMoney[7]],
          [new Date(2021, 8), graffMoney[8]],
          [new Date(2021, 9), graffMoney[9]],
          [new Date(2021, 10), graffMoney[10]],
          [new Date(2021, 11), graffMoney[11]],
        ]}
        options={{
          intervals: { style: "sticks" },
          legend: "none",
        }}
      />

      <style jsx>{`
        main {
          display: grid;
          place-content: center;
          place-items: center;
          width: 100vw;
        }
      `}</style>
    </main>
  );
}
export default report;
