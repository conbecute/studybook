<?php

namespace App\Services;


class RankService
{

    public function rankQuiz($answerCorrect, $listAnswerCorrect)
    {
        if ($answerCorrect == $listAnswerCorrect ) {
            return 1;
        }
        $percent = $answerCorrect / $listAnswerCorrect;
        if ($percent >= 0.75 && $percent < 1) {
            return 2;
        }
        if ($percent >= 0.5 && $percent < 0.75) {
            return 3;
        }
        return 4;
    }

}
