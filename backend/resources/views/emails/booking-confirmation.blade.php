<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: #fff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #d4af37;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .header p {
            margin: 10px 0 0;
            color: #fff;
            font-size: 14px;
        }
        .content {
            padding: 30px;
        }
        .booking-number {
            background: #f8f9fa;
            border-left: 4px solid #d4af37;
            padding: 15px;
            margin-bottom: 25px;
        }
        .booking-number strong {
            color: #d4af37;
            font-size: 18px;
        }
        .section {
            margin-bottom: 25px;
        }
        .section h3 {
            color: #1a1a2e;
            border-bottom: 2px solid #d4af37;
            padding-bottom: 10px;
            margin-bottom: 15px;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            color: #666;
        }
        .detail-value {
            font-weight: 600;
            color: #333;
        }
        .total {
            background: #1a1a2e;
            color: #d4af37;
            padding: 20px;
            text-align: center;
            font-size: 24px;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #666;
        }
        .footer a {
            color: #d4af37;
            text-decoration: none;
        }
        .cta {
            display: inline-block;
            background: #25D366;
            color: #fff;
            padding: 12px 25px;
            border-radius: 5px;
            text-decoration: none;
            margin-top: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>ALPHARD BALI</h1>
            <p>Premium Car Rental Service</p>
        </div>

        <div class="content">
            <p>Dear <strong>{{ $booking->customer_name }}</strong>,</p>

            <p>Terima kasih telah melakukan booking di Alphard Bali. Berikut adalah detail reservasi Anda:</p>

            <div class="booking-number">
                <strong>{{ $booking->booking_number }}</strong>
                <br>
                <small>Booking Number - Simpan nomor ini untuk referensi</small>
            </div>

            @if($vehicle)
            <div class="section">
                <h3>Kendaraan</h3>
                <div class="detail-row">
                    <span class="detail-label">Tipe</span>
                    <span class="detail-value">{{ $vehicle->name }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Kategori</span>
                    <span class="detail-value">{{ $vehicle->type }}</span>
                </div>
            </div>
            @endif

            @if($service)
            <div class="section">
                <h3>Layanan</h3>
                <div class="detail-row">
                    <span class="detail-label">Paket</span>
                    <span class="detail-value">{{ $service->name }}</span>
                </div>
            </div>
            @endif

            <div class="section">
                <h3>Detail Perjalanan</h3>
                <div class="detail-row">
                    <span class="detail-label">Tanggal Mulai</span>
                    <span class="detail-value">{{ $booking->start_date->format('d F Y') }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Tanggal Selesai</span>
                    <span class="detail-value">{{ $booking->end_date->format('d F Y') }}</span>
                </div>
                @if($booking->start_time)
                <div class="detail-row">
                    <span class="detail-label">Waktu Jemput</span>
                    <span class="detail-value">{{ $booking->start_time }}</span>
                </div>
                @endif
                <div class="detail-row">
                    <span class="detail-label">Lokasi Jemput</span>
                    <span class="detail-value">{{ $booking->pickup_location }}</span>
                </div>
                @if($booking->dropoff_location)
                <div class="detail-row">
                    <span class="detail-label">Lokasi Antar</span>
                    <span class="detail-value">{{ $booking->dropoff_location }}</span>
                </div>
                @endif
            </div>

            @if($booking->notes)
            <div class="section">
                <h3>Catatan</h3>
                <p>{{ $booking->notes }}</p>
            </div>
            @endif
        </div>

        <div class="total">
            Total: Rp {{ number_format($booking->total_price, 0, ',', '.') }}
        </div>

        <div class="footer">
            <p><strong>Tim kami akan segera menghubungi Anda untuk konfirmasi.</strong></p>
            <p>Hubungi kami melalui WhatsApp untuk respon lebih cepat:</p>
            <a href="https://wa.me/6281234567890" class="cta">WhatsApp Kami</a>
            <p style="margin-top: 20px;">
                <a href="#">alphardbali.com</a> |
                <a href="mailto:info@alphardbali.com">info@alphardbali.com</a>
            </p>
        </div>
    </div>
</body>
</html>
