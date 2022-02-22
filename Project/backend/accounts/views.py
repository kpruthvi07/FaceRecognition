from django.shortcuts import render,get_object_or_404, redirect
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views import View
from rest_framework.authtoken.models import Token
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework import status
from rest_framework.utils import json
import requests
from django.contrib.auth.models import User, Group
from .models import *
from rest_framework.decorators import authentication_classes, permission_classes, action
import json
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Avg, Max, Min, Sum,Q
import cv2
import face_recognition as fr
import pickle
import datetime as dt
import numpy as np

class CaptureImage(APIView):
    authentication_classes = [JSONWebTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def cropped(self,image):
        try:
            face_location=fr.face_locations(image)
            top,right,bottom,left = face_location[0]
            image=image[top:bottom,left:right]
            return image
        except IndexError:
            return False

    def loadImage(self,name):
        return fr.load_image_file(name)

    def encode(self,image):
        try:
            return fr.face_encodings(image)[0]
        except:
            return False
            
    def compare(self,img1,img2):
        return fr.compare_faces(img1,img2,tolerance=0.6)

    def turnOnCam(self):
        face_cascade=cv2.CascadeClassifier(cv2.data.haarcascades+'haarcascade_frontalface_default.xml')
        cap = cv2.VideoCapture(0)
        
        while(True):  
            ret, img = cap.read()
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            
            faces= face_cascade.detectMultiScale(gray,1.1,4)
            
            for(x,y,w,h) in faces:
                cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),4)
            cv2.imshow('image',img)
            if cv2.waitKey(1) & 0xff==ord('q'):
                name='current.jpg'
                img_new=cv2.imwrite(name,img)
                break

        cap.release() 
        cv2.destroyAllWindows()
        
        unknown_image=self.loadImage(name)
        unknown_image=self.cropped(unknown_image)
        if(isinstance(unknown_image,np.ndarray)):
            unknown_encode=self.encode(unknown_image)
            if(isinstance(unknown_encode,np.ndarray)):
                pickle_in=open("C:\\Users\welcome\Desktop\Online_Attendance_Management\Project\\backend\Images\dict.pickle","rb")
                records=pickle.load(pickle_in)
                
                result=self.compare([unknown_encode],records['N140426'])
                return result[0]
            else:
                return unknown_encode
        else:
            return unknown_image
        

    def get(self,request,*args,**kwargs):
        r = self.turnOnCam()
        if(r):
            msg = 'face matched with ' + request.user.username
        else:
            msg = 'face not matched with ' + request.user.username
        return Response({'msg':msg})
