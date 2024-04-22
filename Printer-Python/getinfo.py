from win32 import win32api
import win32print



printer_handle = win32print.OpenPrinter('DS-RX1')

try:
    # Lấy thông tin máy in
    properties = win32print.GetPrinter(printer_handle, 2)
    pDevModeObj = properties["pDevMode"]

    # Hiển thị thông tin cơ bản
    print("Orientation:", pDevModeObj.Orientation)
    print("PaperSize:", pDevModeObj.PaperSize)
    print("PaperLength:", pDevModeObj.PaperLength)
    print("PaperWidth:", pDevModeObj.PaperWidth)
    print("Copies:", pDevModeObj.Copies)
    print("PrintQuality:", pDevModeObj.PrintQuality)
    print("Color:", pDevModeObj.Color)
    print("Duplex:", pDevModeObj.Duplex)
    print("Collate:", pDevModeObj.DriverExtra)
finally:
    # Đóng máy in
    win32print.ClosePrinter(printer_handle)