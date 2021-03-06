import os
import time

import sys

current_path = sys.argv[1]


def call_classifier(foldername, filename):
    full_path_input_file = filename.split(".")[0]
    cmd = './videodetector.py ' + foldername + "/uploads/" + full_path_input_file
    print(cmd)
    os.system(cmd)

print("rsync -avz root@35.196.83.72:/home/hanqijing/video-poster/uploads/ " + current_path + "/uploads/")
output = os.system(
    "rsync -avz root@35.196.83.72:/home/hanqijing/video-poster/uploads/ " + current_path + "/uploads/")

print('Download the new video list...')
print(output)

foldername = 'uploads/'


def stamp(foldername, filename):
    with open(foldername + filename + '.finished', 'w') as f:
        f.write('this file is processed at ' + str(time.time()))

# build a closed_list of finished video files
# so we don't have the run the classifier on them
# again
finished_list = set()
for filename in os.listdir(foldername):
    if filename.endswith(".finished"):
        finished_list.add(filename)

print('start looping through all files')
# For each file in the folder
# grab the file that have not been classified yet
# classify them
# then print a timestamp to show they are classified
# if we need to rerun the classifier on a processed video
# just delete the video_file_name.finished stamp file
# the video will be processed on next iteration
for filename in os.listdir(foldername):
    if filename.endswith(".mp4"):  # run the program through all video files only
        finished_stamp = filename + '.finished'

        # mtime = os.path.getmtime(foldername + filename)
        # if float(time.time() - mtime) <= 500 and
        if finished_stamp not in finished_list:
            # call vijay pipeline
            call_classifier(current_path, filename)

            # print a time stamp to show the file is processed
            stamp(foldername, filename)
