import cv2
from func import*
from outpro import*
import pickle

capture()

name="current"

unknown_image=loadImage(name+'.jpg')
unknown_image=cropped(unknown_image)
unknown_encode=encode(unknown_image)

pickle_in=open("Images\dict.pickle","rb")
records=pickle.load(pickle_in)

for known in records:

    result=compare([unknown_encode],records[known])

    if(result[0]):
        print("{} mathched with {}".format(name,known))
    else:
        print("{} not matched with {}".format(name,known))


