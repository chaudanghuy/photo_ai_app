from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt  # For demo purposes; remove it in production
import json
import serial
import time
import logging
import os
from .serializers import MoneySerializer, MoneyCreateSerializer
from rest_framework import generics
from .models import Money
from django.db.models import Sum
arduino_port = 'COM5'
baud_rate = 9600
ser = serial.Serial(arduino_port, baud_rate, timeout=1)


logging.basicConfig(level=logging.INFO, format='%(message)s')
logger_continuous = logging.getLogger('continuous')
file_handler_continuous = logging.FileHandler('cash.log', mode='a')  # Sử dụng 'a' để ghi liên tục
file_handler_continuous.setLevel(logging.INFO)
logger_continuous.addHandler(file_handler_continuous)

time.sleep(2)
arduino_running = True

def start_arduino(order_code):
    global arduino_running
    if not ser.isOpen():
        ser.open()
        total_credit = 0
        arduino_running = True
        ser.write(b"start\n")
        print("Arduino script started.")
        
        while arduino_running:
            print("-----go ser------")
            response = ser.readline().decode().strip()  # Đọc dữ liệu từ cổng serial và giải mã
            

                    
            if response:
                moneyin = int(response)
                if moneyin in [10000, 20000, 50000, 100000, 200000]:
                    logging.info(moneyin)
                    print("-----tien nap------")
                    money_object = Money.objects.create(order_code=order_code, money=moneyin)
                    print(moneyin)
                    with open('cash.log', 'a') as file:
                        file.write(str(moneyin) + '\n')
                        #logger_continuous.info(moneyin)
                    print("-----total tiep nap------")
                    total_credit += moneyin
                    print(total_credit)
                    
                    

                 
            time.sleep(0.1)  # Chờ một chút trước khi đọc dữ liệu tiếp theo
               
            
    else:
        total_credit = 0
        arduino_running = True
        ser.write(b"start\n")
        print("Arduino script started.")
        while arduino_running:
            print("-----go------")
            response = ser.readline().decode().strip()  # Đọc dữ liệu từ cổng serial và giải mã                                  

            if response:
                moneyin = int(response)
                # Khởi tạo biến để tích lũy tổng số tiền đã nạp

                if moneyin in [10000, 20000, 50000, 100000, 200000]:
                    logging.info(moneyin)
                    print("-----tien nap------")
                    print(moneyin)
                    money_object = Money.objects.create(order_code=order_code, money=moneyin)
                    
                    with open('cash.log', 'a') as file:
                        file.write(str(moneyin) + '\n')
                    #logger_continuous.info(moneyin)
                    print("-----total tiep nap------")
                    total_credit += moneyin
                    print(total_credit)
                    
                    

                    
                
            time.sleep(0.1)  # Chờ một chút trước khi đọc dữ liệu tiếp theo
            


def stop_arduino():
    global arduino_running
    arduino_running = False
    log_file = 'cash.log'
    if os.path.exists(log_file):
        # Xoá file log nếu tồn tại
       
        os.remove(log_file)
    
    entries = Money.objects.all()
    entries.delete()
    #text_file.close()
    ser.close()

@csrf_exempt
def start_arduino_view(request):
    if request.method == 'POST':
        arduino_running = True
        start_arduino('DEVICE1')
        return JsonResponse({'message': 'Arduino started.'})
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
@csrf_exempt    
def stop_arduino_view(request):
    if request.method == 'POST':
        stop_arduino()
        return JsonResponse({'message': 'Arduino stopped.'})
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def money_list(request):
    if request.method == 'GET':
        try:
            total_money = Money.objects.aggregate(total=Sum('money'))['total']           
            return JsonResponse({'success': True, 'total_money': total_money})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)}, status=500)
    else:
        return JsonResponse({'success': False, 'message': 'Method not allowed'}, status=500)
# @csrf_exempt
# def arduino_control(request):
#     if request.method == 'POST':
#         data = request.POST.get('action')
        
#         if data == 'start':
#             #start_arduino()
#             return JsonResponse({'message': 'Arduino script started.'})
                
#         elif data == 'stop':
#             #stop_arduino()
#             return JsonResponse({'message': 'Arduino script stopped.'})
#         else:
#             return JsonResponse({'error': 'Invalid action.'})
#     else:
#         return JsonResponse({'error': 'Method not allowed.'})
    

    
# Create your views here.
