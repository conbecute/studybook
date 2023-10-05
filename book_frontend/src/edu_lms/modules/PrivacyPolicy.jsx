import React from "react";
import styled from "styled-components";
import TitleComponent from "../components/title";
import useScrollToTop from "edu_lms_v2/services/useScrollToTop";
const StyledP = styled.p`
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const StyledH4 = styled.h4`
  line-height: 1.5;
`;

const PrivacyPolicyContainer = () => {
  useScrollToTop();
  return (
    <div className="privacy_policy_wrapper pt-5">
      <div className="container-fluid container-xl">
        <TitleComponent
          title="CHÍNH SÁCH BẢO MẬT THÔNG TIN CÁ NHÂN"
          className="monkey-color-violet title-contact text-uppercase border-bottom monkey-fz-34 text-left pb-4 mb-5"
        />
        <StyledP>
          Bảo mật thông tin của khách hàng là một trong những ưu tiên hàng đầu
          nhằm tạo điều kiện tốt nhất cho khách hàng tại Hoc10.vn. Vì thế, tại
          Hoc10.vn trân trọng và cam kết đảm bảo sẽ sử dụng thông tin trên một
          cách hợp lý, có cân nhắc và đúng quy định của luật, nhằm nâng cao chất
          lượng dịch vụ chăm sóc khách hàng
        </StyledP>
        <StyledH4>1 - MỤC ĐÍCH VÀ PHẠM VI THU THẬP THÔNG TIN</StyledH4>
        <StyledP>
          Để truy cập và sử dụng một số dịch vụ tại Hoc10.vn bạn có thể sẽ được
          yêu cầu đăng ký với chúng tôi thông tin cá nhân (Email, Họ tên, Số
          điện thoại liên lạc…). Mọi thông tin khai báo phải đảm bảo tính chính
          xác và hợp pháp. Hoc10.vn không chịu mọi trách nhiệm liên quan đến
          pháp luật của thông tin khai báo.
        </StyledP>
        <StyledP>
          Chúng tôi cũng có thể thu thập thông tin về số lần viếng thăm, bao gồm
          số trang bạn xem, số links (liên kết) bạn click và những thông tin
          khác liên quan đến việc kết nối đến site Hoc10.vn. Chúng tôi cũng thu
          thập các thông tin mà trình duyệt Web (Browser) bạn sử dụng mỗi khi
          truy cập vào Hoc10.vn bao gồm: địa chỉ IP, loại Browser, ngôn ngữ sử
          dụng, thời gian và những địa chỉ mà Browser truy xuất đến. Thông tin
          cá nhân thu thập được sẽ chỉ được hoc10.vn sử dụng trong nội bộ công
          ty và cho một hoặc tất cả các mục đích sau đây:
        </StyledP>
        <StyledP># Hỗ trợ khách hàng.</StyledP>
        <StyledP># Cung cấp thông tin liên quan đến dịch vụ.</StyledP>
        <StyledP>
          # Xử lý đơn đặt hàng và cung cấp dịch vụ và thông tin qua trang web
          của chúng tôi theo yêu cầu của bạn.
        </StyledP>
        <StyledP>
          # Chúng tôi có thể sẽ gửi thông tin sản phẩm, dịch vụ mới, thông tin
          về các sự kiện sắp tới hoặc thông tin tuyển dụng nếu quý khách đăng kí
          nhận email thông báo.
        </StyledP>
        <StyledP>
          # Ngoài ra, chúng tôi sẽ sử dụng thông tin bạn cung cấp để hỗ trợ quản
          lý tài khoản khách hàng; xác nhận và thực hiện các giao dịch tài chính
          liên quan đến các khoản thanh toán trực tuyến của bạn.
        </StyledP>
        <StyledH4>2 - PHẠM VI SỬ DỤNG THÔNG TIN</StyledH4>
        <StyledP>
          Hoc10.vn thu thập và sử dụng thông tin cá nhân với mục đích phù hợp và
          hoàn toàn tuân thủ nội dung của “Chính sách bảo mật” này.
        </StyledP>
        <StyledP>
          Khi cần thiết, chúng tôi có thể sử dụng những thông tin này để liên hệ
          trực tiếp với bạn dưới các hình thức như: gởi thư ngỏ, đơn đặt hàng,
          thư cảm ơn, sms, thông tin về kỹ thuật và bảo mật…
        </StyledP>
        <StyledH4>3 - THỜI GIAN LƯU TRỮ THÔNG TIN</StyledH4>
        <StyledP>
          Dữ liệu cá nhân của Thành viên sẽ được lưu trữ cho đến khi có yêu cầu
          hủy bỏ hoặc tự thành viên đăng nhập và thực hiện hủy bỏ. Còn lại trong
          mọi trường hợp thông tin cá nhân thành viên sẽ được bảo mật trên máy
          chủ của Hoc10.vn.
        </StyledP>
        <StyledH4>
          4 - ĐỊA CHỈ CỦA ĐƠN VỊ THU THẬP VÀ QUẢN LÝ THÔNG TIN CÁ NHÂN
        </StyledH4>
        <StyledP>CÔNG TY CỔ PHẦN ONE PERCENT</StyledP>
        <StyledP>
          Địa chỉ: Tầng 2, tòa nhà HH-N01, dự án Gold Season, Số 47 đường Nguyễn
          Tuân, Phường Thanh Xuân Trung, Quận Thanh Xuân, Tp. Hà Nội
        </StyledP>
        <StyledP>
          Hotline: <a href="tel:+842473098866">02473098866</a>
        </StyledP>
        <StyledP>
          Email: <a href="mailto:contact@hoc10.vn">contact@hoc10.vn</a>
        </StyledP>
        <StyledH4>
          5 - PHƯƠNG TIỆN VÀ CÔNG CỤ ĐỂ NGƯỜI DÙNG TIẾP CẬN VÀ CHỈNH SỬA DỮ LIỆU
          CÁ NHÂN CỦA MÌNH
        </StyledH4>
        <StyledP>
          Khách hàng có thể tự chỉnh sửa dữ liệu cá nhân của mình (bao gồm thông
          tin cơ bản, thông tin trường học, thông tin giảng dạy và thông tin
          liên lạc) bằng cách truy cập vào trang “Cập nhật thông tin” sau khi đã
          đăng nhập thành công vào Hoc10.vn.
        </StyledP>
        <StyledH4>6 - CAM KẾT BẢO MẬT THÔNG TIN CÁ NHÂN KHÁCH HÀNG.</StyledH4>
        <StyledP>
          Thông tin cá nhân của thành viên trên Hoc10.vn được cam kết bảo mật
          tuyệt đối theo chính sách bảo vệ thông tin cá nhân của Hoc10.vn Việc
          thu thập và sử dụng thông tin của mỗi thành viên chỉ được thực hiện
          khi có sự đồng ý của khách hàng đó trừ những trường hợp pháp luật có
          quy định khác.
        </StyledP>
        <StyledP>
          Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3
          nào về thông tin cá nhân của thành viên khi không có sự cho phép đồng
          ý từ thành viên (trừ khi có yêu cầu từ cơ quan chức năng có thẩm
          quyền).
        </StyledP>
        <StyledP>
          Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến
          mất mát dữ liệu cá nhân thành viên, Hoc10.vn sẽ có trách nhiệm thông
          báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo
          cho thành viên được biết.
        </StyledP>
        <StyledP>
          Bảo mật tuyệt đối mọi thông tin giao dịch trực tuyến của Thành viên
          bao gồm thông tin hóa đơn kế toán chứng từ số hóa tại khu vực dữ liệu
          trung tâm an toàn cấp 1 của Hoc10.vn.
        </StyledP>
        <StyledP>
          Ban quản lý Hoc10.vn yêu cầu các cá nhân khi đăng ký là thành viên,
          cộng tác viên phải cung cấp đầy đủ thông tin cá nhân có liên quan như:
          Họ và tên, địa chỉ liên lạc, email, số chứng minh nhân dân, điện
          thoại, số tài khoản, mã cộng tác viên …., và chịu trách nhiệm về tính
          pháp lý của những thông tin trên. Ban quản lý Hoc10.vn không chịu
          trách nhiệm cũng như không giải quyết mọi khiếu nại có liên quan đến
          quyền lợi của Thành viên đó nếu xét thấy tất cả thông tin cá nhân của
          thành viên đó cung cấp khi đăng ký ban đầu là không chính xác.
        </StyledP>
        <StyledP>
          Một điều rất quan trọng đối với khách hàng là việc tự bảo vệ thông tin
          của mình trước sự tiếp cận thông tin về password khi dùng chung máy
          tính với nhiều người. Khi đó, Quý khách phải chắc chắn đã thoát khỏi
          tài khoản sau khi sử dụng dịch vụ của chúng tôi.
        </StyledP>
        <StyledP>
          Ngoài ra do hạn chế về mặt kỹ thuật, không một dữ liệu nào được truyền
          trên đường truyền internet mà được bảo mật 100%. Vì vậy, chúng tôi
          không thể đưa ra một cam kết chắc chắn rằng thông tin quý khách cung
          cấp cho chúng tôi được bảo mật một cách tuyệt đối an toàn, và chúng
          tôi không chịu trách nhiệm trong trường hợp có sự truy cập trái phép
          thông tin cá nhân của quý khách như trường hợp quý khách tự ý chia sẻ
          thông tin với người khác....
        </StyledP>
        <StyledH4>Mọi thông tin cần thiết vui lòng liên hệ:</StyledH4>
        <StyledP>CÔNG TY CỔ PHẦN ONE PERCENT</StyledP>
        <StyledP>
          Địa chỉ: Tầng 2, tòa nhà HH-N01, dự án Gold Season, Số 47 đường Nguyễn
          Tuân, Phường Thanh Xuân Trung, Quận Thanh Xuân, Tp. Hà Nội
        </StyledP>
        <StyledP>
          Mã số thuế: 0109621809 do Sở Kế hoạch và Đầu tư TP Hà Nội, cấp ngày
          06/05/2021
        </StyledP>
        <StyledP>Người chịu trách nhiệm chính: Ông Đào Xuân Hoàng</StyledP>
        <StyledP>
          Hotline: <a href="tel:+842473098866">02473098866</a>
        </StyledP>
        <StyledP>
          Email: <a href="mailto:contact@hoc10.vn">contact@hoc10.vn</a>
        </StyledP>
        <StyledP>Xin chân thành cảm ơn!</StyledP>
      </div>
    </div>
  );
};

export default PrivacyPolicyContainer;
