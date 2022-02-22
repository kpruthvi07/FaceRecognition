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

def compare(img1,img2):
    return fr.compare_faces(img1,img2,tolerance=0.4)

