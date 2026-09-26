# Bảng giá trực tiếp (Việt Nam · Úc · Mỹ)

Trang web tự cập nhật giá chỉ số, cổ phiếu theo dõi, tỷ giá và hàng hóa **15 phút một lần trong giờ giao dịch**, chạy miễn phí bằng GitHub Actions và GitHub Pages. Mở được ở mọi nơi có mạng, không cần đăng nhập.

Phần phân tích (bản tin hằng ngày, hồ sơ công ty, quỹ Buffett mô phỏng) vẫn nằm ở trang Claude: https://claude.ai/artifact/1ivWHfw7vfybPnV2a4QpZV

## JayV Finance: tám mục, mỗi mục một cảnh 3D

Website là “quỹ mô phỏng và phòng nghiên cứu” JayV Finance, dựng bằng three.js r169 (lưu sẵn trong `site/vendor/`, kèm KaTeX cho công thức). Mỗi mục là một trang riêng, có cảnh 3D và đường bay camera theo cuộn:

| Mục | Đường dẫn | Cảnh 3D |
|---|---|---|
| Trang chủ | `site/index.html` | Biểu tượng JV bằng vàng giữa hai vòng giá chạy và vòng nến VN-Index; đường bay qua 7 cổng dẫn vào các mục |
| Toàn cảnh thị trường | `site/thi-truong/` | Địa cầu ba sàn (kéo để xoay), dải lụa 7 chỉ số, phòng trưng bày vĩ mô (đồng xu A$ và ₫), bản đồ nhiệt 3D |
| Bản tin | `site/ban-tin/` | Lốc giấy báo quanh tiêu đề, bay qua chuỗi nguyên nhân, rừng cột xác suất của sổ dự báo |
| Báo cáo tuần | `site/bao-cao/` | Nền giấy: ba khối đá 01–02–03, cây kịch bản có quả to nhỏ theo xác suất |
| Cổ phiếu | `site/co-phieu/` | Thành phố cổ phiếu: đổi thước đo, lọc thị trường, bấm tòa để xem hồ sơ nhanh |
| Quỹ JayV | `site/quy/` | Vòng phân bổ quanh đồng xu JV, hiệu suất quỹ so với chỉ số, ba kho VN/AU/US |
| Học viện (tiếng Anh) | `site/hoc-vien/` | Thiên hà 8 lộ trình, 43 bài có ví dụ và bài tập tự chấm, 9 phòng thí nghiệm, 2 trò chơi |
| Bảng giá | `site/bang-gia/` | Bảng giá chi tiết (2D) cập nhật 15 phút/lần |

Mã dùng chung ở `site/assets/core/` (`engine.js` động cơ 3D, `shell.js` menu, tìm nhanh Ctrl K, chuyển trang, chân trang; `props.js` đạo cụ 3D; `live.js` giá trực tiếp KBS, CNBC; `data.js` tải số liệu). Mỗi trang có tệp riêng trong `site/assets/pages/`. Nội dung Học viện nằm trong `site/assets/academy/` (bài học trong `tracks/`, nguồn tham khảo đã kiểm tra link trong `resources.js`). Thêm `?at=<id mục>:<0..1>` vào đường dẫn để mở thẳng một chặng cuộn.

Nội dung chữ của bản tin, báo cáo tuần và gợi ý được routine Claude trích từ trang Claude bằng `scripts/extract_content.py` rồi ghi vào `config/content.json` (chỉ chữ thuần); quy trình đăng chép file này vào `site/data/`. Routine đồng bộ còn chép lịch sử giá trị quỹ, giá vào lệnh và nhật ký giao dịch vào `config/from_claude.json` để trang Quỹ JayV vẽ hiệu suất.

> Chỉ để tham khảo và học tập, không phải lời khuyên đầu tư. Nguồn miễn phí có thể trễ 15–20 phút hoặc sai; mỗi con số đều ghi nguồn và kết quả kiểm tra.

## Cách hoạt động

1. `.github/workflows/update.yml` chạy theo lịch (giờ UTC):
   - ASX và Việt Nam: mỗi 15 phút từ 10h sáng đến khoảng 19h giờ Sydney.
   - Phố Wall: mỗi 15 phút từ khoảng 23h đến 8h sáng giờ Sydney.
2. `scripts/live_data.py` lấy giá:
   - Việt Nam: dữ liệu công khai của KBS (Chứng khoán KB Việt Nam), nến 15 phút; đối chiếu thêm với Yahoo (FPT.VN…).
   - Úc, Mỹ, tỷ giá, hàng hóa: Yahoo Finance (yfinance).
   - Chỉ số Mỹ: đối chiếu thêm với FRED.
3. Mỗi con số qua các phép kiểm tra:
   - giá hợp lệ và đúng đơn vị;
   - biên độ ±7% của HOSE;
   - phiên bị thiếu;
   - độ mới;
   - giá nằm trong khoảng cao/thấp của ngày;
   - đối chiếu nguồn thứ hai.
4. Số không đạt thì trang **giữ số của lần trước** và ghi lý do. Nếu quá nửa số liệu lỗi, quy trình dừng lại và không đăng dữ liệu hỏng.
5. Giá đóng cửa đã chốt được lưu theo ngày trong `data/daily/` để tích lũy lịch sử.

Trạng thái trên trang:
- **Tạm tính**: phiên đang chạy, giá còn thay đổi.
- **Đóng cửa**: giá đã chốt.
- **24 giờ**: tỷ giá, hàng hóa giao dịch liên tục.

% thay đổi luôn tính so với giá đóng cửa của phiên trước.

## Thêm hoặc bớt mã

Sửa `config/instruments.json` ngay trên GitHub (bấm biểu tượng bút chì), ở mục `watchlist`:

```json
{"key": "VN-VCB", "label": "VCB", "name": "Vietcombank", "market": "VN", "symbol": "VCB", "exchange": "HOSE", "check": "VCB.VN"}
{"key": "AU-BHP", "label": "BHP", "name": "BHP Group", "market": "AU", "symbol": "BHP.AX"}
{"key": "US-AAPL", "label": "AAPL", "name": "Apple", "market": "US", "symbol": "AAPL"}
```

Bấm **Commit changes**. Quy trình sẽ tự chạy lại, và trang cập nhật sau khoảng 2 phút.

## Chạy trên máy

```
pip install -r requirements.txt
python -m pytest -q tests
python scripts/live_data.py --out site/data/latest.json
python -m http.server -d site 8000
```

Mở http://localhost:8000.

## Giới hạn đã biết

- Giờ sàn chưa tính ngày lễ. Ngày lễ, trang báo "chưa có dữ liệu phiên…" thay vì đoán.
- Lịch chạy của GitHub có thể trễ 5–15 phút lúc đông người dùng.
- Yahoo đôi khi thiếu một phiên (đã gặp ở S&P/ASX 200). Trang sẽ gắn cờ "phiên thiếu".
- Chỉ số ASX 200 của Yahoo có thể lệch vài điểm so với giá đóng cửa chính thức.
- Tỷ giá USD/VND là giá thị trường quốc tế, không phải tỷ giá trung tâm của Ngân hàng Nhà nước.
