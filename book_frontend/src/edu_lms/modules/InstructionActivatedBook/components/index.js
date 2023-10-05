import styled from "styled-components";
import FromCheckSeriBook from "./FromCheckSeriBook";

const urlImg = `${process.env.REACT_APP_MEDIA_URL_APP}E_Learning/web_site`;

const InstructionActivatedBookWrapper = (props) => {
  const openMail = (e, email) => {
    e.preventDefault();
    window.open(`mailto:${email}`, "_self");
  };
  const callTel = (e, phone) => {
    e.preventDefault();
    window.open(`tel:${phone}`, "_self");
  };
  const openWeb = (e, url) => {
    e.preventDefault();
    window.open(url, "_self");
  };

  return (
    <Container className="introduce_activated_book_wrapper mb-5">
      <div className="container-fluid container-xl">
        <div className="row">
          <div className="col-12">
            <div className="monkey-bg-white insert-code">
              <p>
                - Thầy cô vui lòng nhập số seri bao gồm 12 ký tự được in trên
                tem chống giả ở bìa sách cuối cùng và nhấn "Kiểm tra"
              </p>
              <FromCheckSeriBook />
              <p className="mt-4 font-weight-bold">Thầy cô lưu ý:</p>
              <p className="mt-3">
                - Trường hợp màn hình hiện thông báo màu xanh có nội dung “
                <span className="text-success">Mã seri hợp lệ</span>” có nghĩa
                cuốn sách của tương ứng với seri đó là sách do Cánh Diều xuất
                bản.
              </p>
              <p className="mt-2">
                - Trường hợp màn hình hiện thông báo màu đỏ có nội dung “
                <span className="text-danger">Mã seri không hợp lệ</span>” có
                nghĩa là cuốn sách tương ứng với seri đó KHÔNG phải do Cánh Diều
                xuất bản.
              </p>
              <p className="text-join-hands pt-4">
                Chung tay đẩy lùi sách giả!
              </p>
            </div>
            <img
              className="w-100 pt-2"
              src={`${urlImg}/Hinh_anh_tem_chong_gia_2022.png`}
              alt="Hình ảnh tem chống giả"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default InstructionActivatedBookWrapper;

const Container = styled.div`
  line-height: 1.5;
  .insert-code {
    border-radius: 15px;
    font-size: 17px;
  }
  .text-join-hands {
    font-size: 14px;
    font-style: italic;
    text-align: right;
  }
`;
