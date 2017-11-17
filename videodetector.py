#!/usr/bin/env python3

from multiprocessing import Process, Queue
from queue import PriorityQueue
import time
import json
import uuid
import random
import collections
import datetime
import os
import sys

import cv2
import numpy as np


CAPTURE_SOURCE = sys.argv[1]
stop_cascade = cv2.CascadeClassifier("stop_classifier/cascade.xml")
school_cascade = cv2.CascadeClassifier("school_classifier/cascade.xml")

data = {}
datalist = []
current = []

counter_overall = 0
last_detected = [0, 0]


def detect_sign(frame, gray, cascade, stype, myrec):
    global counter_overall
    global last_detected
    start = time.time()
    print("Begin detection cycle: \n")
    signs = cascade.detectMultiScale(gray, 1.1, 5)
    signarea = 0
    msign = -1
    dtidx = 0
    if(stype == "STOP"):
        dtidx = 0
    else:
        dtidx = 1
    for sign in range(len(signs)):
        print("SIGN DETECTED: ", signs[sign])
        area = signs[sign][2] * signs[sign][3]
        print("ROI: ", area)
        if(area > signarea):
            signarea = area
            msign = sign
    if(msign != -1):
        if(counter_overall - last_detected[dtidx] > 120) or (last_detected[dtidx] == 0):
            last_detected[dtidx] = counter_overall
            print("EIGENSIGN: ", signs[msign])
            x_pos, y_pos, width, height = signs[msign]
            square_x = x_pos + int((width - height) / 2)
            if(stype == "STOP"):
                myrec = [(square_x, y_pos), (square_x + height, y_pos + height)]
            else:
                myrec = [(x_pos, y_pos), (x_pos + width, y_pos + height)]
            signid = str(uuid.uuid4()).split("-")
            signid = signid[0] + signid[1]
            cv2.rectangle(frame, myrec[0], myrec[1], (255, 0, 0), 4)
            cv2.imwrite("detected/" + signid + ".png", frame)
            add_datum("detected/" + signid + ".png", signid, stype)
    print("Detection cycle over. Duration: ", time.time() - start)
    return myrec


def add_datum(filename, signid, signtype):
    global current
    datum = collections.OrderedDict()
    datum["signid"] = signid
    datum["address"] = ""
    datum["gps"] = "(" + current[2] + " " + current[3] + ")"
    datum["signtype"] = signtype
    if(random.randint(-1, 1) > 0):
        datum["signcondition"] = "GOOD"
    else:
        datum["signcondition"] = "DAMAGED"
    datum["image_url"] = filename
    datum["date"] = datetime.datetime.now().strftime('%d/%m/%y')
    datalist.append(datum)


def sign_detect():
    try:
        global counter_overall
        global current

        cap = cv2.VideoCapture(CAPTURE_SOURCE + ".mp4")
        fourcc = cv2.VideoWriter_fourcc(*'XVID')
        out = cv2.VideoWriter('output3.avi', fourcc, 30, (1280, 720))
        gps = open(CAPTURE_SOURCE + ".csv")
        counter = 0

        rec_stop = []
        rec_school = []

        while cap.isOpened():
            counter += 1
            counter_overall += 1
            ret, frame = cap.read()
            if(not ret):
                cv2.destroyAllWindows()
                out.release()
                cap.release()
                return
            h, w, l = frame.shape
            # frame = cv2.resize(frame, (0, 0), fx=1.5, fy=1.5)
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

            if counter == 1 or counter == 16:
                current = gps.readline().split(",")

            if(counter % 10 == 0):
                rec_school = []
                rec_stop = []
                rec_stop = detect_sign(frame, gray, stop_cascade, "STOP", rec_stop)
                rec_school = detect_sign(frame, gray, school_cascade,
                                         "SCHOOL CROSSING", rec_school)

            if(counter == 30):
                counter = 0

            if(rec_stop != []):
                cv2.rectangle(frame, rec_stop[0], rec_stop[1], (255, 0, 0), 4)

            if(rec_school != []):
                cv2.rectangle(frame, rec_school[0], rec_school[1], (0, 255, 0), 4)

            out.write(frame)
            cv2.imshow("frame", frame)
            cv2.waitKey(1)

    except KeyboardInterrupt:
        pass
    finally:
        cv2.destroyAllWindows()
        out.release()
        cap.release()

if __name__ == "__main__":
    if(not os.path.isdir("./detected")):
        os.mkdir("./detected")
    sign_detect()
    data["signs"] = datalist
    f = open("signs.json", "a+")
    f.write(json.dumps(data, indent=4))
    f.close()
