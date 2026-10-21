
import "./globals.css";

export const metadata = {
  title: "NRO Vietnam - Đăng ký và tải game",
  description: "Trang đăng ký tài khoản và tải game NRO Vietnam",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
