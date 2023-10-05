<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\BaseController;
use App\Repositories\Lms\HistoryQuizRepository;
use App\Repositories\Lms\ProvinceRepository;
use App\Repositories\Lms\SchoolProvinceRepository;
use App\Repositories\Lms\SchoolRepository;
use App\Repositories\Lms\UserGradeRepository;
use App\Repositories\Lms\UserGradeSubjectRepository;
use App\Repositories\Lms\UserSchoolRepository;
use App\Services\ServiceConnect\AppConnectService;
use Illuminate\Http\Request;

class UserSchoolController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    private $userSchoolRepository;
    private $provinceRepository;
    private $userGradeRepository;
    private $userGradeSubjectRepository;
    private $schoolRepository;
    private $schoolProvinceRepository;
    private $appConnectService;
    private $historyQuizRepository;

    public function __construct(
        UserSchoolRepository $userSchoolRepository,
        ProvinceRepository $provinceRepository,
        UserGradeRepository $userGradeRepository,
        UserGradeSubjectRepository $userGradeSubjectRepository,
        SchoolRepository $schoolRepository,
        SchoolProvinceRepository $schoolProvinceRepository,
        AppConnectService $appConnectService,
        HistoryQuizRepository $historyQuizRepository
    )
    {
        $this->userSchoolRepository = $userSchoolRepository;
        $this->provinceRepository = $provinceRepository;
        $this->userGradeRepository = $userGradeRepository;
        $this->userGradeSubjectRepository = $userGradeSubjectRepository;
        $this->schoolRepository = $schoolRepository;
        $this->schoolProvinceRepository = $schoolProvinceRepository;
        $this->appConnectService = $appConnectService;
        $this->historyQuizRepository = $historyQuizRepository;
    }

    public function getInfoUserSchool(Request $request)
    {
        $userId = $this->infoUserId();
        $userInfo = [];

        if (!$userId) {
            $this->message = __('app.invalid_params');
            goto next;
        }
        $userInfo = $this->userSchoolRepository->getInfoUserSchool($userId);

        if (!$userInfo) {
            $this->status = 'success';
            $userInfo = [
                'province_id' => null,
                'district_id' => null,
                'ward_id' => null,
                'job_id' => null,
                'birth_day' => null,
                'school_id' => null,
                'school_name' => null,
                'full_name' => null,
                'gender_id' => null,
                'province_name' => null,
                'district_name' => null,
                'ward_id_name' => null,
                'notification' => 1,
                'status' => 1,
            ];
            goto next;
        }

        if ($userInfo->role_id == null) {
            $userInfo->role_id = 0;
        }

        $infoProvince = $this->provinceRepository->getInfoProvince([$userInfo->province_id, $userInfo->district_id, $userInfo->ward_id])->toArray();
        foreach ($infoProvince as $province) {
            if ($province['id'] == $userInfo->province_id) {
                $userInfo['province_name'] = $province['name'];
            }
            if ($province['id'] == $userInfo->district_id) {
                $userInfo['district_name'] = $province['name'];
            }
            if ($province['id'] == $userInfo->ward_id) {
                $userInfo['ward_id_name'] = $province['name'];
            }
        }

        $userGradeSubject = $this->userGradeSubjectRepository->getListGradeSubject($userId)->toArray();
        $userInfo["list_grade_subject"] = $userGradeSubject;

        $this->message = 'success';
        $this->status = 'success';

        next:
        return $this->responseData($userInfo);
    }

    public function getInfoTeacher(Request $request)
    {
        $phone = $request->input("phone");
        $email = $request->input("email");
        $formatData = [];
        if (!$phone && !$email) {
            return "Vui lòng nhập email hoặc số điện thoại";
        }

        $listUserInfo = $this->appConnectService->getUserId($phone, $email);

        if (!$listUserInfo) {
            return "Không tìm thấy thông tin giáo viên";
        }

        $userInfo = $this->userSchoolRepository->getInfoUserSchool($listUserInfo[0]['id']);
        $userHistoryQuiz = [];
        if ($userInfo) {
            $userHistoryQuiz = $this->historyQuizRepository->getListHistory($listUserInfo[0]['id'], 1)->toArray();
            foreach($userHistoryQuiz as &$quiz) {
                $score = explode('/', $quiz['score']);
                $result = $score[0] / $score[1];
                $quiz['result'] = round($result * 100);
                $quiz['rank'] = $this->rankQuiz($score[0], $score[1]);
            }
        }

        if ($userInfo) {
            $infoProvince = $this->provinceRepository->getInfoProvince([$userInfo->province_id, $userInfo->district_id, $userInfo->ward_id])->toArray();
            foreach ($infoProvince as $province) {
                if ($province['id'] == $userInfo->province_id) {
                    $userInfo['province_name'] = $province['name'];
                }
                if ($province['id'] == $userInfo->district_id) {
                    $userInfo['district_name'] = $province['name'];
                }
                if ($province['id'] == $userInfo->ward_id) {
                    $userInfo['ward_id_name'] = $province['name'];
                }
            }
        } else {
            $userInfo["province_name"] = "";
            $userInfo["district_name"] = "";
            $userInfo["school_name"] = "";
            $userInfo["is_verify"] = "";
        }

        $formatData["Sở"] = $userInfo['province_name'];
        $formatData["Phòng"] = $userInfo['district_name'];
        $formatData["Trường"] = $userInfo['school_name'];
        if ($userInfo) {
            $formatData["Loại tài khoản"] = $userInfo['is_verify'] ? "Tài khoản mặc định" : "Nhận được đường link";
        }
        $formatData["Email"] = $listUserInfo[0]['email'];
        $formatData["SDT"] = $listUserInfo[0]['phone'];
        $formatData["Bài kiểm tra"] = $userHistoryQuiz;

        $this->message = 'success';
        $this->status = 'success';

        next:
        return $formatData;
    }

    private function rankQuiz($answerCorrect, $listAnswerCorrect)
    {
        if ($answerCorrect == $listAnswerCorrect ) {
            return "Giỏi";
        }
        $percent = $answerCorrect / $listAnswerCorrect;
        if ($percent >= 0.75 && $percent < 1) {
            return "Khá";
        }
        if ($percent >= 0.5 && $percent < 0.75) {
            return "Đạt";
        }
        return "Chưa đạt";
    }


    public function updateUserSchool(Request $request)
    {
        $schoolId = $request->input('school_id');
        $provinceId = $request->input('province_id');
        $districtId = $request->input('district_id');
        $wardId = $request->input('ward_id');
        $gradeId = $request->input('grade_id');
        $jobId = $request->input('job_id');
        $birthDay = $request->input('birth_day');
        $fullName = $request->input('full_name');
        $genderId = $request->input('gender_id');
        $notification = $request->input('notification');
        $typeSchool = $request->input('type_school');
        $schoolName = $request->input('school_name');
        $userId = $this->infoUserId();

        $dataUpdateUserSchool = [
            'full_name' => null,
            'birth_day' => null,
            'gender_id' => null,
            'school_id' => null,
            'province_id' => null,
            'district_id' => null,
            'ward_id' => null,
            'grade_id' => null,
            'job_id' => null,
            'notification' => 1
        ];

        if ($typeSchool && $schoolName) {

            $dataCreateSchool = [
                "name" => $schoolName,
                "status" => 0
            ];
            $schoolId = $this->schoolRepository->insertGetId($dataCreateSchool);

            $dataCreateSchoolProvince = [
                "province_id" => $wardId,
                "school_id" => $schoolId,
                "status" => 0
            ];
            $this->schoolProvinceRepository->create($dataCreateSchoolProvince);
        }

        if ($schoolId) {
            $dataUpdateUserSchool['school_id'] = $schoolId;
        }
        if ($provinceId) {
            $dataUpdateUserSchool['province_id'] = $provinceId;
        }
        if ($districtId) {
            $dataUpdateUserSchool['district_id'] = $districtId;
        }
        if ($wardId) {
            $dataUpdateUserSchool['ward_id'] = $wardId;
        }
        if ($gradeId) {
            $dataUpdateUserSchool['grade_id'] = $gradeId;
        }
        if ($jobId) {
            $dataUpdateUserSchool['job_id'] = $jobId;
        }
        if ($birthDay) {
            $dataUpdateUserSchool['birth_day'] = $birthDay;
        }
        if ($fullName) {
            $dataUpdateUserSchool['full_name'] = $fullName;
        }
        if ($genderId) {
            $dataUpdateUserSchool['gender_id'] = $genderId;
        }
        if ($notification) {
            $dataUpdateUserSchool['notification'] = $notification;
        }

        $dataUpdateUserSchool['time_created'] = time();
        $dataUpdateUserSchool['time_updated'] = time();
        $dataUpdateUserSchool['user_id'] = $userId;

        $checkExit = $this->userSchoolRepository->findOneField('user_id', $userId);
        if (!$checkExit) {
            $this->userSchoolRepository->create($dataUpdateUserSchool);
        } else {
            $this->userSchoolRepository->updateByOneField('user_id', $userId, $dataUpdateUserSchool);
        }

        $this->message = 'success';
        $this->status = 'success';

        next:
        return $this->responseData();
    }

    public function updateGradeSubject(Request $request)
    {
        $dataUpdate = json_decode($request->input('data_update'));
        $userId = $this->infoUserId();

        if (!$dataUpdate) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $userGrade = $this->userGradeRepository->getUserGrade($userId);

        if ($userGrade) {
            $this->userGradeRepository->deleteByOneField("user_id", $userId);
            $this->userGradeSubjectRepository->deleteUserGradeSubject(array_column($userGrade, 'id'));
        }

        foreach ($dataUpdate as $data) {
            if (!isset($data->grade_id)) {
                continue;
            }
            $dataInsertGrade = [
                "user_id" => $userId,
                "grade_id" => $data->grade_id,
                "time_updated" => time()
            ];
            $userGradeId = $this->userGradeRepository->create($dataInsertGrade);
            $listSubject = (array_column($data->list_subject, 'subject_id'));
            $dataInsertGradeSubject = [];
            foreach ($listSubject as $subject) {
                array_push($dataInsertGradeSubject, [
                    "user_grade_id" => $userGradeId->id,
                    "user_id" => $userId,
                    "subject_id" => $subject,
                    "time_updated" => time()
                ]);
            }

            $this->userGradeSubjectRepository->insert($dataInsertGradeSubject);
        }

        $this->status = 'success';
        $this->message = 'Update grade subject thành công';

        next:
        return $this->responseData();

    }

}
