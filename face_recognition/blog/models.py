from django.db import models
from django.contrib.auth.models import User
import datetime as dt
from django.utils import timezone

from accounts.models import *

# OF_CHOICES = [('pending','Pending'),('approved','Approved'),('rejected','Rejected')]
# ST_CHOICES = [('college','College'),('outside','Outside'),('cancelled','Cancelled')]

# class Outing(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     reason = models.TextField(max_length=500)
#     office_status = models.CharField(max_length=20, default='pending', choices=OF_CHOICES)
#     student_status = models.CharField(max_length=20, default='college', choices=ST_CHOICES)
#     outing_date = models.DateField(default=dt.date.today)
#     outing_time = models.TimeField(default=timezone.now)
#     reporting_time = models.TimeField()
#     checked_out_time = models.DateTimeField(blank=True, null=True)
#     checked_in_time  = models.DateTimeField(blank=True, null=True)
#     is_approved = models.BooleanField(default=False)
#     is_checked = models.BooleanField(default=False)
#     is_cancelled = models.BooleanField(default=False)
#     date_applied = models.DateTimeField(auto_now_add=True, null=True)


#     def __str__(self):
#         return f'{self.user.username} - Outing'
     
# class Leave(models.Model):
# 	user = models.ForeignKey(User, on_delete=models.CASCADE)
# 	reason = models.TextField(max_length=500)
# 	office_status = models.CharField(max_length=20, default='pending', choices=OF_CHOICES)
# 	student_status = models.CharField(max_length=20, default='college', choices=ST_CHOICES)
# 	leaving_date = models.DateField(default=dt.date.today)
# 	reporting_date = models.DateField(default=dt.date.today)
# 	checked_out_time = models.DateTimeField(blank=True, null=True)
# 	checked_in_time  = models.DateTimeField(blank=True, null=True)
# 	is_approved = models.BooleanField(default=False)
# 	is_checked = models.BooleanField(default=False)
# 	is_cancelled = models.BooleanField(default=False)
# 	date_applied = models.DateTimeField(auto_now_add=True, null=True)


# 	def __str__(self):
# 		return f'{self.user.username} - Leave'

class MarkAttendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    subject_name = models.CharField(max_length=100, blank=True, null=True)
    year = models.CharField(max_length=20, choices=YEARS)
    branch = models.CharField(max_length=20, choices=BRANCHES)
    academic_year = models.CharField(max_length=20, blank=True, null=True)
    is_present = models.BooleanField(default=False)
    attendance_marked_date = models.DateField(auto_now_add=True, null=True)

    def __str__(self):
        return f'{str(self.student.user)}' + ' - ' + f'{self.subject_name}' + ' - ' + f'{self.attendance_marked_date} - Attendance'


class Subject(models.Model):
    subject_code = models.CharField(max_length=20, primary_key=True)
    subject_name = models.CharField(max_length=100, blank=True, null=True)
    year = models.CharField(max_length=20, choices=YEARS)
    branch = models.CharField(max_length=20, choices=BRANCHES)
    academic_year = models.CharField(max_length=20, blank=True, null=True)
    
    def __str__(self):
        return f'{self.subject_name}' + ' - ' + f'{self.year}' + ' - ' + f'{self.academic_year} - Subject'

class IsWorkingDay(models.Model):
    run_script = models.BooleanField(default=True)
    date = models.DateField(auto_now_add=True, null=True)
    academic_year = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f'{self.date}' + ' - ' + f'{self.academic_year} - IsWorkingDay'



