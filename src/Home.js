import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { MdAttachMoney, MdSpeakerNotes, MdQueryStats } from "react-icons/md";

function Home() {
  return (
    <div>
      <header className="bg-dark py-5">
        <div className="container px-5">
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-6">
              <div className="text-center my-5">
                <h1 className="display-5 fw-bolder text-white mb-2">Welcome to Sol Stock</h1>
                <p className="lead text-white-50 mb-4">
                  Sol Stock, 주식을 처음 접한 초보자도 주식 전문가도 언제든지 원하는 주식 정보를 쉽고 빠르게 파악할 수
                  있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="py-5 border-bottom" id="features">
        <div className="container px-5 my-5" style={{ height: "260px" }}>
          <div className="row gx-5">
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3 text-">
                <span className="material-icons-outlined">
                  <MdAttachMoney size={60} />
                </span>
              </div>
              <h2 className="h4 fw-bolder">전일 주식 시세</h2>
              <p>오늘의 장이 열리기 전에 바로 직전 최신 주식 시세를 먼저 확인해보세요.</p>
              <a className="text-decoration-none" href="/stock">
                바로가기
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                <span className="material-icons-outlined">
                  <MdSpeakerNotes size={50} />
                </span>
              </div>
              <h2 className="h4 fw-bolder">주식 뉴스</h2>
              <p>어디에 투자할지 고민되는 분들을 위해 최근 증권 소식들을 알려드립니다.</p>
              <a className="text-decoration-none" href="/news">
                바로가기
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                <span className="material-icons-outlined">
                  <MdQueryStats size={50} />
                </span>
              </div>
              <h2 className="h4 fw-bolder">주식 동향</h2>
              <p>원하는 종목명과 기간을 입력하면 예쁜 캔들 차트가 가격 추이를 보여줍니다.</p>
              <a className="text-decoration-none" href="/graph">
                바로가기
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
      <footer className="py-5 bg-dark">
        <div className="container px-5">
          <p className="m-0 text-center text-white">Copyright &copy; Sol Stock 2023</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
