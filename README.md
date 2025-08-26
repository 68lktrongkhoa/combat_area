# Đấu Trường Mã Lệnh (Code Combat Arena)

![Code Combat Arena UI](https://storage.googleapis.com/aistudio-project-images/b16e4f61-2b1d-48d8-ab1f-253a2e37452d)

**Code Combat Arena** là một trò chơi nền tảng web nơi bạn có thể thiết kế, lắp ráp và lập trình robot để chiến đấu trong một đấu trường ảo. Trò chơi kết hợp giữa chiến thuật, kỹ thuật và lập trình, với một trợ lý AI mạnh mẽ được cung cấp bởi **Google Gemini** để giúp bạn biến những ý tưởng chiến thuật thành mã lệnh thực thi.

## ✨ Tính Năng Nổi Bật

-   **Xưởng Robot (Garage):** Tùy chỉnh robot của bạn bằng cách lựa chọn từ nhiều loại khung sườn, vũ khí, module phòng thủ và tiện ích. Mỗi lựa chọn đều ảnh hưởng đến chỉ số và chiến thuật của robot.
-   **Lập Trình AI (IDE):** Soạn thảo logic chiến đấu cho robot bằng JavaScript trong một môi trường lập trình tích hợp (IDE). Sử dụng một bộ API đơn giản để điều khiển robot của bạn.
-   **Trợ Lý AI (Gemini):** Mô tả chiến thuật của bạn bằng ngôn ngữ tự nhiên (tiếng Anh hoặc tiếng Việt), và trợ lý AI sẽ tự động tạo ra mã JavaScript tương ứng.
-   **Nhiều Chế Độ Chơi:**
    -   **Chiến Dịch (Campaign):** Vượt qua hàng loạt các thử thách được thiết kế sẵn với độ khó tăng dần.
    -   **Người vs. Máy (Player vs. AI):** Thử nghiệm các bản lắp ráp và mã lệnh của bạn với một đối thủ AI tiêu chuẩn.
    -   **Người vs. Người (Player vs. Player):** Thách đấu bạn bè trong chế độ "hot-seat" trên cùng một máy.
-   **Hỗ Trợ Đa Ngôn Ngữ:** Giao diện hỗ trợ đầy đủ tiếng Anh và tiếng Việt.

## 🚀 Công Nghệ Sử Dụng

-   **Frontend:** [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **AI:** [Google Gemini API](https://ai.google.dev/) (`@google/genai`)

## 🔧 Hướng Dẫn Cài Đặt và Chạy Dự Án

### Yêu cầu
-   [Node.js](https://nodejs.org/) (phiên bản 18.x trở lên)
-   `npm`, `yarn`, hoặc `pnpm`

### Các bước cài đặt

1.  **Clone repository về máy:**
    ```bash
    git clone https://github.com/68lktrongkhoa/combat_area.git
    cd combat_area
    ```

2.  **Cài đặt các gói phụ thuộc:**
    ```bash
    npm install
    ```

3.  **Cấu hình API Key:**
    -   Tạo một file có tên `.env` ở thư mục gốc của dự án.
    -   Lấy API Key của bạn từ [Google AI Studio](https://aistudio.google.com/app/apikey).
    -   Thêm key vào file `.env` như sau:
        ```env
        API_KEY="your_google_gemini_api_key_here"
        ```
    > **Lưu ý:** Trợ lý AI trong game sẽ không hoạt động nếu không có API Key này.

4.  **Chạy dự án:**
    ```bash
    npm run dev
    ```
    Mở trình duyệt và truy cập vào địa chỉ được cung cấp (thường là `http://localhost:5173`).

## 📂 Cấu Trúc Dự Án

```
/
├── public/
│   └── locales/      # Các file JSON chứa bản dịch (en, vi)
├── src/
│   ├── components/   # Các thành phần React UI (Garage, IDE, Arena, ...)
│   ├── contexts/     # React Context (LanguageContext)
│   ├── services/     # Logic tương tác với API bên ngoài (geminiService)
│   ├── App.tsx       # Component gốc, quản lý luồng game
│   ├── index.tsx     # Điểm vào của ứng dụng React
│   ├── constants.ts  # Các hằng số game (linh kiện, tài liệu API)
│   └── types.ts      # Định nghĩa các kiểu dữ liệu TypeScript
├── .env              # File môi trường (chứa API Key)
├── package.json
└── vite.config.ts    # Cấu hình Vite
```

## 🎮 Luồng Hoạt Động Của Game

1.  **Chọn Chế Độ Chơi:** Người dùng bắt đầu bằng việc chọn một trong ba chế độ: Chiến Dịch, Người vs. Máy, hoặc Người vs. Người.
2.  **Lắp Ráp Robot (Garage):** Người dùng được chuyển đến Xưởng Robot để chọn các linh kiện trong giới hạn Điểm Năng Lượng (EP).
3.  **Lập Trình (IDE):** Sau khi hoàn tất việc lắp ráp, người dùng vào môi trường lập trình. Tại đây, họ có thể tự viết code hoặc yêu cầu Trợ lý AI tạo code từ mô tả chiến thuật.
4.  **Chiến Đấu (Arena):** Robot được đưa vào đấu trường và tự động chiến đấu dựa trên mã lệnh đã được lập trình. Người dùng chỉ quan sát.
5.  **Phân Tích (Analysis):** Sau trận đấu, màn hình phân tích hiển thị kết quả, thống kê và cho phép người dùng chọn các bước tiếp theo như chơi lại, sửa code, hoặc tiếp tục chiến dịch.
