import { Container, Row, Col } from "react-bootstrap";
import Pagination from "react-js-pagination";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { CTable } from "@coreui/react";
import { CTableBody } from "@coreui/react";
import { CTableHead } from "@coreui/react";

function Stock() {
  const radios = [
    { name: "KOSPI", value: "KOSPI" },
    { name: "KOSDAQ", value: "KOSDAQ" },
  ];

  const [radioValue, setRadioValue] = useState("KOSPI");

  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 15;

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const [keyword, setKeyword] = useState("");
  const [stocks, setStocks] = useState([]);

  const handleSearchClick = () => {
    const query = encodeURIComponent(keyword);

    const url =
      "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=A1S%2BTxfqfLvAOm%2BwE4iACyrRV6Kg1HprOApKZNmJeGg5bNN6krtDF98me%2FodzXOulO%2FvA7wvADvTX%2BzSCQqrbw%3D%3D&numOfRows=500&resultType=json&itmsNm=" +
      query +
      "&mrktCls=" +
      radioValue;

    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          let stock_data = response.data;
          const dailyStockList = stock_data.response.body.items.item;
          setStocks(dailyStockList);
        }
      })
      .catch(() => console.log("오류"));
  };

  useEffect(() => {
    // 전일자 주식 가져오기
    handleSearchClick();
  }, []);

  let displayData = null;
  if (stocks) {
    const startIndex = (activePage - 1) * itemsPerPage;
    const visibleStocks = stocks.slice(startIndex, startIndex + itemsPerPage);

    displayData = (
      <div>
        <CTable>
          <CTableHead color="dark" striped>
            <tr>
              <th className="text-center">날짜</th>
              <th className="text-center">종목명</th>
              <th className="text-center">지수명</th>
              <th className="text-end">시가</th>
              <th className="text-end">고가</th>
              <th className="text-end">저가</th>
              <th className="text-end">종가</th>
              <th className="text-end">전일대비</th>
              <th className="text-end">수익률</th>
              <th className="text-end">거래량</th>
            </tr>
          </CTableHead>
          <CTableBody>
            {visibleStocks.map((stock, idx) => (
              <tr key={idx}>
                <td className="text-center">{stock.basDt}</td>
                <td className="text-center">{stock.itmsNm}</td>
                <td className="text-center">{stock.mrktCtg}</td>
                <td className="text-end">{stock.mkp}</td>
                <td className="text-end">{stock.hipr}</td>
                <td className="text-end">{stock.lopr}</td>
                <td className="text-end">{stock.clpr}</td>
                <td className="text-end">{stock.vs}</td>
                <td className="text-end">{stock.fltRt}</td>
                <td className="text-end">{stock.trqu}</td>
              </tr>
            ))}
          </CTableBody>
        </CTable>
        <div className="d-flex justify-content-center mt-3">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={stocks.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      </div>
    );
  } else {
    displayData = <h1>데이터가 없습니다.</h1>;
  }

  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col>
            <div className="input-group mb-3">
              <input type="text" id="top_keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
              <button id="btn_search" onClick={handleSearchClick}>
                검색
              </button>
            </div>
          </Col>
          <Col>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={idx % 2 ? "outline-success" : "outline-warning"}
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={() => {
                      setRadioValue(radio.value);
                    }}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
                <button id="btn_search" onClick={handleSearchClick}>
                  검색
                </button>
              </ButtonGroup>
            </div>
          </Col>
        </Row>
        <div>{displayData}</div>
      </Container>
    </div>
  );
}

export default Stock;
