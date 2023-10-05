<?php

use Illuminate\Database\Seeder;
use App\Repositories\Lms\ProvinceRepository;

class ProvinceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    private $provinceRepository;

    public function __construct(
        ProvinceRepository $provinceRepository
    ) {
        $this->provinceRepository = $provinceRepository;
    }

    public function run()
    {
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
        foreach ($province as $id => $name) {
            $i ++;

            echo $i .PHP_EOL;

            $data = [
                'name' => $name,
                'parent_id' => 0
            ];
            $idProvince = $this->provinceRepository->insertGetId($data);
            $dataProvince = $this->getInfo($id);
            foreach ($dataProvince['districts'] as $districts) {
                $dataInsertDistricts = [
                    'name' => $districts['n'],
                    'parent_id' => $idProvince
                ];
                $idDistricts = $this->provinceRepository->insertGetId($dataInsertDistricts);

                $dataDistrict = $this->getInfo("", $districts['i']);
                foreach ($dataDistrict['wards'] as $wards) {
                    $dataInsertWard = [
                        'name' => $wards['n'],
                        'parent_id' => $idDistricts
                    ];
                    $this->provinceRepository->insert($dataInsertWard);
                }

            }

        }
    }

    public function getInfo($provinceId = "", $district = "")
    {
        $curl = curl_init();
        if ($provinceId) {
            $url = 'https://accounts.sachmem.vn/dynamic_select/levels.json?province_id='.$provinceId;
        }
        if ($district) {
            $url = 'https://accounts.sachmem.vn/dynamic_select/levels.json?district_id='.$district;
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
                'X-CSRF-Token: I9+1gtPkSs+WqaV24GYaZp4zB945A+fC6I1sVRxElPwM4/PuyQU0F344tRnL/9gKJBfw/L23eW9oOBQHBkB4zQ==',
                'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36',
                'X-Requested-With: XMLHttpRequest',
                'Sec-Fetch-Site: same-origin',
                'Sec-Fetch-Mode: cors',
                'Sec-Fetch-Dest: empty',
                'Referer: https://accounts.sachmem.vn//users/info',
                'Accept-Language: en,ja;q=0.9,vi;q=0.8,en-US;q=0.7,vi-VN;q=0.6',
                'Cookie: _ga=GA1.2.837365648.1611718173; _gid=GA1.2.615786295.1611809404; __gads=ID=6f01b1a022a322a8-22500be3d4c5008f:T=1611809606:RT=1611809606:S=ALNI_MYX5UN2iod53o6bq22yPnTp2nOhAQ; _user_api_session=NVIwUDAwM1ZlRDJ6R3hqVlhHU1NrTGthVHFRQ3BEUSs0RFM0SXZ1cDdXdHk2WkMwUTlWOWtYR2xMRVMzajlGU3JSa2lHUUFnZHZSa0NueDFEQlRRU3BraExqWFdPN1Qrc2dsbzdtYmY1anoxZVNIU01QMGh2NlhTd21zS2FoVE9wcVduRUp0QkcrTkpSNS9QMDdCS1lWWE1NdjhiYkU1eG1VeFR5MEVVNnEzMENWeHRXMkYrZHdKZlkyYU5vQytpa0pyb21tOTR6VE02b01WWU1rOHpxZW9QQ1RnZlNGZ0JTNVRFTXF3NVBqYlc5ZUhYTzQ5ellTdUZKMnJraURhcFBoL0lIckJTL24wSkJ2dXBxVDJ2anl5QkFoRzZLMzFlNllvaWd2aTMzTHU5V05lTUxwVjlkUnQzcXp6dnRWMlBxVkZWRGlQZ2s5aG1ibE5udytWRjZ4V0RPeldpejNKUzloTXpGNy9SMHlEWGhwNlZXak5zeHBUY1gvUHFKMnQ2Z1J1WUdnRDJYamphaWhCY1NUWHJyR043MGZiVXdmSUhsbDJkdEZIWEdqMHJObEViS0xXZUlBdXV1endZM2V0a0xXaDJ6andVZlB1Zm5TR1Y0UzNUcjRCdmdSc1l6K0RlWndhSlVTY0lEdURUSDFlUmdhaTVySndoK2NvS3RYUUgwRHEraHJGdU45Uk15K3IzSE4rbVpXS0RiNVBud1dzL3A0NGg5UUl1c3QwUTlldkd6QmNIZ0VIL3NudGd0RnFvRjJHV01wRWJaTk9ObThUTkxEMjBRTjdNQzBKUGNYVVRCMHdrWDZyNU5aYVJHUUtxVFBxZHBDSW1oeUEwODNtNEdSUGY5LzRrSWwvTlBYZE1mNW1CMXVGUStOM3JpM2RKNDZmTFgzb0FobndtRnpHMytRdEZ2NCsrdk1YWFo4dlpaYWM5NVA4UXJUL0dlcklUK1dXTkZiQWY4WE1rMGt6UEExZy9Ia2thOHlEUm8vMmZTK3o1RzhnMlBuWjJVTk5QLS14am8weTB6RXV3cDFSRTBOOEpvQTl3PT0%3D--7a5fcf85628e5fe153f1e538f6ab6319abd947f8; _user_api_session=bXJaN2NsV0o3ZUowOHp0R1lQNXZYQ25TdGROTzZBZEhFN0RieS84Qzg3QVV2TnYxK0laRGg3elJ4YUtqSndzQlBRUlYxVVpZMWlCQ0FMd0VRM0hTbGxWaE04Z1QwTzdJQTZLU0QxNzJxdGZITFgxZW1HSXdsZGJsdi9SSDl6Zkl4OHFHbUQ0TmZjUW5DZVA1L2RTcEhmbVJScURPajJrTXR6bVRDRlh0RGc1RExrTXE0VTk1dlJWTEt0UVVwZmlpME5HQnB0QTRQcEVDR0tIaERzVUptZFJNMW9QVXhpeFFrdjd5ajA1bEh4Q29GUmI0WUVTR1Nkck8vSVVPbktnSng2K0hrS3RROVNHdFF3cytxZ0x6RDJ5UkNvc2hpbFlONitrS0dRNGZsdCt5MkVRVyt4bm1nQkJPWDM5aGY4eHdMNDBUZDY1WE94RGNibUxTNGtYZEkrQloydm1acXZUL0pqREdSbXRyL3YxLzgvb0ErVlEvcERId1JxNlJSRTZqMW9sd1VQRnZGNnNMSkFIWTUvTHkyb2lLZ0Q5bFJPbnFqQlpkMkNSMmdyRGFnRzRBNS9NUjdIR0dZSER6NzJXNmcrSjd0U2dOQzFudDljN3dBckJJNWlSU3krMjJJakdHLzIwaTNGK1VVanY4THNWZTdlNnpWeXord2dCN283c21TOXJPWGxCY25WNFRNVXhpMWNrMy90NkZEOXdjVjdFeGJwRjYrZ0FQcEZicUFTRFdkNnhaYVBwK1MvSlBFeTlPSk9NcjhBa20rUi9lNmJCNlY4VXVHVTlHWW1kTkwwc3JGMVNjSlZzSTFRZ1F1bHdOY1h1SHRvaEJ0QkFGczhteTZGYzVaSGZsUk1ST3pWQWJYM1g1bVIzTnlCMU8xWEthb3pKaFFzaHoyNFh0SDNkSWtac0RLZXd0WjlXdHFFNjBIVlY1dU9xeWtnODdsMThDenlvZC9QRnZqSk96VU9yK0NQR0ZjM0lWWXUrbmF1YWZvajRaTy9qQ2FEZWlrMHdGLS0wZ0x6OGdDZzM5NXFjeDU1em91STNnPT0%3D--df94a9d677d253262598eaca0c4568008d269366'
            ),
        ));

        $response = curl_exec($curl);
        return json_decode($response, true);
    }

}
