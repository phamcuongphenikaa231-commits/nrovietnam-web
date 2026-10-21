
"use client";

import { useState } from "react";

const PC_URL =
  "https://drive.google.com/file/d/14Or-mm9TgxucElU2vFbqa-HWH2TGvQCc/view?usp=sharing";

export default function Home() {
  const [tab, setTab] = useState("download");
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirm: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function update(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function register(e) {
    e.preventDefault();
    setMessage("");

    if (!/^[a-zA-Z0-9_]{4,20}$/.test(form.username)) {
      setMessage("Tên tài khoản phải có 4–20 ký tự.");
      return;
    }

    if (form.password.length < 8) {
      setMessage("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }

    if (form.password !== form.confirm) {
      setMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password
        })
      });

      const data = await res.json();
      setMessage(data.message || "Không thể đăng ký.");

      if (res.ok) {
        setForm({ username: "", password: "", confirm: "" });
      }
    } catch {
      setMessage("Không thể kết nối hệ thống đăng ký.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <header className="hero">
        <div className="heroGlow" />
        <p className="serverTag">MÁY CHỦ NRO VIETNAM</p>
        <h1>NGỌC RỒNG</h1>
        <h2>VIETNAM ONLINE</h2>
        <p className="description">
          Tạo tài khoản, tải game và bắt đầu
          hành trình khám phá thế giới Ngọc Rồng.
        </p>

        <nav>
          <button
            className={tab === "download" ? "active" : ""}
            onClick={() => setTab("download")}
          >
            TẢI GAME
          </button>
          <button
            className={tab === "register" ? "active" : ""}
            onClick={() => setTab("register")}
          >
            ĐĂNG KÝ
          </button>
        </nav>
      </header>

      <section className="content">
        {tab === "download" ? (
          <div className="panel">
            <h3>TẢI GAME NRO VIETNAM</h3>
            <p className="intro">
              Chọn phiên bản phù hợp với thiết bị của bạn.
            </p>

            <div className="platform">
              <div>
                <strong>WINDOWS PC</strong>
                <p>Phiên bản máy tính</p>
              </div>
              <a
                href={PC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="action"
              >
                TẢI NGAY
              </a>
            </div>

            <div className="platform">
              <div>
                <strong>ANDROID</strong>
                <p>Điện thoại và máy tính bảng</p>
              </div>
              <span className="soon">SẮP RA MẮT</span>
            </div>

            <div className="platform">
              <div>
                <strong>IPHONE / IOS</strong>
                <p>Thiết bị Apple</p>
              </div>
              <span className="soon">SẮP RA MẮT</span>
            </div>

            <p className="hint">
              Hướng dẫn PC: Tải file ZIP, giải nén và mở
              nrovietnam.exe để chơi.
            </p>
          </div>
        ) : (
          <div className="panel">
            <h3>ĐĂNG KÝ TÀI KHOẢN</h3>
            <p className="intro">
              Tạo tài khoản để tham gia NRO Vietnam.
            </p>

            <form onSubmit={register}>
              <label>Tên đăng nhập</label>
              <input
                required
                minLength={4}
                maxLength={20}
                pattern="[A-Za-z0-9_]+"
                autoComplete="username"
                placeholder="4–20 ký tự, chữ, số hoặc _"
                value={form.username}
                onChange={e => update("username", e.target.value)}
              />

              <label>Mật khẩu</label>
              <input
                required
                minLength={8}
                type="password"
                autoComplete="new-password"
                placeholder="Ít nhất 8 ký tự"
                value={form.password}
                onChange={e => update("password", e.target.value)}
              />

              <label>Nhập lại mật khẩu</label>
              <input
                required
                type="password"
                autoComplete="new-password"
                placeholder="Xác nhận mật khẩu"
                value={form.confirm}
                onChange={e => update("confirm", e.target.value)}
              />

              <button
                className="submit"
                type="submit"
                disabled={loading}
              >
                {loading ? "ĐANG XỬ LÝ..." : "TẠO TÀI KHOẢN"}
              </button>
              <p className="message" role="status">
                {message}
              </p>
            </form>

            <p className="hint">
              Sau khi đăng ký thành công, mở game,
              đăng nhập và tạo nhân vật.
            </p>
          </div>
        )}
      </section>

      <footer>
        NRO VIETNAM · Trang đăng ký và tải game
      </footer>
    </main>
  );
}
