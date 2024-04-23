import win32print
import winreg
import ctypes

def save_printer_properties(printer_name, registry_path):
    # Mở máy in
    printer_handle = win32print.OpenPrinter(printer_name)
    
    try:
        # Lấy thông tin cấu hình máy in
        properties = win32print.GetPrinter(printer_handle, 2)
        
        # Lấy đối tượng DEVMODE
        devmode = properties["pDevMode"]
        
        # Lấy kích thước của đối tượng DEVMODE
        devmode_size = ctypes.sizeof(devmode)
        
        # Chuyển đổi đối tượng DEVMODE thành mảng byte
        devmode_bytes = (ctypes.c_ubyte * devmode_size).from_address(ctypes.addressof(devmode))
        
        # Lưu cấu hình máy in vào registry
        with winreg.CreateKey(winreg.HKEY_CURRENT_USER, registry_path) as key:
            winreg.SetValueEx(key, printer_name, 0, winreg.REG_BINARY, bytes(devmode_bytes))
            
        print("Printer properties saved successfully.")
    except Exception as e:
        print("Error:", e)
    finally:
        # Đóng máy in
        win32print.ClosePrinter(printer_handle)

# Sử dụng hàm để lưu cấu hình máy in
save_printer_properties("DS-RX1", "C:\\Users\\26-MongTaaaMedia\\Desktop\\Printer-Python\\CustomPrinterSettings\\")