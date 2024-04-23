
# Create your views here.
from django.http import JsonResponse
import win32print
from django.views.decorators.csrf import csrf_exempt  # For demo purposes; remove it in production
import win32ui
import win32con
import win32api
import io
import base64
from PIL import Image, ImageWin, ImageDraw, ImageFont, ImageOps
import time
# Create your views here.

path_print_file = "C:\\Users\\26-MongTaaaMedia\\Desktop\\Printer-Python\\stage-cropped.png"
@csrf_exempt
def switch_printer_profile(request, profile_name):
    try:
        # Lấy danh sách tất cả các máy in
        printers = win32print.EnumPrinters(win32print.PRINTER_ENUM_LOCAL, None, 1)
        
        # Duyệt qua danh sách máy in
        for printer in printers:
            # Kiểm tra đường dẫn máy in
            #if profile_path.lower() in printer[1].lower():
            if profile_name.lower() in printer[2].lower():
                # Thiết lập máy in mặc định
                win32print.SetDefaultPrinter(printer[2])
                
                if(printer[2]=="DSRX1CUT"):
                    crop_image_8_images("C:\\Users\\26-MongTaaaMedia\\Desktop\\Printer-Python\\image\\stripx2.png")
                    time.sleep(2)
                    print_direct(path_print_file)
                    
                else:
                    #crop_image_2_images("C:\\Users\\26-MongTaaaMedia\\Desktop\\Printer-Python\\image\\cutx2.png")
                    #crop_image_3_images("C:\\Users\\26-MongTaaaMedia\\Desktop\\Printer-Python\\image\\cutx3.png")
                    #crop_image_4_images("C:\\Users\\26-MongTaaaMedia\\Desktop\\Printer-Python\\image\\cutx4.png")
                    #crop_image_5_images("C:\\Users\\26-MongTaaaMedia\\Desktop\\Printer-Python\\image\\cutx5.png")
                    crop_image_6_images("C:\\Users\\26-MongTaaaMedia\\Desktop\\Printer-Python\\image\\cutx6.png")
                    
                    time.sleep(2) 
                    print_direct(path_print_file)
                    time.sleep(2) 
                    print_direct(path_print_file)
                    
                    
                
                
                return JsonResponse({"message": f"Đã chuyển qua cấu hình máy in: {printer[2]}"})
           
        return JsonResponse({"error": f"Không tìm thấy cấu hình máy in với đường dẫn: {profile_name}"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
        


def crop_image_8_images(param):
    # Đường dẫn tới ảnh cần cắt
    try:
        image_path = param
        img = Image.open(image_path, 'r')
    except:
        print("error")
        return
    

    # Đọc ảnh
    image = Image.open(image_path)

    # Kích thước của ảnh
    width, height = image.size

    # Define the coordinates and dimensions for cropping (X, Y, Width, Height)
    x = 295
    y = 84
    width = 644
    height = 862

    # Calculate the right and bottom coordinates
    right = x + width
    bottom = y + height

    # Crop the image
    cropped_image = image.crop((x, y, right, bottom))

    # Lưu ảnh đã cắt
    cropped_image.save(path_print_file)

def crop_image_2_images(param):
    # Đường dẫn tới ảnh cần cắt
    try:
        image_path = param
        img = Image.open(image_path, 'r')
    except:
        print("error")
        return
    

    # Đọc ảnh
    image = Image.open(image_path)

    # Kích thước của ảnh
    width, height = image.size

    # Define the coordinates and dimensions for cropping (X, Y, Width, Height)
    x = 112
    y = 128
    width = 985
    height = 587

    # Calculate the right and bottom coordinates
    right = x + width
    bottom = y + height

    # Crop the image
    cropped_image = image.crop((x, y, right, bottom))

    # Lưu ảnh đã cắt
    cropped_image.save(path_print_file)
    
    
def crop_image_3_images(param):
    # Đường dẫn tới ảnh cần cắt
    try:
        image_path = param
        img = Image.open(image_path, 'r')
    except:
        print("error")
        return
    

    # Đọc ảnh
    image = Image.open(image_path)

    # Kích thước của ảnh
    width, height = image.size

    # Define the coordinates and dimensions for cropping (X, Y, Width, Height)
    x = 293
    y = 86
    width = 648
    height = 858

    # Calculate the right and bottom coordinates
    right = x + width
    bottom = y + height

    # Crop the image
    cropped_image = image.crop((x, y, right, bottom))

    # Lưu ảnh đã cắt
    cropped_image.save(path_print_file)
    
def crop_image_4_images(param):
    # Đường dẫn tới ảnh cần cắt
    try:
        image_path = param
        img = Image.open(image_path, 'r')
    except:
        print("error")
        return
    

    # Đọc ảnh
    image = Image.open(image_path)

    # Kích thước của ảnh
    width, height = image.size

    # Define the coordinates and dimensions for cropping (X, Y, Width, Height)
    x = 110
    y = 128
    width = 989
    height = 588

    # Calculate the right and bottom coordinates
    right = x + width
    bottom = y + height

    # Crop the image
    cropped_image = image.crop((x, y, right, bottom))

    # Lưu ảnh đã cắt
    cropped_image.save(path_print_file)
    
def crop_image_5_images(param):
    # Đường dẫn tới ảnh cần cắt
    try:
        image_path = param
        img = Image.open(image_path, 'r')
    except:
        print("error")
        return
    

    # Đọc ảnh
    image = Image.open(image_path)

    # Kích thước của ảnh
    width, height = image.size

    # Define the coordinates and dimensions for cropping (X, Y, Width, Height)
    x = 286
    y = 44
    width = 662
    height = 879

    # Calculate the right and bottom coordinates
    right = x + width
    bottom = y + height

    # Crop the image
    cropped_image = image.crop((x, y, right, bottom))

    # Lưu ảnh đã cắt
    cropped_image.save(path_print_file)
    
def crop_image_6_images(param):
    # Đường dẫn tới ảnh cần cắt
    try:
        image_path = param
        img = Image.open(image_path, 'r')
    except:
        print("error")
        return
    

    # Đọc ảnh
    image = Image.open(image_path)

    # Kích thước của ảnh
    width, height = image.size

    # Define the coordinates and dimensions for cropping (X, Y, Width, Height)
    x = 295
    y = 87
    width = 648
    height = 858

    # Calculate the right and bottom coordinates
    right = x + width
    bottom = y + height

    # Crop the image
    cropped_image = image.crop((x, y, right, bottom))

    # Lưu ảnh đã cắt
    cropped_image.save(path_print_file)
    

def print_direct(param):
    printer_name = win32print.GetDefaultPrinter ()
    try:
        filename = param
        img = Image.open(filename, 'r')
    except:
        print("error")
        return

    hdc = win32ui.CreateDC()
    hdc.CreatePrinterDC(printer_name)

    horzres = hdc.GetDeviceCaps(win32con.HORZRES)
    vertres = hdc.GetDeviceCaps(win32con.VERTRES)

    landscape = horzres > vertres

    if landscape:
        if img.size[1] > img.size[0]:
            print('Landscape mode, tall image, rotate bitmap.')
            img = img.rotate(90, expand=True)
    else:
        if img.size[1] < img.size[0]:
            print('Portrait mode, wide image, rotate bitmap.')
            img = img.rotate(90, expand=True)

    img_width = img.size[0]
    img_height = img.size[1]

    if landscape:
        #we want image width to match page width
        ratio = vertres / horzres
        max_width = img_width
        max_height =  (int)(img_width * ratio) # img_height
    else:
        #we want image height to match page height
        ratio = horzres / vertres
        max_height = img_height
        max_width = img_width

    #map image size to page size
    hdc.SetMapMode(win32con.MM_ISOTROPIC)
    hdc.SetViewportExt((horzres, vertres));
    hdc.SetWindowExt((max_width, max_height))

    #offset image so it is centered horizontally
    offset_x = (int)((max_width - img_width)/2)
    offset_y = (int)((max_height - img_height)/2)
    hdc.SetWindowOrg((-offset_x, -offset_y)) 

    hdc.StartDoc('Result')
    hdc.StartPage()

    dib = ImageWin.Dib(img)
    dib.draw(hdc.GetHandleOutput(), (0, 0, img_width, img_height))
    


    hdc.EndPage()
    hdc.EndDoc()
    hdc.DeleteDC()

    print( 'Debug info:' )
    print( 'Landscape: %d' % landscape )
    print( 'horzres: %d' % horzres )
    print( 'vertres: %d' % vertres )

    print( 'img_width: %d' % img_width )
    print( 'img_height: %d' % img_height )

    print( 'max_width: %d' % max_width )
    print( 'max_height: %d' % max_height )

    print( 'offset_x: %d' % offset_x )
    print( 'offset_y: %d' % offset_y )
    
    
