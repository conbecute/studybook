<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\BaseController;
use App\Repositories\Lms\ObjectHasActivitiesRepository;
use App\Repositories\Lms\ObjectRepository;
use App\Repositories\Lms\PageRepository;
use Illuminate\Http\Request;

class ObjectHasActivitiesController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    private $objectHasActivitiesRepository;
    private $objectRepository;
    private $pageRepository;

    public function __construct(
        ObjectHasActivitiesRepository $objectHasActivitiesRepository,
        ObjectRepository $objectRepository,
        PageRepository $pageRepository
    )
    {
        $this->objectHasActivitiesRepository = $objectHasActivitiesRepository;
        $this->objectRepository = $objectRepository;
        $this->pageRepository = $pageRepository;
    }

    public function createObjectToActivity(Request $request)
    {

        $dataAssign = $request->input('assign');
        $bookId = $request->input('book_id');
        $data = [];
        if (!$dataAssign || !$bookId) {
            $this->message = __('app.invalid_params');
            goto next;
        }
        $listPage = $this->pageRepository->findOneField('book_id', $bookId);

        $minPage = $listPage[0]['id'] - 4;
        $maxPage = $listPage[0]['id'] + count($listPage) + 4;

        foreach ($dataAssign as $activityId => $activityName) {

            $dataObject = $this->objectRepository->findOneField('name', $activityName);

            if (!$dataObject) {
                continue;
            }

            $objectInsert = '';

            if (count($dataObject) > 1) {

                foreach ($dataObject as $object) {
                    if ($minPage <= $object['page_id'] && $object['page_id'] <= $maxPage) {
                        $objectInsert = $object;
                        break;
                    }
                }
            }

            $checkObjectHasActivity = $this->objectHasActivitiesRepository->getObject($dataObject[0]['id'], $activityId)->toArray();
            if (!$checkObjectHasActivity) {
                $data = [
                    'object_id' => count($dataObject) == 1 ? $dataObject[0]['id'] : $objectInsert['id'],
                    'activity_id' => $activityId,
                    'activity_name' => $activityName,
                    'time_created' => time(),
                    'time_updated' => time(),
                ];
                $this->objectHasActivitiesRepository->create($data);
            }

        }

        $this->status = 'success';
        $this->message = 'Assign object to activity success';

        next:
        return $this->responseData($data);

    }

    public function assignObjectToActivity(Request $request)
    {
        $objectId = $request->input('object_id');
        $activityId = $request->input('activity_id');
        $activityName = $request->input('activity_name');
        $objectName = $request->input('object_name');
        $data = [];
        if (!$objectId) {
            $this->message = __('app.invalid_params');
            goto next;
        }

        $checkObjectId = $this->objectHasActivitiesRepository->findOneField('object_id', $objectId);

        if ($objectName) {
            $this->objectRepository->update($objectId, ['name' => $objectName]);
        }

        $data = [
            'object_id' => $objectId,
            'activity_id' => $activityId,
            'activity_name' => $activityName
        ];

        if ($checkObjectId) {
            $data['time_updated'] = time();
            if ($activityId) {
                $this->objectHasActivitiesRepository->updateByOneField('object_id', $objectId, $data);
            }
        } else {
            $data['time_created'] = time();
            $data['time_updated'] = time();
            if ($activityId) {
                $this->objectHasActivitiesRepository->create($data);
            }
        }

        $this->status = 'success';
        $this->message = 'Assign object to activity success';

        next:
        return $this->responseData($data);
    }

    public function updateObjectsToActivities(Request $request)
    {
        $updatedlist = json_decode($request->input('updatedlist'), true);

        foreach($updatedlist as $item) {
            $object = $this->objectRepository->find($item['object_id']);
            $data['name'] = $item['object_name'];
            $data['type'] = $item['type'];
            $this->objectRepository->update($object['id'], $data);

            $object_activity = $this->objectHasActivitiesRepository->findOneField("object_id", $object['id']);

            if ($object_activity) {
                if ($item['activity_id'] && $item['activity_name']) {
                    $data = [
                        'activity_id' => $item['activity_id'],
                        'activity_name' => $item['activity_name'],
                    ];
                    $this->objectHasActivitiesRepository->update($object_activity[0]['id'], $data);
                } else {
                    $this->objectHasActivitiesRepository->deleteByOneField('object_id', $object['id']);
                }
            } else {
                if ($item['activity_id'] && $item['activity_name']) {
                    $data = [
                        'object_id' => $item['object_id'],
                        'activity_id' => $item['activity_id'],
                        'activity_name' => $item['activity_name'],
                    ];
                    $this->objectHasActivitiesRepository->create($data);
                }
            }
        }

        $this->status = 'success';
        $this->message = 'Update book success';

        next:
        return $this->responseData($updatedlist);

    }

    public function updateStatus(Request $request)
    {
        $updatedlist = json_decode($request->input('updatedlist'), true);

        foreach($updatedlist as $item) {
            $object = $this->objectHasActivitiesRepository->getObject($item['object_id'], $item['activity_id'])[0];
            $updatedData['status'] = $object['status'] == 1 ? 0 : 1;
            $this->objectHasActivitiesRepository->update($object['id'], $updatedData);
        }

        $this->status = 'success';
        $this->message = 'Update book success';

        next:
        return $this->responseData($updatedlist);
    }

}
