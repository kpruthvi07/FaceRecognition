from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from .models import *

class UserCreateFrom(UserCreationForm):
    def __init__(self, *args, **kwargs):
      super().__init__(*args, **kwargs)
      self.fields['password1'].help_text=''
      self.fields['password2'].help_text=''

    class Meta:
        model = User
        fields = ("username", "password1", "password2")
        help_texts = {
            'username': None,
            'email': None,
        }


class StudentProfileForm(forms.ModelForm):

    class Meta:
        model = Student
        exclude = ['user']

class StaffRegisterForm(UserCreationForm):
    is_staff = forms.BooleanField(initial=True, widget=forms.HiddenInput)

    class Meta:
        model = User
        fields = ['username', 'email','password1', 'password2', 'is_staff']

class StaffProfileForm(forms.ModelForm):

    class Meta:
        model = Staff
        exclude = ['user']
