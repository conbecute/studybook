<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\BaseController;
use App\Models\Lms\UserRole;
use App\Repositories\Lms\HistoryQuizRepository;
use App\Repositories\Lms\QuizHasActivityRepository;
use App\Repositories\Lms\UserGradeSubjectRepository;
use App\Repositories\Lms\UserSchoolRepository;
use App\Services\ServiceConnect\AppConnectService;
use App\Services\ServiceConnect\PlatformConnectService;
use Illuminate\Http\Request;

class QuizController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    private $userGradeSubjectRepository;
    private $quizHasActivityRepository;
    private $platformConnectService;
    private $historyQuizRepository;
    private $userSchoolRepository;
    private $appConnectService;

    public function __construct(
        UserGradeSubjectRepository $userGradeSubjectRepository,
        QuizHasActivityRepository $quizHasActivityRepository,
        PlatformConnectService $platformConnectService,
        HistoryQuizRepository $historyQuizRepository,
        UserSchoolRepository $userSchoolRepository,
        AppConnectService $appConnectService
    )
    {
        $this->userGradeSubjectRepository = $userGradeSubjectRepository;
        $this->quizHasActivityRepository = $quizHasActivityRepository;
        $this->platformConnectService = $platformConnectService;
        $this->historyQuizRepository = $historyQuizRepository;
        $this->userSchoolRepository = $userSchoolRepository;
        $this->appConnectService = $appConnectService;
    }

    public function listQuiz(Request $request)
    {
        $type = $request->input('type', 1);
        $userId = $this->infoUserId();
        $listSubject = [];
        if (!$userId) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $listSubject = $this->userGradeSubjectRepository->getList($userId, $type)->toArray();
        $historyQuiz = $this->historyQuizRepository->getListHistoryByKey($userId);

        foreach ($listSubject as &$subject) {
            if (isset($historyQuiz[$subject['id']])) {
                $subject["result"] = $historyQuiz[$subject['id']]['score'];
                $rank = explode("/", $historyQuiz[$subject['id']]['score']);
                $subject['rank'] = $this->rankQuiz($rank[0], $rank[1]);

                $subject["score"] = round(($rank[0] / $rank[1]) *100);

            } else {
                $subject["result"] = "";
            }
            if ($subject["result"]) {
            }
        }

        $this->status = 'success';
        $this->message = 'Lấy danh sách list subject thành công';

        next:
        return $this->responseData($listSubject);

    }

    public function detailQuiz(Request $request)
    {
        $data = [];
        $quizId = $request->input("quiz_id");
        if (!$quizId) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $quizInfo = $this->quizHasActivityRepository->getInfo($quizId)->toArray();

        if (!$quizInfo) {
            goto next;
        }

        $data = $this->platformConnectService->getDetailActivity($quizInfo[0]['activity_id']);

        $removeIsCorrect = str_replace(',"is_correct":true', "", json_encode($data));

        $data = json_decode($removeIsCorrect, true);

        next:
        return $this->responseData($data);

    }

    public function checkQuiz(Request $request)
    {
        $data = [];
        $quizId = $request->input("quiz_id");
        $checkQuiz = $request->input("check_quiz");
        $userId = $this->infoUserId();

        $listAnswer = explode(",", $checkQuiz);

        if (!$quizId) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $quizInfo = $this->quizHasActivityRepository->getInfo($quizId)->toArray();

        if (!$quizInfo) {
            goto next;
        }

        $dataActivity = $this->platformConnectService->getDetailActivity($quizInfo[0]['activity_id']);

        $dataGameConfig = $dataActivity[0]["game_config"]["data"];

        $listAnswerCorrect = [];
        foreach ($dataGameConfig as $gameConfig) {
            foreach ($gameConfig["answers"] as $answer) {
                if (isset($answer["is_correct"])) {
                    if ($answer["is_correct"]) {
                        array_push($listAnswerCorrect, $answer["answer_id"]);
                    }
                }
            }
        }

        $answerCorrect = array_intersect($listAnswer, $listAnswerCorrect);

        $data['result'] = count($answerCorrect) . "/" . count($listAnswerCorrect);
        $data['score'] = round((count($answerCorrect) / count($listAnswerCorrect)) *100);
        $data['rank'] = $this->rankQuiz(count($answerCorrect), count($listAnswerCorrect));

        $this->createHistoryQuiz($quizId, $data["result"], $userId);

        next:
        return $this->responseData($data);
    }

    private function rankQuiz($answerCorrect, $listAnswerCorrect)
    {
        if ($answerCorrect == $listAnswerCorrect ) {
            return 1;
        }
        $percent = $answerCorrect / $listAnswerCorrect;
        if ($percent >= 0.75 && $percent < 1) {
            return 2;
        }
        if ($percent >= 0.5 && $percent < 0.75) {
            return 3;
        }
        return 4;
    }

    private function createHistoryQuiz($quizId, $score, $userId)
    {
        $quizInfo = $this->historyQuizRepository->findHistory($quizId, $userId);
        if (!$quizInfo) {
            $dataUpdate = [
                "score" => $score,
                "time_updated" => time(),
                "user_id" => $userId,
                "quiz_id" => $quizId
            ];
            $this->historyQuizRepository->create($dataUpdate);
        } else {
            $scoreBefore = explode("/", $quizInfo->score);
            $scoreLast = explode("/", $score);
            if ($scoreLast[0] > $scoreBefore[0]) {
                $dataUpdate = [
                    "score" => $score,
                    "time_updated" => time(),
                    "user_id" => $userId,
                    "quiz_id" => $quizId
                ];
                $this->historyQuizRepository->updateByOneField("id", $quizInfo->id, $dataUpdate);
            }

        }

    }

    public function historyQuiz(Request $request)
    {
        $userId = $request->input("user_id");

        if (!$userId) {
         $userId = $this->infoUserId();
        }

        if (!$userId) {
            goto next;
        }

        $listHistory = $this->historyQuizRepository->getListHistory($userId)->toArray();

        foreach ($listHistory as &$history) {
            $rank = explode("/", $history['score']);
            $history['rank'] = $this->rankQuiz($rank[0], $rank[1]);
            $history['result'] = $history['score'];
            $history["score"] = round(($rank[0] / $rank[1]) *100);
        }


        $this->status  = "success";
        $this->message = "success";

        next:
        return $this->responseData($listHistory);
    }

    public function listResultQuiz(Request $request)
    {
        $provinceId = $request->input('province_id');
        $districtId = $request->input('district_id');
        $schoolId = $request->input('school_id');
        $listTeacher = [];
        if (!$provinceId || !$districtId) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $listTeacher = $this->userSchoolRepository->getListTeacher($provinceId, $districtId, $schoolId,UserRole::ACCOUNT_TEACHER)->toArray();
        $listCountGradeSubject = $this->userGradeSubjectRepository->getCountGradeSubject(array_column($listTeacher, "user_id"));
        $listCountHistoryQuiz  = $this->historyQuizRepository->getCountHistoryQuiz(array_column($listTeacher, "user_id"));

        if (!$listTeacher) {
            goto next;
        }

        foreach ($listTeacher as &$teacher) {
            $teacher['count_total_quiz'] = isset($listCountGradeSubject[$teacher["user_id"]]) ? $listCountGradeSubject[$teacher["user_id"]]["total"] : 0;
            $teacher['count_done_quiz'] = isset($listCountHistoryQuiz[$teacher["user_id"]]) ? $listCountHistoryQuiz[$teacher["user_id"]]["total"] : 0;
        }

        $this->status  = 'success';
        $this->message = 'Lấy danh sách account thành công';
        next:
        return $this->responseData($listTeacher);

    }

}
