from .models import *
from blog.models import *
import datetime as dt

def markWorkingDayAttendance():
    today_date = dt.date.today()
    year = today_date.year
    cur_academic_year = str(year-1)+'-'+str(year) if today_date.month<4 else str(year)+'-'+str(year+1)
    if not IsWorkingDay.objects.filter(academic_year=cur_academic_year,date=today_date).exists():
        students = Student.objects.all()
        for student in students:
            subjects = Subject.objects.filter(year=student.year,branch=student.branch,academic_year=cur_academic_year).values('subject_name').all()
            for subject in subjects:
                if not MarkAttendance.objects.filter(student=student,subject_name=subject['subject_name'],
                year=student.year,branch=student.branch,academic_year=cur_academic_year,attendance_marked_date=today_date).exists():
                    MarkAttendance(student=student,subject_name=subject['subject_name'],year=student.year,branch=student.branch,academic_year=cur_academic_year).save()
        IsWorkingDay(academic_year=cur_academic_year).save()    
    else:
        print('Already ran script.')