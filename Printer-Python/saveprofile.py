from win32 import win32api
import win32print

def save_printer_profile1(printer_name, profile_path):
    # Mở máy in
    printer_handle = win32print.OpenPrinter(printer_name)
    
    try:
        # Lấy thông tin cấu hình máy in
        devmode = win32print.GetPrinter(printer_handle, 2)["pDevMode"]
        
        # Chuyển đổi đối tượng PyDEVMODEW thành bytes
        devmode_bytes = bytes(devmode)
        
        # Lưu hồ sơ máy in
        with open(profile_path, "wb") as f:
            f.write(devmode_bytes)
    finally:
        # Đóng máy in
        win32print.ClosePrinter(printer_handle)


# Sử dụng hàm để lưu hồ sơ máy in
#save_printer_profile1("DS-RX1", "C:\\Users\\26-MongTaaaMedia\\Desktop\\Printer-Python\\profile-cut.dat")



PRINTER_DEFAULTS = {"DesiredAccess":win32print.PRINTER_ALL_ACCESS}  
pHandle = win32print.OpenPrinter('DS-RX1', PRINTER_DEFAULTS)  
properties = win32print.GetPrinter(pHandle, 2)
pDevModeObj = properties["pDevMode"]
pDevModeObj.Orientation = 2  
win32print.SetPrinter(pHandle,2,properties,0)
win32print.ClosePrinter(pHandle) 

devmode=pDevModeObj  
for n in dir(devmode):  
  print ("%s\t%s" % (n,getattr(devmode,n))) 
  
def save_printer_profile(printer_name, profile_path):
    # Mở máy in
    printer_handle = win32print.OpenPrinter(printer_name)
    
    try:
        # Lấy thông tin cấu hình máy in
        devmode = win32print.GetPrinter(printer_handle, 2)
        pDevModeObj = properties["pDevMode"]
        pDevModeObj.Orientation = 2 
        # Chuyển đổi đối tượng PyDEVMODEW thành bytes
        devmode_bytes = bytes(devmode)
        win32print.SetPrinter(pHandle,2,properties,0)
        
        # Lưu hồ sơ máy in
        with open(profile_path, "wb") as f:
                f.write(devmode)
    finally:
        # Đóng máy in
        win32print.ClosePrinter(printer_handle)
        
save_printer_profile1("DS-RX1", "C:\\Users\\26-MongTaaaMedia\\Desktop\\Printer-Python\\profile-cut.dat")