<?php


namespace App\Repositories\Lms;


use App\Models\Lms\UserSchool;
use App\Repositories\EloquentRepository;
use Illuminate\Support\Facades\DB;

class UserSchoolRepository extends EloquentRepository
{
    /**
     * get model
     * @return string
     */
    public function getModel()
    {
        return UserSchool::class;
    }

    public function getInfoUserSchool($userId)
    {
        $query = $this->_model
            ->select('user_school.full_name', 'user_school.birth_day', 'user_school.gender_id', 'user_school.province_id', 'user_school.district_id', 'user_school.ward_id', 'user_school.is_verify', 'user_school.job_id', 'user_school.status','school.id as school_id', 'school.name as school_name', 'user_school.notification', 'user_role.role_id', 'school.status as status_school')
            ->leftJoin('province', 'province.id', '=', 'user_school.province_id')
            ->leftJoin('school', 'school.id', '=', 'user_school.school_id')
            ->leftJoin('user_role', 'user_role.user_id', '=', 'user_school.user_id')
            ->where('user_school.user_id', $userId)
            ->first();
        return $query;
    }

    public function getListAccount($provinceId, $type, $name, $status, $limit, $offset)
    {
        $query = $this->_model
            ->select('user_school.district_id', 'user_school.ward_id', 'user_school.school_id', 'user_school.status', 'user_school.user_id', 'province.name')
            ->join('user_role', 'user_role.user_id', '=', 'user_school.user_id')
            ->join('province', 'province.id', '=', 'user_school.district_id')
            ->where('user_role.role_id', $type);
        if ($name) {
            $query = $query->where("province.name", "like", "%".$name."%");
        }
        if ($status != null) {
            if ($status == 0 || $status == 1) {
                $query = $query->where("user_school.status", $status);
            }
        }

        if ($provinceId) {
            $query = $query->where("user_school.province_id", $provinceId);
        }
        if ($limit) {
            $query = $query->limit($limit)
                ->offset($offset);
        }
        return $query->get();
    }

    public function getListCountSchool($provinceId,$type)
    {
        $query = $this->_model
            ->select('district_id', DB::raw('count(*) as total'))
            ->join('user_role', 'user_role.user_id', '=', 'user_school.user_id')
            ->where('user_role.role_id', $type);

        if ($provinceId) {
            $query = $query->where("user_school.province_id", $provinceId);
        }
        return $query->groupBy("user_school.district_id")->get()->keyBy("district_id")->toArray();
    }

    public function getListTeacher($provinceId, $districtId, $schoolId, $type, $name = "", $status = "", $limit = "", $offset = "", $listUserId = "")
    {
        $query = $this->_model
            ->select('user_school.user_id', 'user_school.full_name', 'user_school.status')
            ->join('user_role', 'user_role.user_id', '=', 'user_school.user_id')
            ->where('user_role.role_id', $type);

        if ($provinceId) {
            $query = $query->where("user_school.province_id", $provinceId);
        }
        if ($listUserId) {
            $query = $query->whereIn("user_school.user_id", $listUserId);
        }
        if ($districtId) {
            $query = $query->where("user_school.district_id", $districtId);
        }
        if ($schoolId) {
            $query = $query->where("user_school.school_id", $schoolId);
        }
        if ($name) {
            $query = $query->where("user_school.full_name", "like", "%".$name."%");
        }
        if ($status != null) {
            if ($status == 0 || $status == 1) {
                $query = $query->where("user_school.status", $status);
            }
        }
        if ($limit) {
            $query = $query->limit($limit)
                ->offset($offset);
        }
        return $query->get();
    }

    public function getListSchool($provinceId, $districtId, $type, $name, $status, $limit, $offset)
    {
        $query = $this->_model
            ->select('school_id', 'school.name', 'user_school.user_id', 'user_school.status')
            ->join('user_role', 'user_role.user_id', '=', 'user_school.user_id')
            ->join('school', 'school.id', '=', 'user_school.school_id')
            ->where('user_role.role_id', $type);
        if ($name) {
            $query = $query->where("school.name", "like", "%".$name."%");
        }
        if ($status != null) {
            if ($status == 0 || $status == 1) {
                $query = $query->where("user_school.status", $status);
            }
        }
        if ($provinceId) {
            $query = $query->where("user_school.province_id", $provinceId);
        }
        if ($districtId) {
            $query = $query->where("user_school.district_id", $districtId);
        }
        if ($limit) {
            $query = $query->limit($limit)
                ->offset($offset);
        }
        return $query->groupBy('school_id')->get();
    }

    public function getListCountTeacher($provinceId,$type)
    {
        $query = $this->_model
            ->select('district_id', DB::raw('count(*) as total'))
            ->join('user_role', 'user_role.user_id', '=', 'user_school.user_id')
            ->where('user_role.role_id', $type);

        if ($provinceId) {
            $query = $query->where("province_id", $provinceId);
        }
        return $query->groupBy("district_id")->get()->keyBy('district_id')->toArray();
    }

    public function getHistoryQuizByTeacher($provinceId,$type)
    {
        $query = $this->_model
            ->join('user_role', 'user_role.user_id', '=', 'user_school.user_id')
            ->with("historyQuiz")
            ->where('user_role.role_id', $type);

        if ($provinceId) {
            $query = $query->where("province_id", $provinceId);
        }
        return $query->groupBy("district_id")->get()->keyBy('district_id')->toArray();
    }

    public function getHistoryQuizByListSchoolId($provinceId, $districtId, $schoolId, $type)
    {
        $query = $this->_model
            ->select('user_school.user_id', 'user_school.school_id')
            ->join('user_role', 'user_role.user_id', '=', 'user_school.user_id')
            ->with("historyQuiz")
            ->where('user_role.role_id', $type);

        if ($provinceId) {
            $query = $query->where("province_id", $provinceId);
        }
        if ($districtId) {
            $query = $query->where("district_id", $districtId);
        }
        if ($schoolId) {
            $query = $query->whereIn("school_id", $schoolId);
        }
        return $query->get()->groupBy('school_id')->toArray();
    }

    public function getListCountTeacherByListSchoolId($provinceId, $districtId, $schoolId, $type)
    {
        $query = $this->_model
            ->select('school_id', DB::raw('count(*) as total'))
            ->join('user_role', 'user_role.user_id', '=', 'user_school.user_id')
            ->where('user_role.role_id', $type);

        if ($provinceId) {
            $query = $query->where("province_id", $provinceId);
        }
        if ($districtId) {
            $query = $query->where("district_id", $districtId);
        }
        if ($schoolId) {
            $query = $query->whereIn("school_id", $schoolId);
        }
        return $query->groupBy("district_id")->get()->keyBy('school_id')->toArray();
    }

}
