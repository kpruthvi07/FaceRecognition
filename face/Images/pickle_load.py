import pickle
import face_recognition as fr
import os

def cropped(image):
    face_location=fr.face_locations(image)
    top,right,bottom,left = face_location[0]
    image=image[top:bottom,left:right]
    return image

def loadImage(name):
    return fr.load_image_file(name)

def encode(image):
    return fr.face_encodings(image)[0]

p="C:\\Users\welcome\Desktop\Propy\Images"

images=[]
for f in os.listdir(p):
    if('.jpg' in f):
        images.append(f[:f.index('.')])
                      
records={}
for i in images:
    known_image=loadImage(i+'.jpg')
    known_image=cropped(known_image)
    known_encode=encode(known_image)
    records[i]=known_encode

pickle_out=open("dict.pickle","wb")
pickle.dump(records,pickle_out)
pickle_out.close()
