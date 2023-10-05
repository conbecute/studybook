<?php


namespace App\Console\Commands;

use App\Models\Lms\WorkSheet;
use App\Repositories\Lms\WorkSheetRepository;
use App\Repositories\Lms\BookDocumentRepository;
use Illuminate\Console\Command;
use Storage;
use App\Services\ServiceConnect\MediaConnectService;

class ConvertWorkSheet extends Command
{
    protected $signature = "convertWorkSheet:convertWorkSheet";

    protected $description = "Convert work sheet";

    private $workSheetRepository;
    private $bookDocumentRepository;
    private $mediaConnectService;

    public function handle(
        WorkSheetRepository $workSheetRepository,
        BookDocumentRepository $bookDocumentRepository,
        MediaConnectService $mediaConnectService
    ) {
        $this->mediaConnectService = $mediaConnectService;
        $this->workSheetRepository = $workSheetRepository;
        $this->bookDocumentRepository = $bookDocumentRepository;

        $this->convertBookDocumentToWorkSheet();
        $this->updateDocument();
        $this->deleteEmptyCategory();
    }

    public function updateDocument() {
        $workSheets = $this->workSheetRepository->getAll()->toArray();

        foreach($workSheets as $index => $workSheet) {
            echo "catetory: " . $index . "\n";
            if($workSheet['type_document'] == 5
                || $workSheet['type_document'] == 11
                || $workSheet['type_document'] == 12
                || $workSheet['type_document'] == 15
                || $workSheet['type_document'] == 17) {
                $this->workSheetRepository->update($workSheet['id'], ['category' => WorkSheet::CATEGORY_ELEARNING_DOCUMENT, 'is_free' => 1]);
            }
            if($workSheet['type_document'] == 18) {
                $this->workSheetRepository->update($workSheet['id'], ['category' => WorkSheet::CATEGORY_BOOK_DOCUMENT, 'is_free' => 2]);
            }
            if($workSheet['type_document'] == 3
                || $workSheet['type_document'] == 6
                || $workSheet['type_document'] == 16) {
                $this->workSheetRepository->update($workSheet['id'], ['category' => WorkSheet::CATEGORY_TRANING_DOCUMENT, 'is_free' => 1]);
            }
        }

        foreach($workSheets as $index => $workSheet) {
            echo "type: " . $index . "\n";
            if($workSheet['type_document'] == 3
                || $workSheet['type_document'] == 11){
                $this->workSheetRepository->update($workSheet['id'], ['type_document' => WorkSheet::PDF]);
            }
            if($workSheet['type_document'] == 5
                || $workSheet['type_document'] == 6
                || $workSheet['type_document'] == 15){
                $this->workSheetRepository->update($workSheet['id'], ['type_document' => WorkSheet::VIDEO]);
            }
            if($workSheet['type_document'] == 12
                || $workSheet['type_document'] == 16){
                $this->workSheetRepository->update($workSheet['id'], ['type_document' => WorkSheet::PPT]);
            }
            if($workSheet['type_document'] == 17
                || $workSheet['type_document'] == 18){
                $this->workSheetRepository->update($workSheet['id'], ['type_document' => WorkSheet::ZIP]);
            }
        }

        echo "done\n";
    }

    public function deleteEmptyCategory() {
        $documents = $this->workSheetRepository->getAll()->toArray();

        foreach($documents as $index => $document) {
            if (!$document['category']) {
                $this->workSheetRepository->delete($document['id']);
            }
        }
    }

    public function updateMedia() {
        $context = stream_context_create(array(
            'http' => array('ignore_errors' => true),
        ));

        $data = $this->workSheetRepository->getAll()->toArray();
        foreach($data as $value) {
            if($value['thumb']) {
                $url    = "https://hvegjijo7jobj.vcdn.cloud/" . $value['thumb'];
                $temp = explode('/', $value['thumb']);
                $fileName = $temp[count($temp) - 1];
                $file = 'storage/thumb/' . $fileName;
                $check = file_put_contents($file, file_get_contents($url, false, $context));
                $this->mediaConnectService->uploadFile($file, 'E_Learning/thumb', "thumb", $fileName, false, '', env('TOKEN_TO_SERVER'));
            }
        }
    }

    private function convertBookDocumentToWorkSheet() {
        $bookDocument = $this->bookDocumentRepository->getAll()->toArray();
        $arrayInsert = [];
        foreach ($bookDocument as $document) {
            $dataInsertItem = [
                'book_id'       =>  $document['book_id'],
                'grade_id'       =>  $document['grade_id'],
                'type_document'       =>  $document['type_document'],
                'url'       =>  $document['url'],
                'title'       =>  $document['title'],
                'thumb'       =>  $document['thumb'],
                'time_created'       =>  time(),
                'time_updated'       =>  time(),
                'status'       =>  $document['status'],
                'is_free'       =>  $document['is_free'],
            ];
            array_push($arrayInsert, $dataInsertItem);
        }

        $this->workSheetRepository->insert($arrayInsert);
        echo "done";
    }
}
