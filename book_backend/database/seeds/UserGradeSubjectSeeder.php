<?php

use Illuminate\Database\Seeder;

class UserGradeSubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = $this->getDistinct();
    }

    public function getDistinct() {
        $user_grade_count = DB::table('user_grade')->count();

        $loop = $user_grade_count / 1000;

        for($i = 0; $i <= $loop; $i++) {
            echo(1000*$i . "\n");
            $user_grade = DB::table('user_grade')->offset(1000*$i)->limit(1000)->pluck('id')->toArray();

            $data = DB::table('user_grade_subject')
                ->select('user_grade_id', 'user_id', 'subject_id')
                ->whereIn('user_grade_id', $user_grade)
                ->groupBy('user_grade_id', 'user_id', 'subject_id')
                ->get()->toArray();


            $data = array_map(function ($value) {
                $value = (array)$value;
                $value['time_updated'] = time();
                return $value;
            }, $data);

            if($data) {
                DB::table('user_grade_subject_temp')->insert($data);
            }
        }
    }
}
