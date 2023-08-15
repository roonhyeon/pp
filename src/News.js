import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import axios from "axios";
import { CTableBody } from "@coreui/react";
import { CTable } from "@coreui/react";
import { CTableHead } from "@coreui/react";

export default function News() {
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const [news, setNews] = useState([]);

  useEffect(() => {
    const info = async () => {
      const options = {
        method: "GET",
        url: "https://api.newscatcherapi.com/v2/search?q=증권",
        headers: {
          "x-api-key": "AOC9RGI8kUKPS2NNXyPclGSDurakMIdmgoGaBYaIVo8",
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        if (response.data) {
          let news_data = response.data;
          const dailyNewsList = news_data.articles;
          setNews(dailyNewsList);
        }
      } catch (error) {
        console.error(error);
      }
    };

    info();
  }, []);

  let displayData = null;
  if (news) {
    const startIndex = (activePage - 1) * itemsPerPage;
    const visibleNews = news.slice(startIndex, startIndex + itemsPerPage);

    displayData = (
      <div>
        <CTable>
          <CTableHead color="dark">
            <tr>
              <th className="text-center"></th>
              <th className="text-center">기사명</th>
              <th className="text-center">미리보기</th>
              <th className="text-center">작성날짜</th>
            </tr>
          </CTableHead>
          <CTableBody>
            {visibleNews.map((news, idx) => (
              <tr key={idx}>
                <td className="text-center">{idx + 1}</td>
                <td className="text-start">
                  <a href={news.link}>{news.title}</a>
                </td>
                <td className="text-start">{news.excerpt}</td>
                <td className="text-center">{news.published_date}</td>
              </tr>
            ))}
          </CTableBody>
        </CTable>
        <div className="d-flex justify-content-center mt-3">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={news.length}
            pageRangeDisplayed={10}
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

  return <div>{displayData}</div>;
}
