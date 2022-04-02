from django.http import HttpResponse, StreamingHttpResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.models import User
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.contrib import messages
from django.utils import timezone
from django.contrib.auth.decorators import login_required, user_passes_test
import face_recognition as fr
import pickle
import datetime as dt
import pandas as pd
import cv2
import numpy as np
from accounts.models import *
from .models import *



def currentAcademicYear():
	today_date = dt.date.today()
	year = today_date.year
	cur_academic_year = str(year-1)+'-'+str(year) if dt.date.today().month<4 else str(year)+'-'+str(year+1)
	return cur_academic_year

def is_fully_filled(request):
	listToCheck = ['markattendance', 'user', 'idno','email']
	fields_names = [f.name  for f in Student._meta.get_fields() if f.name not in listToCheck]
	student = Student.objects.filter(user=request.user).values()
	for field_name in fields_names:
		if student[0][field_name] is None or student[0][field_name] == '':
			return False
	return True

def isHoliday():
	if IsWorkingDay.objects.filter(date=dt.date.today()).exists():
		return False
	return True

def temp(request):
	return redirect('login')

def isStaff(user):
	return user.is_staff & (not user.is_superuser)

def isStudent(user):
	return not user.is_staff

@user_passes_test(isStudent,login_url='error',redirect_field_name=None)
def indexView(request):
	return render(request, 'blog/index.html')

@user_passes_test(isStudent,login_url='error',redirect_field_name=None)
def getGubjects(request):
	if is_fully_filled(request):
		is_holiday = isHoliday()
		academic_year = currentAcademicYear()
		subjects = {}
		if not request.user.is_staff:
			student = Student.objects.get(user=request.user)
			subjects = pd.DataFrame(Subject.objects.filter(year=student.year,branch=student.branch,academic_year=academic_year).values().all())
			if(len(subjects)>0):
				if MarkAttendance.objects.filter(student=student,attendance_marked_date=dt.date.today()).exists():
					marked_attd = pd.DataFrame(MarkAttendance.objects.filter(student=student,attendance_marked_date=dt.date.today()).values('subject_name','is_present'))
					subjects = pd.merge(subjects,marked_attd,on='subject_name',how='inner').to_dict(orient='records')
				else:
					subjects = {}
					print("Didn't run script.py")
	else:
		messages.warning(request, f'Please update your profile before doing any operation')
		return redirect('profile')	
	return render(request, 'blog/subjects.html',{'subjects':subjects,'is_holiday':is_holiday})

def cropped(image):
        try:
            face_location=fr.face_locations(image)
            top,right,bottom,left = face_location[0]
            image=image[top:bottom,left:right]
            return image
        except IndexError:
            return False

def loadImage(name):
	return fr.load_image_file(name)

def encode(image):
	try:
		return fr.face_encodings(image)[0]
	except:
		return False
		
def compare(img1,img2):
	return fr.compare_faces(img1,img2,tolerance=0.6)

@user_passes_test(isStudent,login_url='error',redirect_field_name=None)
def turnOnCam(request):
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

	# return 'image captured'
	
	unknown_image=loadImage(name)
	unknown_image=cropped(unknown_image)
	if(isinstance(unknown_image,np.ndarray)):
		unknown_encode=encode(unknown_image)
		if(isinstance(unknown_encode,np.ndarray)):
			pickle_in=open("C:\\Users\welcome\Desktop\\nolms\dict.pickle","rb")
			records=pickle.load(pickle_in)
			
			result=compare([unknown_encode],records[request.user.username])
			return result[0]
		else:
			return unknown_encode
	else:
		return unknown_image
	
@user_passes_test(isStudent,login_url='error',redirect_field_name=None)
def camera(request,**kwargs):
	r = turnOnCam(request)
	subject_name = kwargs['subject_name']
	academic_year = currentAcademicYear()
	if(r):
		student = Student.objects.get(user=request.user)
		MarkAttendance.objects.filter(student=student,attendance_marked_date=dt.date.today()
		,subject_name=subject_name,academic_year=academic_year).update(is_present=True)		
		messages.success(request, f'Successfully Marked Your Attendance!')
		return summaryId(request,subject_name=subject_name)
	else:
		messages.warning(request, f'Face not matched with ' + request.user.username)
		return redirect('subjects')

@user_passes_test(isStudent,login_url='error',redirect_field_name=None)
def summaryId(request,**kwargs):
	subject_name = kwargs['subject_name']
	academic_year = currentAcademicYear()
	student = Student.objects.get(user=request.user)
	totalWorkingDays = IsWorkingDay.objects.filter(academic_year=academic_year).all().count() 
	present = MarkAttendance.objects.filter(student=student,subject_name=subject_name,is_present=True).all().count()
	absent = totalWorkingDays-present
	attd_percent = (present*100)/totalWorkingDays
	data = {'Total Working Days':totalWorkingDays,'Present':present,'Absent':absent,'Percentage':attd_percent}
	return render(request, 'blog/summaryId.html',{'data':data})
		

