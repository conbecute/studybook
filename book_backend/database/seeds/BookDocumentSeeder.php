<?php

use Illuminate\Database\Seeder;
use App\Repositories\Lms\BookDocumentRepository;

class BookDocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    private $bookDocumentRepository;

    public function __construct(
        BookDocumentRepository  $bookDocumentRepository
    )
    {
        $this->bookDocumentRepository = $bookDocumentRepository;
    }

    public function run()
    {
        $dataCreate = [
            [
                'grade_id' => 4,
                'type_document' => 2,
                'url' => 'E-learning/1._CT_tong_the.pdf',
                'title' => 'Tổng thể',
                'time_created' => time(),
                'time_updated' => time()
            ],
            [
                'grade_id' => 4,
                'type_document' => 2,
                'url' => 'E-learning/2._CT_Toan.pdf',
                'title' => 'Toán',
                'time_created' => time(),
                'time_updated' => time()
            ],
            [
                'grade_id' => 4,
                'type_document' => 2,
                'url' => 'E-learning/3._CT_Ngu_van_(1).pdf',
                'title' => 'Ngữ văn',
                'time_created' => time(),
                'time_updated' => time()
            ],
            [
                'grade_id' => 4,
                'type_document' => 2,
                'url' => 'E-learning/4._CT_GDCD.pdf',
                'title' => 'Giáo dục công dân',
                'time_created' => time(),
                'time_updated' => time()
            ],
            [
                'grade_id' => 5,
                'type_document' => 2,
                'url' => 'E-learning/5-CT-Tu-nhien-va-Xa-hoi-pdf.pdf',
                'title' => 'Tự nhiên và xã hội',
                'time_created' => time(),
                'time_updated' => time()
            ],
            [
                'grade_id' => 4,
                'type_document' => 2,
                'url' => 'E-learning/6-CT-Lich-su-va-Dia-li-TH-pdf.pdf',
                'title' => 'Địa lý',
                'time_created' => time(),
                'time_updated' => time()
            ],
            [
                'grade_id' => 9,
                'type_document' => 2,
                'url' => 'E-learning/7._CT_LS_va_D_L_(THCS).pdf',
                'title' => 'Lịch sử và địa lý',
                'time_created' => time(),
                'time_updated' => time()
            ],
            [
                'grade_id' => 4,
                'type_document' => 9,
                'url' => 'E-learning/8._CT_LS.pdf',
                'title' => 'Lịch sử',
                'time_created' => time(),
                'time_updated' => time()
            ],
            [
                'grade_id' => 9,
                'type_document' => 2,
                'url' => 'E-learning/9._CT_DL.pdf',
                'title' => 'Địa lý',
                'time_created' => time(),
                'time_updated' => time()
            ],
            [
                'grade_id' => 4,
                'type_document' => 2,
                'url' => 'E-learning/10._CT_Khoa_hoc.pdf',
                'title' => 'Khoa học',
                'time_created' => time(),
                'time_updated' => time()
            ],
            [
                'grade_id' => 5,
                'type_document' => 2,
                'url' => 'E-learning/11._CT_KHTN.pdf',
                'title' => 'Khoa học tự nhiên',
                'time_created' => time(),
                'time_updated' => time()
            ],
            [
                'grade_id' => 9,
                'type_document' => 2,
                'url' => 'E-learning/13.CT_Hoa_hoc_17.12.2018_(1).pdf',
                'title' => 'Hóa học',
                'time_created' => time(),
                'time_updated' => time()
            ],
            [
                'grade_id' => 9,
                'type_document' => 2,
                'url' => 'E-learning/14._CT_Sinh_hoc_17.12.2018.pdf',
                'title' => 'Sinh học',
                'time_created' => time(),
                'time_updated' => time()
            ],
            [
                'grade_id' => 5,
                'type_document' => 2,
                'url' => 'E-learning/15._CT_Cong_nghe_17.12.18.pdf',
                'title' => 'Công nghệ',
                'time_created' => time(),
                'time_updated' => time()
            ],
            [
                'grade_id' => 4,
                'type_document' => 2,
                'url' => 'E-learning/17._CT_Âm_nhạc_17.12.2018.pdf',
                'title' => 'Âm nhạc',
                'time_created' => time(),
                'time_updated' => time()
            ],
            [
                'grade_id' => 4,
                'type_document' => 2,
                'url' => 'E-learning/18._CT_Mi_thuat_17.12.2018.pdf',
                'title' => 'Mỹ thuật',
                'time_created' => time(),
                'time_updated' => time()
            ],
            [
                'grade_id' => 4,
                'type_document' => 2,
                'url' => 'E-learning/19._CT_GDTC_17.12.2018.pdf',
                'title' => 'Giáo dục thể chất',
                'time_created' => time(),
                'time_updated' => time()
            ],
            [
                'grade_id' => 4,
                'type_document' => 2,
                'url' => 'E-learning/20._CT_HDTN_17.12.2018.pdf',
                'title' => 'Hoạt động trải nghiệm',
                'time_created' => time(),
                'time_updated' => time()
            ]
        ];

        $this->bookDocumentRepository->create($dataCreate);

        echo "done";

    }

}
