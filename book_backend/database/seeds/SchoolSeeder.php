<?php

use Illuminate\Database\Seeder;
use App\Repositories\Lms\ProvinceRepository;
use App\Repositories\Lms\GradeProvinceRepository;

class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    private $schoolRepository;
    private $provinceRepository;
    private $schoolProvinceRepository;

    public function __construct(
        \App\Repositories\Lms\SchoolRepository $schoolRepository,
        ProvinceRepository $provinceRepository,
        \App\Repositories\Lms\SchoolProvinceRepository $schoolProvinceRepository
    )
    {
        $this->schoolRepository = $schoolRepository;
        $this->provinceRepository = $provinceRepository;
        $this->schoolProvinceRepository = $schoolProvinceRepository;
    }

    public function run()
    {

        $province = [
            "57" => "An Giang",
            "49" => "Bà Rịa - Vũng Tàu",
            "20" => "Bắc Giang",
            "14" => "Bắc Kạn",
            "62" => "Bạc Liêu",
            "3" => "Bắc Ninh",
            "53" => "Bến Tre",
            "47" => "Bình Dương",
            "35" => "Bình Định",
            "45" => "Bình Phước",
            "39" => "Bình Thuận",
            "63" => "Cà Mau",
            "59" => "Cần Thơ",
            "13" => "Cao Bằng",
            "32" => "Đà Nẵng",
            "42" => "Đăk Lăk",
            "43" => "Đăk Nông",
            "22" => "Điện Biên",
            "48" => "Đồng Nai",
            "56" => "Đồng Tháp",
            "41" => "Gia Lai",
            "12" => "Hà Giang",
            "9" => "Hà Nam",
            "1" => "Hà Nội",
            "28" => "Hà Tĩnh",
            "5" => "Hải Dương",
            "6" => "Hải Phòng",
            "60" => "Hậu Giang",
            "50" => "Hồ Chí Minh",
            "25" => "Hòa Bình",
            "7" => "Hưng Yên",
            "37" => "Khánh Hòa",
            "58" => "Kiên Giang",
            "40" => "Kon Tum",
            "23" => "Lai Châu",
            "44" => "Lâm Đồng",
            "19" => "Lạng Sơn",
            "16" => "Lào Cai",
            "51" => "Long An",
            "10" => "Nam Định",
            "27" => "Nghệ An",
            "11" => "Ninh Bình",
            "38" => "Ninh Thuận",
            "21" => "Phú Thọ",
            "36" => "Phú Yên",
            "29" => "Quảng Bình",
            "33" => "Quảng Nam",
            "34" => "Quảng Ngãi",
            "4" => "Quảng Ninh",
            "30" => "Quảng Trị",
            "61" => "Sóc Trăng",
            "24" => "Sơn La",
            "46" => "Tây Ninh",
            "8" => "Thái Bình",
            "18" => "Thái Nguyên",
            "26" => "Thanh Hóa",
            "31" => "Thừa Thiên Huế",
            "52" => "Tiền Giang",
            "54" => "Trà Vinh",
            "15" => "Tuyên Quang",
            "55" => "Vĩnh Long",
            "2" => "Vĩnh Phúc",
            "17" => "Yên Bái"
        ];

        $i = 0;
        $level = 3;

        $checkExitSchool = [];

        $dataKey = [];
        $getAllProvince = $this->provinceRepository->listProvince(0)->toArray();
        $j = 1;
        foreach ($getAllProvince as $province1) {
            $j++;
            echo $j . PHP_EOL;
            $getAllDistrict = $this->provinceRepository->listProvince($province1['id'])->toArray();
            foreach ($getAllDistrict as $district) {
                $getAllWard = $this->provinceRepository->listProvince($district['id'])->toArray();
                foreach ($getAllWard as $ward) {
                    $dataKey[$province1['name'] . '_' . $district['name'] . '_' . $ward['name']] = $ward['id'];
                }
            }
        }

        foreach ($province as $id => $name) {
            $i++;

            echo $i . PHP_EOL;

            $dataProvince = $this->getInfo($id, "", $level);

            foreach ($dataProvince['districts'] as $districts) {

                $dataDistricts = $this->getInfo("", $districts['i'], $level);

                foreach ($dataDistricts['wards'] as $ward) {
                    $dataWard = $this->getInfo("", "", $level, $ward['i']);

                    $s = 1;
                    foreach ($dataWard['schools'] as $school) {
                        $s++;
                        echo $i.'_'.$s.PHP_EOL;
                        $dataSchool = $this->schoolRepository->getInfo($school['n'])->toArray();

                        $dataInsertSchoolProvince = [
                            'province_id' => $dataKey[$name . '_' . $districts['n'] . '_' . $ward['n']],
                            'school_id' => $dataSchool['id'],
                            'grade_id' => $level,
                        ];

                        $this->schoolProvinceRepository->create($dataInsertSchoolProvince);

                    }

                }

            }

//            foreach ($dataProvince['schools'] as $schools) {
//
//                $dataInsertS = [
//                  'name' => $schools['n']
//                ];
//                if (!in_array($schools['n'], $checkExitSchool)) {
//                    array_push($checkExitSchool, $schools['n']);
//                    $this->schoolRepository->create($dataInsertS);
//                }
//
//            }


        }


        echo "done";

    }

    public function getInfo($provinceId = "", $district = "", $level = "", $ward = "")
    {
        $curl = curl_init();
        $url = '';
        if ($provinceId) {
            $url = 'https://accounts.sachmem.vn/dynamic_select/levels.json?province_id=' . $provinceId . '&level_id=' . $level;
        }
        if ($district) {
            $url = 'https://accounts.sachmem.vn/dynamic_select/levels.json?district_id=' . $district . '&level_id=' . $level;
        }
        if ($ward) {
            $url = 'https://accounts.sachmem.vn/dynamic_select/levels.json?ward_id=' . $ward . '&level_id=' . $level;
        }

        curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'Connection: keep-alive',
                'Pragma: no-cache',
                'Cache-Control: no-cache',
                'Accept: application/json, text/javascript, */*; q=0.01',
                'X-CSRF-Token: SLwfMLTIijz3h4q7HgnX9V9QqxbbnXAzaw8CSXgDpw1zrYO3dH+0Cw1toZARjacweF5CPBsoegcEzB7WUy76Gw==',
                'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36',
                'X-Requested-With: XMLHttpRequest',
                'Sec-Fetch-Site: same-origin',
                'Sec-Fetch-Mode: cors',
                'Sec-Fetch-Dest: empty',
                'Referer: https://accounts.sachmem.vn/users/info?state=work',
                'Accept-Language: en,ja;q=0.9,vi;q=0.8,en-US;q=0.7,vi-VN;q=0.6',
                'Cookie: _ga=GA1.2.837365648.1611718173; __gads=ID=6f01b1a022a322a8-22500be3d4c5008f:T=1611809606:RT=1611809606:S=ALNI_MYX5UN2iod53o6bq22yPnTp2nOhAQ; _gid=GA1.2.2105041263.1612316701; _user_api_session=RGxaL2ZXbWZOZ2sxZUplVzd2RUNzOE1QSGRvaXlIVjNKNXkwc1hOUUx5NG91U1g2YldaeDlIZmpaYjUvWmdGSk42WEtnSnZTTVZlNjRuS2NtT2gzVU5JR2hudFF4djU0TzJxRG04NUJVajFRNm9vY2dVYkM1eHptKzJmL1daa2FUL2NoOFVkcXJ5dzB1TWU2WEl5RFBNeUJ1R2ZqV0hqOEwrNGFSdDk5NGZvNktzNUlSQ3hkdWRUVzUvcHhNNkFGQjl5OFN5RVlSc081cFJiVmlydWk5M1NmMHpEVFk3RldlZDQ4aENRcGJyUDBTSDlZdTB5L0ZTd0pKMTFFUXhjK0lFVFpYcE5iVEwrZ3VkMSs3Yy9paVRBdFp0eFFUM25idUM3MWh0Nkx4V2dzUWM5V0tZOFQwbEMxbWdhd0ROL09WK0tBOFZvd0tFbEVEUjRmbEE5NUVpaEJVOWFDWEdCS29ra2trRzRuNFhhVTdQYytNRkJaN2x2bitPNzd1djZtU3ZWZHkzb3NvTm5hUkhFdTczYndVTTFpNWd2MHZTdG1aUHlKc1ByOXVTUXpXZVJuREMzNW5qNzVDVWQ3RC9QeHN4Z1V5TFIwNXR1bTJmRksyTXhLZ2xicjNvaGg1bGhZbjkrVVhGMmxuKzFaT2RMbnZBS3orZUVHNG1POFBFckxQa1UzVzFoVCsrVUc2ZjJIcDNmajlrNzMvT0lYOWU2eC9waTFrem9CamV1YytSUTM4U09vS1Z0V1hoeVlGWG0wQnpmSWpYQml1UlZaUkYwRE1oQkFTcS9KZmI1QlN1MnFNQzFDdVlLV1RKZm9sSG1JOU1XNEwrL2x3dEpaVm5kQjE4M0RQMEc5dENBenJzclBhZjdoMTc1N0dvK1F1U1pHUlRlQmdOL0pUNVVYUXFkU1RnTW8yVlFuZ1F2Um5heFlGc3BmWlcyd1EzVEFYMTYxaVBvTGtRdTlMZThROWlDWEN5djU4L3BldXFpREhNTyt5RDVlOGVqZUNNNGhXdlgzMGREYTBiNjdGb0JiY2Z0OHBoMmFaRjI0QllWQkJIalU3d3pKM0VWRERpNTk4NFRkVDROZUpUMEUyKzltdnNUZFp6VU5TZHRkM20zMmpKZUEwN3hjN1pvMVFjc1Y2MHY4azFZZk1uamlRTFE9LS1adStValVDa1MvdE8yUnlrQUpJL0JBPT0%3D--1bba259fc0e6bf7a2f5cd63819beb0775b3bc57c; _user_api_session=aGhMZU1EVEptSjM1Z3ZxNUNDV2gwb0tadGJxdnFDaDN0OVBDOGIrSU5IWTNJMlhoNlNIbkpaNTJBWkJnV3dRelgxVUV3aHhwMitRaWlqRXJpZnhFWE9PaEtrWDNJWFQvWldzdnRaWjRUMGNweUx1RDYyN1RweVF1RmZGdTFmRjVWMDJxYWE5cTBsa1B5aHduRkplRDNFUUNOL0dwOTQ5ZkhYVE1TL2tneGZ2dDFRTyt6T1JmaEJ1YlNzUG9ZSXR4TW9MUUFUdllSRDRuUWlPbHltMGlaN29tRnhYVkxSblVLN0JzK1pQcWFoK0lpb2lyeHplazFaeEk0TW8xV0VLc0dVc1NUcFR0bVNBV0l4VlVXQWhGZkNSQ1k0WFlUMWJFam5nNEJVTjFwcTkxek44ZWlwQjlBeTJ5NGxES2FFVGQ0L2JqUUM2UHhIWDVLb05sN2JuejVnRXVrMTRWbmZFNnBOTUJSc0dWc0tENnJvNEFQc2h3VXY5OEt1aklYdDFqQ1RJdHIrL05oamdOeXY5bUF5YUE5RVlTbURRdFR1aFVHcE1YYytaeDRZSWFwb0JHS0wxNHRZTzNMYlNJZWc3RzNqN01XUDlsdGcyVDJpa1JCenlhWDN4RDFJUDMxdkFUZlhaUHc5MzJpdWJwdVUxYjJibEd3VkZraGVwRnJEeG4xNHlqSFRud2VXT29IdkVSM3BqMG1oL0J5bVNxditkZ3JFOW83Rlo0TzRTSVlQWlBTSzdoWUFZUU44bXJ6YTcyakE1UURjdDFsVDZKN2RqcU9uYVdYL25JSDM0d3hBZjNwN3NsNjhRYlRzOW1lbmd4aHJtMFk4TzNOZWhBVDNoSEVzUStzYnJEUTdqQ2Z3WWtxZlE2SFViUUorRTIzT2J1aGZLejBnTll0WDVhbFlvdHNmV3pVTGY1U0trRHZSbmthbzFGU1dtRlZZL2VIMmZHRjdXNUF0aXBwSGZ5N0l2NEtCNXh1THk4TEVhWXFZVyt2OXFUOFdLd1lqZ1pEQi9oai9XRkNnaGVLcGNJU3EzbHh0YUxnNVJBRlVMM0dOUmVHcWR0VS9FSmN4ckYrSWZhaFd6UDgrN2hYcGkwWExJMkphaHFFcmhOak9uWGl6VkM3RWlMbjB4d2JUQWtNQytqKzdFWVg4V3NMbzg9LS11NFZwM2ZwRDBNblh5bXNRVEdvRmdBPT0%3D--05be672be59ad0dd7f98f74840b906d77e7e72c5'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        return json_decode($response, true);
    }

}
