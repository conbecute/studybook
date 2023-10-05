<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\BaseController;
use App\Models\Lms\Quiz;
use App\Models\Lms\UserRole;
use App\Repositories\Lms\HistoryQuizRepository;
use App\Repositories\Lms\ProvinceRepository;
use App\Repositories\Lms\SchoolProvinceRepository;
use App\Repositories\Lms\SchoolRepository;
use App\Repositories\Lms\UserContactRepository;
use App\Repositories\Lms\UserGradeRepository;
use App\Repositories\Lms\UserGradeSubjectRepository;
use App\Repositories\Lms\UserRoleRepository;
use App\Repositories\Lms\UserSchoolRepository;
use App\Services\AuthenService;
use App\Services\RankService;
use App\Services\RedisService;
use App\Services\ServiceConnect\AppConnectService;
use Illuminate\Http\Request;

class AccountController extends BaseController
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
    private $appConnectService;
    private $userRoleRepository;
    private $userContactRepository;
    private $historyQuizRepository;
    private $rankService;
    private $authenService;
    private $redisService;
    private $schoolRepository;
    private $schoolProvinceRepository;
    public $userInfo = [];

    private $provinceId;
    private $districtId;
    private $wardId;
    private $schoolId;
    private $phone;
    private $email;
    private $fullName;
    private $genderId;
    private $birthDay;
    private $passWord;
    private $typeSchool;
    private $schoolName;
    private $userId;
    private $data;
    private $dataUpdate;
    private $typeVerify;
    private $codeVerify;
    private $updateAccount = false;
    private $jobId;

    public function __construct(
        UserSchoolRepository $userSchoolRepository,
        ProvinceRepository $provinceRepository,
        UserGradeRepository $userGradeRepository,
        UserGradeSubjectRepository $userGradeSubjectRepository,
        AppConnectService $appConnectService,
        UserRoleRepository $userRoleRepository,
        UserContactRepository $userContactRepository,
        HistoryQuizRepository $historyQuizRepository,
        RankService $rankService,
        AuthenService $authenService,
        RedisService $redisService,
        SchoolRepository $schoolRepository,
        SchoolProvinceRepository $schoolProvinceRepository
    )
    {
        $this->userSchoolRepository = $userSchoolRepository;
        $this->provinceRepository = $provinceRepository;
        $this->userGradeRepository = $userGradeRepository;
        $this->userGradeSubjectRepository = $userGradeSubjectRepository;
        $this->appConnectService = $appConnectService;
        $this->userRoleRepository = $userRoleRepository;
        $this->userContactRepository = $userContactRepository;
        $this->historyQuizRepository = $historyQuizRepository;
        $this->rankService = $rankService;
        $this->authenService = $authenService;
        $this->redisService = $redisService;
        $this->schoolRepository = $schoolRepository;
        $this->schoolProvinceRepository = $schoolProvinceRepository;
        parent::__construct();
    }

    public function getAccountContact(Request $request)
    {
        $userId     = $request->input("user_id");
        $userContact = [];
        if (!$userId) {
            $this->message = __('app.invalid_params');
            goto next;
        }
        $userContact = $this->userContactRepository->getUserContact($userId);

        $this->status = 'success';
        $this->message = 'Tạo mới thông tin liên hệ thành công';

        next:
        return $this->responseData($userContact);
    }

    public function updateStatusAccount(Request $request)
    {
        $userId = $this->infoUserId();
        $status = $request->input("status");
        $this->userSchoolRepository->updateByOneField("user_id", $userId, ['status' => $status]);

        $this->status = 'success';
        $this->message = 'Cập nhật thông tin thành công';

        next:
        return $this->responseData();

    }

    private function stripVN($str) {
        $str = preg_replace("/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/", 'a', $str);
        $str = preg_replace("/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/", 'e', $str);
        $str = preg_replace("/(ì|í|ị|ỉ|ĩ)/", 'i', $str);
        $str = preg_replace("/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/", 'o', $str);
        $str = preg_replace("/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/", 'u', $str);
        $str = preg_replace("/(ỳ|ý|ỵ|ỷ|ỹ)/", 'y', $str);
        $str = preg_replace("/(đ)/", 'd', $str);

        $str = preg_replace("/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/", 'a', $str);
        $str = preg_replace("/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/", 'e', $str);
        $str = preg_replace("/(Ì|Í|Ị|Ỉ|Ĩ)/", 'i', $str);
        $str = preg_replace("/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/", 'o', $str);
        $str = preg_replace("/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/", 'u', $str);
        $str = preg_replace("/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/", 'y', $str);
        $str = preg_replace("/(Đ)/", 'd', $str);
        return $str;
    }

    private function createUserName($provinceInfo)
    {
        $userName = "";
        foreach ($provinceInfo as $province) {
            $needReplace = ["Thị xã", "Thị trấn", "Phường", "Xã", "Huyện", "Quận"];
            $replace   = ["", "", "", "", "", ""];

            $formatName = str_replace($needReplace, $replace, $province["name"]);

            if ($userName) {
                $userName = $userName."_".$this->stripVN($formatName);
            } else {
                $userName = $userName.$this->stripVN($formatName);
            }
        }

        $userName = strtolower(str_replace(" ", "", $userName));

        return $userName;
    }

    public function createAccountContact(Request $request)
    {

        $provinceId = $request->input('province_id');
        $districtId = $request->input('district_id');
        $wardId     = $request->input("ward_id");
        $schoolId   = $request->input("school_id");
        $userId     = $request->input("user_id");

        if (!$userId) {
            if ($provinceId && $districtId) {
                if (!$wardId) {
                    $userRole = UserRole::ACCOUNT_DISTRICT;
                    $provinceInfo = $this->provinceRepository->getInfoProvince([$provinceId, $districtId])->toArray();
                    $userName = strtolower(str_replace(" ", "", $this->createUserName($provinceInfo)));
                } else {
                    $userRole = UserRole::ACCOUNT_SCHOOL;
                    $userName = "truong_".$schoolId;
                }

                list($status, $message, $userId) = $this->appConnectService->createAccount("", "", "", $userName, "Hoc102021");
                if ($status == "fail") {
                    $this->message = $message;
                    goto next;
                }

                $dataCreateUserSchool["province_id"] = $provinceInfo;
                $dataCreateUserSchool["district_id"] = $districtId;
                if ($wardId) {
                    $dataCreateUserSchool["ward_id"] = $wardId;
                }
                $dataCreateUserSchool["time_created"] = time();
                $dataCreateUserSchool["time_updated"] = time();
                $dataCreateUserSchool["is_verify"]    = 0;

                $checkUserSchool = $this->userSchoolRepository->findOneField("user_id", $userId);

                if (!$checkUserSchool) {
                    $this->userSchoolRepository->create($dataCreateUserSchool);
                } else {
                    $this->userSchoolRepository->updateByOneField("user_id", $userId, $dataCreateUserSchool);
                }

                $userRole = [
                    "user_id" => $userId,
                    "role_id" => $userRole
                ];

                $checkRole = $this->userRoleRepository->findOneField("user_id", $userId);

                if (!$checkRole) {
                    $this->userRoleRepository->create($userRole);
                } else {
                    $this->userRoleRepository->updateByOneField("user_id", $userId, $userRole);
                }

            }
        }

        $dataUpdateContact = $request->input('data_update_contact');

        $userContact = $this->userContactRepository->getUserContact($userId);

        if ($userContact) {
            $this->userContactRepository->deleteByOneField("user_id", $userId);
        } else {
            foreach ($dataUpdateContact as $data) {

                $dataInsertContact = [
                    "user_id" => $userId,
                    "name" => $data['full_name'],
                    "phone" => $data['phone'],
                    "email" => $data['email']
                ];
                $this->userContactRepository->create($dataInsertContact);
            }
        }

        $this->status = 'success';
        $this->message = 'Tạo mới thông tin liên hệ thành công';

        next:
        return $this->responseData();

    }

    private function getRequestAccountTeacher($request)
    {
        $this->provinceId = $request->input('province_id');
        $this->districtId = $request->input('district_id');
        $this->wardId     = $request->input("ward_id");
        $this->schoolId   = $request->input("school_id");
        $this->jobId      = $request->input("job_id");
        $this->phone      = $request->input("phone");
        $this->email      = $request->input("email");
        $this->fullName   = $request->input("full_name");
        $this->genderId   = $request->input("gender_id");
        $this->birthDay   = $request->input("birth_day");
        $this->passWord   = $request->input("password", "Hoc102021");
        $this->typeSchool = $request->input("type_school");
        $this->schoolName = $request->input("school_name");
        $this->userId     = $request->input("user_id");
        $this->dataUpdate = $request->input('list_grade_subject');
        $this->typeVerify = $request->input('type_verify');
        $this->codeVerify = $request->input('code_verify');
    }

    public function createAccountTeacher(Request $request)
    {
        $this->getRequestAccountTeacher($request);
        $data       = [];

        if (!$this->userId) {

            list($status, $code,$message, $data) = $this->appConnectService->createAccount($this->email, $this->phone, $this->fullName, "", $this->passWord);

            if ($this->codeVerify && $this->typeVerify) {
                $this->appConnectService->updateAccount($this->email, $this->phone, $data["userId"]);
                $this->updateAccount = true;
            }

            if ($code == 302 && !$this->updateAccount) {
                if ($this->email == $data["email"]) {
                    $data["type"] = 1;
                } else {
                    $data["type"] = 2;
                }
                $this->code = 302;
                goto next;
            }

            if ($status == "fail") {
                $this->message = $message;
                goto next;
            }

            $this->userId = $data["userId"];
            $this->phone = $data["phone"];
            $this->email = $data["email"];
        }

        if (!$this->userId) {
            $this->message = "Tạo mới tài khoản thất bại";
            goto next;
        }

        if ($this->typeSchool && $this->schoolName) {

            $dataCreateSchool = [
              "name" => $this->schoolName,
              "status" => 0
            ];
            $this->schoolId = $this->schoolRepository->insertGetId($dataCreateSchool);

            $dataCreateSchoolProvince = [
              "province_id" => $this->wardId,
              "school_id" => $this->schoolId,
              "status" => 0
            ];
            $this->schoolProvinceRepository->create($dataCreateSchoolProvince);
        }

        $dataCreateUserSchool["user_id"]     = $this->userId;
        if ($this->provinceId) {
            $dataCreateUserSchool["province_id"] = $this->provinceId;
        }
        if ($this->districtId) {
            $dataCreateUserSchool["district_id"] = $this->districtId;
        }
        if ($this->wardId) {
            $dataCreateUserSchool["ward_id"]     = $this->wardId;
        }
        if ($this->fullName) {
            $dataCreateUserSchool["full_name"]     = $this->fullName;
        }
        if ($this->schoolId) {
            $dataCreateUserSchool["school_id"] = $this->schoolId;
        }
        if ($this->genderId) {
            $dataCreateUserSchool["gender_id"] = $this->genderId;
        }
        if ($this->birthDay) {
            $dataCreateUserSchool["birth_day"] = $this->birthDay;
        }
        if ($this->jobId) {
            $dataCreateUserSchool["job_id"] = $this->jobId;
        }
        $dataCreateUserSchool["time_created"] = time();
        $dataCreateUserSchool["time_updated"] = time();
        $dataCreateUserSchool["is_verify"]    = 0;

        $this->updateUserSchool($this->userId, $dataCreateUserSchool);

        $this->updateUserRole($this->userId);

        if ($this->dataUpdate) {
            $this->updateDataGrade($this->dataUpdate, $this->userId);
        }

        $lastLogin = time();
        $this->redisService->hSet("KEY_LAST_TIME_LOGIN", $this->userId, $lastLogin);

        $this->userInfo["id"]         = $this->userId;
        $this->userInfo["email"]      = $this->email;
        $this->userInfo["phone"]      = $this->phone;
        $this->userInfo["time_login"] = $lastLogin;
        $this->userInfo["max_device_on_active"] = 2;
        $this->userInfo["max_profile"] = 3;
        $accessToken = $this->authenService->setToken($this->userInfo);
        $data["user_id"] = $this->userId;
        $data["access_token"] = $accessToken;
        $data['user_info'] = $this->getInfoUserSchool($this->userId, $this->email, $this->phone);

        $this->status = 'success';
        $this->message = 'Tạo mới tài khoản thành công';

        next:
        return $this->responseData($data);

    }

    private function updateUserSchool($userId, $dataCreateUserSchool)
    {
        $checkUserSchool = $this->userSchoolRepository->findOneField("user_id", $userId);

        if (!$checkUserSchool) {
            $this->userSchoolRepository->create($dataCreateUserSchool);
        } else {
            $this->userSchoolRepository->updateByOneField("user_id", $userId, $dataCreateUserSchool);
        }
    }

    private function updateUserRole($userId)
    {
        $userRole = [
            "user_id" => $userId,
            "role_id" => UserRole::ACCOUNT_TEACHER
        ];

        $checkRole = $this->userRoleRepository->findOneField("user_id", $userId);

        if (!$checkRole) {
            $this->userRoleRepository->create($userRole);
        } else {
            $this->userRoleRepository->updateByOneField("user_id", $userId, $userRole);
        }
    }

    private function updateDataGrade($dataUpdate, $userId)
    {
        $userGrade = $this->userGradeRepository->getUserGrade($userId);

        if ($userGrade) {
            $this->userGradeRepository->deleteByOneField("user_id", $userId);
            $this->userGradeSubjectRepository->deleteUserGradeSubject(array_column($userGrade, 'id'));
        }

        foreach ($dataUpdate as $data) {
            if (!isset($data["grade_id"])) {
                continue;
            }
            $dataInsertGrade = [
                "user_id" => $userId,
                "grade_id" => $data['grade_id'],
                "time_updated" => time()
            ];
            $userGradeId = $this->userGradeRepository->create($dataInsertGrade);
            $listSubject = (array_column($data['list_subject'], 'subject_id'));
            $dataInsertGradeSubject = [];
            foreach ($listSubject as $subject) {
                array_push($dataInsertGradeSubject, [
                    "user_grade_id" => $userGradeId['id'],
                    "user_id" => $userId,
                    "subject_id" => $subject,
                    "time_updated" => time()
                ]);
            }

            $this->userGradeSubjectRepository->insert($dataInsertGradeSubject);
        }
    }

    private function getInfoUserSchool($userId, $email, $phone)
    {
        $userInfo = $this->userSchoolRepository->getInfoUserSchool($userId);

        if ($userInfo->role_id == null) {
            $userInfo->role_id = 0;
        }

        if (!$userInfo) {
            $this->status = 'success';
            $userInfo = [
                'email' => $email,
                'phone' => $phone,
                'province_id' => null,
                'district_id' => null,
                'ward_id' => null,
                'grade_id' => null,
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
            return $userInfo;
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
        $userInfo["email"] = $email;
        $userInfo["phone"] = $phone;
        return $userInfo;

    }


    public function listAccountTeacher(Request $request)
    {
        $provinceId = $request->input('province_id');
        $districtId = $request->input('district_id');
        $schoolId = $request->input('school_id');
        $listTeacher = [];
        $listUserId = "";
        $data = [];
        if (!$provinceId || !$districtId) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $name = $request->input("name");
        $status = $request->input("status");
        $email = $request->input("email");
        $phone = $request->input("phone");
        $limit = $request->input('limit');
        $page = $request->input('page', 1);
        $offset = (int)($page - 1) * $limit;

        if ($email || $phone) {
            $listUserInfo = $this->appConnectService->getUserId($phone, $email);
            $listUserId = array_column($listUserInfo, "id");
        }

        $listTeacher = $this->userSchoolRepository->getListTeacher($provinceId, $districtId, $schoolId,UserRole::ACCOUNT_TEACHER, $name, $status, $limit, $offset, $listUserId)->toArray();
        $countListTeacher = $this->userSchoolRepository->getListTeacher($provinceId, $districtId, $schoolId,UserRole::ACCOUNT_TEACHER, $name, $status, "", "")->count();

        $listUserName = $this->appConnectService->getUserName(implode(",",array_column($listTeacher, "user_id")));

        if (!$listTeacher) {
            goto next;
        }

        foreach ($listTeacher as &$teacher) {
            $teacher['phone'] = isset($listUserName[$teacher["user_id"]]) ? $listUserName[$teacher["user_id"]]["phone"] : "";
            $teacher['email'] = isset($listUserName[$teacher["user_id"]]) ? $listUserName[$teacher["user_id"]]["email"] : "";
            $teacher['province_id'] = $provinceId;
            $teacher['district_id'] = $districtId;
            $teacher['school_id']   = $schoolId;
        }

        $data["total"] = $countListTeacher;
        $data["list_teacher"] = $listTeacher;

        $this->status  = 'success';
        $this->message = 'Lấy danh sách account thành công';
        next:
        return $this->responseData($data);

    }

    public function listAccountSchool(Request $request)
    {
        $provinceId = $request->input('province_id');
        $districtId = $request->input('district_id');
        $listSchool = [];
        $data = [];
        if (!$provinceId || !$districtId) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $name     = $request->input("name");
        $status   = $request->input("status");
        $userName = $request->input("user_name");
        $limit = $request->input('limit');
        $page = $request->input('page', 1);
        $offset = (int)($page - 1) * $limit;

        $listSchool = $this->userSchoolRepository->getListSchool($provinceId, $districtId, UserRole::ACCOUNT_SCHOOL, $name, $status, $limit, $offset)->toArray();
        $countListSchool = $this->userSchoolRepository->getListSchool($provinceId, $districtId, UserRole::ACCOUNT_SCHOOL, $name, $status, "", "")->count();
        $listCountTeacher = $this->userSchoolRepository->getListCountTeacherByListSchoolId($provinceId, $districtId, array_column($listSchool, "school_id"), UserRole::ACCOUNT_TEACHER);
        $listHistoryQuiz = $this->userSchoolRepository->getHistoryQuizByListSchoolId($provinceId, $districtId, array_column($listSchool, "school_id"), UserRole::ACCOUNT_TEACHER);
        $listUserName = $this->appConnectService->getUserName(implode(",",array_column($listSchool, "user_id")));

        if (!$listSchool) {
            goto next;
        }

        foreach ($listSchool as &$school) {
            $school['user_name'] = isset($listUserName[$school["user_id"]]) ? $listUserName[$school["user_id"]]["user_name"] : "";
            $school['count_teacher'] = isset($listCountTeacher[$school["school_id"]]) ? $listCountTeacher[$school["school_id"]]["total"] : 0;
            $school['history_quiz'] = isset($listHistoryQuiz[$school["school_id"]]) ? $this->formatDataListHistoryQuiz($listHistoryQuiz[$school["school_id"]]) : [];
            $school['district_id'] = (int) $districtId;
        }

        $data["total"] = $countListSchool;
        $data["list_school"] = $listSchool;

        $this->status  = 'success';
        $this->message = 'Lấy danh sách account thành công';
        next:
        return $this->responseData($data);

    }

    private function formatDataListHistoryQuiz($historyQuiz)
    {
        $totalQuiz        = 0;
        $totalGreat       = 0;
        $totalGood        = 0;
        $totalReached     = 0;
        $totalNotReached  = 0;
        if ($historyQuiz) {
            foreach ($historyQuiz as $quiz) {
                if ($quiz["history_quiz"]) {
                    foreach ($quiz["history_quiz"] as $history) {
                        $score = explode("/", $history["score"]);
                        $rank = $this->rankService->rankQuiz($score[0], $score[1]);
                        if ($rank == Quiz::GREAT) {
                            $totalGreat ++;
                        }
                        if ($rank == Quiz::GOOD) {
                            $totalGood ++;
                        }
                        if ($rank == Quiz::REACHED) {
                            $totalReached ++;
                        }
                        if ($rank == Quiz::NOT_REACHED) {
                            $totalNotReached ++;
                        }
                    }
                }
            }
        }
        return [
            'total_quiz' => $totalQuiz,
            'total_great' => $totalGreat,
            'total_good' => $totalGood,
            'total_reached' => $totalReached,
            'total_not_reached' => $totalNotReached,
        ];
    }

    public function listAccountProvince(Request $request)
    {
        $data = [];
        $provinceId = $request->input('province_id');
        if (!$provinceId) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $name     = $request->input("name");
        $status   = $request->input("status");
        $userName = $request->input("user_name");
        $limit = $request->input('limit');
        $page = $request->input('page', 1);
        $offset = (int)($page - 1) * $limit;

        $listAccount = $this->userSchoolRepository->getListAccount($provinceId, UserRole::ACCOUNT_DISTRICT, $name, $status, $limit, $offset)->toArray();
        $countListAccount = $this->userSchoolRepository->getListAccount($provinceId, UserRole::ACCOUNT_DISTRICT, $name, $status, "", "")->count();

        $listCountSchool = $this->userSchoolRepository->getListCountSchool($provinceId,  UserRole::ACCOUNT_SCHOOL);

        $listCountTeacher = $this->userSchoolRepository->getListCountTeacher($provinceId,  UserRole::ACCOUNT_TEACHER);

        $listHistoryQuizByTeacher = $this->userSchoolRepository->getHistoryQuizByTeacher($provinceId,  UserRole::ACCOUNT_TEACHER);

        $listUserName = $this->appConnectService->getUserName(implode(",",array_column($listAccount, "user_id")));

        if (!$listAccount) {
            goto next;
        }

        foreach ($listAccount as &$account) {
            $account['count_school'] = isset($listCountSchool[$account["district_id"]]) ? $listCountSchool[$account["district_id"]]["total"] : 0;
            $account['count_teacher'] = isset($listCountTeacher[$account["district_id"]]) ? $listCountTeacher[$account["district_id"]]["total"] : 0;;
            $account['user_name'] = isset($listUserName[$account["user_id"]]) ? $listUserName[$account["user_id"]]["user_name"] : "";
            $account['history_quiz'] = isset($listHistoryQuizByTeacher[$account["district_id"]]) ? $this->resultQuiz($listHistoryQuizByTeacher[$account["district_id"]]["history_quiz"]) : "";
        }

        $data["total"] = $countListAccount;
        $data["list_account"] = $listAccount;

        $this->status  = 'success';
        $this->message = 'Lấy danh sách account thành công';
        next:
        return $this->responseData($data);

    }

    private function resultQuiz($historyQuiz)
    {
        $totalQuiz        = 0;
        $totalGreat       = 0;
        $totalGood        = 0;
        $totalReached     = 0;
        $totalNotReached  = 0;
        foreach ($historyQuiz as $quiz) {
            $totalQuiz ++;
            $score = explode("/", $quiz['score']);
            $rank = $this->rankService->rankQuiz($score[0], $score[1]);
            if ($rank == Quiz::GREAT) {
                $totalGreat ++;
            }
            if ($rank == Quiz::GOOD) {
                $totalGood ++;
            }
            if ($rank == Quiz::REACHED) {
                $totalReached ++;
            }
            if ($rank == Quiz::NOT_REACHED) {
                $totalNotReached ++;
            }
        }
        return [
          'total_quiz' => $totalQuiz,
          'total_great' => $totalGreat,
          'total_good' => $totalGood,
          'total_reached' => $totalReached,
          'total_not_reached' => $totalNotReached,
        ];
    }

}
