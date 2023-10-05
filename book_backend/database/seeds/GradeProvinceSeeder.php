<?php

use Illuminate\Database\Seeder;
use App\Repositories\Lms\ProvinceRepository;
use App\Repositories\Lms\GradeProvinceRepository;

class GradeProvinceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    private $provinceRepository;
    private $gradeProvinceRepository;

    public function __construct(
        ProvinceRepository $provinceRepository,
        GradeProvinceRepository $gradeProvinceRepository
    ) {
        $this->provinceRepository = $provinceRepository;
        $this->gradeProvinceRepository = $gradeProvinceRepository;
    }

    public function run()
    {
        $getIdProvince = $this->provinceRepository->getAll()->keyBy('id');

        $provinceConvert = [];

        foreach ($getIdProvince as $province) {
            if($province['parent_id'] != 0) {
                $provinceConvert[$province['name'] . '_' . $getIdProvince[$province['parent_id']]['name']] = $province['id'];
            }else {
                $provinceConvert[$province['name']] = $province['id'];
            }
        }

        $province = [
            "57"=>"An Giang",
            "49"=>"Bà Rịa - Vũng Tàu",
            "20"=>"Bắc Giang",
            "14"=>"Bắc Kạn",
            "62"=>"Bạc Liêu",
            "3"=>"Bắc Ninh",
            "53"=>"Bến Tre",
            "47"=>"Bình Dương",
            "35"=>"Bình Định",
            "45"=>"Bình Phước",
            "39"=>"Bình Thuận",
            "63"=>"Cà Mau",
            "59"=>"Cần Thơ",
            "13"=>"Cao Bằng",
            "32"=>"Đà Nẵng",
            "42"=>"Đăk Lăk",
            "43"=>"Đăk Nông",
            "22"=>"Điện Biên",
            "48"=>"Đồng Nai",
            "56"=>"Đồng Tháp",
            "41"=>"Gia Lai",
            "12"=>"Hà Giang",
            "9"=>"Hà Nam",
            "1"=>"Hà Nội",
            "28"=>"Hà Tĩnh",
            "5"=>"Hải Dương",
            "6"=>"Hải Phòng",
            "60"=>"Hậu Giang",
            "50"=>"Hồ Chí Minh",
            "25"=>"Hòa Bình",
            "7"=>"Hưng Yên",
            "37"=>"Khánh Hòa",
            "58"=>"Kiên Giang",
            "40"=>"Kon Tum",
            "23"=>"Lai Châu",
            "44"=>"Lâm Đồng",
            "19"=>"Lạng Sơn",
            "16"=>"Lào Cai",
            "51"=>"Long An",
            "10"=>"Nam Định",
            "27"=>"Nghệ An",
            "11"=>"Ninh Bình",
            "38"=>"Ninh Thuận",
            "21"=>"Phú Thọ",
            "36"=>"Phú Yên",
            "29"=>"Quảng Bình",
            "33"=>"Quảng Nam",
            "34"=>"Quảng Ngãi",
            "4"=>"Quảng Ninh",
            "30"=>"Quảng Trị",
            "61"=>"Sóc Trăng",
            "24"=>"Sơn La",
            "46"=>"Tây Ninh",
            "8"=>"Thái Bình",
            "18"=>"Thái Nguyên",
            "26"=>"Thanh Hóa",
            "31"=>"Thừa Thiên Huế",
            "52"=>"Tiền Giang",
            "54"=>"Trà Vinh",
            "15"=>"Tuyên Quang",
            "55"=>"Vĩnh Long",
            "2"=>"Vĩnh Phúc",
            "17"=>"Yên Bái"
        ];
        $i = 0;
        $level = 3;

        $arrayCheck = [];
        $arrayExits = [];

        foreach ($province as $id => $name) {
            $i ++;

            echo $id .PHP_EOL;
            echo $i .PHP_EOL;


            $dataProvince = $this->getInfo($id, "", $level);

            if (!$dataProvince['districts']) {
                $dataProvince = $this->getInfo($id, "", $level);
                if (!$dataProvince['districts']) {
                    $dataProvince = $this->getInfo($id, "", $level);
                }
            }

            foreach ($dataProvince['districts'] as $districts) {

                $dataDistrict = $this->getInfo("", $districts['i'], $level);

                $dataInsertD = [
                  'grade_id' => $level,
                  'province_id' => $provinceConvert[$districts['n'].'_'.$name]
                ];


                    if (isset($arrayCheck[$provinceConvert[$districts['n'].'_'.$name]])) {
                        array_push( $arrayExits, $districts['n']);
                        continue;
                    }
                    $arrayCheck[$provinceConvert[$districts['n'].'_'.$name]] =  $provinceConvert[$districts['n'].'_'.$name];

                $this->gradeProvinceRepository->create($dataInsertD);


                foreach ($dataDistrict['wards'] as $wards) {
                    $dataInsertW = [
                        'grade_id' => $level,
                        'province_id' => $provinceConvert[$wards['n'].'_'.$districts['n']]
                    ];

                    if (isset($arrayCheck[$provinceConvert[$wards['n'].'_'.$districts['n']]])) {
                        array_push($arrayExits, $wards['n']);
                        continue;
                    }
                    $arrayCheck[$provinceConvert[$wards['n'].'_'.$districts['n']]] = $provinceConvert[$wards['n'].'_'.$districts['n']];
                    $this->gradeProvinceRepository->create($dataInsertW);


                }

            }

        }

        dd($arrayExits);


    }

    public function getInfo($provinceId = "", $district = "", $level = "")
    {
        $curl = curl_init();
        $url = '';
        if ($provinceId) {
            $url = 'https://accounts.sachmem.vn/dynamic_select/levels.json?province_id='.$provinceId.'&level_id='.$level;
        }
        if ($district) {
            $url = 'https://accounts.sachmem.vn/dynamic_select/levels.json?district_id='.$district.'&level_id='.$level;
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
                'X-CSRF-Token: kbeuDHOow9Wnf0ezOhcmHFF/V2rlE4oCmbhg1HAYFSZFuoM3MicLmX393KOrnX4evowDbadULsR4iC1DRk523Q==',
                'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36',
                'X-Requested-With: XMLHttpRequest',
                'Sec-Fetch-Site: same-origin',
                'Sec-Fetch-Mode: cors',
                'Sec-Fetch-Dest: empty',
                'Referer: https://accounts.sachmem.vn//users/info',
                'Accept-Language: en,ja;q=0.9,vi;q=0.8,en-US;q=0.7,vi-VN;q=0.6',
                'Cookie: _ga=GA1.2.837365648.1611718173; _gid=GA1.2.615786295.1611809404; __gads=ID=6f01b1a022a322a8-22500be3d4c5008f:T=1611809606:RT=1611809606:S=ALNI_MYX5UN2iod53o6bq22yPnTp2nOhAQ; _gat=1; _user_api_session=cjViVlorNnpkc0dDNnhkNFBXNDdValV5Szdwcm8xb25mZEdadi96eFVjUSsrbndJVGhEVHdQTDJicmplTmpPSzFWT0N6NnErcy9jZnRNWnR5N2F1Mm1zTVd1NnNwYURmS1BOQjZXWHNsbENvekdhYi9IRlkwYUh5VVJSUk9BamxGazlPUWwxOXYxUFFKK3BISUYyUGZybWF3c2dSV0pGVG5HVXpZMkJZMHNYRUxFRy96RXFpN0xNQy9SeE5pS295YUgwRm9aaTRITXY2Q21MSmEzMENsRGhtRFRKM3hhNmVwVmErOTFvR1ByRlg4b3RWNkVxZWtKOWY1RDV5c1ZVVVZERS94aCtkNURHUGpNWE9idDdBcFFtWWttUmQrVG9vMERwNWl1amQ1M0RlOG5GNXE2TzFJcmlCdWhvS1o2bHVmSGlvYWN1dlZiMTEvREpYKytrUlc1U0E5Nm11VWxvOWVlZE5LVDdTOXA5bitZcmY4eHY1WkVoRmgydWVtSG1XRS9CWllDMFNaSlRKam5nMTJNVCsrMnpKYjhtR09hdkdZaDgxOXQ5cDczV1dhRkF2d29aTGdGU0szYkJVT3lqYUNZdEE4SDdOcngyaTkyUnFGYU5vZGVDZkhjbTNwZ3lGY0tKQmkrME45M0J6Mzk5WGcrc2FGWURLTlljdFV2Vk8zZjlUa1F6M2hoclpET21NQThHSndBPT0tLWMwUnJURWFmL3AyNFQzQ0EwcEZTalE9PQ%3D%3D--7b11878eb8451132f81e07ab0294db885fa60a3f; _user_api_session=VHpxWWtQL0pjOGFyQ3B5NU5SdU05RmZZVGRnS0tQU3FUWE1uZENRNUNYRDVtT29PVGo5S0NEQkx5RzBseTU4YlBuUEIwZ0FTWUZ6cjV5NWVNdmNIZXhvRlUxaEZtS2N1YlN1K1laQnNMcHdSV2lVSlg0WDRtNFpVWmU4Q3pKeDNZcEVOeitxSWhYWG84NDZVNlFEZ3VqVFZBdW1aSFUvZENuTFdid3NkVjl6dktGM3NreGRzRHUzdHVUdXd0cWpXZkVVd1pNdjYwZU1jdEpQcFVFWGI2RS8zV29VMklvZkFGUzZxaFZrSmczTG9Rd2srSnFMeHBNMlBzUTZkNjdMQlV4NGYzVG5BYzg1NTNmeHUvT2pOdWNNTk9EUy83QkJQTUlJWHJ4OEs2c1ZqUEFNMy9GaFlOM3gvZDdnUWQ1YzEwOEVmQ1FGRHIwcEdtVnRmOTh1WTJFdndZNnlZSFZRUXNaRWhmR1VKQjRkak9IdHc5UDA4SkhTNGs2U2dOLzhGS0FxQ3Y3TUdMcWhTVTFFV0FIU3lwSUswbDJ2TCtlc3VnY2VNbE54azZkU2NkRmwyUmRUMzJlc0pNRGJxS1lyNlNjZm56Mmx1WjFxSGRUeG5tMjI0M1FrT3kzNXM5ZllpaTBpWUxXV2Q5V0FJdWxDbExJSGV6NnpZOTM5K0cwWWpScFVCOWd2SkdCc3lnWGdOSnprSzQ2RHFjVnFEVHRXL0hQNzVGVTVkbWo4PS0tblJJZmp1Zm1CMG1EWVc4YnMxVUU3QT09--8ca4d7deb47693d57e096cbd2c54bc53f292c80c'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        return json_decode($response, true);
    }

}
