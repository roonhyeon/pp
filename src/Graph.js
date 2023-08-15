import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";
import { CButton } from "@coreui/react";

function CandlestickChart() {
  const [stocks, setStocks] = useState([]);
  const [keyword, setKeyword] = useState("삼성전자");
  const [number, setNumber] = useState("50");

  const handleSearchClick = () => {
    const query = encodeURIComponent(keyword);

    const url =
      "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=A1S%2BTxfqfLvAOm%2BwE4iACyrRV6Kg1HprOApKZNmJeGg5bNN6krtDF98me%2FodzXOulO%2FvA7wvADvTX%2BzSCQqrbw%3D%3D&numOfRows=" +
      number +
      "&resultType=json&itmsNm=" +
      query;

    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          let stock_data = response.data;
          const dailyStockList = stock_data.response.body.items.item;
          setStocks(dailyStockList.reverse());
        }
      })
      .catch(() => console.log("오류"));
  };

  useEffect(() => {
    // 전일자 주식 가져오기
    handleSearchClick();
  }, []);

  const getCandleData = (stock) => ({
    x: stock.basDt,
    y: [parseFloat(stock.mkp), parseFloat(stock.hipr), parseFloat(stock.lopr), parseFloat(stock.clpr)],
  });

  const options = {
    series: [
      {
        data: stocks.map(getCandleData),
      },
    ],
    chart: {
      type: "candlestick",
      height: 800,
    },
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    xaxis: {
      type: "date",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div>
      <div className="input-group mb-3">
        <div className="p-1">
          <input
            type="text"
            id="top_keyword"
            value={keyword}
            placeholder="종목명: "
            onChange={(e) => {
              setKeyword(e.target.value);
              setNumber(document.querySelector("#top_number").value);
            }}
          />
        </div>
        <div className="p-1">
          <input
            type="text"
            id="top_number"
            value={number}
            placeholder="기간: "
            onChange={(e) => {
              setNumber(e.target.value);
              setKeyword(document.querySelector("#top_keyword").value);
            }}
          />
        </div>
        <div className="p-0">
          <CButton bsSize="xsmall" color="warning" id="btn_search" onClick={handleSearchClick}>
            검색
          </CButton>
        </div>
      </div>
      <div>
        {stocks.length > 0 ? (
          <ApexCharts
            options={options}
            series={options.series}
            type={options.chart.type}
            height={options.chart.height}
          />
        ) : (
          <h1>데이터가 없습니다.</h1>
        )}
      </div>
    </div>
  );
}

export default CandlestickChart;
