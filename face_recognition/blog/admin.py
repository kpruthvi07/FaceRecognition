from django.contrib import admin
from django.utils.html import format_html
from django.http import HttpResponseRedirect
from django.urls import path
from django.shortcuts import render, get_object_or_404, redirect


from django.contrib import admin
from .models import *

admin.site.register(MarkAttendance)
admin.site.register(Subject)
admin.site.register(IsWorkingDay)
