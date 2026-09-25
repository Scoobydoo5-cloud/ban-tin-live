# Bảng giá trực tiếp (Việt Nam · Úc · Mỹ)

Trang web tự cập nhật giá chỉ số, cổ phiếu theo dõi, tỷ giá và hàng hóa **15 phút một lần trong giờ giao dịch**, chạy miễn phí bằng GitHub Actions và GitHub Pages. Mở được ở mọi nơi có mạng, không cần đăng nhập.

Phần phân tích (bản tin hằng ngày, hồ sơ công ty, quỹ Buffett mô phỏng) vẫn nằm ở trang Claude: https://claude.ai/artifact/1ivWHfw7vfybPnV2a4QpZV

> Chỉ để tham khảo và học tập, không phải lời khuyên đầu tư. Nguồn miễn phí có thể trễ 15–20 phút hoặc sai; mỗi con số đều ghi nguồn và kết quả kiểm tra.

## Cách hoạt động

1. `.github/workflows/update.yml` chạy theo lịch (giờ UTC):
   - ASX và Việt Nam: mỗi 15 phút từ 10h sáng đến khoảng 19h giờ Sydney.
   - Phố Wall: mỗi 15 phút từ khoảng 23h đến 8h sáng giờ Sydney.
2. `scripts/live_data.py` lấy giá:
   - Việt Nam: vnstock (nguồn KBS), nến 15 phút.
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
{"key": "VN-VCB", "label": "VCB", "name": "Vietcombank", "market": "VN", "symbol": "VCB", "exchange": "HOSE"}
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
