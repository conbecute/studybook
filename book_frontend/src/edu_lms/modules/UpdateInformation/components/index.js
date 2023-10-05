import styled from "styled-components";
import SectionUpdateInfoUser from "./SectionUpdateInfoUser";
import avatar_login from "../../../assets/images/icon-avatar-login.svg";

const Images = styled.img`
  src: url(${(props) => props.src});
  width: 200px;
`;

const UpdateInformationWrapper = (props) => {
  return (
    <div className="update_information_wrapper pt-5 mb-5 pb-5">
      <div className="container-fluid container-xl">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="text-center monkey-mt-40 monkey-mb-40">
              <Images src={avatar_login} />
              <p className="monkey-f-bold mt-3 monkey-mb-40 monkey-fz-20">
                {props.userInfo.full_name}
              </p>
            </div>
            <div className="update_info_content d-flex justify-content-end">
              <SectionUpdateInfoUser
                onUpdateInfo={props.onUpdateInfo}
                onResetPW={props.onResetPW}
                onActiveSliderUpdateInfo={props.onActiveSliderUpdateInfo}
                onUpdateTeachingInformation={props.onUpdateTeachingInformation}
                listProvince={props.listProvince}
                listDistrict={props.listDistrict}
                listWard={props.listWard}
                listGradeAll={props.listGradeAll}
                listSchool={props.listSchool}
                listTeachingInformation={props.listTeachingInformation}
                dataTeachingInformation={props.dataTeachingInformation}
                userInfo={props.userInfo}
                valueProvinceDefault={props.valueProvinceDefault}
                valueDistrictDefault={props.valueDistrictDefault}
                valueWardDefault={props.valueWardDefault}
                valueGradeDefault={props.valueGradeDefault}
                valueSchool={props.valueSchool}
                valueSchoolName={props.valueSchoolName}
                statusSchool={props.statusSchool}
                valueJob={props.valueJob}
                listSubjectAll={props.listSubjectAll}
                messageError={props.messageError}
                numberActiveSlider={props.numberActiveSlider}
                isForgotPassword={props.isForgotPassword}
                notification={props.notification}
                onGetListSubject={props.onGetListSubject}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateInformationWrapper;
