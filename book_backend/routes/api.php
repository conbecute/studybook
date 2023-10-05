<?php

//api for app

$router->group(
    ['middleware' => ['VerifyTokenApp']],
    function () use ($router) {
        $router->post('active-book', 'Lms\ActiveBookController@activeBook');
        $router->get('update-info', 'Lms\UserSchoolController@updateUserSchool');
    }
);

//HistoryDrawController
$router->post('create-or-update-history-draw', 'Mongo\HistoryDrawController@createOrUpdateHistoryDraw');
$router->post('delete-history-draw', 'Mongo\HistoryDrawController@deleteHistoryDraw');

//Report error
$router->post('create-report-error', 'Mongo\ReportErrorController@createReportError');

$router->get('list-book', 'Lms\BookController@listBook');
$router->get('list-book-used', 'Lms\UserHasLicenceController@listBookUsed');
$router->get('search-book', 'Lms\BookController@searchBook');
$router->get('get-detail-book', 'Lms\BookController@getDetailBook');
$router->get('get-detail-page', 'Lms\PageController@getDetailPage');
$router->get('get-detail-object', 'Lms\ObjectController@getDetailObject');

$router->get('get-book-content', 'Lms\BookContentController@getBookContent');
$router->post('generate-book-content', 'Lms\BookContentController@generateDataBookContent');
$router->get('get-book-content-byId', 'Lms\BookContentController@getBookContentById');
$router->post('update-book-content', 'Lms\BookContentController@updateBookContent');
$router->get('delete-book-content-by-id', 'Lms\BookContentController@deleteBookContentById');

$router->get('list-page', 'Lms\PageController@listPage');
$router->get('list-object', 'Lms\ObjectController@listObject');
$router->get('list-object-has-object', 'Lms\ObjectController@listObjectHasActivity');
$router->post('edit-object', 'Lms\ObjectController@createObject');
$router->post('rename-object', 'Lms\ObjectController@renameObject');
$router->post('delete-object', 'Lms\ObjectController@deleteObject');
$router->post('update-touch-vector', 'Lms\ObjectController@updateTouchVector');
$router->post('export-name-object', 'Lms\ObjectController@exportNameObject');
$router->post('assign-object-to-activity', 'Lms\ObjectHasActivitiesController@assignObjectToActivity');
$router->post('update-objects-to-activities', 'Lms\ObjectHasActivitiesController@updateObjectsToActivities');
$router->post('create-object-to-activity', 'Lms\ObjectHasActivitiesController@createObjectToActivity');
$router->post('create-page-index-category', 'Lms\PageController@createPageIndexCategory');

$router->post('create-page', 'Lms\PageController@createPage');
$router->post('update-page', 'Lms\PageController@updatePage');