<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\BaseController;
use App\Models\Lms\BookContent;
use App\Repositories\Lms\BookContentRepository;
use Illuminate\Http\Request;

class BookContentController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    private $bookContentRepository;

    public function __construct(
        BookContentRepository $bookContentRepository
    )
    {
        $this->bookContentRepository = $bookContentRepository;
    }

    public function getBookContent(Request $request)
    {
        $bookId = $request->input('book_id');

        $data = $this->bookContentRepository->getBookContent($bookId)->toArray();

        $this->status  = 'success';
        $this->message = 'list book content';

        return $this->ResponseData($data);
    }

    public function generateDataBookContent(Request $request)
    {
        $bookId = $request->input('book_id');
        $bookContentId = $request->input('book_content_id');
        $dataImportFile = $request->input('data_import_file');
        $fileExcel = $request->files->get('file_excel');
        $listBookContent = json_decode($dataImportFile);
        if (!$listBookContent || !$bookId)
        {
            $this->message = "Generate book content fail";
            goto next;
        }

        foreach ($listBookContent as $bookContent) {
            $bookContent = (array) $bookContent;
            if(isset($bookContent['stt'])) {
                $dataInsert = [
                    'title'         => $bookContent['mucluc'],
                    'book_id'       => $bookId,
                    'parent_id'     => !empty($bookContentId) ? $bookContentId : 0,
                    'index_page'    => isset($bookContent['trang']) ? $bookContent['trang'] : null,
                    'time_created' => time(),
                    'time_updated' => time(),
                ];
                $this->bookContentRepository->create($dataInsert);
            }
        }

        $this->status = 'success';
        $this->message = 'Upload book content success';

        next:

        return $this->ResponseData($listBookContent);
    }

    public function getBookContentById(Request $request) {
        $bookContentId = $request->input('book_content_id');

        if (!$bookContentId){
            $this->message = "Get book content fail";
            goto next;
        }

        $data = $this->bookContentRepository->find($bookContentId);

        if($data){
            $hasChildren = $this->bookContentRepository->findOneField('parent_id', $data->id);
            if ($hasChildren){
                $data['hasChildren'] = 1;
            } else {
                $data['hasChildren'] = 0;
            }
        }

        $this->status = 'success';
        $this->message = 'Upload book content success';

        next:

        return $this->ResponseData($data);
    }

    public function updateBookContent (Request $request) {
        $bookId             = $request->input('book_id');
        $book_content_id    = $request->input('id');
        $title              = $request->input('title');
        $indexPage          = $request->input('index_page');

        if (!$title || !$bookId) {
            $this->message = "Update book content fail";
            goto next;
        }

        $data = [];
        $data['title'] = $title;
        $data['book_id'] = $bookId;
        if ($indexPage){
            $data['index_page'] = $indexPage;
        } else {
            $data['index_page'] = null;
        }

        if ($book_content_id){
            $data['time_updated'] = time();
            $this->bookContentRepository->update($book_content_id, $data);
        } else {
            $data['time_created'] = time();
            $data['time_updated']  = time();
            $this->bookContentRepository->create($data);
        }



        $this->status = 'success';
        $this->message = 'Upload book content success';

        next:

        return $this->ResponseData();
    }

    public function deleteBookContentById(Request $request) {
        $book_content_id    = $request->input('book_content_id');

        if (!$book_content_id) {
            $this->message = "Delete book content fail";
            goto next;
        }

        $parent = BookContent::find($book_content_id);
        foreach ($parent->children as $child){
            $child->delete();
        }
        $parent->delete();

        $this->status = 'success';
        $this->message = 'Delete book content success';

        next:

        return $this->ResponseData();
    }
}
