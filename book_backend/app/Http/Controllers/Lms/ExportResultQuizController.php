<?php

namespace App\Http\Controllers\Lms;

use App\Exports\DataSupportExport;
use App\Http\Controllers\BaseController;
use App\Repositories\Lms\HistoryQuizRepository;
use App\Repositories\Lms\UserSchoolRepository;
use Illuminate\Http\Request;
use App\Services\CurlService;
use App\Services\RedisService;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class ExportResultQuizController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    private $redisService;
    private $bookDocumentRepository;

    public function __construct(
        CurlService $curlService,
        RedisService $redisService,
        HistoryQuizRepository $historyQuizRepository,
        UserSchoolRepository $userSchoolRepository
    )
    {
        $this->curlService = $curlService;
        $this->redisService = $redisService;
        $this->historyQuizRepository = $historyQuizRepository;
        $this->userSchoolRepository = $userSchoolRepository;
    }


    public function exportResultQuiz(Request $request) {
        $listProvince = [
               '1'=>'An Giang',
               '169'=>'Bà Rịa - Vũng Tàu',
               '260'=>'Bắc Giang',
               '501'=>'Bắc Kạn',
               '632'=>'Bạc Liêu',
               '704'=>'Bắc Ninh',
               '839'=>'Bến Tre',
               '1013'=>'Bình Dương',
               '1114'=>'Bình Định',
               '1285'=>'Bình Phước',
               '1408'=>'Bình Thuận',
               '1546'=>'Cà Mau',
               '1657'=>'Cần Thơ',
               '1752'=>'Cao Bằng',
               '1965'=>'Đà Nẵng',
               '2030'=>'Đăk Lăk',
               '2230'=>'Đăk Nông',
               '2310'=>'Điện Biên',
               '2451'=>'Đồng Nai',
               '2634'=>'Đồng Tháp',
               '2791'=>'Gia Lai',
               '3031'=>'Hà Giang',
               '3238'=>'Hà Nam',
               '3361'=>'Hà Nội',
               '3976'=>'Hà Tĩnh',
               '4252'=>'Hải Dương',
               '4530'=>'Hải Phòng',
               '4769'=>'Hậu Giang',
               '4854'=>'Hồ Chí Minh',
               '5201'=>'Hòa Bình',
               '5423'=>'Hưng Yên',
               '5595'=>'Khánh Hòa',
               '5745'=>'Kiên Giang',
               '5906'=>'Kon Tum',
               '6019'=>'Lai Châu',
               '6136'=>'Lâm Đồng',
               '6296'=>'Lạng Sơn',
               '6534'=>'Lào Cai',
               '6708'=>'Long An',
               '6916'=>'Nam Định',
               '7156'=>'Nghệ An',
               '7658'=>'Ninh Bình',
               '7812'=>'Ninh Thuận',
               '7885'=>'Phú Thọ',
               '8176'=>'Phú Yên',
               '8298'=>'Quảng Bình',
               '8467'=>'Quảng Nam',
               '8730'=>'Quảng Ngãi',
               '8929'=>'Quảng Ninh',
               '9130'=>'Quảng Trị',
               '9282'=>'Sóc Trăng',
               '9403'=>'Sơn La',
               '9620'=>'Tây Ninh',
               '9725'=>'Thái Bình',
               '10020'=>'Thái Nguyên',
               '10210'=>'Thanh Hóa',
               '10873'=>'Thừa Thiên Huế',
               '11035'=>'Tiền Giang',
               '11220'=>'Trà Vinh',
               '11335'=>'Tuyên Quang',
               '11484'=>'Vĩnh Long',
               '11602'=>'Vĩnh Phúc',
               '11749'=>'Yên Bái'
        ];

        $dataExport = [];
        $provinceId = $request->input('province_id');
        $gradeId = $request->input('grade_id');
        if (!$provinceId || !$gradeId) {
            return 'Thiếu tham số truyền lên';
        }

        $userSchool = DB::select(DB::raw("
                    SELECT us.user_id, us.school_id, us.full_name, s.name, s.status as status_school, hq.*, q.title FROM edu_lms.tbl_user_school as us
                    inner join edu_lms.tbl_history_quiz as hq on hq.user_id = us.user_id
                    inner join edu_lms.tbl_quiz as q on q.id = hq.quiz_id
                    inner join edu_lms.tbl_school as s on s.id = us.school_id
                    where us.province_id = '+$provinceId+' order by us.user_id desc"
            ));

            $listUserId = array_column($userSchool, 'user_id');
            if (!$listUserId) {
                return;
            }
            $stringListUserId = "(" . implode(",", $listUserId) . ")";
            $queryString = 'SELECT id, name, email, phone FROM edu_app.tbl_users where id in ' .$stringListUserId;
            $userApp = DB::select(DB::raw($queryString));
            $dataFormatUserApp = [];
            foreach ($userApp as $us) {
                $dataFormatUserApp[$us->id] = $us;
            }
            $listEmail = array_column($dataFormatUserApp, 'email');
            $listPhone = array_column($dataFormatUserApp, 'phone');

            $stringEmail = str_replace(",,", ',', implode(",", $listEmail));
            $stringEmail = str_replace(",", "','", $stringEmail);
            $stringEmail = "('".$stringEmail."')";

            $queryEmail = 'SELECT name ,phone, email, school_name FROM edu_lms.tbl_user_full where province_id = '.$provinceId.' and grade_id = '.$gradeId.' and email in ' .$stringEmail ;
            $infoDB = DB::select($queryEmail);
            $formatDataInfoDb = [];
            foreach ($infoDB as $iDb) {
                $formatDataInfoDb[$iDb->email][] = $iDb;
            }

            $dataNeed = [];
            foreach ($dataFormatUserApp as $ua) {
                if (isset($formatDataInfoDb[$ua->email])) {
                    array_push($dataNeed, $ua);
                }
            }

            $dataNeed1 = [];
            foreach ($dataNeed as $dn) {
                $dataNeed1[$dn->id] = $dn;
            }

            $dataFormatExel = [];
            foreach ($userSchool as $us) {
                if (isset($dataNeed1[$us->user_id])) {
                    array_push($dataFormatExel, [
                        'user_id' => $us->user_id,
                        'school_id' => $us->school_id,
                        'full_name' => $us->full_name,
                        'name' => $us->name,
                        'status_school' => $us->status_school,
                        'id' => $us->id,
                        'quiz_id' => $us->quiz_id,
                        'score' => $us->score,
                        'title' => $us->title,
                        'email' => $dataNeed1[$us->user_id]->email,
                        'phone' => $dataNeed1[$us->user_id]->phone,
                    ]);
                }
            }

            $userSchool = $dataFormatExel;

            $formatData = [];
            foreach ($userSchool as $user) {
                $formatData[$user['user_id']][] = $user;
            }

            $dataExport = [];
            foreach ($formatData as $data) {
                foreach ($data as $d) {
                    $dataExport[$d['user_id']][$d['quiz_id']] = $d;
                }
            }

            $dataFormatExport = [];
            foreach ($dataExport as $export) {
                $firstExport = array_values($export)[0];
                if ($gradeId == 4) {
                    array_push($dataFormatExport, (array)[
                        'user_id' => $firstExport['user_id'],
                        'full_name' => $firstExport['full_name'],
                        'phone' => $firstExport['phone'],
                        'email' => $firstExport['email'],
                        'school_name' => $firstExport['name'],
                        'status_school' => $firstExport['status_school'],
                        'tieng_viet_1' => isset($export[23]) ? $export[23]['score'] : "",
                        'toan_1' => isset($export[24]) ? $export[24]['score'] : "",
                        'tnxh_1' => isset($export[25]) ? $export[25]['score'] : "",
                        'dao_duc_1' => isset($export[26]) ? $export[26]['score'] : "",
                        'mi_thuat_1' => isset($export[27]) ? $export[27]['score'] : "",
                        'gdtc_1' => isset($export[28]) ? $export[28]['score'] : "",
                        'am_nhac_1' => isset($export[29]) ? $export[29]['score'] : "",
                        'hdtn_1' => isset($export[30]) ? $export[30]['score'] : "",
                        'tieng_anh_1' => isset($export[31]) ? $export[31]['score'] : ""
                    ]);
                }
                if ($gradeId  == 5) {
                    array_push($dataFormatExport, (array)[
                        'user_id' => $firstExport['user_id'],
                        'full_name' => $firstExport['full_name'],
                        'phone' => $firstExport['phone'],
                        'email' => $firstExport['email'],
                        'school_name' => $firstExport['name'],
                        'status_school' => $firstExport['status_school'],
                        'tieng_viet_2' => isset($export[1]) ? $export[1]['score'] : "",
                        'toan_2' => isset($export[2]) ? $export[2]['score'] : "",
                        'tnxh_2' => isset($export[3]) ? $export[3]['score'] : "",
                        'dao_duc_2' => isset($export[4]) ? $export[4]['score'] : "",
                        'mi_thuat_2' => isset($export[5]) ? $export[5]['score'] : "",
                        'gdtc_2' => isset($export[6]) ? $export[6]['score'] : "",
                        'am_nhac_2' => isset($export[7]) ? $export[7]['score'] : "",
                        'hdtn_2' => isset($export[8]) ? $export[8]['score'] : "",
                        'tieng_anh_2' => isset($export[9]) ? $export[9]['score'] : ""
                    ]);
                }
                if ($gradeId == 9) {
                    array_push($dataFormatExport, (array)[
                        'user_id' => $firstExport['user_id'],
                        'full_name' => $firstExport['full_name'],
                        'phone' => $firstExport['phone'],
                        'email' => $firstExport['email'],
                        'school_name' => $firstExport['name'],
                        'status_school' => $firstExport['status_school'],
                        'ngu_van_6' => isset($export[10]) ? $export[10]['score'] : "",
                        'khtn_6' => isset($export[11]) ? $export[11]['score'] : "",
                        'toan_6' => isset($export[12]) ? $export[12]['score'] : "",
                        'tin_hoc_6' => isset($export[13]) ? $export[13]['score'] : "",
                        'lich_su_6' => isset($export[14]) ? $export[14]['score'] : "",
                        'dia_li_6' => isset($export[15]) ? $export[15]['score'] : "",
                        'gdcd_6' => isset($export[16]) ? $export[16]['score'] : "",
                        'cong_nghe_6' => isset($export[17]) ? $export[17]['score'] : "",
                        'gdtc_6' => isset($export[18]) ? $export[18]['score'] : "",
                        'am_nhac_6' => isset($export[19]) ? $export[19]['score'] : "",
                        'mi_thuat_6' => isset($export[20]) ? $export[20]['score'] : "",
                        'hdtn_6' => isset($export[21]) ? $export[21]['score'] : "",
                        'tieng_anh_6' => isset($export[22]) ? $export[22]['score'] : ""
                    ]);
                }
            }

            $gradeName = "";
            if ($gradeId == 4) {
                $gradeName = "Lớp 1";
            }
            if ($gradeId == 5) {
                $gradeName = "Lớp 2";
            }
            if ($gradeId == 9) {
                $gradeName = "Lớp 6";
            }

            if (!$dataFormatExport) {
                return;
            }
        $dataExport = new DataSupportExport($dataFormatExport);
        $check                 = Excel::download($dataExport, $listProvince[$provinceId].'_'.$gradeName.'.xls');
        return $check;
            
    }

}
