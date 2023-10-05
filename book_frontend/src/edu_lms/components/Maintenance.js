import { Alert } from "react-bootstrap";

export default function Maintenance() {
  return (
    <Alert variant="warning">
      <Alert.Heading>Website Hoc10 đang bảo trì</Alert.Heading>
      <p>
        Hoc10 rất tiếc vì sự bất tiện này. Website đang được bảo trì để cập nhật
        hệ thống và nâng cao trải nghiệm. Thời gian bảo trì dự kiến là 3 giờ.
      </p>
      <hr />
      <p className="mb-0">
        Thầy/cô vui lòng quay lại website sau 13:00 25/07/2022.
      </p>
    </Alert>
  );
}
