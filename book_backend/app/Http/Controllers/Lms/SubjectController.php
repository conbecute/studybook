<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\BaseController;
use App\Repositories\Lms\BookTypeRepository;
use App\Repositories\Lms\GradeRepository;
use App\Repositories\Lms\SubjectRepository;
use Illuminate\Http\Request;

class SubjectController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    private $subjectRepository;

    public function __construct(
        SubjectRepository $subjectRepository
    ) {
        $this->subjectRepository = $subjectRepository;
    }

    public function listSubject(Request $request)
    {
        $gradeId = $request->input('grade_id');
        $title = $request->input('title');
        $data = [];
        $limit = $request->input('limit');
        $page = $request->input('page', 1);
        $offset = $limit ? (int)($page - 1) * $limit : null;

        if (!$gradeId) {
//            $this->message = __('app.invalid_params');
//            goto next;
        }

        $data['total'] = $this->subjectRepository->getListSubject($gradeId, $title)->count();
        $data['list_subject'] = $this->subjectRepository->getListSubject($gradeId, $title, $limit, $offset)->toArray();
        $this->status  = 'success';
        $this->message = 'Lấy danh sách list subject thành công';

        next:
        return $this->responseData($data);
    }

    public function createOrEditSubject(Request $request)
    {
        $id = $request->input('id');
        $title = $request->input('title');
        $gradeId = $request->input('grade_id');
        $status = $request->input('status');

        $data = [];
        if ($title) {
            $data['title'] = $title;
        }

        if ($gradeId) {
            $data['grade_id'] = $gradeId;
        }

        if ($status) {
            $data['status'] = $status;
        }
        $data['time_updated'] = time();

        if($id) {
            if (!$this->subjectRepository->update($id, $data)) {
                $this->message = 'Update subject fail';
                goto next;
            };
            $this->message = 'Update subject success';
        } else {
            if (!$this->subjectRepository->create($data)) {
                $this->message = 'Create subject fail';
                goto next;
            };
            $this->message = 'Create subject success';
        }
        $this->status = 'success';
        next:
        return $this->responseData($data);
    }
}
