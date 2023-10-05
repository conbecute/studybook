import React from "react";
import { CHECK_LANGUAGE, ALERT_GAME } from "edu_lms/constants/type";

const CTA = {
  success: {
    vietnamese: [
      "Rất tuyệt vời! Chúc mừng bạn!",
      "Chuẩn luôn! Bạn thật tuyệt vời!",
      "Quá đỉnh luôn!",
      "Rất tốt! Quá xuất sắc!",
      "Quá chuẩn! Chúc mừng bạn!",
      "Quá tuyệt vời!",
      "Rất chính xác!",
    ],
    english: [
      "Great! Congratulations!",
      "Perfect! You are wonderful!",
      "Awesome!",
      "Brilliant!",
      "Exactly! Congratulations!",
      "You did a great job!",
      "Exactly!",
    ],
  },
  medium: {
    vietnamese: [
      "Giỏi quá!",
      "Tuyệt vời!",
      "Chính xác!",
      "Yeahhhhh!",
      "Xin chúc mừng!",
      "Vỗ tay!",
      "Hay quá!",
    ],
    english: [
      "Good job!",
      "Wonderful!",
      "Exactly!",
      "Yeahhhhh!",
      "Congratulations!",
      "Bravo!",
      "Excellent!",
    ],
  },
  rather: {
    vietnamese: [
      "Cố lên! Thiếu một chút nữa thôi",
      "Cố gắng hơn nhé!",
      "Sắp được rồi!",
      "Tiếp tục cố gắng nhé!",
    ],
    english: [
      "Try your best! Just a little bit more",
      "Let’s try harder!",
      "It’s almost done!",
      "Keep trying!",
    ],
  },
  error: {
    vietnamese: [
      "Thử lại lần nữa nào!",
      "Cố gắng lên nhé!",
      "Nỗ lực hơn nữa nhé!",
      "Cùng thử lại nhé!",
      "Hãy tiếp tục luyện tập nhé!",
      "Đừng bỏ cuộc nhé!",
    ],
    english: [
      "Let’s try one more time!",
      "Try your best!",
      "Try harder!",
      "Let’s try again!",
      "Keep practicing!",
      "Don’t give up!",
    ],
  },
};

export default function CTAAlert({ alertDefault, languageBook }) {
  let CTARandom = Math.floor(Math.random() * CTA.success.vietnamese.length);
  if (alertDefault === ALERT_GAME.error) {
    CTARandom = Math.floor(Math.random() * CTA.error.vietnamese.length);
  }
  if (alertDefault === ALERT_GAME.rather) {
    CTARandom = Math.floor(Math.random() * CTA.rather.vietnamese.length);
  }

  return (
    <div className="pt-1">
      {languageBook === CHECK_LANGUAGE
        ? CTA[alertDefault].vietnamese[CTARandom]
        : CTA[alertDefault].english[CTARandom]}
    </div>
  );
}
