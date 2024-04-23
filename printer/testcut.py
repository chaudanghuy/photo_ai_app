from win32 import win32api
import win32print
txt = " Hello test ".encode()
p = win32print.OpenPrinter("DS-RX1")
job = win32print.StartDocPrinter (p, 1, ("test of raw data", None, "RAW"))
win32print.StartPagePrinter (p)
win32print.WritePrinter (p, txt)
win32print.WritePrinter (p, b"\x1B@\x1DV1")
win32print.EndPagePrinter (p)
win32print.ClosePrinter(p)

