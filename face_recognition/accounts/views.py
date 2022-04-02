from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
# from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from .forms import *

def register(request):
    if request.method == 'POST':
        form = UserCreateFrom(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            user = form.save()
            messages.success(request, f'Account created for {username}!')
            login(request, user)
            return redirect('profile')
    else:
        form = UserCreateFrom()
    return render(request, 'accounts/register.html', {'form':form})

def staffRegister(request):
    if request.method == 'POST':
        form = StaffRegisterForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            user = form.save()
            login(request, user)
            messages.success(request, f'Account created for {username}!')
            return redirect('profile')
    else:
        form = StaffRegisterForm()
    return render(request, 'accounts/staff_register.html', {'form':form})

@login_required
def profile(request):
    if request.method == 'POST':
        if request.user.is_staff:
            form = StaffProfileForm(request.POST, instance=request.user.staff)
        else:
            form = StudentProfileForm(request.POST, instance=request.user.student)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            form.save()
            messages.success(request, f'Account Updated for {request.user.username}!')
            return redirect('profile')
    else:
        if request.user.is_staff:
            form = StaffProfileForm(instance=request.user.staff)
        else:
            form = StudentProfileForm(instance=request.user.student)
    return render(request, 'accounts/profile.html', {'form':form})
	

